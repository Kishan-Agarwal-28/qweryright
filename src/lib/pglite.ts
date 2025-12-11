// Create and manage the PGlite worker
let worker: Worker | null = null;
let messageId = 0;
let initPromise: Promise<void> | null = null;
let isInitialized = false;
const pendingQueries = new Map<number, {
  resolve: (value: unknown[]) => void;
  reject: (error: Error) => void;
}>();

function getWorker(): Worker {
  if (!worker) {
    // Create the worker from the worker file
    worker = new Worker(
      new URL('./pglite.worker.ts', import.meta.url),
      { type: 'module' }
    );

    // Handle messages from the worker
    worker.onmessage = (event: MessageEvent) => {
      const { id, success, data, error } = event.data;
      const pending = pendingQueries.get(id);

      if (pending) {
        pendingQueries.delete(id);
        if (success) {
          pending.resolve(data);
        } else {
          pending.reject(new Error(error));
        }
      }
    };

    // Handle worker errors
    worker.onerror = (error) => {
      console.error('Worker error:', error);
      // Reject all pending queries
      pendingQueries.forEach(({ reject }) => {
        reject(new Error('Worker crashed'));
      });
      pendingQueries.clear();
    };
  }

  return worker;
}

/**
 * Initialize the database (triggers OPFS loading)
 * Call this early to pre-load the database
 * This function is idempotent - multiple calls will return the same promise
 */
export async function initializeDatabase(): Promise<void> {
  // Return existing promise if initialization is in progress
  if (initPromise) {
    return initPromise;
  }
  
  // Return immediately if already initialized
  if (isInitialized) {
    return Promise.resolve();
  }

  // Create new initialization promise
  initPromise = executeSQL('SELECT 1')
    .then(() => {
      isInitialized = true;
      initPromise = null;
    })
    .catch((error) => {
      // Reset on error so it can be retried
      initPromise = null;
      throw error;
    });

  return initPromise;
}

/**
 * Execute a SQL query using PGlite in a Web Worker with OPFS persistence
 * @param sql - The SQL query to execute
 * @returns Promise that resolves with query results
 */
export async function executeSQL(sql: string): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const id = messageId++;
    const workerInstance = getWorker();

    // Store the promise callbacks
    pendingQueries.set(id, { resolve, reject });

    // Determine if this is a query (SELECT) or exec (INSERT/UPDATE/DELETE/CREATE/etc)
    const trimmedSQL = sql.trim().toUpperCase();
    const isQuery = trimmedSQL.startsWith('SELECT') || 
                    trimmedSQL.startsWith('WITH') ||
                    trimmedSQL.startsWith('SHOW') ||
                    trimmedSQL.startsWith('DESCRIBE') ||
                    trimmedSQL.startsWith('EXPLAIN');

    // Send message to worker
    workerInstance.postMessage({
      id,
      type: isQuery ? 'query' : 'exec',
      sql,
    });

    // Set a timeout for the query
    setTimeout(() => {
      if (pendingQueries.has(id)) {
        pendingQueries.delete(id);
        reject(new Error('Query timeout after 30 seconds'));
      }
    }, 30000);
  });
}

/**
 * Close the worker and clean up resources
 */
export function closeDatabase(): void {
  if (worker) {
    worker.terminate();
    worker = null;
    pendingQueries.clear();
  }
}

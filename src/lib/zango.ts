import type { MongoSampleData } from './sample-mongo';

type ZangoConfig = Record<string, true | string[] | Record<string, boolean>> | string[];

// Declare global ZangoDB type (loaded via CDN)
declare global {
  interface Window {
    zango: any;
  }
}

let db: any | null = null;
const DB_NAME = 'mongo-practice-db';

// Check if we're in browser environment with all required APIs
function isBrowser(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof indexedDB !== 'undefined' &&
    typeof crypto !== 'undefined' &&
    crypto.subtle !== undefined
  );
}

// Get ZangoDB from global window object (loaded via CDN)
function getZango() {
  if (!isBrowser()) {
    throw new Error('ZangoDB requires browser environment with IndexedDB and Web Crypto API support');
  }
  
  if (typeof window === 'undefined' || !window.zango) {
    throw new Error('ZangoDB not loaded. Make sure the CDN script is included in your HTML.');
  }
  
  return window.zango;
}

function buildConfigFromData(data: MongoSampleData): ZangoConfig {
  // Define collections without indexes
  const cfg: Record<string, true> = {};
  for (const name of Object.keys(data.collections)) cfg[name] = true;
  return cfg;
}

export async function resetMongo(): Promise<void> {
  if (!isBrowser()) {
    console.warn('resetMongo called in non-browser environment');
    return;
  }
  if (db) {
    try {
      await db.drop();
    } catch (e) {
      console.warn('Error dropping database:', e);
    }
    try { 
      db.close(); 
    } catch (e) {
      console.warn('Error closing database:', e);
    }
    db = null;
  }
  
  // Additionally, try to delete the IndexedDB database directly
  if (typeof indexedDB !== 'undefined') {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB_NAME);
      request.onsuccess = () => resolve();
      request.onerror = () => resolve(); // Resolve anyway to continue
      request.onblocked = () => {
        console.warn('Database deletion blocked');
        resolve(); // Resolve anyway
      };
    });
  }
}

async function ensureDb(config: ZangoConfig): Promise<any> {
  if (!db) {
    const zangoLib = getZango();
    db = new zangoLib.Db(DB_NAME, config);
    await db.open();
  }
  return db;
}

export async function loadDefaultMongoData(data: MongoSampleData): Promise<void> {
  if (!isBrowser()) {
    throw new Error('Cannot load data in non-browser environment');
  }
  const cfg = buildConfigFromData(data);
  const database = await ensureDb(cfg);
  // Insert documents per collection
  for (const [col, docs] of Object.entries(data.collections)) {
    const c = database.collection(col);
    if (Array.isArray(docs) && docs.length > 0) {
      await c.insert(docs);
    }
  }
}

export async function loadCustomMongoDataFromJSON(jsonText: string): Promise<void> {
  if (!isBrowser()) {
    throw new Error('Cannot load data in non-browser environment');
  }
  let parsed: any;
  try {
    parsed = JSON.parse(jsonText);
  } catch (e) {
    throw new Error('Invalid JSON file. Please provide valid JSON.');
  }

  // Support either { collections: { name: docs[] } } or { name: docs[] } directly
  const collections: Record<string, unknown[]> = parsed.collections ?? parsed;
  if (!collections || typeof collections !== 'object') {
    throw new Error('JSON must be an object of collections mapping to arrays of documents.');
  }

  for (const [k, v] of Object.entries(collections)) {
    if (!Array.isArray(v)) {
      throw new Error(`Collection "${k}" must be an array of documents.`);
    }
  }

  const cfg: ZangoConfig = Object.fromEntries(Object.keys(collections).map(k => [k, true] as const));
  const database = await ensureDb(cfg);
  for (const [col, docs] of Object.entries(collections)) {
    const c = database.collection(col);
    if (docs.length > 0) {
      await c.insert(docs);
    }
  }
}

function inferType(value: any): string {
  if (value === null) return 'null';
  const t = typeof value;
  if (t === 'number' && Number.isInteger(value)) return 'int';
  if (t === 'number') return 'double';
  if (t === 'string') return 'string';
  if (t === 'boolean') return 'bool';
  if (Array.isArray(value)) return 'array';
  if (t === 'object') return 'object';
  return t;
}

export async function getMongoSchemaJSON(): Promise<any> {
  if (!isBrowser()) return { collections: [] };
  if (!db) return { collections: [] };
  
  try {
    const names = await listCollections();
    const collections: any[] = [];

    for (const name of names) {
      try {
        const col = db.collection(name);
        const docs: any[] = await col.find({}).toArray();
        const sampleDocs = docs.slice(0, 50);
        const fieldTypes: Record<string, Set<string>> = {};
        
        for (const d of sampleDocs) {
          Object.keys(d).forEach((k) => {
            const t = inferType((d as any)[k]);
            if (!fieldTypes[k]) fieldTypes[k] = new Set();
            fieldTypes[k].add(t);
          });
        }
        
        const fields = Object.entries(fieldTypes).map(([k, set]) => ({ 
          name: k, 
          types: Array.from(set).sort() 
        }));
        
        collections.push({ 
          name, 
          count: docs.length, 
          fields 
        });
      } catch (e) {
        console.error(`Error getting schema for collection ${name}:`, e);
        collections.push({ name, count: 0, fields: [], error: true });
      }
    }
    
    return { collections };
  } catch (e) {
    console.error('Error getting schema:', e);
    return { collections: [] };
  }
}

export async function listCollections(): Promise<string[]> {
  if (!isBrowser()) return [];
  if (!db) return [];
  
  // ZangoDB stores collection names in the config
  // Try multiple ways to access it
  try {
    const cfg = (db as any)._config || (db as any).config;
    if (Array.isArray(cfg)) return cfg;
    if (cfg && typeof cfg === 'object') return Object.keys(cfg);
    
    // Fallback: try to get from _collections
    const collections = (db as any)._collections;
    if (collections && typeof collections === 'object') {
      return Object.keys(collections);
    }
    
    return [];
  } catch (e) {
    console.error('Error listing collections:', e);
    return [];
  }
}

export async function executeFindJSON(collection: string, queryJSON: string): Promise<unknown[]> {
  if (!isBrowser()) throw new Error('Cannot execute queries in non-browser environment');
  if (!db) throw new Error('Database not initialized. Load data first.');
  let spec: any = {};
  if (queryJSON && queryJSON.trim().length) {
    try { spec = JSON.parse(queryJSON); } catch { throw new Error('Query must be valid JSON'); }
  }

  const { filter, projection, group, sort, skip, limit, unwind } = spec;
  let cursor = db.collection(collection).find(filter || {});
  if (projection) cursor = cursor.project(projection);
  if (group) cursor = cursor.group(group);
  if (unwind) cursor = cursor.unwind(unwind);
  if (sort) cursor = cursor.sort(sort);
  if (typeof skip === 'number') cursor = cursor.skip(skip);
  if (typeof limit === 'number') cursor = cursor.limit(limit);
  const docs = await cursor.toArray();
  return docs;
}

export async function executeAggregateJSON(collection: string, pipelineJSON: string): Promise<unknown[]> {
  if (!isBrowser()) throw new Error('Cannot execute queries in non-browser environment');
  if (!db) throw new Error('Database not initialized. Load data first.');
  let pipeline: any[];
  try {
    const parsed = JSON.parse(pipelineJSON);
    if (!Array.isArray(parsed)) throw new Error('Pipeline must be a JSON array');
    pipeline = parsed;
  } catch (e: any) {
    throw new Error(e?.message || 'Invalid pipeline JSON');
  }

  const cursor = db.collection(collection).aggregate(pipeline);
  const docs = await cursor.toArray();
  return docs;
}

export function getDbInstance(): any | null {
  return db;
}

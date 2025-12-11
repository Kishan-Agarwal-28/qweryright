import Editor, { type OnMount } from '@monaco-editor/react';
import { useRef, useState, useEffect } from 'react';
import type { editor } from 'monaco-editor';
import { executeSQL, initializeDatabase } from '@/lib/pglite';
import { Button } from '@/components/ui/button';
import { Play, Loader2 } from 'lucide-react';
import { sqlSuggestions } from '@/lib/sql-suggestions';

function CodeEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [results, setResults] = useState<unknown[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize database on mount
  useEffect(() => {
    initializeDatabase()
      .then(() => {
        console.log('Database initialized successfully');
        setIsInitializing(false);
      })
      .catch((err) => {
        console.error('Database initialization failed:', err);
        setError('Failed to initialize database: ' + err.message);
        setIsInitializing(false);
      });
  }, []);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Configure SQL language features
    monaco.languages.setLanguageConfiguration('sql', {
      comments: {
        lineComment: '--',
        blockComment: ['/*', '*/'],
      },
      brackets: [
        ['(', ')'],
        ['[', ']'],
      ],
      autoClosingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      surroundingPairs: [
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
      ],
      wordPattern: /[a-zA-Z_]\w*/,
    });

    // Add SQL keywords and snippets
    monaco.languages.registerCompletionItemProvider('sql', {
      triggerCharacters: [' ', '.', '(', ','],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        // Map the imported suggestions to Monaco's format
        const suggestions = sqlSuggestions.map(suggestion => ({
          label: suggestion.label,
          kind: suggestion.kind,
          insertText: suggestion.insertText,
          insertTextRules: suggestion.insertTextRules,
          documentation: suggestion.detail 
            ? `${suggestion.documentation}\n\n${suggestion.detail}`
            : suggestion.documentation,
          range,
        }));
        
        return { suggestions };
      },
    });

    // Add keyboard shortcut for execution (Ctrl+Enter or Cmd+Enter)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleExecute();
    });

    // Set editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
      fontLigatures: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnCommitCharacter: true,
      acceptSuggestionOnEnter: 'on',
      quickSuggestions: {
        other: true,
        comments: false,
        strings: true,
      },
      suggest: {
        showKeywords: true,
        showSnippets: true,
        showWords: true,
      },
    });
  };

  const handleExecute = async () => {
    if (!editorRef.current) return;

    const sql = editorRef.current.getValue().trim();
    if (!sql) {
      setError('Please enter a SQL query');
      return;
    }

    setIsExecuting(true);
    setError(null);
    setResults(null);

    try {
      const result = await executeSQL(sql);
      setResults(result);
      console.log('Query results:', result);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      console.error('Query error:', err);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleExecute}
          disabled={isExecuting || isInitializing}
          size="sm"
          className="gap-2"
        >
          {isInitializing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading Database...
            </>
          ) : isExecuting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Executing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Run Query (Ctrl+Enter)
            </>
          )}
        </Button>
      </div>

      <div className="flex-1 border rounded-lg overflow-hidden">
        <Editor
          height="400px"
          defaultLanguage="sql"
          language="sql"
          defaultValue="-- Welcome to SQL Practice! 📚\n-- Press Ctrl+Enter to execute any query\n-- Database: Online Bookstore\n\n-- Try these example queries:\n\n-- 1. Get all books with their authors\nSELECT b.title, a.name as author, b.price, b.publication_year\nFROM books b\nJOIN authors a ON b.author_id = a.author_id\nORDER BY b.title\nLIMIT 10;\n\n-- 2. Find top-rated books\n-- SELECT b.title, a.name as author, AVG(r.rating) as avg_rating, COUNT(r.review_id) as review_count\n-- FROM books b\n-- JOIN authors a ON b.author_id = a.author_id\n-- LEFT JOIN reviews r ON b.book_id = r.book_id\n-- GROUP BY b.book_id, b.title, a.name\n-- HAVING COUNT(r.review_id) > 0\n-- ORDER BY avg_rating DESC\n-- LIMIT 5;\n\n-- 3. Customer order history\n-- SELECT c.first_name, c.last_name, COUNT(o.order_id) as total_orders, SUM(o.total_amount) as total_spent\n-- FROM customers c\n-- LEFT JOIN orders o ON c.customer_id = o.customer_id\n-- GROUP BY c.customer_id, c.first_name, c.last_name\n-- ORDER BY total_spent DESC;\n\n-- Available tables: authors, books, categories, customers, orders, order_items, reviews"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>

      Results Panel
      <div className="flex-1 border rounded-lg p-4 bg-zinc-950 overflow-auto">
        <h3 className="text-sm font-semibold mb-2 text-zinc-400">Results:</h3>
        {error && (
          <div className="p-3 bg-red-900/20 border border-red-500 rounded text-red-400">
            <strong>Error:</strong> {error}
          </div>
        )}
        {results && (
          <div className="overflow-x-auto">
            {results.length === 0 ? (
              <p className="text-zinc-500">Query executed successfully. No results returned.</p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {results.map((row: unknown, idx: number) => (
                    <tr key={idx} className="border-b border-zinc-800">
                      {Array.isArray(row) ? (
                        row.map((cell, cellIdx) => (
                          <td key={cellIdx} className="p-2 text-zinc-300">
                            {String(cell)}
                          </td>
                        ))
                      ) : (
                        <td className="p-2 text-zinc-300">{JSON.stringify(row)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {!results && !error && (
          <p className="text-zinc-600">Execute a query to see results here.</p>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
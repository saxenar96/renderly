// Code execution utility for JavaScript and TypeScript
export interface ExecutionResult {
  output: string;
  error?: string;
  success: boolean;
}

export function executeCode(code: string, language: 'javascript' | 'typescript'): ExecutionResult {
  try {
    // Create a safe execution environment
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    let output = '';
    const capturedOutput: string[] = [];

    // Override console methods to capture output
    const captureConsole = (method: keyof typeof originalConsole) => {
      return (...args: unknown[]) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        capturedOutput.push(message);
        originalConsole[method](...args);
      };
    };

    console.log = captureConsole('log');
    console.error = captureConsole('error');
    console.warn = captureConsole('warn');
    console.info = captureConsole('info');

    try {
      // For TypeScript, we'll need to transpile it to JavaScript
      // For now, we'll treat TypeScript as JavaScript since we don't have a TS compiler
      let executableCode = code;
      
      if (language === 'typescript') {
        // Basic TypeScript to JavaScript conversion
        // This is a simplified approach - in production, you'd use a proper TS compiler
        executableCode = code
          // Remove type annotations from variable declarations
          .replace(/const\s+(\w+)\s*:\s*[^=]+=/g, 'const $1 =')
          .replace(/let\s+(\w+)\s*:\s*[^=]+=/g, 'let $1 =')
          .replace(/var\s+(\w+)\s*:\s*[^=]+=/g, 'var $1 =')
          // Remove type annotations from function parameters
          .replace(/\(([^)]*)\)\s*:\s*[^{=]+/g, '($1)')
          // Remove return type annotations
          .replace(/\)\s*:\s*[^{]+/g, ')')
          // Remove simple type annotations
          .replace(/:\s*string/g, '')
          .replace(/:\s*number/g, '')
          .replace(/:\s*boolean/g, '')
          .replace(/:\s*any/g, '')
          .replace(/:\s*void/g, '')
          .replace(/:\s*object/g, '')
          .replace(/:\s*\[\]/g, '')
          .replace(/:\s*\{[^}]*\}/g, '')
          // Remove interfaces and types
          .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
          .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
          // Remove export/import statements
          .replace(/export\s+/g, '')
          .replace(/import\s+.*?from\s+['"][^'"]+['"];?/g, '');
      }

      // Handle import statements for both JavaScript and TypeScript
      executableCode = executableCode
        // Remove import statements
        .replace(/import\s+.*?from\s+['"][^'"]+['"];?\s*/g, '')
        .replace(/import\s+\{[^}]*\}\s*from\s+['"][^'"]+['"];?\s*/g, '')
        .replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '')
        .replace(/import\s+['"][^'"]+['"];?\s*/g, '')
        // Remove export statements
        .replace(/export\s+/g, '')
        // Clean up any extra whitespace
        .replace(/\n\s*\n\s*\n/g, '\n\n')
        .trim();

      // Wrap the code in an IIFE to avoid global scope pollution
      const wrappedCode = `
        (function() {
          ${executableCode}
        })();
      `;

      // Execute the code
      eval(wrappedCode);

      // Restore original console methods
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      output = capturedOutput.join('\n');

      return {
        output: output || 'Code executed successfully (no output)',
        success: true,
      };
    } catch (executionError) {
      // Restore original console methods
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      return {
        output: capturedOutput.join('\n'),
        error: executionError instanceof Error ? executionError.message : 'Unknown execution error',
        success: false,
      };
    }
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to execute code',
      success: false,
    };
  }
}

// Alternative execution method using Function constructor (safer than eval)
export function executeCodeSafe(code: string, language: 'javascript' | 'typescript'): ExecutionResult {
  try {
    let output = '';
    const capturedOutput: string[] = [];

    // Create a safe execution context
    const context = {
      console: {
        log: (...args: unknown[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          capturedOutput.push(message);
        },
        error: (...args: unknown[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          capturedOutput.push(`ERROR: ${message}`);
        },
        warn: (...args: unknown[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          capturedOutput.push(`WARN: ${message}`);
        },
        info: (...args: unknown[]) => {
          const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' ');
          capturedOutput.push(`INFO: ${message}`);
        },
      },
      // Add React mock for JSX support
      React: {
        createElement: (type: string, props: unknown, ...children: unknown[]) => {
          const element = { type, props: props || {}, children };
          console.log('React.createElement called:', element);
          return element;
        },
        Fragment: 'Fragment',
        Component: class Component {},
        PureComponent: class PureComponent {},
        useState: (initial: unknown) => {
          console.log('useState called with:', initial);
          return [initial, () => {}];
        },
        useEffect: (fn: () => void, _deps?: unknown[]) => {
          console.log('useEffect called');
          return fn();
        },
        useCallback: (fn: () => unknown, _deps?: unknown[]) => {
          console.log('useCallback called');
          return fn;
        },
        useMemo: (fn: () => unknown, _deps?: unknown[]) => {
          console.log('useMemo called');
          return fn();
        },
        useRef: (initial: unknown) => {
          console.log('useRef called with:', initial);
          return { current: initial };
        },
        useContext: (context: unknown) => {
          console.log('useContext called');
          return context;
        },
        useReducer: (reducer: (state: unknown, action: unknown) => unknown, initial: unknown) => {
          console.log('useReducer called');
          return [initial, () => {}];
        },
        useImperativeHandle: (_ref: unknown, _fn: () => void, _deps?: unknown[]) => {
          console.log('useImperativeHandle called');
        },
        useLayoutEffect: (fn: () => void, _deps?: unknown[]) => {
          console.log('useLayoutEffect called');
          return fn();
        },
        useDebugValue: (value: unknown) => {
          console.log('useDebugValue called with:', value);
        }
      },
      // Add common globals that might be expected
      Math,
      Date,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
    };

    let executableCode = code;
    
    // Handle both JavaScript and TypeScript
    if (language === 'typescript') {
      try {
        // Basic TypeScript to JavaScript conversion
        executableCode = code
          // Remove type annotations from variable declarations
          .replace(/const\s+(\w+)\s*:\s*[^=]+=/g, 'const $1 =')
          .replace(/let\s+(\w+)\s*:\s*[^=]+=/g, 'let $1 =')
          .replace(/var\s+(\w+)\s*:\s*[^=]+=/g, 'var $1 =')
          // Remove type annotations from function parameters
          .replace(/\(([^)]*)\)\s*:\s*[^{=]+/g, '($1)')
          // Remove return type annotations
          .replace(/\)\s*:\s*[^{]+/g, ')')
          // Remove simple type annotations
          .replace(/:\s*string/g, '')
          .replace(/:\s*number/g, '')
          .replace(/:\s*boolean/g, '')
          .replace(/:\s*any/g, '')
          .replace(/:\s*void/g, '')
          .replace(/:\s*object/g, '')
          .replace(/:\s*\[\]/g, '')
          .replace(/:\s*\{[^}]*\}/g, '')
          // Remove interfaces and types
          .replace(/interface\s+\w+\s*\{[^}]*\}/g, '')
          .replace(/type\s+\w+\s*=\s*[^;]+;/g, '')
          // Remove export/import statements
          .replace(/export\s+/g, '')
          .replace(/import\s+.*?from\s+['"][^'"]+['"];?/g, '');
      } catch (tsError) {
        // If TypeScript conversion fails, try to execute as JavaScript
        console.warn('TypeScript conversion failed, trying as JavaScript:', tsError);
        executableCode = code;
      }
    }

    // Handle import statements for both JavaScript and TypeScript
    executableCode = executableCode
      // Remove import statements
      .replace(/import\s+.*?from\s+['"][^'"]+['"];?\s*/g, '')
      .replace(/import\s+\{[^}]*\}\s*from\s+['"][^'"]+['"];?\s*/g, '')
      .replace(/import\s+\*\s+as\s+\w+\s+from\s+['"][^'"]+['"];?\s*/g, '')
      .replace(/import\s+['"][^'"]+['"];?\s*/g, '')
      // Remove export statements
      .replace(/export\s+/g, '')
      // Clean up any extra whitespace
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();

    // Check if code contains JSX
    const hasJSX = /<[A-Z][a-zA-Z0-9]*/.test(executableCode) || /<[a-z][a-zA-Z0-9]*/.test(executableCode);
    
    if (hasJSX) {
      console.log('JSX detected in code. Note: JSX execution is limited in this environment.');
      console.log('For full JSX support, consider using a proper React development environment.');
    }

    // Debug: Log the transformed code
    console.log('Original code:', code);
    console.log('Transformed code:', executableCode);
    
    // Create a function with the provided context
    const func = new Function(...Object.keys(context), executableCode);
    
    // Execute the function with the context
    func(...Object.values(context));

    output = capturedOutput.join('\n');

    return {
      output: output || 'Code executed successfully (no output)',
      success: true,
    };
  } catch (error) {
    return {
      output: '',
      error: error instanceof Error ? error.message : 'Failed to execute code',
      success: false,
    };
  }
}

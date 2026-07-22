// Code execution: JavaScript (local) + Python (Pyodide - runs in browser)

// ==================== PYODIDE LAZY LOADER ====================
let pyodideInstance = null;
let pyodideLoading = null;

const loadPyodideInstance = async () => {
  // If already loaded, return it
  if (pyodideInstance) return pyodideInstance;

  // If currently loading, wait for it
  if (pyodideLoading) return pyodideLoading;

  // Start loading
  pyodideLoading = (async () => {
    try {
      // Load Pyodide from CDN (smaller bundle than npm package)
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
      document.head.appendChild(script);

      // Wait for script to load
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });

      // Initialize Pyodide
      pyodideInstance = await window.loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
      });

      return pyodideInstance;
    } catch (error) {
      pyodideLoading = null;
      throw error;
    }
  })();

  return pyodideLoading;
};

// ==================== JAVASCRIPT (LOCAL) ====================
const executeJavaScript = (code) => {
  return new Promise((resolve) => {
    const logs = [];

    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    const formatValue = (val) => {
      if (val === null) return 'null';
      if (val === undefined) return 'undefined';
      if (typeof val === 'object') {
        try {
          return JSON.stringify(val, null, 2);
        } catch {
          return String(val);
        }
      }
      return String(val);
    };

    console.log = (...args) => {
      logs.push(args.map(formatValue).join(' '));
    };
    console.error = (...args) => {
      logs.push('ERROR: ' + args.map(formatValue).join(' '));
    };
    console.warn = (...args) => {
      logs.push('WARN: ' + args.map(formatValue).join(' '));
    };
    console.info = (...args) => {
      logs.push('INFO: ' + args.map(formatValue).join(' '));
    };

    try {
      const result = new Function(code)();

      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      if (result !== undefined) {
        logs.push(formatValue(result));
      }

      resolve({
        success: true,
        output: logs.length > 0
          ? logs.join('\n')
          : 'Code executed successfully (no output)',
      });
    } catch (error) {
      console.log = originalConsole.log;
      console.error = originalConsole.error;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;

      resolve({
        success: false,
        output: `${error.name}: ${error.message}`,
      });
    }
  });
};

// ==================== PYTHON (VIA PYODIDE) ====================
const executePython = async (code) => {
  try {
    const pyodide = await loadPyodideInstance();

    // Capture stdout
    pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);

    // Run user code
    try {
      await pyodide.runPythonAsync(code);
    } catch (pyError) {
      // Get stderr for Python errors
      const stderr = pyodide.runPython('sys.stderr.getvalue()');
      return {
        success: false,
        output: stderr || pyError.message,
      };
    }

    // Get captured output
    const stdout = pyodide.runPython('sys.stdout.getvalue()');
    const stderr = pyodide.runPython('sys.stderr.getvalue()');

    // Reset stdout/stderr
    pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
    `);

    if (stderr && !stdout) {
      return {
        success: false,
        output: stderr,
      };
    }

    return {
      success: true,
      output: stdout || 'Code executed successfully (no output)',
    };
  } catch (error) {
    console.error('Python execution error:', error);
    return {
      success: false,
      output:
        error.message ||
        'Failed to execute Python. Please refresh and try again.',
    };
  }
};

// ==================== MAIN EXECUTE FUNCTION ====================
export const executeCode = async (language, version, code) => {
  if (!code.trim()) {
    return {
      success: false,
      output: 'No code to execute',
    };
  }

  switch (language) {
    case 'javascript':
      return await executeJavaScript(code);

    case 'python':
      return await executePython(code);

    default:
      return {
        success: false,
        output: `Language "${language}" is not supported`,
      };
  }
};

// Preload Pyodide in background (optional - improves UX)
export const preloadPython = () => {
  if (typeof window !== 'undefined' && !pyodideInstance && !pyodideLoading) {
    loadPyodideInstance().catch((err) => {
      console.warn('Failed to preload Pyodide:', err);
    });
  }
};
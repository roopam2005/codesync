import { create } from 'zustand';

const DEFAULT_CODE = `// Welcome to CodeSync!
// Try running this JavaScript code:

console.log("Hello, World!");
console.log(2 + 2);

// Switch to Python from the dropdown to try Python code`;

const useEditorStore = create((set) => ({
  code: DEFAULT_CODE,
  language: 'javascript',
  output: '',
  isExecuting: false,
  error: null,

  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setOutput: (output) => set({ output, error: null }),
  setExecuting: (status) => set({ isExecuting: status }),
  setError: (error) => set({ error, output: '' }),

  clearOutput: () => set({ output: '', error: null }),
  resetEditor: () =>
    set({
      code: DEFAULT_CODE,
      language: 'javascript',
      output: '',
      error: null,
    }),
}));

export default useEditorStore;
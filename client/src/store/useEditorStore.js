import { create } from 'zustand';

const useEditorStore = create((set) => ({
  code: '// Welcome to CodeSync!\n// Start coding together...',
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
      code: '// Welcome to CodeSync!\n// Start coding together...',
      language: 'javascript',
      output: '',
      error: null,
    }),
}));

export default useEditorStore;
// Supported languages for CodeSync
// JavaScript runs locally (unlimited), Python runs via Pyodide (unlimited)

export const SUPPORTED_LANGUAGES = [
  {
    label: 'JavaScript',
    value: 'javascript',
    description: 'Runs instantly in browser',
  },
  {
    label: 'Python',
    value: 'python',
    description: 'Runs via Pyodide (WebAssembly)',
  },
];

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

// Check if a language is supported
export const isLanguageSupported = (lang) => {
  return SUPPORTED_LANGUAGES.some((l) => l.value === lang);
};

// Get language config by value
export const getLanguageConfig = (value) => {
  return SUPPORTED_LANGUAGES.find((l) => l.value === value) || DEFAULT_LANGUAGE;
};
import axios from 'axios';

const PISTON_API = import.meta.env.VITE_PISTON_API || 'https://emkc.org/api/v2/piston';

export const executeCode = async (language, version, code) => {
  try {
    const response = await axios.post(`${PISTON_API}/execute`, {
      language,
      version,
      files: [{ content: code }],
    });

    const { run } = response.data;

    if (run.stderr) {
      return { success: false, output: run.stderr };
    }

    return {
      success: true,
      output: run.stdout || run.stderr || 'Code executed successfully (no output)',
    };
  } catch (error) {
    console.error('Execution error:', error);
    return {
      success: false,
      output: error.response?.data?.message || 'Failed to execute code. Please try again.',
    };
  }
};
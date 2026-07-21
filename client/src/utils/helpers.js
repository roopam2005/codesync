export const copyToClipboard = async (text, toast) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('✅ Copied to clipboard!');
    return true;
  } catch (err) {
    toast.error('Failed to copy');
    return false;
  }
};

export const formatOutput = (output) => {
  if (typeof output === 'string') return output;
  if (typeof output === 'object') return JSON.stringify(output, null, 2);
  return String(output);
};
// Custom hook for executing code
import { useState } from 'react';
import toast from 'react-hot-toast';
import { executeCode } from '../services/executionService.js';
import useEditorStore from '../store/useEditorStore.js';
import useRoomStore from '../store/useRoomStore.js';
import { SUPPORTED_LANGUAGES } from '../utils/languageConfig.js';
import { socket, SOCKET_EVENTS } from '../socket/socket.js';

export const useCodeExecution = () => {
  const { code, language, setOutput, setError, setExecuting } = useEditorStore();
  const { roomId, username } = useRoomStore();
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    if (!code.trim()) {
      toast.error('Nothing to execute — write some code first!');
      return;
    }

    const langConfig = SUPPORTED_LANGUAGES.find((l) => l.value === language);
    if (!langConfig) {
      toast.error('Unsupported language');
      return;
    }

    setIsRunning(true);
    setExecuting(true);

    const loadingMessage =
      language === 'python'
        ? 'Running Python (first time takes ~10s to load)...'
        : 'Executing code...';

    const toastId = toast.loading(loadingMessage);

    try {
      const result = await executeCode(langConfig.value, null, code);

      if (result.success) {
        setOutput(result.output);
        toast.success('Code executed!', { id: toastId });

        // Broadcast output to all users in the room
        if (roomId) {
          socket.emit(SOCKET_EVENTS.OUTPUT_UPDATE, {
            roomId,
            output: result.output,
            error: null,
            username,
          });
        }
      } else {
        setError(result.output);
        toast.error('Execution failed', { id: toastId });

        // Broadcast error to all users
        if (roomId) {
          socket.emit(SOCKET_EVENTS.OUTPUT_UPDATE, {
            roomId,
            output: null,
            error: result.output,
            username,
          });
        }
      }
    } catch (err) {
      setError(err.message || 'Unknown error');
      toast.error('Something went wrong', { id: toastId });
    } finally {
      setIsRunning(false);
      setExecuting(false);
    }
  };

  return { runCode, isRunning };
};
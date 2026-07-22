// Custom hook to manage socket connection and events
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { socket, initSocket, SOCKET_EVENTS } from '../socket/socket.js';
import useRoomStore from '../store/useRoomStore.js';
import useEditorStore from '../store/useEditorStore.js';
import { generateAvatar } from '../utils/avatarHelper.js';

export const useSocket = (roomId, username) => {
  const navigate = useNavigate();
  const { setUsers, setConnecting, leaveRoom } = useRoomStore();
  const { setCode, setLanguage, setOutput, setError, clearOutput } = useEditorStore();

  useEffect(() => {
    if (!roomId || !username) return;

    initSocket();
    setConnecting(true);

    const avatarUrl = generateAvatar(username);
    socket.emit(SOCKET_EVENTS.JOIN, { roomId, username, avatarUrl });

    // ==================== EVENT LISTENERS ====================

    socket.on(SOCKET_EVENTS.JOINED, ({ clients, username: newUser, socketId }) => {
      setUsers(clients);
      setConnecting(false);

      if (socketId !== socket.id) {
        toast.success(`${newUser} joined the room`);
      }
    });

    socket.on(SOCKET_EVENTS.USER_LEFT, ({ username: leftUser, clients }) => {
      setUsers(clients);
      toast(`${leftUser} left the room`, { icon: '👋' });
    });

    socket.on(SOCKET_EVENTS.SYNC_CODE, ({ code, language }) => {
      if (code !== undefined) setCode(code);
      if (language !== undefined) setLanguage(language);
    });

    socket.on(SOCKET_EVENTS.CODE_UPDATE, ({ code }) => {
      setCode(code);
    });

    socket.on(SOCKET_EVENTS.LANGUAGE_UPDATE, ({ language }) => {
      setLanguage(language);
      toast(`Language changed to ${language}`, { icon: '🔄' });
    });

    // Output broadcast - handles both execution results AND clear actions
    socket.on(SOCKET_EVENTS.OUTPUT_BROADCAST, ({ output, error, username: runner }) => {
      // If both output and error are empty/null → it's a clear action
      if (!output && !error) {
        clearOutput();
        return;
      }

      // Otherwise it's an execution result
      if (error) {
        setError(error);
      } else {
        setOutput(output);
      }
      toast(`${runner} ran the code`, { icon: '▶️' });
    });

    socket.on(SOCKET_EVENTS.ERROR, ({ message }) => {
      toast.error(message);
    });

    socket.on('connect_error', (err) => {
      console.error('Connection error:', err.message);
      toast.error('Cannot connect to server');
      setConnecting(false);
    });

    // ==================== CLEANUP ====================
    return () => {
      socket.off(SOCKET_EVENTS.JOINED);
      socket.off(SOCKET_EVENTS.USER_LEFT);
      socket.off(SOCKET_EVENTS.SYNC_CODE);
      socket.off(SOCKET_EVENTS.CODE_UPDATE);
      socket.off(SOCKET_EVENTS.LANGUAGE_UPDATE);
      socket.off(SOCKET_EVENTS.OUTPUT_BROADCAST);
      socket.off(SOCKET_EVENTS.ERROR);
      socket.off('connect_error');

      socket.emit(SOCKET_EVENTS.LEAVE);
      socket.disconnect();
      leaveRoom();
    };
  }, [roomId, username]);

  return socket;
};
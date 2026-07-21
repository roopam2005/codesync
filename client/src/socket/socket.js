import { io } from 'socket.io-client';
import { SOCKET_EVENTS } from './socketEvents.js';

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ['websocket'],
});

export const initSocket = () => {
  if (!socket.connected) {
    console.log('🔌 Connecting to CodeSync server...');
    socket.connect();
  }
  return socket;
};

// Helper to safely emit events
export const emitEvent = (event, data) => {
  if (socket.connected) {
    socket.emit(event, data);
  } else {
    console.warn(`Socket not connected. Cannot emit ${event}`);
  }
};

export { SOCKET_EVENTS };
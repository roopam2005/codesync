// Main Socket.io setup and connection handler
import { Server } from 'socket.io';
import { socketCorsOptions } from '../config/corsOptions.js';
import { registerRoomEvents } from './roomEvents.js';
import { registerCodeEvents } from './codeEvents.js';

export const initSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: socketCorsOptions,
    pingTimeout: 60000,
  });

  io.on('connection', (socket) => {
    console.log(`✅ New socket connected: ${socket.id}`);

    // Register all event handlers
    registerRoomEvents(io, socket);
    registerCodeEvents(io, socket);

    // Handle connection errors
    socket.on('error', (err) => {
      console.error(`Socket error [${socket.id}]:`, err.message);
    });
  });

  console.log('🔌 Socket.io server initialized');
  return io;
};
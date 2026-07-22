// Code-related socket events (code change, language change, sync, output)
import roomStore from '../store/roomStore.js';
import { SOCKET_EVENTS } from './events.js';

export const registerCodeEvents = (io, socket) => {
  // ==================== CODE CHANGE ====================
  socket.on(SOCKET_EVENTS.CODE_CHANGE, ({ roomId, code }) => {
    try {
      if (!roomId) return;

      roomStore.updateRoomCode(roomId, code);
      socket.to(roomId).emit(SOCKET_EVENTS.CODE_UPDATE, { code });
    } catch (err) {
      console.error('CODE_CHANGE error:', err.message);
    }
  });

  // ==================== LANGUAGE CHANGE ====================
  socket.on(SOCKET_EVENTS.LANGUAGE_CHANGE, ({ roomId, language }) => {
    try {
      if (!roomId || !language) return;

      roomStore.updateRoomLanguage(roomId, language);
      socket.to(roomId).emit(SOCKET_EVENTS.LANGUAGE_UPDATE, { language });
    } catch (err) {
      console.error('LANGUAGE_CHANGE error:', err.message);
    }
  });

  // ==================== REQUEST SYNC ====================
  socket.on(SOCKET_EVENTS.REQUEST_SYNC, ({ roomId }) => {
    try {
      const room = roomStore.getRoom(roomId);
      if (!room) return;

      socket.emit(SOCKET_EVENTS.SYNC_CODE, {
        code: room.code,
        language: room.language,
      });
    } catch (err) {
      console.error('REQUEST_SYNC error:', err.message);
    }
  });

  // ==================== OUTPUT UPDATE (NEW) ====================
  // When a user runs code, broadcast the output to everyone else in the room
  socket.on(SOCKET_EVENTS.OUTPUT_UPDATE, ({ roomId, output, error, username }) => {
    try {
      if (!roomId) return;

      // Broadcast output to everyone in the room EXCEPT the sender
      socket.to(roomId).emit(SOCKET_EVENTS.OUTPUT_BROADCAST, {
        output,
        error,
        username, // who ran the code
      });
    } catch (err) {
      console.error('OUTPUT_UPDATE error:', err.message);
    }
  });
};
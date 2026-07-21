// Code-related socket events (code change, language change, sync)
import roomStore from '../store/roomStore.js';
import { SOCKET_EVENTS } from './events.js';

export const registerCodeEvents = (io, socket) => {
  // ==================== CODE CHANGE ====================
  socket.on(SOCKET_EVENTS.CODE_CHANGE, ({ roomId, code }) => {
    try {
      if (!roomId) return;

      // Update in-memory store
      roomStore.updateRoomCode(roomId, code);

      // Broadcast to everyone in the room EXCEPT the sender
      socket.to(roomId).emit(SOCKET_EVENTS.CODE_UPDATE, { code });
    } catch (err) {
      console.error('CODE_CHANGE error:', err.message);
    }
  });

  // ==================== LANGUAGE CHANGE ====================
  socket.on(SOCKET_EVENTS.LANGUAGE_CHANGE, ({ roomId, language }) => {
    try {
      if (!roomId || !language) return;

      // Update in-memory store
      roomStore.updateRoomLanguage(roomId, language);

      // Broadcast to everyone in the room EXCEPT the sender
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

      // Send current room state to the requesting socket
      socket.emit(SOCKET_EVENTS.SYNC_CODE, {
        code: room.code,
        language: room.language,
      });
    } catch (err) {
      console.error('REQUEST_SYNC error:', err.message);
    }
  });
};
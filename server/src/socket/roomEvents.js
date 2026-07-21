// Room-related socket events (join, leave, disconnect)
import roomStore from '../store/roomStore.js';
import { getClientsInRoom, logConnection } from '../utils/socketHelpers.js';
import { SOCKET_EVENTS } from './events.js';

export const registerRoomEvents = (io, socket) => {
  // ==================== JOIN ROOM ====================
  socket.on(SOCKET_EVENTS.JOIN, ({ roomId, username, avatarUrl }) => {
    try {
      if (!roomId || !username) {
        socket.emit(SOCKET_EVENTS.ERROR, {
          message: 'Room ID and username are required',
        });
        return;
      }

      // Create room if it doesn't exist
      let room = roomStore.getRoom(roomId);
      if (!room) {
        room = roomStore.createRoom(roomId);
        console.log(`🆕 Room created: ${roomId}`);
      }

      // Add user to store
      roomStore.addUser(socket.id, username, roomId, avatarUrl);

      // Join socket room
      socket.join(roomId);
      logConnection('JOIN', socket.id, username, roomId);

      // Get updated clients list
      const clients = getClientsInRoom(roomId);

      // Notify everyone in the room (including sender) about the new user
      io.to(roomId).emit(SOCKET_EVENTS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });

      // Send current room state (code + language) to the newly joined user
      socket.emit(SOCKET_EVENTS.SYNC_CODE, {
        code: room.code,
        language: room.language,
      });
    } catch (err) {
      console.error('JOIN error:', err.message);
      socket.emit(SOCKET_EVENTS.ERROR, { message: 'Failed to join room' });
    }
  });

  // ==================== LEAVE ROOM ====================
  socket.on(SOCKET_EVENTS.LEAVE, () => {
    handleUserLeave(io, socket);
  });

  // ==================== DISCONNECT ====================
  socket.on('disconnect', () => {
    handleUserLeave(io, socket);
    console.log(`❌ Socket disconnected: ${socket.id}`);
  });
};

// Helper: handle user leaving (used by both LEAVE and disconnect)
const handleUserLeave = (io, socket) => {
  const user = roomStore.getUser(socket.id);
  if (!user) return;

  const { roomId, username } = user;

  // Remove user from store
  roomStore.removeUser(socket.id);

  // Leave socket room
  socket.leave(roomId);
  logConnection('LEAVE', socket.id, username, roomId);

  // Notify remaining users
  const clients = getClientsInRoom(roomId);
  io.to(roomId).emit(SOCKET_EVENTS.USER_LEFT, {
    socketId: socket.id,
    username,
    clients,
  });

  // Cleanup empty room
  roomStore.deleteRoomIfEmpty(roomId);
};
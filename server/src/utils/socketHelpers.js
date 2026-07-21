// Helper functions for socket operations
import roomStore from '../store/roomStore.js';

// Get formatted list of clients in a room
export const getClientsInRoom = (roomId) => {
  const users = roomStore.getUsersInRoom(roomId);
  return users.map((user) => ({
    socketId: user.socketId,
    username: user.username,
    avatarUrl: user.avatarUrl,
  }));
};

// Log connection info
export const logConnection = (event, socketId, username, roomId) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(
    `[${timestamp}] ${event} → user: ${username || 'unknown'} | socket: ${socketId} | room: ${roomId || 'none'}`
  );
};
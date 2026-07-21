// In-memory storage for rooms and users (no database)

class RoomStore {
  constructor() {
    // Map: roomId → { roomId, language, code, createdAt, lastActive }
    this.rooms = new Map();

    // Map: socketId → { socketId, username, roomId, avatarUrl }
    this.users = new Map();
  }

  // ==================== ROOM METHODS ====================

  createRoom(roomId) {
    if (this.rooms.has(roomId)) {
      return this.rooms.get(roomId);
    }

    const room = {
      roomId,
      language: 'javascript',
      code: '// Welcome to CodeSync!\n// Start coding together...\n',
      createdAt: Date.now(),
      lastActive: Date.now(),
    };

    this.rooms.set(roomId, room);
    return room;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  updateRoomCode(roomId, code) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.code = code;
      room.lastActive = Date.now();
    }
  }

  updateRoomLanguage(roomId, language) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.language = language;
      room.lastActive = Date.now();
    }
  }

  deleteRoomIfEmpty(roomId) {
    const usersInRoom = this.getUsersInRoom(roomId);
    if (usersInRoom.length === 0) {
      this.rooms.delete(roomId);
      console.log(`🗑️  Room deleted (empty): ${roomId}`);
    }
  }

  // ==================== USER METHODS ====================

  addUser(socketId, username, roomId, avatarUrl) {
    const user = {
      socketId,
      username,
      roomId,
      avatarUrl,
      joinedAt: Date.now(),
    };

    this.users.set(socketId, user);
    return user;
  }

  removeUser(socketId) {
    const user = this.users.get(socketId);
    if (user) {
      this.users.delete(socketId);
      return user;
    }
    return null;
  }

  getUser(socketId) {
    return this.users.get(socketId);
  }

  getUsersInRoom(roomId) {
    const usersArray = [];
    for (const user of this.users.values()) {
      if (user.roomId === roomId) {
        usersArray.push(user);
      }
    }
    return usersArray;
  }

  // ==================== UTILITY METHODS ====================

  getStats() {
    return {
      totalRooms: this.rooms.size,
      totalUsers: this.users.size,
    };
  }
}

// Export a single instance (singleton)
const roomStore = new RoomStore();
export default roomStore;
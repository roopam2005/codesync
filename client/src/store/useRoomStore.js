import { create } from 'zustand';

const useRoomStore = create((set, get) => ({
  roomId: null,
  username: null,
  users: [],
  isJoined: false,
  isConnecting: false,

  setRoom: (roomId, username) =>
    set({ roomId, username, isJoined: true, isConnecting: true }),

  setUsers: (users) => set({ users }),
  
  addUser: (user) =>
    set((state) => ({
      users: [...state.users.filter((u) => u.socketId !== user.socketId), user],
    })),

  removeUser: (socketId) =>
    set((state) => ({
      users: state.users.filter((u) => u.socketId !== socketId),
    })),

  setConnecting: (status) => set({ isConnecting: status }),

  leaveRoom: () =>
    set({
      roomId: null,
      username: null,
      users: [],
      isJoined: false,
      isConnecting: false,
    }),

  getCurrentUser: () => {
    const { users, username } = get();
    return users.find((u) => u.username === username);
  },
}));

export default useRoomStore;
import { create } from 'zustand';

const useUIStore = create((set) => ({
  isLoading: false,
  showUsersPanel: true,
  showOutputPanel: true,

  setLoading: (status) => set({ isLoading: status }),
  toggleUsersPanel: () => set((state) => ({ showUsersPanel: !state.showUsersPanel })),
  toggleOutputPanel: () => set((state) => ({ showOutputPanel: !state.showOutputPanel })),
}));
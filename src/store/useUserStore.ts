import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: User | null; // Allow user to be null
  setUser: (user: User | null) => void; // Allow setUser to accept null
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, // Default state is null
      setUser: (user) => set({ user }), // Update user state
      logout: () => {
        set({ user: null }); // Clear user state
        localStorage.removeItem('user-storage'); // Clear persisted data
      },
    }),
    {
      name: 'user-storage', // Key in localStorage
    }
  )
);
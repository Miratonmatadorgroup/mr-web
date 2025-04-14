import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phone: string;
    role: string;
}

interface UserState {
    user: User | null; //allow user to be null
    setUser: (user: User | null) => void; // Allow `setUser` to accept null
    logout: () => void ;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }), // Update user state
            logout: () => {
                set({ user: null }); // Clear user state
                localStorage.removeItem('user-storage'); // Clears persisted data
            },
        }),
        {
            name: 'user-storage', // Key in localStorage
        }
    )
);
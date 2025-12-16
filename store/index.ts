import { create } from 'zustand'
import type { AuthState, User } from '@/types/auth'

interface Store {
  // Auth state
  authState: AuthState
  user: User | null

  // Auth actions
  setAuthState: (state: AuthState) => void
  setUser: (user: User | null) => void
  reset: () => void
}

const initialState = {
  authState: 'loading' as AuthState,
  user: null,
}

export const useStore = create<Store>((set) => ({
  // Initial state
  ...initialState,

  // Actions
  setAuthState: (authState) => set({ authState }),
  setUser: (user) => set({ user }),
  reset: () => set(initialState),
}))

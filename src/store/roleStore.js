import { create } from 'zustand';
import { persist } from 'zustand/middleware';
/** Zustand store for role management with localStorage persistence */
export const useRoleStore = create()(persist(set => ({
  activeRole: 'admin',
  switchRole: role => set({
    activeRole: role
  })
}), {
  name: 'fin-role'
}));
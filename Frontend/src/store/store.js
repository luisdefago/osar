import { create } from 'zustand'

export const useStore = create((set) => ({
    user: null,
    users: null,
    datosTransferencia: [],

    setUsers: (newUsers) => set(() => ({ users: newUsers })),
    setUser: (newUser) => set(() => ({ user: newUser })),
    setDatosTransferencia: (datos) => set({ datosTransferencia: datos })
}));

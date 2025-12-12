import {create} from "zustand";
import type { UserState } from "../types/types";

export const useUser = create<UserState>((set) =>({
    user:null,
    setUser: (u) =>
        set((prev) => ({
        user: typeof u === "function" ? u(prev.user) : u,
    })),
    resetUser: () => set({ user: null})
}))
import {create} from "zustand";
import type { UserState } from "../types/types";

export const useUser = create<UserState>((set) =>({
    user:null,
    setUser: (u) => set({ user: u})
}))
import { defineStore } from "pinia";
import type { User } from "~/types/user";

interface AuthState {
    user: User | null
}

export const useAuth = defineStore("auth", {
    state: (): AuthState => ({
        user: null,
    }),
    actions: {
        setUser(user: User | null) {
            this.user = user;
        },
    },
    persist: true,
})
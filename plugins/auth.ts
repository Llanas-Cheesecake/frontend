import { useAuthStore } from "../store/auth";

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()

    return {
        provide: {
            auth: {
                isLoggedIn: () => { return auth._isAuthenticated },
                user: () => { return auth._customer }
            }
        }
    }
})
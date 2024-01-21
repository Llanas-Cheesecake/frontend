import { useAuthStore } from "../store/auth";

export default defineNuxtPlugin(() => {
    const auth = useAuthStore()

    return {
        provide: {
            auth: {
                isLoggedIn: () => { return auth._authenticated },
                user: () => { return auth._user }
            }
        }
    }
})
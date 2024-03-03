import type { ApiResponse } from "../types/ApiResponse";
import type { Customer } from "../types/Customer";

export const useAuthStore = defineStore('auth', () => {
    // States
    const authenticated = ref(false)
    const user = ref<Customer>()

    // Getters
    const _authenticated = computed(() => authenticated.value)
    const _user = computed(() => user.value)

    // Actions
    const loginAsCustomer = async (credentials: { email: string, password: string }) => {
        const config = useRuntimeConfig()
        const baseUrl = config.public.apiBaseUrl

        await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' })

        const xsrfToken = useCookie('XSRF-TOKEN')

        return await $fetch<ApiResponse>(baseUrl + '/login', {
            // @ts-ignore
            headers: {
                "X-XSRF-TOKEN": xsrfToken.value
            },
            method: 'POST',
            body: credentials,
            credentials: 'include'
        }).then((res) => {
            authenticated.value = true
            user.value = res.data
        })
    }

    const register = async (form: {
        first_name: string, last_name: string, email: string, password: string, c_password: string
    }) => {
        const config = useRuntimeConfig()
        const baseUrl = config.public.apiBaseUrl

        await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' })

        const xsrfToken = useCookie('XSRF-TOKEN')

        return await $fetch<ApiResponse>(baseUrl + '/register', {
            // @ts-ignore
            headers: {
                "X-XSRF-TOKEN": xsrfToken.value
            },
            method: 'POST',
            body: {
                first_name: form.first_name,
                last_name: form.last_name,
                email: form.email,
                password: form.password,
                password_confirmation: form.c_password
            },
            credentials: 'include'
        })
    }

    const logout = async () => {
        return await useFetchAPI('/logout', { method: 'POST' })
            .then(() => {
                authenticated.value = false
                user.value = undefined
            })
            .catch((err) => {
                throw new Error("There was a problem while logging out:" + err)
            })
    }

    return { authenticated, user, _authenticated, _user, loginAsCustomer, register, logout }
}, { persist: true })

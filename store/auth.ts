import type { ApiResponse } from "~/types/ApiResponse";
import type { Customer } from "~/types/Customer";
import type { Administrator } from "~/types/Administrator";

export const useAuthStore = defineStore('auth', () => {
    // States
    const isAuthenticated = ref(false)
    const isAdminAuthenticated = ref(false)

    const customer = ref<Customer>()
    const administrator = ref<Administrator>()

    // Getters
    const _isAuthenticated = computed(() => isAuthenticated.value)
    const _customer = computed(() => customer.value)

    const _isAdminAuthenticated = computed(() => isAdminAuthenticated.value)
    const _administrator = computed(() => administrator.value)

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
            isAuthenticated.value = true
            customer.value = res.data
        })
    }

    const loginAsAdministrator = async (credentials: { email: string, password: string }) => {
        const config = useRuntimeConfig()
        const baseUrl = config.public.apiBaseUrl

        await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' })

        const xsrfToken = useCookie('XSRF-TOKEN')

        return await $fetch<ApiResponse>(baseUrl + '/admin/login', {
            // @ts-ignore
            headers: {
                "X-XSRF-TOKEN": xsrfToken.value
            },
            method: 'POST',
            body: credentials,
            credentials: 'include'
        }).then((res) => {
            isAdminAuthenticated.value = true;
            administrator.value = res.data;
        })
    }

    const register = async (form: {
        first_name: string,
        last_name: string,
        email: string,
        password: string,
        c_password: string,
        captcha_token: string
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
                password_confirmation: form.c_password,
                captcha_token: form.captcha_token
            },
            credentials: 'include'
        })
    }

    const logout = async () => {
        return await useFetchAPI('/logout', { method: 'POST' })
            .then(() => {
                isAuthenticated.value = false
                customer.value = undefined
            })
            .catch((err) => {
                throw new Error("There was a problem while logging out:" + err)
            })
    }

    const logoutAsAdministrator = async () => {
        return await useFetchAPI('/admin/logout', { method: 'POST' })
            .then(() => {
                isAdminAuthenticated.value = false
                administrator.value = undefined
            })
            .catch((err) => {
                throw new Error("There was a problem while logging out:" + err)
            })
    }

    return {
        isAuthenticated,
        customer,
        _isAuthenticated,
        _customer,
        isAdminAuthenticated,
        administrator,
        _isAdminAuthenticated,
        _administrator,
        loginAsCustomer,
        loginAsAdministrator,
        register,
        logout,
        logoutAsAdministrator
    }
}, { persist: true })

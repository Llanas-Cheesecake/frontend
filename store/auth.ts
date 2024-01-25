import type {ApiResponse} from "../types/ApiResponse";

export const useAuthStore = defineStore('auth', () => {
    // States
    const authenticated = ref(false)
    const user = ref({})

    // Getters
    const _authenticated = computed(() => authenticated.value)
    const _user = computed(() => user)

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

    const getUserDetails = async () => {
        const config = useRuntimeConfig()
        const endpoint = config.public.apiEndpoint

        return await $fetch(endpoint + '/user/me', { credentials: 'include' })
            .then((res: any) => { // TODO: Add response type
                authenticated.value = true
                user.value = res.payload
            })
            .catch(err => {
                authenticated.value = false
                user.value = {}

                // Debug
                console.log("There was a problem in validating user session")
                console.debug(err)
            })
    }

    return { authenticated, user, _authenticated, _user, loginAsCustomer, getUserDetails }
}, { persist: true })

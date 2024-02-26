import type { UseFetchOptions } from "nuxt/app";
import defu from "defu";

export const useFetchAPI = async <T>(url: string, options: UseFetchOptions<T> = {}) => {
    const xsrfToken = useCookie('XSRF-TOKEN');

    const config = useRuntimeConfig();
    const apiEndpoint = config.public.apiBaseUrl + '/api/' + config.public.apiVersion

    if (!apiEndpoint) throw new Error("API Base URL not set!")

    const defaults: UseFetchOptions<T> = {
        baseURL: apiEndpoint,
        key: url,
        // @ts-ignore
        headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": xsrfToken.value || null
        },
        credentials: "include"
    }

    const params = defu(options, defaults)

    return useFetch(url, params)
}

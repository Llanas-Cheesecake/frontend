import type {FetchOptions} from "ofetch";

export const useFetchAPI = async (url: string, options?: FetchOptions) => {
    const xsrfToken = useCookie('XSRF-TOKEN');

    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl
    const apiVersion = config.public.apiVersion
    const apiEndpoint = apiBaseUrl + '/api/' + apiVersion

    if (!apiEndpoint) throw new Error("API Base URL not set!")

    // @ts-ignore
    return await $fetch<any>(url, {
        baseURL: apiEndpoint,
        // @ts-ignore
        headers: {
            accept: 'application/json',
            "X-XSRF-TOKEN": xsrfToken.value
        },
        credentials: 'include',
        ...(options && {...options})
    })
}

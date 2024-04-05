import type { UseFetchOptions } from "nuxt/app";
import defu from "defu";

export const useFetchAPI = async <T>(url: string, options: UseFetchOptions<T> = {}) => {
    const xsrfToken = useCookie('XSRF-TOKEN');
    const cookieHeaders = useRequestHeaders(["cookie"]);

    const config = useRuntimeConfig();
    const appUrl = config.public.appUrl;
    const apiEndpoint = config.public.apiBaseUrl + '/api/' + config.public.apiVersion

    if (!apiEndpoint) throw new Error("API Base URL not set!")

    const loadingIndicator = useLoadingIndicator();

    const defaults: UseFetchOptions<T> = {
        baseURL: apiEndpoint,
        key: url,
        // @ts-ignore
        headers: {
            Accept: "application/json",
            Origin: appUrl,
            Cookie: cookieHeaders.cookie,
            "X-XSRF-TOKEN": xsrfToken.value || null
        },
        credentials: "include",
        onRequest() {
            loadingIndicator.start()
        },
        onRequestError() {
            loadingIndicator.finish()
        },
        onResponse() {
            loadingIndicator.finish()
        }
    }

    const params = defu(options, defaults)

    return useFetch(url, params);
}

export const fetchXSRFCookie = async () => {
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBaseUrl;

    return await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' });
}

export const capitalizeText = (text: string) => text[0].toUpperCase() + text.substring(1);

export const { format: formatPrice } = Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
})
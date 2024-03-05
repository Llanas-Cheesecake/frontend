import { useAuthStore } from "~/store/auth";
import type { ApiResponse } from "~/types/ApiResponse";

export default defineNuxtRouteMiddleware(async (to) => {
    const { isAuthenticated, customer } = storeToRefs(useAuthStore());

    const result = await useFetchAPI<ApiResponse>('/account/check', {
        method: "GET"
    });

    // "Logout" user when the server returns an error
    if (result.status.value === 'error') {
        isAuthenticated.value = false;
        customer.value = undefined;

        return navigateTo('/')
    }

    // Update user info
    customer.value = result.data.value?.data
})
import { useAuthStore } from "~/store/auth";
import type { ApiResponse } from "~/types/ApiResponse";

export default defineNuxtRouteMiddleware(async (to) => {
    const { authenticated, user } = storeToRefs(useAuthStore());

    const result = await useFetchAPI<ApiResponse>('/account/check', {
        method: "GET"
    });

    // "Logout" user when the server returns an error
    if (result.status.value === 'error') {
        authenticated.value = false;
        user.value = undefined;

        return navigateTo('/')
    }

    // Update user info
    user.value = result.data.value?.data
})
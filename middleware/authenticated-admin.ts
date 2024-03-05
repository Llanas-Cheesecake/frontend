import { useAuthStore } from "~/store/auth";
import type { ApiResponse } from "~/types/ApiResponse";

export default defineNuxtRouteMiddleware(async (to) => {
    const { isAdminAuthenticated, administrator } = storeToRefs(useAuthStore());

    const result = await useFetchAPI<ApiResponse>('/admin/check', {
        method: "GET"
    });

    // "Logout" user when the server returns an error
    if (result.status.value === 'error') {
        isAdminAuthenticated.value = false;
        administrator.value = undefined;

        return navigateTo('/')
    }

    // Update user info
    administrator.value = result.data.value?.data
})
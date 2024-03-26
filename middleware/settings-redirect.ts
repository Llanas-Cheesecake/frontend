export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/admin/settings') {
        return navigateTo('/admin/settings/site-settings')
    }
})
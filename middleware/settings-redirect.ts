export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === '/admin/settings') {
        return navigateTo('/admin/settings/site-settings')
    }
})
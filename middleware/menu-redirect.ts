export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/menu') {
    return navigateTo('/menu/all')
  }
})
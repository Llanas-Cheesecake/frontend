import bootstrap from 'bootstrap/dist/js/bootstrap'

export default defineNuxtPlugin(nuxt => {
    nuxt.provide('bootstrap', bootstrap)
})

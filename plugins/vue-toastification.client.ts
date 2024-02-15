import Toast, {type PluginOptions, POSITION} from "vue-toastification";

export default defineNuxtPlugin((nuxt) => {
    const options: PluginOptions = {
        position: POSITION.BOTTOM_RIGHT
    }

    nuxt.vueApp.use(Toast, options)
})
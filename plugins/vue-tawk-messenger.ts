// @ts-ignore
import TawkMessengerVue from '@tawk.to/tawk-messenger-vue-3'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(TawkMessengerVue, {
    propertyId: config.public.tawkPropertyId,
    widgetId: config.public.tawkWidgetId
  })
})
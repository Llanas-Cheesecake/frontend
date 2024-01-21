// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: [
      '@nuxtjs/google-fonts',
      '@pinia/nuxt'
  ],

  // Site Metadata
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  // Module Options
  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,

    families: {
      Inter: [400, 700]
    }
  }
})

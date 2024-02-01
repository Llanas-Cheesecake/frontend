// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/styles/main.scss'],
  modules: [
      '@nuxtjs/google-fonts',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt'
  ],

  // Site Metadata
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: "preload", as: "image", href: "/icons/loader.svg" }
      ]
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASEURL,
      apiVersion: process.env.API_VERSION
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

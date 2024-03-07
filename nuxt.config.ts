// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
      '~/assets/styles/main.scss',
      'vue-toastification/dist/index.css',
      'vue-final-modal/style.css'
  ],
  modules: [
      '@nuxtjs/google-fonts',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      'nuxt-time'
  ],

  // Components
  components: [
      '~/components',
      { path: '~/components/admin', prefix: 'Admin' }
  ],

  // Site Metadata
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: "preload", as: "image", type: "image/svg+xml", href: "/icons/loader-white.svg" },
        { rel: "preload", as: "image", type: "image/svg+xml", href: "/icons/loader-black.svg" }
      ]
    }
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
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
      Inter: [300, 400, 700]
    }
  },

  routeRules: {
      '/': { prerender: true },
      '/products': { swr: true },
      '/products/**': { swr: 3600 }, // Generate on-demand and cached for 1 hour
      '/admin/**': { ssr: false } // Do not render admin pages on server. Doing so will risk of cached data appearing on CDN
  }
})

import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    // Keys within public, will be also exposed to the client-side
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    },
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {
            cssPath: '~/assets/css/tailwind.css',
            configPath: 'tailwind.config.js',
            exposeConfig: false,
            config: {
              content: ['content/**/**.md'],
            },
            injectPosition: 0,
            viewer: true,
          },
          autoprefixer: {},
        },
      },
    },
  },
  buildModules: [
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `usePinia()`
          'defineStore',
          // automatically imports `usePinia()` as `usePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
  modules: ['@nuxtjs/tailwindcss', '@formkit/nuxt'],
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})

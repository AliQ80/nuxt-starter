import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
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
  modules: ['@nuxtjs/tailwindcss'],
})

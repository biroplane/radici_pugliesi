import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import { repositoryName } from './slicemachine.config.json'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/app.css', '~/assets/css/typography.css'],
  devtools: { enabled: true },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg', href: '/logo_white.svg' },
      ],
    },
  },
  fonts: {
    families: [
      { name: 'IBM Plex Mono', provider: 'google' },
      { name: 'Croissant One', provider: 'google' },
      // { name: 'Playwrite MX', provider: 'google' },
      // { name: 'Quicksand', provider: 'google' },
    ],
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/prismic',
    '@pinia/nuxt',
    'nuxt-graphql-client',
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    public: {
      'GQL_HOST': '123',
      'graphql-client': {
        clients: {
          default: {
            host: process.env.SHOPIFY_DOMAIN as string,
            token: {
              name: 'X-Shopify-Storefront-Access-Token',
              value: process.env.SHOPIFY_PUBLIC_TOKEN,
              type: '',
            },
            retainToken: true,
          },
        },
      },
    },
  },
  ui: {
    colorMode: false,
  },
  prismic: {
    endpoint: repositoryName,
    clientConfig: {
      routes: [
        { type: 'homepage', path: '/' },
      ],
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})

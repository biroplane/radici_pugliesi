import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
import { repositoryName } from './slicemachine.config.json'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['~/assets/css/app.css'],
  devtools: { enabled: true },
  fonts: {
    families: [
      { name: 'IBM Plex Mono', provider: 'google' },
      { name: 'Rock Salt', provider: 'google' },
      { name: 'Playwrite MX', provider: 'google' },
      { name: 'Quicksand', provider: 'google' },
    ],
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/prismic',
    '@pinia/nuxt',
    'nuxt-graphql-client',
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

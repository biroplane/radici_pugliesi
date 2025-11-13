declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default defineNuxtPlugin(() => {
  const { GOOGLE_TAG_MANAGER: GTM } = useRuntimeConfig().public
  console.log('TAG', GTM)

  function gtag(...args: any[]) {
    window.dataLayer.push(args)
  }

  window.dataLayer = window.dataLayer || []

  gtag('js', new Date())
  gtag('config', GTM)

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GTM}`,
        async: true,
        innerHTML: 'window.dataLayer = window.dataLayer || [];',
      },
    ],
  })
})

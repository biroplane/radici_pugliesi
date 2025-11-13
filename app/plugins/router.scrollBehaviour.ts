export default defineNuxtPlugin((nuxtApp) => {
  (nuxtApp.$router as any).options.scrollBehavior = () => {
    return { x: 0, y: 0 }
  }
})

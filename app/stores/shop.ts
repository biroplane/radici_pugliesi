// import type { ConfigurationDocumentData } from '~/prismicio-types'

export const useShopStore = defineStore('shop', () => {
  // const prismic = usePrismic()
  const shop = ref()
  const place = ref()
  const fera = ref<any>()
  // const config = ref<ConfigurationDocumentData>()

  const paymentIcons = {
    APPLE_PAY: '/payments/card_apple_pay.svg',
    GOOGLE_PAY: '/payments/card_google_pay.svg',
    VISA: '/payments/card_visa.svg',
    MASTERCARD: '/payments/card_mastercard.svg',
    AMERICAN_EXPRESS: '/payments/card_american_express.svg',
    PAYPAL: '/payments/card_paypal.svg',
  }

  const reviews = computed(
    () => place.value?.result?.reviews.filter((r: any) => r.rating > 3) || [],
  )
  const address = computed(() => place.value.result?.formatted_address)
  const phone = computed(
    () => place.value.result?.international_phone_number || '',
  )
  const location = computed(() => place.value.result?.geometry.location || '')
  // const load = async () => {
  //   const data = await $fetch('/api/shop')
  //   shop.value = data.shop
  // }
  // const loadPlace = async () => {
  //   const data = await $fetch('/api/reviews')
  //   place.value = data
  // }

  // const loadConfig = async () => {
  //   try {
  //     const { data: doc } = await prismic.client.getByUID('configuration', 'main_config')
  //     // console.log('%cDOC LOADED ', 'font-size:3rem;color:purple', doc)
  //     config.value = doc
  //   }
  //   catch (error) {
  //     console.log('Errore CONFIG', error)
  //   }
  // }

  return {
    shop,
    // load,
    // loadPlace,
    // loadConfig,
    // loadReviews,
    place,
    // config,
    reviews,
    address,
    fera,
    phone,
    location,
    paymentIcons,
  }
}, { persist: {
  storage: piniaPluginPersistedstate.localStorage(),
} })

import type { Ref } from 'vue'
import { useAnalytics } from '@/composables/useAnalytics'

export const useCartStore = defineStore(
  'cartstore',
  () => {
    /**
     * Cart id, checkoutUrl, estimatedCost,lines
     */

    const analytics = useAnalytics()
    const cart: Ref<any> = ref({})
    const drawer = ref(false)
    const cartTotal = computed(() => cart.value.cost && cart.value.cost)
    const totalItems = computed(() =>
      cart.value?.lines?.nodes.reduce((acc: any, curr: any) => {
        return acc + curr.quantity
      }, 0),
    )
    const CART_ID = 'shopify:doncactus:cart'
    const existingCartId: Ref<string | undefined | null> = ref(undefined)
    const setCart = (_cart: any) => {
      console.log('%cSET  CART ', 'color:tomato;font-size:2rem', _cart)
      cart.value = _cart
      existingCartId.value = _cart.id
      localStorage.setItem(CART_ID, _cart.id)
    }
    const newCart = async () => {
      try {
        const data = await GqlCartCreate()
        console.log('Cart created', data.cartCreate?.cart)
        setCart(data.cartCreate?.cart)
      }
      catch (error) {
        console.error('Erro new cart', error)
      }
    }
    const loadCart = async () => {
      console.log('CARICO IL CARRELLO', existingCartId.value)
      try {
        const { cart: _cart } = await GqlGetCart({
          cartId: existingCartId.value as string,
        })

        console.log('%c[Existing cart]', 'background-color:teal', _cart)
        if (!_cart) {
          localStorage.removeItem(CART_ID)
          await newCart()
          console.log(
            '%c🛒 CANCELLO IL CARRELLO 🛒',
            'background-color:tomato;font-size:2rem',
          )
          return
        }
        cart.value = { ..._cart, id: existingCartId.value }
      }
      catch (error) {
        console.error('Errore carrello', error)
        localStorage.removeItem(CART_ID)
      }
    }
    const initializeCart = async () => {
      existingCartId.value = localStorage.getItem(CART_ID)
        ? localStorage.getItem(CART_ID)
        : undefined

      if (existingCartId.value) {
        console.log(
          '%cCART Exists',
          'background-color:tomato; font-size:2rem',
          existingCartId.value,
          localStorage.getItem(CART_ID),
        )
        await loadCart()
      }
      else {
        await newCart()
        console.log('IL CARRELLO NON ESISTE')
      }
      return cart
    }

    const addToCart = async (id: string, product: any, attributes?: any[]) => {
      console.log(
        '%cADD TO CART \n[Variant] => %s \n[Cart id] => %s',
        'color:lightgreen;font-size:1.4rem',
        id,
        cart.value.id,
        product,
      )
      try {
        await GqlAddToCart({
          cartId: cart.value.id,
          variantId: id,
          attributes,
        })

        // await loadCart(cart.value.id);
        // cart.value.lines.edges = data.cart;
        analytics.addToCart(product)
      }
      catch (error) {
        console.error('Error while adding to cart', error, id)
      }
    }
    const removeFromCart = async (id: any) => {
      try {
        const data = await GqlCartLinesRemove({
          cartId: cart.value.id,
          lineIds: [id],
        })
        console.log('Eliminato', data)
        await loadCart()
      }
      catch (error) {
        console.log('Errore di cancellazione dal carrello', error)
      }
    }
    const updateCart = async (lines: any) => {
      try {
        const data = await GqlCartLinesUpdate({ cartId: cart.value.id, lines })
        console.log('Update del carrello ', data)
        await loadCart()

        return data
      }
      catch (error) {
        console.log('Errore di update ', error)
      }
    }
    // const checkout =async (lineItems:any[]) => {
    //   await
    // }
    return {
      cart,
      drawer,
      loadCart,
      initializeCart,
      cartTotal,
      addToCart,
      removeFromCart,
      updateCart,
      totalItems,
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
)

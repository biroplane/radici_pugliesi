import type { Ref } from 'vue'
// fix
import { ProductCollectionSortKeys, ProductSortKeys } from '#gql/default'

interface QueryFilter {
  first: number
  query?: string
  after?: string
  sortKey?: string
  reverse?: boolean
}
interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string | null | undefined
  endCursor?: string | null | undefined
}
export const useProductStore = defineStore('products', () => {
  const isLoading = ref(false)
  const product = ref<any>({})
  const products = ref<any[]>([])

  const wishlist = ref<string[]>([] as string[])
  const filters: Ref<QueryFilter> = ref({
    first: 11,
    sortKey: ProductSortKeys.TITLE,
  })
  const getProducts = computed(() => products.value)

  const pageInfo: Ref<PageInfo> = ref({
    hasNextPage: false,
    hasPreviousPage: false,
  })
  const collections = ref([] as any)
  const collection = ref({})

  const activeCollections = computed(() => collections.value?.length > 0 ? collections.value.filter((c: any) => c.title !== 'hidden') : [1, 2, 3])

  const marketingForm = ref({
    product: '',
    pices: 10,
    discount: 10,
    date: '',
    customization: false,
  })

  const load = async (next = false) => {
    try {
      isLoading.value = true
      if (next) {
        filters.value.after = pageInfo.value.endCursor!
      }
      // filters.value.query= filters.value.query?.includes('tag') ?filters.value.query: "NOT product_type:'custom'"
      const _prods = await GqlProducts(filters.value as any)

      pageInfo.value = _prods.products.pageInfo
      products.value = filters.value.after
        ? products.value.concat(_prods.products.nodes)
        : _prods.products.nodes

      return _prods.products
    }
    catch (error) {
      console.log(
        '%cErrore api ',
        'background-color:tomato; padding:1rem; font-family:monospace',
        error,
      )
    }
    finally {
      isLoading.value = false
    }
  }
  const one = async (handle: string) => {
    try {
      isLoading.value = true
      const _prod = await GqlGetProductByHandle({ handle })

      product.value = (_prod as any).product as any
      // console.log("ONE", _prod);
      return product.value
    }
    catch (error) {
      console.log('Error', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const loadRecommended = async (id: string) => {
    try {
      const data = await GqlGetProductRecommendations({ id })

      return data.productRecommendations
    }
    catch (error) {
      console.log('Error loading recommended', error)
    }
  }
  const loadCollections = async (first = 3) => {
    // console.log("Loading collections ", first);

    const data = await GqlGetCollections({ first })

    collections.value = data.collections.nodes
    return collections.value
  }
  const getCollectionByHandle = async (
    handle: string,
    first = 100,
    sortKey = ProductCollectionSortKeys.TITLE,
    reverse = false,
  ) => {
    try {
      console.log('first', first, handle, sortKey, reverse)

      const data = await GqlGetCollectionByHandle({
        handle,
        first,
        sortKey,
        reverse,
      })
      return data
    }
    catch (error) {
      console.log('Errore GQL', error)
    }
  }

  const toggleFromWishlist = (id: string) => {
    if (!wishlist.value)
      wishlist.value = []
    console.log('TOGGLE ', wishlist.value)
    if (wishlist.value.includes(id)) {
      wishlist.value = wishlist.value.filter(w => w !== id)
    }
    else {
      wishlist.value.push(id)
    }
  }

  const isInWishlist = (id: string): boolean => {
    return wishlist.value?.includes(id)
  }

  return {
    products,
    product,
    collections,
    collection,
    activeCollections,
    getProducts,
    filters,
    isLoading,
    load,
    one,
    loadCollections,
    loadRecommended,
    getCollectionByHandle,
    marketingForm,
    pageInfo,
    wishlist,
    toggleFromWishlist,
    isInWishlist,
  }
}, {
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
    omit: ['products', 'product'],
  },
})

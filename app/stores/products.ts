export const useProductStore = defineStore('products', () => {
  const isLoading = ref(false)
  const products = ref<any | null>(null)
  const collections = ref<any | null>(null)

  const loadProducts = async () => {
    try {
      isLoading.value = true

      const _prods = await GqlProducts({ first: 8 })

      console.log('Product Loaded', _prods.products.nodes)
      products.value = _prods.products.nodes
    }
    catch (error) {
      console.log('ERROR ', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const loadCollections = async (first: number = 3) => {
    try {
      isLoading.value = true

      const _collections = await GqlGetCollections({ first })
      console.log('Collections Loaded', _collections.collections.nodes)
      collections.value = _collections.collections.nodes
    }
    catch (error) {
      console.log('ERROR ', error)
    }
    finally {
      isLoading.value = false
    }
  }
  return {
    isLoading,
    products,
    collections,
    loadProducts,
    loadCollections,
  }
})

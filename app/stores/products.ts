export const useProductStore = defineStore('products', () => {
  const isLoading = ref(false)
  const products = ref<any | null>(null)

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
  return {
    isLoading,
    products,
    loadProducts,
  }
})

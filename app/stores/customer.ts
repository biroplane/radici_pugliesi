export const useCustomerStore = defineStore('customer', () => {
  const customer = ref()
  const customerToken = ref()
  return {
    customer,
    customerToken,
  }
})

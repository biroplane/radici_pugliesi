<script setup lang="ts">
const productStore = useProductStore();
await productStore.loadProducts();
const products = computed(() => productStore.products);
</script>

<template>
  <Suspense>
    <template #fallback>
      <div class="opacity-50 flex flex-col gap-2">
        <USkeleton class="h-32 w-full" />
        <USkeleton class="h-4 w-28" />
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-full" />
      </div>
    </template>
    <template #default>
      <div v-if="!products.length">
        <p class="text-center py-4">No products found</p>
      </div>
      <div v-else class="py-12">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="slice-title">Products</h2>
          <p class="text-pretty">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam officia eaque
            veniam! Veniam nobis quae.
          </p>
        </div>
        <ul
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 container mx-auto py-12"
        >
          <li v-for="(product, p) in products" :key="p">
            <ProductCard :product />
          </li>
        </ul>
      </div>
    </template>
  </Suspense>
</template>

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
      <ul class="grid md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 container mx-auto py-12">
        <li v-for="(product, p) in products" :key="p">
          <ProductCard :product />
        </li>
      </ul>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
defineProps<{ product: any }>();
</script>

<template>
  <article
    class="product_card bg-white shadow rounded-2xl overflow-hidden h-full flex flex-col"
  >
    <NuxtImg
      :src="product.images.nodes[0].thumbnail"
      class="w-full aspect-video md:aspect-square object-contain"
    />
    <div class="content py-6 px-4 flex-grow">
      <h3 class="font-medium text-primary-500 text-lg py-3">
        {{ product.title }}
      </h3>
      <div class="text-xs text-neutral-400" v-html="product.description" />
      <ul>
        <li v-for="variant in product.variants" :key="variant.id">
          {{ variant.title }}
        </li>
      </ul>
    </div>
    <footer class="grid grid-cols-2 gap-3 w-full px-4 py-2">
      <div class="w-full text-xl">
        {{ formatMoney(product.actual.price.amount) }}
      </div>
      <UButton variant="ghost" color="primary" class="inline-block"> Acquista </UButton>
    </footer>
  </article>
</template>

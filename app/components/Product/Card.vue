<script setup lang="ts">
const props = defineProps<{ product: any; flat?: boolean }>();
const productStore = useProductStore();

function addToWishlist(id: string) {
  console.log("Add to wishlist", props.product);
  productStore.toggleFromWishlist(id);
}
</script>

<template>
  <div
    class="flex flex-col h-full bg-white rounded-2xl"
    :class="{
      'shadow hover:shadow-lg hover:scale-105 transition-all': !flat,
    }"
  >
    <NuxtLink
      :to="`/products/${product.handle}`"
      class="overflow-hidden h-full flex flex-col grow"
    >
      <div class="w-full max-h-64 overflow-hidden flex items-center justify-center">
        <NuxtImg
          :src="product.images.nodes[0].thumbnail"
          class="h-full aspect-video object-contain object-center scale-150 md:scale-100"
        />
      </div>
      <div class="content py-6 px-4 flex-grow">
        <h3 class="font-medium text-primary-500 text-sm lg:text-md py-3 leading-5">
          {{ product.title }}
        </h3>
        <div
          class="text-xs text-neutral-400 line-clamp-2 overflow-hidden"
          v-html="product.description"
        />
        <ul>
          <li v-for="variant in product.variants" :key="variant.id">
            {{ variant.title }}
          </li>
        </ul>
      </div>
    </NuxtLink>
    <footer class="flex items-center gap-3 w-full px-4 py-2 flex-none">
      <div class="text-xl w-full">
        {{ formatMoney(product.actual.price.amount) }}
      </div>
      <UButton
        variant="subtle"
        color="primary"
        class="flex items-center justify-center"
        :icon="
          productStore.isInWishlist(product.id)
            ? 'i-mingcute-heart-fill'
            : 'i-mingcute-heart-line'
        "
        @click="addToWishlist(product.id)"
      />
      <AddToCart product />
    </footer>
  </div>
</template>

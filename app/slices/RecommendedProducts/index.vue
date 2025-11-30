<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.RecommendedProductsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const productStore = useProductStore();
const recommended = ref();

onMounted(async () => {
  let productId;
  if (props.slice.primary.use_route) {
    productId = productStore.product?.id;
  } else if (props.slice.primary.shopify_product_id) {
    productId = props.slice.primary.shopify_product_id;
  } else {
    throw new Error("No product ID provided for RecommendedProducts slice");
  }
  if (productId) {
    recommended.value = await productStore.loadRecommended(productId);
  }
});

const shortRecommended = computed(() => [...(recommended.value ?? [])].splice(0, 6));
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="container"
  >
    <div class="py-4 mt-12 md:py-12">
      <h5 class="mb-6 slice-title-sm">Ecco qualcos'altro che potrebbe interessarti</h5>
      <div class="grid gap-4 grid-cols-2 md:grid-cols-3">
        <UBlogPost
          v-for="recommend in shortRecommended"
          :key="recommend.id"
          :badge="recommend.collections?.nodes[0]?.title"
          :title="recommend.title"
          :image="(recommend.images.nodes[0] as any).thumbnail"
          :to="`/products/${recommend.handle}`"
          orientation="horizontal"
          variant="outline"
        >
          <template #body>
            <div class="px-4 text-pretty flex flex-col">
              <div class="font-medium text-sm">
                {{ recommend.title }}
              </div>
              <div class="font-bold">
                {{ formatMoney(recommend.actual.price.amount) }}
              </div>
            </div>
          </template>
        </UBlogPost>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.ProductsGridSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const productStore = useProductStore();
productStore.filters.first = props.slice.primary.item_count || 8;
await productStore.load();
const products = computed(() => productStore.products);

function sortProducts(e: any) {
  console.log("SORT PRODUCTS", e);
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="px-4 relative"
  >
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
          <p class="text-center py-4">Nessun prodotto trovato</p>
        </div>
        <div v-else class="py-12 px-4 md:px-0">
          <div
            class="container mx-auto flex flex-col gap-4 md:flex-row justify-between items-baseline px-8 pb-8"
          >
            <div class="">
              <h2 class="slice-title text-left">
                {{ slice.primary.title }}
              </h2>
              <div class="text-pretty max-w-md mt-4 text-sm">
                <PrismicRichText :field="slice.primary.description" />
              </div>
            </div>
            <div v-if="!slice.primary.search_bar" class="">
              <ProductSort @select="sortProducts" />
              <UButton
                to="/products"
                variant="link"
                size="xl"
                color="neutral"
                class="underline"
              >
                View All
              </UButton>
            </div>
          </div>
          <div
            v-if="slice.primary.search_bar"
            class="container grid md:grid-cols-[25%_1fr] gap-8 md:min-h-[80dvh] relative"
          >
            <div class="fixed top-16 left-0 sm:hidden bg-white w-full p-4">
              <USlideover side="left" description="&nbsp;">
                <UButton>Filters</UButton>
                <template #body>
                  <SearchBar />
                </template>
              </USlideover>
            </div>
            <div
              class="bg-white py-2 px-4 rounded-2xl shadow order-last md:order-first sticky top-16 h-fit"
            >
              <SearchBar />
            </div>
            <div class="">
              <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto">
                <li v-for="(product, p) in products" :key="p">
                  <ProductCard :product />
                </li>
              </ul>
            </div>
          </div>

          <ul
            v-else
            class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 container mx-auto py-12"
          >
            <li v-for="(product, p) in products" :key="p">
              <ProductCard :product />
            </li>
          </ul>
        </div>
      </template>
    </Suspense>
  </section>
</template>

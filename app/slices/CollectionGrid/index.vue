<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.CollectionGridSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
const productStore = useProductStore();
await productStore.loadCollections(3);
const { collections } = storeToRefs(productStore);
console.log("Collections", collections.value);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-12 bg-white"
  >
    <h2 class="pb-6 text-center text-4xl font-heading">
      {{ slice.primary.title }}
    </h2>
    <ul class="grid md:grid-cols-3 gap-6 px-8">
      <li
        v-for="(collection, c) in collections"
        :key="c"
        class="category_card grid overflow-hidden rounded-2xl"
      >
        <NuxtLink :to="`/collections/${collection.handle}`" class="">
          <div class="hover:scale-110 transition-transform grid-stack group duration-300">
            <img
              :src="collection.image?.src"
              class="stacked w-full aspect-video object-cover"
            />
            <div
              class="stacked flex items-end justify-start text-2xl group-hover:scale-90 transition-transform"
            >
              <h3 class="block bg-primary/20 backdrop-blur-2xl p-1 px-3 w-full">
                {{ collection.title }}
              </h3>
            </div>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

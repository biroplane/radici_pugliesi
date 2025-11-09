<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.TestimonialListSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
const reviewCount = computed(() => props.slice.primary.count || 3);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bg-white text-secondary-800 py-6"
  >
    <div class="flex flex-col items-center justify-center max-w-2xl mx-auto py-6">
      <h2 class="slice-title">Le testimonianze dei clienti</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
      <div
        v-for="i in reviewCount"
        :key="i"
        class="flex flex-col gap-4 items-center justify-between mb-6"
      >
        <div class="">
          <UIcon
            v-for="j in 5"
            :key="j"
            name="i-mingcute-star-fill"
            class="text-yellow-500"
          />
        </div>
        <h3 class="font-medium">Title</h3>
        <div>Small description</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.AlternateGridSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <div class="grid sm:grid-cols-2 min-h-96 md:h-96">
      <div
        class="overflow-hidden h-96 md:h-auto"
        :class="{ 'order-last': slice.variation === 'imageRight' }"
      >
        <PrismicImage
          :field="slice.primary.side_image"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="p-6 flex flex-col gap-8">
        <div class="slice-title text-left">
          <PrismicRichText :field="slice.primary.title" />
        </div>
        <div class="text-sm">
          <PrismicRichText :field="slice.primary.description" />
        </div>
        <div class="mt-6">
          <UButton>
            <prismic-link :field="slice.primary.cta_button" />
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>

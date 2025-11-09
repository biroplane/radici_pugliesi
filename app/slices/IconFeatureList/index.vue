<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { getSliceComponentProps } from "@prismicio/vue";

// Props from Prismic slice
const { slice } = defineProps(
  getSliceComponentProps<Content.IconFeatureListSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bg-primary text-white py-6"
  >
    <div
      v-if="slice.variation === 'default'"
      class="flex flex-col items-center justify-center max-w-2xl mx-auto py-6"
      :class="{ hidden: slice.variation !== 'default' }"
    >
      <h2 class="slice-title">
        <PrismicRichText :field="slice.primary.section_title" />
      </h2>
      <div class="">
        <PrismicRichText :field="slice.primary.section_description" />
      </div>
    </div>
    <div
      class="gap-12 flex flex-col md:flex-row mx-auto justify-center"
      :class="[slice.variation === 'default' ? 'max-w-4xl' : 'w-full']"
    >
      <div
        v-for="(feature, f) in slice.primary.features"
        :key="f"
        class="flex gap-4"
        :class="{
          'flex-col justify-between': slice.variation === 'default',
          'justify-center items-center': slice.variation === 'compact',
        }"
      >
        <div v-if="slice.variation === 'default'" class="">
          <PrismicImage :field="(feature as any).icon" />
        </div>
        <div v-if="slice.variation === 'compact'">
          <UIcon :name="(feature as any).icon_class" size="24" class="mt-1" />
        </div>
        <div
          class="font-bold"
          :class="{
            'text-center': slice.variation === 'compact',
            'text-2xl': slice.variation === 'default',
          }"
        >
          <PrismicRichText :field="feature.title" />
        </div>
        <div v-if="slice.variation === 'default'">
          <PrismicRichText :field="feature.description" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.HeroSlice>(["slice", "index", "slices", "context"])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="flex h-[80dvh] w-full items-center justify-center p-8"
  >
    <div
      class="grid-stack w-full h-full overflow-hidden rounded-3xl shadow-lg text-white"
    >
      <div class="stacked w-full h-full overflow-hidden">
        <PrismicImage
          :field="slice.primary.background_image"
          class="w-full h-full object-cover"
        />
      </div>
      <div
        class="stacked self-end w-full bg-white/30 backdrop-blur-lg px-4 py-8 flex flex-col gap-4 items-start"
      >
        <h1 class="text-4xl font-heading">
          {{ slice.primary.title }}
        </h1>
        <div class="max-w-xl">
          <PrismicRichText :field="slice.primary.body" />
        </div>
        <PrismicLink
          :field="slice.primary.link"
          variant="solid"
          color="primary"
          class="underline font-medium text-primary"
        >
          {{ slice.primary.link.text }}
        </PrismicLink>
      </div>
    </div>
  </section>
</template>

<style>
.grid-stack {
  @apply grid;

  grid-template-areas: "stack";
}
.stacked {
  grid-area: stack;
}
</style>

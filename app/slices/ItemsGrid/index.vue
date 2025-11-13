<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.ItemsGridSlice>(["slice", "index", "slices", "context"])
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-12"
    :class="[slice.primary.color]"
  >
    <div class="container px-4 md:px-12">
      <h2 class="slice-title pb-8">
        {{ slice.primary.title }}
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(item, i) in slice.primary.items"
          :key="i"
          class="flex flex-col items-center gap-4"
        >
          <div class="mx-auto">
            <PrismicImage :field="item.image" />
          </div>
          <h2 class="text-lg font-bold w-full text-center md:text-left">
            {{ item.title }}
          </h2>
          <div class="text-sm text-center md:text-left px-4 md:px-0">
            <PrismicRichText :field="item.body" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/app.css";

.primary {
  @apply bg-gradient-to-tr from-primary-300 to-primary-500;
}

.secondary {
  @apply bg-gradient-to-tr from-secondary-300 to-secondary-500;
}
</style>

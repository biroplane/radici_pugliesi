<script setup lang="ts">
import type * as prismic from "@prismicio/client";
import type { FeraReview } from "~/models/fera";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<prismic.Content.GoogleReviewsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
// const ss = useShopStore()
// if (ss.place?.status !== 'OK') {
//   await ss.loadPlace()
// }

// await shop.loadReviews()
const reviews = useReviewStore();
await reviews.loadReviews();
console.log("Reviews loaded", reviews?.reviews);
const loading = ref(false);
const error = ref(false);

const activeReviews = computed(() => {
  console.log("Reviews", reviews.reviews);
  return reviews?.reviews
    ?.filter((r: FeraReview) => r.rating > 3)
    ?.slice(0, props.slice.primary.per_page ?? 6);
});
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-12 bg-neutral-100"
  >
    <div v-if="loading" class="flex justify-center">
      <Icon name="svg-spinners:3-dots-bounce" size="32" />
    </div>
    <div v-else-if="error" class="flex justify-center">
      <span class="text-red-500">Error: {{ error }}</span>
    </div>
    <div v-else class="max-w-4xl mx-auto">
      <h5 class="text-4xl italic text-center font-heading text-primary-700">
        {{ slice.primary.title }}
      </h5>
      <div
        class="container max-w-2xl mx-auto text-sm font-light text-center text-neutral-700 text-balance"
      >
        <PrismicRichText :field="slice.primary.description" />
      </div>
      <div class="grid grid-cols-1 gap-8 px-12 mt-12 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(review, r) in activeReviews"
          :key="r"
          class="p-4 bg-white rounded-md shadow"
        >
          <FeraCard :review />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="postcss"></style>

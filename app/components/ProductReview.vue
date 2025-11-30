<script setup lang="ts">
const props = defineProps<{ id: string }>();

// const { FERA_PUBLIC_KEY } = useRuntimeConfig();

// fera(FERA_PUBLIC_KEY);
// const reviewStore = useReviewStore();
const reviews = ref<any[]>([]);
onMounted(async () => {
  // reviews.value = await reviewStore.getReviewById(props.id);
  // console.log("%cReview", "color:pink;font-size:2rem", reviews.value);
  if (import.meta.client && !window.fera!) {
    if (!window.fera) return;
    // window.fera.on("ready", (evt: any) => {
    //   console.log("FERA READY", evt);
    // });
    window.fera.getReviews(props.id, (r: any) => {
      console.log("REVIEWS ", r);
      reviews.value = r;
    });
    console.log("REVIEWS LLALALALAL ", props.id);
  }
});
</script>

<template>
  <div class="">
    <div
      v-if="reviews.length > 0"
      data-fera-container="product_reviews"
      :data-product-id="id"
    />
    <div v-else class="prose max-w-none">
      <h2>Nessuna recensione per questo prodotto.</h2>
      <a href="#" data-fera-action="writeReview" :data-product="id" class="btn cta"
        >✨ Scrivi una recensione ✨</a
      >
    </div>
  </div>
</template>

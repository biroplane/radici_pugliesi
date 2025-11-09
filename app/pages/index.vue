<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("[homepage]", () =>
  prismic.client.getSingle("homepage")
);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<template>
  <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
</template>

<style scoped>
@reference "~/assets/css/app.css";
.grid-stack {
  @apply grid;

  grid-template-areas: "stack";
}
.stacked {
  grid-area: stack;
}
</style>

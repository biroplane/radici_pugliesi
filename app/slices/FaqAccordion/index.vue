<script setup lang="ts">
import type { asHTML, Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.FaqAccordionSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const prismic = usePrismic();

const { data } = await useAsyncData("faq-accordion-data", () =>
  prismic.client.getSingle("faq")
);
const faqs = computed(
  () =>
    data.value?.data.items.map((faq) => ({
      label: faq.summary?.toString(),
      body: faq.body,
    })) || []
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="max-w-4xl mx-auto py-12"
  >
    <div class="text-center mb-6">
      <h2 class="slice-title">
        {{ slice.primary.title }}
      </h2>
      <PrismicRichText :field="slice.primary.description" />
    </div>
    <UAccordion :items="faqs">
      <template #body="{ item }">
        <PrismicRichText :field="item.body" />
      </template>
    </UAccordion>
  </section>
</template>

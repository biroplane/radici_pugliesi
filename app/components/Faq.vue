<script lang="ts" setup>
const prismic = usePrismic();
const { data: faqs } = await useAsyncData("faqs", () =>
  prismic.client.getByUID("faq", "faq")
);
console.log("FAQS LOADED", faqs.value);
</script>

<template>
  <section>
    <UAccordion :items="faqs?.data.items" />
    <!-- <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <div v-for="(faq, f) in faqs?.data.items" :key="f" class="h-full">
        <div
          class="text-primary-700 font-medium h-full font-balance flex justify-between gap-4 select-none border p-4 rounded-lg mb-6"
          :class="[f === openFaq ? 'bg-primary-500/20' : 'bg-neutral-100']"
          @click="toggleFaq(f)"
        >
          <div class="text-sm">
            {{ faq.summary }}
          </div>
          <Icon
            name="i-system-uicons:chevron-up"
            size="24"
            class="flex-none transition-transform"
            :class="{ 'rotate-180': f === openFaq }"
          />
        </div>
        <Transition name="slide">
          <div
            v-if="f === openFaq"
            ref="activeDetail"
            class="text-balance text-black/70 w-full text-sm leading-5 p-4 absolute z-50 shadow-lg bg-white prose"
          >
            <PrismicRichText :field="faq.body" />
          </div>
        </Transition>
      </div>
    </div> -->
  </section>
</template>

<style lang="postcss" scoped>
details {
  @apply py-4;

  summary {
    @apply font-medium text-yellow-800;

    &::-webkit-details-marker {
      display: none;
    }
  }

  div {
    @apply pl-6;
  }
}

details > summary {
  list-style-type: "🞢 ";
}

details[open] > summary {
  margin-bottom: 0.5rem;
}
</style>

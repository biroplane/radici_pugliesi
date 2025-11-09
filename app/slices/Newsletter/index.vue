<script setup lang="ts">
import type * as prismic from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<prismic.Content.NewsletterSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section
    id="newsletter"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="w-full px-4 py-12 bg-gradient-to-tr from-primary-300 to-primary-500"
  >
    <div
      class="container flex flex-col items-center max-w-lg gap-4 mx-auto"
      name="newsletter"
    >
      <h4 class="text-3xl font-medium text-center text-white">
        Resta in contatto con noi
      </h4>
      <p class="max-w-lg text-sm text-center text-neutral-100 text-balance">
        Cogli l'opportunità di restare sempre aggiornato! Iscriviti alla nostra newsletter
        e ricevi uno
        <strong>sconto del 5%</strong> direttamente nella tua casella di posta!.
      </p>
      <NewsletterField />
      <p class="max-w-lg text-xs text-center text-neutral-100 text-balance">
        Compilando questo modulo acconsenti al trattamento dei dati come da
        <NuxtLink to="/privacy" class="underline text-primary-600">
          Privacy Policy
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

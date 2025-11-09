<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
const props = defineProps(
  getSliceComponentProps<Content.GallerySlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
)
const breakpoints = {
  320: {
    itemsToShow: 1.2,
  },
  700: {
    itemsToShow: 3.2,
  },
  1024: {
    itemsToShow: props.slice.primary.per_page,
  },
}
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="h-full py-12"
  >
    <div class="py-6 text-center">
      <h2 class="py-4 text-3xl">
        {{ slice.primary.title }}
      </h2>
      <PrismicRichText :field="slice.primary.description" class="highlight" />
    </div>

    <ClientOnly>
      <Carousel
        :items-to-show="slice.primary.per_page || 3"
        wrap-around
        pause-autoplay-on-hover
        :autoplay="2500"
        :transition="500"
        :breakpoints="breakpoints"
      >
        <Slide
          v-for="(item, i) in slice.items"
          :key="i"
          class="w-screen px-4 h-64"
        >
          <div
            class="relative w-full h-full bg-center bg-cover rounded-md"
            :style="{ backgroundImage: `url(${item.image.url})` }"
          >
            <PrismicLink
              :field="item.link"
              class="absolute max-w-sm px-8 py-3 text-left bottom-10 left-10 balance"
            >
              <span class="highlight">{{ item.label }}</span>
            </PrismicLink>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    </ClientOnly>
  </section>
</template>

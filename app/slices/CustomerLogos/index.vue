<script setup lang="ts">
import type { Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'

defineProps(
  getSliceComponentProps<Content.CustomerLogosSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
)
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="bg-[#f4f0ec]"
  >
    <div
      class="container flex flex-col items-center w-full gap-12 py-16 md:px-6 lg:px-48"
    >
      <div
        v-if="isFilled.richText(slice.primary.eyebrowHeadline)"
        class="text-3xl text-center font-boysand text-primary-600"
      >
        <PrismicRichText :field="slice.primary.eyebrowHeadline" />
      </div>
      <ul
        v-if="slice.items.length > 0"
        class="flex justify-around w-full gap-4"
      >
        <li
          v-for="(item, i) in slice.items"
          :key="i"
          :class="{ 'h-16 md:h-24': slice.primary.small }"
          :style="{ width: `calc(16rem * ${100 / slice.items.length})` }"
        >
          <PrismicLink :field="item.link || '#'" class="w-full h-full">
            <PrismicImage
              :field="item.image"
              class="w-full h-full"
              :class="[slice.primary.small ? 'object-contain' : 'object-cover']"
            />
          </PrismicLink>
        </li>
      </ul>

      <PrismicLink
        v-if="isFilled.link(slice.primary.callToActionLink)"
        :field="slice.primary.callToActionLink"
        class="btn cta"
      >
        {{ slice.primary.callToActionLabel }}
      </PrismicLink>
    </div>
  </section>
</template>

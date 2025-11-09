<script setup lang="ts">
import type { Content } from '@prismicio/client'

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.PackageListSlice>([
    'slice',
    'index',
    'slices',
    'context',
  ]),
)
const prismic = usePrismic()
const { data: packagelist } = await useAsyncData('[packagelist]', () =>
  prismic.client.getByUID('package_content', 'packagelist'))
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="py-12 bg-neutral-100"
  >
    <div class="max-w-5xl px-6 mx-auto">
      <div class="pb-8 text-center text-pretty">
        <h1 class="text-3xl font-medium text-primary">
          {{ slice.primary.title }}
        </h1>
        <PrismicRichText
          :field="slice.primary.description"
          class="text-neutral-400"
        />
      </div>
      <ul class="grid gap-8 md:grid-cols-3">
        <li
          v-for="(item, i) in packagelist?.data.items"
          :key="i"
          class="grid grid-cols-4 gap-4 text-primary"
        >
          <Icon
            :name="item.icon?.toString() ?? ''"
            size="64"
            class="stroke-1"
          />
          <div class="col-span-3">
            <h3 class="text-xl not-italic font-bold font-heading text-pretty">
              {{ item.title }}
            </h3>
            <PrismicRichText
              :field="item.description"
              class="font-light text-neutral-400"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style>
.stroke-1 path {
  stroke-width: 0.75 !important;
}
</style>

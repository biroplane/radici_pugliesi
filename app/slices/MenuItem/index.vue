<script setup lang="ts">
import type { Content } from "@prismicio/client";
import { onClickOutside } from "@vueuse/core";

defineProps(
  getSliceComponentProps<Content.MenuItemSlice>(["slice", "index", "slices", "context"])
);
const submenu = useTemplateRef("submenu");
const isOpen = ref(false);
onClickOutside(submenu, () => {
  isOpen.value = false;
});
</script>

<template>
  <section :data-slice-type="slice.slice_type" :data-slice-variation="slice.variation">
    <PrismicLink
      v-if="slice.variation === 'default'"
      :field="slice.primary.link"
      active-class="text-primary font-medium"
    />
    <div v-else class="relative">
      <NuxtLink
        active="text-primary font-medium to"
        class="flex gap-2 items-center cursor-pointer select-none"
        @click="isOpen = !isOpen"
      >
        {{ slice.primary.label }}
        <UIcon name="i-mingcute-down-line" />
      </NuxtLink>
      <Transition name="appear" mode="out-in">
        <ul
          v-if="isOpen"
          ref="submenu"
          class="absolute bg-white rounded-b-2xl flex flex-col py-4 shadow-2xl"
        >
          <li
            v-for="(item, i) in slice.primary.children"
            :key="i"
            class="px-4 py-1 hover:bg-primary hover:text-white"
          >
            <PrismicLink :field="item.link" active-class="text-primary-700 font-medium" />
          </li>
        </ul>
      </Transition>
    </div>
  </section>
</template>

<style>
.appear-enter-from,
.appear-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.appear-enter-active,
.appear-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>

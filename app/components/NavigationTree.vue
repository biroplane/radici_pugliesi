<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { components } from "~/slices";

const prismic = usePrismic();
const { data: navigation } = await useAsyncData("navigation", () =>
  prismic.client.getSingle("main_navigation")
);
</script>

<template>
  <SliceZone
    wrapper="ul"
    :slices="navigation?.data.slices ?? []"
    :components="components"
    class="flex gap-4"
  />
</template>

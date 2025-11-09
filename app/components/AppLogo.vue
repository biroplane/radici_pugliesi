<script setup lang="ts">
withDefaults(
  defineProps<{
    variants?: "round" | "white" | "light" | "dark" | "green";
  }>(),
  { variants: "round" }
);
</script>

<template>
  <NuxtLink to="/" class="font-heading">
    <img :src="`/logo_${variants}.svg`" class="w-full h-12 object-contain" />
  </NuxtLink>
</template>

<style scoped></style>

<script setup lang="ts">
function setFavIcon() {
  const isDark =
    window?.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const favicon = computed(() => (isDark ? "/logo_white.svg" : "/logo_dark.svg"));

  useFavicon(favicon.value, { rel: "favicon" });
}

onMounted(() => {
  setFavIcon();
});
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

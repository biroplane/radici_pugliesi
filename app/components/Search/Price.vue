<script setup lang="ts">
const emits = defineEmits(["update"]);
const value = ref([25, 75]);
watch(value, (newValue) => {
  emits("update", newValue);
});
</script>

<template>
  <div class="py-4">
    <USlider v-model="value" />
    <div class="grid grid-cols-2 gap-4 mt-4">
      <UInput v-model="value[0]" icon="i-lucide-euro" />
      <UInput v-model="value[1]" icon="i-lucide-euro" />
    </div>
  </div>
</template>

<script setup lang="ts">
const productStore = useProductStore();
await productStore.loadCollections(9);
</script>

<template>
  <div class="">
    <ul class="flex flex-col">
      <li
        v-for="(collection, c) in productStore.activeCollections"
        :key="c"
        class="cursor-pointer hover:bg-primary-100 py-1 hover:px-2 transition-all"
      >
        {{ collection.title }}
      </li>
    </ul>
  </div>
</template>

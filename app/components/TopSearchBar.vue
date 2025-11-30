<script setup lang="ts">
const isOpen = ref(false);
const searchCard = useTemplateRef("searchCard");

onClickOutside(searchCard, () => {
  isOpen.value = false;
});
const searchStatus = ref<"ready" | "done" | "empty">("ready");
const results = ref<any[]>([]);
</script>

<template>
  <div class="relative">
    <UButton
      icon="i-system-uicons-search"
      variant="ghost"
      color="neutral"
      @click="isOpen = !isOpen"
    />
    <Transition name="slide-in" appear mode="in-out">
      <UCard v-if="isOpen" ref="searchCard" class="absolute right-0 min-w-96 shadow-lg">
        <UInput placeholder="Search" icon="i-system-uicons-search" class="w-full" />

        <ul
          v-if="results.length > 0"
          class="flex flex-col text-sm max-h-96 overflow-y-auto no-scrollbar mt-4"
        >
          <li v-for="result in 10" :key="result">
            <h6>Result {{ result }}</h6>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
          </li>
        </ul>
        <div v-if="results.length === 0 && searchStatus === 'done'" class="mt-4">
          No results
        </div>
      </UCard>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui'

const emits = defineEmits(['search'])
const openTabs = ref(['2', '1', '0'])
const query = ref([])
const items = [
  {
    label: 'Collezione',
    trailingIcon: 'i-lucide-plus',
    component: defineAsyncComponent(() => import('./Collections.vue')),
  },
  {
    label: 'Disponibilità',
    trailingIcon: 'i-lucide-plus',
    component: defineAsyncComponent(() => import('./Availability.vue')),
  },
  {
    label: 'Prezzo',
    trailingIcon: 'i-lucide-plus',
    component: defineAsyncComponent(() => import('./Price.vue')),
  },
  {
    label: 'Ordina',
    trailingIcon: 'i-lucide-plus',
    component: defineAsyncComponent(() => import('../Product/Sort.vue')),
  },
] satisfies AccordionItem[]

watchDebounced(query, (newQuery) => {
  console.log('[DEBUG] new Query', newQuery)
  emits('search', newQuery)
}, { debounce: 500, maxWait: 5000 })
</script>

<template>
  <div class="">
    <h2 class="py-4 font-bold text-xl">Filtra i prodotti</h2>
    <UAccordion v-model="openTabs" :items="items" type="multiple" :collapsible="false">
      <template #body="{ item }">
        <Component :is="item.component" @update="query = $event" />
      </template>
    </UAccordion>
  </div>
</template>

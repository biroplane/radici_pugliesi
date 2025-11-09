<script setup lang="ts">
defineProps<{
  type?: "product" | "collection";
  collectionId?: number | string | null;
}>();

const emits = defineEmits(["select"]);
const SORT_TYPE = ref([
  {
    id: "1",
    label: "I più venduti",
    value: "BEST_SELLING",
    reverse: false,
  },
  {
    id: "2",
    label: "Nome A-Z",
    value: "TITLE",
    reverse: false,
  },
  {
    id: "3",
    label: "Nome Z-A",
    value: "TITLE",
    reverse: true,
  },
  {
    id: "4",
    label: "Prezzo crescente",
    value: "PRICE",
    reverse: false,
  },
  {
    id: "5",
    label: "Prezzo decrescente",
    value: "PRICE",
    reverse: true,
  },
  // {
  //   id: "6",
  //   label: "Più recente",
  //   value: "CREATED_AT",
  //   reverse: true,
  // },
]);
const sortType = ref("2");

function selectItem() {
  console.log("SELECTED ITEM", sortType.value);
  const _item = SORT_TYPE.value.find((i) => i.id === sortType.value);
  emits("select", _item);
}
</script>

<template>
  <div>
    <USelect
      v-model="sortType"
      :items="SORT_TYPE"
      :ui="{ base: ['w-full', 'min-w-48'] }"
      value-key="id"
      label-key="label"
      @change="selectItem"
    />
  </div>
</template>

<style lang="postcss" scoped></style>

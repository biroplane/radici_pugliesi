<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("[single_product]", () =>
  prismic.client.getSingle("single_product")
);

const ps = useProductStore();
const route = useRoute();
await ps.one(route.params.handle as string);

const recommended = ref();

// import { components } from "~/slices";

const activeVariant = ref(0);

useHead({
  title: ps.product?.title,
  meta: [
    {
      name: "description",
      content: ps.product?.description,
    },
  ],
});

const analytics = useAnalytics();

onMounted(async () => {
  analytics.viewItem({
    id: ps.product?.variants.nodes[activeVariant.value].id,
    price: ps.product?.actual.price.amount,
    title: ps.product?.title,
  });
  recommended.value = await ps.loadRecommended(ps.product?.id);
});
</script>

<template>
  <div class="">
    <SliceZone
      wrapper="main"
      :slices="page?.data.slices ?? []"
      :components="components"
    />
  </div>
</template>

<style lang="postcss" scoped>
img.active {
  view-transition-name: product-image;
}

details {
  @apply py-4;
  summary {
    @apply font-bold;

    &::-webkit-details-marker {
      display: none;
    }
  }
  div {
    @apply pl-6;
  }
}
details > summary {
  list-style-type: "🞢";
}

details[open] > summary {
  margin-bottom: 0.5rem;
}

.additional-info {
  p {
    @apply py-4;
  }
}
</style>

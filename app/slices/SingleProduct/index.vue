<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.SingleProductSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);

const ps = useProductStore();
const route = useRoute();
await ps.one(route.params.handle as string);
console.log("%cSTORE PRODUCT ID", "font-size:2rem; color:tomato", ps.product);

// import { components } from "~/slices";

const activeVariant = ref(0);
const activeMetafields = computed(() => ps.product.metafields.filter((m: any) => m));

const id = computed(() => ps.product?.id.split("/").at(-1));
const activeImage = ref(0);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="p-8 bg-white"
  >
    <div class="grid sm:grid-cols-2 gap-2">
      <div
        class="w-full h-full flex flex-col items-start gap-4 justify-center p-0 py-6 md:p-6 order-2 md:order-1"
      >
        <div
          v-if="ps.product.totalInventory < 1"
          class="tracking-tight text-red-500 border rounded-lg px-2 py-1 -rotate-3 shadow bg-red-100 text-xs"
        >
          Sold Out
        </div>
        <h1 class="text-lg md:text-3xl">
          {{ ps.product.title }}
        </h1>
        <div class="flex items-center gap-2">
          <div
            v-if="ps.product.old.price.amount > 0"
            class="inline px-2 py-1 line-through bg-yellow-300 rounded-md"
          >
            {{ formatMoney(ps.product.old.price.amount) }}
          </div>
          <h4 class="text-lg md:text-3xl">
            {{ formatMoney(ps.product.actual.price.amount) }}
          </h4>
        </div>
        <AddToCart
          :product="ps.product"
          show-label
          :disabled="ps.product.variant?.nodes[activeVariant]"
        />
        <div
          data-fera-container="product_reviews_summary"
          :data-product-id="id"
          class="my-4"
        />
        <div class="my-6">
          <h4>Ti piace questo prodotto? <strong>Condividilo</strong></h4>
          <div class="flex flex-row gap-2">
            <SocialShare
              v-for="network in ['facebook', 'twitter', 'whatsapp', 'telegram', 'email']"
              :key="network"
              :network="network"
              :styled="false"
              :label="false"
              class="p-2 transition-colors rounded-sm text-primary-500 hover:bg-primary-500 hover:text-white"
            />
          </div>
          <div class="py-4">
            <PaymentMethodList />
          </div>
        </div>
        <div class="flex flex-col gap-4 mt-12">
          <ProductDetail
            v-for="(meta, m) in activeMetafields"
            :key="m"
            :k="meta.key"
            :value="meta.value"
          />
        </div>
      </div>
      <div class="order-1 md:order-2">
        <img
          v-if="ps.product.images?.nodes[activeImage]?.src"
          :src="ps.product.images.nodes[activeImage].src"
          alt=""
          class="object-contain object-center w-full rounded-lg h-64 md:h-auto"
          loading="lazy"
        />
        <div class="flex gap-2">
          <ul class="flex gap-2 flex-wrap justify-around w-full">
            <li
              v-for="(variant, v) in ps.product?.variants?.nodes"
              :key="v"
              class="max-w-12 md:max-w-18 aspect-square rounded-lg shadow"
              @click="activeVariant = v"
            >
              <img :src="variant.image.url" class="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <div v-if="ps.product" class="container py-12">
      <div class="grid w-full gap-8 md:grid-cols-2">
        <div class="flex items-start justify-between w-full md:hidden font-barlow">
          <div class="">
            <h1 class="text-3xl font-bold">
              {{ ps.product.title }}
            </h1>
            <div class="flex items-center gap-2">
              <div
                v-if="ps.product.old.price.amount > 0"
                class="inline px-2 py-1 line-through bg-yellow-300 rounded-md"
              >
                {{ formatMoney(ps.product.old.price.amount) }}
              </div>
              <h4 class="text-3xl">
                {{ formatMoney(ps.product.actual.price.amount) }}
              </h4>
            </div>
          </div>
        </div>
        <div
          v-if="ps.product.images?.nodes.length > 0"
          class="flex flex-col h-full gap-6 lg:flex-row"
        >
          <div class="w-full">
            <div class="w-full aspect-square">
              <div class="relative w-full h-full">
                <div
                  v-if="ps.product.totalInventory < 1"
                  class="absolute px-8 py-2 bottom-3 bg-primary-500"
                >
                  Sold out 🤷
                </div>
                <img
                  v-if="ps.product.images?.nodes[activeImage]?.src"
                  :src="ps.product.images.nodes[activeImage].src"
                  alt=""
                  class="object-cover object-center w-full h-full rounded-lg"
                  loading="lazy"
                />
              </div>
            </div>
            <ul
              class="flex flex-wrap justify-start order-last gap-2 px-0 mt-6 md:gap-6 flex-rwo md:flex-nowrap lg:order-first md:px-2"
            >
              <li
                v-for="(image, i) in ps.product.images?.nodes"
                :key="image.src"
                class="h-20 p-2 overflow-hidden transition-colors rounded-md cursor-pointer md:h-24 hover:bg-primary-100 aspect-square"
                :class="{ 'bg-primary-500/10': i === activeImage }"
                @click="activeImage = i"
              >
                <img
                  :src="image.src"
                  loading="lazy"
                  class="object-cover w-full h-full rounded-md shadow-sm"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="font-barlow">
          <div class="hidden md:block">
            <h1 class="mb-4 text-3xl font-bold text-brown-700">
              {{ ps.product.title }}
            </h1>
            <div
              v-if="ps.product.old.price.amount > 0"
              class="inline px-2 py-1 line-through bg-yellow-300 rounded-md"
            >
              {{ formatMoney(ps.product.old.price.amount) }}
            </div>
            <h4 class="mt-2 text-3xl">
              {{ formatMoney(ps.product.actual.price.amount) }}
            </h4>
          </div>
          <div class="">
            <div
              class="py-4 md:py-12 text-black/70"
              v-html="ps.product.descriptionHtml || ps.product.description"
            />
          </div>
          <div class="text-xl">
            <div
              data-fera-container="product_reviews_summary"
              :data-product-id="id"
              class="my-4"
            />
            <UButton
              v-if="ps.product.totalInventory > 0"
              icon="i-mingcute-shopping-cart-1-line"
              label="Aggiungi al carrello"
              :disabled="ps.product.variant?.nodes[activeVariant]"
              @click="
                addToCart({
                  id: ps.product.variants?.nodes[activeVariant].id,
                  product: ps.product,
                })
              "
            />
          </div>

          <div class="my-6">
            <h4>Ti piace questo prodotto? <strong>Condividilo</strong></h4>
            <div class="flex flex-row gap-2">
              <SocialShare
                v-for="network in [
                  'facebook',
                  'twitter',
                  'whatsapp',
                  'telegram',
                  'email',
                ]"
                :key="network"
                :network="network"
                :styled="false"
                :label="false"
                class="p-2 transition-colors rounded-sm text-primary-500 hover:bg-primary-500 hover:text-white"
              />
            </div>
            <div class="py-4">
              <PaymentMethodList />
            </div>
          </div>
          <div class="flex flex-col gap-4 mt-12">
            <ProductDetail
              v-for="(meta, m) in activeMetafields"
              :key="m"
              :k="meta.key"
              :value="meta.value"
            />
          </div>
        </div>
      </div>

      <div class="py-4 mt-12 border-t md:py-12">
        <ProductReview :id="id" />
      </div>
    </div> -->
  </section>
</template>

<style scoped>
@reference "~/assets/css/app.css";
h1 {
  &::first-letter {
    @apply font-heading text-5xl;
  }
}
</style>

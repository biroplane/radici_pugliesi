<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    product: any;
    variant?: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost" | undefined;
    color?:
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "error"
      | "neutral"
      | undefined;
    size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
    showLabel?: boolean;
  }>(),
  {
    variant: "solid",
    color: "primary",
  }
);

const cartStore = useCartStore();
async function addToCart() {
  console.log("Add to cart", props.product);
  await cartStore.addToCart(props.product.variants.nodes[0].id, props.product);
  await cartStore.loadCart();
  cartStore.drawer = true;
  if (cartStore.cart.lines.nodes.length > 1) return;
  setTimeout(() => {
    cartStore.drawer = false;
  }, 2000);
}
</script>

<template>
  <UButton
    :variant
    :color
    :size
    class="flex items-center justify-center"
    icon="i-mingcute-shopping-cart-1-line"
    :label="showLabel ? 'Aggiungi' : undefined"
    @click="addToCart"
  />
</template>

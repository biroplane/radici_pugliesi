<script setup lang="ts">
const cartStore = useCartStore();

async function checkQuantityChange(quantity: number, line: any) {
  console.log("quantity", quantity, [
    {
      quantity,
      id: line.id,
      merchandiseId: line.merchandise.id,
    },
  ]);
  // if (quantity === 0) {
  //   await cartStore.removeFromCart(line.id);
  // } else {
  await cartStore.updateCart([
    {
      quantity,
      id: line.id,
      merchandiseId: line.merchandise.id,
    },
  ]);
  // }
}

watch(
  () => cartStore.cart?.lines?.nodes.length,
  (length) => {
    if (length === 0) {
      cartStore.drawer = false;
    }
  }
);
</script>

<template>
  <USlideover v-model:open="cartStore.drawer" title="Carrello" description="Cart drawer">
    <UButton icon="i-system-uicons-cart" variant="ghost" color="neutral" />
    <template #description>
      <div
        v-if="cartStore.cart.lines?.nodes.length"
        class="p-4 my-4 border-2 border-amber-500 rounded-lg bg-amber-500/25 text-xs"
      >
        <div v-if="cartStore.cart.cost.totalAmount.amount < 99" class="">
          Ti mancano solo
          <strong>{{ formatMoney(99 - cartStore.cart.cost.totalAmount.amount) }}</strong>
          per ottenere la spedizione gratuita!
          <NuxtLink to="/products" class="underline"> Continua lo shopping </NuxtLink>,
          aggiungi più prodotti per ottenere la
          <strong>spedizione gratuita</strong>
        </div>
        <h2 v-else class="text-lg text-center font-body">
          <strong>Complimenti!</strong> Hai ottenuto la spedizione gratuita!
        </h2>
      </div>
    </template>
    <template #body>
      <ul
        v-if="cartStore.cart.lines"
        class="max-w-full whitespace-pre flex flex-col gap-2"
      >
        <li
          v-for="(line, l) in cartStore.cart.lines.nodes"
          :key="l"
          class="flex gap-4 odd:bg-neutral-100 p-2"
        >
          <img
            :src="line.merchandise.product.images.nodes[0].thumbnail"
            class="max-w-12 aspect-square object-cover flex-none"
          />
          <div class="">
            <div class="text-sm break-after-all text-balance">
              {{ line.merchandise.product.title }}
            </div>
            <div class="flex justify-between items-center w-full gap-2">
              <UInputNumber
                v-model="line.quantity"
                :min="0"
                size="sm"
                color="neutral"
                variant="ghost"
                :decrement-icon="line.quantity > 1 ? 'i-lucide-minus' : 'i-lucide-trash'"
                @change="checkQuantityChange(line.quantity, line)"
              />
              <UButton
                v-if="line.quantity > 1"
                icon="i-lucide-trash"
                variant="ghost"
                color="error"
                size="sm"
              />
            </div>
          </div>

          <div class="">
            {{ formatMoney(line.estimatedCost.totalAmount.amount) }}
          </div>
        </li>
      </ul>
    </template>
    <template #footer>
      <div class="w-full gap-3">
        <div class="flex justify-between w-full mb-2">
          <p>Totale</p>
          <p class="font-bold">
            {{ formatMoney(cartStore.cartTotal.totalAmount.amount) }}
          </p>
        </div>
        <UButton color="primary" icon=""> Termina e paga </UButton>
      </div>
    </template>
  </USlideover>
</template>

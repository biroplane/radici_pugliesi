<script setup lang="ts">
const shopStore = useShopStore();
</script>

<template>
  <div class="">
    <h6>Metodi di pagamento accettati</h6>
    <ul class="flex gap-2 flex-wrap">
      <li v-for="payment in shopStore.paymentIcons" :key="payment">
        <img :src="payment" loading="lazy" class="object-contain w-12 h-12" />
      </li>
    </ul>
  </div>
</template>

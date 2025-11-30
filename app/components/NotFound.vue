<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
</script>

<template>
  <div class="grid md:grid-cols-2">
    <ClientOnly>
      <Vue3Lottie
        animation-link="https://lottie.host/886fbcb9-8581-4fdf-869b-d823e05c978d/FBoHhcLhrh.json"
        :speed=".5"
        class="max-h-96 lg:max-h-[32rem]"
      />
    </ClientOnly>
    <div class="flex flex-col justify-center p-12 text-primary-700">
      <h4 class=" text-current/50">
        ¯\_(ツ)_/¯
      </h4>
      <h1 class="text-4xl not-italic text-normal md:text-6xl lg:text-7xl">
        Spiancente
      </h1>
      <p>L'articolo che cercavi non è più disponibile</p>
      <p>Non temere! altri prodotti sono pronti a stupirti.</p>
      <NuxtLink to="/products" class="mt-4 font-medium underline">
        Clicca qui
      </NuxtLink>
    </div>
  </div>
</template>

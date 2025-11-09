<script setup lang="ts"></script>

<template>
  <UHeader mode="slideover">
    <template #title>
      <ClientOnly>
        <div class="flex items-center gap-2">
          <AppLogo class="flex-none" />
          <div class="font-heading text-primary-800 text-2xl hidden md:block">
            Radici Pugliesi
          </div>
        </div>
      </ClientOnly>
    </template>

    <div class="flex-grow w-full">
      <NavigationTree />
    </div>
    <template #right>
      <UAvatar alt="Gaetano Vallarelli" />
    </template>
  </UHeader>

  <!-- <header
    class="px-4 h-full flex items-center justify-between gap-4 border-b border-neutral-200 shadow-2xl/10"
  >
    <div class="flex-none flex gap-4 items-center" />
    <div class="w-full flex-grow" />
    <div class="">U</div>
  </header> -->
</template>

<style scoped></style>

<template>
  <div class="grid grid-rows-[4rem_auto] h-dvh">
    <AppHeader class="" />
    <div class="overflow-y-auto">
      <UMarquee class="bg-primary-500 py-1">
        <span>Spadizioni <strong>gratis</strong> sopra i 99 €</span>
      </UMarquee>
      <div class="">
        <slot />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

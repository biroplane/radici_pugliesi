<template>
  <div class="grid grid-rows-[4rem_auto] h-dvh overflow-y-hidden">
    <AppHeader class="" />
    <div class="overflow-y-auto">
      <div class="">
        <slot />
      </div>
      <AppFooter />
    </div>
  </div>
</template>

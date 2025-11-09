<script setup lang="ts"></script>

<template>
  <footer
    class="bg-secondary-900 text-white p-8 grid md:grid-cols-4 grid-rows-[3rem_auto] gap-x-12 gap-y-4"
  >
    <div class="col-span-full flex gap-4 items-center">
      <AppLogo variants="light" />
      <h4>Radici pugliesi</h4>
    </div>
    <div class="">
      <p class="text-sm my-6">
        Radici Pugliesi è l'azienda a conduzione familiare specializzata nella produzione
        di olio extra vergine autentico, che porta sulle tavole il sapore genuino della
        tradizione pugliese.
      </p>
    </div>

    <div class="">
      <p class="mt-4">
        <strong>Indirizzo:</strong><br />Radici Pugliesi<br />Via A. Manzoni, 15<br />70032
        - Palombaio (BA) Italia
      </p>
      <p class="mt-6"><strong>Telefono</strong>: 080/9955567</p>
      <p><strong>Whatsapp:</strong> 080/9955567</p>
    </div>
    <div class="">
      <h4>Seguici sui social</h4>
      <SocialLinks />
    </div>
    <div class="">
      Iscriviti alla newsletter
      <NewsletterField />
    </div>
  </footer>
</template>

<style scoped>
@reference "~/assets/css/app.css";

footer h4 {
  @apply font-bold text-lg;
}
</style>

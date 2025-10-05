<script setup lang="ts"></script>

<template>
  <footer class="bg-secondary-900 text-white p-8 grid md:grid-cols-4 gap-12">
    <div class="">
      <div class="flex gap-4 items-center">
        <AppLogo />
        <h4>Radici pugliesi</h4>
      </div>
      <p class="text-sm my-6">
        Radici Pugliesi è l'azienda a conduzione familiare specializzata nella produzione
        di olio extra vergine autentico, che porta sulle tavole il sapore genuino della
        tradizione pugliese.
      </p>
      <p>
        <strong>Indirizzo:</strong><br />Radici Pugliesi<br />Via A. Manzoni, 15<br />70032
        - Palombaio (BA) Italia
      </p>
      <p class="mt-6"><strong>Telefono</strong>: 080/9955567</p>
      <p><strong>Whatsapp:</strong> 080/9955567</p>
    </div>

    <div class="">Map</div>
    <div class="">
      <h4>Seguici sui social</h4>
    </div>
    <div class="">Mail</div>
  </footer>
</template>

<style scoped>
@reference "tailwindcss";
footer h4 {
  @apply font-bold text-lg;
}
</style>

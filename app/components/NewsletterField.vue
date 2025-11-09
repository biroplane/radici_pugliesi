<script setup lang="ts">
const isLoading = ref(false);
const isRegistered = ref(false);
const error: Ref<string | null> = ref(null);
const email = ref("");

function handleSubmit() {
  console.log("Form submitted with email:", email.value);
  // Here you can add your logic to handle the newsletter subscription
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isRegistered.value = true;
  }, 2000); // Simulate an async operation
}
</script>

<template>
  <form class="w-full" @submit.prevent="handleSubmit">
    <div v-if="isRegistered" class="flex flex-col items-center">
      <div v-if="error" class="">
        {{ error }}
      </div>
      <div v-else class="px-6 py-2 bg-white border-4 rounded-md border-primary-500">
        Grazie per esserti iscritto
        <UIcon name="i-system-uicons:message" size="64" class="text-primary-400" />
      </div>
    </div>
    <UFieldGroup v-else for="email" class="flex w-full">
      <UInput
        id="email"
        v-model="email"
        variant="subtle"
        type="email"
        class="w-full"
        placeholder="mario.rossi@esempio.com"
        autocomplete="email"
      />
      <UButton
        type="submit"
        name="submitNewsletter"
        variant="solid"
        aria-label="Subscribe to newsletter"
        :icon="isLoading ? 'i-system-uicons:loader' : 'i-system-uicons:mail'"
        :class="{ ' animate-spin': isLoading }"
      />
    </UFieldGroup>
  </form>
</template>

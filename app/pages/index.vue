<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const { data: page } = await useAsyncData("[homepage]", () =>
  prismic.client.getSingle("homepage")
);

useSeoMeta({
  title: page.value?.data.meta_title,
  ogTitle: page.value?.data.meta_title,
  description: page.value?.data.meta_description,
  ogDescription: page.value?.data.meta_description,
  ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<template>
  <!-- HERO -->
  <section class="flex h-[80dvh] w-full items-center justify-center p-8">
    <div class="grid-stack w-full h-full overflow-hidden rounded-3xl shadow-lg">
      <div class="stacked w-full h-full overflow-hidden">
        <img src="https://unsplash.it/640/425" class="w-full h-full object-cover" />
      </div>
      <div
        class="stacked self-end w-full bg-white/30 backdrop-blur-lg px-4 py-8 flex flex-col gap-4 items-start"
      >
        <h1 class="text-3xl font-heading-accent">Title of the card</h1>
        <p class="max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem debitis
          eligendi nam cupiditate. Natus asperiores enim eligendi quas ratione, doloremque
          laborum dolor, fuga quidem quibusdam amet animi a in tempore.
        </p>
        <UButton variant="solid" color="primary"> Action </UButton>
      </div>
    </div>
  </section>
  <!-- 3 steps -->
  <section class="bg-primary text-white py-6">
    <div class="flex flex-col items-center justify-center max-w-2xl mx-auto py-6">
      <h2>3 cose</h2>
      <div class="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat repellendus, iure
        iusto reiciendis veritatis eveniet praesentium ad natus voluptate exercitationem
        sapiente voluptates sint odit aperiam officiis sed magni nihil architecto!
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      <div
        v-for="i in 3"
        :key="i"
        class="flex flex-col gap-4 items-center justify-between"
      >
        <div class="">ICON</div>
        <h3>Title</h3>
        <div>Small description</div>
      </div>
    </div>
  </section>
  <!-- PRODUCT GRID -->
  <ProductsGrid />

  <!-- CATEGORY -->
  <section class="py-6 bg-primary-400">
    <h2 class="py-12 text-center text-4xl font-heading-accent">Categorie</h2>
    <ul class="grid md:grid-cols-3 gap-6 px-8">
      <li
        v-for="i in 3"
        :key="i"
        class="category_card grid grid_stack overflow-hidden rounded-2xl"
      >
        <div class="hover:scale-110 transition-transform">
          <img
            :src="`https://unsplash.it/640/425?random=${i}`"
            class="stacked w-full aspect-video object-cover"
          />
          <div
            class="stacked flex items-center justify-center text-secondary-400 text-4xl bg-yellow-500 105"
          >
            <h3>CATEGORY</h3>
          </div>
        </div>
      </li>
    </ul>
  </section>

  <!-- PERCHE SCEGLIERE -->
  <section class="bg-primary text-white py-6">
    <div class="flex flex-col items-center justify-center max-w-2xl mx-auto py-6">
      <h2>Perché scegliere radici pugliesi</h2>
    </div>
    <div class="grid grid-cols-4 gap-4 container mx-auto">
      <div
        v-for="i in 4"
        :key="i"
        class="flex flex-col gap-4 items-center justify-between"
      >
        <div class="">ICON</div>
        <h3>Title</h3>
        <div>Small description</div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIANZE -->
  <section class="bg-white text-secondary-800 py-6">
    <div class="flex flex-col items-center justify-center max-w-2xl mx-auto py-6">
      <h2>Le testimonianze dei clienti</h2>
    </div>
    <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
      <div
        v-for="i in 3"
        :key="i"
        class="flex flex-col gap-4 items-center justify-between"
      >
        <div class="">
          <UIcon
            name="i-mingcute-star-fill"
            v-for="j in 5"
            class="text-yellow-500"
            :key="j"
          />
        </div>
        <h3>Title</h3>
        <div>Small description</div>
      </div>
    </div>
  </section>
  <SliceZone wrapper="main" :slices="page?.data.slices ?? []" :components="components" />
</template>

<style scoped>
@reference "~/assets/css/app.css";
.grid-stack {
  @apply grid;

  grid-template-areas: "stack";
}
.stacked {
  grid-area: stack;
}
</style>

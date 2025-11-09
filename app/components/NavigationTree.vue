<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
// const { data: items } = await useStorefrontData(
//   "menu",
//   `#graphql
//   query GetNavigation($handle: String!) {
//     menu(handle: $handle) {
//       items {
//         ... on MenuItem {
//           title
//           url
//         }
//       }
//     }
//   }
// `,
//   {
//     variables: {
//       handle: "main-menu",
//     },
//     transform: (data) =>
//       data.menu?.items
//         ?.map((item) => ({
//           label: item.title,
//           to: item.url || undefined,
//         }))
//         .filter((item) => item.to !== null) ?? [],
//   }
// );
const items: NavigationMenuItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Shop",
    to: "/products",
  },
  {
    label: "Categorie",
    to: "/collections",
  },
  {
    label: "Contatti",
    to: "/",
  },
];
</script>

<template>
  <UNavigationMenu :items="items" variant="link" />
</template>

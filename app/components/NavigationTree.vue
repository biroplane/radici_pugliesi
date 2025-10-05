<script setup lang="ts">
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
const items: any[] = [];
</script>

<template>
  <UNavigationMenu :items="items" />
</template>

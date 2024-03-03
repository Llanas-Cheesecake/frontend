<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  import { useCartStore } from "~/store/cart";

  const { $bootstrap } = useNuxtApp()
  const cart = useCartStore();
  // TODO: Apply user-defined CSS here (customization feature)

  // Apply tooltips
  onMounted(() => {
    if (process.client) {
      window.onload = () => {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        // @ts-ignore
        [...tooltips].map(tooltipTriggerEl => new $bootstrap.Tooltip(tooltipTriggerEl))
      };

      // Get cart session
      cart.getCartContents()
    }
  })
</script>

<style lang="scss">

</style>

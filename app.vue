<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  // TODO: Apply user-defined CSS here (customization feature)
</script>

<style lang="scss">
  :root {
    --bg-primary: #77A042;
    --color-text-primary: #FFFFFF;
    --color-text-disabled: color-mix(in srgb,var(--navbar-text), #000 15%);
  }

  .main-content {
    min-height: calc(100vh - 76px - 219px);
  }
</style>
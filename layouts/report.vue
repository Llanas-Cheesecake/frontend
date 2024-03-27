<script setup lang="ts">
  useHead({
    titleTemplate: (title) => {
      return title
          ? `${title} - Reports - Llana's Cheesecake`
          : 'Reports - Llana\'s Cheesecake'
    }
  })
</script>

<template>
  <section class="container-fluid">
    <slot />
  </section>
</template>

<style scoped lang="scss">

</style>
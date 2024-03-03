<script setup lang="ts">
const route = useRoute();

useHead({
  titleTemplate: (title) => {
    return title
        ? `${title} - Admin Panel - Llana's Cheesecake`
        : 'Llana\'s Cheesecake'
  }
})
</script>

<template>
  <div class="admin-panel">
    <section class="content">
      <slot />
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
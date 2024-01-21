<script setup lang="ts">
  const route = useRoute();

  useHead({
    titleTemplate: () => {
      return route.meta.title
          ? `${route.meta.title} - Llana's Cheesecake`
          : 'Llana\'s Cheesecake'
    }
  })
</script>

<template>
  <div>
    <Navbar />

    <section class="main-content container">
      <slot />
    </section>

    <Footer />
  </div>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
  const route = useRoute();

  useHead({
    titleTemplate: () => {
      return route.meta.title
          ? `${route.meta.title} - Llana's Cheesecase`
          : 'Llana\'s Cheesecase'
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
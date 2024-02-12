<script setup lang="ts">
  const route = useRoute();

  useHead({
    titleTemplate: (title) => {
      return title
          ? `${title} - Llana's Cheesecake`
          : 'Llana\'s Cheesecake'
    }
  })
</script>

<template>
  <div>
    <Navbar />

    <!-- Alt navbar -->
    <section id="alt-nav"></section>
    <section id="offcanvas-section"></section>
    <!-- END Alt navbar -->

    <section class="main-content container position-relative">
      <slot />
    </section>

    <Footer />
  </div>
</template>

<style scoped lang="scss">

</style>
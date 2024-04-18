<script setup lang="ts">
  const props = defineProps<{
    currentCategory: string
  }>()
</script>

<template>
  <section data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between">
        <span class="category-name">{{ props.currentCategory }}</span>
        <span>
          <img src="/icons/chevron-down.svg" alt="Open Alt Navbar" width="20" />
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  section {
    background-color: color-mix(in srgb,var(--bg-primary), #000 10%);
    color: var(--color-text-secondary);
    padding: 0.5rem 0;
  }

  .category-name {
    font-weight: bold;
  }

  @media (min-width: 768px) {
    section {
      display: none;
    }
  }
</style>
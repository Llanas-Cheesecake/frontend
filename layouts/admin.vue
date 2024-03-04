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

    <div class="admin-content d-flex gap-4">
      <AdminSideNavbar />

      <section class="content flex-fill">
        <div class="d-flex flex-column gap-4">
          <AdminTopNavbar />

          <slot />
        </div>
      </section>
    </div>


  </div>
</template>

<style lang="scss">
  :root {
    --bg-primary: white;
    --bg-secondary: #f0f3f4;
    --bg-tertiary: #738290;

    --color-text-primary: black;
    --color-text-secondary: white;
    --color-text-disabled: color-mix(in srgb,var(--navbar-text), #000 15%);

    //--color-link: #e5ffb4;

    //--btn-bg-primary: #59702e;
    //--btn-bg-secondary: #f2ffda;
  }

  .bg-primary {
    background-color: var(--bg-primary)!important;
  }

  .bg-secondary {
    background-color: var(--bg-secondary)!important;
  }

  .bg-tertiary {
    background-color: var(--bg-tertiary)!important;
  }

  .btn {
    border-radius: 12px;
    &.btn-outline-primary {
      border: 2px solid var(--bg-tertiary);
      color: var(--bg-tertiary);
      &:hover, &:focus, &.show {
        background-color: var(--bg-tertiary);
        color: var(--color-text-secondary);
        box-shadow: none;
      }
      &:active {
        border-color: var(--bg-tertiary);
      }
    }
  }

  .card {
    box-shadow: 0 2px 4px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.03);
  }

  .admin-panel {
    background-color: #b5c2ca;
    min-height: 100vh;
    padding: 1rem;
  }

  @media (min-width: 1400px) {
    .admin-content {
      width: 1280px;
      margin: 0 auto;
    }
  }
</style>
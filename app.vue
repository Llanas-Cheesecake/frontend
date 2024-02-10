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

  // Color Palette
  // https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff

  :root {
    --bg-primary: #77A042;
    --bg-secondary: #f2ffda;

    --color-text-primary: #FFFFFF;
    --color-text-disabled: color-mix(in srgb,var(--navbar-text), #000 15%);

    --color-link: #e5ffb4;

    --btn-bg-primary: #59702e;
    --btn-bg-secondary: #f2ffda;
  }

  .flicking-pagination-bullet {
    background-color: rgba(10, 10, 10, 0.3);
  }

  .flicking-pagination-bullet-active {
    background-color: var(--bg-primary);
  }

  .flicking-arrow-prev::before, .flicking-arrow-prev::after, .flicking-arrow-next::before, .flicking-arrow-next::after {
    background-color: var(--bg-primary);
  }

  .main-content {
    min-height: calc(100vh - 76px - 219px);
  }

  .bg-primary {
    background-color: var(--bg-primary)!important;
  }

  .bg-secondary {
    background-color: var(--bg-secondary)!important;
  }

  .btn {
    border-color: transparent!important;
    border-radius: 20px;
    &.btn-primary {
      background-color: var(--btn-bg-primary);
      color: white;
      &:active {
        background-color: color-mix(in srgb,var(--btn-bg-primary), #000 15%);
      }
    }
    &.btn-secondary {
      background-color: var(--btn-bg-secondary);
      color: color-mix(in srgb,var(--btn-bg-secondary), #000 65%);
      &:active {
        background-color: color-mix(in srgb,var(--btn-bg-secondary), #000 60%);
      }
    }
  }

  .form-control {
    background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
    border: 1px solid color-mix(in srgb, var(--bg-primary), #000 40%);
    &:focus {
      background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
      border: 1px solid color-mix(in srgb, var(--bg-primary), #000 60%);
      box-shadow: none;
      color: var(--color-text-primary);
    }
    color: var(--color-text-primary);
  }

  a.form-text {
    color: var(--color-link);
  }

  .dropdown-menu {
    border-radius: 0.5rem;
    padding: 0.5rem;
    .dropdown-item {
      border-radius: 8px;
      padding: 0.3rem 0.5rem;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .invalid-feedback {
    color: #f70018;
  }

  #offcanvas-section .offcanvas-backdrop.show {
    opacity: 0!important;
  }

  @media (max-height: 775px) {
    .main-content {
      min-height: initial;
    }
  }

  #offcanvas-section .offcanvas-backdrop.show {
    opacity: 0!important;
  }
</style>

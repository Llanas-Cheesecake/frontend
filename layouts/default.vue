<script setup lang="ts">
  import { useCartStore } from "~/store/cart";
  import { ModalsContainer } from "vue-final-modal";
  import type { ApiResponse } from "~/types/ApiResponse";

  const route = useRoute();

  useHead({
    titleTemplate: (title) => {
      return title
          ? `${title} - Llana's Cheesecake`
          : 'Llana\'s Cheesecake'
    }
  })

  const { $bootstrap } = useNuxtApp()
  const cart = useCartStore();

  // Intersection observer
  const intersection = ref();
  const isNavbarSticking = ref(false)

  const colorBgPrimary = ref('#77A042');
  const colorBgSecondary = ref('#f2ffda');
  const colorTextPrimary = ref('');
  const colorTextSecondary = ref('');
  const colorTextLink = ref('');
  const colorButtonPrimary = ref('');
  const colorButtonSecondary = ref('');
  const colorButtonTextPrimary = ref('');
  const colorButtonTextSecondary = ref('');

  const { data: result, error } = await useFetchAPI<ApiResponse>('/theme', {
    method: "GET"
  });

  if (result.value) {
    const payload = result.value.data;

    colorBgPrimary.value = payload['color-bg-primary'];
    colorBgSecondary.value = payload['color-bg-secondary'];
    colorTextPrimary.value = payload['color-text-primary'];
    colorTextSecondary.value = payload['color-text-secondary'];
    colorTextLink.value = payload['color-text-link'];
    colorButtonPrimary.value = payload['color-btn-primary'];
    colorButtonSecondary.value = payload['color-btn-secondary'];
    colorButtonTextPrimary.value = payload['color-btn-text-primary'];
    colorButtonTextSecondary.value = payload['color-btn-text-secondary'];
  }

  const changeRootColor = (
      bgPrimary: string,
      bgSecondary: string,
      colorTextPrimary: string,
      colorTextSecondary: string,
      colorLink: string,
      buttonPrimary: string,
      buttonSecondary: string,
      buttonTextPrimary: string,
      buttonTextSecondary: string
  ) => {
    document.documentElement.style.setProperty('--bg-primary', bgPrimary);
    document.documentElement.style.setProperty('--bg-secondary', bgSecondary);

    document.documentElement.style.setProperty('--color-text-primary', colorTextPrimary);
    document.documentElement.style.setProperty('--color-text-secondary', colorTextSecondary);
    document.documentElement.style.setProperty('--color-link', colorLink);

    document.documentElement.style.setProperty('--btn-bg-primary', buttonPrimary);
    document.documentElement.style.setProperty('--btn-bg-secondary', buttonSecondary);

    document.documentElement.style.setProperty('--btn-text-primary', buttonTextPrimary);
    document.documentElement.style.setProperty('--btn-text-secondary', buttonTextSecondary);
  }


  // Apply tooltips
  onMounted(() => {
    if (process.client) {
      // Theme System
      changeRootColor(
          colorBgPrimary.value,
          colorBgSecondary.value,
          colorTextPrimary.value,
          colorTextSecondary.value,
          colorTextLink.value,
          colorButtonPrimary.value,
          colorButtonSecondary.value,
          colorButtonTextPrimary.value,
          colorButtonTextSecondary.value
      );

      // Detect scroll to stick the navbar
      const observer = new IntersectionObserver(
          ([entry]) => {
            isNavbarSticking.value = !entry.isIntersecting;
          },
          { threshold: 0.0 }
      )

      observer.observe(intersection.value)

      // Initialize bootstrap tooltips
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

<template>
  <div class="main-layout">
    <Navbar :is-sticking="isNavbarSticking" />

    <!-- Alt navbar -->
    <section id="alt-nav" :class="{ 'sticky': isNavbarSticking }"></section>
    <section id="offcanvas-section"></section>
    <!-- END Alt navbar -->

    <!-- Detect if user has scrolled -->
    <div ref="intersection" />
    <!-- END -->

    <section class="d-grid main-content container position-relative" :style="{ 'margin-top': isNavbarSticking ? '76px' : 0 }">
      <slot />
    </section>

    <ModalsContainer />

    <Footer />
  </div>
</template>

<style lang="scss">
  // Color Palette
  // https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff

  :root {
    --bg-primary: #FFF;
    --bg-secondary: #FFF;

    --color-text-primary: #FFFFFF;
    --color-text-secondary: #FFFFFF;
    --color-text-disabled: color-mix(in srgb,var(--color-text-primary), #000 15%);

    --color-link: #e5ffb4;

    --btn-bg-primary: #59702e;
    --btn-bg-secondary: #f2ffda;

    --btn-text-primary: #ffffff;
    --btn-text-secondary: #ffffff;
  }

  .main-layout {
    background-color: var(--bg-secondary);
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
    min-height: calc(100vh - 76px - 219px + 4rem);
  }

  .bg-primary {
    background-color: var(--bg-primary)!important;
  }

  .bg-secondary {
    background-color: var(--bg-secondary)!important;
  }

  .text-primary {
    color: var(--color-text-primary)!important;
  }

  .text-subtle {
    color: color-mix(in srgb,var(--color-text-primary), #000 10%);
  }

  .btn {
    border-color: transparent!important;
    border-radius: 20px;
    &.btn-primary {
      background-color: var(--btn-bg-primary);
      color: var(--btn-text-primary);
      &:active {
        background-color: color-mix(in srgb,var(--btn-bg-primary), #000 15%);
      }
    }
    &.btn-secondary {
      background-color: var(--btn-bg-secondary);
      color: var(--btn-text-secondary);
      &:active {
        background-color: color-mix(in srgb,var(--btn-bg-secondary), #000 60%);
      }
    }
    &:disabled {
      cursor: not-allowed;
      pointer-events: all!important;
    }
  }

  .form-control, .form-select {
    background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
    border: 1px solid color-mix(in srgb, var(--bg-primary), #000 40%);
    &:focus {
      background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
      border: 1px solid color-mix(in srgb, var(--bg-primary), #000 60%);
      box-shadow: none;
      color: var(--color-text-primary);
    }
    &:disabled {
      background-color: color-mix(in srgb, var(--bg-primary), #000 30%);
      color: color-mix(in srgb, var(--color-text-primary), #000 20%);
    }
    color: var(--color-text-primary);
  }

  .form-floating > .form-control:focus ~ label::after, .form-floating > .form-control:not(:placeholder-shown) ~ label::after, .form-floating > .form-control-plaintext ~ label::after, .form-floating > .form-select ~ label::after {
    background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
  }

  .input-group:not(.has-validation) > .form-floating:not(:last-child) > .form-control {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .input-group-text {
    background-color: color-mix(in srgb, var(--bg-primary), #000 25%);
    border: 1px solid color-mix(in srgb, var(--bg-primary), #000 40%);
    color: var(--color-text-primary)
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

  .sidebar {
    background-color: var(--btn-bg-primary);
    border-radius: 8px;
    h5 {
      color: var(--color-text-primary);
      margin-bottom: 1rem;
      font-weight: bold;
    }
    .nav {
      .nav-item {
        .nav-link {
          background-color: color-mix(in srgb,var(--bg-primary), #000 10%);
          color: var(--color-text-primary);
          border-radius: 8px;
          padding: 0.8rem !important;
          &.router-link-exact-active {
            background-color: color-mix(in srgb,var(--bg-primary), #000 20%);
            color: var(--color-text-secondary);
          }
        }
        margin-bottom: 1rem;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .offcanvas {
    height: calc(100vh - 40px - 76px);
    margin-top: calc(40px + 76px);
    background-color: var(--bg-primary);
  }

  #offcanvas-section .offcanvas-backdrop.show {
    opacity: 0!important;
  }

  .sticky {
    position: fixed;
    width: 100%;
    z-index: 999;
    top: 76px;
  }

  .sticky-top {
    z-index: 99;
  }

  //@media (max-height: 775px) {
  //  .main-content {
  //    min-height: initial;
  //  }
  //}
</style>
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
  <div class="main-layout">
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

  .main-layout {
    background-color: #ffd47e; // Should be programmable
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
    &:disabled {
      background-color: color-mix(in srgb, var(--bg-primary), #000 30%);
      color: color-mix(in srgb, var(--color-text-primary), #000 20%);
    }
    color: var(--color-text-primary);
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
    border-radius: 8px;
    h5 {
      color: var(--color-text-primary);
      margin-bottom: 1rem;
      font-weight: bold;
    }
    .nav {
      .nav-item {
        .nav-link {
          background-color: color-mix(in srgb,var(--bg-primary), #000 15%);
          color: var(--color-text-primary);
          border-radius: 8px;
          &.router-link-exact-active {
            background-color: color-mix(in srgb,var(--bg-primary), #000 25%);
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

  .sticky-top {
    z-index: 99;
  }

  @media (max-height: 775px) {
    .main-content {
      min-height: initial;
    }
  }
</style>
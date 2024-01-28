<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  // TODO: Apply user-defined CSS here (customization feature)
</script>

<style lang="scss">

  // Color Palette
  // https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff

  :root {
    --bg-primary: #77A042;
    --bg-secondary: #f2ffda;

    --color-text-primary: #FFFFFF;
    --color-text-disabled: color-mix(in srgb,var(--navbar-text), #000 15%);

    --btn-bg-primary: #59702e;
    --btn-bg-secondary: #f2ffda;
  }

  .main-content {
    min-height: calc(100vh - 76px - 219px);
  }

  .btn {
    border-color: transparent!important;
    border-radius: 20px;
    &.btn-primary {
      background-color: var(--btn-bg-primary);
      color: white;
      &:active {
        background-color: color-mix(in srgb,var(--btn-bg-primary), #000 15%);;
      }
    }
    &.btn-secondary {
      background-color: var(--btn-bg-secondary);
      color: color-mix(in srgb,var(--btn-bg-secondary), #000 65%);
      &:active {
        background-color: color-mix(in srgb,var(--btn-bg-secondary), #000 60%);;
      }
    }
  }

  .form-control {
    background-color: var(--bg-secondary);
    &:focus {
      background-color: var(--bg-secondary);
      box-shadow: none;
    }
    color: color-mix(in srgb,var(--btn-bg-secondary), #000 65%);
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
</style>

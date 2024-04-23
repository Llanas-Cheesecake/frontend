<script setup lang="ts">
  import { useCartStore } from "~/store/cart";

  const cart = useCartStore();

  const closeDropdown = () => {
    // As much as possible, don't call document
    if (process.client) {
      let dropdown = document.getElementsByClassName("dropdown-menu");

      // Remove show class
      if(dropdown.length > 0) { dropdown[0].classList.remove("show"); }
    }
  }
</script>

<template>
  <div class="dropdown d-inline-block">
    <a class="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="top: -1px; left: -1px" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart position-relative">
        <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
    </a>
    <div class="dropdown-menu dropdown-menu-end mt-2 me-2 p-3">
      <div class="d-flex justify-content-between">
        <p class="fw-bold mb-0">Your Cart</p>
        <p class="total-info mb-0">
          Total: <span>{{ formatPrice(cart._subtotalPrice) }}</span>
        </p>
      </div>

      <CartList />

      <nuxt-link to="/cart" class="btn btn-primary d-block" @click="closeDropdown">
        View cart
      </nuxt-link>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .dropdown-menu {
    min-width: 24rem;
  }

  .total-info {
    font-size: 0.9rem;
    span {
      color: color-mix(in srgb,var(--color-text-primary), #000 50%);
    }
  }
</style>
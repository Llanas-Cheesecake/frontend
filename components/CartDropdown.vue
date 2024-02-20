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
  <div class="nav-item dropdown d-inline-block px-3">
    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
      <img src="/icons/shopping-cart.svg" alt="Shopping Cart" />
    </a>
    <div class="dropdown-menu dropdown-menu-end mt-2 me-2 p-3">
      <div class="d-flex justify-content-between">
        <p class="fw-bold mb-0">Your Cart</p>
        <p class="total-info mb-0">
          Total: <span>&#8369;{{ formatPrice(cart._totalPrice) }}</span>
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
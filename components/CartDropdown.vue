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



      <ul v-if="cart._items?.length > 0" class="cart-items my-4">

        <li v-for="item in cart._items" class="cart-item">
          <img class="item-image" :src="item.product.thumbnail" alt="cart item" />
          <div class="item-info">
            <p class="item-name">{{ item.product.name }}</p>
            <p class="item-category">{{ item.product.category }}</p>
          </div>
          <div class="item-info-alt">
            <p class="item-price">
              &#8369;<span>{{ formatPrice(cart.getItemTotalPrice(item.product.product_id)) }}</span>
            </p>
            <p class="item-quantity">
              Quantity: {{ item.quantity }}
            </p>
            <div class="item-actions">
              <img src="/icons/trash.svg"
                   alt="Remove item from cart"
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   data-bs-title="Remove item" @click="cart.removeFromCart(item.product.product_id)" />
            </div>
          </div>
        </li>
      </ul>

      <p v-else class="my-5 text-center">
        No items yet. Start adding one!
      </p>

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

  .cart-items {
    list-style: none;
    padding-left: 0;
    .cart-item {
      display: flex;
      gap: 0.8rem;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      .item-image {
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }
      .item-info {
        .item-name {
          //font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .item-category {
          color: color-mix(in srgb,var(--color-text-primary), #000 50%);
          margin-bottom: 0;
          font-size: 0.9rem;
        }
      }
      .item-info-alt {
        width: 100%;
        text-align: end;
        .item-price {
          font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .item-quantity {
          color: color-mix(in srgb,var(--color-text-primary), #000 50%);
          margin-bottom: 0;
          font-size: 0.9rem;
        }
        .item-actions {
          img {
            cursor: pointer;
            width: 16px;
          }
        }
      }
    }
  }
</style>
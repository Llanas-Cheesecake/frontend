<script setup lang="ts">
  import { useCartStore } from "~/store/cart";

  const cart = useCartStore();

  const props = withDefaults(defineProps<{
    showActions?: boolean
  }>(), {
    showActions: true
  })
</script>

<template>
  <section>
    <ul v-if="cart._items?.length > 0" class="cart-items my-4">

      <li v-for="item in cart._items" class="cart-item">
        <img class="item-image" :src="item.product.thumbnail" alt="cart item" />
        <div class="item-info">
          <p class="item-name">{{ item.product.name }}</p>
          <p class="item-category">{{ item.product.category }}</p>
        </div>
        <div class="item-info-alt">
          <p class="item-price">
            <span>{{ formatPrice(cart.getItemTotalPrice(item.product.product_id)) }}</span>
          </p>
          <p class="item-quantity">
            Quantity: {{ item.quantity }}
          </p>
          <div v-show="showActions" class="item-actions">
            <img src="/icons/trash-black.svg"
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
  </section>
</template>

<style scoped lang="scss">
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
      flex: 1;
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
      //width: 100%;
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
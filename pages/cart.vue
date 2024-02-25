<script setup lang="ts">
  import { useCartStore } from "~/store/cart";
  import type { CartItem } from "~/types/Cart";

  const cart = useCartStore();

  useHead({
    title: "Cart"
  });

  const incrementItem = async (item: CartItem) => {
    const updatedQuantity = item.quantity + 1
    await cart.updateItemQuantity(item.product.product_id, updatedQuantity)
  }

  const decrementItem = async (item: CartItem) => {
    const currentValue = item.quantity

    if (currentValue <= 1) {
      item.quantity = 1
      return
    }

    const updatedQuantity = item.quantity - 1
    await cart.updateItemQuantity(item.product.product_id, updatedQuantity)
  }

  const removeAllItems = async () => {
    await cart.removeAllItems()
  }
</script>

<template>
  <section class="my-5">
    <div class="row">

      <div class="col-sm-12 col-md-9">
        <div class="card p-2">
          <div class="card-body">

            <div class="d-flex justify-content-between align-items-center">
              <h5 class="fw-bold mb-0">
                Cart
              </h5>
              <button class="btn btn-primary" @click="removeAllItems">Remove all</button>
            </div>

            <hr />

            <div class="d-flex align-items-center gap-2 mt-4 mb-3" v-if="cart._is_loading">
              <LoadingIcon color="black" />
              <span>Loading cart...</span>
            </div>

            <section v-if="!cart._is_loading">
              <ul v-if="cart._items && cart._items.length > 0" class="cart-items mt-4">

                <li v-for="item in cart._items" class="cart-item">
                  <img class="item-image" :src="item.product.thumbnail" alt="cart item" />
                  <div class="item-info">
                    <p class="item-name">{{ item.product.name }}</p>
                    <div class="item-subtitle">
                      {{ formatPrice(item.product.price) }} | {{ item.product.category }}
                    </div>

                    <div class="btn-group btn-group-sm mt-3" role="group" aria-label="Quantity Control">
                      <button type="button" class="btn btn-primary" @click="decrementItem(item)">
                        <img src="/icons/minus-black.svg" alt="increment quantity" width="14" />
                      </button>
                      <div class="item-quantity">
                        {{ item.quantity }}
                      </div>
                      <button type="button" class="btn btn-primary" @click="incrementItem(item)">
                        <img src="/icons/plus-black.svg" alt="increment quantity" width="14" />
                      </button>
                    </div>
                  </div>

                  <div class="item-info-alt position-relative">
                    <p class="item-price">
                      <span>{{ formatPrice(cart.getItemTotalPrice(item.product.product_id)) }}</span>
                    </p>
                    <div class="item-actions position-absolute">
                      <div class="action" role="button"  @click="cart.removeFromCart(item.product.product_id)">
                        <img src="/icons/trash.svg"
                             alt="Remove item from cart"
                             data-bs-toggle="tooltip"
                             data-bs-placement="top"
                             data-bs-title="Remove item"
                        />
                        <div class="action-text ms-1">Remove</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <p v-else class="mb-0">
                No items yet. Start adding one!
              </p>
            </section>


          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-3">
        <div class="card bg-primary text-white p-2">
          <div class="card-body">
            <h5 class="card-title">
              Summary
            </h5>

            <hr />

            <div class="d-flex justify-content-between">
              <div>Subtotal:</div>
              <div>{{ formatPrice(cart._totalPrice) }}</div>
            </div>

            <nuxt-link to="/checkout" class="btn btn-secondary d-block mt-4 w-100">
              Proceed to checkout
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
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
        margin-bottom: 1.5rem;
      }
      .item-image {
        width: 100px;
        height: 100px;
        border-radius: 8px;
      }
      .item-info {
        flex: 1;
        .item-name {
          //font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .item-subtitle {
          color: color-mix(in srgb,var(--color-text-primary), #000 50%);
          margin-bottom: 0;
          font-size: 0.9rem;
        }

        .btn-group {
          border: 1px solid color-mix(in srgb,var(--color-text-primary), #000 50%);
          border-radius: 10px;
          .btn {
            background-color: transparent!important;
            padding: 2px 6px;
          }
          .btn, .item-quantity {

          }
          .item-quantity {
            padding: 2px 6px;
          }
        }
      }
      .item-info-alt {
        text-align: end;
        .item-price {
          font-weight: bold;
          font-size: 1.4rem;
          margin-bottom: 0.2rem;
        }
        .item-quantity {
          color: color-mix(in srgb,var(--color-text-primary), #000 50%);
          margin-bottom: 0;
          font-size: 0.9rem;
        }
        .item-actions {
          bottom: 0;
          right: 0;
          .action {
            cursor: pointer;
            display: flex;
            img {
              cursor: pointer;
              width: 16px;
            }
            .action-text {
              display: inline-block;
              font-size: 0.8rem;
            }
          }
        }
      }
    }
  }
</style>
<script setup lang="ts">
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
        <p class="fw-bold">Your Cart</p>
        <p class="total-info">
          Total: <span>&#8369;2000</span>
        </p>
      </div>

      <ul class="cart-items">
        <li class="cart-item">
          <img class="item-image" src="https://media.pickaroo.com/media/thumb/variant_photos/2021/9/3/b2H2scyWzKzMEk2tVSGVW6_watermark_400.jpg" alt="cart item" />
          <div class="item-info">
            <p class="item-name">Cheesecake</p>
            <p class="item-category">Cake 8"</p>
          </div>
          <div class="item-info-alt">
            <p class="item-price">
              &#8369;<span>1000</span>
            </p>
            <p class="item-quantity">
              Quantity: 1
            </p>
            <div class="item-actions">
              <img src="/icons/trash.svg" alt="Remove item from cart" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove item" />
            </div>
          </div>
        </li>
        <li class="cart-item">
          <img class="item-image" src="https://media.pickaroo.com/media/thumb/variant_photos/2021/9/3/b2H2scyWzKzMEk2tVSGVW6_watermark_400.jpg" alt="cart item" />
          <div class="item-info">
            <p class="item-name">Cheesecake</p>
            <p class="item-category">Cake 8"</p>
          </div>
          <div class="item-info-alt">
            <p class="item-price">
              &#8369;<span>1000</span>
            </p>
            <p class="item-quantity">
              Quantity: 1
            </p>
            <div class="item-actions">
              <img src="/icons/trash.svg" alt="Remove item from cart" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove item" />
            </div>
          </div>
        </li>
      </ul>

      <nuxt-link to="/cart" class="btn btn-primary d-block" @click="closeDropdown">
        View cart
      </nuxt-link>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .dropdown-menu {
    min-width: 22rem;
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
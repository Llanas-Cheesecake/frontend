<script setup lang="ts">
  import vue3StarRatings from "vue3-star-ratings";
  import type { Product } from "~/types/Product";
  import { useCartStore } from "~/store/cart";

  const props = withDefaults(defineProps<{
    product: Product,
    showActions?: boolean
  }>(), {
    showActions: true
  })

  const cart = useCartStore();

  const isAddingToCart = ref(false);

  const isOutOfStock = computed(() => props.product.stock <= 0);

  const addToCart = async () => {
    isAddingToCart.value = true

    await cart.addToCart({
      product_id: props.product.product_id,
      quantity: 1,
      type: props.product.category
    }).finally(() => {
      // Set loading indicator to false
      isAddingToCart.value = false
    })
  }
</script>

<template>
  <div class="card">
    <nuxt-link :to="`/products/${product.slug}`" class="card-body">
      <div class="product-image rounded shadow-sm mb-3" :style="{ 'background-image': `url(${product.thumbnail})` }" />
      <section>
        <h5 class="card-title mb-1">
          {{ product.name }}
        </h5>

        <div class="d-flex align-items-center gap-2 mb-3">
          <p class="fw-bold mb-0">
            {{ product.category }}
          </p>

          <span v-if="isOutOfStock" class="badge text-bg-danger">
            Out of stock
          </span>
        </div>

        <client-only>
          <vue-3-star-ratings v-model="product.average_ratings" inactive-color="#8a8a8a" star-size="16" disable-click />
        </client-only>
      </section>

    </nuxt-link>

    <div class="card-bottom d-flex align-items-center justify-content-between">
      <div class="price">
        &#8369;<span>{{ product.price }}</span>
      </div>
      <button v-if="showActions" class="btn btn-secondary" :disabled="isAddingToCart || isOutOfStock" @click="addToCart">
        <span>Add</span>
        <LoadingIcon v-if="isAddingToCart" color="black" class="ms-2" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    transition: 0.3s;
    min-height: 385px;
    &:hover {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
    .card-body {
      text-decoration: none;
      .product-image {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;

        height: 100%;
        width: 100%;
      }
    }
    .card-bottom {
      width: 100%;
      padding: 1rem;
    }
  }

  @media (max-width: 991px) {
    .card {
      min-height: auto;
      .card-body {
        display: flex;
        gap: 1rem;
        .product-image {
          width: 135px!important;
          min-height: 135px;
        }
      }
    }
  }
  
  @media (min-width: 992px) and (max-width: 1199px) {
    .product-image {
      min-height: 182px!important;
    }
  }

  @media (min-width: 1200px) and (max-width: 1399px) {
    .product-image {
      min-height: 227px!important;
    }
  }

  @media (min-width: 1400px) {
    .product-image {
      min-height: 272px!important;
    }
  }

</style>
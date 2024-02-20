<script setup lang="ts">
  import vue3StarRatings from "vue3-star-ratings";
  import type { Product } from "~/types/Product";
  import { useCartStore } from "~/store/cart";

  const props = defineProps<{
    product: Product
  }>()

  const cart = useCartStore();

  const isAddingToCart = ref(false);

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
      <img class="product-image rounded shadow-sm mb-3" :src="product.thumbnail" :alt="product.name" />
      <section>
        <h5 class="card-title">{{ product.name }}</h5>

        <client-only>
          <vue-3-star-ratings v-model="product.averageRatings" inactive-color="#8a8a8a" star-size="16" disable-click />
        </client-only>
      </section>

    </nuxt-link>

    <div class="card-bottom d-flex align-items-center justify-content-between">
      <div class="price">
        &#8369;<span>{{ product.price }}</span>
      </div>
      <button class="btn btn-primary" :disabled="isAddingToCart" @click="addToCart">
              <span>
                Add
              </span>
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
        width: 100%;
        //max-width: 240px;
      }
    }
    .card-bottom {
      //bottom: 0;
      width: 100%;
      //margin-left: -1rem;
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
          max-width: 135px!important;
          max-height: 135px;
        }
      }
    }
  }
</style>
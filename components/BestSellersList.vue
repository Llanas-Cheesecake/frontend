<script setup lang="ts">
  import vue3StarRatings from "vue3-star-ratings";
  import type { Product } from "~/types/Product";
  import type {ApiResponse} from "~/types/ApiResponse";

  const products = ref<Product[]>();

  const { data: result } = await useFetchAPI<ApiResponse>('/products/best-sellers', { method: "GET" })

  if (result.value) {
    const payload = result.value.data

    // Store them in variables
    products.value = [ ...payload];
  }
</script>

<template>
  <div class="row mb-4">
    <div v-for="(product, index) in products" :key="index" class="col-md-12 col-lg-4 featured-item">
      <nuxt-link :to="`/products/${product.slug}`" class="image mb-4" :style="{ 'background-image': `url(${product.thumbnail})` }" />
      <span class="category">
        {{ product.category }}
      </span>

      <h4 class="text-heading fw-bold mb-2">
        {{ product.name }}
      </h4>

      <client-only>
        <vue3-star-ratings v-model="product.average_ratings" :star-size="20" disable-click class="mx-auto" />
      </client-only>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .featured-item {
    text-align: center;
    position: relative;
    margin-bottom: 4rem;
    .category {
      background-color: var(--bg-secondary);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      border-radius: 20px;
      font-weight: bold;

      position: absolute;
      top: 255px;
      right: 20px;
      padding: 5px 10px;
    }
    .image {
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;

      display: block;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: 0.3s;

      height: 300px;
      width: 100%;

      &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      }
    }
  }
</style>
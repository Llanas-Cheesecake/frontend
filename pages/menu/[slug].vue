<script setup lang="ts">
  import type { Product } from "~/types/Product";
  import type { ApiResponse } from "~/types/ApiResponse";
  import vue3StarRatings from "vue3-star-ratings";

  const route = useRoute()
  const selectedFilter = ref("default") // TODO: Implement filtering
  const selectedCategory = route.params.slug

  const products = reactive<Product[]>([])

  if (selectedCategory === "all") {
    const { data: result, pending, status } = await useFetchAPI<ApiResponse>('/products', { method: "GET" })

    if (result.value) {
      result.value.data.map((item: Product) => {
        products.push(item)
      })
    }

  } else {
    const encodedURI = encodeURI(`/products?category=${selectedCategory}`)
    const { data: result, pending, status } = await useFetchAPI<ApiResponse>(encodedURI, { method: "GET" })

    if (result.value) {
      result.value.data.map((item: Product) => {
        products.push(item)
      })
    }
  }
</script>

<template>
  <section>

    <!-- Top Buttons -->
    <div class="col-sm-12 col-md-4">
      <select class="form-select" aria-label="Sort By">
        <option value="default">Alphabet</option>
        <option value="best-seller">Best sellers</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="price-high-low">Price: Low to High</option>
      </select>
    </div>
    <!-- END Top Buttons -->

    <!-- Products -->
    <div class="row mt-4">
      <div v-for="product in products" class="col-sm-12 col-lg-4 mb-4">
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
            <button class="btn btn-primary">
              Add
            </button>
          </div>

        </div>
      </div>
    </div>

  </section>
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
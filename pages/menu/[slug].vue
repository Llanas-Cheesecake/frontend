<script setup lang="ts">
  import type { Product } from "~/types/Product";
  import type { ApiResponse } from "~/types/ApiResponse";

  const route = useRoute()
  const sortedBy = ref('default')
  const selectedCategory = route.params.slug

  const products = reactive<Product[]>([])

  watch(sortedBy, (newQuery) => {
    products.length = 0;
    fetchMenu()
  })

  const fetchMenu = async () => {
    if (selectedCategory === "all") {
      const fullApiRoute = `/products${ sortedBy.value ? `?sortedBy=${ sortedBy.value }` : '' }`
      const { data: result, pending, status } = await useFetchAPI<ApiResponse>(fullApiRoute, { method: "GET" })

      if (result.value) {
        result.value.data.map((item: Product) => {
          products.push(item)
        })
      }

    } else {
      const encodedURI = encodeURI(`/products?category=${selectedCategory}`)
      const fullApiRoute = sortedBy.value ? `${ encodedURI }&sortedBy=${ sortedBy.value }` : encodedURI;
      const { data: result, pending, status } = await useFetchAPI<ApiResponse>(fullApiRoute, { method: "GET" })

      if (result.value) {
        result.value.data.map((item: Product) => {
          products.push(item)
        })
      }
    }
  }

  // Fetch menu on server
  fetchMenu();
</script>

<template>
  <section>

    <!-- Top Buttons -->
    <div class="col-sm-12 col-md-4">
      <select class="form-select" aria-label="Sort By" v-model="sortedBy">
        <option value="default">Alphabet: A-Z</option>
        <option value="best-seller">Best sellers</option>
        <option value="price-max-to-min">Price: High to Low</option>
        <option value="price-min-to-max">Price: Low to High</option>
      </select>
    </div>
    <!-- END Top Buttons -->

    <!-- Products -->
    <div class="row mt-4">
      <div v-for="product in products" class="col-sm-12 col-lg-4 mb-4">
        <ProductCard :product="product" />
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">

</style>
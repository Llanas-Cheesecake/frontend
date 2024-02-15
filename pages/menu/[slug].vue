<script setup lang="ts">
  import type { Product } from "~/types/Product";
  import type { ApiResponse } from "~/types/ApiResponse";

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
        <ProductCard :product="product" />
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">

</style>
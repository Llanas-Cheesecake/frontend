<script setup lang="ts">
  // @ts-ignore
  import { Bootstrap5Pagination } from 'laravel-vue-pagination';
  import type { Product } from "~/types/Product";
  import type { ApiResponse } from "~/types/ApiResponse";

  const props = defineProps<{
    sortedBy: string
  }>();

  const route = useRoute();
  const selectedCategory = route.params.slug;

  const products = ref<Product[]>([]);
  const pagination = ref<any>({});

  watch(() => props.sortedBy, async () => {
    products.value.length = 0;
    await fetchMenu();
  });

  const fetchMenu = async (page = 1) => {
    // Default endpoint when there is no selected category
    let fullApiRoute = `/products?page=${page}${ props.sortedBy ? `&sortedBy=${ props.sortedBy }` : '' }`;

    // If a category is selected, encode the selected category
    if (selectedCategory !== "all") {
      const encodedURI = encodeURI(`/products?page=${page}&category=${selectedCategory}`)
      fullApiRoute = props.sortedBy ? `${ encodedURI }&sortedBy=${ props.sortedBy }` : encodedURI;
    }

    const { data: result } = await useFetchAPI<ApiResponse>(fullApiRoute, { method: "GET" })

    if (result.value) {
      const payload = result.value.data;

      // Store them in variables
      products.value = [ ...payload.data ];
      pagination.value = payload;
    }
  }

  // Fetch menu on load
  await fetchMenu();
</script>

<template>
  <div class="row mt-4">
    <div v-for="product in products" class="col-sm-12 col-lg-4 mb-4">
      <ProductCard :product="product" />
    </div>

    <h5 v-if="products.length === 0">
      This category has no items listed yet. Check back later!
    </h5>
  </div>

  <client-only>
    <Bootstrap5Pagination
        class="mt-4 mb-0"
        :data="pagination"
        @pagination-change-page="fetchMenu"
    />
  </client-only>
</template>

<style scoped lang="scss">

</style>
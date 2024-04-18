<script setup lang="ts">
  import type {Product} from "~/types/Product";
  import type {ApiResponse} from "~/types/ApiResponse";

  const props = defineProps<{
    sortedBy: string
  }>();

  const route = useRoute();
  const selectedCategory = route.params.slug;

  const products = reactive<Product[]>([]);

  watch(() => props.sortedBy, async () => {
    products.length = 0;
    await fetchMenu();
  });

  const fetchMenu = async () => {
    // Default endpoint when there is no selected category
    let fullApiRoute = `/products${ props.sortedBy ? `?sortedBy=${ props.sortedBy }` : '' }`;

    // If a category is selected, encode the selected category
    if (selectedCategory !== "all") {
      const encodedURI = encodeURI(`/products?category=${selectedCategory}`)
      fullApiRoute = props.sortedBy ? `${ encodedURI }&sortedBy=${ props.sortedBy }` : encodedURI;
    }

    const { data: result } = await useFetchAPI<ApiResponse>(fullApiRoute, { method: "GET" })

    if (result.value) {
      result.value.data.map((item: Product) => {
        products.push(item)
      })
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
</template>

<style scoped lang="scss">

</style>
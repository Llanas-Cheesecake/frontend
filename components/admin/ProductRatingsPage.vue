<script setup lang="ts">
  // @ts-ignore
  import { Bootstrap5Pagination } from 'laravel-vue-pagination';
  import type { ProductRating } from "~/types/Product";
  import type { ApiResponse } from "~/types/ApiResponse";

  const props = defineProps<{
    product_id: number
  }>()

  const emit = defineEmits<{
    (e: 'removeRating', rating_id: number): void
  }>()

  const isLoading = ref(true);
  const isFailed = ref(false);

  const searchKeyword = ref('');

  const ratings = ref<ProductRating[]>([]);
  const pagination = ref<any>({});

  const fetchRatings = async (page = 1) => {
    let endpoint = `/admin/products/${props.product_id}/reviews?page=${page}`;

    if (searchKeyword.value.length > 0) {
      endpoint = `/admin/products/${props.product_id}/reviews?page=${page}&keyword=${encodeURIComponent(searchKeyword.value)}`
    }

    await useFetchAPI<ApiResponse>(endpoint, {
      method: "GET",
      server: false,
      onResponse({ response }) {
        if (response.ok) {
          const payload = response._data.data

          // Store them in variables
          ratings.value = [ ...payload.data ];
          pagination.value = payload;

          // Delete unnecessary data from pagination
          delete pagination.value.data;

          isLoading.value = false;
        }
      },
      onResponseError({ response }) {
        isFailed.value = true;
        isLoading.value = false;

        // TODO: Handle errors
      }
    });
  }

  onMounted(async () => {
    await fetchRatings();
  })

  const handleRemove = (rating_id: number) => {
    ratings.value = ratings.value.filter((item) => {
      return item.rating_id !== rating_id;
    });

    // Tell the parent to remove the rating
    emit('removeRating', rating_id);
  }

</script>

<template>
  <div class="card p-2">
    <div class="card-body">

      <h5 class="fw-bold mb-4">
        Ratings
      </h5>

      <section v-if="ratings.length > 0">
        <div class="product-reviews" v-for="rating in ratings">
          <AdminProductRating :rating="rating" :show-actions="true" @remove-rating="handleRemove($event)" />
        </div>
      </section>

      <p v-else class="mb-0">
        No reviews were found for this product.
      </p>

      <client-only>
        <Bootstrap5Pagination
            class="mt-4 mb-0"
            :data="pagination"
            @pagination-change-page="fetchRatings"
        />
      </client-only>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-reviews:not(:last-child) {
    margin-bottom: 1rem;
  }
</style>
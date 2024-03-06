<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";

  definePageMeta({
    layout: 'admin'
  });

  const route = useRoute();
  const routeProductName = useState('routeProductName');

  const product = reactive({
    name: '',
    description: '',
    thumbnail: '',
    price: '',
    stock: '',
  });

  const ratings = [
    {
      reviewer_name: "",
      rating: 4,
      headline: "Test Headline",
      review: "Ur mother",
      published_at: Date.now()
    }
  ]

  // Fetch product
  const { data: result } = await useFetchAPI<ApiResponse>(`/admin/products/${route.params.slug}`, {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data

    product.name = payload.name;
    product.description = payload.description;
    product.thumbnail = payload.thumbnail;
    product.price = payload.price;
    product.stock = payload.stock;

    routeProductName.value = product.name
  }
</script>

<template>
  <section class="dashboard">

    <div class="card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">

          <BackButton link="/admin/products"></BackButton>

          <h5 class="fw-bold mb-0 flex-fill">
            {{ product.name }}
          </h5>

          <nuxt-link :to="`/admin/products/${route.params.slug}/edit`" class="btn btn-primary" role="button">
            <img class="position-relative" style="top: -1px;" src="/icons/edit-white.svg" alt="edit icon" width="20" />
            <span class="d-sm-inline d-none ms-2">Edit</span>
          </nuxt-link>

          <button type="button" class="btn btn-danger">
            <img class="position-relative" style="top: -1px;" src="/icons/trash-white.svg" alt="delete icon" width="20" />
            <span class="d-sm-inline d-none ms-2">Delete</span>
          </button>

        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12 col-lg-4">
        <div class="card p-2">
          <div class="card-body">
            <div class="product-image rounded shadow-sm mb-4" :style="{ 'background-image': `url(${product.thumbnail})` }" />

            <div class="mb-4">
              <p class="fw-bold mb-2">Description:</p>
              <p class="mb-0">{{ product.description }}</p>
            </div>

            <div class="mb-4">
              <p class="fw-bold mb-2">Price:</p>
              <p class="mb-0">&#8369;{{ product.price }}</p>
            </div>

            <div class="mb-0">
              <p class="fw-bold mb-2">Stock left:</p>
              <p class="mb-0">{{ product.stock }}</p>
            </div>

          </div>
        </div>
      </div>

      <div class="col-md-12 col-lg-8">
        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="fw-bold mb-4">Recent orders</h5>

            <p class="mb-0">A table of recent orders with this product will be displayed here</p>
          </div>
        </div>

        <div class="card p-2">
          <div class="card-body">
            <h5 class="fw-bold mb-4">
              Recent reviews
            </h5>

            <div v-for="rating in ratings">
              <ProductRating :rating="rating" />
            </div>
          </div>
        </div>

      </div>

    </div>

  </section>
</template>

<style scoped lang="scss">
  .product-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 250px;
  }
</style>
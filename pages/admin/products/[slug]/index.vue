<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { ProductRating } from "~/types/Product";
  import type { DetailedOrder } from "~/types/Order";

  definePageMeta({
    layout: 'admin'
  });

  const route = useRoute();
  const routeProductName = useState('routeProductName');

  const product = reactive({
    product_id: '',
    name: '',
    description: '',
    thumbnail: '',
    price: '',
    stock: '',
    ratings: [] as ProductRating[],
    orders: [] as DetailedOrder[]
  });

  const isDeleting = ref(false);

  // Fetch product
  const { data: result } = await useFetchAPI<ApiResponse>(`/admin/products/${route.params.slug}`, {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data

    product.product_id = payload.product_id;
    product.name = payload.name;
    product.description = payload.description;
    product.thumbnail = payload.thumbnail;
    product.price = payload.price;
    product.stock = payload.stock;
    product.ratings = payload.ratings;
    product.orders = payload.orders;

    routeProductName.value = product.name
  }

  const handleDeleteProduct = async () => {
    isDeleting.value = true;

    const { data: result, error } = await useFetchAPI(`/admin/products/${product.product_id}/delete`, {
      method: "DELETE"
    })

    if (result.value) {
      isDeleting.value = false;

      navigateTo('/admin/products')
    }

    if (error.value) {
      isDeleting.value = false;

      // TODO: Handle errors
    }
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
            <span class="d-sm-inline d-none ms-2">
              Edit
            </span>
          </nuxt-link>

          <button type="button" class="btn btn-danger" :disabled="isDeleting" @click="handleDeleteProduct">
            <img class="position-relative" style="top: -1px;" src="/icons/trash-white.svg" alt="delete icon" width="20" />
            <span class="d-sm-inline d-none ms-2">
              Delete
            </span>
            <LoadingIcon v-if="isDeleting" color="white" class="ms-2 position-relative" style="top: -1px" />
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

            <table v-if="product.orders.length > 0" class="table table-striped w-100 mb-0" style="table-layout: fixed;">
              <colgroup>
                <col span="1" style="width: 12%;">
                <col span="1" style="width: 18%;">
                <col span="1" style="width: 12%;">
                <col span="1" style="width: 15%;">
                <col span="1" style="width: 15%;">
              </colgroup>

              <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
              </tr>
              </thead>
              <tbody>
                <tr v-for="order in product.orders">
                  <td class="text-truncate overflow-hidden">#{{ order.order_id }}</td>
                  <td class="text-truncate overflow-hidden">
                    {{ order.customer ? order.customer.first_name + " " + order.customer.last_name : 'Guest' }}
                  </td>
                  <td class="text-truncate overflow-hidden">
                    {{ order.items[0].quantity }}
                  </td>
                  <td>{{ formatPrice(order.total_price) }}</td>
                  <td>
                    <div class="alert alert-success text-center p-1 mb-0">
                      {{ order.status }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <p v-else class="mb-0">No orders were found for this product.</p>
          </div>
        </div>

        <div class="card p-2">
          <div class="card-body">
            <h5 class="fw-bold mb-4">
              Recent reviews
            </h5>

            <section v-if="product.ratings.length > 0">
              <div class="product-reviews" v-for="rating in product.ratings">
                <AdminProductRating :rating="rating" />
              </div>
            </section>

            <p v-else class="mb-0">
              No reviews were found for this product.
            </p>
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

  .product-reviews:not(:last-child) {
    margin-bottom: 1rem;
  }
</style>
<script setup lang="ts">
  import { capitalizeText } from "~/utils";
  import type { DetailedOrder } from "~/types/Order";
  import type { ProductRating } from "~/types/Product";

  const props = defineProps<{
    orders: DetailedOrder[],
    ratings: ProductRating[]
  }>()
</script>

<template>
  <div class="card p-2 mb-4">
    <div class="card-body">
      <h5 class="fw-bold mb-4">
        Recent orders
      </h5>

      <table v-if="props.orders.length > 0" class="table table-striped w-100 mb-0" style="table-layout: fixed;">
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
        <tr v-for="order in props.orders">
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
              {{ capitalizeText(order.status) }}
            </div>
          </td>
        </tr>
        </tbody>
      </table>

      <p v-else class="mb-0">
        No orders were found for this product.
      </p>
    </div>
  </div>

  <div class="card p-2">
    <div class="card-body">
      <h5 class="fw-bold mb-4">
        Recent ratings
      </h5>

      <section v-if="props.ratings.length > 0">
        <div class="product-reviews" v-for="rating in props.ratings">
          <AdminProductRating :rating="rating" />
        </div>
      </section>

      <p v-else class="mb-0">
        No reviews were found for this product.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-reviews:not(:last-child) {
    margin-bottom: 1rem;
  }
</style>
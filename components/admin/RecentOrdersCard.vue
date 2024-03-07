<script setup lang="ts">
  const props = defineProps<{
    orders: any
  }>()
</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <div class="mb-4">
        <h5 class="fw-bold">
          Recent Orders
        </h5>
        <small class="text-subtle">
          Only 5 recent successful orders are displayed. Clicking an order will show more details.
        </small>
      </div>

      <table v-if="props.orders.length > 0" class="table table-striped w-100 mb-0" style="table-layout: fixed;">
        <colgroup>
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 30%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 15%;">
        </colgroup>

        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Products</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in props.orders">
            <td class="text-truncate overflow-hidden">
              #{{ order.order_id }}
            </td>
            <td class="text-truncate overflow-hidden">
              {{ order.customer ? order.customer.first_name + " " + order.customer.last_name : 'Guest' }}
            </td>
            <td class="text-truncate overflow-hidden d-flex align-items-center justify-content-between">
              <div>
                <p class="mb-0">{{ order.items[0].product.name }}</p>
                <small class="mb-0">{{ order.items[0].product.category.name }}</small>
              </div>
              <div v-if="order.items.length > 1">
                <small>+{{ (order.items.length) - 1 }}</small>
              </div>
            </td>
            <td>{{ formatPrice(order.total_price) }}</td>
            <td>
              <div class="alert alert-success text-center p-1 mb-0">
                Paid
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .table tbody tr {
    cursor: pointer;
  }
</style>
<script setup lang="ts">
  import type { OrderItem } from "~/types/Order";
  import type { ApiResponse } from "~/types/ApiResponse";

  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'report'
  });

  interface Order {
    order_id: string
    order_date: string
    customer_name: string
    items: OrderItem[]
    amount: number
    payment_status: string
    delivery_status: string
  }

  const orders = ref<Order[]>();

  const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/orders/monthly-report', {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data;
    orders.value = [...payload]
  }

  const convertDeliveryStatus = (status: string) => {
    switch (status) {
      case "ON_GOING":
        return "On the way";
      case "UNFULFILLED":
        return "To be delivered"
      case "PROCESSING":
        return "Awaiting payment";
      case "DELIVERED":
        return "Delivered";
    }
  }

  const convertPaymentStatus = (status: string) => {
    if (status === 'processing_refund') return 'Processing Refund';

    return capitalizeText(status);
  }

  const currentMonth = computed(() => {
    const date = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    return month[date.getMonth()];
  })

  // Open print dialog
  onMounted(() => {
    setTimeout(() => {
      window.print()
    }, 500);
  })
</script>

<template>
  <div>
    <h5 class="fw-bold mb-4">{{ currentMonth }} Report</h5>
    <table class="table table-striped mb-0">
      <thead>
      <tr>
        <th scope="col">Order ID</th>
        <th scope="col">Date</th>
        <th scope="col">Customer</th>
        <th scope="col">Products</th>
        <th scope="col">Amount</th>
        <th scope="col">Status</th>
        <th scope="col">Delivery Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders" :key="order.order_id">
        <td class="text-truncate overflow-hidden">
          <nuxt-link :to="`/admin/orders/${ order.order_id }`" class="text-decoration-none">
            <small>#{{ order.order_id.slice(0, 7) }}</small>
          </nuxt-link>
        </td>
        <td class="text-truncate overflow-hidden">
          <small>
            <nuxt-time :datetime="order.order_date" day="2-digit" month="2-digit" year="2-digit" />
          </small>
        </td>
        <td class="text-truncate overflow-hidden">
          <small>
            {{ order.customer_name }}
          </small>
        </td>
        <td class="text-truncate overflow-hidden d-flex align-items-center justify-content-between gap-2" style="cursor: pointer;">
          <small v-if="order.items.length === 0">
            <span class="text-danger">Missing items</span>

            <span class="ms-2">
            <img src="/icons/info-black.svg" alt="info icon" width="16" />
          </span>
          </small>
          <div v-if="order.items.length > 0">
            <div v-for="item in order.items" class="product-items">
              <small class="mb-0" :class="{ 'text-decoration-line-through': item.product.is_deleted }">
              <span :class="{ 'text-danger': item.product.is_deleted }">
                {{ item.product.name }}
              </span>
                <span v-if="item.product.is_deleted" class="ms-2">
                <img src="/icons/info-black.svg" alt="info icon" width="16" />
              </span>
              </small>
              <br>
              <small class="mb-0">
                {{ item.product.category }}
              </small>
            </div>
          </div>
        </td>
        <td>
          <small>{{ formatPrice(order.amount) }}</small>
        </td>
        <td class="text-truncate overflow-hidden">
          <small class="order-price alert text-center p-1 mb-0" :class="{
              'alert-success': order.payment_status === 'paid',
              'alert-warning': order.payment_status === 'processing_refund',
              'alert-info': order.payment_status === 'refunded',
              'alert-danger': order.payment_status === 'unpaid'
            }">
            &#8369; {{ convertPaymentStatus(order.payment_status) }}
          </small>
        </td>
        <td class="text-truncate overflow-hidden">
          <small class="order-delivery alert text-center p-1 mb-0" :class="{
              'alert-danger': order.delivery_status === 'PROCESSING',
              'alert-warning': order.delivery_status === 'UNFULFILLED',
              'alert-info': order.delivery_status === 'ON_GOING',
              'alert-success': order.delivery_status === 'DELIVERED',
            }">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck">
              <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            <span class="ms-2">{{ convertDeliveryStatus(order.delivery_status) }}</span>
          </small>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
  .product-items:not(:last-child) {
    margin-bottom: 1rem;
  }
</style>
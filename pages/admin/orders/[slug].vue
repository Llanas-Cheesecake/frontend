<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";
  import type {DetailedOrder} from "~/types/Order";

  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })

  const route = useRoute();

  const routeOrderId = useState('routeOrderId');
  const order = reactive<DetailedOrder>({
    order_id: '',
    customer: {
      first_name: '',
      last_name: '',
      email: ''
    },
    items: [],
    payment: {
      amount_paid: 0,
      paid_using: '',
      status: '',
      paid_at: ''
    },
    total_price: 0,
    status: ''
  });

  // Fetch order
  const { data: result } = await useFetchAPI<ApiResponse>(`/admin/orders/${route.params.slug}`, {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data;

    // Set breadcrumb
    routeOrderId.value = payload.order_id

    // Set order properties
    order.order_id = payload.order_id;
    order.customer = payload.customer;
    order.items = payload.items;
    order.payment = payload.payment;
    order.total_price = payload.total_price;
    order.status = payload.status;
  }
</script>

<template>
  <section class="dashboard">
    <!-- Header -->
    <div class="header card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <BackButton link="/admin/orders" />
          <div>
            <h5 class="fw-bold mb-1 flex-fill">
              Order Details
            </h5>
            <small class="text-subtle">Order ID #{{ order.order_id }}</small>
          </div>
        </div>
      </div>
    </div>
    <!-- END Header -->
  </section>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import { ModalViewOrderedItems } from "#components";
  import type { DetailedOrder } from "~/types/Order";

  const props = defineProps<{
    orders: DetailedOrder[]
  }>();


  // View Ordered Items Modal
  const selectedOrderId = ref('');
  const selectedOrderItems = ref();

  const openDetailsModal = (order: DetailedOrder) => {
    selectedOrderId.value = order.order_id;
    selectedOrderItems.value = order.items;
    detailsModal.open();
  }

  const detailsModal = useModal({
    component: ModalViewOrderedItems,
    attrs: {
      order_id: selectedOrderId,
      items: selectedOrderItems,
      onCancel() {
        detailsModal.close();
      }
    }
  });
</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <div class="mb-4">
        <h5 class="fw-bold">
          Recent Orders
        </h5>
        <small class="text-subtle">
          Only 5 recent paid orders are displayed. Clicking an order will show more details.
        </small>
      </div>

      <table v-if="props.orders.length > 0" class="table table-striped w-100 mb-0" style="table-layout: fixed;">
        <colgroup>
          <col span="1" style="width: 12%;">
          <col span="1" style="width: 20%;">
          <col span="1" style="width: 30%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 23%;">
        </colgroup>

        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Customer</th>
            <th scope="col">Products</th>
            <th scope="col">Amount</th>
            <th scope="col">Paid at</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in props.orders" @click="openDetailsModal(order)">
            <td class="text-truncate overflow-hidden">
              #{{ order.order_id }}
            </td>
            <td class="text-truncate overflow-hidden">
              {{ order.customer ? order.customer.first_name + " " + order.customer.last_name : 'Guest' }}
            </td>
            <td class="text-truncate overflow-hidden d-flex align-items-center justify-content-between">
              <div v-if="order.items.length === 0">
                <span class="text-danger">Missing items</span>

                <span class="ms-2">
                  <img src="/icons/info-black.svg" alt="info icon" width="16" v-tooltip="'The items might have been forced deleted.'" />
                </span>

              </div>
              <div v-if="order.items.length > 0">
                <p class="mb-0" :class="{ 'text-decoration-line-through': order.items[0].product.is_deleted }">
                  <span :class="{ 'text-danger': order.items[0].product.is_deleted }">
                    {{ order.items[0].product.name }}
                  </span>
                  <span v-if="order.items[0].product.is_deleted" class="ms-2" v-tooltip="'This item has been deleted.'">
                    <img src="/icons/info-black.svg" alt="info icon" width="16" />
                  </span>
                </p>
                <small class="mb-0">
                  {{ order.items[0].product.category }} <!-- Typescript error expected -->
                </small>
              </div>
              <div v-if="order.items.length > 1">
                <small class="mini-badge">+{{ (order.items.length) - 1 }}</small>
              </div>
            </td>
            <td>{{ formatPrice(order.total_price) }}</td>
            <td>
              <NuxtTime :datetime="order.payment.paid_at"
                        month="short"
                        day="numeric"
                        year="numeric"
                        hour="2-digit"
                        minute="2-digit"
              />
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
  .table .v-popper {
    display: inline;
  }
  .mini-badge {
    padding: 6px;
    background: rgba(0,0,0,0.08);
    border-radius: 50%;
  }
</style>
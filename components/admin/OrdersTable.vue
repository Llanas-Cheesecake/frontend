<script setup lang="ts">
  // @ts-ignore
  import { Bootstrap5Pagination } from 'laravel-vue-pagination';
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  import { useModal } from "vue-final-modal";
  import { ModalChangeDeliveryStatus, ModalViewOrderedItems } from "#components";
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { OrderItem } from "~/types/Order";

  const { useToast } = Toast;
  const toast = useToast();

  const props = defineProps<{
    searchKeyword: string
    itemsPerPage: string
  }>();

  interface Order {
    order_id: string
    order_date: string
    customer_name: string
    items: OrderItem[]
    amount: number
    payment_status: string
    delivery_status: string
  }

  const orders = ref<Order[]>([]);
  const pagination = ref<any>({});

  const checkedItems = ref<string[]>([]);

  const fetchOrders = async (page = 1) => {
    let endpoint = `/admin/orders?page=${page}&items=${props.itemsPerPage}`;

    if (props.searchKeyword.length > 0) {
      endpoint += `&keyword=${encodeURIComponent(props.searchKeyword)}`
    }

    await useFetchAPI<ApiResponse>(endpoint, {
      method: "GET",
      server: false,
      onResponse({ response }) {
        if (response.ok) {
          const payload = response._data.data

          // Store them in variables
          orders.value = [ ...payload.data ];
          pagination.value = payload;

          // Delete unnecessary data from pagination
          delete pagination.value.data;
        }
      },
      onResponseError() {
        // isFailed.value = true;
        // isLoading.value = false;

        // TODO: Handle errors
      }
    });
  }

  await fetchOrders();

  const checkAllItems = computed({
    get() {
      if (orders.value.length === 0) return false;
      return orders.value ? checkedItems.value.length === orders.value.length : false
    },
    set(value) {
      let checked: string[] = [];

      if (value) {
        orders.value.forEach((order) => {
          checked.push(order.order_id);
        })
      }

      checkedItems.value = checked;
    }
  });

  const selectedOrderId = ref('')
  const selectedOrderItems = ref<OrderItem[]>([]);
  const selectedOrderDeliveryStatus = ref('');

  // View Ordered Items Modal

  const openDetailsModal = (order: Order) => {
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


  // Change Delivery Status Modal
  const openChangeDeliveryStatusModal = (order: Order) => {
    selectedOrderId.value = order.order_id;
    selectedOrderDeliveryStatus.value = order.delivery_status;

    changeDeliveryStatusModal.open();
  }

  const changeDeliveryStatusModal = useModal({
    component: ModalChangeDeliveryStatus,
    attrs: {
      order_id: selectedOrderId,
      currentStatus: selectedOrderDeliveryStatus,
      onCancel() {
        changeDeliveryStatusModal.close()
      },
      onChange(newDeliveryStatus: string) {
        toast.success("Delivery status changed")

        const orderIndex = orders.value.findIndex((order) => { return order.order_id === selectedOrderId.value });
        orders.value[orderIndex].delivery_status = newDeliveryStatus;

        changeDeliveryStatusModal.close();
      }
    }
  })

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
</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-striped mb-0">
          <!--    <colgroup>-->
          <!--      <col span="1" style="width: 10%;">-->
          <!--      <col span="1" style="width: 25%;">-->
          <!--      <col span="1" style="width: 25%;">-->
          <!--      <col span="1" style="width: 20%;">-->
          <!--      <col span="1" style="width: 15%;">-->
          <!--    </colgroup>-->

          <thead>
          <tr>
            <th scope="col" class="d-print-none">
              <div class="form-check">
                <input v-model="checkAllItems" class="form-check-input" type="checkbox">
              </div>
            </th>
            <th scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Customer</th>
            <th scope="col">Products</th>
            <th scope="col">Amount</th>
            <th scope="col">Status</th>
            <th scope="col">Delivery Status</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="order in orders" :key="order.order_id">
            <td class="d-print-none">
              <div class="form-check">
                <input v-model="checkedItems" class="form-check-input" type="checkbox" :value="order.order_id">
              </div>

            </td>
            <td class="text-truncate overflow-hidden">
              <nuxt-link :to="`/admin/orders/${ order.order_id }`" class="text-decoration-none" v-tooltip="`#${order.order_id}`">
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
            <td class="text-truncate overflow-hidden d-flex align-items-center justify-content-between gap-2" style="cursor: pointer;"  @click="openDetailsModal(order)">
              <small v-if="order.items.length === 0">
                <span class="text-danger">Missing items</span>

                <span class="ms-2">
                <img src="/icons/info-black.svg" alt="info icon" width="16" v-tooltip="'The items might have been forced deleted.'" />
              </span>

              </small>
              <div v-if="order.items.length > 0">
                <small class="mb-0" :class="{ 'text-decoration-line-through': order.items[0].product.is_deleted }">
                  <span :class="{ 'text-danger': order.items[0].product.is_deleted }">
                    {{ order.items[0].product.name }}
                  </span>
                  <span v-if="order.items[0].product.is_deleted" class="ms-2" v-tooltip="'This item has been deleted.'">
                    <img src="/icons/info-black.svg" alt="info icon" width="16" />
                  </span>
                </small>
                <br>
                <small class="mb-0">
                  {{ order.items[0].product.category }}
                </small>
              </div>
              <div v-if="order.items.length > 1">
                <small class="mini-badge">+{{ (order.items.length) - 1 }}</small>
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
            <td>
              <div class="dropdown">
                <button class="btn btn-action" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical position-relative">
                    <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
                  </svg>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <nuxt-link class="dropdown-item" :to="`/admin/orders/${order.order_id}`">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span class="ms-1">
                        View
                      </span>
                    </nuxt-link>
                  </li>
                  <li v-if="order.delivery_status !== 'PROCESSING'" @click="openChangeDeliveryStatusModal(order)">
                    <button type="button" class="dropdown-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck">
                        <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                      </svg>
                      <span class="ms-2">Change delivery status</span>
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex align-items-center mt-4 mb-2">
        <img src="/icons/info-black.svg" alt="info icon" width="16" />
        <small class="ms-2">
          Click on the individual product column to learn more of the ordered items
        </small>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <small class="text-subtle">
          Displaying {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
        </small>

        <client-only>
          <Bootstrap5Pagination
              class="mb-0"
              :data="pagination"
              @pagination-change-page="fetchOrders"
          />
        </client-only>
      </div>

    </div>
  </div>

</template>

<style scoped lang="scss">
  .form-check {
    min-height: 1.3rem;
    input {
      border-color: rgba(0,0,0,0.3);
    }
  }
  .order-price, .order-delivery {
    border-radius: 20px;
    padding: 5px 15px!important;
  }
  .table td {
    height: 81px;
    .mini-badge {
      padding: 6px;
      background: rgba(0,0,0,0.08);
      border-radius: 50%;
    }
  }
</style>
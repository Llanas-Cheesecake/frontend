<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  import { useModal } from "vue-final-modal";
  import { ModalChangeDeliveryStatus } from "#components";
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { DetailedOrder } from "~/types/Order";

  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })

  const { useToast } = Toast;
  const toast = useToast();

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
      paymongo_id: '',
      amount_paid: 0,
      net_amount: 0,
      fee: 0,
      paid_using: '',
      status: '',
      paid_at: ''
    },
    delivery_information: {
      customer_name: '',
      email: '',
      phone_number: '',
      pickup_type: '',
      pickup_datetime: '',
      courier_name: '',
      additional_info: '',
      status: ''
    },
    voucher_code: '',
    total_price: 0,
    status: '',
    created_at: ''
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
    order.delivery_information = payload.delivery_information;
    order.voucher_code = payload.voucher_code;
    order.total_price = payload.total_price;
    order.status = payload.status;
    order.created_at = payload.created_at;
  }

  const changeDeliveryStatusModal = useModal({
    component: ModalChangeDeliveryStatus,
    attrs: {
      order_id: order.order_id,
      currentStatus: order.delivery_information.status,
      onCancel() {
        changeDeliveryStatusModal.close()
      },
      onChange(newDeliveryStatus: string) {
        toast.success("Delivery status changed")
        order.delivery_information.status = newDeliveryStatus;
        changeDeliveryStatusModal.close();
      }
    }
  })

  const getItemTotalPrice = (product_id: number) => {
    const item = order.items.find(i => i.product.product_id === product_id);

    if (!item) return 0;

    return formatPrice(item.quantity * item.price);
  }

  const getOriginalPrice = (product_id: number) => {
    const item = order.items.find(i => i.product.product_id === product_id);

    if (!item) return 0;

    return formatPrice(item.quantity * item.product.price);
  }

  const deliveryStatus = computed(() => {
    switch (order.delivery_information.status) {
      case "ON_GOING":
        return "On the way";
      case "UNFULFILLED":
        return "Ready for pickup"
      case "PROCESSING":
        return "Awaiting payment";
      case "CANCELED":
        return "Canceled";
      case "DELIVERED":
        return "Delivered";
    }
  });

  const discount = computed(() => {
    if (!order.voucher_code) return 'No discount';

    if (order.voucher_code === 'special_discount') {
      return 'Special discount (20%)';
    } else {
      return order.voucher_code;
    }
  })

  const paymentStatus = computed(() => {
    if (!order.payment) return;

    if (order.payment.status === 'processing_refund') return 'Processing Refund';

    return capitalizeText(order.payment.status);
  });

  const handlePaymentStatusUpdate = (status: string) => {
    order.payment.status = status;
  }

  const showDeliveryStatus = computed(() => {
    if (!order.payment) return true;

    return !['processing_refund', 'refunded'].some(el => order.payment.status.includes(el))
  });

  const showRefundStatus = computed(() => {
    if (!order.payment) return false;

    return ['processing_refund', 'refunded'].some(el => order.payment.status.includes(el))
  });

  const canChangeDeliveryStatus = computed(() => {
    if (showRefundStatus.value) return false;

    return order.delivery_information.status !== 'PROCESSING';
  })

  const printPage = () => {
    if (process.client) {
      setTimeout(() => {
        window.print()
      }, 300)
    }
  }
</script>

<template>
  <section class="dashboard">
    <!-- Header -->
    <div class="header card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <BackButton link="/admin/orders" class="d-print-none" />
          <div class="flex-fill overflow-x-hidden">
            <h5 class="fw-bold mb-2 flex-fill text-truncate">
              Order ID #{{ order.order_id }}
            </h5>
            <!-- Delivery Status -->
            <div v-if="showDeliveryStatus"
                 class="delivery-status alert text-center p-1 mb-0 me-2 d-inline-block" :class="{
                'alert-danger': order.delivery_information.status === 'PROCESSING',
                'alert-warning': order.delivery_information.status === 'UNFULFILLED',
                'alert-info': order.delivery_information.status === 'ON_GOING',
                'alert-success': order.delivery_information.status === 'DELIVERED',
              }">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck">
                <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              <small class="ms-2">{{ deliveryStatus }}</small>
            </div>
            <!-- END Delivery Status -->

            <!-- Refunded Status -->
            <small v-if="showRefundStatus"
                 class="delivery-status alert text-center p-1 mb-0 me-2 d-inline-block" :class="{
                'alert-warning': order.payment.status === 'processing_refund',
                'alert-info': order.payment.status === 'refunded',
              }">
              &#8369;
              <span>{{ paymentStatus }}</span>
            </small>
            <!-- END Refunded Status -->

            <small class="text-subtle">
              <nuxt-time class="d-block d-md-inline mt-2 mt-md-0" :datetime="order.created_at" month="short" day="2-digit" year="numeric" hour="numeric" minute="numeric" />
            </small>
          </div>
          <div class="d-print-none">
            <div class="dropdown">
              <button class="btn btn-action" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical position-relative">
                  <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
                </svg>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li @click="printPage">
                  <button type="button" class="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer position-relative">
                      <polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>
                    </svg>
                    <span class="ms-2">Print</span>
                  </button>
                </li>
                <li v-if="canChangeDeliveryStatus" @click="changeDeliveryStatusModal.open()">
                  <button type="button" class="dropdown-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck">
                      <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <span class="ms-2">Change delivery status</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END Header -->

    <!-- Ordered Items -->
    <div class="card mb-4 p-2">
      <div class="card-body">
        <h5 class="fw-bold mb-4">
          Ordered Items
        </h5>

        <ul v-if="order.items.length > 0" class="items">
          <li v-for="item in order.items" class="item">
            <img class="item-image" :src="item.product.thumbnail" alt="cart item" />
            <div class="item-info">
              <p class="item-name" :class="{ 'text-danger text-decoration-line-through': item.product.is_deleted }">
                <span>
                  {{ item.product.name }}
                </span>
                <span v-if="item.product.is_deleted" class="ms-2" v-tooltip="'This item has been deleted.'">
                  <img class="position-relative" style="top: -1px;" src="/icons/info-black.svg" alt="info icon" width="16" />
                </span>
              </p>
              <p class="item-category">{{ item.product.category }}</p>
            </div>
            <div class="item-info-alt">
              <p class="item-price mb-0">
                <span class="fw-bold">{{ getItemTotalPrice(item.product.product_id) }}</span>
              </p>
              <small v-if="order.voucher_code" class="item-price text-decoration-line-through">
                <span>{{ getOriginalPrice(item.product.product_id) }}</span>
              </small>
              <p class="item-quantity">
                Quantity: {{ item.quantity }}
              </p>
            </div>
          </li>
        </ul>

        <p v-else class="mb-0">
          No items found. The ordered items might have been forced deleted.
        </p>

      </div>
    </div>
    <!-- END Ordered Items -->

    <!-- Customer and Payment Details -->
    <div class="row">
      <div class="col-sm-12 col-md-6">
        <AdminOrderCustomerDetails :delivery-information="order.delivery_information" />
      </div>
      <div class="col-sm-12 col-md-6">
        <AdminOrderPaymentDetails v-if="order.payment"
                                  :payment="order.payment"
                                  :discount="discount"
                                  :delivery-status="order.delivery_information.status"
                                  @update-payment-status="handlePaymentStatusUpdate" />

        <div v-else class="card p-2">
          <div class="card-body">
            <h5 class="fw-bold mb-4">
              Payment Details
            </h5>

            <div class="alert alert-danger">
              This order is <span class="fw-bold">unpaid</span>. Likely abandoned by the customer.
            </div>

            <dl class="mb-0">
              <dt>Discount</dt>
              <dd>{{ discount }}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <!-- END Customer and Payment Details -->
  </section>
</template>

<style scoped lang="scss">
  .delivery-status {
    border-radius: 8px;
    padding: 5px 15px!important;
  }

  .items {
    list-style: none;
    padding-left: 0;
    .item {
      background-color: rgba(0,0,0,0.1);
      border-radius: 8px;
      display: flex;
      gap: 0.8rem;
      padding: 1rem;
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      .item-image {
        width: 80px;
        height: 80px;
        border-radius: 8px;
      }
      .item-info {
        flex: 1;
        .item-name {
          //font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .item-category {
          color: color-mix(in srgb,var(--color-text-primary), #000 50%);
          margin-bottom: 0;
          font-size: 0.9rem;
        }
      }
      .item-info-alt {
        //width: 100%;
        text-align: end;
        .item-price {
          font-weight: bold;
          margin-bottom: 0.2rem;
        }
        .item-quantity {
          color: color-mix(in srgb,var(--color-text-primary), #000 50%);
          margin-bottom: 0;
          font-size: 0.9rem;
        }
        .item-actions {
          img {
            cursor: pointer;
            width: 16px;
          }
        }
      }
    }
  }
</style>
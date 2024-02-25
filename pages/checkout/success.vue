<script setup lang="ts">
  import { useCartStore } from "~/store/cart";
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { Order } from "~/types/Order";

  const cart = useCartStore();
  const route = useRoute();

  if (!route.query.token) {
    navigateTo('/')
  }

  useHead({
    title: "Payment Success"
  })

  const order = reactive<Order>({
    id: '',

    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',

    items: [],

    deliveryAddress: '',
    additionalInfo: '',

    amountPaid: 0,
    paidUsing: '',
  })

  const { data: response, status, error } = await useFetchAPI<ApiResponse>(`/order/${route.query.token}`, {
    method: 'GET'
  })

  if (error.value) {
    switch (error.value.statusCode) {
      case 403:
      case 404:
        navigateTo('/')
        break;
      default:
        // TODO: Handle errors
        console.log(error.value)
    }
  }

  if (response.value) {
    const result = response.value.data
    const data = result.order;

    // Set data
    order.id = data.order_id
    order.items = data.items

    order.customerName = data.delivery.first_name + " " + data.delivery.last_name;
    order.customerEmail = data.delivery.email;
    order.customerPhoneNumber = "+63" + data.delivery.phone_number;

    if (data.delivery.address_2) {
      order.deliveryAddress = data.delivery.address_1 + "<br/> " + data.delivery.address_2 + ", " + data.delivery.city + ", " + data.delivery.region + ", " + data.delivery.zip_code;
    } else {
      order.deliveryAddress = data.delivery.address_1 + ", " + data.delivery.city + ", " + data.delivery.region + ", " + data.delivery.zip_code;
    }

    order.paidUsing = data.payment.paid_using
    order.amountPaid = data.total_price;
    order.additionalInfo = data.delivery.additional_info
  }

  const getItemTotalPrice = (product_id: number) => {
    const item = order.items.find(i => i.product.product_id === product_id);

    if (!item) return 0;

    return item.quantity * item.product.price;
  }
</script>

<template>
  <section class="my-4">

    <nuxt-link to="/" class="btn btn-primary btn-back mb-4">
      <img src="/icons/arrow-left.svg" width="20" class="me-2" alt="back arrow" />
      <span>Continue shopping</span>
    </nuxt-link>

    <div class="row">
      <div class="col-md-12 col-lg-8">
        <div class="card bg-primary text-primary p-2 mb-4">
          <div class="card-body">

            <div class="d-flex align-items-center gap-3 mb-4">
              <img src="/icons/check-circle.svg" alt="checked icon" width="50" />
              <div>
                <small class="text-subtle d-block mb-1">Order #{{ order.id }}</small>
                <h4 class="mb-0">Payment Successful</h4>
              </div>
            </div>

            <div class="d-flex gap-3 mb-4">
              <div class="panel w-50">
                <h5 class="mb-4">
                  Contact Information
                </h5>

                <p class="mb-1 fw-bold">Name:</p>
                <p class="mb-3">{{ order.customerName }}</p>

                <p class="mb-1 fw-bold">Email:</p>
                <p class="mb-3">{{ order.customerEmail }}</p>

                <p class="mb-1 fw-bold">Phone Number:</p>
                <p class="mb-0">{{ order.customerPhoneNumber }}</p>

              </div>

              <div class="panel w-50">
                <h5 class="mb-4">
                  Order Details
                </h5>
                <p class="mb-1 fw-bold">Delivery Address:</p>
                <p class="mb-3" v-html="order.deliveryAddress"></p>

                <p class="mb-1 fw-bold">Paid using:</p>
                <p class="mb-3">{{ order.paidUsing }}</p>

                <p class="mb-1 fw-bold">Amount paid:</p>
                <p class="mb-3">
                  &#8369;<span>{{ order.amountPaid }}</span>
                </p>

                <p class="mb-1 fw-bold">Additional info:</p>
                <p class="mb-0">
                  {{ order.additionalInfo ? order.additionalInfo : "N/A" }}
                </p>
              </div>
            </div>

            <p class="mb-1">Need help with this order?</p>
            <nuxt-link to="/" class="form-text">Contact Us</nuxt-link>

          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-4">

        <div class="card p-2 mb-3">
          <div class="card-body">
            <h5 class="card-title">Order Summary</h5>

            <hr />

            <section>
              <ul class="cart-items my-4">

                <li v-for="item in order.items" class="cart-item">
                  <img class="item-image" :src="item.product.thumbnail" alt="cart item" />
                  <div class="item-info">
                    <p class="item-name">{{ item.product.name }}</p>
                    <p class="item-category">{{ item.product.category }}</p>
                  </div>
                  <div class="item-info-alt">
                    <p class="item-price">
                      &#8369;<span>{{ formatPrice(getItemTotalPrice(item.product.product_id)) }}</span>
                    </p>
                    <p class="item-quantity">
                      Quantity: {{ item.quantity }}
                    </p>
                  </div>
                </li>

              </ul>
            </section>

            <hr />

            <section>
              <div class="d-flex justify-content-between">
                <div>Subtotal:</div>
                <div>&#8369;{{ formatPrice(order.amountPaid) }}</div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .panel {
    border: 1px solid color-mix(in srgb,var(--bg-primary), #000 30%);
    border-radius: 8px;
    padding: 1.5rem;
  }

  .btn-back {
    border-radius: 8px;
    img {
      position: relative;
      top: -1px;
    }
  }

  .cart-items {
    list-style: none;
    padding-left: 0;
    .cart-item {
      display: flex;
      gap: 0.8rem;
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
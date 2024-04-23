<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { DetailedOrder } from "~/types/Order";

  const orders = reactive<DetailedOrder[]>([])

  const { data: result, error, pending } = await useFetchAPI<ApiResponse>('/account/order-history', {
    method: "GET",
    server: false,
    onResponse({ response }): Promise<void> | void {
      const fetchedOrders = response._data.data.orders;

      fetchedOrders.map((order: DetailedOrder) => {
        orders.push(order)
      })
    }
  })

  const getItemTotalPrice = (order: DetailedOrder, product_id: number) => {
    const item = order.items.find(i => i.product.product_id === product_id);

    if (!item) return 0;

    return formatPrice(item.quantity * item.price);
  }
</script>

<template>
  <section>
    <div class="card p-2">
      <div class="card-body">
        <h4 class="card-title">Order History</h4>
        <hr />

        <section v-if="!pending">
          <div v-for="order in orders" class="order-item card">

            <div class="card-header p-3">
              <div class="order-info">
                <div>
                  <p class="title">Receipt ID</p>
                  <p class="subtitle">#{{ order.order_id.slice(0, 7) }}</p>
                </div>
                <div>
                  <p class="title">Total Amount</p>
                  <p class="subtitle">
                    &#8369;{{ order.payment?.amount_paid }}
                  </p>
                </div>
                <div>
                  <p class="title">Pickup Type</p>
                  <p class="subtitle">{{ order.delivery_information.pickup_type }}</p>
                </div>
                <div>
                  <p class="title">Courier</p>
                  <p class="subtitle">{{ order.delivery_information.courier_name }}</p>
                </div>
                <div v-if="order.voucher_code === 'special_discount'">
                  <p class="title">Discount</p>
                  <p class="subtitle">
                    Special discount (20%)
                  </p>
                </div>
              </div>
            </div>

            <div class="card-body">
              <p v-if="order.items.length === 0" class="my-4">
                No items were found. <br /> The items might have been deleted by the owner.
              </p>

              <div v-for="item in order.items" class="product-item">
                <img :src="item.product.thumbnail" class="img-thumbnail" :alt="item.product.name" />
                <div class="product-info">
                  <p class="fw-bold mb-3">{{ item.product.name }}</p>
                  <small class="mb-1 d-block">Size - {{ item.type }}</small>
                  <small class="mb-0 d-block">Quantity - {{ item.quantity }}</small>
                </div>
                <div class="position-relative">
                  <div class="product-price">
                      {{ getItemTotalPrice(order, item.product.product_id) }}
                  </div>
                  <div class="product-actions">
                    <nuxt-link :to="`/products/${item.product.slug}/review`" class="action" role="button" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="top: -1px;" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit position-relative">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span class="action-text ms-2 w-100 no-wrap">Write Review</span>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-footer">
              <p class="mb-1">
                <span class="fw-bold">
                  Paid at:
                </span> <NuxtTime :datetime="order.payment?.paid_at" month="long" day="numeric" year="numeric" />
              </p>
              <p class="mb-0">
                <span class="fw-bold">
                  Pick-up Date:
                </span>
                <NuxtTime :datetime="order.delivery_information!!.pickup_datetime"
                           weekday="long"
                           month="long"
                           year="numeric"
                           day="numeric"
                           hour="numeric"
                           minute="2-digit"
                />
              </p>
            </div>
          </div>

          <div v-if="orders.length === 0">
            No order history found.
          </div>

        </section>

        <section v-else>
          <loading-icon color="white" />
          <span class="ms-2">Loading order history</span>
        </section>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.main {
  background-color: #77a042;
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 60px;
}

.main h3 {
  color: white;
  font-weight: bold;
}

.main hr {
  background-color: white;
  position: relative;
  top: 20px;
  border: none;
  height: 5px;
  margin-bottom: 50px;
  opacity: 100%;
  margin-left: -60px;
  margin-right: -60px;
}

.header {
  display: flex;
}

.home-icon {
  margin-right: 15px;
}

.date-time {
  background-color: #ffd47e;
  width: fit-content;
  height: fit-content;
  margin-bottom: -20px;
  padding: 7px;
}

.order-item {
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
}

.product-item {
  display: flex;
  gap: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  .img-thumbnail {
    border: 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23);
    padding: 0;

    width: 100px;
    height: 100px;
  }
  .product-info {
    flex: 1;
  }

  .product-price {
    font-weight: bold;
    text-align: end;
  }
  .product-actions {
    position: absolute;
    bottom: 0;
    right: 0;
    .action {
      border-radius: 4px;
      color: var(--color-text-primary);
      cursor: pointer;
      display: flex;
      padding: 0.3rem 0.6rem;
      text-decoration: none;
      &:hover {
        background-color: rgba(0,0,0,0.2);
      }
      img {
        cursor: pointer;
        width: 20px;
      }
      .action-text {
        display: inline-block;
        font-size: 0.9rem;
        white-space: nowrap;
      }
    }
  }
}

//update

.card-title {
  font-weight: bold;
}

.order-info {
  display: flex;
  align-items: center;
  gap: 3rem;

  .title, .subtitle {
    margin-bottom: 0;
  }
  .title {
    font-weight: bold;
  }
}

@media (max-width: 991px) {
  .order-info {
    flex-direction: column;
    gap: 0.8rem;
    > div {
      width: 100%;
    }
  }
}
</style>

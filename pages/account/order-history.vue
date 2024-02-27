<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { Order } from "~/types/Order";

  const orders = reactive<Order[]>([])

  const { data: result, error, pending } = await useFetchAPI<ApiResponse>('/account/order-history', {
    method: "GET",
    server: false,
    onResponse({ response }): Promise<void> | void {
      const fetchedOrders = response._data.data.orders;

      fetchedOrders.map((order: Order) => {
        orders.push(order)
      })
    }
  })

  const getItemTotalPrice = (order: Order, product_id: number) => {
    const item = order.items.find(i => i.product.product_id === product_id);

    if (!item) return 0;

    return formatPrice(item.quantity * item.product.price);
  }
</script>

<template>
  <section>
    <div class="card bg-primary text-white p-2">
      <div class="card-body">
        <h4 class="card-title">Order History</h4>
        <hr />

        <section v-if="!pending">
          <div v-for="order in orders" class="order-item card bg-primary text-white">

            <div class="card-header p-3">
              <div class="order-info">
                <div>
                  <p class="title">Receipt ID</p>
                  <p class="subtitle">{{ order.order_id }}</p>
                </div>
                <div class="flex-fill">
                  <p class="title">Total Amount</p>
                  <p class="subtitle">&#8369;600.00</p>
                </div>
                <div>
                  <button class="btn btn-primary me-2">
                    Give Review
                  </button>
                  <button class="btn btn-secondary">
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <div class="card-body">
              <div v-for="item in order.items" class="product-item">
                <img :src="item.product.thumbnail" class="img-thumbnail" :alt="item.product.name" />
                <div class="product-info">
                  <p class="fw-bold mb-3">{{ item.product.name }}</p>
                  <small class="mb-1 d-block">Size - {{ item.type }}</small>
                  <small class="mb-0 d-block">Quantity - {{ item.quantity }}</small>
                </div>
                <div class="product-price">
                  {{ getItemTotalPrice(order, item.product.product_id) }}
                </div>
              </div>
            </div>

            <div class="card-footer">
              <p class="mb-0">
                Paid at: <NuxtTime :datetime="order.payment?.paid_at" month="long" day="numeric" year="numeric" />
              </p>
            </div>

          </div>
        </section>

        <section v-else>
          <loading-icon color="white" />
          <span class="ms-2">Loading order history</span>
        </section>

      </div>
    </div>
  </section>

<!--  <div class="menuCard">-->
<!--    <div class="menuHeader">-->
<!--      <div class="menuHeaderContents">-->
<!--        <div id="homeAndName">-->
<!--          <a href="https://youtube.com" id="homeButton"></a>-->
<!--          <h3>Order History</h3>-->
<!--        </div>-->
<!--        <button id="addMenuButton" @click="addClick"></button>-->

<!--        <select v-model="sortby" id="sortDropDown">-->
<!--          <option value="alphabetical">A-Z</option>-->
<!--          <option value="reverseA">Z-A</option>-->
<!--        </select>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div>-->
<!--      <div class="date-time mt-4 mx-4">-->
<!--        <p>12/16/17/2023 10:39am</p>-->
<!--      </div>-->
<!--      <div class="content row d-flex justify-content-center mx-4">-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Items</h5>-->
<!--          <Row class="chicken-pesto">-->
<!--            <img src="/images/chicken-pesto.jpeg" class="product" />-->
<!--          </Row>-->
<!--          <Row>-->
<!--            <img src="/images/iced-latte.png" class="product" />-->
<!--          </Row>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Name</h5>-->
<!--          <row class="chicken-pesto">-->
<!--            <p>Chicken Pesto Sandwich</p>-->
<!--          </row>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Quantity</h5>-->
<!--          <Row class="chicken-pesto">-->
<!--            <p>3</p>-->
<!--          </Row>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Price</h5>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Order Information</h5>-->
<!--          <Row>-->
<!--            <p>-->
<!--              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do-->
<!--              eiusmod tempor incididunt ut labore et dolore magna aliqua.-->
<!--            </p>-->
<!--          </Row>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="date-time mt-4 mx-4">-->
<!--        <p>12/16/17/2023 10:39am</p>-->
<!--      </div>-->
<!--      <div class="content row d-flex justify-content-center mx-4 mb-4">-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Items</h5>-->
<!--          <Row class="chicken-pesto">-->
<!--            <img src="/images/chicken-pesto.jpeg" class="product" />-->
<!--          </Row>-->
<!--          <Row>-->
<!--            <img src="/images/iced-latte.png" class="product" />-->
<!--          </Row>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Name</h5>-->
<!--          <row class="chicken-pesto">-->
<!--            <p>Chicken Pesto Sandwich</p>-->
<!--          </row>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Quantity</h5>-->
<!--          <Row class="chicken-pesto">-->
<!--            <p>3</p>-->
<!--          </Row>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Price</h5>-->
<!--        </div>-->
<!--        <div class="col-lg-2 col-md-6">-->
<!--          <h5>Order Information</h5>-->
<!--          <Row>-->
<!--            <p>-->
<!--              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do-->
<!--              eiusmod tempor incididunt ut labore et dolore magna aliqua.-->
<!--            </p>-->
<!--          </Row>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
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

.menuHeaderContents {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0;
  justify-content: space-between;
  display: flex; /* Use flexbox */
  align-items: center;
  flex: 1;
}

.menuHeaderContents h3 {
  color: white;
  font-weight: bold;
  padding-top: 10px;
  cursor: default;
}

#homeAndName {
  display: inline-flex;
  padding-bottom: 10px;
  justify-content: space-between;
  vertical-align: middle;
}

#homeButton {
  //background-image: url("../icons/homeBtn.png");
  background-size: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  border: none;
  outline: none;
  margin-right: 12px;
}

#addMenuButton {
  //background-image: url("../icons/addMenu.png");
  background-size: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  border: none;
  outline: none;
}

#sortDropDown {
  color: white;
  background-color: #77a042;
  border: none;
  outline: none;
  font-weight: bold;
  padding: 0 20px 0 20px;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
}

#sortDropDown option {
  font-weight: bold;
  align-self: center;
}
</style>

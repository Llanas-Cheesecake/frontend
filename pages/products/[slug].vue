<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { Product } from "~/types/Product";

  import vue3StarRatings from "vue3-star-ratings";
  import { useCartStore } from "~/store/cart";

  const cart = useCartStore();

  const route = useRoute();
  const slug = route.params.slug;

  const pageTitle = ref('');
  const pageDescription = ref('');

  const product = ref<Product>({
    product_id: 0,
    slug: '',
    name: '',
    description: '',
    category: '',
    thumbnail: '',
    price: 0,
    averageRatings: 0,
    totalRatings: 0,
    images: [],
  })
  const quantity = ref(1);
  const isAddingToCart = ref(false)

  useHead({
    title: pageTitle,
    meta: [
      {
        name: "description",
        content: pageDescription,
      }, // TODO: SEO Management
    ]
  });

  const { data: result } = await useFetchAPI<ApiResponse>(`/products/${slug}`, { method: "GET" })

  if (result.value) {
    const payload = result.value.data
    product.value = { ...payload }
    pageTitle.value = payload.name
    pageDescription.value = payload.description
  }

  // TODO: Handle errors

  const incrementQuantity = () => {
    quantity.value++
  }

  const decrementQuantity = () => {
    const currentValue = quantity.value
    if (currentValue <= 1) {
      quantity.value = 1
      return
    }

    quantity.value--
  }

  const addToCart = async () => {
    isAddingToCart.value = true

    await cart.addToCart({
      product_id: product.value.product_id,
      quantity: quantity.value,
      type: product.value.category
    }).then(() => {
      // Reset quantity value to initial value
      quantity.value = 1;
    }).finally(() => {
      // Set loading indicator to false
      isAddingToCart.value = false
    })
  }

</script>

<template>
  <div>
    <div class="product-wrapper d-flex mt-5 justify-content-center">

      <div class="product-images">
        <img :src="product.thumbnail" :alt="product.name" />
      </div>

      <div class="product-info bg-primary position-relative">
        <div class="d-flex align-items-center justify-content-between mb-1">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-price">
            &#8369;<span>{{ product.price }}</span>
          </div>
        </div>
        <small class="product-category">{{ product.category }}</small>

        <p class="mt-4">{{ product.description }}</p>
        <div class="d-flex align-items-center mt-3">
          <client-only>
            <vue-3-star-ratings v-model="product.averageRatings" star-size="20" disable-click />
          </client-only>
          <span class="ms-2">({{ product.totalRatings }})</span>
        </div>

        <div class="product-actions d-flex align-items-center justify-content-between w-100">
          <div class="product-quantity-controls">
            <button class="btn btn-primary quantity-btn" @click="decrementQuantity">
              <img src="/icons/minus.svg" alt="decrement quantity" />
            </button>
            <div class="quantity-count">
              {{ quantity }}
            </div>
            <button class="btn btn-primary quantity-btn" @click="incrementQuantity">
              <img src="/icons/plus.svg" alt="increment quantity" />
            </button>
          </div>
          <div class="controls">
            <button class="btn btn-secondary" :disabled="isAddingToCart" @click="addToCart">
              <span>
                Add to cart
              </span>
              <LoadingIcon v-if="isAddingToCart" color="black" class="ms-2" />
            </button>
            <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Wishlist product">
              <img src="/icons/heart.svg" alt="Wishlist product" />
              <span class="visually-hidden">Wishlist product</span>
            </button>
            <button class="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Share product">
              <img src="/icons/share.svg" alt="Share product" />
              <span class="visually-hidden">Share product</span>
            </button>
          </div>
        </div>
      </div>

    </div>

<!--    <div>-->
<!--      <h2 class="reviewTab">REVIEWS</h2>-->
<!--    </div>-->
<!--    <div class="reviewArea">-->
<!--      <div class="reviewItem">-->
<!--        <div>-->
<!--          <div class="reviewInfo">-->
<!--            <div>-->
<!--              <img src="..\images\cheese.jpg" alt="" class="reviewImg" />-->
<!--            </div>-->
<!--            <div>-->
<!--              <h5>(name)</h5>-->
<!--              <h6>(date)</h6>-->
<!--            </div>-->
<!--            <div class="reviewRating">-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et lectus-->
<!--        dictum, commodo metus vel, tincidunt quam. Fusce imperdiet velit at-->
<!--        cursus consectetur. Integer tincidunt ex odio, eget fermentum neque-->
<!--        iaculis a. Nullam elit nisi, lobortis id erat tincidunt, tempus.-->
<!--      </div>-->
<!--      <div class="reviewItem">-->
<!--        <div>-->
<!--          <div class="reviewInfo">-->
<!--            <div>-->
<!--              <img src="..\images\cheese.jpg" alt="" class="reviewImg" />-->
<!--            </div>-->
<!--            <div>-->
<!--              <h5>(name)</h5>-->
<!--              <h6>(date)</h6>-->
<!--            </div>-->
<!--            <div class="reviewRating">-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--              <span class="star" star-status="false">★ </span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et lectus-->
<!--        dictum, commodo metus vel, tincidunt quam. Fusce imperdiet velit at-->
<!--        cursus consectetur. Integer tincidunt ex odio, eget fermentum neque-->
<!--        iaculis a. Nullam elit nisi, lobortis id erat tincidunt, tempus.-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
// Color Palette
// https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff
//.itemCard {
//  margin-top: 16px;
//  width: 100%;
//  height: 400px;
//  background-color: #77a042;
//}
//
.product-images img {
  //width: 600px;
  //height: 400px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
//
//.prodImgDiv {
//  float: left;
//}

.product-wrapper {
  .product-info {
    padding: 2rem;
    color: var(--color-text-primary);
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    max-width: 550px;

    .product-name {
      margin-bottom: 0;
    }

    .product-name, .product-category {
      font-weight: bold;
    }

    .product-category {
      color: color-mix(in srgb,var(--color-text-primary), #000 10%);
    }

    .product-price {
      background-color: var(--btn-bg-primary);
      border-radius: 8px;
      font-weight: bold;
      font-size: 1.2em;
      padding: 0.3rem 0.5rem;
    }

    .product-actions {
      position: absolute;
      bottom: 0;
      margin-left: -2rem;
      padding: 0 2rem 2rem;

      .product-quantity-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        .quantity-btn {
          border-radius: 8px;
          padding: 5px;
        }
      }

      .controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
}

@media (max-width: 991px) {
  .product-wrapper {
    flex-wrap: wrap;
    .product-images {
      width: 100%;
      background-color: var(--bg-primary);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      img {
        margin: 0 auto;
        display: block;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .product-info {
      width: 100%;
      max-width: 100%;
      min-height: 18rem;
      border-top-right-radius: 0;
      border-top: 1px solid color-mix(in srgb,var(--bg-primary), #000 10%);;
    }
  }
}

@media (max-width: 767px) {
  .product-info {
    min-height: 20rem!important;
  }
}

.productInfoDiv {
  text-align: center;
}

.topProd {
  display: flex;
}

.prodIcons {
  margin-left: auto;
  margin-right: 0;
}

.prodIcon {
  height: 40px;
  margin-left: 20px;
}

.qtyDiv {
  display: flex;
}

.qtyIcon {
  height: 35px;
}

#output-area {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 30px;
}

.btnProd {
  display: inline-block;
  border: transparent;
  color: black;
  background-color: #ffffff;
  padding: 20px;
  margin: 5px 80px;
  font-size: 12px;
  width: 140px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
}

.btnProd:hover {
  background-color: #d7d7d7;
}

[star-status="true"] {
  color: #ffd47e;
}
[star-status="false"] {
  color: #ffffff;
}

.star {
  font-size: 34px;
}

//review
.reviewTab {
  background-color: #77a042;
  color: #ffffff;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 10px 160px;
  text-align: center;
  display: inline-block;
  border-radius: 50px;
}

.reviewArea {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  color: #ffffff;
  margin: 20px 0;
}

.reviewItem {
  background-color: #77a042;
  padding: 20px;
  border-radius: 20px;
}

.reviewInfo {
  display: flex;
}

.reviewRating {
  margin-left: auto;
  margin-right: 0;
}

.reviewImg {
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-right: 0.5rem;
}
</style>

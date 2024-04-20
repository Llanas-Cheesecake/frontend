<script setup lang="ts">
  import type { Product } from "~/types/Product";

  definePageMeta({
    title: 'Home',
    meta: [
      { name: 'description', content: `Llana's Cheesecake offers a wide variety of pastry` } // TODO: SEO Management
    ]
  });

  const products = ref<Product[]>([])
</script>

<template>
  <div>
    <Carousel class="my-5"/>

    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
        <nuxt-link to="/menu/all" class="card shortcut menu p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              Menu
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
        <nuxt-link to="/custom-order" class="card shortcut custom-order p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              Custom Order
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
        <nuxt-link to="/contact" class="card shortcut contact p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              Contact Us
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
        <nuxt-link to="/about" class="card shortcut about p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              About Us
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div class="my-5">
      <h2 class="text-heading fw-bold mb-1">
        Try our best sellers
      </h2>

      <p class="fs-5 mb-5">
        These items are loved by our customers!
      </p>

      <BestSellersList />

    </div>
  </div>
</template>

<style scoped lang="scss">
  .card.shortcut {
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    color: white;
    min-height: 200px;
    position: relative;
    text-decoration: none;
    .icon {
      bottom: 1rem;
      right: 1.5rem;
      transition: 0.3s;
    }
    &:hover .icon {
      right: 1rem;
    }
    .card-body {
      z-index: 2;
    }
    .overlay {
      border-radius: 12px;
      position: absolute;
      top: 0;
      left: 0;
      min-height: 100%;
      min-width: 100%;
      background: rgba(61, 59, 64, 0.5);
      background-size:cover;
      z-index: 1;
    }
    &.menu {
      background-image: url("/images/home-card-1.png");
    }
    &.custom-order {
      background-image: url("/images/home-card-2.png");
    }
    &.contact {
      background-image: url("/images/home-card-3.png");
    }
    &.about {
      background-image: url("/images/home-card-4.png");
    }
  }
</style>
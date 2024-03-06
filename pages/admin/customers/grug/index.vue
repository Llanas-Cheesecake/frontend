<script setup lang="ts">
import type { ApiResponse } from "~/types/ApiResponse";
import type { Product } from "~/types/Product";

definePageMeta({
  layout: 'admin'
});


</script>

<template>
  <section class="dashboard">

    <div class="card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">

          <BackButton link="/admin/customers/customers"></BackButton>



        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12 col-lg-4">
        <div class="card p-2">
          <div class="card-body">
            <div class="mb-4">
              <h5 class="fw-bold mb-2">Name:</h5>
              <h5 class="mb-0">Full Name</h5>
            </div>

            <div class="mb-4">
              <p class="fw-bold mb-2">Email:</p>
              <p class="mb-0">EmailzDOTcom</p>
            </div>

          </div>
        </div>
      </div>

      <div class="col-md-12 col-lg-8">
        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="fw-bold mb-4">Recent orders</h5>

            <p class="mb-0">A table of recent orders with this product will be displayed here</p>
          </div>
        </div>


      </div>

    </div>

  </section>
</template>

<style scoped lang="scss">
.product-image {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 250px;
}
</style>
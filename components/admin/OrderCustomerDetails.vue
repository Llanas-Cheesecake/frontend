<script setup lang="ts">
  import type { OrderDelivery } from "~/types/Order";

  const props = defineProps<{
    deliveryInformation: OrderDelivery
  }>();
</script>

<template>
  <div class="card mb-4 p-2">
    <div class="card-body">
      <h5 class="fw-bold mb-4">
        Customer Details
      </h5>

      <dl class="mb-3">
        <dt>Name</dt>
        <dd>{{ deliveryInformation.customer_name }}</dd>
        <dt>Email</dt>
        <dd>{{ deliveryInformation.email }}</dd>
        <dt>Phone Number</dt>
        <dd>+63{{ deliveryInformation.phone_number }}</dd>
        <dt>Address 1</dt>
        <dd>{{ deliveryInformation.address_1 }}</dd>
        <dt>Address 2</dt>
        <dd>{{ deliveryInformation.address_2 }}</dd>
        <dt>City</dt>
        <dd>{{ deliveryInformation.city }}</dd>
        <dt>Region</dt>
        <dd>{{ deliveryInformation.region }}</dd>
        <dt>Zip Code</dt>
        <dd>{{ deliveryInformation.zip_code }}</dd>
      </dl>

      <p class="fw-bold fs-5 mb-2">Notes</p>
      <p class="mb-0">{{ deliveryInformation.additional_info }}</p>

    </div>
  </div>
</template>

<style scoped lang="scss">
  dl {
    display: grid;
    grid-template-columns: max-content auto;
    grid-gap: 0.3rem 2rem;
  }

  dt {
    grid-column-start: 1;
    color: color-mix(in srgb,var(--color-text-primary), #fff 40%);
  }

  dd {
    grid-column-start: 2;
  }
</style>
<script setup lang="ts">
  import type { OrderDelivery } from "~/types/Order";

  const props = defineProps<{
    deliveryInformation: OrderDelivery
  }>();

  const pickupType = computed(() => {
    switch (props.deliveryInformation.pickup_type) {
      case 'SELF':
        return 'Self Pickup';
      case 'COURIER':
        return 'Courier';
      default:
        return 'Unknown';
    }
  });
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

      </dl>

      <h5 class="fw-bold mb-4">
        Pickup Details
      </h5>

      <dl class="mb-3">
        <dt>Pickup Type</dt>
        <dd>{{ pickupType }}</dd>
        <dt>Pickup Date</dt>
        <dd>
          <nuxt-time :datetime="deliveryInformation.pickup_datetime"
                     weekday="long"
                     month="long"
                     year="numeric"
                     day="numeric"
                     hour="numeric"
                     minute="2-digit"
          />
        </dd>
        <dt>Chosen Courier</dt>
        <dd>{{ deliveryInformation.courier_name }}</dd>
      </dl>

      <h5 class="fw-bold mb-2">Notes</h5>
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
<script setup lang="ts">
  const isEligible = ref(false);
</script>

<template>
  <section>
    <h5 class="fw-bold">PWD/Senior Citizen</h5>
    <p class="mb-2">
      Under RA No. 9994 & RA No. 10754, you may be eligible for a 20% discount if you are a Person with Disability (PWD) or a Senior Citizen.
    </p>
    <p class="mb-3">
      To redeem this discount, you must submit documents verifying your eligibility. Any uploaded documents will be deleted right after verifying them
      in accordance with our <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>.
    </p>

    <div class="alert alert-warning">
      <span class="fw-bold">Note:</span>
      The discount won't be applied immediately upon checkout.
      The discounted price will only be applied after we verified your documents and after that, we will refund the 20% to your chosen payment method
      within 3-5 business days.
    </div>

    <div class="form-check mb-4">
      <input v-model="isEligible" class="form-check-input" type="checkbox">
      <label class="form-check-label">
        I am a PWD / Senior Citizen
      </label>
    </div>

    <div v-if="isEligible">
      <label class="form-label">Upload documents here...</label>
      <input class="form-control" type="file" multiple>
    </div>

  </section>
</template>

<style scoped lang="scss">
// Reset into default because of white background
.form-control, .form-select {
  background-color: var(--bs-body-bg);
  border: 1px solid color-mix(in srgb, var(--bg-secondary), #000 20%);
  &:focus {
    background-color: var(--bs-body-bg);
    border: 1px solid color-mix(in srgb, var(--bg-primary), #000 60%);
    box-shadow: none;
    color: var(--bs-body-color);
  }
  &:disabled {
    background-color: var(--bs-secondary-bg);
    color: rgba(var(--bs-body-color-rgb), 0.65);

    &~ label::after {
      background: var(--bs-secondary-bg)!important;
      color: #6c757d
    }
  }
  color: var(--color-text-primary);
}

.input-group-text {
  background: var(--bs-tertiary-bg);
  border-color: color-mix(in srgb, var(--bg-secondary), #000 20%);
}
</style>
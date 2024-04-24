<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";

  const isChecking = ref(true);

  const isVerified = ref(false);
  const isVerificationPending = ref(false);

  const allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf'
  ];

  const document = ref<File>();
  const isSubmitting = ref(false);

  const { data: results, error } = await useFetchAPI<ApiResponse>('/account/discount', {
    method: "GET"
  });

  if (results.value) {
    isChecking.value = false;

    const payload = results.value.data;

    isVerified.value = payload.is_verified;
    isVerificationPending.value = payload.is_pending;
  }

  if (error.value) {
    // Handle error
    isChecking.value = false;
  }

  const handleFileInputChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;

    if (files) {
      document.value = files[0];
    }
  }

  const handleFileUpload = async () => {
    if (!document.value) {
      return;
    }

    isSubmitting.value = true;

    const formData = new FormData();
    formData.append('document', document.value);

    const { data: result } = await useFetchAPI<ApiResponse>('/account/discount/verify', {
      method: "POST",
      headers: {
        ContentType: 'multipart/form-data'
      },
      body: formData,
    });

    if (result.value) {
      isSubmitting.value = false;
      isVerificationPending.value = true;
    }
  }

</script>

<template>
  <section class="reset">
    <p class="mb-2">
      Under RA No. 9994 & RA No. 10754, you may be eligible for a 20% discount if you are a Person with Disability (PWD) or a Senior Citizen.
    </p>
    <p class="mb-3">
      To redeem this discount, you must submit your ID verifying your eligibility. Any uploaded document will be deleted right after verifying them
      in accordance with our <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>.
    </p>

    <div v-if="isVerificationPending" class="alert alert-info">
      Your document is now being verified. You will receive an email once your eligibility is approved.
    </div>

    <div v-if="isVerified" class="alert alert-success">
      Your document has been verified. You are now eligible for the discount and may activate it during checkout.
    </div>

    <div v-if="!isVerified && !isVerificationPending">
      <div class="alert alert-warning">
        <span class="fw-bold">Note:</span>
        We required 2-3 business days to verify your ID. You will receive an email once your eligibility is approved.
      </div>

      <form @submit.prevent="">
        <div class="mb-4">
          <label class="form-label">Upload documents here...</label>
          <input class="form-control" type="file" :disabled="isSubmitting" @change="handleFileInputChange">
        </div>

        <button type="submit" class="btn btn-secondary" :disabled="isSubmitting" @click="handleFileUpload">
          <span>Submit documents</span>
          <LoadingIcon v-if="isSubmitting" color="white" width="20" height="20" class="ms-2 position-relative" style="top: -1px" />
        </button>
      </form>
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
<script setup lang="ts">
import type { ApiResponse } from "~/types/ApiResponse";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const config = useRuntimeConfig();
const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

const isSubmitting = ref(false);
const isSuccessful = ref(false);
const captcha_token = ref('');

const form = reactive({
  name: '',
  email: '',
  phone_number: '',
  order_id: '',
  headline: '',
  description: ''
});

const errorMessage = ref('');

const validation = reactive({
  name: [],
  email: [],
  phone_number: [],
  order_id: [],
  headline: [],
  description: []
});

const handleFormSubmit = async () => {
  resetValidations()
  isSuccessful.value = false;
  isSubmitting.value = true;

  const { data: result, error } = await useFetchAPI<ApiResponse>('/contact/inquire', {
    method: "POST",
    body: {
      name: form.name,
      email: form.email,
      phone_number: form.phone_number,
      order_id: form.order_id,
      headline: form.headline,
      description: form.description,
      captcha_token: captcha_token.value
    }
  });

  if (result.value) {
    isSubmitting.value = false;
    isSuccessful.value = true;

    resetForm();
  }

  if (error.value) {
    isSubmitting.value = false;
    const payload = error.value.data;

    switch (error.value.statusCode) {
      case 422:
        validation.name = payload.errors.name || [];
        validation.email = payload.errors.email || [];
        validation.phone_number = payload.errors.phone_number || [];
        validation.order_id = payload.errors.order_id || [];
        validation.headline = payload.errors.headline || [];
        validation.description = payload.errors.description || [];
        break;
      default:
        errorMessage.value = payload.message
    }
  }
}

const resetValidations = () => {
  validation.name = [];
  validation.email = [];
  validation.phone_number = [];
  validation.order_id = [];
  validation.headline = [];
  validation.description = [];

  errorMessage.value = '';
}

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.phone_number = '';
  form.order_id = '';
  form.headline = '';
  form.description = '';
}

const handleCaptchaVerify = (token: string, eKey: string) => {
  captcha_token.value = token;
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center my-5">
    <div class="card p-2">
      <div class="card-body">
        <h5 class="fw-bold mb-2">
          Contact Us
        </h5>
        <p class="mb-4">
          Fill up this form if you need support from us
        </p>

        <div v-if="errorMessage.length > 0" class="alert alert-danger mb-4" role="alert">
          {{ errorMessage }}
        </div>

        <div v-if="isSuccessful" class="alert alert-success mb-4" role="alert">
          Your inquiry has been sent to us!
        </div>

        <form @submit.prevent="handleFormSubmit">

          <div class="form-floating mb-4">
            <input v-model="form.name" type="text" class="form-control" :class="{ 'is-invalid': validation.name.length > 0 }" placeholder="e.g. John" aria-label="Name">
            <label class="form-label">Name</label>

            <small v-for="error in validation.name" class="invalid-feedback">
              {{ error }}
            </small>
          </div>

          <div class="row mb-3">

            <div class="col-12 col-md-6">
              <div class="form-floating mb-4">
                <input v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': validation.email.length > 0 }" placeholder="e.g. johndoe@gmail.com" aria-label="Email">
                <label class="form-label">Email</label>

                <small v-for="error in validation.email" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="input-group">
                <div class="input-group-text">+63</div>
                <div class="form-floating" :class="{ 'is-invalid':validation.phone_number.length > 0 }">
                  <input v-model="form.phone_number" type="text" class="form-control" :class="{ 'is-invalid': validation.phone_number.length > 0 }" :disabled="isSubmitting" placeholder="e.g. 9123456789">
                  <label class="form-label">Phone Number</label>
                </div>
              </div>

              <small v-for="error in validation.phone_number" class="invalid-feedback">
                {{ error }}
              </small>

              <small v-if="validation.phone_number.length === 0" class="form-text">
                Optional
              </small>
            </div>

          </div>

          <div class="form-floating mb-4">
            <input v-model="form.order_id" type="text" class="form-control" :class="{ 'is-invalid': validation.order_id.length > 0 }" placeholder="" aria-label="Order ID">
            <label class="form-label">Order ID</label>

            <small v-if="validation.order_id.length === 0" class="form-text">
              Optional. (Required if you have a problem with your ordered items)
            </small>
            <small v-for="error in validation.order_id" class="invalid-feedback">
              {{ error }}
            </small>
          </div>

          <div class="form-floating mb-4">
            <input v-model="form.headline" type="text" class="form-control" :class="{ 'is-invalid': validation.headline.length > 0 }" placeholder="" aria-label="Order ID">
            <label class="form-label">Subject</label>

            <small v-for="error in validation.headline" class="invalid-feedback">
              {{ error }}
            </small>
          </div>

          <div class="form-floating mb-4">
            <textarea v-model="form.description" type="text" class="form-control" :class="{ 'is-invalid': validation.description.length > 0 }" placeholder="Tell us your problem" style="height: 150px;"></textarea>
            <label class="form-label">Description</label>

            <small v-for="error in validation.description" class="invalid-feedback">
              {{ error }}
            </small>
          </div>

          <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>

          <div class="d-flex justify-content-center mt-4">
            <button class="btn btn-secondary" :disabled="isSubmitting" type="submit">
              <LoadingIcon v-if="isSubmitting" style="top: -1px;" class="position-relative me-1" color="white" width="20" height="20" />
              <span v-if="!isSubmitting">
                Submit
              </span>
              <span v-else>
                Submitting
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card{
  background-color: var(--bg-primary);
  color: white;
  width: 100%;
  max-width: 640px;
}
</style>
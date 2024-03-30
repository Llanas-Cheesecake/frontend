<script setup lang="ts">
  import type {ApiResponse} from "~/types/ApiResponse";
  import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

  const config = useRuntimeConfig();
  const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

  const isSubmitting = ref(false);
  const isSuccessful = ref(false);
  const captcha_token = ref('');

  const form = reactive({
    customer_name: '',
    customer_email: '',
    customer_phone_number: '',
    customer_courier: '',
    cake_size: '8 inches',
    cake_description: '',
    delivery_datetime: ''
  });

  const errorMessage = ref('');

  const validation = reactive({
    customer_name: [],
    customer_email: [],
    customer_phone_number: [],
    customer_courier: [],
    cake_size: [],
    cake_description: [],
    delivery_datetime: []
  });

  const handleFormSubmit = async () => {
    resetValidations()
    isSuccessful.value = false;
    isSubmitting.value = true;

    const { data: result, error } = await useFetchAPI<ApiResponse>('/contact/custom-order', {
      method: "POST",
      body: {
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone_number: form.customer_phone_number,
        customer_courier: form.customer_courier,
        cake_size: form.cake_size,
        cake_description: form.cake_description,
        delivery_datetime: form.delivery_datetime,
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
          validation.customer_name = payload.errors.customer_name || [];
          validation.customer_email = payload.errors.customer_email || [];
          validation.customer_phone_number = payload.errors.customer_phone_number || [];
          validation.customer_courier = payload.errors.customer_courier || [];
          validation.cake_size = payload.errors.cake_size || [];
          validation.cake_description = payload.errors.cake_description || [];
          validation.delivery_datetime = payload.errors.delivery_datetime || [];
          break;
        default:
          errorMessage.value = payload.message
      }
    }
  }

  const resetValidations = () => {
    validation.customer_name = [];
    validation.customer_email = [];
    validation.customer_phone_number = [];
    validation.customer_courier = [];
    validation.cake_size = [];
    validation.cake_description = [];
    validation.delivery_datetime = [];

    errorMessage.value = '';
  }

  const resetForm = () => {
    form.customer_name = '';
    form.customer_email = '';
    form.customer_phone_number = '';
    form.customer_courier = '';
    form.cake_size = '8 inches';
    form.cake_description = '';
    form.delivery_datetime = '';
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
          Customize your order
        </h5>
        <p class="mb-5">
          Please do note that we only do pick-up services. You must provide your own delivery courier.
        </p>

        <div v-if="errorMessage.length > 0" class="alert alert-danger mb-4" role="alert">
          {{ errorMessage }}
        </div>

        <div v-if="isSuccessful" class="alert alert-success mb-4" role="alert">
          Custom order request sent!
        </div>

        <form @submit.prevent="handleFormSubmit">

          <div class="mb-4">
            <h5 class="fw-bold mb-3">
              1. Choose your size
            </h5>
            <div class="form-floating">
              <select v-model="form.cake_size" class="form-select" :class="{ 'is-invalid': validation.cake_size.length > 0 }" :disabled="isSubmitting">
                <option value="8 inches">8" (8 inches)</option>
                <option value="6 inches">6" (6 inches)</option>
              </select>
              <label>Size</label>

              <small v-for="error in validation.cake_size" class="invalid-feedback">
                {{ error }}
              </small>
            </div>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold mb-3">2. Tell us about the order</h5>
            <div class="form-floating">
              <textarea v-model="form.cake_description" class="form-control" :class="{ 'is-invalid': validation.cake_description.length > 0 }" :disabled="isSubmitting" type="text" placeholder="" style="height: 100px;"></textarea>
              <label class="form-label">Describe your cake here</label>

              <small v-for="error in validation.cake_description" class="invalid-feedback">
                {{ error }}
              </small>
            </div>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold mb-2">
              3. Customer Details
            </h5>
            <p class="mb-4">
              We will use this to contact you.
            </p>
            <div class="form-floating mb-3">
              <input v-model="form.customer_name" type="text" class="form-control mb-2" :class="{ 'is-invalid': validation.customer_name.length > 0 }" :disabled="isSubmitting" placeholder="John Doe" aria-label="Name">
              <label class="form-label">Name</label>

              <small v-for="error in validation.customer_name" class="invalid-feedback">
                {{ error }}
              </small>
            </div>
            <div class="form-floating mb-3">
              <input v-model="form.customer_email" type="email" class="form-control mb-2" :class="{ 'is-invalid': validation.customer_email.length > 0 }" :disabled="isSubmitting" placeholder="John Doe" aria-label="Name">
              <label class="form-label">Email</label>

              <small v-for="error in validation.customer_email" class="invalid-feedback">
                {{ error }}
              </small>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <div class="input-group-text">+63</div>
                <div class="form-floating" :class="{ 'is-invalid': validation.customer_phone_number.length > 0 }">
                  <input v-model="form.customer_phone_number" type="text" class="form-control" :class="{ 'is-invalid': validation.customer_phone_number.length > 0 }" :disabled="isSubmitting" placeholder="e.g. 9123456789">
                  <label class="form-label">Phone Number</label>
                </div>
                <small v-for="error in validation.customer_phone_number" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>
            </div>
            <div class="form-floating">
              <div class="form-floating mb-3">
                <input v-model="form.customer_courier" class="form-control mb-2" :class="{ 'is-invalid': validation.customer_courier.length > 0 }" :disabled="isSubmitting" placeholder="John Doe" aria-label="Name">
                <label class="form-label">Your chosen courier</label>

                <small v-for="error in validation.customer_courier" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h5 class="fw-bold mb-3">4. Delivery Date and Time</h5>
            <div class="col">
              <div class="form-floating">
                <input v-model="form.delivery_datetime" class="form-control mb-2" :class="{ 'is-invalid': validation.delivery_datetime.length > 0 }" :disabled="isSubmitting" type="datetime-local" aria-label="DateTime">
                <label class="form-label">Choose your preferred date and time</label>

                <small v-for="error in validation.delivery_datetime" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>
            </div>
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
  //padding: 20px 40px 20px 40px;
}
</style>
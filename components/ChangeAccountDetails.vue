<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";
  import { useAuthStore } from "~/store/auth";
  import type { ApiResponse } from '~/types/ApiResponse';


  const { useToast } = Toast;
  const toast = useToast();

  const { customer } = storeToRefs(useAuthStore())

  const props = defineProps<{
    first_name: string
    last_name: string
  }>();

  const isSubmitting = ref(false);

  const first_name = toRef(props.first_name);
  const last_name = toRef(props.last_name);

  const validationErrors = reactive({
    first_name: [],
    last_name: []
  });

  const resetErrors = () => {
    validationErrors.first_name = [];
    validationErrors.last_name = [];
  }

  const handleFormSubmit = async () => {
    // Reset errors
    resetErrors();

    // Show loading indicator
    isSubmitting.value = true;

    // Handle form
    const { data: result, error } = await useFetchAPI<ApiResponse>('/account/change-account-details', {
      method: "PUT",
      body: {
        first_name: first_name.value,
        last_name: last_name.value
      }
    });

    if (result.value) {
      const payload = result.value.data;

      // Hide loading indicator
      isSubmitting.value = false;

      // Update auth store
      if (customer.value) {
        customer.value.first_name = payload.first_name;
        customer.value.last_name = payload.last_name;
      }

      // Show success message
      toast.success(result.value.metadata.message);
    }

    if (error.value) {
      // Hide loading indicator
      isSubmitting.value = false;

      // Handle errors
      const payload = error.value.data.errors;
      
      switch (error.value.statusCode) {
        case 422: // Form validation
          validationErrors.first_name = payload.first_name ?? [];
          validationErrors.last_name = payload.last_name ?? [];
          break;
        default:
          toast.error('Something went wrong with your request. Please try again later.');
      }
    }
  }
</script>

<template>
  <section class="reset">
    <form @submit.prevent="handleFormSubmit()">
      <div class="row">
        <div class="col-md-12 col-lg mb-4">
          <div class="form-floating">
            <input v-model="first_name"
                   type="text"
                   class="form-control"
                   :class="{ 'is-invalid': validationErrors.first_name.length > 0 }"
                   placeholder="First name"
                   :disabled="isSubmitting">
            <label class="form-label">First name</label>


            <small v-for="error in validationErrors.first_name" class="invalid-feedback">
              {{ error }}
            </small>
          </div>
        </div>
        <div class="col-md-12 col-lg mb-4">
          <div class="form-floating">
            <input v-model="last_name"
                   type="text"
                   class="form-control"
                   :class="{ 'is-invalid': validationErrors.last_name.length > 0 }"
                   placeholder="Last name"
                   :disabled="isSubmitting">
            <label class="form-label">Last name</label>

            <small v-for="error in validationErrors.last_name" class="invalid-feedback">
              {{ error }}
            </small>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-secondary">
        Submit changes
      </button>
    </form>
  </section>
</template>

<style scoped lang="scss">
// Reset into default because of white background
.form-control, .form-select {
  background-color: var(--bs-body-bg);
  border: var(--bs-border-width) solid var(--bs-border-color);
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

.form-floating > .form-control:focus ~ label::after, .form-floating > .form-control:not(:placeholder-shown) ~ label::after, .form-floating > .form-control-plaintext ~ label::after, .form-floating > .form-select ~ label::after {
  background-color: var(--bs-body-bg);
}
</style>
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
  <section class="card bg-primary text-white p-2 mt-4">
    <div class="card-body">
      <h5 class="fw-bold mb-4">Change Personal Information</h5>

      <form @submit.prevent="handleFormSubmit()">
        <div class="row">
          <div class="col-md-12 col-lg mb-4">
            <label class="form-label">First name</label>
            <input v-model="first_name" 
                   type="text" 
                   class="form-control" 
                   :class="{ 'is-invalid': validationErrors.first_name.length > 0 }"
                   placeholder="First name" 
                   :disabled="isSubmitting">

            <small v-for="error in validationErrors.first_name" class="invalid-feedback">
              {{ error }}
            </small>
          </div>
          <div class="col-md-12 col-lg mb-4">
            <label class="form-label">Last name</label>
            <input v-model="last_name" 
                   type="text" 
                   class="form-control" 
                   :class="{ 'is-invalid': validationErrors.last_name.length > 0 }"
                   placeholder="Last name" 
                   :disabled="isSubmitting">
            
            <small v-for="error in validationErrors.last_name" class="invalid-feedback">
              {{ error }}
            </small>
          </div>
        </div>

        <button type="submit" class="btn btn-secondary">
          Submit changes
        </button>
      </form>
    </div>
  </section>
</template>
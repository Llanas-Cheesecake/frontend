<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { ApiResponse } from "~/types/ApiResponse";
import type { Category } from "~/types/Category";

const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm', category: Category): void,
}>();

const errorMessage = ref('');

const form = reactive({
  name: ''
});

const validation = reactive({
  name: []
});

const isSubmitting = ref(false);

const handleSubmitForm = async () => {
  isSubmitting.value = true;

  const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/categories/create`, {
    method: 'POST',
    body: {
      name: form.name,
    }
  });

  if (results.value) {
    const payload = results.value.data;
    isSubmitting.value = false;

    emit('confirm', payload);
  }

  if (error.value) {
    isSubmitting.value = false;

    const payload = error.value.data.errors;

    switch (error.value.statusCode) {
      case 422:
        validation.name = payload.name || []
        break;
      default:
        console.debug(error.value);
        errorMessage.value = "Something went wrong while handling your request";
    }
  }
}

</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="p-2">

              <h5 class="fw-bold mb-3">
                Create Category
              </h5>

              <p class="mb-4">
                Fill in the form below to create a new category
              </p>

              <div v-if="errorMessage.length > 0" class="alert alert-danger my-4">
                {{ errorMessage }}
              </div>

              <div class="form-floating mb-4">
                <input v-model="form.name"
                       type="text"
                       class="form-control"
                       :class="{ 'is-invalid': validation.name.length > 0}"
                       placeholder="Category Name"
                       min="1"
                       :disabled="isSubmitting">
                <label>Category Name</label>

                <small v-for="error in validation.name" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>

              <div class="d-flex gap-2 mt-4">
                <button type="button" class="btn btn-primary" :disabled="isSubmitting" @click="handleSubmitForm">
                  <span>Create</span>
                  <LoadingIcon v-if="isSubmitting" class="ms-2" width="20" height="20" />
                </button>

                <button type="button" class="btn btn-secondary" :disabled="isSubmitting" @click="emit('cancel')">
                  Cancel
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">

</style>
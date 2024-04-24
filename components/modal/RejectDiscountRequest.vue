<script setup lang="ts">
  import { VueFinalModal } from "vue-final-modal";
  import type { ApiResponse } from "~/types/ApiResponse";

  interface DocumentVerification {
    id: number
    customer_id: number
    customer_name: string
    customer_email: string
    document_link: string
  }

  const props = defineProps<{
    document: DocumentVerification
  }>();

  const emit = defineEmits<{
    (e: 'cancel'): void,
    (e: 'confirm', id: number): void
  }>();

  const isSubmitting = ref(false);
  const reason = ref('');

  const validation = reactive({
    reason: []
  });

  // Generic error message
  const errorMessage = ref('');

  const handleRejection = async () => {
    isSubmitting.value = true;

    const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/customers/${ props.document.customer_id }/reject-discount-request`, {
      method: 'POST',
      body: {
        reason: reason.value
      }
    });

    if (results.value) {
      isSubmitting.value = false;
      emit('confirm', props.document.id);
    }

    if (error.value) {
      // Reset validation
      validation.reason = [];

      isSubmitting.value = false;

      const payload = error.value.data.errors;

      switch (error.value.statusCode) {
        case 422:
          validation.reason = payload.reason || [];
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

            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(220, 53, 69)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>

            <h5 class="fw-bold mb-2">
              Reject this request?
            </h5>
            <p>
              Any submitted documents will be deleted as compliance to data privacy laws.
            </p>


            <form>
              <div v-if="errorMessage.length > 0" class="alert alert-danger">
                {{ errorMessage }}
              </div>

              <div class="form-floating mb-3">
                <textarea v-model="reason"
                          class="form-control"
                          :class="{ 'is-invalid': validation.reason.length > 0 }"
                          :disabled="isSubmitting"
                          id="rejectionReason"
                          placeholder="Reason for rejection"
                          style="height: 100px">
                </textarea>
                <label for="rejectionReason">Reason for rejection</label>

                <small v-for="error in validation.reason" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>
            </form>

            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" :disabled="isSubmitting" @click="emit('cancel')">
                Cancel
              </button>
              <button type="button" class="btn btn-danger" :disabled="isSubmitting" @click="handleRejection">
                <span>Confirm</span>
                <LoadingIcon v-if="isSubmitting" color="white" width="20" height="20" class="ms-2 position-relative" style="top: -1px" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">
.icon {
  background-color: rgba(220, 53, 69, 0.2);
  box-shadow: 0 0 6px 4px rgba(220, 53, 69, 0.14);
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.6rem;

  svg {
    position: relative;
    top: -1px;
  }

}
</style>
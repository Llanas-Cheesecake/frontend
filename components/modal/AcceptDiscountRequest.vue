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

  const handleConfirmation = async () => {
    isSubmitting.value = true;

    const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/customers/${ props.document.customer_id }/accept-discount-request`, {
      method: 'POST'
    });

    if (results.value) {
      isSubmitting.value = false;
      emit('confirm', props.document.id);
    }

    if (error.value) {
      isSubmitting.value = false;
      console.error(error.value)
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="top: -1px;" viewBox="0 0 24 24" fill="none" stroke="rgb(25, 135, 84)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check position-relative">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h5 class="fw-bold mb-3">
              Accept this request?
            </h5>
            <p>
              This will give 20% discount to the customer and any submitted documents will be deleted as compliance to data privacy laws.
            </p>

            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" :disabled="isSubmitting" @click="emit('cancel')">
                Cancel
              </button>
              <button type="button" class="btn btn-success" :disabled="isSubmitting" @click="handleConfirmation">
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
    background-color: rgba(25, 135, 84, 0.2);
    box-shadow: 0 0 6px 4px rgba(25, 135, 84, 0.2);
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
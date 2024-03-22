<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

const props = defineProps<{
  payment_id: string
}>();

const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm', order_id: number): void
}>();

const isProcessing = ref(false);
const form = reactive({
  reason: 'requested_by_customer',
  notes: ''
})

const confirmRefund = async () => {
  isProcessing.value = true;

  // const { data: result, error } = await useFetchAPI(`/admin/products/${props.product.product_id}/delete`, {
  //   method: "DELETE"
  // })
  //
  // if (result.value) {
  //   isDeleting.value = false;
  //   emit('confirm', props.product.product_id)
  // }
  //
  // if (error.value) {
  //   isDeleting.value = false;
  //
  //   // TODO: Handle errors
  // }
}
</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(220, 53, 69)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            <h5 class="fw-bold mb-2">
              Refund this order?
            </h5>
            <p>This action is irreversible. PayMongo will handle the refund request</p>

            <div class="form-floating mb-4">
              <select v-model="form.reason" id="refund-reason" class="form-select" aria-label="Refund reason">
                <option value="requested_by_customer">
                  Requested by the customer
                </option>
                <option value="duplicate">
                  Duplicate order
                </option>
                <option value="fraudulent">
                  Fraudulent payment
                </option>
                <option value="others">
                  Others
                </option>
              </select>
              <label for="refund-reason">Reason</label>
            </div>

            <div class="form-floating">
              <textarea class="form-control" placeholder="Describe this refund..." id="refund-notes" style="height: 100px;"></textarea>
              <label for="refund-notes">Notes (optional)</label>
            </div>


            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" :disabled="isProcessing" @click="emit('cancel')">
                Cancel
              </button>
              <button type="button" class="btn btn-danger" :disabled="isProcessing" @click="confirmRefund">
                <span>Confirm</span>
                <LoadingIcon v-if="isProcessing" color="white" width="20" height="20" class="ms-2 position-relative" style="top: -1px" />
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
<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

const props = defineProps<{
  order_id: string
  currentStatus: string
}>();

const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'change', newDeliveryStatus: string): void
}>();

const isProcessing = ref(false);
const selectedStatus = ref(props.currentStatus);

const changeDeliveryStatus = async () => {
  isProcessing.value = true;

  const { data: result, error } = await useFetchAPI(`/admin/orders/${props.order_id}/update-delivery`, {
    method: "POST",
    body: {
      "_method": "PUT",
      "status": selectedStatus.value
    }
  })

  if (result.value) {
    isProcessing.value = false;
    emit('change', selectedStatus.value)
  }

  if (error.value) {
    isProcessing.value = false;

    // TODO: Handle errors
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-truck">
                <rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>

            <h5 class="fw-bold mb-2">
              Change pickup status
            </h5>
            <p class="mb-4">Select updated status for this order</p>

            <select v-model="selectedStatus" class="form-select" aria-label="Delivery Status">
              <option value="UNFULFILLED">
                Confirmed
              </option>
              <option value="ON_GOING">
                Ready for pick-up
              </option>
              <option value="DELIVERED">
                Picked up
              </option>
            </select>

            <div v-if="selectedStatus === 'ON_GOING'" class="alert alert-info mt-4">
              This option will send a text message to the customer notifying them.
            </div>

            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" :disabled="isProcessing" @click="emit('cancel')">
                Cancel
              </button>
              <button type="button" class="btn btn-success" :disabled="isProcessing" @click="changeDeliveryStatus">
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
  background-color: rgba(111, 111, 111, 0.2);
  box-shadow: 0 0 6px 4px rgba(1, 1, 1, 0.14);
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
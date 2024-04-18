<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";

const emit = defineEmits<{
  (e: 'cancel'): void
}>();
</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="p-2">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
                  <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>

              <h5 class="fw-bold mb-3">
                PayMaya & GrabPay Unavailable
              </h5>

              <p class="mb-3">
                Our payment provider, <span class="fw-bold">PayMongo</span>, cannot provide partial refunds for these
                payment methods. Which is required for us to refund the 20% discount for eligible customers.
              </p>

              <p class="mb-4">
                You can still pay using GCash or through Card.
              </p>

              <button type="button" class="btn btn-primary" @click="emit('cancel')">
                OK
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
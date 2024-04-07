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

            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>

            <div class="mb-4">
              <h5 class="fw-bold mb-3">
                Forget Password
              </h5>

              <p>To reset your account's password, run the following command from your hosting provider's shell access:</p>

              <code>php artisan admin:update-password</code>
            </div>



            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" @click="emit('cancel')">
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
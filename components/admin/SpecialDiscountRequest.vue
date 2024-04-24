<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import { ModalAcceptDiscountRequest, ModalRejectDiscountRequest } from "#components";

  interface DocumentVerification {
    id: number
    customer_id: number
    customer_name: string
    customer_email: string
    document_link: string
  }

  const emit = defineEmits<{
    (e: 'remove-document', id: number): void
  }>()

  const props = defineProps<{
    document: DocumentVerification
  }>();

  const acceptModal = useModal({
    component: ModalAcceptDiscountRequest,
    attrs: {
      document: props.document,
      onCancel() {
        acceptModal.close();
      },
      onConfirm() {
        emit('remove-document', props.document.customer_id)
        acceptModal.close();
      }
    }
  });

  const rejectModal = useModal({
    component: ModalRejectDiscountRequest,
    attrs: {
      document: props.document,
      onCancel() {
        rejectModal.close();
      },
      onConfirm() {
        emit('remove-document', props.document.customer_id)
        rejectModal.close();
      }
    }
  });
</script>

<template>
  <td>
    {{ document.customer_name }}
  </td>
  <td>
    {{ document.customer_email }}
  </td>
  <td>
    <nuxt-link :to="document.document_link" target="_blank" class="btn btn-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="top: -1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye position-relative">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
      </svg>
      <span class="d-none d-lg-inline ms-1">
        View Document
      </span>
    </nuxt-link>
  </td>
  <td>
    <div class="d-flex gap-2">
      <button class="btn btn-success" @click="acceptModal.open()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="top: -1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check position-relative">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="d-none d-lg-inline ms-1">
          Accept
        </span>
      </button>
      <button class="btn btn-danger" @click="rejectModal.open()">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style="top: -1px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x position-relative">
          <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span class="d-none d-lg-inline ms-1">
          Reject
        </span>
      </button>
    </div>
  </td>
</template>

<style scoped lang="scss">

</style>
<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import type { ProductRating } from "~/types/Product";

  const props = defineProps<{
    rating: ProductRating
  }>();

  const emit = defineEmits<{
    (e: 'cancel'): void,
    (e: 'confirm', rating_id: number): void
  }>();

  console.log(props.rating)

  const isDeleting = ref(false);

  const confirmDelete = async () => {
    isDeleting.value = true;

    const { data: result, error } = await useFetchAPI(`/admin/reviews/${props.rating.rating_id}/delete`, {
      method: "DELETE"
    })

    if (result.value) {
      isDeleting.value = false;
      emit('confirm', props.rating.rating_id as number)
    }

    if (error.value) {
      isDeleting.value = false;

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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(220, 53, 69)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            <h5 class="fw-bold mb-2">
              Delete review?
            </h5>
            <p>Are you sure you want to delete this product? This action is irreversible.</p>

            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" :disabled="isDeleting" @click="emit('cancel')">
                Cancel
              </button>
              <button type="button" class="btn btn-danger" :disabled="isDeleting" @click="confirmDelete">
                <span>Confirm</span>
                <LoadingIcon v-if="isDeleting" color="white" class="ms-2 position-relative" style="top: -1px" />
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
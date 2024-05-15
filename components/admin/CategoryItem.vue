<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import { ModalDeleteCategory } from "#components";
  import type { Category } from "~/types/Category";

  const props = defineProps<{
    category: Category
  }>();

  const emit = defineEmits<{
    (e: 'deleteCategory', category_id: number): void
  }>()

  const deleteModal = useModal({
    component: ModalDeleteCategory,
    attrs: {
      category: props.category,
      onCancel() {
        deleteModal.close()
      },
      onConfirm(category_id: number) {
        // Remove the category from the list
        emit('deleteCategory', category_id);

        deleteModal.close();
      }
    }
  });
</script>

<template>
  <p class="mb-0">
    {{ category.name }}
  </p>

  <button type="button" class="btn btn-action" @click="deleteModal.open()">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
      <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  </button>
</template>

<style scoped lang="scss">

</style>
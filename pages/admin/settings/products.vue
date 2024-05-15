<script setup lang="ts">
  import { ModalCreateCategory } from "#components";
  import { useModal } from "vue-final-modal";
  import type { Category } from "~/types/Category";
  import type {ApiResponse} from "~/types/ApiResponse";

  const categories = ref<Category[]>([])

  const { data: result } = await useFetchAPI<ApiResponse>('/categories', {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data

    payload.map((item: Category) => categories.value.push(item))
  }

  const createCategoryModal = useModal({
    component: ModalCreateCategory,
    attrs: {
      onCancel() {
        createCategoryModal.close()
      },
      onConfirm(category: Category) {
        categories.value.push(category)
        createCategoryModal.close()
      }
    }
  })

  const handleDeleteCategory = (category_id: number) => {
    categories.value = categories.value.filter((item) => {
      return item.category_id !== category_id;
    });
  }
</script>

<template>
  <div class="d-flex align-items-center justify-content-between mb-5">
    <h4 class="fw-bold mb-0">
      Product Settings
    </h4>
  </div>

  <div class="d-flex flex-column flex-lg-row gap-0 flex-50 gap-lg-5">
    <div class="mb-5">
      <h5 class="fw-bold">
        Categories
      </h5>

      <p class="mb-3">
        Here you can manage the categories of your products
      </p>

      <button type="button" class="btn btn-outline-primary" @click="createCategoryModal.open()">
        Add Category
      </button>
    </div>
    <div>
      <AdminCategoryList :categories="categories" @delete-category="handleDeleteCategory" />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .flex-50 > div {
    flex: 1 1 calc(50% - 1rem);
  }
</style>
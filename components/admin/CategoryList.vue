<script setup lang="ts">
  import type { Category } from "~/types/Category";

  const props = defineProps<{
    categories: Category[]
  }>();

  const emit = defineEmits<{
    (e: 'deleteCategory', category_id: number): void
  }>();

  const handleDeleteCategory = (category_id: number) => {
    emit('deleteCategory', category_id);
  }
</script>

<template>
  <ul class="categories">
    <li v-for="category in categories" class="d-flex align-items-center justify-content-between">
      <AdminCategoryItem :category="category" @delete-category="handleDeleteCategory" />
    </li>
  </ul>
</template>

<style scoped lang="scss">
  .categories {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding: 10px 15px;
      border-radius: 5px;
      background-color: var(--bg-secondary);
      margin-bottom: 10px;
    }
  }
</style>
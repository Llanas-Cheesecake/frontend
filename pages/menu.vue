<script setup lang="ts">
import type { ApiResponse } from "~/types/ApiResponse";
import type { Category } from "~/types/Category";

definePageMeta({
  title: 'Menu',
  meta: [
    { name: 'description', content: `Llana's Cheesecake offers a wide variety of pastry` } // TODO: SEO Management
  ]
});

const categories = reactive<Category[]>([])

const { data } = await useFetchAPI<ApiResponse>('/categories', { method: "GET" })

if (data.value) {
  // @ts-ignore
  const result = data.value.data

  result.map((item: Category) => categories.push(item))
}
</script>

<template>
  <div class="my-5">
    <div class="row">
      <div class="d-none d-md-block col-md-4 col-lg-3">

        <div class="sidebar bg-primary p-3">
          <h5>Categories</h5>
          <ul class="nav flex-column">
            <li class="nav-item">
              <nuxt-link to="/menu/all" class="nav-link">All items</nuxt-link>
            </li>
            <li v-for="category in categories" class="nav-item">
              <nuxt-link :to="`/menu/${ category.slug }`" class="nav-link">{{ category.name }}</nuxt-link>
            </li>
          </ul>
        </div>

      </div>
      <div class="col-sm-12 col-md-8 col-lg-9">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  border-radius: 8px;
  h5 {
    color: var(--color-text-primary);
    margin-bottom: 1rem;
    font-weight: bold;
  }
  .nav {
    .nav-item {
      .nav-link {
        background-color: color-mix(in srgb,var(--bg-primary), #000 15%);
        color: var(--color-text-primary);
        border-radius: 8px;
        &.router-link-exact-active {
          background-color: color-mix(in srgb,var(--bg-primary), #000 25%);
        }
      }
      margin-bottom: 1rem;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
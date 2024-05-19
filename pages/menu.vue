<script setup lang="ts">
import type { ApiResponse } from "~/types/ApiResponse";
import type { Category } from "~/types/Category";
import AltNavbar from "~/components/AltNavbar.vue";

definePageMeta({
  title: 'Menu',
  meta: [
    { name: 'description', content: `Llana's Cheesecake offers a wide variety of pastry` } // TODO: SEO Management
  ],
  middleware: ['menu-redirect']
});

const route = useRoute();
const categories = reactive<Category[]>([])

const { data } = await useFetchAPI<ApiResponse>('/categories', { method: "GET" })

if (data.value) {
  const result = data.value.data

  result.map((item: Category) => categories.push(item))
}

const currentCategory = computed(() => {
  const selected = categories.find((category) => category.slug == route.params.slug);

  if (!selected) return "All items"
  return selected.name;
})

onMounted(() => {
  currentCategory.value
})

</script>

<template>
  <client-only>
    <Teleport to="#alt-nav">
      <AltNavbar :current-category="currentCategory" />
    </Teleport>
    <Teleport to="#offcanvas-section">
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-body">
          <div class="sidebar">
            <ul class="nav flex-column">
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link to="/menu/all" class="nav-link">All items</nuxt-link>
              </li>
              <li v-for="category in categories" class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link :to="`/menu/${ category.slug }`" class="nav-link">{{ category.name }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </client-only>

  <section>
    <div class="my-3 my-md-5">
      <div class="row">
        <div class="d-none d-md-block col-md-4 col-lg-3">

          <div class="sidebar p-3">
            <h3 class="text-heading">Categories</h3>
            <ul class="nav flex-column">
              <li class="nav-item">
                <nuxt-link to="/menu/all" class="nav-link">All items</nuxt-link>
              </li>
              <li v-for="category in categories" class="nav-item">
                <nuxt-link :to="`/menu/${ category.slug }`" class="nav-link">{{ category.name }}</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="card custom-order-card p-2 mt-4">
            <div class="card-body">
              <p>Need a custom cake? You may contact us using this form!</p>
              <nuxt-link to="/custom-order" class="btn btn-secondary">
                Click here
              </nuxt-link>
            </div>
          </div>

        </div>
        <div class="col-sm-12 col-md-8 col-lg-9">
          <NuxtPage />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.custom-order-card {
  background-color: var(--bg-primary);
  border-radius: 8px;
  color: var(--color-text-primary);
}
</style>
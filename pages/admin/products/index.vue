<script setup lang="ts">
  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })

  const tableComponentKey = ref(0);
  const searchKeyword = ref('');

  const handleSubmitSearch = async () => {
    tableComponentKey.value = tableComponentKey.value + 1;
  }

</script>

<template>
  <section class="dashboard">

    <div class="card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <h5 class="fw-bold mb-0 flex-fill">
            Products
          </h5>

          <form class="d-none d-sm-block" @submit.prevent="handleSubmitSearch">
            <div class="input-group">
              <span class="input-group-text">
                <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
              </span>
              <input v-model="searchKeyword" type="text" class="form-control" placeholder="Search Products..." aria-label="Search products">
              <button type="submit" class="d-none">
                Submit
              </button>
            </div>
          </form>

          <nuxt-link to="/admin/products/create" class="btn btn-primary">
            New Product
          </nuxt-link>
        </div>

        <form class="d-block d-sm-none mt-4" @submit.prevent="handleSubmitSearch">
          <div class="input-group mobile">
              <span class="input-group-text">
                <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
              </span>
            <input v-model="searchKeyword" type="text" class="form-control" placeholder="Search Products..." aria-label="Search products">
            <button type="submit" class="btn btn-outline-primary">
              Search
            </button>
          </div>
        </form>

      </div>
    </div>

    <ClientOnly>
      <Suspense timeout="0">
        <AdminProductsTable :key="tableComponentKey" :search-keyword="searchKeyword" />

        <template #fallback>
          <AdminSkeletonTable />
        </template>
      </Suspense>
    </ClientOnly>

  </section>
</template>

<style scoped lang="scss">
  .input-group {
    width: auto;
    &.mobile .form-control {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
    .input-group-text {
      background-color: var(--bg-secondary);
      border-width: 2px;
      border-right-width: 0;
      border-radius: 8px;
    }
    .form-control {
      border-left: 0;
      padding-left: 0;
      border-top-right-radius: 8px!important;
      border-bottom-right-radius: 8px!important;
    }
  }
</style>
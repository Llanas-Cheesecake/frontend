<script setup lang="ts">
  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })

  const tableComponentKey = ref(1);
  const searchKeyword = ref('');
  const itemsPerPage = ref('10');

  const isRotating = ref(false);

  // Rotate refresh icon
  const refreshTable = () => {
    refreshComponent()

    isRotating.value = true;

    setTimeout(() => isRotating.value = false, 500);
  }

  const refreshComponent = () => {
    tableComponentKey.value = tableComponentKey.value + 1;
  }
</script>

<template>
  <section class="dashboard">
    <!-- Header -->
    <div class="header card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <h5 class="fw-bold mb-0 flex-fill">
            Orders
          </h5>

          <!-- Actions -->

          <!-- Search -->
          <form @submit.prevent="refreshComponent">
            <div class="input-group">
              <span class="input-group-text">
                <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
              </span>
              <input v-model="searchKeyword" type="text" class="form-control" placeholder="Search Orders..." aria-label="Search products">
              <button type="submit" class="d-none">
                Submit
              </button>
            </div>
          </form>
          <!-- END Search -->

          <!-- Refresh -->
          <button class="btn btn-outline-primary align-self-stretch" v-tooltip="'Refresh'" @click="refreshTable">
            <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate': isRotating }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw">
              <polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
          <!-- END Refresh -->

          <!-- Separator -->
          <div style="border-right: 1px solid rgba(0,0,0,0.4); width: 1px; height: 20px"></div>
          <!-- END Separator -->

          <!-- Items per page -->
          <select v-model="itemsPerPage" class="form-select w-auto" aria-label="Items per page" @change="refreshComponent">
            <option selected value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
          <!-- END Items per page -->

          <!-- Export Data -->
          <div class="dropdown">
            <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download position-relative">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span class="ms-2">Export</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a class="dropdown-item" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-printer position-relative">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  <span class="ms-2">Print</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file position-relative">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                  <span class="ms-2">CSV</span>
                </a>
              </li>
            </ul>
          </div>
          <!-- END Export Data -->

          <!-- END Actions -->
        </div>
      </div>
    </div>
    <!-- END Header -->

    <client-only>
      <Suspense timeout="0">
        <LazyAdminOrdersTable :key="tableComponentKey" :search-keyword="searchKeyword" :items-per-page="itemsPerPage"  />

        <template #fallback>
          <AdminSkeletonTable />
        </template>
      </Suspense>
    </client-only>

  </section>
</template>

<style scoped lang="scss">
  .header.card {
    .btn.btn-outline-primary {
      display: inline-flex;
      align-items: center;
    }
  }

  .input-group {
    width: auto;
    .input-group-text {
      background-color: var(--bg-secondary);
      border-width: 2px;
      border-right-width: 0;
      border-radius: 8px;
    }
    .form-control {
      border-left: 0;
      border-top-right-radius: 8px!important;
      border-bottom-right-radius: 8px!important;
      padding-left: 0;
    }
  }

  .rotate {
    animation: rotate 0.5s ease-in-out;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
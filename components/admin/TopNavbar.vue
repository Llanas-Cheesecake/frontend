<script setup lang="ts">
  const route = useRoute();

  const currentPage = computed(() => {
    switch (route.name) {
      case "admin-dashboard":
        return "Dashboard";
      case "admin-products":
        return "Dashboard / Products";
      case "admin-products-create":
        return "Dashboard / Products / New";
      case "admin-products-edit":
        return "Dashboard / Products / Edit"; // Should be product name
      case "admin-orders":
        return "Dashboard / Orders";
      case "admin-customers":
        return "Dashboard / Customers";
    }
  })
</script>

<template>
  <div class="card px-2">
    <div class="card-body d-flex align-items-center">
      <p class="mb-0 flex-fill">
        {{ currentPage }}
      </p>
      <div class="user-actions">
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Account Name
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    border-radius: 12px;
  }
</style>
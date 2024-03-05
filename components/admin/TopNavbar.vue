<script setup lang="ts">
  import {useAuthStore} from "~/store/auth";

  const auth = useAuthStore();
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

  const handleLogout = () => {
    auth.logout().then(() => {
      location.href = '/admin/login'
    })
  }
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
            {{ auth._administrator.full_name }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center" @click="handleLogout">
                <img src="/icons/log-out.svg" alt="Logout" />
                <span class="ms-2">Logout</span>
              </button>
            </li>
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
<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  import SideNavbarMobile from "~/components/admin/SideNavbarMobile.vue";

  const auth = useAuthStore();
  const route = useRoute();

  const isSidebarOpen = ref(false);

  const routeProductName = useState('routeProductName');
  const routeOrderId = useState('routeOrderId');

  const currentPage = computed(() => {
    switch (route.name) {
      case "admin-dashboard":
        return "Dashboard";
      case "admin-products":
        return "Dashboard / Products";
      case "admin-products-create":
        return "Dashboard / Products / New";
      case "admin-products-slug":
        return `Dashboard / Products / ${routeProductName.value}`
      case "admin-products-slug-edit":
        return `Dashboard / Products / ${routeProductName.value} / Edit`;
      case "admin-orders":
        return "Dashboard / Orders";
      case "admin-orders-slug":
        return `Dashboard / Orders / #${routeOrderId.value}`
      case "admin-customers":
        return "Dashboard / Customers";
      case "admin-settings":
        return "Dashboard / Settings";
      case "admin-settings-site-settings":
        return "Dashboard / Settings / Site Settings";
      case "admin-settings-promotions":
        return "Dashboard / Settings / Promotions";
      case "admin-settings-account":
        return "Dashboard / Settings / Account Settings";
      case "admin-settings-products":
        return "Dashboard / Settings / Product Settings";
    }
  })

  const handleLogout = () => {
    auth.logout().then(() => {
      location.href = '/admin/login'
    })
  }

  const toggleMobileNav = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }
</script>

<template>
  <div class="card px-2 d-print-none">
    <div class="card-body d-flex align-items-center gap-3">
      <div class="cursor-pointer d-block d-lg-none" @click="toggleMobileNav">
        <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px;" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu position-relative">
          <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
      <ClientOnly>
        <p class="mb-0 flex-fill text-truncate">
          {{ currentPage }}
        </p>
      </ClientOnly>
      <div class="user-actions">
        <ClientOnly>
          <LazyAdminNotificationDropdown />
        </ClientOnly>
        <div class="dropdown">
          <button class="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {{ auth._administrator?.full_name }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <nuxt-link to="/admin/settings/account" class="dropdown-item d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="ms-2">Account Settings</span>
              </nuxt-link>
            </li>
            <li>
              <button type="button" class="dropdown-item d-flex align-items-center" @click="handleLogout">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span class="ms-2">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <SideNavbarMobile :is-open="isSidebarOpen" @close-sidebar="toggleMobileNav" />
</template>

<style scoped lang="scss">
  .card {
    border-radius: 12px;
  }
  .user-actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
</style>
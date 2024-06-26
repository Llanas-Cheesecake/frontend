<script setup lang="ts">
  definePageMeta({
    middleware: ['authenticated-admin', 'settings-redirect'],
    layout: 'admin'
  });

  const route = useRoute();

  const showMobileNav = ref(false);

  const currentRouteName = computed(() => {
    switch (route.name) {
      case "admin-settings-site-settings":
        return "Site Settings";
      case "admin-settings-promotions":
        return "Promotions";
      default:
        return "Settings"
    }
  });

  const toggleMobileNav = () => {
    showMobileNav.value = !showMobileNav.value;
  }
</script>

<template>
  <div class="settings-nav card p-2 d-block d-md-none" :class="{ show: showMobileNav }">
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between mb-4">
        <p class="fw-bold mb-0">
          {{ currentRouteName }}
        </p>

        <div class="cursor-pointer" @click="toggleMobileNav">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu">
            <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>
      </div>

      <ul class="nav nav-pills mobile flex-column">
        <li class="nav-item">
          <nuxt-link to="/admin/settings/site-settings" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tablet position-relative">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
            </svg>
            <span class="ms-2">Site Settings</span>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/admin/settings/promotions" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image position-relative">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span class="ms-2">Promotions</span>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/admin/settings/products" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag position-relative">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span class="ms-2">Product Settings</span>
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/admin/settings/account" class="nav-link">
            <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user position-relative">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="ms-2">Account Settings</span>
          </nuxt-link>
        </li>
      </ul>

    </div>
  </div>

  <div class="card px-2 py-3 flex-fill">
    <div class="card-body d-flex flex-column">

      <div class="row flex-fill">
        <div class="d-none d-md-block col-md-4 col-lg-3">
          <ul class="nav nav-pills desktop flex-column h-100">
            <li class="nav-item">
              <nuxt-link to="/admin/settings/site-settings" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-tablet position-relative">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <span class="ms-2">Site Settings</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/settings/promotions" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image position-relative">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span class="ms-2">Promotions</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/settings/products" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag position-relative">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span class="ms-2">Product Settings</span>
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link to="/admin/settings/account" class="nav-link">
                <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user position-relative">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="ms-2">Account Settings</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-sm-12 col-md-8 col-lg-9">
          <NuxtPage />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .settings-nav {
    overflow-y: hidden;
    height: 100%;
    max-height: 76px;
    &.show {
      max-height: 100%;
    }
  }

  .nav.nav-pills {
    &.desktop {
      border-right: 1px solid rgba(0,0,0,0.1);
      padding-right: 1.5rem;
    }
    &.mobile {

    }
    .nav-item {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
      .nav-link {
        border-radius: 12px;
        padding: 1rem;
        &.router-link-exact-active {
          background-color: var(--bg-tertiary);
          color: var(--color-text-secondary);
        }
      }
    }
  }

</style>
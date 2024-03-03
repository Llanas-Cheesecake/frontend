<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";

  const { $auth } = useNuxtApp();
  const auth = useAuthStore();
  const route = useRoute();

  const isSidebarOpen = ref(false)

  const currentUserName = computed(() => {
    return `${auth.user?.first_name} ${auth.user?.last_name}`
  })

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  // When route changes, close the sidebar
  watch(() => route.path,() => {
    isSidebarOpen.value = false
  })

  const logoutUser = () => {
    auth.logout()
      .then(() => {
        location.href = '/'
      })
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">

    <!-- Centered Links -->
    <div class="nav-links d-none d-md-block">

      <ul class="navbar-nav nav-centered">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/menu/all" class="nav-link">Menu</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/about" class="nav-link">About</nuxt-link>
        </li>
      </ul>

    </div>
    <!-- END Centered Links -->

    <!-- Logo and Action Links -->
    <div class="container">

      <a class="navbar-brand d-flex align-items-center gap-2" href="#">
        <img src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />
        <span class="text-white fw-bold">Llana's Cheesecake</span>
      </a>

      <div class="ms-auto cursor-pointer d-block d-md-none" @click="toggleSidebar">
        <img v-show="!isSidebarOpen" src="/icons/menu.svg" alt="Menu Icon" />
        <img v-show="isSidebarOpen" src="/icons/arrow-left.svg" alt="Back Icon" />
      </div>

      <div class="nav-links-alt me-auto">
        <div class="d-flex align-items-center">
          <div class="nav-item">
            <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          </div>
          <div class="nav-item">
            <nuxt-link to="/menu/all" class="nav-link">Menu</nuxt-link>
          </div>
          <div class="nav-item">
            <nuxt-link to="/about" class="nav-link">About</nuxt-link>
          </div>
        </div>
      </div>

      <div class="d-none d-md-block" style="z-index: 100;">

        <div class="d-flex align-items-center ms-auto w-auto">
          <!-- Cart Dropdown -->
          <CartDropdown />
          <!-- END Cart Dropdown -->

          <div v-if="$auth.isLoggedIn()" class="nav-item dropdown d-inline-block px-3">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown">
              <img src="/icons/user-white.svg" alt="User" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end mt-2">
              <li>
                <h6 class="dropdown-header">
                  <span>{{ currentUserName }}</span>
                </h6>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <nuxt-link to="/account/general" class="dropdown-item d-flex align-items-center">
                  <img src="/icons/user-black.svg" alt="User Icon" width="22" />
                  <span class="ms-2 fs-6">Account Settings</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/account/order-history" class="dropdown-item d-flex align-items-center">
                  <img src="/icons/shopping-bag-black.svg" alt="Order History" />
                  <span class="ms-2 fs-6">Order History</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/account/wishlist" class="dropdown-item d-flex align-items-center">
                  <img src="/icons/star-black.svg" alt="Wishlist" />
                  <span class="ms-2">My Wishlist</span>
                </nuxt-link>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <button type="button" class="dropdown-item d-flex align-items-center" @click="logoutUser">
                  <img src="/icons/log-out.svg" alt="Logout" />
                  <span class="ms-2">Logout</span>
                </button>
              </li>
            </ul>
          </div>

          <div v-else class="d-flex gap-2" style="z-index: 100;">
            <nuxt-link to="/login" class="btn btn-primary ms-3">
              Login
            </nuxt-link>
            <nuxt-link to="/register" class="btn btn-secondary">
              Register
            </nuxt-link>
          </div>
        </div>

      </div>

    </div>
    <!-- END Logo and Action Links -->

    <!-- Sidebar -->
    <div class="nav-sidebar" :class="{ 'show': isSidebarOpen }">
      <div class="container">
        <div class="nav-items">
          <nuxt-link class="nav-link" to="/">
            <img src="/icons/home-white.svg" width="20" height="20" alt="Home Icon"/>
            <span>Home</span>
          </nuxt-link>

          <nuxt-link class="nav-link" to="/menu/all">
            <img src="/icons/tag.svg" width="20" height="20" alt="Home Icon"/>
            <span>Menu</span>
          </nuxt-link>

          <nuxt-link class="nav-link" to="/about">
            <img src="/icons/info.svg" width="20" height="20" alt="Home Icon"/>
            <span>About</span>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- END Sidebar -->
  </nav>
</template>

<style scoped lang="scss">
  .navbar {
    background-color: var(--bg-primary)!important;
    min-height: 76px;

    .dropdown-menu {
      min-width: 15rem;
    }

    .navbar-brand img {
      width: 50px;
    }

    .ms-auto .nav-item:last-child {
      padding-right: 0!important;
    }

    .nav-links {
      position: absolute;
      min-height: 40px;
      width: 100%;
      z-index: 99;
    }

    .nav-links-alt {
      display: none;
    }

    .nav-item {
      padding: 0 1.5rem;
      //&:first-child {
      //  padding-left: 0!important;
      //}
      .nav-link {
        color: var(--color-text-primary)!important;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 4px;

        &.router-link-active {
          background-color: var(--color-text-primary);
          color: var(--bg-primary)!important;
          font-weight: bold;
        }

        &.disabled {
          color: var(--color-text-disabled)!important;
        }
      }
    }

    .nav-sidebar {
      position: absolute;
      top: 76px;
      width: 100%;
      height: calc(100vh - 76px);
      background-color: var(--bg-primary);
      z-index: 99;
      right: 100%;
      transition: 0.2s;
      &.show {
        right: 0;
      }
      .nav-items {
        padding: 0;
        margin-bottom: 0;
        .nav-link {
          background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
          border-radius: 8px;
          padding: 0.7rem 0.7rem;
          margin-bottom: 1rem;

          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: var(--color-text-primary);
          &.router-link-active {
            background-color: color-mix(in srgb, var(--bg-primary), #000 35%);
          }
        }
      }
    }

    .nav-centered {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

  }

  @media print, screen and (min-width: 768px) and (max-width: 991px) {
    .navbar-brand span, .nav-links {
      display: none!important;
    }

    .nav-links-alt {
      display: block!important;
    }

    .nav-links-alt .nav-item {
      padding: 0 1rem!important;
    }
  }
</style>

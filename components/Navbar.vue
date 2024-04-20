<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";

  const props = defineProps<{
    isSticking: boolean
  }>()

  const auth = useAuthStore();
  const route = useRoute();

  const isSidebarOpen = ref(false);
  const isAccountDropdownOpen = ref(false);

  const currentUserName = computed(() => {
    return `${auth._customer?.first_name} ${auth._customer?.last_name}`
  })

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const toggleAccountDropdown = () => {
    isAccountDropdownOpen.value = !isAccountDropdownOpen.value;
  }

  // When route changes, close the sidebar
  watch(() => route.path,() => {
    isSidebarOpen.value = false
  });

  const logoutUser = () => {
    auth.logout()
      .then(() => {
        location.href = '/'
      })
  }
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" :class="{ 'fixed': isSidebarOpen || props.isSticking }">

    <!-- Centered Links -->
    <div class="nav-links d-none d-md-block">

      <ul class="navbar-nav nav-centered">
        <li class="nav-item">
          <nuxt-link to="/" class="nav-link">Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/menu" class="nav-link">Menu</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link to="/about" class="nav-link">About</nuxt-link>
        </li>
      </ul>

    </div>
    <!-- END Centered Links -->

    <!-- Logo and Action Links -->
    <div class="container">

      <nuxt-link to="/" class="navbar-brand d-flex align-items-center gap-2">
        <LazyLogo />
<!--        <img src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />-->
        <span>Llana's Cheesecake</span>
      </nuxt-link>

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
            <nuxt-link to="/menu" class="nav-link">Menu</nuxt-link>
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

          <div v-if="auth._isAuthenticated" class="nav-item dropdown d-inline-block px-3">
            <a class="btn btn-secondary" href="#" role="button" data-bs-toggle="dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="top: -2px;" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user position-relative">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              </svg>
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
            <nuxt-link to="/login" class="btn btn-secondary ms-3">
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

        <div class="nav-items d-flex gap-3">
          <nuxt-link class="nav-link" to="/cart">
            <img src="/icons/shopping-cart-white.svg" width="20" height="20" alt="Cart Icon"/>
            <span>Cart</span>
          </nuxt-link>

          <div class="nav-link" @click="toggleAccountDropdown">
            <img src="/icons/user-white.svg" width="20" height="20" alt="User Icon"/>
            <p v-if="!auth._isAuthenticated" class="mb-0 flex-fill">
              Guest
            </p>
            <p v-else class="mb-0 flex-fill">
              {{ currentUserName }}
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" v-if="!isAccountDropdownOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </div>
        </div>

        <!-- Account Links -->
        <div class="nav-account" :class="{ show: isAccountDropdownOpen }">
          <!-- Not Logged-in -->
          <div v-if="!auth._isAuthenticated" class="nav-items">
            <nuxt-link class="nav-link" to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Login</span>
            </nuxt-link>

            <nuxt-link class="nav-link" to="/register">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span>Register</span>
            </nuxt-link>
          </div>
          <!-- END Not Logged-in -->

          <!-- Logged-in -->
          <div v-else class="nav-items">
            <nuxt-link class="nav-link" to="/account/general">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Account Settings</span>
            </nuxt-link>

            <nuxt-link class="nav-link" to="/account/order-history">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>Order History</span>
            </nuxt-link>

            <nuxt-link class="nav-link" to="/account/wishlist">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>Wishlist</span>
            </nuxt-link>

            <div class="nav-link" @click="logoutUser">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-in">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span>Logout</span>
            </div>
          </div>
          <!-- END Logged-in -->

        </div>
        <!-- END Account Links -->

        <div class="nav-items">
          <nuxt-link class="nav-link" to="/">
            <img src="/icons/home-white.svg" width="20" height="20" alt="Home Icon"/>
            <span>Home</span>
          </nuxt-link>

          <nuxt-link class="nav-link" to="/menu">
            <img src="/icons/tag.svg" width="20" height="20" alt="Home Icon"/>
            <span>Menu</span>
          </nuxt-link>

          <nuxt-link class="nav-link" to="/about">
            <img src="/icons/info-white.svg" width="20" height="20" alt="Home Icon"/>
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
    background-color: var(--bg-secondary)!important;
    min-height: 76px;

    &.fixed {
      position: fixed;
      width: 100%;
      z-index: 999;
      top: 0;

      background-color: var(--bg-primary) !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.03);
      .navbar-brand span {
        color: var(--color-text-primary) !important;
        font-weight: bold;
      }

      .nav-item .nav-link.router-link-active {
        background-color: var(--btn-bg-secondary)!important;
      }
    }

    .dropdown-menu {
      min-width: 15rem;
    }

    .navbar-brand {
      z-index: 999;
      img {
        width: 50px;
      }
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
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 20px;

        &.router-link-active {
          background-color: var(--btn-bg-primary);
          color: var(--color-text-secondary)!important;
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
      z-index: 1000;
      right: 100%;
      transition: 0.2s;
      touch-action: none;
      &.show {
        right: 0;
      }
      .nav-account {
        background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
        border-radius: 8px;
        height: 0;
        margin-bottom: 1rem;
        overflow-y: hidden;
        &.show {
          padding: 1rem 0.8rem;
          height: 100%;
        }
        .nav-items {
          .nav-link {
            background-color: color-mix(in srgb, var(--bg-primary), #fff 1%);
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .nav-items {
        padding: 0;
        margin-bottom: 0;
        .nav-link {
          background-color: color-mix(in srgb, var(--bg-primary), #000 15%);
          border-radius: 8px;
          cursor: pointer;
          padding: 0.7rem 0.7rem;
          margin-bottom: 1rem;

          width: 100%;

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

  @media (max-width: 767px) {
    .navbar {
      background-color: var(--bg-primary) !important;
      .navbar-brand span {
        color: var(--color-text-primary) !important;
        font-weight: bold;
      }
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

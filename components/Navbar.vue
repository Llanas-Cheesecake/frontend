<script setup lang="ts">
  import { useAuthStore } from "../store/auth";

  const { $auth } = useNuxtApp();
  const auth = useAuthStore();

  const currentUserName = computed(() => {
    return `${auth.user?.first_name} ${auth.user?.last_name}`
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

    <div class="nav-links">

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

    <div class="container">

      <a class="navbar-brand" href="#">
        <img src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />
      </a>

      <div style="z-index: 100;">

        <div class="d-flex align-items-center ms-auto w-auto">
          <div class="nav-item dropdown d-inline-block px-3">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/icons/shopping-cart.svg" alt="Shopping Cart" />
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>

          <div v-if="$auth.isLoggedIn()" class="nav-item dropdown d-inline-block px-3">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/icons/user.svg" alt="User" />
            </a>
            <ul class="dropdown-menu dropdown-menu-end mt-2">
              <li>
                <h6 class="dropdown-header">
                  <span>{{ currentUserName }}</span>
                </h6>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <img src="/icons/shopping-bag.svg" alt="Order History" />
                  <span class="ms-2 fs-6">Order History</span>
                </a>
              </li>
              <li>
                <a class="dropdown-item d-flex align-items-center" href="#">
                  <img src="/icons/star.svg" alt="Wishlist" />
                  <span class="ms-2">My Wishlist</span>
                </a>
              </li>
              <li><hr class="dropdown-divider"></li>
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

      .nav-item {
        padding: 0 1.5rem;
        .nav-link {
          color: var(--color-text-primary)!important;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 4px;

          &.router-link-exact-active {
            background-color: var(--color-text-primary);
            color: var(--bg-primary)!important;
            font-weight: bold;
          }

          &.disabled {
            color: var(--color-text-disabled)!important;
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
</style>

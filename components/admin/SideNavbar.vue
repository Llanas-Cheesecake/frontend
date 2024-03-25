<script setup lang="ts">
  import { useLocalStorage } from "@vueuse/core";

  const isSidebarOpen = useLocalStorage('is-sidebar-open', true);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
</script>

<template>
  <nav class="sidebar sticky-top d-print-none" :class="{ show: isSidebarOpen }">
    <div class="header">
      <img class="logo" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />
      <h5 class="fw-bold mb-0 d-none d-xl-block flex-fill" :class="{ 'd-xl-none': !isSidebarOpen }">
        Llana's Cheesecake
      </h5>
    </div>

    <hr />

    <ul class="nav flex-column">
      <li class="nav-item">
        <nuxt-link to="/admin/dashboard" class="nav-link">
          <img src="/icons/home-black.svg" alt="Dashboard Icon" />
          <span class="ms-3 d-none d-xl-inline" :class="{ 'd-xl-none': !isSidebarOpen }">Dashboard</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/products/" class="nav-link">
          <img src="/icons/box-black.svg" alt="Menu Icon" />
          <span class="ms-3 d-none d-xl-inline" :class="{ 'd-xl-none': !isSidebarOpen }">Products</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/orders" class="nav-link">
          <img src="/icons/shopping-bag-black.svg" alt="Orders Icon" />
          <span class="ms-3 d-none d-xl-inline" :class="{ 'd-xl-none': !isSidebarOpen }">Orders</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/customers" class="nav-link">
          <img src="/icons/user-black.svg" alt="Customers Icon" />
          <span class="ms-3 d-none d-xl-inline" :class="{ 'd-xl-none': !isSidebarOpen }">Customers</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/settings" class="nav-link">
          <img src="/icons/settings-black.svg" alt="Settings Icon" />
          <span class="ms-3 d-none d-xl-inline" :class="{ 'd-xl-none': !isSidebarOpen }">Settings</span>
        </nuxt-link>
      </li>
      <li class="nav-item sidebar-toggle">
        <div class="nav-link" @click="toggleSidebar" role="button">
          <svg v-if="isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left">
            <polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>
          </svg>
          <svg v-if="!isSidebarOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right">
            <polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>
          </svg>
          <span class="ms-3 d-none d-xl-inline" :class="{ 'd-xl-none': !isSidebarOpen }">Toggle sidebar</span>
        </div>
      </li>
    </ul>


  </nav>
</template>

<style scoped lang="scss">
  .sidebar {
    background-color: var(--bg-secondary);
    border: 3px solid rgba(0,0,0,0.1);
    border-radius: 12px;
    height: calc(100vh - 2rem);
    padding: 1rem;
    top: 1rem;

    &.show {
      min-width: 350px;
    }

    &.sticky-top {
      z-index: 999;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      .logo {
        width: 50px;
      }
      //.sidebar-toggle {
      //  border-radius: 8px;
      //  cursor: pointer;
      //  padding: 5px;
      //  &:hover {
      //    background-color: rgba(0,0,0,0.07);
      //  }
      //  svg {
      //    position: relative;
      //    top: -1px;
      //  }
      //}
    }

    .nav {
      .nav-item {
        margin: 0.5rem 0;
        &.sidebar-toggle {
          cursor: pointer;
          position: absolute;
          bottom: 1rem;
          .nav-link {
            display: inline;
            svg {
              position: relative;
              top: -1px;
            }
          }
        }
        .nav-link {
          border-radius: 8px;
          padding: 0.8rem 1rem;
          &.router-link-active {
            background-color: rgba(0,0,0,0.2);
          }
          &:hover {
            background-color: rgba(0,0,0,0.2);
          }
          img {
            position: relative;
            top: -1px;
          }
          span {
            color: var(--color-text-primary)
          }
        }
      }
    }
  }

  @media (max-width: 991px) {
    .sidebar {
      display: none;
    }
  }

  @media (max-width: 1199px) {
    .sidebar.show {
      min-width: auto;
    }
  }
</style>
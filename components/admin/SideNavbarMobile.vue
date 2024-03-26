<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'closeSidebar'): void
  }>()

  const props = defineProps<{
    isOpen: boolean
  }>();
</script>

<template>
  <nav class="sidebar sticky-top d-print-none" :class="{ show: isOpen }">
    <div class="header">
      <img class="logo" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />
      <h5 class="fw-bold mb-0 flex-fill">
        Llana's Cheesecake
      </h5>
      <div class="btn btn-action" @click="emit('closeSidebar')" role="button">
        <svg v-if="props.isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left">
          <polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline>
        </svg>
        <svg v-if="!props.isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-right">
          <polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      </div>
    </div>

    <hr />

    <ul class="nav flex-column">
      <li class="nav-item">
        <nuxt-link to="/admin/dashboard" class="nav-link" @click="emit('closeSidebar')">
          <img src="/icons/home-black.svg" alt="Dashboard Icon" />
          <span class="ms-3">Dashboard</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/products/" class="nav-link" @click="emit('closeSidebar')">
          <img src="/icons/box-black.svg" alt="Menu Icon" />
          <span class="ms-3">Products</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/orders" class="nav-link" @click="emit('closeSidebar')">
          <img src="/icons/shopping-bag-black.svg" alt="Orders Icon" />
          <span class="ms-3">Orders</span>
        </nuxt-link>
      </li>
<!--      <li class="nav-item">-->
<!--        <nuxt-link to="/admin/customers" class="nav-link" @click="emit('closeSidebar')">-->
<!--          <img src="/icons/user-black.svg" alt="Customers Icon" />-->
<!--          <span class="ms-3">Customers</span>-->
<!--        </nuxt-link>-->
<!--      </li>-->
      <li class="nav-item">
        <nuxt-link to="/admin/settings" class="nav-link" @click="emit('closeSidebar')">
          <img src="/icons/settings-black.svg" alt="Settings Icon" />
          <span class="ms-3">Settings</span>
        </nuxt-link>
      </li>
    </ul>


  </nav>
</template>

<style scoped lang="scss">
  .sidebar {
    background-color: var(--bg-secondary);
    border: 3px solid rgba(0,0,0,0.1);
    border-radius: 12px;
    height: 100vh;
    padding: 1rem;
    width: 100%;

    transition: 0.3s ease-in-out;

    position: absolute;
    left: -100vw;

    &.show {
      left: 0;
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
</style>
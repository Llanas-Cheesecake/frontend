<script setup lang="ts">

</script>

<template>
  <nav class="sidebar">
    <div class="header">
      <img class="logo" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />
      <h5 class="fw-bold mb-0">
        Llana's Cheesecake
      </h5>
    </div>

    <hr />

    <ul class="nav flex-column">
      <li class="nav-item">
        <nuxt-link to="/admin/dashboard" class="nav-link" href="#">
          <img src="/icons/home-black.svg" alt="Dashboard Icon" />
          <span class="ms-3">Dashboard</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/menu" class="nav-link" href="#">
          <img src="/icons/box-black.svg" alt="Menu Icon" />
          <span class="ms-3">Menu</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/orders" class="nav-link" href="#">
          <img src="/icons/shopping-bag-black.svg" alt="Orders Icon" />
          <span class="ms-3">Orders</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/customers" class="nav-link" href="#">
          <img src="/icons/user-black.svg" alt="Customers Icon" />
          <span class="ms-3">Customers</span>
        </nuxt-link>
      </li>
      <li class="nav-item">
        <nuxt-link to="/admin/settings" class="nav-link" href="#">
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
    padding: 1rem;
    min-width: 350px;
    min-height: calc(100vh - 2rem);

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      .logo {
        width: 50px;
      }
    }

    .nav {
      .nav-item {
        margin: 0.5rem 0;
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
</style>
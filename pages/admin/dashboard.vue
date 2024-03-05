<script setup lang="ts">
  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })
</script>

<template>
  <section class="dashboard">

    <!-- Overview Cards -->
    <div class="overview d-flex flex-wrap gap-4">
      <div class="card p-2">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-4">
            <img class="icon" src="/icons/user-white.svg" alt="User Icon" />
            <p class="mb-0">New Users</p>
          </div>

          <h4 class="fw-bold mb-0">500</h4>
        </div>
      </div>
      <div class="card p-2">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-4">
            <img class="icon" src="/icons/shopping-cart-white.svg" alt="Shopping Cart Icon" />
            <p class="mb-0">New Orders</p>
          </div>

          <h4 class="fw-bold mb-0">8</h4>
        </div>
      </div>
      <div class="card p-2">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3 mb-4">
            <img class="icon" src="/icons/bar-chart-white.svg" alt="Chart Icon" />
            <p class="mb-0">Today's Revenue</p>
          </div>

          <h4 class="fw-bold mb-0">8</h4>
        </div>
      </div>
    </div>
    <!-- END Overview Cards -->

    <!-- Weekly Revenue Chart -->
    <AdminWeeklyRevenueChart class="my-4" />
    <!-- END Weekly Revenue Chart -->

    <!-- Recent Orders -->
    <AdminRecentOrdersCard />
    <!-- END Recent Orders -->

  </section>
</template>

<style scoped lang="scss">
  .overview {
    .card {
      border-radius: 12px;
      flex: 1 0 21%;

      .icon {
        background: var(--bg-tertiary);
        border-radius: 8px;
        padding: 0.5rem;
      }
    }
  }

  @media (max-width: 575px) {
    .overview {
      .card {
        width: 100%;
        flex: initial;
      }
    }
  }
</style>
<script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })
</script>

<template>
  <section class="dashboard">
    <div class="card p-2">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <h5 class="fw-bold mb-0 flex-fill">
            Customers
          </h5>
          <div class="input-group">
            <span class="input-group-text">
              <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
            </span>
            <input type="text" class="form-control" placeholder="Search Customers..." aria-label="Search customers">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .input-group {
    width: auto;
    .input-group-text {
      background-color: var(--bg-secondary);
      border-right: 0;
      border-radius: 8px;
      border-width: 2px;
    }
    .form-control {
      border-left: 0;
      border-radius: 8px;
      padding-left: 0;
    }
  }
</style>
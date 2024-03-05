<script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })

  // Stupid hack for changing icon color
  const isHoveringBackButton = ref(false);

  const setHoverState = (state: boolean) => {
    isHoveringBackButton.value = state
  }

  const handleFormSubmit = () => {

  }
</script>

<template>
  <section class="dashboard">

    <div class="card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <nuxt-link to="/admin/products" class="btn btn-outline-primary" role="button" @mouseover="setHoverState(true)" @mouseout="setHoverState(false)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="isHoveringBackButton ? 'white' : 'black'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </nuxt-link>
          <h5 class="fw-bold mb-0 flex-fill">
            New Product
          </h5>
          <button type="button" class="btn btn-primary" @click="handleFormSubmit">
            Create Product
          </button>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12 col-lg-6">

        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="mb-4">General Information</h5>

            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="email" class="form-control" placeholder="e.g: Blueberry Cheesecake">
            </div>

            <div>
              <label class="form-label">Description</label>
              <textarea class="form-control" rows="4"></textarea>
            </div>

          </div>
        </div>
      </div>

      <div class="col-md-12 col-lg-6">
        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="mb-4">Media</h5>

            <div class="mb-3">
              <label class="form-label">Name</label>
              <input type="email" class="form-control" placeholder="e.g: Blueberry Cheesecake">
            </div>

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
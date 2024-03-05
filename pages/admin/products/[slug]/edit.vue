<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// Stupid hack for changing icon color
const isHoveringBackButton = ref(false);

const setHoverState = (state: boolean) => {
  isHoveringBackButton.value = state
}

const form = reactive({
  name: '',
  description: '',
  price: 1,
  stock: 1
})

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
            Edit Product
          </h5>
          <button type="button" class="btn btn-primary" @click="handleFormSubmit">
            Submit Changes
          </button>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-12 col-lg-7">

        <div class="card p-2 mb-4">
          <div class="card-body">

            <h5 class="mb-4">General Information</h5>

            <div class="mb-3">
              <label class="form-label">Name</label>
              <input v-model="form.name" type="text" class="form-control" placeholder="e.g: Blueberry Cheesecake">
            </div>

            <div>
              <label class="form-label">Description</label>
              <textarea v-model="form.description" class="form-control" rows="4"></textarea>
            </div>

          </div>
        </div>

        <div class="card p-2 mb-4">
          <div class="card-body">

            <h5 class="mb-4">Pricing and Stock</h5>

            <div class="row">
              <div class="col-auto">
                <label class="form-label">Price</label>
                <input v-model="form.price" type="number" class="form-control" step=".01">
              </div>

              <div class="col-auto">
                <label class="form-label">Stock</label>
                <input v-model="form.stock" type="number" class="form-control" placeholder="e.g: 20" min="0">
              </div>
            </div>

          </div>
        </div>

      </div>

      <div class="col-md-12 col-lg-5">

        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="mb-4">Media</h5>

            <div class="upload-box">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <p class="mt-2 mb-0">Drag & drop your image here</p>
              </div>
            </div>

          </div>
        </div>

        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="mb-4">Category</h5>

            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

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

.upload-box {
  background-color: rgba(0,0,0,0.04);
  border: 2px dashed var(--bg-tertiary);
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 12rem;
  padding: 1rem;
}
</style>
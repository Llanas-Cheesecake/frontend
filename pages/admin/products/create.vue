<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";
  import type { Category } from "~/types/Category";

  definePageMeta({
    layout: 'admin'
  })

  const categories = reactive<Category[]>([])

  // Fetch categories
  const { data: result } = await useFetchAPI<ApiResponse>('/categories', {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data

    payload.map((item: Category) => categories.push(item))
  }

  // Stupid hack for changing icon color
  const isHoveringBackButton = ref(false);

  const setHoverState = (state: boolean) => {
    isHoveringBackButton.value = state
  }

  const form = reactive({
    name: '',
    description: '',
    price: 1,
    stock: 1,
    files: [] as File[]
  });

  const imageUrl = ref('');

  const handleImageUpload = (files: FileList) => {
    // Create fake url for image preview
    imageUrl.value = URL.createObjectURL(files[0]);

    // Push the file into the form
    form.files = [files[0]];
  }

  const handleResetPreview = () => {
    imageUrl.value = '';
    form.files = []
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

            <AdminUploadBox v-if="!imageUrl" @image-uploaded="handleImageUpload" />

            <div v-else class="upload-preview">
              <img :src="imageUrl" alt="uploaded image" />

              <button class="btn btn-primary mt-4" @click="handleResetPreview">
                Choose a different image
              </button>
            </div>

          </div>
        </div>

        <div class="card p-2 mb-4">
          <div class="card-body">
            <h5 class="mb-4">Category</h5>

            <select class="form-select" required>
              <option selected disabled>Choose a category</option>
              <option v-for="category in categories" :value="category.category_id">
                {{ category.name }}
              </option>
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

  .upload-preview img {
    border-radius: 12px;
    width: 100%;
  }
</style>
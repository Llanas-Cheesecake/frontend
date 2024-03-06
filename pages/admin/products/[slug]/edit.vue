<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  import type { ApiResponse } from "~/types/ApiResponse";
  import type { Category } from "~/types/Category";
  import BackButton from "~/components/BackButton.vue";

  const { useToast } = Toast;
  const toast = useToast();

  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  });

  const route = useRoute();

  const isSubmittingForm = ref(false);

  const form = reactive({
    category_id: '',
    name: '',
    description: '',
    price: 1,
    stock: 1,
    files: [] as File[]
  });

  const imageUrl = ref('');

  const categories = reactive<Category[]>([])

  // Fetch product
  const { data: result } = await useFetchAPI<ApiResponse>(`/admin/products/${route.params.slug}`, {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data

    form.name = payload.name;
    form.description = payload.description;
    form.price = payload.price;
    form.stock = payload.stock;
    form.category_id = payload.category_id;

    imageUrl.value = payload.thumbnail;
  }

  // Fetch categories
  const { data } = await useFetchAPI<ApiResponse>('/categories', {
    method: "GET"
  })

  if (data.value) {
    const payload = data.value.data

    payload.map((item: Category) => categories.push(item))
  }

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

  const handleFormSubmit = async () => {
    const data = new FormData();
    data.append('_method', 'PATCH'); // See https://stackoverflow.com/a/50691997
    data.append('category_id', form.category_id);
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price as unknown as string);
    data.append('stock', form.stock as unknown as string);

    if (form.files.length > 0) {
      data.append('thumbnail', form.files[0]);
    }

    isSubmittingForm.value = true;

    const { data: results, error } = await useFetchAPI(`/admin/products/${route.params.slug}/edit`, {
      method: "POST",
      body: data,
      headers: {
        ContentType: 'multipart/form-data'
      }
    })

    if (results.value) {
      isSubmittingForm.value = false; // Redundant

      navigateTo(`/admin/products/${route.params.slug}`);
      // console.log(results.value)
    }

    if (error.value) {
      isSubmittingForm.value = false;
      toast.error("Something went wrong while handling your request");

      console.log(error.value)
    }
  }
</script>

<template>
  <section class="dashboard">

    <div class="card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">

          <BackButton link="/admin/products"></BackButton>

          <h5 class="fw-bold mb-0 flex-fill">
            Edit Product
          </h5>

          <button type="button" class="btn btn-primary" :disabled="isSubmittingForm" @click="handleFormSubmit">
            <span>Submit changes</span>
            <LoadingIcon v-if="isSubmittingForm" color="white" class="ms-2 position-relative" style="top: -1px" />
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

        <div class="card p-2">
          <div class="card-body">
            <h5 class="mb-4">Category</h5>

            <select v-model="form.category_id" class="form-select" required>
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
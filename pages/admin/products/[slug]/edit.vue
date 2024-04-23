<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  import type { ApiResponse } from "~/types/ApiResponse";
  import type { Category } from "~/types/Category";
  import type { ProductInventory } from "~/types/Product";

  const { useToast } = Toast;
  const toast = useToast();

  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  });

  const route = useRoute();
  const routeProductName = useState('routeProductName');

  const isSubmittingForm = ref(false);

  const productId = ref<number>(0);

  const inventory = ref<ProductInventory[]>([]);

  const form = reactive({
    category_id: '',
    name: '',
    description: '',
    price: 1,
    files: [] as File[]
  });

  const validation = reactive({
    category_id: [],
    name: [],
    description: [],
    price: [],
    thumbnail: []
  });

  const imageUrl = ref('');

  const categories = reactive<Category[]>([])

  // Fetch product
  const { data: result, error } = await useFetchAPI<ApiResponse>(`/admin/products/${route.params.slug}`, {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data;

    routeProductName.value = payload.name;

    productId.value = payload.product_id;

    form.name = payload.name;
    form.description = payload.description;
    form.price = payload.price;
    form.category_id = payload.category_id;

    inventory.value = payload.inventory;

    imageUrl.value = payload.thumbnail;
  }

  if (error.value) {
    // TODO: Handle errors by status codes
    // switch ()
    navigateTo('/admin/products');
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
    resetValidation();

    const data = new FormData();
    data.append('_method', 'PATCH'); // See https://stackoverflow.com/a/50691997
    data.append('category_id', form.category_id);
    data.append('name', form.name);
    data.append('description', form.description);
    data.append('price', form.price as unknown as string);

    if (form.files.length > 0) {
      data.append('thumbnail', form.files[0]);
    }

    isSubmittingForm.value = true;

    const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/products/${productId.value}/edit`, {
      method: "POST",
      body: data,
      headers: {
        ContentType: 'multipart/form-data'
      }
    })

    if (results.value) {
      isSubmittingForm.value = false; // Redundant

      const payload = results.value.data;
      navigateTo(`/admin/products/${payload.slug}`);
    }

    if (error.value) {
      isSubmittingForm.value = false;
      const payload = error.value.data.errors;

      switch (error.value.statusCode) {
        case 422:
          validation.category_id = payload.category_id || [];
          validation.name = payload.name || [];
          validation.description = payload.description || [];
          validation.price = payload.price || [];
          validation.thumbnail = payload.thumbnail || [];
          break;
        default:
          toast.error("Something went wrong while handling your request");
      }
    }
  }

  const resetValidation = () => {
    validation.category_id = [];
    validation.name = [];
    validation.description = [];
    validation.price = [];
    validation.thumbnail = [];
  }

  const handleAddStock = (e: ProductInventory) => {
    inventory.value = [...inventory.value, e];
  }

  const handleRemoveStock = (id: number) => {
    inventory.value = inventory.value.filter((item) => {
      return item.id !== id;
    });
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

            <div class="form-floating mb-4">
              <input v-model="form.name"
                     type="text"
                     class="form-control"
                     :class="{ 'is-invalid': validation.name.length > 0 }"
                     placeholder="e.g: Blueberry Cheesecake">
              <label class="form-label">Name</label>

              <small v-for="error in validation.name" class="invalid-feedback">
                {{ error }}
              </small>
            </div>

            <client-only>
              <div class="form-floating">
                <textarea v-model="form.description"
                          class="form-control"
                          :class="{ 'is-invalid': validation.description.length > 0 }"
                          placeholder="Description"
                          style="height: 150px;">
                </textarea>
                <label class="form-label">Description</label>

                <small v-for="error in validation.description" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>
            </client-only>

          </div>
        </div>

        <div class="card p-2 mb-4">
          <div class="card-body">

            <h5 class="mb-4">Pricing and Category</h5>

            <div class="row">
              <div class="col">
                <div class="form-floating">
                  <input v-model="form.price"
                         type="number"
                         inputmode="decimal"
                         placeholder="Price"
                         class="form-control"
                         :class="{ 'is-invalid': validation.price.length > 0 }"
                         step=".01" min="50">
                  <label class="form-label">Price</label>

                  <small v-for="error in validation.price" class="invalid-feedback">
                    {{ error }}
                  </small>
                </div>
              </div>

              <div class="col">
                <div class="form-floating">
                  <select v-model="form.category_id" class="form-select" :class="{ 'is-invalid': validation.category_id.length > 0 }" required>
                    <option selected disabled>Choose a category</option>
                    <option v-for="category in categories" :value="category.category_id">
                      {{ category.name }}
                    </option>
                  </select>
                  <label class="form-label">Category</label>

                  <small v-for="error in validation.category_id" class="invalid-feedback">
                    {{ error }}
                  </small>
                </div>
              </div>
            </div>

          </div>
        </div>

        <AdminProductInventory
            :product_id="productId"
            :inventory="inventory"
            @stock-added="handleAddStock"
            @stock-removed="handleRemoveStock"
        />

      </div>

      <div class="col-md-12 col-lg-5">

        <div class="card p-2 mb-4">
          <div class="card-body">

            <h5 class="mb-4">
              Media
            </h5>

            <LazyAdminUploadBox v-if="!imageUrl" :errors="validation.thumbnail" @input-changed="validation.thumbnail = []" @image-uploaded="handleImageUpload" />

            <div v-else class="upload-preview">
              <img :src="imageUrl" alt="uploaded image" />

              <button class="btn btn-primary mt-4" @click="handleResetPreview">
                Choose a different image
              </button>
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
    border-width: 2px;
    border-right-width: 0;
    border-radius: 8px;
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
<script setup lang="ts">
// @ts-ignore
import {Bootstrap5Pagination} from 'laravel-vue-pagination';
import {useModal} from "vue-final-modal";
import {ModalDeleteProduct} from "#components";

import type {ApiResponse} from "~/types/ApiResponse";
import type {Product} from "~/types/Product";

definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })

  const isLoading = ref(true);
  const isFailed = ref(false);

  const searchKeyword = ref('');

  const products = ref<Product[]>([]);
  const pagination = ref<any>({})

  const fetchProducts = async (page = 1) => {
    let endpoint = `/admin/products?page=${page}`;

    if (searchKeyword.value.length > 0) {
      endpoint = `/admin/products?page=${page}&keyword=${encodeURIComponent(searchKeyword.value)}`
    }

    const { data: results, error } = await useFetchAPI<ApiResponse>(endpoint, {
      method: "GET"
    });

    if (results.value) {
      const payload = results.value.data

      // Store them in variables
      products.value = [ ...payload.data ];
      pagination.value = payload

      // Delete unnecessary data from pagination
      delete pagination.value.data;

      isLoading.value = false;
    }

    // Handle errors
    if (error.value) {
      isFailed.value = true;
      isLoading.value = false;

      // TODO: Handle errors
    }
  }

  onBeforeMount(() => {
    fetchProducts()
  });

  const handleSubmitSearch = () => {
    fetchProducts();
  }

  const handleProductDelete = (product_id: number) => {
    products.value = products.value.filter((item) => {
      return item.product_id !== product_id;
    });
  }

  // Delete Modal
  const selectedProduct = ref();

  const openDeleteModal = (product: any) => {
    selectedProduct.value = product
    deleteModal.open()
  }

  const deleteModal = useModal({
    component: ModalDeleteProduct,
    attrs: {
      product: selectedProduct,
      onCancel() {
        deleteModal.close()
      },
      onConfirm(product_id: number) {
        handleProductDelete(product_id);
        deleteModal.close();
      }
    }
  });

</script>

<template>
  <section class="dashboard">

    <div class="card p-2 mb-4">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <h5 class="fw-bold mb-0 flex-fill">
            Products
          </h5>
          <form @submit.prevent="handleSubmitSearch">
            <div class="input-group">
              <span class="input-group-text">
                <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
              </span>
              <input v-model="searchKeyword" type="text" class="form-control" placeholder="Search Products..." aria-label="Search products">
              <button type="submit" class="d-none">
                Submit
              </button>
            </div>
          </form>
          <nuxt-link to="/admin/products/create" class="btn btn-primary">
            New Product
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="card p-2">
      <div class="card-body">

        <p v-if="isLoading" class="mb-0">
          <LoadingIcon color="black" class="me-2 position-relative" style="top: -1px" />
          <span>Loading...</span>
        </p>

        <p v-if="!isLoading && products.length === 0" class="mb-0">
          No products were found.
        </p>

        <table v-if="!isLoading && !isFailed && products.length > 0" class="table table-striped w-100 mb-0" style="table-layout: fixed;">
          <colgroup>
            <col span="1" style="width: 10%;">
            <col span="1" style="width: 25%;">
            <col span="1" style="width: 25%;">
            <col span="1" style="width: 20%;">
            <col span="1" style="width: 15%;">
          </colgroup>

          <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products" :key="product.slug">
            <td class="text-truncate overflow-hidden">
              <img class="product-image" :src="product.thumbnail" :alt="product.name" />
            </td>
            <td class="text-truncate overflow-hidden">
              {{ product.name }}
            </td>
            <td class="text-truncate overflow-hidden">{{ product.category }}</td>
            <td>{{ formatPrice(product.price) }}</td>
            <td>
              <div class="d-flex align-items-center">
                <nuxt-link :to="`/admin/products/${ product.slug }`"
                           class="btn-action"
                           data-bs-toggle="tooltip"
                           data-bs-placement="top"
                           data-bs-title="View"
                >
                  <img src="/icons/eye-black.svg" alt="view icon" width="20" />
                </nuxt-link>
                <nuxt-link :to="`/admin/products/${ product.slug }/edit`"
                           class="btn-action"
                           data-bs-toggle="tooltip"
                           data-bs-placement="top"
                           data-bs-title="Edit">
                  <img src="/icons/edit-black.svg" alt="edit icon" width="20" />
                </nuxt-link>
                <button type="button"
                        class="btn-action"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Delete"
                        @click="openDeleteModal(product)">
                  <img src="/icons/trash-black.svg" alt="trash icon" width="20" />
                </button>
              </div>
            </td>
          </tr>

          </tbody>
        </table>

        <Bootstrap5Pagination
            class="mt-4 mb-0"
            :data="pagination"
            @pagination-change-page="fetchProducts"
        />

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

  .product-image {
    border-radius: 6px;
    width: 60px;
    height: 60px;
  }

  .btn-action {
    background-color: transparent;
    border: 0;
    border-radius: 6px;
    padding: 0.5rem 0.6rem;
    img {
      position: relative;
      top: -2px;
    }
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
  }
</style>
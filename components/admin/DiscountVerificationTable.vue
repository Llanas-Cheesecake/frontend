<script setup lang="ts">
  // @ts-ignore
  import { Bootstrap5Pagination } from 'laravel-vue-pagination';
  import type { ApiResponse } from "~/types/ApiResponse";

  interface DocumentVerification {
    id: number
    customer_id: number
    customer_name: string
    customer_email: string
    document_link: string
  }

  const documents = ref<DocumentVerification[]>([]);
  const pagination = ref<any>({})

  const fetchDocuments = async (page = 1) => {
    await useFetchAPI<ApiResponse>(`admin/customers/pending-discount-verification?page=${page}`, {
      method: 'GET',
      server: false,
      onResponse({ response }) {
        if (response.ok) {
          const payload = response._data.data;

          documents.value = [...payload.data];
          pagination.value = Object.keys(payload)
              .filter(key => key !== 'data')
              .reduce((obj, key) => {
                return {
                  ...obj, [key]: payload[key]
                }
              }, {});
        }
      }
    });
  }

  await fetchDocuments();

  const removeDocument = (id: number) => {
    documents.value = documents.value.filter(document => document.customer_id !== id);
  }

</script>

<template>
  <div class="card p-2">
    <div class="card-body">

      <div class="d-flex align-items-center gap-3">
        <h5 class="fw-bold mb-0 flex-fill">
          Pending PWD / Senior Citizen Discount
        </h5>
        <div class="input-group">
            <span class="input-group-text">
              <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
            </span>
          <input type="text" class="form-control" placeholder="Search Customers..." aria-label="Search customers">
        </div>
      </div>

      <div v-if="documents.length > 0" class="table-responsive mt-4">
        <table class="table table-striped w-100 mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Document</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="document in documents" :key="document.customer_id">
              <AdminSpecialDiscountRequest :document="document" @remove-document="removeDocument" />
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="mt-4">
        No pending discount requests.
      </div>

      <div v-if="documents.length > 0" class="d-flex justify-content-between align-items-center mt-4">
        <small class="text-subtle">
          Displaying {{ pagination.from }} to {{ pagination.to }} of {{ pagination.total }} entries
        </small>

        <client-only>
          <Bootstrap5Pagination
              class="mb-0"
              :data="pagination"
              @pagination-change-page="fetchDocuments"
          />
        </client-only>
      </div>

    </div>
  </div>
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
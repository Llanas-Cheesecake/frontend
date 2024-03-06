<script setup lang="ts">
  import type {ApiResponse} from "~/types/ApiResponse";
  import type { Customer } from "~/types/Customer";


  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })

  const customers = ref<Customer[]>([]);
  const pagination = ref<any>({})

  const fetchCustomers = async (page = 1) => {
    const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/customers/customers?page=${page}`, {
      method: "GET"
    });

    if (results.value) {
      const payload = results.value.data

      // Store them in variables
      customers.value = { ...payload.data };
      pagination.value = payload

      // Delete unnecessary data from pagination
      delete pagination.value.data;
      console.log(customers)
    }
  }

  onBeforeMount(() => {
    fetchCustomers()
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
    <div class="card p-2 mt-4">
      <div class="card-body">
        <table class="table table-striped w-100 mb-0" style="table-layout: fixed;">
          <colgroup>
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 30%;">
            <col span="1" style="width: 10%;">
          </colgroup>

          <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="text-truncate overflow-hidden">
              firsto
            </td>
            <td class="text-truncate overflow-hidden">
              lasto
            </td>
            <td class="text-truncate overflow-hidden">
              emailo
            </td>
            <td>
              <div class="d-inline-flex align-items-center">
                <nuxt-link :to="`/admin/customers/grug/`"
                           class="btn-action"
                           data-bs-toggle="tooltip"
                           data-bs-placement="top"
                           data-bs-title="View"
                >
                  <img src="/icons/eye-black.svg" alt="view icon" width="20" />
                </nuxt-link>
              </div>
            </td>
          </tr>

          </tbody>
        </table>



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
  .btn-action {
    background-color: transparent;
    border: 0;
    border-radius: 6px;
    padding: 0.5rem 0.6rem;
    img {
      top: -2px;
    }
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
  }
</style>
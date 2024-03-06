<script setup lang="ts">
  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })
</script>

<template>
  <section class="dashboard">
    <div class="card p-2">
      <div class="card-body">
        <div class="d-flex align-items-center gap-3">
          <h5 class="fw-bold mb-0 flex-fill">
            Orders
          </h5>
          <div class="input-group">
            <span class="input-group-text">
              <img src="/icons/search-black.svg" width="18" alt="Search Icon" />
            </span>
            <input type="text" class="form-control" placeholder="Search Orders..." aria-label="Search orders">
          </div>
        </div>
      </div>
    </div>
    <div class="card p-2 mt-4">
    <div class="card-body">
      <table class="table table-striped w-100 mb-0" style="table-layout: fixed;">
        <colgroup>
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 25%;">
          <col span="1" style="width: 30%;">
          <col span="1" style="width: 15%;">
          <col span="1" style="width: 15%;">
        </colgroup>

        <thead>
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Customer Name</th>
          <th scope="col">Products</th>
          <th scope="col">Amount</th>
          <th scope="col">Status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="text-truncate overflow-hidden">#fd396e306f7ab52f29919c3eff54740c</td>
          <td class="text-truncate overflow-hidden">Vincent Tampos</td>
          <td class="text-truncate overflow-hidden">Blueberry Cheesecake</td>
          <td>$1000</td>
          <td>
            <div class="alert alert-success text-center p-1 mb-0">
              Paid
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-truncate overflow-hidden">#fd396e306f7ab52f29919c3eff54740c</td>
          <td class="text-truncate overflow-hidden">Vincent Tampos</td>
          <td class="text-truncate overflow-hidden">Blueberry Cheesecake</td>
          <td>$1000</td>
          <td>
            <div class="alert alert-info text-center p-1 mb-0">
              Pending
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-truncate overflow-hidden">#fd396e306f7ab52f29919c3eff54740c</td>
          <td class="text-truncate overflow-hidden">Vincent Tampos</td>
          <td class="text-truncate overflow-hidden">Blueberry Cheesecake</td>
          <td>$1000</td>
          <td>
            <div class="alert alert-danger text-center p-1 mb-0">
              Unpaid
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-truncate overflow-hidden">#fd396e306f7ab52f29919c3eff54740c</td>
          <td class="text-truncate overflow-hidden">Vincent Tampos</td>
          <td class="text-truncate overflow-hidden">Blueberry Cheesecake</td>
          <td>$1000</td>
          <td>
            <div class="alert alert-danger text-center p-1 mb-0">
              Unpaid
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-truncate overflow-hidden">#fd396e306f7ab52f29919c3eff54740c</td>
          <td class="text-truncate overflow-hidden">Vincent Tampos</td>
          <td class="text-truncate overflow-hidden">Blueberry Cheesecake</td>
          <td>$1000</td>
          <td>
            <div class="alert alert-danger text-center p-1 mb-0">
              Unpaid
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
</style>
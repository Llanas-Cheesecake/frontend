<script setup lang="ts">

</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <div class="mb-4">
        <h5 class="fw-bold">
          Recent Orders
        </h5>
        <small class="text-subtle">
          Only 5 recent successful orders are displayed. Clicking an order will show more details.
        </small>
      </div>

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
</template>

<style scoped lang="scss">
  .table tbody tr {
    cursor: pointer;
  }
</style>
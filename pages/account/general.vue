<script setup lang="ts">
  import type { Customer } from "~/types/Customer";
  import type { ApiResponse } from "~/types/ApiResponse";

  const customer = reactive<Customer>({
    first_name: '',
    last_name: '',
    email: ''
  });

  const { data: result } = await useFetchAPI<ApiResponse>('/account/general', {
    method: "GET"
  })

  if (result.value) {
    const payload = result.value.data.customer;

    customer.first_name = payload.first_name;
    customer.last_name = payload.last_name;
    customer.email = payload.email;
  }

  // TODO: Handle errors

</script>

<template>
  <section>
    <div class="card p-2">
      <div class="card-body">
        <h4 class="card-title fw-bold">Account Settings</h4>
        <hr />

        <div class="p-2 mt-4">
          <h5 class="fw-bold mb-4">Change Personal Information</h5>

          <ChangeAccountDetails :first_name="customer.first_name" :last_name="customer.last_name" />
        </div>
        <div class="p-2 mt-5">
          <h5 class="fw-bold mb-4">Change Password</h5>

          <ChangePassword endpoint="/account/change-password" />
        </div>

        <div class="p-2 mt-5">
          <h5 class="fw-bold mb-4">PWD/Senior Citizen Discount</h5>

          <SpecialDiscount />
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .btn {
    border-radius: 8px;
  }
</style>
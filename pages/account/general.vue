<script setup lang="ts">
  import type { Customer } from "~/types/Customer";
  import type { ApiResponse } from "~/types/ApiResponse";

  const customer = reactive<Customer>({
    first_name: '',
    last_name: '',
    email: ''
  });

  const newEmail = ref('');

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

        <ChangeAccountDetails :first_name="customer.first_name" :last_name="customer.last_name" />

        <ChangePassword />

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .btn {
    border-radius: 8px;
  }
</style>
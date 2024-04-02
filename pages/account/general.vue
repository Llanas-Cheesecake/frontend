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
    <div class="card bg-primary text-white p-2">
      <div class="card-body">
        <h4 class="card-title fw-bold">Account Settings</h4>
        <hr />

        <section class="card bg-primary text-white p-2 mt-4">
          <div class="card-body">
            <h5 class="fw-bold mb-4">Change Personal Information</h5>

            <form>
              <div class="row">
                <div class="col-md-12 col-lg mb-4">
                  <label class="form-label">First name</label>
                  <input v-model="customer.first_name" type="text" class="form-control" placeholder="First name">
                </div>
                <div class="col-md-12 col-lg mb-4">
                  <label class="form-label">Last name</label>
                  <input v-model="customer.last_name" type="text" class="form-control" placeholder="Last name">
                </div>
              </div>

              <button type="submit" class="btn btn-secondary">
                Submit changes
              </button>
            </form>
          </div>
        </section>

<!--        <section class="card bg-primary text-white p-2 mt-5">-->
<!--          <div class="card-body">-->
<!--            <h5 class="fw-bold mb-4">Change Email</h5>-->

<!--            <form>-->
<!--              <div class="mb-4">-->
<!--                <label class="form-label">Current email</label>-->
<!--                <input v-model="customer.email" type="text" class="form-control" placeholder="Current email" disabled>-->
<!--              </div>-->
<!--              <div class="mb-4">-->
<!--                <label class="form-label">New email</label>-->
<!--                <input v-model="newEmail" type="text" class="form-control" placeholder="New email">-->
<!--              </div>-->

<!--              <button type="submit" class="btn btn-secondary">-->
<!--                Change email-->
<!--              </button>-->
<!--            </form>-->
<!--          </div>-->
<!--        </section>-->

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
<script setup lang="ts">
  import type { ApiResponse } from "~/types/ApiResponse";

  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  const { useToast } = Toast;
  const toast = useToast();

  const isChangingPassword = ref(false);

  const password = reactive({
    current: '',
    new_password: '',
    confirm_password: ''
  })

  const validationErrors = reactive({
    current_password: [],
    new_password: []
  })

  const resetErrors = () => {
    // Reset validation errors
    validationErrors.current_password = []
    validationErrors.new_password = []
  }

  const setValidationErrors = (errors: any) => {
    validationErrors.current_password = errors.current_password ?? []
    validationErrors.new_password = errors.new_password ?? []
  }

  const changePassword = async () => {
    // Show loading indicator
    isChangingPassword.value = true

    // Reset validation errors
    resetErrors()

    await useFetchAPI<ApiResponse>('/account/change-password', {
      method: "PUT",
      server: false,
      body: {
        current_password: password.current,
        new_password: password.new_password,
        new_password_confirmation: password.confirm_password
      },
      onResponse({ response }) {
        if (response.ok) {
          toast.success("Password changed")

          // Reset fields
          password.current = '';
          password.new_password = '';
          password.confirm_password = '';
        }
      },
      onResponseError({ response }) {
        switch (response.status) {
          case 422:
            setValidationErrors(response._data.errors);
            break;
          // default:
        }
      }
    }).finally(() => {
      isChangingPassword.value = false
    })
  }
</script>

<template>
  <section class="card bg-primary text-white p-2 mt-5">
    <div class="card-body">
      <h5 class="fw-bold mb-4">Change Password</h5>

      <form @submit.prevent="changePassword">
        <div class="mb-4">
          <label class="form-label">Current password</label>
          <input v-model="password.current"
                 type="password"
                 class="form-control"
                 :class="{ 'is-invalid': validationErrors.current_password.length > 0 }"
                 placeholder="Password"
                 :disabled="isChangingPassword">

          <div v-if="validationErrors.current_password.length > 0" class="invalid-feedback">
            <div v-for="password in validationErrors.current_password">
              {{ password }}
            </div>
          </div>

        </div>
        <div class="mb-4">
          <label class="form-label">New password</label>
          <input v-model="password.new_password"
                 type="password"
                 class="form-control"
                 :class="{ 'is-invalid': validationErrors.new_password.length > 0 }"
                 placeholder="New password"
                 :disabled="isChangingPassword">

          <div v-if="validationErrors.new_password.length > 0" class="invalid-feedback">
            <div v-for="error in validationErrors.new_password">
              {{ error }}
            </div>
          </div>

        </div>
        <div class="mb-4">
          <label class="form-label">Confirm password</label>
          <input v-model="password.confirm_password"
                 type="password"
                 class="form-control"
                 :class="{ 'is-invalid': validationErrors.new_password.length > 0 }"
                 placeholder="Confirm password"
                 :disabled="isChangingPassword">
        </div>

        <button type="submit" class="btn btn-secondary" :disabled="isChangingPassword">
          <span>Change password</span>
          <LoadingIcon v-if="isChangingPassword" class="ms-2" />
        </button>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .btn {
    border-radius: 8px;
  }
</style>
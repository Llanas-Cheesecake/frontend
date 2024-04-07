<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  import {ModalAdminForgetPassword} from "#components";
  import {useModal} from "vue-final-modal";

  definePageMeta({
    layout: 'admin'
  });

  const auth = useAuthStore();

  const isSubmitting = ref(false);

  const form = reactive({
    email: '',
    password: ''
  });

  // Generic error
  const error = ref("");

  // Validation error
  const validationErrors = reactive<any>({})

  const resetErrors = () => {
    // Reset generic error message
    error.value = ""

    // Reset validation errors
    Object.assign(validationErrors, {})
  }

  const handleFormSubmit = () => {
    // Enable loading indicator
    isSubmitting.value = true;

    // Reset errors
    resetErrors();

    auth.loginAsAdministrator({ email: form.email, password: form.password })
        .then(() => {
          location.href = '/admin/dashboard'
        })
        .catch((err) => {
          if (err.response.status === 422) {
            // Validation error handler
            Object.assign(validationErrors, err.data.errors)
          } else {
            // Generic error handler
            error.value = err.data.message
          }
        })
        .finally(() => {
          // Disable loading indicator
          isSubmitting.value = false
        })
  }

  const forgetPasswordModal = useModal({
    component: ModalAdminForgetPassword,
    attrs: {
      onCancel() {
        forgetPasswordModal.close()
      }
    }
  })
</script>

<template>
  <div class="card p-2">
    <div class="card-body">

      <h5 class="fw-bold mb-4">
        Login - Admin Panel
      </h5>

      <div v-if="error.length > 0" class="alert alert-danger my-4" role="alert">
        {{ error }}
      </div>

      <form @submit.prevent="handleFormSubmit">
        <div class="mb-4">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control">
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control">
        </div>

        <div class="helper" @click="forgetPasswordModal.open()">
          Forgot password?
        </div>

        <button type="submit" class="btn btn-primary d-block w-100 mt-4" :disabled="isSubmitting">
          <span>Login</span>
          <LoadingIcon v-if="isSubmitting" class="ms-2" />
        </button>
      </form>

    </div>
  </div>
  <div class="box">

  </div>
</template>

<style scoped lang="scss">
  .card {
    width: 450px;

    .header {
      display: flex;
      align-items: center;
      gap: 15px;
      .logo {
        width: 50px;
      }
    }

    a {
      color: rgba(0,0,0,0.8);
    }
  }

  .helper {
    display: inline-block;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  @media (max-width: 575px) {
    .card {
      width: auto;
    }
  }
</style>
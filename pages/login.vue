<script setup lang="ts">
  import { useAuthStore } from "../store/auth";

  const auth = useAuthStore()

  const isLoading = ref(false);

  const form = reactive({
    email: "",
    password: ""
  })

  // Generic error
  const error = ref("");
  // Validation error
  const validationErrors = reactive<any>({})

  const handleForm = () => {
    // Enable loading indicator
    isLoading.value = true

    // Reset errors
    resetErrors()

    auth.loginAsCustomer({ email: form.email, password: form.password })
        .then(() => {
          location.href = '/'
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
          isLoading.value = false
        })
  }

  const resetErrors = () => {
    // Reset generic error message
    error.value = ""

    // Reset validation errors
    Object.assign(validationErrors, {})
  }
</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body">

      <img class="logo d-block mx-auto mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

      <h3 class="card-title text-center fw-bold mb-4">
        Sign In
      </h3>

      <div v-if="error.length > 0" class="alert alert-danger my-4" role="alert">
        {{ error }}
      </div>

      <form class="mt-4" @submit.prevent="handleForm">
        <div class="mb-4">
          <label class="form-label">Email address</label>
          <input v-model="form.email" type="text" class="form-control" :class="{ 'is-invalid': validationErrors.email }">

          <div v-if="validationErrors.email" class="invalid-feedback">
            <div v-for="email in validationErrors.email">
              {{ email }}
            </div>
          </div>
        </div>
        <div class="mb-5">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" :class="{ 'is-invalid': validationErrors.password }">

          <div v-if="validationErrors.password" class="invalid-feedback">
            <div v-for="password in validationErrors.password">
              {{ password }}
            </div>
          </div>

          <nuxt-link to="/forget-password" class="form-text mt-2 d-inline-block">Forgot password?</nuxt-link>
        </div>

        <button type="submit" class="btn btn-primary d-block w-100" :disabled="isLoading">
          <span>Sign In</span>
          <LoadingIcon v-if="isLoading" class="ms-2" />
        </button>

      </form>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    background-color: var(--bg-primary);
    border-radius: 8px;
    color: var(--color-text-primary);

    margin: 4rem auto;
    max-width: 500px;
    //position: absolute;
    //top: 50%;
    //left: 50%;
    //transform: translate(-50%, -50%);
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  //@media (max-height: 775px) {
  //  .card {
  //    position: initial;
  //    top: initial;
  //    left: initial;
  //    transform: initial;
  //    margin: 2rem auto;
  //  }
  //}
</style>

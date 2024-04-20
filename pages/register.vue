<script setup lang="ts">
  import Swal from "sweetalert2";
  import VueHcaptcha from '@hcaptcha/vue3-hcaptcha';
  import { useAuthStore } from "~/store/auth";

  const auth = useAuthStore();
  const config = useRuntimeConfig();

  const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

  const isLoading = ref(false)

  const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    c_password: "",
    captcha_token: ""
  })

  // Generic error
  const error = ref("");
  // Validation error
  const validationErrors = reactive({
    first_name: [],
    last_name: [],
    email: [],
    password: []
  })


  // Ugly error handler omg
  const resetErrors = () => {
    // Reset generic error message
    error.value = ""

    // Reset validation errors
    validationErrors.first_name = []
    validationErrors.last_name = []
    validationErrors.email = []
    validationErrors.password = []
  }

  const setValidationErrors = (errors: any) => {
    if (errors.first_name) {
      validationErrors.first_name = errors.first_name
    }
    if (errors.last_name) {
      validationErrors.last_name = errors.last_name
    }
    if (errors.email) {
      validationErrors.email = errors.email
    }
    if (errors.password) {
      validationErrors.password = errors.password
    }
  }

  const handleForm = () => {
    // Enable loading indicator
    isLoading.value = true

    // Reset errors
    resetErrors()

    auth.register(form)
        .then(() => {
          Swal.fire({
            title: "Email Verification",
            text: "An email confirmation request has been sent to your inbox. Please accomplish it to finish your account creation",
            icon: "info"
          })
        })
        .catch((err) => {
          if (err.response.status === 422) {
            // Validation error handler
            setValidationErrors(err.data.errors)
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

  const handleCaptchaVerify = (token: string, eKey: string) => {
    form.captcha_token = token;
    // form.captchaEKey = eKey;
  }
</script>

<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card shadow my-4 p-3">
      <div class="card-body">

        <img class="logo d-block mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

        <h2 class="card-title fw-bold mb-5">
          Sign Up
        </h2>

        <div v-if="error.length > 0" class="alert alert-danger my-4" role="alert">
          {{ error }}
        </div>

        <form class="mt-4" @submit.prevent="handleForm">

          <div class="row mb-4">
            <div class="col-12 col-md-6 mb-3 mb-md-0">
              <div class="form-floating">
                <input v-model="form.first_name" type="text" class="form-control" placeholder="First name" :class="{ 'is-invalid': validationErrors.first_name.length > 0 }">
                <label class="form-label">First Name</label>

                <div v-if="validationErrors.first_name" class="invalid-feedback">
                  <div v-for="firstName in validationErrors.first_name">
                    {{ firstName }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-floating">
                <input v-model="form.last_name" type="text" class="form-control" placeholder="Last name" :class="{ 'is-invalid': validationErrors.last_name.length > 0 }">
                <label class="form-label">Last Name</label>

                <div v-if="validationErrors.last_name" class="invalid-feedback">
                  <div v-for="lastName in validationErrors.last_name">
                    {{ lastName }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row gap-3 mb-4">
            <div class="col">
              <div class="form-floating">
                <input v-model="form.email" type="email" class="form-control" placeholder="Email address" :class="{ 'is-invalid': validationErrors.email.length > 0 }">
                <label class="form-label">Email address</label>

                <div v-if="validationErrors.email" class="invalid-feedback">
                  <div v-for="email in validationErrors.email">
                    {{ email }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <div class="form-floating">
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" :class="{ 'is-invalid': validationErrors.password.length > 0 }">
                <label class="form-label">Password</label>

                <div v-if="validationErrors.password" class="invalid-feedback">
                  <div v-for="password in validationErrors.password">
                    {{ password }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input v-model="form.c_password" type="password" class="form-control" placeholder="Confirm Password" :class="{ 'is-invalid': validationErrors.password.length > 0 }">
                <label class="form-label">Confirm Password</label>
              </div>
            </div>
          </div>

          <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>

          <button type="submit" class="btn btn-secondary d-block w-100 mt-4" :disabled="isLoading">
            <span>Sign Up</span>
            <LoadingIcon v-if="isLoading" class="ms-2" />
          </button>
        </form>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    background-color: var(--bg-primary);
    border-radius: 8px;
    color: var(--color-text-primary);

    width: 100%;
    max-width: 600px;
  }

  .logo {
    width: 50px;
    height: 50px;
  }
</style>
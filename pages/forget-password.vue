<script setup lang="ts">
  import Swal from "sweetalert2";
  import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

  const config = useRuntimeConfig();
  const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

  const isLoading = ref(false)

  const email = ref("")
  const captchaToken = ref("");

  // Generic error message
  const error = ref("");

  // Form validation errors
  const validationErrors = reactive({
    email: []
  })

  const handleCaptchaVerify = (token: string, eKey: string) => {
    captchaToken.value = token;
  }

  const resetErrors = () => {
    validationErrors.email = []
  }

  const setValidationErrors = (errors: any) => {
    if (errors.email) {
      validationErrors.email = errors.email
    }
  }

  const handleForm = async () => {
    // Enable loading indicator
    isLoading.value = true

    // Reset errors
    resetErrors()

    // Get XSRF Token
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl

    await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' })

    // Validate token
    await useFetchAPI('/forget-password', {
      lazy: true,
      server: false,
      method: "POST",
      body: {
        email: email.value,
        accountType: "customer",
        captcha_token: captchaToken.value
      },
      onResponse({ response }) {
        if (response.ok) {
          isLoading.value = false

          Swal.fire({
            title: "Check your inbox",
            text: "If you have an account with us, we will send an email to your inbox containing the link for resetting your password",
            icon: "info"
          })
        }
      },
      onResponseError({ response }) {
        isLoading.value = false;

        switch (response.status) {
          case 422:
            setValidationErrors(response._data.errors);
            break;
          default:
            error.value = response._data.message;
        }
      }
    });
  }
</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body">

      <img class="logo d-block mx-auto mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

      <h3 class="card-title text-center fw-bold mb-4">
        Forget Password
      </h3>

      <div v-if="error.length > 0" class="alert alert-danger my-4" role="alert">
        {{ error }}
      </div>

      <form class="mt-4" @submit.prevent="handleForm">
        <div class="mb-4">
          <label class="form-label">Email address</label>
          <input v-model="email" type="text" class="form-control" :class="{ 'is-invalid': validationErrors.email.length > 0 }">

          <div v-if="validationErrors.email" class="invalid-feedback">
            <div v-for="email in validationErrors.email">
              {{ email }}
            </div>
          </div>
        </div>

        <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>

        <button type="submit" class="btn btn-primary d-block w-100 mt-3" :disabled="isLoading">
          <span>Submit</span>
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

    //margin: 4rem auto;
    width: 100%;
    max-width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 576px) {
    .card {
      position: initial!important;
      top: initial!important;
      left: initial!important;
      transform: initial!important;
      margin: 4rem auto;
    }
  }
</style>
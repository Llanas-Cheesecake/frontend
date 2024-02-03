<script setup lang="ts">
  import Swal from "sweetalert2";

  const isLoading = ref(false)
  const email = ref("")
  const validationErrors = reactive({
    email: []
  })

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
    const { data, pending, status } = await useFetchAPI('/forget-password', {
      lazy: true,
      server: false,
      method: "POST",
      body: {
        email: email.value,
        accountType: "customer"
      },
      onResponse() {
        isLoading.value = false

        Swal.fire({
          title: "Check your inbox",
          text: "If you have an account with us, we will send an email to your inbox containing the link for resetting your password",
          icon: "info"
        })
      },
      onResponseError({ response }) {
        // errorMessage.value = response._data.message
        console.log(response)
        // TODO: Handle errors
      }
    })

    // auth.register(form)
    //     .then(() => {
    //       Swal.fire({
    //         title: "Email Verification",
    //         text: "An email confirmation request has been sent to your inbox. Please accomplish it to finish your account creation",
    //         icon: "info"
    //       })
    //     })
    //     .catch((err) => {
    //       if (err.response.status === 422) {
    //         // Validation error handler
    //         setValidationErrors(err.data.errors)
    //       } else {
    //         // Generic error handler
    //         error.value = err.data.message
    //       }
    //     })
    //     .finally(() => {
    //       // Disable loading indicator
    //       isLoading.value = false
    //     })
  }
</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body">

      <img class="logo d-block mx-auto mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

      <h3 class="card-title text-center fw-bold mb-4">
        Forget Password
      </h3>

      <form class="mt-4" @submit.prevent="handleForm">
        <div class="mb-5">

          <label class="form-label">Email address</label>
          <input v-model="email" type="text" class="form-control" :class="{ 'is-invalid': validationErrors.email.length > 0 }">

          <div v-if="validationErrors.email" class="invalid-feedback">
            <div v-for="email in validationErrors.email">
              {{ email }}
            </div>
          </div>

        </div>

        <button type="submit" class="btn btn-primary d-block w-100" :disabled="isLoading">
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

    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logo {
    width: 60px;
    height: 60px;
  }
</style>
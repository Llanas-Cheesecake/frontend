<script setup lang="ts">
  import Swal from "sweetalert2";

  const route = useRoute();

  const isLoading = ref(false)

  const form = reactive({
    password: "",
    c_password: ""
  })

  const errors = reactive({
    password: []
  })

  // Ensure XSRF Token is fresh
  const fetchXSRF = async () => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl

    await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' })
  }

  // Validate token
  await fetchXSRF();

  const { data, pending, status } = await useFetchAPI(`/reset-password?token=${route.query.token}`, {
    lazy: true,
    server: false,
    method: "GET",
    onResponse({ request, response }) {
      // console.log(response)
    },
    onResponseError({ request, response }) {
      // errorMessage.value = response._data.message
      // console.log(response._data.message)
    }
  })

  const handleForm = async () => {
    isLoading.value = true
    errors.password = []

    await fetchXSRF()

    // Validate token
    await useFetchAPI('/reset-password', {
      lazy: true,
      server: false,
      method: "PUT",
      body: {
        token: route.query.token,
        password: form.password,
        password_confirmation: form.c_password
      },
      onResponse({ response }) {
        isLoading.value = false;

        if (response.status === 202) {
          Swal.fire({
            title: "Password changed successfully",
            text: "Redirecting you to login page in 5 seconds...",
            icon: "success",
            timer: 5000
          });

          setTimeout(() => {
            navigateTo('/login')
          }, 5000)
        }
      },
      onResponseError({ request, response }) {
        errors.password = response._data.errors.password
        // errorMessage.value = response._data.message
        // console.log(response._data)
      }
    })
  }

</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body position-relative">

      <section v-if="pending" class="centered both w-auto">
        <div class="d-flex align-items-center">
          <LoadingIcon />

          <span class="ms-2">Validating</span>
        </div>
      </section>

      <section v-if="status === 'success'">
        <img class="logo d-block mx-auto mb-3" src="/icons/check-circle.svg" alt="Circled checked icon">

        <h3 class="card-title text-center fw-bold mb-4">
          Reset Password
        </h3>

        <form class="mt-4" @submit.prevent="handleForm">
          <div class="mb-4">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control" :class="{ 'is-invalid': errors.password.length > 0 }">
            <div v-if="errors.password" class="invalid-feedback">
              <div v-for="password in errors.password">
                {{ password }}
              </div>
            </div>
          </div>

          <div class="mb-5">
            <label class="form-label">Confirm Password</label>
            <input v-model="form.c_password" type="password" class="form-control" :class="{ 'is-invalid': errors.password.length > 0 }">

          </div>

          <button type="submit" class="btn btn-primary d-block w-100" :disabled="isLoading">
            <span>Change Password</span>
            <LoadingIcon v-if="isLoading" class="ms-2" />
          </button>

        </form>
      </section>

      <section v-if="status === 'error'" class="centered">
        <img class="logo d-block mx-auto mb-3" src="/icons/x-circle.svg" alt="Circled checked icon">

        <h3 class="card-title text-center fw-bold mb-4">
          Invalid link
        </h3>

        <p class="text-center mb-5">
          Your link might be invalid or expired. Try requesting for a new one.
        </p>

        <nuxt-link to="/" class="btn btn-primary d-block mx-auto">
          Go Home
        </nuxt-link>
      </section>

    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: var(--bg-primary);
  border-radius: 8px;
  color: var(--color-text-primary);
  padding: 2rem!important;

  width: 500px;
  min-height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .card-body {
    padding: 0;
    .centered {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &.both {
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}


.logo {
  width: 60px;
  height: 60px;
}
</style>
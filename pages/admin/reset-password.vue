<script setup lang="ts">
import Swal from "sweetalert2";

definePageMeta({
  layout: 'admin'
});

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

const { pending, status } = await useFetchAPI(`/reset-password?token=${route.query.token}`, {
  lazy: true,
  server: false,
  method: "GET"
});

const handleSubmitForm = async () => {
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
          navigateTo('/admin/login')
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
  <div class="card p-2">
    <div class="card-body position-relative">

      <section v-if="pending" class="centered both w-auto">
        <div class="d-flex align-items-center">
          <LoadingIcon color="black" />

          <span class="ms-2">Validating</span>
        </div>
      </section>

      <section v-if="status === 'success'" class="centered">
        <div class="w-100">
          <div class="text-center w-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <h3 class="card-title text-center fw-bold mb-4">
            Reset Password
          </h3>

          <form class="mt-4" @submit.prevent="handleSubmitForm">
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
        </div>
      </section>

      <section v-if="status === 'error'" class="centered">
        <div class="w-100">
          <div class="text-center w-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
              <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>

          <h3 class="card-title text-center fw-bold mb-4">
            Invalid link
          </h3>

          <p class="text-center mb-5">
            Your link might be invalid or expired. Try requesting for a new one.
          </p>

          <nuxt-link to="/admin/login" class="btn btn-primary d-block mx-auto text-white">
            Go Home
          </nuxt-link>
        </div>
      </section>

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

  .card-body {
    .centered {
      display: flex;
      justify-content: center;
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
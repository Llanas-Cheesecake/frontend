<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  import { useModal } from "vue-final-modal";
  import { ModalResendEmailVerification } from "#components";

  const auth = useAuthStore()

  const isLoading = ref(false);
  const isLoginSuccessful = ref(false);

  const email = ref('');
  const password = ref('');

  // Generic error
  const error = ref("");
  // Validation error
  const validationErrors = reactive<any>({});

  // Resend Email Verification Modal
  const resendEmailModal = useModal({
    component: ModalResendEmailVerification,
    attrs: {
      email: email,
      onCloseModal() {
        resendEmailModal.close()
      }
    }
  })

  const handleForm = () => {
    // Enable loading indicator
    isLoading.value = true

    // Reset errors
    resetErrors()

    auth.loginAsCustomer({ email: email.value, password: password.value })
        .then(() => {
          isLoginSuccessful.value = true;

          location.href = '/'
        })
        .catch((err) => {
          switch (err.response.status) {
            case 403:
              resendEmailModal.open();
              break;
            case 422:
              Object.assign(validationErrors, err.data.errors);
              break;
            default:
              error.value = err.data.message;
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
  <div class="d-flex justify-content-center align-items-center">
    <div class="card p-3 shadow">
      <div class="card-body">

        <img class="logo d-block mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

        <h2 class="card-title fw-bold mb-5">
          Sign In
        </h2>

        <div v-if="error.length > 0" class="alert alert-danger my-4" role="alert">
          {{ error }}
        </div>

        <div v-if="isLoginSuccessful" class="alert alert-success my-4" role="alert">
          Login success! Redirecting...
        </div>

        <form class="mt-4" @submit.prevent="handleForm">
          <div class="form-floating mb-4">
            <input v-model="email"
                   type="email"
                   class="form-control"
                   placeholder="Email Address"
                   :class="{ 'is-invalid': validationErrors.email }"
                   :disabled="isLoading">
            <label class="form-label">Email address</label>

            <div v-if="validationErrors.email" class="invalid-feedback">
              <div v-for="email in validationErrors.email">
                {{ email }}
              </div>
            </div>
          </div>
          <div class="form-floating mb-5">
            <input v-model="password"
                   type="password"
                   class="form-control"
                   placeholder="Password"
                   :class="{ 'is-invalid': validationErrors.password }"
                   :disabled="isLoading">
            <label class="form-label">Password</label>

            <div v-if="validationErrors.password" class="invalid-feedback">
              <div v-for="password in validationErrors.password">
                {{ password }}
              </div>
            </div>

            <nuxt-link to="/forget-password" class="form-text mt-2 d-inline-block">Forgot password?</nuxt-link>
          </div>

          <button type="submit" class="btn btn-secondary d-block w-100" :disabled="isLoading">
            <span>Sign In</span>
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
    max-width: 500px;
  }

  .logo {
    width: 50px;
    height: 50px;
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

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const emit = defineEmits<{
  (e: 'cancel'): void
}>();

const config = useRuntimeConfig();
const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

const isSubmitting = ref(false);
const isEmailSent = ref(false);

const email = ref("");
const captchaToken = ref("");

// Generic error message
const error = ref("");

// Form validation errors
const validationErrors = reactive({
  email: []
});

const resetErrors = () => {
  validationErrors.email = []
}

const setValidationErrors = (errors: any) => {
  if (errors.email) {
    validationErrors.email = errors.email
  }
}

const handleCaptchaVerify = (token: string, eKey: string) => {
  captchaToken.value = token;
}

const handleSubmitForm = async () => {
  isSubmitting.value = true;

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
      accountType: "admin",
      captcha_token: captchaToken.value
    },
    onRequestError() {
      isSubmitting.value = false;
    },
    onResponse({ response }) {
      if (response.ok) {
        isSubmitting.value = false;
        isEmailSent.value = true;
      }
    },
    onResponseError({ response }) {
      isSubmitting.value = false;

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
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>

            <div v-if="!isEmailSent" class="mb-4">
              <h5 class="fw-bold mb-3">
                Forget Password
              </h5>

              <p>To securely reset your account's password, run the following command from your hosting provider's shell access:</p>

              <code>php artisan admin:update-password</code>

              <hr class="my-4" />

              <p>Alternatively, you can request a password reset request through your inbox.</p>

              <div class="form-floating mb-4">
                <input v-model="email" type="email" class="form-control" :class="{ 'is-invalid': validationErrors.email.length > 0 }" placeholder="name@example.com">
                <label>Email address</label>

                <small class="invalid-feedback" v-for="error in validationErrors.email">
                  {{ error }}
                </small>
              </div>

              <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>
            </div>

            <div v-else class="mb-4">
              <h5 class="fw-bold mb-3">
                Password reset request sent
              </h5>

              <p>
                The request to reset your password will be sent to the given email if it exists.
                Please check your inbox for the confirmation link.
              </p>
            </div>


            <div v-if="!isEmailSent" class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-primary" :disabled="isSubmitting" @click="handleSubmitForm">
                <span>Send Email</span>
                <LoadingIcon v-if="isSubmitting" class="ms-2" />
              </button>
              <button type="button" class="btn btn-outline-primary" :disabled="isSubmitting" @click="emit('cancel')">
                Cancel
              </button>
            </div>

            <button v-else type="button" class="btn btn-outline-primary" @click="emit('cancel')">
              OK
            </button>

          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">
.icon {
  background-color: rgba(111, 111, 111, 0.2);
  box-shadow: 0 0 6px 4px rgba(1, 1, 1, 0.14);
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.6rem;

  svg {
    position: relative;
    top: -1px;
  }
}
</style>
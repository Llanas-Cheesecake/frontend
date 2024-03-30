<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import type {ApiResponse} from "~/types/ApiResponse";
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const props = defineProps<{
  email: any
}>();

const emit = defineEmits<{
  (e: 'closeModal'): void,
}>();

const config = useRuntimeConfig();
const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

const isProcessing = ref(false);
const isEmailSent = ref(false);

const captcha_token = ref('');
const errorMessage = ref('');

const resendEmail = async () => {
  errorMessage.value = "";
  isProcessing.value = true;

  const { data: result, error } = await useFetchAPI<ApiResponse>(`/resend-verification`, {
    method: "POST",
    body: {
      captcha_token: captcha_token.value,
      email: props.email
    }
  })

  if (result.value) {
    isProcessing.value = false;
    isEmailSent.value = true;
  }

  if (error.value) {
    isProcessing.value = false;
    
    errorMessage.value = error.value.data.message;
  }
}

const handleCaptchaVerify = (token: string, eKey: string) => {
  captcha_token.value = token;
}
</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(220, 53, 69)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-triangle">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>

            <div v-if="!isEmailSent">
              <h5 class="fw-bold mb-3">
                You're not verified yet.
              </h5>
              <p class="mb-0">
                To continue, please verify your email address first. If you lost the verification email, you may resend the confirmation email by clicking confirm below.
              </p>

              <div class="mt-4">
                <div v-if="errorMessage.length > 0" class="alert alert-danger mb-4" role="alert">
                  {{ errorMessage }}
                </div>

                <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>
              </div>

            </div>

            <div v-else>
              <h5 class="fw-bold mb-3">
                Email sent!
              </h5>
              <p class="mb-5">
                Check your primary/spam inbox for the email verification.
              </p>
            </div>

            <div v-if="!isEmailSent" class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-secondary" :disabled="isProcessing" @click="emit('closeModal')">
                Cancel
              </button>
              <button type="button" class="btn btn-success" :disabled="isProcessing" @click="resendEmail">
                <span>Confirm</span>
                <LoadingIcon v-if="isProcessing" color="white" width="20" height="20" class="ms-2 position-relative" style="top: -1px" />
              </button>
            </div>

            <button v-if="isEmailSent" type="button" class="btn btn-secondary" @click="emit('closeModal')">
              Close
            </button>

          </div>
        </div>
      </div>
    </div>

  </VueFinalModal>
</template>

<style scoped lang="scss">
.icon {
  background-color: rgba(220, 53, 69, 0.2);
  box-shadow: 0 0 6px 4px rgba(220, 53, 69, 0.14);
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
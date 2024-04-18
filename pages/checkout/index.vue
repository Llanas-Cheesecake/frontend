<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  import { useAuthStore } from "~/store/auth";
  import { useCartStore } from "~/store/cart";

  import type { ApiResponse } from "~/types/ApiResponse";
  import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
  import {useModal} from "vue-final-modal";
  import {ModalUnavailablePaymentMethod} from "#components";

  // Ensure that the user is authenticated when they're "logged in"
  definePageMeta({
    middleware: ['authenticated']
  })

  const { useToast } = Toast;
  const toast = useToast();

  const auth = useAuthStore();
  const cart = useCartStore();

  const config = useRuntimeConfig();

  const hCaptchaSiteKey = config.public.hCaptchaSiteKey;

  useHead({
    title: "Checkout"
  })

  const isEligiblePWD = ref(false);

  const unavailablePaymentMethodModal = useModal({
    component: ModalUnavailablePaymentMethod,
    attrs: {
      onCancel() {
        unavailablePaymentMethodModal.close()
      }
    }
  })

  const email = ref( auth._customer?.email ? auth._customer.email : '' );
  const additionalInfo = ref('');
  const courier_name = ref('');

  const deliveryFirstName = ref( auth._customer?.first_name ? auth._customer.first_name : '' );
  const deliveryLastName = ref( auth._customer?.last_name ? auth._customer.last_name : '' );
  const deliveryPhoneNumber = ref('');

  const captcha_token = ref('');

  // Intersection observer
  const intersection = ref();
  const isSticking = ref(false)

  onMounted(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          isSticking.value = !entry.isIntersecting;
        },
        { threshold: 0.0 }
    )

    observer.observe(intersection.value)
  })

  const isCheckingOut = ref(false);

  const validation = reactive({
    first_name: [],
    last_name: [],
    email: [],
    phone_number: [],
    courier_name: []
  });

  const handleCheckout = async () => {
    await fetchXSRFCookie();

    isCheckingOut.value = true;

    const { data: result, error } = await useFetchAPI<ApiResponse>('/checkout', {
      method: "POST",
      body: {
        'cart_session': cart._cart_id,
        'delivery_first_name': deliveryFirstName.value,
        'delivery_last_name': deliveryLastName.value,
        'delivery_email': email.value,
        'delivery_phone_number': deliveryPhoneNumber.value,
        'courier_name': courier_name.value,
        'additional_info': additionalInfo.value,
        'captcha_token': captcha_token.value
      }
    })

    // Redirect to the checkout page
    if (result.value) {
      isCheckingOut.value = false;
      const response = result.value.data;

      location.href = response.checkout_url;
    }

    // Handle errors
    if (error.value) {
      isCheckingOut.value = false;
      const payload = error.value.data.errors;

      switch (error.value.statusCode) {
        case 406:
          // Handle "empty cart
          toast.error(error.value.data.message);
          break;
        case 422:
          // Handle form validations;
          validation.first_name = payload.delivery_first_name || [];
          validation.last_name = payload.delivery_last_name || [];
          validation.email = payload.delivery_email || [];
          validation.phone_number = payload.delivery_phone_number || [];
          validation.courier_name = payload.courier_name || [];
          break;
        default:
          console.log(error.value.data);
          toast.error(error.value.data.message);
      }
    }
  }

  const handleCaptchaVerify = (token: string, eKey: string) => {
    captcha_token.value = token;
    // form.captchaEKey = eKey;
  }

</script>

<template>
    <section class="my-4">

      <nuxt-link to="/cart" class="btn btn-primary btn-back mb-4">
        <img src="/icons/arrow-left.svg" width="20" class="me-2" alt="back arrow" />
        <span>Back to cart</span>
      </nuxt-link>

      <div class="row">

        <div class="col-md-12 col-lg-8">

          <div class="card p-2">
            <div class="card-body">
              <h5 class="fw-bold">Checkout</h5>

              <hr />

              <form>
                <section class="mt-4 mb-5">
                  <h5 class="fw-bold mb-4">Customer Details</h5>

                  <div class="row mb-4">
                    <div class="col-sm-12 col-md-6 mb-4 mb-md-0">
                      <div class="form-floating">
                        <input v-model="deliveryFirstName" type="text" class="form-control" :class="{ 'is-invalid': validation.first_name.length > 0 }" placeholder="e.g. John" aria-label="First Name">
                        <label class="form-label">First Name</label>
                        <small v-for="error in validation.first_name" class="invalid-feedback">
                          {{ error }}
                        </small>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-4 mb-md-0">
                      <div class="form-floating">
                        <input v-model="deliveryLastName" type="text" class="form-control" :class="{ 'is-invalid': validation.last_name.length > 0 }" placeholder="e.g. Doe" aria-label="Last Name">
                        <label class="form-label">Last Name</label>
                        <small v-for="error in validation.last_name" class="invalid-feedback">
                          {{ error }}
                        </small>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-12 col-md-6 mb-4 mb-md-0">
                      <div class="form-floating">
                        <input v-model="email" type="email" class="form-control" :class="{ 'is-invalid': validation.email.length > 0 }" placeholder="e.g. johndoe@gmail.com" aria-label="Email">
                        <label class="form-label">Email</label>
                        <small v-for="error in validation.email" class="invalid-feedback">
                          {{ error }}
                        </small>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6 mb-4 mb-md-0">
                      <div class="input-group">
                        <div class="input-group-text">+63</div>
                        <div class="form-floating" :class="{ 'is-invalid': validation.phone_number.length > 0 }">
                          <input v-model="deliveryPhoneNumber" type="text" class="form-control" :class="{ 'is-invalid': validation.phone_number.length > 0 }" placeholder="e.g. 9123456789">
                          <label class="form-label">Phone Number</label>
                        </div>
                        <small v-for="error in validation.phone_number" class="invalid-feedback">
                          {{ error }}
                        </small>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="mb-5">
                  <h5 class="fw-bold">Delivery Information</h5>
                  <p class="mb-4">
                    We only accept pick-up service. Please choose your desired pickup courier so we are aware.
                  </p>

                  <div class="form-floating mb-4" :class="{ 'is-invalid': validation.courier_name.length > 0 }">
                    <input v-model="courier_name"
                           type="text"
                           class="form-control"
                           :class="{ 'is-invalid': validation.courier_name.length > 0 }"
                           placeholder="Grab, Lalamove"
                           aria-label="Email">
                    <label class="form-label">Courier</label>

                    <small v-for="error in validation.courier_name" class="invalid-feedback">
                      {{ error }}
                    </small>
                  </div>

                  <div class="form-floating">
                    <textarea v-model="additionalInfo" class="form-control" placeholder="Additional information about your delivery" style="height: 100px"></textarea>
                    <label class="form-label">Additional information</label>
                  </div>
                </section>

                <section class="mb-5">
                  <h5 class="fw-bold">PWD/Senior Citizen</h5>
                  <p class="mb-2">
                    Under RA No. 9994 & RA No. 10754, you may be eligible for a 20% discount if you are a Person with Disability (PWD) or a Senior Citizen.
                  </p>
                  <p class="mb-3">
                    To redeem this discount, you must submit documents verifying your eligibility. Any uploaded documents will be deleted right after verifying them
                    in accordance with our <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>.
                  </p>

                  <div class="alert alert-warning">
                    <span class="fw-bold">Note:</span>
                    The discount won't be applied immediately upon checkout.
                    The discounted price will only be applied after we verified your documents and after that, we will refund the 20% to your chosen payment method
                    within 3-5 business days.
                  </div>

                  <div class="form-check mb-4">
                    <input v-model="isEligiblePWD" class="form-check-input" type="checkbox">
                    <label class="form-check-label">
                      I am a PWD / Senior Citizen
                    </label>
                  </div>

                  <div v-if="isEligiblePWD">
                    <label class="form-label">Upload documents here...</label>
                    <input class="form-control" type="file" multiple>
                  </div>


                </section>

                <section v-if="!auth._isAuthenticated">
                  <h5 class="fw-bold mb-4">Captcha</h5>
                  <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>
                </section>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-4">

          <div ref="intersection" />

          <section class="sticky-top" :style="{ 'top': isSticking ? '1.5rem' : '0' }">
            <div class="card p-2 mt-4 mt-lg-0 mb-3">
              <div class="card-body">
                <h5 class="card-title">Order Summary</h5>

                <hr />

                <CartList :show-actions="false" />

                <hr />

                <section>
                  <div class="d-flex justify-content-between mb-2">
                    <div>Subtotal:</div>
                    <div>{{ formatPrice(cart._totalPrice) }}</div>
                  </div>
                </section>

                <div v-if="isEligiblePWD" class="alert alert-warning my-3">
                  PayMaya & GrabPay won't be available for this checkout. <span class="clickable" @click="unavailablePaymentMethodModal.open()">Learn more</span>
                </div>

                <button class="btn btn-primary d-block w-100 mt-4 mb-3" :disabled="isCheckingOut" @click="handleCheckout">
                  <LoadingIcon v-if="isCheckingOut" width="20" height="20" class="position-relative me-1" style="top: -1px;" />
                  <span>Checkout</span>
                </button>
                <div class="form-text">
                  You are agreeing to our <nuxt-link to="/termsandconditions">terms & conditions</nuxt-link> when you continue to checkout
                </div>
              </div>
            </div>

            <div v-if="!auth._isAuthenticated" class="alert alert-info" role="alert">
              You can easily access your order history when you have an account with us!
            </div>
          </section>

        </div>
      </div>
    </section>
</template>

<style scoped lang="scss">
  .btn-back {
    border-radius: 8px;
    img {
      position: relative;
      top: -1px;
    }
  }

  // Reset into default because of white background
  .form-control, .form-select {
    background-color: var(--bs-body-bg);
    border: 1px solid color-mix(in srgb, var(--bg-secondary), #000 20%);
    &:focus {
      background-color: var(--bs-body-bg);
      border: 1px solid color-mix(in srgb, var(--bg-primary), #000 60%);
      box-shadow: none;
      color: var(--bs-body-color);
    }
    &:disabled {
      background-color: var(--bs-secondary-bg);
      color: rgba(var(--bs-body-color-rgb), 0.65);

      &~ label::after {
        background: var(--bs-secondary-bg)!important;
        color: #6c757d
      }
    }
    color: var(--color-text-primary);
  }

  .input-group-text {
    background: var(--bs-tertiary-bg);
    border-color: color-mix(in srgb, var(--bg-secondary), #000 20%);
  }

  .form-floating > .form-control:focus ~ label::after, .form-floating > .form-control:not(:placeholder-shown) ~ label::after, .form-floating > .form-control-plaintext ~ label::after, .form-floating > .form-select ~ label::after {
    background-color: var(--bs-body-bg);
  }

  .clickable {
    color: var(--color-link);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
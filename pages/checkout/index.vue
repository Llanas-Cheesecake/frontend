<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";

  import { useAuthStore } from "~/store/auth";
  import { useCartStore } from "~/store/cart";

  import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
  import { useModal } from "vue-final-modal";
  import { ModalUnavailablePaymentMethod } from "#components";

  import type { ApiResponse } from "~/types/ApiResponse";

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
  const isSpecialDiscountActivated = ref(false);

  watch(isSpecialDiscountActivated, (value) => {
    if (value) {
      cart.setPercentDiscount(20);
    } else {
      cart.setPercentDiscount(0);
    }
  });

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

  const pickupType = ref('SELF');
  const pickupDateTime = ref('');
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
    pickup_type: [],
    pickup_datetime: [],
    courier_name: []
  });

  const handleScheduleChange = (e: string) => {
    pickupDateTime.value = e;
  }

  const handleCheckout = async () => {
    await fetchXSRFCookie();

    isCheckingOut.value = true;

    const body = new FormData();
    body.append('cart_session', cart._cart_id as string);

    body.append('delivery_first_name', deliveryFirstName.value);
    body.append('delivery_last_name', deliveryLastName.value);
    body.append('delivery_email', email.value);
    body.append('delivery_phone_number', deliveryPhoneNumber.value);

    body.append('pickup_type', pickupType.value);

    if (pickupType.value === 'COURIER') {
      body.append('courier_name', courier_name.value);
    }

    body.append('pickup_datetime', pickupDateTime.value);

    body.append('additional_info', additionalInfo.value);
    body.append('is_special_discount_activated', isSpecialDiscountActivated.value ? '1' : '0');
    body.append('captcha_token', captcha_token.value);

    const { data: result, error } = await useFetchAPI<ApiResponse>('/checkout', {
      method: "POST",
      body: body
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
          validation.pickup_type = payload.pickup_type || [];
          validation.pickup_datetime = payload.pickup_datetime || [];
          validation.courier_name = payload.courier_name || [];

          toast.error("There are some problems with your submission. Please check the form.");
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

  if (auth._isAuthenticated) {
    const { data: results } = await useFetchAPI<ApiResponse>('/account/discount', {
      method: "GET"
    });

    if (results.value) {
      const payload = results.value.data;

      isEligiblePWD.value = payload.is_verified;
    }
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

          <!-- Contact Information -->
          <div class="card p-2 mb-4">
            <div class="card-body">

              <h5 class="fw-bold mb-4">Contact Information</h5>

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

            </div>
          </div>
          <!-- END Contact Information -->

          <!-- Pickup Information -->
          <div class="card p-2 mb-4">
            <div class="card-body">

              <h5 class="fw-bold">Pickup Information</h5>
              <p class="mb-4">
                We only accept pick-up service. Please choose either self pick-up or a courier service of your choice.
              </p>

              <div class="form-check form-check-inline">
                <input v-model="pickupType" class="form-check-input" type="radio" value="SELF">
                <label class="form-check-label" for="inlineRadio1">Self Pickup</label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="pickupType" class="form-check-input" type="radio" value="COURIER">
                <label class="form-check-label" for="inlineRadio2">Courier</label>
              </div>

              <div v-if="pickupType === 'COURIER'" class="form-floating my-4" :class="{ 'is-invalid': validation.courier_name.length > 0 }">
                <input v-model="courier_name"
                       type="text"
                       class="form-control"
                       :class="{ 'is-invalid': validation.courier_name.length > 0 }"
                       placeholder="Grab, Lalamove"
                       aria-label="Courier Service">
                <label class="form-label">Courier Service</label>

                <small class="form-text">
                  e.g: Grab, Lalamove...
                </small>

                <small v-for="error in validation.courier_name" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>

              <!-- Pickup Time -->
              <CheckoutSchedulePickup class="mt-4" :errors="validation.pickup_datetime" @selection-changed="handleScheduleChange" />
              <!-- END Pickup Time -->

              <!-- Pickup Location -->
              <h5 class="fw-bold my-4">Pickup Location</h5>

              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1930.2077322895486!2d121.02998539527542!3d14.632341967078897!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7d1433bf833%3A0xa7e2ef409b0a5f2a!2sLlana&#39;s!5e0!3m2!1sen!2sph!4v1713695510060!5m2!1sen!2sph" height="300" style="border:0; width: 100%" :allowfullscreen="false" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              <!-- END Pickup Location -->

              <div class="form-floating mt-4">
                <textarea v-model="additionalInfo" class="form-control" placeholder="Additional information about your delivery" style="height: 100px"></textarea>
                <label class="form-label">Additional information</label>
              </div>

            </div>
            <!-- END Pickup Information -->
          </div>

          <!-- Special Discount -->
          <div v-if="isEligiblePWD" class="card p-2 mb-4">
            <div class="card-body">

              <h5 class="fw-bold">
                PWD / Senior Citizen Discount
              </h5>

              <p class="mb-4">
                You are eligible for a PWD / Senior citizen discount! Tick the checkbox to activate it.
              </p>

              <div class="form-check">
                <input v-model="isSpecialDiscountActivated" class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  Activate 20% Discount
                </label>
              </div>

            </div>
          </div>
          <!-- END Special Discount -->

          <!-- Captcha -->
          <div class="card p-2" v-if="!auth._isAuthenticated">
            <div class="card-body">
              <h5 class="fw-bold mb-4">
                Are you a bot?
              </h5>

              <vue-hcaptcha :sitekey="hCaptchaSiteKey" @verify="handleCaptchaVerify"></vue-hcaptcha>
            </div>
          </div>
          <!-- END Captcha -->
        </div>
        <div class="col-md-12 col-lg-4">

          <div ref="intersection" />

          <section class="sticky-top" :style="{ 'top': isSticking ? '6rem' : '0' }">
            <div class="card p-2 mt-4 mt-lg-0 mb-3">
              <div class="card-body">
                <h5 class="card-title">Order Summary</h5>

                <hr />

                <CartList :show-actions="false" />

                <hr />

                <section v-if="isSpecialDiscountActivated">
                  <div class="d-flex justify-content-between mb-2">
                    <div>Subtotal:</div>
                    <div>{{ formatPrice(cart._subtotalPrice) }}</div>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <div>Discount:</div>
                    <div>20%</div>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <div>Total:</div>
                    <div>{{ formatPrice(cart._totalPrice) }}</div>
                  </div>
                </section>

                <section v-else>
                  <div class="d-flex justify-content-between mb-2">
                    <div>Total:</div>
                    <div>{{ formatPrice(cart._subtotalPrice) }}</div>
                  </div>
                </section>

                <button class="btn btn-primary d-block w-100 mt-4 mb-3" :disabled="isCheckingOut" @click="handleCheckout">
                  <LoadingIcon v-if="isCheckingOut" width="20" height="20" class="position-relative me-1" style="top: -1px;" />
                  <span>Checkout</span>
                </button>
                <div class="form-text">
                  You are agreeing to our <nuxt-link to="/termsandconditions">terms & conditions</nuxt-link> and <nuxt-link to="/privacy-policy">privacy policy</nuxt-link> when you continue to checkout
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
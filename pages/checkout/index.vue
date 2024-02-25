<script setup lang="ts">
  import { useAuthStore } from "~/store/auth";
  import { useCartStore } from "~/store/cart";
  import type { ApiResponse } from "~/types/ApiResponse";

  const { $auth } = useNuxtApp()
  const auth = useAuthStore();
  const cart = useCartStore();

  useHead({
    title: "Checkout"
  })

  // Hides the billing information section when this is true
  const isSameInformation = ref(true)

  const email = ref( auth._user?.email ? auth._user.email : '' );
  const additionalInfo = ref('');

  const deliveryFirstName = ref( auth._user?.first_name ? auth._user.first_name : '' );
  const deliveryLastName = ref( auth._user?.last_name ? auth._user.last_name : '' );
  const deliveryPhoneNumber = ref('');
  const deliveryAddressOne = ref('');
  const deliveryAddressTwo = ref('');
  const deliveryBarangay = ref('');
  const deliveryCity = ref('');
  const deliveryRegion = ref('Metro Manila')
  const deliveryZipCode = ref('');
  const deliveryCountry = ref('PH')

  const billingFirstName = ref( auth._user?.first_name ? auth._user.first_name : '' );
  const billingLastName = ref( auth._user?.last_name ? auth._user.last_name : '' );
  const billingPhoneNumber = ref('');
  const billingAddressOne = ref('');
  const billingAddressTwo = ref('');
  const billingBarangay = ref('');
  const billingCity = ref('');
  const billingRegion = ref('')
  const billingZipCode = ref('');
  const billingCountry = ref('');

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

  const handleCheckout = async () => {
    await fetchXSRFCookie();

    let body: {}

    if (isSameInformation.value) {
      body = {
        'cart_session': cart._cart_id,
        'email': email.value,

        'delivery_first_name': deliveryFirstName.value,
        'delivery_last_name': deliveryLastName.value,
        'delivery_email': email.value,
        'delivery_phone_number': deliveryPhoneNumber.value,
        'delivery_address_1': deliveryAddressOne.value,
        'delivery_address_2': deliveryAddressTwo.value,
        'delivery_barangay': deliveryBarangay.value,
        'delivery_city': deliveryCity.value,
        'delivery_region': deliveryRegion.value,
        'delivery_zip_code': deliveryZipCode.value,
        'delivery_country': deliveryCountry.value,
        'additional_info': additionalInfo.value,

        'billing_first_name': deliveryFirstName.value,
        'billing_last_name': deliveryLastName.value,
        'billing_email': email.value,
        'billing_phone_number': deliveryPhoneNumber.value,
        'billing_address_1': deliveryAddressOne.value,
        'billing_address_2': deliveryAddressTwo.value,
        'billing_barangay': deliveryBarangay.value,
        'billing_city': deliveryCity.value,
        'billing_region': deliveryRegion.value,
        'billing_zip_code': deliveryZipCode.value,
        'billing_country': deliveryCountry.value,
      }
    } else {
      body = {
        'cart_session': cart._cart_id,

        'billing_first_name': billingFirstName.value,
        'billing_last_name': billingLastName.value,
        'billing_email': email.value,
        'billing_phone_number': billingPhoneNumber.value,
        'billing_address_1': billingAddressOne.value,
        'billing_address_2': billingAddressTwo.value,
        'billing_barangay': billingBarangay.value,
        'billing_city': billingCity.value,
        'billing_region': billingRegion.value,
        'billing_zip_code': billingZipCode.value,
        'billing_country': billingCountry.value,

        'delivery_first_name': deliveryFirstName.value,
        'delivery_last_name': deliveryLastName.value,
        'delivery_email': email.value,
        'delivery_phone_number': deliveryPhoneNumber.value,
        'delivery_address_1': deliveryAddressOne.value,
        'delivery_address_2': deliveryAddressTwo.value,
        'delivery_barangay': deliveryBarangay.value,
        'delivery_city': deliveryCity.value,
        'delivery_region': deliveryRegion.value,
        'delivery_zip_code': deliveryZipCode.value,
        'delivery_country': deliveryCountry.value,
        'additional_info': additionalInfo.value,
      }
    }

    const result = await useFetchAPI<ApiResponse>('/checkout', {
      method: "POST",
      body: body
    })

    // Redirect to the checkout page
    if (result.status.value != "error") {
      const response = result.data.value?.data

      location.href = response.checkout_url
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

        <div class="col-sm-12 col-md-8">

          <div class="card bg-primary text-white p-2">
            <div class="card-body">
              <h5 class="fw-bold">Checkout</h5>

              <hr />

              <form>
                <section class="mt-4 mb-5">
                  <h5 class="fw-bold mb-4">Customer Details</h5>

                  <div class="row mb-4">
                    <div class="col">
                      <label class="form-label">First Name</label>
                      <input v-model="deliveryFirstName" type="text" class="form-control" placeholder="e.g. John" aria-label="First Name">
                    </div>
                    <div class="col">
                      <label class="form-label">Last Name</label>
                      <input v-model="deliveryLastName" type="text" class="form-control" placeholder="e.g. Doe" aria-label="Last Name">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <label class="form-label">Email</label>
                      <input v-model="email" type="email" class="form-control" placeholder="e.g. johndoe@gmail.com" aria-label="Email">
                    </div>
                    <div class="col">
                      <label class="form-label">Phone Number</label>
                      <div class="input-group">
                        <div class="input-group-text">+63</div>
                        <input v-model="deliveryPhoneNumber" type="text" class="form-control" placeholder="e.g. 9123456789">
                      </div>
                    </div>
                  </div>
                </section>

                <section class="mb-5">
                  <h5 class="fw-bold mb-4">Delivery Information</h5>

                  <div class="mb-4">
                    <label class="form-label">Street Address</label>
                    <input v-model="deliveryAddressOne" type="text" class="form-control" placeholder="e.g. 77 A. Roosevelt Avenue" aria-label="Street Address">
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Apartment, suite, unit, building, floor (optional)</label>
                    <input v-model="deliveryAddressTwo" type="text" class="form-control" placeholder="e.g. Rm. 101 Green Hills" aria-label="Address line 2">
                  </div>

                  <div class="row mb-4">
                    <div class="col-sm-12 col-md-4">
                      <label class="form-label">Barangay</label>
                      <input v-model="deliveryBarangay" type="text" class="form-control" placeholder="e.g. Barangay 310" aria-label="Barangay">
                    </div>

                    <div class="col-sm-12 col-md-4">
                      <label class="form-label">City</label>
                      <input v-model="deliveryCity" type="text" class="form-control" placeholder="e.g. Manila" aria-label="City">
                    </div>

                    <div class="col-sm-12 col-md-4">
                      <label class="form-label">Region</label>
                      <input type="text" class="form-control" placeholder="e.g. Manila" value="Metro Manila" disabled aria-label="Region">
                      <div class="form-text">We only deliver within Metro Manila</div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Zip code</label>
                    <input v-model="deliveryZipCode" type="number" class="form-control" placeholder="e.g. 1008" aria-label="Zip code">
                  </div>

                  <div class="mb-4">
                    <label class="mb-2">Additional information</label>
                    <textarea v-model="additionalInfo" class="form-control" placeholder="Give instructions to the delivery driver" style="height: 100px"></textarea>
                  </div>

                  <div class="form-check">
                    <input v-model="isSameInformation" class="form-check-input" type="checkbox">
                    <label class="form-check-label">
                      This information is the same as the billing information
                    </label>
                  </div>


                </section>

                <section v-show="!isSameInformation" class="mb-3">
                  <h5 class="fw-bold mb-4">Billing Information</h5>

                  <div class="row mb-4">
                    <div class="col">
                      <label class="form-label">First Name</label>
                      <input v-model="billingFirstName" type="text" class="form-control" placeholder="e.g. John" aria-label="First Name">
                    </div>
                    <div class="col">
                      <label class="form-label">Last Name</label>
                      <input v-model="billingLastName" type="text" class="form-control" placeholder="e.g. Doe" aria-label="Last Name">
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Phone Number</label>
                    <div class="input-group">
                      <div class="input-group-text">+63</div>
                      <input v-model="deliveryPhoneNumber" type="text" class="form-control" placeholder="e.g. 9123456789">
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Street Address</label>
                    <input v-model="billingAddressOne" type="text" class="form-control" placeholder="e.g. 77 A. Roosevelt Avenue" aria-label="Street Address">
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Apartment, suite, unit, building, floor (optional)</label>
                    <input v-model="billingAddressTwo" type="text" class="form-control" placeholder="e.g. Rm. 101 Green Hills" aria-label="Address line 2">
                  </div>

                  <div class="row mb-4">
                    <div class="col-sm-12 col-md-4">
                      <label class="form-label">Barangay</label>
                      <input v-model="billingBarangay" type="text" class="form-control" placeholder="e.g. Barangay 310" aria-label="Barangay">
                    </div>

                    <div class="col-sm-12 col-md-4">
                      <label class="form-label">City</label>
                      <input v-model="billingCity" type="text" class="form-control" placeholder="e.g. Manila" aria-label="City">
                    </div>

                    <div class="col-sm-12 col-md-4">
                      <label class="form-label">Region</label>
                      <input v-model="billingRegion" type="text" class="form-control" placeholder="e.g. Metro Manila" aria-label="Region">
                    </div>
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Zip code</label>
                    <input v-model="billingZipCode" type="number" class="form-control" placeholder="e.g. 1008" aria-label="Zip code">
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Country</label>
                    <input v-model="billingCountry" type="text" class="form-control" placeholder="e.g. Philippines" aria-label="Country">
                  </div>

                </section>
              </form>

            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">

          <div ref="intersection" />

          <section class="sticky-top" :style="{ 'top': isSticking ? '1.5rem' : '0' }">
            <div class="card p-2 mb-3">
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

                <button class="btn btn-primary d-block w-100 mt-4 mb-3" @click="handleCheckout">Checkout</button>
                <div class="form-text">
                  You are agreeing to our terms & conditions when you continue to checkout
                </div>
              </div>
            </div>

            <div v-if="!$auth.isLoggedIn()" class="alert alert-info" role="alert">
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
</style>
<script setup lang="ts">
  import { useCartStore } from "~/store/cart";

  const { $auth } = useNuxtApp()
  const cart = useCartStore();
</script>

<template>
    <section class="my-5">
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
                      <input type="text" class="form-control" placeholder="e.g. John" aria-label="First Name">
                    </div>
                    <div class="col">
                      <label class="form-label">Last Name</label>
                      <input type="text" class="form-control" placeholder="e.g. Doe" aria-label="Last Name">
                    </div>
                  </div>

                  <div class="row">
                    <div class="col">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" placeholder="e.g. johndoe@gmail.com" aria-label="Email">
                    </div>
                    <div class="col">
                      <label class="form-label">Phone Number</label>
                      <input type="text" class="form-control" placeholder="e.g. 09123456789" aria-label="Phone Number">
                    </div>
                  </div>
                </section>

                <section class="mb-3">
                  <h5 class="fw-bold mb-4">Delivery Information</h5>

                  <div class="mb-4">
                    <label class="form-label">Street Address</label>
                    <input type="text" class="form-control" placeholder="e.g. 77 A. Roosevelt Avenue" aria-label="Street Address">
                  </div>

                  <div class="mb-4">
                    <label class="form-label">Apartment, suite, unit, building, floor (optional)</label>
                    <input type="text" class="form-control" placeholder="e.g. Rm. 101 Green Hills" aria-label="Address line 2">
                  </div>

                  <div class="mb-4">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" placeholder="e.g. Manila" aria-label="City">
                  </div>

                  <div class="mb-4">
                    <label class="form-label">State/Province</label>
                    <input type="text" class="form-control" placeholder="e.g. Manila" value="Metro Manila" disabled aria-label="City">
                    <div class="form-text">For now, supported province is only Metro Manila</div>
                  </div>

                  <div class="mb-4">
                    <label class="mb-2">Additional information</label>
                    <textarea class="form-control" placeholder="Give instructions to the delivery driver" style="height: 100px"></textarea>
                  </div>

                </section>
              </form>

            </div>
          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <div class="card p-2 mb-3">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>

              <hr />

              <CartList :show-actions="false" />

              <hr />

              <section>
                <div class="d-flex justify-content-between mb-2">
                  <div>Subtotal:</div>
                  <div>&#8369;{{ formatPrice(cart._totalPrice) }}</div>
                </div>
                <div class="d-flex justify-content-between">
                  <div>Delivery Fee:</div>
                  <div>&#8369;{{ formatPrice(49.00) }}</div>
                </div>
              </section>
            </div>
          </div>

          <div v-if="!$auth.isLoggedIn()" class="alert alert-info" role="alert">
            You can easily access your order history when you have an account with us!
          </div>

        </div>
      </div>
    </section>
</template>

<style scoped lang="scss">

</style>
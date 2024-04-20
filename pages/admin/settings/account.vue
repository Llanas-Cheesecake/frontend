<script setup lang="ts">

</script>

<template>
  <section>
    <div class="d-flex align-items-center justify-content-between mb-5">
      <h4 class="fw-bold mb-0">
        Account Settings
      </h4>
    </div>

    <div class="d-flex flex-column flex-lg-row gap-0 flex-50 gap-lg-5">
      <div class="mb-5">
        <h5 class="fw-bold">
          Password
        </h5>

        <p class="mb-3">
          Change your account's password
        </p>
      </div>

      <div class="mb-5">
        <LazyChangePassword endpoint="/admin/settings/account/update-password" :reset-style="false" />

<!--        <div class="form-floating mb-4">-->
<!--          <input v-model="password.current"-->
<!--                 type="password"-->
<!--                 class="form-control mb-2"-->
<!--                 :class="{ 'is-invalid': validation.current_password.length > 0 }"-->
<!--                 :disabled="isSubmitting"-->
<!--                 placeholder=""-->
<!--          >-->
<!--          <label class="form-label">Current Password</label>-->

<!--          <small v-for="error in validation.current_password" class="invalid-feedback">-->
<!--            {{ error }}-->
<!--          </small>-->
<!--        </div>-->

<!--        <div class="form-floating mb-4">-->
<!--          <input v-model="password.new_password"-->
<!--                 type="password"-->
<!--                 class="form-control mb-2"-->
<!--                 :class="{ 'is-invalid': validation.new_password.length > 0 }"-->
<!--                 :disabled="isSubmitting"-->
<!--                 placeholder=""-->
<!--          >-->
<!--          <label class="form-label">New Password</label>-->

<!--          <small v-for="error in validation.new_password" class="invalid-feedback">-->
<!--            {{ error }}-->
<!--          </small>-->
<!--        </div>-->

<!--        <div class="form-floating mb-4">-->
<!--          <input v-model="password.confirm_password"-->
<!--                 type="password"-->
<!--                 class="form-control mb-2"-->
<!--                 :class="{ 'is-invalid': validation.new_password.length > 0 }"-->
<!--                 :disabled="isSubmitting"-->
<!--                 placeholder=""-->
<!--          >-->
<!--          <label class="form-label">Confirm Password</label>-->
<!--        </div>-->

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.flex-50 > div {
  flex: 1 1 calc(50% - 1rem);
}
</style>
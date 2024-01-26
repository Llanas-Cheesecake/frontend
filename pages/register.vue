<script setup lang="ts">
  import Swal from "sweetalert2";
  import { useAuthStore } from "../store/auth";

  const auth = useAuthStore()

  const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    c_password: ""
  })

  const handleForm = () => {
    auth.register(form)
        .then(() => {
          Swal.fire({
            title: "Email Verification",
            text: "An email confirmation request has been sent to your inbox. Please accomplish it to finish your account creation",
            icon: "info"
          })
        })
        .catch((err) => {
          Swal.fire({
            title: "Error occurred",
            text: "Something went wrong during registration",
            icon: "error"
          })
        })
  }
</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body">

      <img class="logo d-block mx-auto mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

      <h3 class="card-title text-center fw-bold mb-5">
        Sign Up
      </h3>

      <form @submit.prevent="handleForm">

        <div class="row gap-3 mb-4">
          <div class="col-auto">
            <label class="form-label">First Name</label>
            <input v-model="form.first_name" type="text" class="form-control">
          </div>
          <div class="col-auto">
            <label class="form-label">Last Name</label>
            <input v-model="form.last_name" type="text" class="form-control">
          </div>
        </div>

        <div class="row gap-3 mb-4">
          <div class="col-auto">
            <label class="form-label">Email address</label>
            <input v-model="form.email" type="email" class="form-control">
          </div>
          <div class="col-auto">
            <label class="form-label">Phone number</label>
            <input v-model="form.phone" type="text" class="form-control">
            <div class="form-text">
              Leave empty for now.
            </div>
          </div>
        </div>

        <div class="row gap-3 mb-4">
          <div class="col-auto">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control">
          </div>
          <div class="col-auto">
            <label class="form-label">Confirm Password</label>
            <input v-model="form.c_password" type="password" class="form-control">
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Sign In
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    background-color: var(--bg-primary);
    border-radius: 8px;
    color: var(--color-text-primary);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logo {
    width: 60px;
    height: 60px;
  }
</style>
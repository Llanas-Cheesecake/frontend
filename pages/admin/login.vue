<script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })

  const form = reactive({
    email: '',
    password: ''
  })

  const handleFormSubmit = () => {

  }
</script>

<template>
  <div class="card p-2">
    <div class="card-body">

      <h5 class="fw-bold mb-4">
        Login - Admin Panel
      </h5>

      <form @submit.prevent="handleFormSubmit">
        <div class="mb-4">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control">
        </div>

        <div class="mb-5">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control">
        </div>

        <button type="submit" class="btn btn-primary d-block w-100">
          Login
        </button>
      </form>

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
  }

  @media (max-width: 575px) {
    .card {
      width: 100%;
    }
  }
</style>
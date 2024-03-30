<script setup lang="ts">
  const route = useRoute();
  const errorMessage = ref("");

  // Get XSRF Token
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  await $fetch(baseUrl + '/sanctum/csrf-cookie', { credentials: 'include' })

  // Validate token
  const { data, pending, status } = await useFetchAPI('/verify-account', {
    lazy: true,
    server: false,
    method: "POST",
    body: {
      token: route.query.token
    },
    onResponse({ request, response }) {
      console.log(response)
    },
    onResponseError({ request, response }) {
      errorMessage.value = response._data.message
      console.log(response._data.message)
    }
  })

</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body position-relative">

      <section v-if="pending" class="centered both w-auto">
        <div class="d-flex align-items-center">
          <LoadingIcon />

          <span class="ms-2">Validating</span>
        </div>
      </section>

      <section v-if="status === 'success'" class="centered">
        <img class="logo d-block mx-auto mb-3" src="/icons/check-circle.svg" alt="Circled checked icon">

        <h3 class="card-title text-center fw-bold mb-4">
          Account Verified
        </h3>

        <p class="text-center mb-5">You may now login to your account</p>

        <nuxt-link to="/login" class="btn btn-primary d-block mx-auto">
          Login
        </nuxt-link>
      </section>

      <section v-if="status === 'error'" class="centered">
        <img class="logo d-block mx-auto mb-3" src="/icons/x-circle.svg" alt="Circled checked icon">

        <h3 class="card-title text-center fw-bold mb-4">
          {{ errorMessage }}
        </h3>

        <p class="text-center mb-5">
          Your link might be invalid or expired. Try requesting for a new one by logging in
        </p>

        <nuxt-link to="/" class="btn btn-primary d-block mx-auto">
          Go Home
        </nuxt-link>
      </section>


    </div>
  </div>
</template>

<style scoped lang="scss">
  .card {
    background-color: var(--bg-primary);
    border-radius: 8px;
    color: var(--color-text-primary);
    padding: 2rem!important;

    width: 100%;
    max-width: 500px;
    min-height: 400px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    //margin: 4rem auto;

    .card-body {
      padding: 0;
      .centered {
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        &.both {
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 576px) {
    .card {
      position: initial!important;
      top: initial!important;
      left: initial!important;
      transform: initial!important;
      margin: 4rem auto;
    }
  }
</style>
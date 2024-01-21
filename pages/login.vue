<script setup lang="ts">

</script>

<template>
  <div class="card p-3 shadow">
    <div class="card-body">

      <img class="logo d-block mx-auto mb-3" src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo">

      <h3 class="card-title text-center fw-bold mb-5">
        Sign In
      </h3>

      <form>
        <div class="mb-4">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control">
        </div>
        <div class="mb-5">
          <label class="form-label">Password</label>
          <input type="password" class="form-control">
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

    width: 500px;
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
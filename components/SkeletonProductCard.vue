<template>
  <div class="card">
    <div class="card-body">
      <div class="skeleton--image mb-3"></div>

      <section class="mb-4">
        <h5 class="skeleton--text mb-1" style="width: 80%;"></h5>

        <div class="d-flex align-items-center gap-2 mb-3">
          <p class="skeleton--text mb-0" style="width: 25%"></p>
        </div>

        <p class="skeleton--text mb-0" style="width: 20%"></p>
      </section>

      <div class="card-bottom d-flex align-items-center justify-content-between">
        <div class="skeleton--text" style="width: 10%"></div>
        <div class="skeleton--button" style="width: 20%"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .skeleton--image {
    animation: pulse-bg 1s infinite;
    background-color: #ddd;
    border-radius: 8px;
    height: 100%;
    min-height: 227px;
    width: 100%;
  }
  .skeleton--text {
    animation: pulse-bg 1s infinite;
    background-color: #ddd;
    border-radius: 8px;
    height: 16px;
    min-width: 100px;
  }

  .skeleton--button {
    animation: pulse-bg 1s infinite;
    background-color: #ddd;
    border-radius: 20px;
    height: 20px;
    padding: 12px 6px;
  }

  @keyframes pulse-bg {
    0% {
      background-color: #ddd;
    }
    50% {
      background-color: #d0d0d0;
    }
    100% {
      background-color: #ddd;
    }
  }
</style>
<script setup lang="ts">
</script>
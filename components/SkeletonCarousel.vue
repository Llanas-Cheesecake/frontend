<script setup lang="ts">

</script>

<template>
  <div class="skeleton-carousel mt-4 mt-md-5 mb-4 mb-md-5" />
</template>

<style scoped lang="scss">
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

  .skeleton-carousel {
    animation: pulse-bg 1s infinite;
    background-color: #ddd;
    border-radius: 8px;
    height: 200px;
    width: 100%;
  }

  @media (min-width: 768px) {
    .skeleton-carousel {
      height: 400px;
    }
  }
</style>
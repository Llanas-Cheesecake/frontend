<script setup lang="ts">

</script>

<template>
  <div class="skeleton-carousel my-5" />
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
    height: 400px;
    width: 100%;
  }
</style>
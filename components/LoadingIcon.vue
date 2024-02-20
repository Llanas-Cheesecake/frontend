<script setup lang="ts">
  const props = withDefaults(defineProps<{
    color: string
  }>(), {
    color: 'white'
  })
</script>

<template>
  <div class="d-inline">
    <img v-if="props.color === 'white'" id="loader" src="/icons/loader-white.svg" alt="Loading" width="20" />
    <img v-if="props.color === 'black'" id="loader" src="/icons/loader-black.svg" alt="Loading" width="20" />
  </div>
</template>

<style scoped lang="scss">
  #loader {
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
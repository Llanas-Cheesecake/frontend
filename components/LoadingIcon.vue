<template>
  <img id="loader" src="/icons/loader.svg" alt="Loading" width="20" />
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
<script setup lang="ts">
  const props = defineProps({
    color: {
      type: String,
      validator(value: string, props) {
        return ['white', 'black'].includes(value)
      },
      default: 'white'
    },
    width: {
      type: String,
      default: '24'
    },
    height: {
      type: String,
      default: '24'
    }
  })
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" id="loader" :width="props.width" :height="props.height" viewBox="0 0 24 24" fill="none" :stroke="props.color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader">
    <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
</template>

<style scoped lang="scss">
  #loader {
    animation: loading 2s linear infinite;
    transform-origin: center center;
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
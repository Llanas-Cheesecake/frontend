<script setup lang="ts">
  const props = defineProps<{
    link: string
  }>();

  const isHoveringBackButton = ref(false);

  const setHoverState = (state: boolean) => {
    isHoveringBackButton.value = state
  }
</script>

<template>
  <nuxt-link :to="link" class="btn btn-outline-primary" role="button" @mouseover="setHoverState(true)" @mouseout="setHoverState(false)">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="isHoveringBackButton ? 'white' : 'black'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
  </nuxt-link>
</template>

<style scoped lang="scss">

</style>
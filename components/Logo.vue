<script setup lang="ts">
import type {ApiResponse} from "~/types/ApiResponse";

const props = withDefaults(defineProps<{
    width?: string
    height?: string
  }>(), {
    width: '50',
    height: '50',
  });

  const logoUrl = ref('');

  const { data: result, error } = await useFetchAPI<ApiResponse>('/logo', { method: 'GET' });

  if (result.value) {
    logoUrl.value = result.value.data;
  }

  if (error.value) {
    console.log("Failed to fetch logo from server");

    logoUrl.value = '/_nuxt/images/llana_logo_m.png'
  }
</script>

<template>
  <img v-if="logoUrl.length > 0" :src="logoUrl" :width="props.width" :height="props.height" alt="Llana's Cheesecake" />
</template>

<style scoped lang="scss">
  img {
    border-radius: 6px;
  }
</style>
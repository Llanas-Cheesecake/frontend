<script setup lang="ts">
  const props = withDefaults(defineProps<{
    image: string
    text?: string|null
    button_text?: string|null
    button_link?: string|null
    width?: string
    height?: string
  }>(), {
    text: '',
    button_text: null,
    button_link: null,
    width: '1300px',
    height: '400px'
  });

  const panelStyle = reactive({
    // backgroundImage: 'url(' + props.image + ')',
    maxWidth: props.width,
    height: props.height
  })
</script>

<template>
  <div class="panel">
    <img :src="props.image" alt="promotional banner" :style="panelStyle" draggable="false" />
    <div v-if="props.text" class="overlay"></div>
    <div v-if="props.text" class="panel-text">
      <h3 :class="{
        'mb-0': !props.button_text,
        'mb-3': props.button_text
      }">
        {{ props.text }}
      </h3>
      <nuxt-link v-if="props.button_text" :to="props.button_link" class="btn btn-primary">
        {{ props.button_text }}
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panel {
  width: 100%;
  position: relative;
  background-size: cover!important;
  background: no-repeat center;
  border-radius: 12px;

  img {
    width: 100%;
    border-radius: 12px;
    max-height: 400px;
    //max-width: 1000px;
  }
  .overlay {
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    background: rgba(61, 59, 64, 0.5);
    background-size:cover;
  }
  .panel-text {
    position: absolute;
    top: 50%;
    left: 4rem;
    transform: translateY(-50%);
    width: 50%;

    //text-align: center;
    color: white;

    h3 {
      font-weight: 600;
      //text-transform: uppercase;
    }
  }
}

@media (max-width: 767px) {
  .panel-text {
    transform: translate(-50%, -50%)!important;
    left: 50%!important;
    text-align: center;
    h3 {
      font-size: 1.2rem;
    }
  }

  .panel .img {
    max-height: 300px;
  }
}

@media (max-width: 398px) {
  .panel-text {
    width: 70%!important;
  }
}
</style>
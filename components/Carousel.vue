<script setup lang="ts">
  import Flicking from "@egjs/vue3-flicking";
  import { Fade, Arrow, Pagination, AutoPlay } from "@egjs/flicking-plugins";

  const FlickPlugins = [
      new Fade(),
      new Arrow(),
      new AutoPlay({
        duration: 5000, direction: "NEXT", stopOnHover: true
      }),
      new Pagination({ type: "bullet" })
  ]
</script>

<template>
  <!-- TODO: Implements props here for banner promotions -->
  <Flicking
      class="flicking"
      :options="{ circular: true, duration: 500 }"
      :plugins="FlickPlugins"
  >
    <div class="panel">
      <img src="/images/banner1.png" />
      <div class="overlay"></div>
      <div class="panel-text">
        <h3>Only the best cheesecakes</h3>
      </div>
    </div>
    <div class="panel">
      <img src="https://naver.github.io/egjs-flicking/images/bg02.jpg" />
      <div class="overlay"></div>
      <div class="panel-text">
        <h3>Baked straight from the oven</h3>
      </div>
    </div>
    <div class="panel">
      <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />
      <div class="overlay"></div>
      <div class="panel-text">
        <h3>Limited discounts</h3>
      </div>
    </div>

    <template #viewport>
      <span class="flicking-arrow-prev is-thin"></span>
      <span class="flicking-arrow-next is-thin"></span>
      <div class="flicking-pagination"></div>
    </template>
  </Flicking>
</template>

<style scoped lang="scss">
  .panel {
    margin: 0 2rem;
    position: relative;
    img {
      border-radius: 0.5rem;
      width: 100%;
      height: 350px;
    }
    .overlay {
      border-radius: 0.5rem;
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
      left: 50%;
      transform: translate(-50%, -50%);
      width: auto;

      text-align: center;
      color: white;

      h3 {
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }
</style>
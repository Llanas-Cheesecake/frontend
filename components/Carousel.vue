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
      :firstPanelSize="'1300px'"
      :options="{ circular: true, duration: 500 }"
      :plugins="FlickPlugins"
  >
    <div class="panel" style="background-image: url('/images/banner1.png')">
<!--      <img src="/images/banner1.png" />-->
      <div class="overlay"></div>
      <div class="panel-text">
        <h3>Only the best cheesecakes</h3>
      </div>
    </div>
    <div class="panel" style="background-image: url('/images/banner2.png')">
<!--      <img src="/images/banner2.png" />-->
      <div class="overlay"></div>
      <div class="panel-text">
        <h3>Baked straight from the oven</h3>
      </div>
    </div>
    <div class="panel" style="background-image: url('https://naver.github.io/egjs-flicking/images/bg03.jpg')">
<!--      <img src="https://naver.github.io/egjs-flicking/images/bg03.jpg" />-->
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
    border-radius: 12px;
    margin: 0 2rem;
    position: relative;
    width: 1300px;
    height: 400px;
    background-size: cover!important;
    background: no-repeat center;

    img {
      width: 100%;
      height: 350px;
      //max-width: 1000px;
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
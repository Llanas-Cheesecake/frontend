<script setup lang="ts">
  definePageMeta({
    title: 'Home',
    meta: [
      { name: 'description', content: `Llana's Cheesecake offers a wide variety of pastry` } // TODO: SEO Management
    ]
  });
</script>

<template>
  <div>
    <Carousel class="my-5"/>

    <div class= "d-md-flex justify-content-center card-link">
      <nuxt-link to="/menu" class="menu">
        <div class="overlay"></div>
        <h3 class="card-title">Menu</h3>
      </nuxt-link>
      <nuxt-link to="/" class="custom-order">
        <div class="overlay"></div>
        <h3 class="card-title">Custom Orders</h3>
      </nuxt-link>
    </div>
    <div class= "d-md-flex justify-content-center card-link mb-5">
      <nuxt-link to="/" class="contact">
        <div class="overlay"></div>
        <h3 class="card-title">Contact Us</h3>
      </nuxt-link>
      <nuxt-link to="/about" class="about">
        <div class="overlay"></div>
        <h3 class="card-title">About Us</h3>
      </nuxt-link>
    </div>

<!--    <div class="w-75 h-75 d-flex justify-content-evenly ">-->
<!--      <a href=""><img class="mw-100 mh-100 panel_anim" src="~/assets/contact_panel.png" /> </a>-->
<!--      <a><img class="mw-100 mh-100 panel_anim" src="~/assets/about_panel.png" /></a>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
  .card-link {
    a {
      min-width: 350px;
      min-height: 350px;
      position: relative;
      transition: 0.3s;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100%;

      &.menu {
        background-image: url("/images/home-card-1.png");
      }
      &.custom-order {
        background-image: url("/images/home-card-2.png");
      }
      &.contact {
        background-image: url("/images/home-card-3.png");
      }
      &.about {
        background-image: url("/images/home-card-4.png");
      }

      &:hover {
        background-size: 105%;
        cursor: pointer;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        min-width: 100%;
        background: rgba(61, 59, 64, 0.5);
        background-size: cover;
      }

      .card-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-decoration: none;
        color: white;
        width: 100%;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  @media screen and (max-width: 767px) {
    .card-link {
      a {
        background-size: cover;
        display: block;
        min-width: 100%;
        &:hover {
          background-size: cover;
          cursor: pointer;
        }
      }
    }
  }
</style>
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

    <div class="row">
      <div class="col-sm-12 col-md-6 col-lg-3">
        <nuxt-link to="/menu/all" class="card shortcut menu p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              Menu
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <nuxt-link to="/menu/all" class="card shortcut custom-order p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              Custom Order
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <nuxt-link to="/menu/all" class="card shortcut contact p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              Contact Us
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-3">
        <nuxt-link to="/about" class="card shortcut about p-2">
          <div class="overlay"></div>
          <div class="card-body">
            <h4 class="fw-bold">
              About Us
            </h4>
            <div class="icon position-absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

<!--    <div class= "d-md-flex justify-content-center card-link">-->
<!--      <nuxt-link to="/menu" class="menu">-->
<!--        <div class="overlay"></div>-->
<!--        <h3 class="card-title">Menu</h3>-->
<!--      </nuxt-link>-->
<!--      <nuxt-link to="/" class="custom-order">-->
<!--        <div class="overlay"></div>-->
<!--        <h3 class="card-title">Custom Orders</h3>-->
<!--      </nuxt-link>-->
<!--    </div>-->
<!--    <div class= "d-md-flex justify-content-center card-link mb-5">-->
<!--      <nuxt-link to="/" class="contact">-->
<!--        <div class="overlay"></div>-->
<!--        <h3 class="card-title">Contact Us</h3>-->
<!--      </nuxt-link>-->
<!--      <nuxt-link to="/about" class="about">-->
<!--        <div class="overlay"></div>-->
<!--        <h3 class="card-title">About Us</h3>-->
<!--      </nuxt-link>-->
<!--    </div>-->

<!--    <div class="w-75 h-75 d-flex justify-content-evenly ">-->
<!--      <a href=""><img class="mw-100 mh-100 panel_anim" src="~/assets/contact_panel.png" /> </a>-->
<!--      <a><img class="mw-100 mh-100 panel_anim" src="~/assets/about_panel.png" /></a>-->
<!--    </div>-->
  </div>
</template>

<style scoped lang="scss">
  .card.shortcut {
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
    color: white;
    margin-bottom: 4rem;
    min-height: 200px;
    position: relative;
    text-decoration: none;
    .icon {
      bottom: 1rem;
      right: 1.5rem;
      transition: 0.3s;
    }
    &:hover .icon {
      right: 1rem;
    }
    .card-body {
      z-index: 2;
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
      z-index: 1;
    }
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
  }
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
<script setup lang="ts">
  const date = new Date();
  const currentYear = date.getFullYear();
</script>

<template>
  <footer class="d-flex align-items-center flex-column container-fluid py-3">
    <div class="d-flex justify-content-evenly">
      <a href=" https://web.facebook.com/llanaa.ph" target="_blank">
        <img class="w-25 my-3 mx-5" src="/images/fb_icon_v2_s.png" alt="Facebook icon" />
      </a>
      <a href="#">
        <img class="w-25 my-3 mx-5" src="/images/twitter_icon_v2_s.png" alt="Twitter / X icon" />
      </a>
      <a href="https://www.instagram.com/llanaa.ph" target="_blank">
        <img class="w-25 my-3 mx-5" src="/images/ig_icon_v2_s.png" alt="Instagram icon" />
      </a>
    </div>

    <div class="d-flex justify-content-evenly gap-3 my-3">
      <nuxt-link to="/termsandconditions">Terms and Conditions</nuxt-link>
    </div>

    <p class="font_white my-3">&copy; {{ currentYear }} Copyright: Llana's Cheesecake</p>
  </footer>
</template>

<style scoped lang="scss">
  footer {
    background-color: var(--bg-primary)!important;
    color: var(--color-text-primary)!important;

    min-height: 219px;

    a {
      color: white;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
<script setup lang="ts">
  const date = new Date();
  const currentYear = date.getFullYear();
</script>

<template>
  <footer class="mt-5">
    <div class="container">
      <div class="row g-5">
        <div class="col-sm-12 col-md-4">
          <h2 class="text-heading fw-bold">Llana's Cheesecake</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In id semper leo.</p>

          <div class="d-flex gap-3 mt-4">
            <!-- Facebook Icon -->
            <nuxt-link to="https://web.facebook.com/llanaa.ph" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </nuxt-link>
            <!-- END Facebook Icon -->

            <!-- Instagram Icon -->
            <nuxt-link to="https://www.instagram.com/llanaa.ph" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </nuxt-link>
            <!-- END Instagram Icon -->

            <!-- Twitter Icon -->
<!--            <nuxt-link to="/">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter">-->
<!--                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>-->
<!--              </svg>-->
<!--            </nuxt-link>-->
            <!-- END Twitter Icon -->

          </div>
        </div>
        <div class="col-sm-12 col-md-4">
          <h2 class="text-heading fw-bold">Quick Links</h2>

          <ul>
            <li class="mb-2">
              <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li class="mb-2">
              <nuxt-link to="/menu">Menu</nuxt-link>
            </li>
            <li class="mb-2">
              <nuxt-link to="/about">About</nuxt-link>
            </li>
            <li class="mb-2">
              <nuxt-link to="/termsandconditions">Terms and Conditions</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-sm-12 col-md-4">
          <h2 class="text-heading fw-bold">Contact Info</h2>

          <ul class="list-unstyled">
            <li class="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span class="ms-3">54 Scout Gandia Brgy. Laging Handa QC</span>
            </li>
            <li class="mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span class="ms-3">8470-6075</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span class="ms-3">llanaa.ph@gmail.com</span>
            </li>
          </ul>

        </div>
      </div>

      <hr class="mt-5" />

      <div class="py-3">
        <p class="font_white">&copy; {{ currentYear }} Copyright; Llana's Cheesecake</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
  footer {
    background-color: var(--bg-primary)!important;
    color: var(--color-text-primary)!important;

    min-height: 219px;

    a {
      color: var(--color-text-primary);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
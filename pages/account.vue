<script setup lang="ts">
  definePageMeta({
    middleware: ["authenticated"]
  })

  const route = useRoute();

  const currentCategory = computed(() => {
    let category = ""

    switch (route.name) {
      case "account-general":
        category = "Account Settings";
        break;
      case "account-order-history":
        category = "Order History";
        break;
      case "account-wishlist":
        category = "Wishlist";
        break;
    }

    return category;
  });
</script>

<template>
  <client-only>
    <Teleport to="#alt-nav">
      <AltNavbar :current-category="currentCategory" />
    </Teleport>
    <Teleport to="#offcanvas-section">
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-body">
          <div class="sidebar bg-primary">
            <ul class="nav flex-column">
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link to="/account/general" class="nav-link d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Account</span>
                </nuxt-link>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link to="/account/order-history" class="nav-link d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span>Order History</span>
                </nuxt-link>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link to="/account/wishlist" class="nav-link d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Wishlisted Items</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </client-only>

  <section>
    <div class="my-5">
      <div class="row">
        <div class="d-none d-md-block col-md-4 col-lg-3">

          <div class="sidebar bg-primary p-3">
            <h3 class="text-heading fw-bold">
              Settings
            </h3>
            <ul class="nav flex-column">
              <li class="nav-item">
                <nuxt-link to="/account/general" class="nav-link d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Account</span>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/account/order-history" class="nav-link d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-bag">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span>Order History</span>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/account/wishlist" class="nav-link d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>Wishlisted Items</span>
                </nuxt-link>
              </li>
            </ul>
          </div>

        </div>
        <div class="col-sm-12 col-md-8 col-lg-9">
          <NuxtPage />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
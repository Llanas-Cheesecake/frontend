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
                  <img src="/icons/user-white.svg" alt="User Icon" width="22" />
                  <span>Account</span>
                </nuxt-link>
              </li>
<!--              <li class="nav-item" data-bs-dismiss="offcanvas">-->
<!--                <nuxt-link to="/account/notifications" class="nav-link d-flex align-items-center gap-2">-->
<!--                  <img src="/icons/bell.svg" alt="User Icon" width="22" />-->
<!--                  <span>Notifications</span>-->
<!--                </nuxt-link>-->
<!--              </li>-->
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link to="/account/order-history" class="nav-link d-flex align-items-center gap-2">
                  <img src="/icons/shopping-bag-white.svg" alt="User Icon" width="22" />
                  <span>Order History</span>
                </nuxt-link>
              </li>
              <li class="nav-item" data-bs-dismiss="offcanvas">
                <nuxt-link to="/account/wishlist" class="nav-link d-flex align-items-center gap-2">
                  <img src="/icons/star-white.svg" alt="star Icon" width="22" />
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
            <h5>Settings</h5>
            <ul class="nav flex-column">
              <li class="nav-item">
                <nuxt-link to="/account/general" class="nav-link d-flex align-items-center gap-2">
                  <img src="/icons/user-white.svg" alt="User Icon" width="22" />
                  <span>Account</span>
                </nuxt-link>
              </li>
<!--              <li class="nav-item">-->
<!--                <nuxt-link to="/account/notifications" class="nav-link d-flex align-items-center gap-2">-->
<!--                  <img src="/icons/bell.svg" alt="User Icon" width="22" />-->
<!--                  <span>Notifications</span>-->
<!--                </nuxt-link>-->
<!--              </li>-->
              <li class="nav-item">
                <nuxt-link to="/account/order-history" class="nav-link d-flex align-items-center gap-2">
                  <img src="/icons/shopping-bag-white.svg" alt="User Icon" width="22" />
                  <span>Order History</span>
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link to="/account/wishlist" class="nav-link d-flex align-items-center gap-2">
                  <img src="/icons/star-white.svg" alt="star Icon" width="22" />
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
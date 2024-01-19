<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">

      <a class="navbar-brand" href="#">
        <img src="/images/llana_logo_m.png" alt="Llana's Cheesecake Logo" />
      </a>

      <div class="nav-content">

        <ul class="navbar-nav nav-centered">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link">Home</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/menu" class="nav-link">Menu</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/about" class="nav-link">About</nuxt-link>
          </li>
        </ul>

      </div>

      <div>
        <div class="ms-auto w-auto">
          <div class="nav-item dropdown d-inline-block px-3">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/icons/shopping-cart.svg" alt="Shopping Cart" />
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>

          <div class="nav-item dropdown d-inline-block px-3">
            <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/icons/user.svg" alt="Shopping Cart" />
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>

</script>

<style scoped lang="scss">
  .navbar {
    background-color: var(--bg-primary)!important;
    min-height: 76px;

    .navbar-brand img {
      width: 50px;
    }

    .nav-content {
      position: relative;
      min-height: 40px;

      .nav-item {
        padding: 0 1.5rem;
        .nav-link {
          color: var(--color-text-primary)!important;
          padding-left: 10px;
          padding-right: 10px;
          border-radius: 4px;

          &.router-link-exact-active {
            background-color: var(--color-text-primary);
            color: var(--bg-primary)!important;
            font-weight: bold;
          }

          &.disabled {
            color: var(--color-text-disabled)!important;
          }
        }
      }
    }

    .nav-centered {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }

  }
</style>
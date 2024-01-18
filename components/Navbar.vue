<template>
  <header>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light box-shadow col_theme_1 justify-content-between fixed-top">
      <div class="container-fluid">

        <div class="collapse d-none d-sm-block">
          <a class="navbar-brand">
            <img src="/images/llana_logo_m.png" class="w-60 ms-3"/>
          </a>
        </div>

        <button class="navbar-toggler justify-content-center w-100 my-2 border-2" type="button" data-bs-toggle="collapse" data-bs-target="#dbTogglerContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="d-flex mx-3 w-50 collapse d-none d-sm-inline-flex justify-content-center"></div>

        <div class="navbar-collapse collapse d-none d-sm-inline-flex justify-content-between">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="font_white mx-4 px-3 py-1 border-1 rounded text-decoration-none"><b>HOME</b></a>
            </li>
            <li class="nav-item">
              <a class="font_white mx-4 px-3 py-1 border-1 rounded text-decoration-none"><b>ABOUT</b></a>
            </li>
            <li class="nav-item">
              <a class="font_green bg-light mx-4 px-3 py-1 border-1 rounded text-decoration-none"><b>MENU</b></a>
            </li>
          </ul>
        </div>

        <div class="d-flex mx-3 w-50 collapse d-none d-sm-inline-flex justify-content-center"></div>


        <div class="d-flex mx-3 w-25 collapse d-none d-sm-inline-flex ">
          <a class="navbar-collapse collapse" ><img src="/images/cart_s.png" class="mx-3 w-50" /></a>
          <a class="navbar-collapse collapse" ><img src="/images/user_s.png" class="mx-3 w-50" /></a>
        </div>
      </div>

      <div class="collapse align-self-auto d-sm-none d-md-none d-lg-none d-xl-none flex-column bg-green text-center w-100" id="dbTogglerContent" data-bs-theme="dark">
        <ul class="navbar-nav">

          <a class="font_white link_white">
            <li class="nav-item py-2">
              <span class=" mx-4 px-3 py-1 border-1 rounded"><b>HOME</b></span>
            </li>
          </a>

          <a class="font_white link_white">
            <li class="nav-item py-2">
              <span class="mx-4 px-3 py-1 border-1 rounded"><b>ABOUT</b></span>
            </li>
          </a>

          <a class="font_white link_white">
            <li class="nav-item py-2">
              <span class=" mx-4 px-3 py-1 border-1 rounded"><b>MENU</b></span>
            </li>
          </a>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

</script>

<style scoped lang="scss">
  .navbar-brand im {

  }
</style>
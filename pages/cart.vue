<script setup lang="ts">
  definePageMeta({
    title: 'Menu',
    meta: [
      { name: 'description', content: `Llana's Cheesecake offers a wide variety of pastry` } // TODO: SEO Management
    ]
  });
</script>

<template>
  <h1>My Cart</h1>
  <hr class="linea">
  <div class="row">
    <div class="col">PRODUCT</div>
    <div class="col">PRICE</div>
    <div class="col">QTY</div>
    <div class="col">TOTAL</div>
    <div class="row main align-items-center">
      <div class="col-2"><img class="img-fluid" src="public/images/fb_icon_v2_s.png"></div>
        <div class="col-2">
            <div class="row">Sinless Cheesecake</div>
        </div>
        <div class="col-2">&#8369 100</div>
        
        <div class="col-2">
          <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
        </div>
        <div class="col-2">&#8369</div>
    </div>
    <div class="row main align-items-center">
      <div class="col-2"><img class="img-fluid" src="public/images/fb_icon_v2_s.png"></div>
        <div class="col-2">
            <div class="row">Sinless Cheesecake</div>
        </div>
        <div class="col-2">&#8369 100</div>
        
        <div class="col-2">
          <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a>
        </div>
        <div class="col-2">&#8369</div>
    </div>
    <hr class="lineb">
  </div>
  
</template>
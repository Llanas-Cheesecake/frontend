<script setup lang="ts">
  import type { Wishlist } from "~/types/Wishlist";
  import type {ApiResponse} from "~/types/ApiResponse";

  const wishlist = ref<Wishlist[]>([])

  const { data: result, pending, error } = await useFetchAPI<ApiResponse>('/wishlist', {
    method: "GET",
    server: false,
    onResponse({ response }) {
      const data = response._data.data.wishlist

      data.map((item: Wishlist) => {
        wishlist.value.push(item)
      })
    }
  })
</script>

<template>
  <section>
    <div class="card bg-primary text-white p-2">
      <div class="card-body">
        <h4 class="card-title fw-bold">Wishlisted Items</h4>
        <hr />

        <section v-if="pending">
          <loading-icon color="white" />
          <span class="ms-2">Loading wishlist</span>
        </section>

        <section v-else class="row">
          <div v-for="item in wishlist" class="col-12 col-lg-4">
            <ProductCard :product="item.product" />
          </div>

          <div v-if="wishlist.length === 0">
            No products were found on your wishlist.
          </div>

        </section>

      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// Color Palette
// https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff
//.product {
//  width: 200px;
//  height: 200px;
//  border-radius: 150px;
//  margin-top: 40px;
//  padding: 10px;
//}
//.content {
//  background-color: white;
//  padding: 10px;
//  margin: 40px;
//  border-radius: 20px;
//}
//
//.content h5 {
//  font-weight: bold;
//  text-align: center;
//  font-size: 30px;
//}
//
//.content p {
//  margin-top: 70px;
//  text-align: center;
//}
//
//.menuCard {
//  background-color: #77a042;
//  border-radius: 20px;
//  margin-top: 50px;
//  margin-bottom: 50px;
//  padding-bottom: 30px;
//}
//
//.menuHeader {
//  display: flex;
//  justify-content: space-between;
//  align-items: center;
//  border-bottom: white solid 5px;
//}
//
//.menuHeader div {
//  padding-top: 12px;
//}
//
//.menuHeaderContents {
//  margin-left: 20px;
//  margin-right: 20px;
//  margin-bottom: 0;
//  justify-content: space-between;
//  display: flex; /* Use flexbox */
//  align-items: center;
//  flex: 1;
//}
//
//.menuHeaderContents h3 {
//  color: white;
//  font-weight: bold;
//  padding-top: 10px;
//  cursor: default;
//}
//
//#homeAndName {
//  display: inline-flex;
//  padding-bottom: 10px;
//  justify-content: space-between;
//  vertical-align: middle;
//}
//
//#homeButton {
//  background-image: url("../icons/homeBtn.png");
//  background-size: 50px;
//  background-color: transparent;
//  background-repeat: no-repeat;
//  height: 52px;
//  width: 52px;
//  border: none;
//  outline: none;
//  margin-right: 12px;
//}
//
//#addMenuButton {
//  background-image: url("../icons/addMenu.png");
//  background-size: 50px;
//  background-color: transparent;
//  background-repeat: no-repeat;
//  height: 52px;
//  width: 52px;
//  border: none;
//  outline: none;
//}
//
//#sortDropDown {
//  color: white;
//  background-color: #77a042;
//  border: none;
//  outline: none;
//  font-weight: bold;
//  padding: 0 20px 0 20px;
//  border-radius: 5px;
//  font-size: 20px;
//  cursor: pointer;
//}
//
//#sortDropDown option {
//  font-weight: bold;
//  align-self: center;
//}
//
//.three-dots {
//  width: 50px;
//}
</style>

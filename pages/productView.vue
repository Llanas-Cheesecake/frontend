<script setup lang="ts">
definePageMeta({
  title: "productView",
  meta: [
    {
      name: "description",
      content: `Llana's Cheesecake offers a wide variety of pastry`,
    }, // TODO: SEO Management
  ],
});
</script>

<template>
  <div>
    <div class="itemCard">
      <div class="prodImgDiv">
        <img
          src="..\images\cheese.jpg"
          alt="the big cheese placeholder"
          class="productImage"
        />
      </div>
      <div class="productInfo">
        <h2 class="topProd">
          Test Cheesecake
          <div class="prodIcons">
            <input type="image" src="..\icons\heart.png" class="prodIcon" />
            <!-- <input type="image" src="..\icons\shareBtn.png" class="prodIcon" /> -->
          </div>
        </h2>

        <h3>
          <span class="star" star-status="false">★ </span>
          <span class="star" star-status="false">★ </span>
          <span class="star" star-status="false">★ </span>
          <span class="star" star-status="false">★ </span>
          <span class="star" star-status="false">★ </span>
          (reviews)
        </h3>
        <h3 id="prodPrice">₱</h3>

        <div class="qtyDiv">
          <input
            type="image"
            @click="buttonSubtract()"
            src="..\icons\qtyMinus.png"
            class="qtyIcon"
          />
          <span id="output-area">1</span>
          <input
            type="image"
            @click="buttonAdd()"
            src="..\icons\qtyAdd.png"
            class="qtyIcon"
          />
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div class="productInfoDiv">
          <button class="btnProd">ADD TO CART</button>
          <a class="btnProd" href="#">BUY NOW</a>
        </div>
      </div>
    </div>
    <div>
      <h2 class="reviewTab">REVIEWS</h2>
    </div>
    <div class="reviewArea">
      <div class="reviewItem">
        <div>
          <div class="reviewInfo">
            <div>
              <img src="..\images\cheese.jpg" alt="" class="reviewImg" />
            </div>
            <div>
              <h5>(name)</h5>
              <h6>(date)</h6>
            </div>
            <div class="reviewRating">
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
            </div>
          </div>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et lectus
        dictum, commodo metus vel, tincidunt quam. Fusce imperdiet velit at
        cursus consectetur. Integer tincidunt ex odio, eget fermentum neque
        iaculis a. Nullam elit nisi, lobortis id erat tincidunt, tempus.
      </div>
      <div class="reviewItem">
        <div>
          <div class="reviewInfo">
            <div>
              <img src="..\images\cheese.jpg" alt="" class="reviewImg" />
            </div>
            <div>
              <h5>(name)</h5>
              <h6>(date)</h6>
            </div>
            <div class="reviewRating">
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
              <span class="star" star-status="false">★ </span>
            </div>
          </div>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et lectus
        dictum, commodo metus vel, tincidunt quam. Fusce imperdiet velit at
        cursus consectetur. Integer tincidunt ex odio, eget fermentum neque
        iaculis a. Nullam elit nisi, lobortis id erat tincidunt, tempus.
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// Color Palette
// https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff
.itemCard {
  margin-top: 16px;
  width: 100%;
  height: 400px;
  background-color: #77a042;
}

.productImage {
  width: 600px;
  height: 400px;
}

.prodImgDiv {
  float: left;
}

.productInfo {
  padding: 32px;
  margin-left: 600px;
  color: #ffffff;
}

.productInfoDiv {
  text-align: center;
}

.topProd {
  display: flex;
}

.prodIcons {
  margin-left: auto;
  margin-right: 0;
}

.prodIcon {
  height: 40px;
  margin-left: 20px;
}

.qtyDiv {
  display: flex;
}

.qtyIcon {
  height: 35px;
}

#output-area {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 30px;
}

.btnProd {
  display: inline-block;
  border: transparent;
  color: black;
  background-color: #ffffff;
  padding: 20px;
  margin: 5px 80px;
  font-size: 12px;
  width: 140px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: 0.3s;
}

.btnProd:hover {
  background-color: #d7d7d7;
}

[star-status="true"] {
  color: #ffd47e;
}
[star-status="false"] {
  color: #ffffff;
}

.star {
  font-size: 34px;
}

//review
.reviewTab {
  background-color: #77a042;
  color: #ffffff;
  flex-wrap: wrap;
  margin-top: 30px;
  padding: 10px 160px;
  text-align: center;
  display: inline-block;
  border-radius: 50px;
}

.reviewArea {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  color: #ffffff;
  margin: 20px 0px;
}

.reviewItem {
  background-color: #77a042;
  padding: 20px;
  border-radius: 20px;
}

.reviewInfo {
  display: flex;
}

.reviewRating {
  margin-left: auto;
  margin-right: 0;
}

.reviewImg {
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-right: 0.5rem;
}
</style>

<script lang="ts">
export default {
  methods: {
    buttonAdd(): void {
      var qty = document.getElementById("output-area");
      if (qty) {
        var qtyAdd = parseInt(qty.innerText);
        var qtyAdded = qtyAdd + 1;
        qty.innerText = qtyAdded.toString();
      }
    },
    buttonSubtract(): void {
      var qty = document.getElementById("output-area");
      if (qty) {
        var qtySubt = parseInt(qty.innerText);
        var qtySubted = qtySubt - 1;
        if (qtySubted < 0) {
          qty.innerText = "0";
        } else {
          qty.innerText = qtySubted.toString();
        }
      }
    },
    setStarsToTrue(value: number): void {
      const starElements = document.querySelectorAll(".star");

      for (let i = 0; i < Math.min(value, starElements.length); i++) {
        const element = starElements[i] as HTMLElement;
        element.setAttribute("star-status", "true");
      }
    },
    setProdPrice(value: number): void {
      var priceElement = document.getElementById("prodPrice");
      if (priceElement) {
        priceElement.innerText = "₱" + value.toString();
      }
    },
  },
  mounted() {
    this.setStarsToTrue(3); //the number inserted here will be the average review ratings
    this.setProdPrice(100); //the number inserted here will be the price
  },
};
</script>

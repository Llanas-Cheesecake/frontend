<template>
  <div class="menuCard">
    <div class="menuHeader">
      <div class="menuHeaderContents">
        <div id="homeAndName">
          <a href="https://youtube.com" id="homeButton"></a>
          <h3>Wishlist</h3>
        </div>
        <button id="addMenuButton" @click="addClick"></button>

        <select v-model="sortby" id="sortDropDown">
          <option value="alphabetical">A-Z</option>
          <option value="reverseA">Z-A</option>
        </select>
      </div>
    </div>
    <div class="content row d-flex justify-content-center">
      <div class="col-lg-3 col-md-6">
        <Row class="chicken-pesto">
          <img
            src="/images/chicken-pesto.jpeg"
            class="product mx-auto d-block mt-4"
          />
        </Row>
      </div>
      <div class="col-lg-3 col-md-6">
        <row class="chicken-pesto">
          <p>Chicken Pesto Sandwich</p>
        </row>
      </div>
      <div class="col-lg-3 col-md-6">
        <Row class="chicken-pesto">
          <p>₱160</p>
        </Row>
      </div>
      <div class="col-lg-3 col-md-6">
        <Row>
          <img
            src="/images/dots.png"
            alt="dots"
            class="three-dots rounded mx-auto d-block mt-5"
          />
        </Row>
      </div>
    </div>
    <div class="content row d-flex justify-content-center">
      <div class="col-lg-3 col-md-6">
        <Row class="chicken-pesto">
          <img
            src="/images/matcha-cheesecake.jpeg"
            class="product mx-auto d-block mt-4"
          />
        </Row>
      </div>
      <div class="col-lg-3 col-md-6">
        <row class="chicken-pesto">
          <p>Matcha Cheesecake</p>
        </row>
      </div>
      <div class="col-lg-3 col-md-6">
        <Row class="chicken-pesto">
          <p>₱160</p>
        </Row>
      </div>
      <div class="col-lg-3 col-md-6">
        <Row>
          <img
            src="/images/dots.png"
            alt="dots"
            class="three-dots rounded mx-auto d-block mt-5"
          />
        </Row>
      </div>
    </div>

    <div class="content row d-flex justify-content-center">
      <div class="col-lg-3 col-md-6">
        <Row class="chicken-pesto">
          <img
            src="/images/iced-latte.png"
            class="product mx-auto d-block mt-4"
          />
        </Row>
      </div>
      <div class="col-lg-3 col-md-6">
        <row class="chicken-pesto">
          <p>Iced Latte</p>
        </row>
      </div>
      <div class="col-lg-3 col-md-6">
        <Row class="chicken-pesto">
          <p>₱130</p>
        </Row>
      </div>
      <div class="col-lg-3 col-md-6">
        <Row>
          <img
            src="/images/dots.png"
            alt="dots"
            class="three-dots rounded mx-auto d-block mt-5"
          />
        </Row>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Color Palette
// https://colors.muz.li/palette/77A042/59702e/f2ffda/e5ffb4/ffffff
.product {
  width: 200px;
  height: 200px;
  border-radius: 150px;
  margin-top: 40px;
  padding: 10px;
}
.content {
  background-color: white;
  padding: 10px;
  margin: 40px;
  border-radius: 20px;
}

.content h5 {
  font-weight: bold;
  text-align: center;
  font-size: 30px;
}

.content p {
  margin-top: 70px;
  text-align: center;
}

.menuCard {
  background-color: #77a042;
  border-radius: 20px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-bottom: 30px;
}

.menuHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: white solid 5px;
}

.menuHeader div {
  padding-top: 12px;
}

.menuHeaderContents {
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 0;
  justify-content: space-between;
  display: flex; /* Use flexbox */
  align-items: center;
  flex: 1;
}

.menuHeaderContents h3 {
  color: white;
  font-weight: bold;
  padding-top: 10px;
  cursor: default;
}

#homeAndName {
  display: inline-flex;
  padding-bottom: 10px;
  justify-content: space-between;
  vertical-align: middle;
}

#homeButton {
  background-image: url("../icons/homeBtn.png");
  background-size: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  border: none;
  outline: none;
  margin-right: 12px;
}

#addMenuButton {
  background-image: url("../icons/addMenu.png");
  background-size: 50px;
  background-color: transparent;
  background-repeat: no-repeat;
  height: 52px;
  width: 52px;
  border: none;
  outline: none;
}

#sortDropDown {
  color: white;
  background-color: #77a042;
  border: none;
  outline: none;
  font-weight: bold;
  padding: 0 20px 0 20px;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
}

#sortDropDown option {
  font-weight: bold;
  align-self: center;
}

.three-dots {
  width: 50px;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      search: "",
      sortby: "alphabetical",
      items: [
        //mock data goes here
      ],
    };
  },
  computed: {
    sortedItems() {
      return this.items.sort((a, b) => {
        if (this.sortby === "alphabetical") {
          return a.alphabetical.localeCompare(b.alphabetical);
        } else if (this.sortby === "reverseA") {
          return b.alphabetical.localeCompare(a.alphabetical);
        }
        return 0; // Default case
      });
    },
  },
};
</script>

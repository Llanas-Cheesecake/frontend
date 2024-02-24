<template>
  <div class="menuCard">
    <div class="menuHeader">
      <div class="menuHeaderContents">
        <div id="homeAndName">
          <a href="https://youtube.com" id="homeButton"></a>
          <h3>Order History</h3>
        </div>
        <button id="addMenuButton" @click="addClick"></button>

        <select v-model="sortby" id="sortDropDown">
          <option value="alphabetical">A-Z</option>
          <option value="reverseA">Z-A</option>
        </select>
      </div>
    </div>
    <div class="container">
      <div class="date-time">
        <p>12/16/17/2023 10:39am</p>
      </div>
      <div class="content row d-flex justify-content-center">
        <div class="col-lg-2 col-md-6">
          <h5>Items</h5>
          <Row class="chicken-pesto">
            <img src="/images/chicken-pesto.jpeg" class="product" />
          </Row>
          <Row>
            <img src="/images/iced-latte.png" class="product" />
          </Row>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Name</h5>
          <row class="chicken-pesto">
            <p>Chicken Pesto Sandwich</p>
          </row>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Quantity</h5>
          <Row class="chicken-pesto">
            <p>3</p>
          </Row>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Price</h5>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Order Information</h5>
          <Row>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Row>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <div class="date-time">
        <p>12/16/17/2023 10:39am</p>
      </div>
      <div class="content row d-flex justify-content-center">
        <div class="col-lg-2 col-md-6">
          <h5>Items</h5>
          <Row class="chicken-pesto">
            <img src="/images/chicken-pesto.jpeg" class="product" />
          </Row>
          <Row>
            <img src="/images/iced-latte.png" class="product" />
          </Row>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Name</h5>
          <row class="chicken-pesto">
            <p>Chicken Pesto Sandwich</p>
          </row>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Quantity</h5>
          <Row class="chicken-pesto">
            <p>3</p>
          </Row>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Price</h5>
        </div>
        <div class="col-lg-2 col-md-6">
          <h5>Order Information</h5>
          <Row>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  background-color: #77a042;
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 60px;
}

.main h3 {
  color: white;
  font-weight: bold;
}

.main hr {
  background-color: white;
  position: relative;
  top: 20px;
  border: none;
  height: 5px;
  margin-bottom: 50px;
  opacity: 100%;
  margin-left: -60px;
  margin-right: -60px;
}

.header {
  display: flex;
}

.home-icon {
  margin-right: 15px;
}

.date-time {
  background-color: #ffd47e;
  width: fit-content;
  height: fit-content;
  margin-bottom: -20px;
  padding: 7px;
}

.content {
  background-color: white;
  padding: 30px;
  margin: 0px;
}

.content h5 {
  font-weight: bold;
  text-align: center;
  font-size: 30px;
}

.content p {
  margin-top: 40px;
  text-align: center;
}

.product {
  width: 100%;
  align-items: center;
  border-radius: 100px;
  margin-top: 40px;
}

//update
.menuCard {
  background-color: #77a042;
  margin: 50px 0px;
  border-radius: 20px;
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

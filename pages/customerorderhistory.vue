<template>
  <div class="main">
    <div class="header">
      <div class="home-icon">
        <img src="/icons/home.svg" alt="Customize Order" />
      </div>
      <div class="title">
        <h3>Order History</h3>
      </div>
    </div>
    <hr />
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
</style>

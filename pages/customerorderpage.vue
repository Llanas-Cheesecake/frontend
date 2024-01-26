<template>
  <div class="main">
    <div class="header">
      <h4>Customize your order</h4>
    </div>
    <div class="content">
      <form>
        <label for="fname">1. Select size of the cake</label><br />
        <select id="cars" name="cars">
          <option value="volvo">1/2 slice (1-2 pax)</option>
          <option value="saab">1/2 slice (1-2 pax)</option>
          <option value="fiat">1/2 slice (1-2 pax)</option>
          <option value="audi">1/2 slice (1-2 pax)</option>
        </select>
        <br />
        <label for="lname">2. Tell us about the details</label><br />
        <input type="text" id="lname" name="lname" /><br />
        <label for="lname">2. Delivery details</label><br />
        <input type="text" id="name" name="name" /><br />
        <label for="lname">2. Delivery Date and Time</label><br />
        <input type="text" id="ame" name="ame" /><br />
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  background-color: #77a042;
  border-radius: 15px;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 60px;
}

.main h4 {
  color: white;
  font-weight: bold;
}

.content {
  text-align: center !important;
  background-color: #d9d9d9;
  border-radius: 15px;
  padding: 30px;
  margin-top: 40px;
}
</style>

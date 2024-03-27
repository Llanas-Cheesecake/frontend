<script setup lang="ts">

</script>

<template>
  <div class="main">
    <div class="card">
      <h2>Customize your order</h2>
      <div class="formBox">
        <form>
          <div class="row mb-4">
            <h4 class="fw-bolder">1. Select the size of your cake</h4>
            <div class="col">
              <div class="form-floating">
                <select class="form-select">
                  <option selected disabled>Choose a category</option>
                  <option>1/2 (1-2 pax)</option>
                  <option>8"</option>
                  <option>6"</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <h4 class="fw-bolder">2. Tell us about the order</h4>
            <div class="col">
              <div class="form-floating">
                <textarea class="form-control" id="details" type="text" placeholder="Flavor, Message on cake, Additional detailing, etc."></textarea>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <h4 class="fw-bolder">3. Delivery Details</h4>
            <div class="col">
              <div class="form-floating">
                <input class="form-control" placeholder="e.g. johndoe@gmail.com" aria-label="Email">
              </div>
            </div>
          </div>

          <div class="row d-flex justify-content-center">
            <button id="custOrdSubmit" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  border-radius: 10px;
  margin-top: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card{
  background-color: #77a042;
  width: 640px;
  padding: 20px 40px 20px 40px;
}

h2{
  font-family: "Inter", sans-serif;
  font-weight: bolder;
  color: #FFFFFF;
}

.formBox{
  margin-top: 12px;
  color: #FFFFFF;
  flex-wrap: wrap;
  max-height: 100vh;
}

.form-select{
  padding-top: 8px;
  background-color: #658838;
  border: 1px solid #476028;
  color: #FFFFFF;
  font-size: 18px;
}

#details{
  resize: none;
  padding-top: 8px;
}
textarea::placeholder {
  color: #476028 !important;
}

#custOrdSubmit{
  font-size: 20px;
  width: 140px;
  height: 60px;
  border-radius: 8px;
  border: 1px solid #000;
  color: #fff;
  background-color: #59702e;
}
#custOrdSubmit:hover{
  color: #e5ffb4;
}
</style>
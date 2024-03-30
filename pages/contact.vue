<script setup lang="ts">

</script>

<template>
  <div class="main">
    <div class="card">
      <h2>Contact Us</h2>
      <div class="formBox">
        <form>
          <div class="row mb-4">
            <div class="col">
              <div class="form-floating">
                <input type="text" class="form-control" placeholder="e.g. John" aria-label="First Name">
                <label class="form-label">First Name</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input class="form-control" placeholder="e.g. Doe" aria-label="Last Name">
                <label class="form-label">Last Name</label>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-floating">
                <input class="form-control" placeholder="e.g. johndoe@gmail.com" aria-label="Email">
                <label class="form-label">Email</label>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <div class="form-floating">
                <textarea class="form-control" id="tellUs" type="text" placeholder="write it down here" aria-label="textarea"></textarea>
                <label class="form-label" id="textTell">Tell us about it...</label>
              </div>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <button id="contactSubmit" type="submit">Submit</button>
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
  height: 100vh;
}

.card{
  background-color: #77a042;
  width: 640px;
  padding: 20px 40px 20px 40px;
  height: 100vh;
  overflow: auto;
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
#tellUs{
  height: 380px;
  resize: none;
}
#textTell{
  display: block;
}
#contactSubmit{
  font-size: 20px;
  width: 140px;
  height: 60px;
  border-radius: 8px;
  border: 1px solid #000;
  color: #fff;
  background-color: #59702e;
}
#contactSubmit:hover{
  color: #e5ffb4;
}

</style>
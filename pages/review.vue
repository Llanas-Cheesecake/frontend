<script setup lang="ts">
definePageMeta({
  title: "Review",
  meta: [
    {
      name: "description",
      content: `Llana's Cheesecake offers a wide variety of pastry`,
    }, // TODO: SEO Management
  ],
});
</script>

<template>
  <div class="card">
    <img src="\images\reviewPlacehold.png" />
    <h2>Slime</h2>
    <div class="rate">
      <input type="radio" id="star5" name="rate" value="5" />
      <label for="star5" title="text">5 stars</label>
      <input type="radio" id="star4" name="rate" value="4" />
      <label for="star4" title="text">4 stars</label>
      <input type="radio" id="star3" name="rate" value="3" />
      <label for="star3" title="text">3 stars</label>
      <input type="radio" id="star2" name="rate" value="2" />
      <label for="star2" title="text">2 stars</label>
      <input type="radio" id="star1" name="rate" value="1" />
      <label for="star1" title="text">1 star</label>
    </div>
    <div class="review">
      <h6>Tell us more!</h6>
      <textarea placeholder="How did you like your food?"></textarea>
      <div class="flex-parent jc-center">
        <button class="button" style="background-color: black; color: white">
          Submit
        </button>
        <button class="button" style="background-color: white; color: black">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: #77a042;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
  margin-bottom: 4%;
  display: flex;
  justify-content: center;
  width: 50%;
}
.card img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  margin-top: 5%;
}
.card h2 {
  padding-top: 2%;
  text-align: center;
}
.review {
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  margin-bottom: 5%;
}
.review textarea {
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: auto;
  padding: 2%;
  width: 100%;
}
.review button {
  border: none;
  width: 30%;
  height: 50px;
  text-align: center;
  display: inline-block;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2%;
  cursor: pointer;
}
.flex-parent {
  display: flex;
}

.jc-center {
  justify-content: center;
}

button.margin-right {
  margin-right: 20px;
}
* {
  margin: 0;
  padding: 0;
}
.rate {
  float: left;
  height: 46px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
}
.rate:not(:checked) > input {
  position: absolute;
  top: -9999px;
}
.rate:not(:checked) > label {
  float: right;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}
.rate:not(:checked) > label:before {
  content: "★ ";
}
.rate > input:checked ~ label {
  color: #ffc700;
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
  color: #deb217;
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
  color: #c59b08;
}
</style>

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
    <div style="text-align: center">Star</div>
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
</style>

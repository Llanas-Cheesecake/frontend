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
  <h1>Review</h1>
  <div class="card">
    <img src="public\images\reviewPlacehold.png" class="image" />
    <h2>Slime</h2>
  </div>
</template>

<style scoped lang="scss">
.card {
  background-color: #3a5b3e;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.card img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  padding-top: 10%;
}
.card h2 {
  padding-top: 5%;
  text-align: center;
}
</style>

<script setup lang="ts">
definePageMeta({
  title: "Menu",
  meta: [
    {
      name: "description",
      content: `Llana's Cheesecake offers a wide variety of pastry`,
    }, // TODO: SEO Management
  ],
});
</script>

<template>
  <div class="review-container">
    <h2>Reviews</h2>

    <div class="cards">
      <div class="card">
        <div class="card-top">
          <div class="name">
            <div class="img one" alt="">VT</div>
            <p>Vincent Tampos</p>
            <ul class="email">
              vincenttampos@gmail.com
            </ul>
          </div>
        </div>

        <div class="card-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            consequuntur, impedit ullam provident deserunt repellendus fuga
            totam exercitationem minima molestias?
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card-top">
          <div class="name">
            <div class="img one" alt="">VT</div>
            <p>Vincent Tampos</p>
            <ul class="email">
              vincenttampos@gmail.com
            </ul>
          </div>
        </div>

        <div class="card-content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            consequuntur, impedit ullam provident deserunt repellendus fuga
            totam exercitationem minima molestias?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

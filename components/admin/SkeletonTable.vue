<script setup lang="ts">
  const dummies = ref(Array.from(Array(10).fill(0)));
</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <table class="table table-striped table-responsive w-100 mb-0">
        <thead>
          <tr>
            <th scope="col">
              <div class="skeleton--text"></div>
            </th>
            <th scope="col">
              <div class="skeleton--text"></div>
            </th>
            <th scope="col">
              <div class="skeleton--text"></div>
            </th>
            <th scope="col">
              <div class="skeleton--text"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dummy in dummies" :key="dummy">
            <td>
              <div class="skeleton--text"></div>
            </td>
            <td>
              <div class="skeleton--text"></div>
            </td>
            <td>
              <div class="skeleton--text"></div>
            </td>
            <td>
              <div class="skeleton--text"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .skeleton--text {
    animation: pulse-bg 1s infinite;
    background-color: #ddd;
    border-radius: 8px;
    height: 16px;
    min-width: 100px;
  }

  @keyframes pulse-bg {
    0% {
      background-color: #ddd;
    }
    50% {
      background-color: #d0d0d0;
    }
    100% {
      background-color: #ddd;
    }
  }
</style>
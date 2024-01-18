<template>
  <div>
    <Navbar />
    <div style="margin-top: 68px;"></div>
    <h1>test</h1>
  </div>
</template>

<script setup lang="ts">
  const hello = ref("world")
  const world = reactive([]) //

  const clickMe = function () {
    hello.value = "foobar"
  }
</script>
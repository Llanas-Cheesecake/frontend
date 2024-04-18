<script setup lang="ts">
  import SkeletonProductList from "~/components/SkeletonProductList.vue";

  const sortedBy = ref('default')
</script>

<template>
  <section>

    <!-- Top Buttons -->
    <div class="col-sm-12 col-md-4">
      <select class="form-select" aria-label="Sort By" v-model="sortedBy">
        <option value="default">Alphabet: A-Z</option>
        <option value="best-seller">Best sellers</option>
        <option value="price-max-to-min">Price: High to Low</option>
        <option value="price-min-to-max">Price: Low to High</option>
      </select>
    </div>
    <!-- END Top Buttons -->

    <!-- Products -->
    <Suspense timeout="0">
      <LazyProductList :key="sortedBy" :sorted-by="sortedBy" />

      <template #fallback>
        <SkeletonProductList />
      </template>
    </Suspense>
    <!-- END Products -->

  </section>
</template>

<style scoped lang="scss">
  .form-select {
    background: white;
    border: 1px solid var(--bs-border-color-translucent);
    color: var(--color-text-primary);
    &:focus, &:active {
      background: white;
    }
  }
</style>
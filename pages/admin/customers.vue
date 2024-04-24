<script setup lang="ts">
  import SkeletonTable from "~/components/admin/SkeletonTable.vue";

  definePageMeta({
    middleware: ['authenticated-admin'],
    layout: 'admin'
  })
</script>

<template>
  <section class="dashboard">
    <Suspense timeout="0">
      <AdminDiscountVerificationTable />

      <template #fallback>
        <SkeletonTable />
      </template>
    </Suspense>
  </section>
</template>
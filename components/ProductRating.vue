<script setup lang="ts">
  import vue3StarRatings from "vue3-star-ratings";
  import type { ProductRating } from "~/types/Product";

  const props = defineProps<{
    rating: ProductRating
  }>()
</script>

<template>
  <section class="card bg-primary text-white p-2">
    <div class="card-body">

      <div class="d-flex align-items-center gap-3">
        <img class="reviewer-photo"
             :src="`https://ui-avatars.com/api/?name=${ props.rating.reviewer_name }&size=50`"
             alt="Reviewer Photo"
        />
        <div class="flex-fill">
          <p class="mb-2">{{ props.rating.reviewer_name }}</p>
          <NuxtTime :datetime="props.rating.published_at" month="long" day="numeric" year="numeric" />
        </div>
        <div>
          <client-only>
            <vue3-star-ratings v-model="props.rating.rating" star-size="24" disable-click />
          </client-only>
        </div>
      </div>

      <h5 class="fw-bold mt-4">{{ props.rating.headline }}</h5>
      <p class="mb-0">{{ props.rating.review }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .reviewer-photo {
    border-radius: 50%;
  }
</style>
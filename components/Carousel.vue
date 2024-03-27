<script setup lang="ts">
  import Flicking from "@egjs/vue3-flicking";
  import { Fade, Arrow, Pagination, AutoPlay } from "@egjs/flicking-plugins";
  import type { Promotion } from "~/types/Promotion";
  import type { ApiResponse } from "~/types/ApiResponse";

  const FlickPlugins = [
      new Fade(),
      new Arrow(),
      new AutoPlay({
        duration: 10000, direction: "NEXT", stopOnHover: true
      }),
      new Pagination({ type: "bullet" })
  ];

  const promotions = ref<Promotion[]>([]);

  const { data: result, error } = await useFetchAPI<ApiResponse>('/promotions', {
    method: "GET"
  });

  if (result.value) {
    const payload = result.value.data;

    promotions.value = [...payload];
  }

  if (error.value) {
    // Handle errors
  }
</script>

<template>
  <section>
    <div v-if="promotions.length > 0">
      <Flicking
          class="flicking"
          :options="{ circular: true, duration: 500 }"
          :plugins="FlickPlugins"
      >
        <CarouselPanel v-for="(promotion, index) in promotions"
                       :key="index"
                       :image="promotion.image"
                       :text="promotion.text"
                       :button_text="promotion.button_text"
                       :button_link="promotion.button_link"
                       width="1300px"
                       height="400px"
        />

        <template #viewport>
          <span class="flicking-arrow-prev is-thin"></span>
          <span class="flicking-arrow-next is-thin"></span>
          <div class="flicking-pagination"></div>
        </template>
      </Flicking>
    </div>

  </section>
</template>

<style scoped lang="scss">
  .flicking {
    .flicking-arrow-prev, .flicking-arrow-next {
      opacity: 0;
      transition: 0.3s;
    }
    &:hover {
      .flicking-arrow-prev, .flicking-arrow-next {
        opacity: 1;
      }
    }
  }
</style>
<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";
  import vue3StarRatings from "vue3-star-ratings";
  import type { ApiResponse } from "~/types/ApiResponse";

  const { useToast } = Toast;
  const toast = useToast();

  definePageMeta({
    middleware: ['authenticated']
  })

  const route = useRoute();
  const slug = route.params.slug;

  const product = ref({
    product_id: null,
    name: '',
    description: '',
    thumbnail: ''
  })

  const { data: result, error } = await useFetchAPI<ApiResponse>(`/products/${slug}/mini`, { method: "GET" });

  if (result.value) {
    const payload = result.value.data
    product.value = { ...payload }
  }

  const isSubmittingForm = ref(false);

  const rating = ref(0);
  const headline = ref('');
  const review = ref('');
  const isNameHidden = ref(false);

  const setRating = (value: number) => {
    rating.value = value
  }

  const handleSubmitReview = async () => {
    isSubmittingForm.value = true;

    const { data: result, error } = await useFetchAPI<ApiResponse>(`/review/create`, {
      method: "POST",
      body: {
        product_id: product.value.product_id,
        rating: rating.value,
        headline: headline.value,
        review: review.value,
        is_name_hidden: isNameHidden.value
      }
    });

    if (result.value) {
      toast.success("Thank you for your review!")
      navigateTo(`/products/${ slug }`);
    }

    // Regardless of result, set loading indicator to false
    if (result.value || error.value) {
      isSubmittingForm.value = false;
    }
  }
</script>

<template>
  <section class="card bg-primary text-white p-2 mx-auto my-5">
    <div class="card-body">

      <h5 class="fw-bold mb-4">Give Review</h5>

      <!-- Product Card -->
      <section class="card bg-primary text-white mb-4">
        <div class="card-body">
          <div class="d-flex align-items-center gap-3">
            <img class="product-image" :src="product.thumbnail" alt="product name" />
            <div>
              <h5 class="fw-bold mb-1">{{ product.name }}</h5>
              <p class="mb-0">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </section>
      <!-- END Product Card -->

      <!-- Review Form -->
      <section class="card bg-primary text-white">
        <div class="card-body">

          <div class="d-flex align-items-center gap-3">
            <div class="star-rating" :class="{ selected: rating === 1 }" @click="setRating(1)">
              <img v-if="rating === 1" src="/icons/star-black.svg" alt="star icon" />
              <img v-else src="/icons/star-white.svg" alt="star icon" />
              <p class="mb-0 mt-2">1</p>
            </div>
            <div class="star-rating" :class="{ selected: rating === 2 }" @click="setRating(2)">
              <img v-if="rating === 2" src="/icons/star-black.svg" alt="star icon" />
              <img v-else src="/icons/star-white.svg" alt="star icon" />
              <p class="mb-0 mt-2">2</p>
            </div>
            <div class="star-rating" :class="{ selected: rating === 3 }" @click="setRating(3)">
              <img v-if="rating === 3" src="/icons/star-black.svg" alt="star icon" />
              <img v-else src="/icons/star-white.svg" alt="star icon" />
              <p class="mb-0 mt-2">3</p>
            </div>
            <div class="star-rating" :class="{ selected: rating === 4 }" @click="setRating(4)">
              <img v-if="rating === 4" src="/icons/star-black.svg" alt="star icon" />
              <img v-else src="/icons/star-white.svg" alt="star icon" />
              <p class="mb-0 mt-2">4</p>
            </div>
            <div class="star-rating" :class="{ selected: rating === 5 }" @click="setRating(5)">
              <img v-if="rating === 5" src="/icons/star-black.svg" alt="star icon" />
              <img v-else src="/icons/star-white.svg" alt="star icon" />
              <p class="mb-0 mt-2">5</p>
            </div>
          </div>

          <form @submit.prevent="handleSubmitReview">

            <div class="form-floating my-4">
              <input v-model="headline" type="text" class="form-control" placeholder="Brief title of your review" aria-label="Headline">
              <label>Headline</label>
            </div>

            <div class="form-floating mb-4">
              <textarea v-model="review" class="form-control" placeholder="Leave your review here" id="floatingTextarea2" style="height: 100px"></textarea>
              <label for="floatingTextarea2">Review</label>
            </div>

            <div class="form-check mb-4">
              <input v-model="isNameHidden" class="form-check-input" type="checkbox" value="" id="hideName">
              <label class="form-check-label" for="hideName">
                Do not show my full name (e.g J**n D*e)
              </label>
            </div>

            <div class="d-flex gap-3">
              <nuxt-link :to="`/products/${slug}`" class="btn btn-primary d-block w-50" role="button">
                Cancel
              </nuxt-link>
              <button type="submit" class="btn btn-secondary d-block w-50" :disabled="pending">
                Submit review
              </button>
            </div>

          </form>

        </div>
      </section>
      <!-- END Review Form -->

    </div>
  </section>
</template>

<style scoped lang="scss">
  .form-floating > .form-control:not(:placeholder-shown) ~ label::after,
  .form-floating > .form-control:focus ~ label::after {
    background-color: transparent;
    margin-bottom: 5px;
  }

  .btn {
    border-radius: 8px;
  }

  .card {
    .product-image {
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.16), 0 2px 4px rgba(0,0,0,0.23);
      width: 80px;
    }

    .star-rating {
      background-color: rgba(0,0,0,0.2);
      border-radius: 8px;
      border: 2px solid var(--bg-primary);
      cursor: pointer;
      flex-grow: 1;
      flex-basis: 0;
      min-width: 0;
      min-height: 100%;
      padding: 0.5rem;
      text-align: center;
      transition: 0.2s;
      &.selected {
        background-color: var(--bg-secondary);
        border: 2px solid color-mix(in srgb, var(--bg-primary), #000 30%);
        color: color-mix(in srgb, var(--btn-bg-secondary), #000 65%);
        font-weight: bold;
      }
      p {
        font-size: 0.8rem;
      }
    }
  }

  @media (min-width: 768px) {
    .card {
      max-width: 650px;
    }
  }
</style>

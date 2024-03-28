<script setup lang="ts">
  import { VueFinalModal } from "vue-final-modal";
  import type { OrderItem } from "~/types/Order";

  const props = defineProps<{
    order_id: string,
    items: OrderItem[]
  }>();

  const emit = defineEmits<{
    (e: 'cancel'): void
  }>();
</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info">
                <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>

            <div class="mb-4">
              <h5 class="fw-bold mb-2">
                Ordered Items
              </h5>
              <small>
                #{{ props.order_id }}
              </small>
            </div>

            <div v-if="props.items.length === 0" class="card">
              <div class="card-body">
                No items found on this order. It might have been force deleted.
              </div>
            </div>

            <div v-for="item in props.items" class="card mb-3">
              <div class="card-body d-flex align-items-center gap-3">
                <img class="rounded" :src="item.product.thumbnail" :alt="item.product.name" width="60" height="60" />

                <div class="flex-fill">
                  <p class="mb-0">{{ item.product.name }}</p>
                  <small>{{ item.product.category }}</small>
                </div>

                <div>
                  x{{ item.quantity }}
                </div>

              </div>
            </div>



            <div class="d-flex gap-2 mt-5">
              <button type="button" class="btn btn-outline-primary" @click="emit('cancel')">
                OK
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">
  .icon {
    background-color: rgba(111, 111, 111, 0.2);
    box-shadow: 0 0 6px 4px rgba(1, 1, 1, 0.14);
    border-radius: 50%;
    display: inline-block;
    margin-bottom: 1rem;
    padding: 0.6rem;

    svg {
      position: relative;
      top: -1px;
    }
  }
</style>
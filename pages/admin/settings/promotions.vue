<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import {ModalCreatePromotion, ModalDeletePromotion, ModalEditPromotion} from "#components";

  import type { Promotion } from "~/types/Promotion";
  import type { ApiResponse } from "~/types/ApiResponse";

  const promotions = ref<Promotion[]>([]);

  // Fetch promotions
  const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/settings/promotions', {
    method: "GET"
  });

  if (result.value) {
    const payload = result.value.data;

    promotions.value = [...payload];
  }

  if (error.value) {
    // Handle errors
  }

  // END Fetch promotions

  const createModal = useModal({
    component: ModalCreatePromotion,
    attrs: {
      onNewPromotion(promotion: Promotion) {
        promotions.value = [...promotions.value, promotion];
        createModal.close();
      },
      onCancel() {
        createModal.close()
      }
    }
  });

  const promotionToEdit = ref<Promotion>();
  const promotionIdToDelete = ref(0);

  const openEditModal = (promotion: Promotion) => {
    promotionToEdit.value = promotion;
    editModal.open();
  }

  const editModal = useModal({
    component: ModalEditPromotion,
    attrs: {
      promotion: promotionToEdit,
      onUpdatePromotion(promotion: Promotion) {
        const index = promotions.value.findIndex((item) => {
          return item.id === promotion.id
        });

        promotions.value[index] = promotion;

        editModal.close()
      },
      onCancel() {
        editModal.close()
      }
    }
  });

  const openDeleteModal = (id: number) => {
    promotionIdToDelete.value = id;

    if (promotionIdToDelete.value === 0) return;

    deleteModal.open();
  }

  const deleteModal = useModal({
    component: ModalDeletePromotion,
    attrs: {
      promotion_id: promotionIdToDelete,
      onConfirm(promotion_id: number) {
        promotions.value = promotions.value.filter((item) => {
          return item.id !== promotion_id
        })
        deleteModal.close();
      },
      onCancel() {
        deleteModal.close();
      }
    }
  })
</script>

<template>
  <section>
    <div class="d-flex align-items-center justify-content-between mb-5">
      <div>
        <h4 class="fw-bold mb-1">
          Promotions
        </h4>
        <p class="mb-0">These banner images will appear on the homepage.</p>
      </div>
      <button class="btn btn-primary" @click="createModal.open()">
        New Promotion
      </button>
    </div>

    <p v-if="promotions.length === 0">
      No promotions found. Start creating one!
    </p>

    <div class="promotions" v-else>
      <div v-for="promotion in promotions" class="mb-5">
        <LazyCarouselPanel :image="promotion.image"
                           :text="promotion.text"
                           :button_text="promotion.button_text"
                           :button_link="promotion.button_link"
                           width="100%"
                           height="280px"
        />
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-outline-primary" @click="openEditModal(promotion)">
            <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit position-relative">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
            <span class="ms-2">Edit</span>
          </button>

          <button class="btn btn-outline-danger" @click="openDeleteModal(promotion.id)">
            <svg xmlns="http://www.w3.org/2000/svg" style="top: -1px;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 position-relative">
              <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            <span class="ms-2">Delete</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>
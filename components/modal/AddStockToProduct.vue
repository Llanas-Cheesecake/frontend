<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { ApiResponse } from "~/types/ApiResponse";
import type { ProductInventory } from "~/types/Product";

const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm', stock: ProductInventory): void,
}>();

const props = defineProps<{
  product_id: number
}>();

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
  const day = String(today.getDate() + 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
});

const errorMessage = ref('');

const form = reactive({
  quantity: 1,
  expiryDate: ''
});

const validation = reactive({
  quantity: [],
  expiryDate: []
});

const isSubmitting = ref(false);

const handleAddStock = async () => {
  isSubmitting.value = true;

  const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/products/${props.product_id}/add-stock`, {
    method: 'POST',
    body: {
      quantity: form.quantity,
      expiry_date: form.expiryDate
    }
  });

  if (results.value) {
    const payload = results.value.data;
    isSubmitting.value = false;

    emit('confirm', payload);
  }

  if (error.value) {
    isSubmitting.value = false;

    const payload = error.value.data.errors;

    switch (error.value.statusCode) {
      case 422:
        validation.quantity = payload.quantity || [];
        validation.expiryDate = payload.expiry_date || [];

        break;
      default:
        console.debug(error.value);
        errorMessage.value = "Something went wrong while handling your request";
    }
  }
}

</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="p-2">

              <h5 class="fw-bold mb-3">
                Add Stock
              </h5>

              <p class="mb-4">
                Enter the quantity of stock you want to add to this product and it's expiry date.
              </p>

              <div v-if="errorMessage.length > 0" class="alert alert-danger my-4">
                {{ errorMessage }}
              </div>

              <div class="form-floating mb-4">
                <input v-model="form.quantity"
                       type="number"
                       class="form-control"
                       :class="{ 'is-invalid': validation.quantity.length > 0}"
                       placeholder="Quantity"
                       min="1"
                       :disabled="isSubmitting">
                <label>Quantity</label>

                <small v-for="error in validation.quantity" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>

              <div class="form-floating mb-4">
                <input v-model="form.expiryDate"
                       type="date"
                       class="form-control"
                       :class="{ 'is-invalid': validation.expiryDate.length > 0}"
                       placeholder="Expiry Date"
                       :min="minDate"
                       :disabled="isSubmitting">
                <label>Expiry Date</label>

                <small v-for="error in validation.expiryDate" class="invalid-feedback">
                  {{ error }}
                </small>
              </div>

              <div class="d-flex gap-2 mt-4">
                <button type="button" class="btn btn-primary" :disabled="isSubmitting" @click="handleAddStock">
                  <span>Add Stock</span>
                  <LoadingIcon v-if="isSubmitting" class="ms-2" width="20" height="20" />
                </button>

                <button type="button" class="btn btn-secondary" :disabled="isSubmitting" @click="emit('cancel')">
                  Cancel
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">

</style>
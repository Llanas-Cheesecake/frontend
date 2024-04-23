<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import { ModalAddStockToProduct, ModalDeleteProductStock } from "#components";

  import type { ProductInventory } from "~/types/Product";

  const emit = defineEmits<{
    (e: 'stock-added', stock: ProductInventory): void,
    (e: 'stock-removed', item_id: number): void
  }>()

  const props = defineProps<{
    product_id: number
    inventory: ProductInventory[]
  }>();

  const stockIdToDelete = ref(0);

  const addStockToProductModal = useModal({
    component: ModalAddStockToProduct,
    attrs: {
      product_id: props.product_id,
      onConfirm(stock) {
        emit('stock-added', stock);

        addStockToProductModal.close()
      },
      onCancel() {
        addStockToProductModal.close()
      }
    }
  });

  const openRemoveStockModal = (item_id: number) => {
    stockIdToDelete.value = item_id;
    removeStockFromProductModal.open();
  }

  const removeStockFromProductModal = useModal({
    component: ModalDeleteProductStock,
    attrs: {
      item_id: stockIdToDelete,
      onConfirm(item_id) {
        const id = unref(item_id);

        emit('stock-removed', id);

        removeStockFromProductModal.close()
      },
      onCancel() {
        removeStockFromProductModal.close()
      }
    }
  });

  const isExpired = (expiry_date: string) => {
    return new Date(expiry_date) < new Date();
  }

</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 class="mb-1">
            Stock Inventory
          </h5>
          <p class="mb-0">
            Manage the stock inventory for this product.
          </p>
        </div>

        <button type="button" class="btn btn-secondary" @click="addStockToProductModal.open()">
          Add stock
        </button>
      </div>

      <div v-if="inventory.length > 0" class="table-responsive">
        <table class="table table-striped">
          <thead>
          <tr>
            <th>Quantity</th>
            <th>Expires at</th>
            <th>Added at</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="item in inventory">
            <td>
              <span>
                {{ item.quantity }}
              </span>
              <span v-if="item.quantity <= 2" class="badge text-bg-danger ms-2 position-relative" style="top: -1px;">
                <span class="d-none d-md-inline">
                  Critical
                </span>
                <span class="d-inline d-md-none">
                  !
                </span>
              </span>
            </td>
            <td>
              <div>
                <nuxt-time :datetime="item.expiry_date" month="long" day="numeric" year="numeric" />
              </div>
              <span v-if="isExpired(item.expiry_date)" class="badge text-bg-danger">
                Expired
              </span>
            </td>
            <td>
              <nuxt-time :datetime="item.created_at" month="long" day="numeric" year="numeric" />
            </td>
            <td>
              <button class="btn btn-action" @click="openRemoveStockModal(item.id)">
                <img src="/icons/trash-black.svg" alt="trash icon" width="20" />
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <p class="mb-4 fw-bold" v-else>
        No stock found for this product.
      </p>

      <div class="d-flex align-items-center">
        <img src="/icons/info-black.svg" alt="info icon" width="16" />
        <small class="ms-2">
          Expired stock will be automatically removed daily at 12:00am.
        </small>
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
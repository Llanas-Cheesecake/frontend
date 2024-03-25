<script setup lang="ts">
  import type { OrderPayment } from "~/types/Order";
  import { useModal } from "vue-final-modal";
  import { ModalRefundOrder } from "#components";

  const props = defineProps<{
    payment: OrderPayment
  }>();

  const emit = defineEmits<{
    (e: 'updatePaymentStatus'): void
  }>()

  const refundModal = useModal({
    component: ModalRefundOrder,
    attrs: {
      payment_id: props.payment.paymongo_id,
      onCancel() {
        refundModal.close();
      },
      onConfirm() {
        emit('updatePaymentStatus');
        refundModal.close();
      }
    }
  });

  const paymentStatus = computed(() => {
    if (props.payment.status === 'processing_refund') return 'Processing Refund';

    return capitalizeText(props.payment.status);
  });

  const showRefundButton = computed(() => {
    return !['processing_refund', 'refunded', 'failed_refund'].some(el => props.payment.status.includes(el));
  });
</script>

<template>
  <div class="card p-2">
    <div class="card-body">
      <h5 class="fw-bold mb-4">
        Payment Details
      </h5>

      <dl class="mb-4">
        <dt>Paymongo ID</dt>
        <dd>{{ payment.paymongo_id }}</dd>
        <dt>Amount paid</dt>
        <dd>{{ formatPrice(payment.amount_paid) }}</dd>
        <dt>Net amount</dt>
        <dd>{{ formatPrice(payment.net_amount) }}</dd>
        <dt>Fee</dt>
        <dd>{{ formatPrice(payment.fee) }}</dd>
        <dt>Status</dt>
        <dd>
          <small class="alert text-center py-1 px-2 mb-0 me-2 d-inline-block" :class="{
                'alert-success': payment.status === 'paid',
                'alert-warning': payment.status === 'processing_refund',
                'alert-info': payment.status === 'refunded',
              }">
            &#8369;
            <span>{{ paymentStatus }}</span>
          </small>
        </dd>
      </dl>

      <div class="d-flex d-print-none gap-3">
        <a class="btn btn-secondary" :href="`https://dashboard.paymongo.com/payments/${payment.paymongo_id}`" target="_blank">
          <span class="me-1">View on PayMongo</span>
          <svg xmlns="http://www.w3.org/2000/svg" style="top: -2px" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link position-relative">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <button v-if="showRefundButton" class="btn btn-danger" @click="refundModal.open()">
          Refund
        </button>
      </div>


    </div>
  </div>
</template>

<style scoped lang="scss">
  dl {
    display: grid;
    grid-template-columns: max-content auto;
    grid-gap: 0.3rem 2rem;
  }

  dt {
    grid-column-start: 1;
    color: color-mix(in srgb,var(--color-text-primary), #fff 40%);
  }

  dd {
    grid-column-start: 2;
  }
</style>
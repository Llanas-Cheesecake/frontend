<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import { ModalSchedulePickup } from "#components";

  import type { SelectedDateTime } from "~/types/PickupScheduler";

  const props = defineProps<{
    errors?: string[]
  }>()

  const emit = defineEmits<{
    (e: 'selectionChanged', date: string): void,
  }>();

  const selectedDateTime = ref("");

  /**
   * A computed property that returns a friendly formatted date and time string.
   * If no date and time have been selected, it returns a default message.
   *
   * @returns {string} A friendly formatted date and time string, or a default message.
   */
  const friendlyTime = computed(() => {
    if (selectedDateTime.value.length === 0) return "No time selected";

    /**
     * Format the selected date and time.
     *
     * The selected date and time are formatted according to the 'en-US' locale.
     * The format includes the weekday, month, day, hour, and minute.
     *
     * @returns {string} The formatted date and time string.
     */
    return new Date(selectedDateTime.value).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  });

  const schedulePickupModal = useModal({
    component: ModalSchedulePickup,
    attrs: {
      onCancel() {
        schedulePickupModal.close()
      },
      onConfirm(datetime: SelectedDateTime) {
        selectedDateTime.value = new Date(datetime.date + " " + datetime.time).toISOString();

        emit('selectionChanged', selectedDateTime.value)

        schedulePickupModal.close()
      }
    }
  })
</script>

<template>
  <section>
    <h5 class="fw-bold">Pickup Time</h5>
    <p>Please select your preferred pickup time.</p>

    <div class="position-relative">
      <input type="text"
             class="form-control w-100"
             :class="{ 'is-invalid border-danger text-danger': selectedDateTime.length === 0 }"
             :value="friendlyTime"
             readonly
             @click="schedulePickupModal.open()" />
      <small v-for="error in props.errors" class="invalid-feedback">
        {{ error }}
      </small>

      <div class="edit-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3">
          <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
// Reset into default because of white background
.form-control {
  background-color: var(--bs-body-bg);
  border: 1px solid color-mix(in srgb, var(--bg-secondary), #000 20%);
  &.is-invalid {
    background: none;
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    background-color: var(--bs-body-bg);
    border: 1px solid color-mix(in srgb, var(--bg-primary), #000 60%);
    box-shadow: none;
    color: var(--bs-body-color);
  }
  &:disabled {
    background-color: var(--bs-secondary-bg);
    color: rgba(var(--color-text-primary), 0.65);

    &~ label::after {
      background: var(--bs-secondary-bg)!important;
      color: #6c757d
    }
  }
  color: var(--color-text-primary);
}

.edit-icon {
  position: absolute;
  top: 6px;
  right: 12px;
}
</style>
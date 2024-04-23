<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { SelectedDateTime } from "~/types/PickupScheduler";

const emit = defineEmits<{
  (e: 'cancel'): void,
  (e: 'confirm', date: SelectedDateTime): void,
}>();

const selectedDate = ref('');
const selectedTime = ref('');

const setSelectedDate = (date: string) => {
  selectedDate.value = date;
};

const setSelectedTime = (time: string) => {
  selectedTime.value = time;
};

// Get the next 5 days but skip next 2 days
const availableDates = computed(() => {
  let date = new Date();
  date.setDate(date.getDate() + 2); // Skip the next 2 days

  let nextFiveDays = [];

  for (let i = 0; i < 5; i++) {
    date.setDate(date.getDate() + 1);
    let friendlyDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    let day = friendlyDate.split(',')[0];
    let monthAndDay = friendlyDate.split(',')[1].trim();

    console.log(date.toISOString());

    let unformattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split('T')[0];
    nextFiveDays.push({ day, monthAndDay, unformattedDate });
  }

  return nextFiveDays;
});

const availableTimes = computed(() => {
  let times = [];

  for (let i = 13; i <= 22; i++) {
    let time = i < 10 ? `0${i}:00:00` : `${i}:00:00`;

    times.push({
      unformattedTime: time,
      formattedTime: new Date(`2021-09-01T${time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    });
  }

  return times;
});

const selectionErrorMessage = ref("");

const confirmSelection = () => {
  if (selectedDate.value.length === 0) {
    selectionErrorMessage.value = "Select a pickup date";
    return;
  } else if (selectedTime.value.length === 0) {
    selectionErrorMessage.value = "Select a pickup time";
    return;
  }

  emit('confirm', {
    date: selectedDate.value,
    time: selectedTime.value
  });
}

const minDate = computed(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed in JavaScript
  const day = String(today.getDate() + 2).padStart(2, '0');

  return `${year}-${month}-${day}`;
});

</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="p-2">
              
              <h3 class="text-heading fw-bold mb-3">
                Schedule Pickup
              </h3>

              <p class="mb-4">
                You may pickup your order after 2 days you've placed the order. Please select your preferred date and time
              </p>

              <h5 class="text-heading fw-bold mb-3">Select pickup date</h5>

              <div class="date-list mb-4">
                <div v-for="date in availableDates"
                     class="item"
                     :class="{'selected': selectedDate === date.unformattedDate}"
                     @click="setSelectedDate(date.unformattedDate)">
                  <p class="fw-bold mb-0">
                    {{ date.day }}
                  </p>

                  <p class="mb-0">
                    {{ date.monthAndDay }}
                  </p>
                </div>
              </div>

              <div class="separator my-5">
                <hr />
                <div class="separator-text">
                  or
                </div>
              </div>

              <div class="form-floating mb-4">
                <input v-model="selectedDate"
                       type="date"
                       class="form-control"
                       placeholder="Expiry Date"
                       :min="minDate">
                <label>Pickup Date</label>
              </div>

              <h5 class="text-heading fw-bold mb-1">Select pickup time</h5>
              <p class="mb-3">
                We are available from 12:00 PM to 10:00 PM
              </p>

              <div class="time-list">
                <div v-for="time in availableTimes"
                     class="item"
                     :class="{'selected': selectedTime === time.unformattedTime}"
                     @click="setSelectedTime(time.unformattedTime)">
                  {{ time.formattedTime }}
                </div>
              </div>

              <div class="d-flex align-items-center gap-3 mt-5">
                <button type="button" class="btn btn-primary" @click="confirmSelection">
                  Confirm schedule
                </button>
                <span v-if="selectionErrorMessage.length > 0" class="text-danger fw-bold">
                  {{ selectionErrorMessage }}
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">
.date-list, .time-list {
  display: grid;
  gap: 1rem;
  .item {
    background: rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    text-align: center;
    padding: 1rem;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background: rgba(0, 0, 0, 0.15);
    }
    &.selected {
      background: var(--bg-primary);
      color: var(--color-text-primary);
    }
  }
}

.date-list {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.time-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  .item {
    padding: 0.5rem;
  }
}

.separator {
  position: relative;

  .separator-text {
    position: absolute;
    background: white;
    padding: 0 0.5rem;
    top: -14px;
    transform: translateX(-50%);
    left: 50%;
  }
}

.form-control {
  background-color: var(--bs-body-bg);
  border: 1px solid color-mix(in srgb, var(--bg-secondary), #000 20%);
  &:focus {
    background-color: var(--bs-body-bg);
    border: 1px solid color-mix(in srgb, var(--bg-primary), #000 60%);
    box-shadow: none;
    color: var(--bs-body-color);
  }
  &:disabled {
    background-color: var(--bs-secondary-bg);
    color: rgba(var(--bs-body-color-rgb), 0.65);

    &~ label::after {
      background: var(--bs-secondary-bg)!important;
      color: #6c757d
    }
  }
  color: var(--color-text-primary);
}

.form-floating > .form-control:focus ~ label::after, .form-floating > .form-control:not(:placeholder-shown) ~ label::after, .form-floating > .form-control-plaintext ~ label::after, .form-floating > .form-select ~ label::after {
  background-color: var(--bs-body-bg);
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 700px;
  }
}

@media (max-width: 557px) {
  .date-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
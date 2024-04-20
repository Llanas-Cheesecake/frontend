<script setup lang="ts">
  import {useEventSource} from "@vueuse/core";

  import type {Notification} from "~/types/Notification";
  import type {ApiResponse} from "~/types/ApiResponse";

  const config = useRuntimeConfig();
  const apiBaseUrl = config.public.apiBaseUrl;

  // Fetch recent notifications
  const notifications = ref<Notification[]>([]);

  const { data: results, error } = await useFetchAPI<ApiResponse>('/admin/notifications', {
    method: "GET"
  });

  if (results.value) {
    notifications.value = results.value.data;
  }

  if (error.value) {
    // Handle errors
  }

  onMounted(async () => {
    if (process.client) {
      const { data, error } = useEventSource(`${apiBaseUrl}/notifications/live`, []);

      // Listen for events
      watch(data, (message) => {
        if (message) {
          const parsedMessage: Notification = JSON.parse(message);
          notifications.value.push(parsedMessage);
        }
      });
    }


  })
</script>

<template>
  <div class="notification dropdown">
    <button class="btn btn-outline-primary" type="button" data-bs-toggle="dropdown">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="top: -1px;" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell position-relative">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        1
        <span class="visually-hidden">unread messages</span>
      </span>
    </button>
    <ul class="dropdown-menu dropdown-menu-end p-0">
      <li>
        <div class="d-flex align-items-center justify-content-between">
          <h5 class="dropdown-header p-3">Notifications</h5>
          <h5 class="dropdown-header p-3">
            View all
          </h5>
        </div>
      </li>
      <li><hr class="dropdown-divider m-0"></li>
      <li v-for="notification in notifications" class="w-100">
        <section class="d-flex align-items-center position-relative">
          <div class="w-100 px-3 py-3">
            <p class="fw-bold mb-0">{{ notification.content }}</p>
            <nuxt-time class="text-subtle" :datetime="notification.created_at" month="short" day="2-digit" year="numeric" hour="numeric" minute="numeric"></nuxt-time>
          </div>
          <span v-if="notification.is_unread" class="unread"></span>
        </section>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .notification.dropdown {
    .dropdown-menu {
      min-width: 300px;
      .unread {
        position: absolute;
        width: 5px;
        height: 5px;
        background: var(--bg-tertiary);
        padding: 5px;
        border-radius: 100%;
        right: 1rem;
        top: 1.5rem;
      }
    }
  }
</style>
<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";
  import { useEventSource } from "@vueuse/core";


  import type { Notification } from "~/types/Notification";
  import type { ApiResponse } from "~/types/ApiResponse";

  const { useToast } = Toast;
  const toast = useToast();

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
    console.error("Something went wrong while fetching notifications");
    console.debug(error.value);

    toast.error("Something went wrong while fetching notifications");
  }

  const unreadNotifications = computed(() => {
    return notifications.value.filter((i) => i.is_unread).length
  });

  const markNotificationAsRead = async (id: number) => {
    const { data: results, error } = await useFetchAPI<ApiResponse>(`/admin/notifications/${id}/read`, {
      method: "PATCH"
    });

    if (results.value) {
      const notification = notifications.value.find((i) => i.id === id);

      if (notification) {
        notification.is_unread = false;
      }
    }

    if (error.value) {
      console.error("Failed to mark notification as read.");
    }
  }

  onMounted(async () => {
    if (process.client) {
      const { data, error } = useEventSource(`${apiBaseUrl}/notifications/live`, []);

      // Listen for events
      watch(data, (message) => {
        if (message) {
          const parsedMessage: Notification = JSON.parse(message);
          notifications.value.push(parsedMessage);

          // Toast notification
          toast.info(parsedMessage.content);
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
      <span v-if="unreadNotifications > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        {{ unreadNotifications }}
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
          <nuxt-link :to="notification.link" class="notification" @click="markNotificationAsRead(notification.id)">
            <p class="mb-0" :class="{ 'fw-bold': notification.is_unread }">
              {{ notification.content }}
            </p>
            <nuxt-time class="text-subtle" :datetime="notification.created_at" month="short" day="2-digit" year="numeric" hour="numeric" minute="numeric"></nuxt-time>
          </nuxt-link>
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
      .notification {
        width: 100%;
        padding: 1rem;
        color: inherit;
        text-decoration: none;
        &:hover {
          background-color: rgba(0,0,0,0.03);
        }
      }
    }
  }
</style>
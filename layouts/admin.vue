<script setup lang="ts">
  import { ModalsContainer } from 'vue-final-modal'

  const route = useRoute();

  useHead({
    titleTemplate: (title) => {
      return title
          ? `${title} - Admin Panel - Llana's Cheesecake`
          : 'Admin Panel - Llana\'s Cheesecake'
    }
  })

  // const routeProductName = useState('routeProductName');

</script>

<template>
  <div v-if="route.name === 'admin-login' || route.name ==='admin-reset-password'" class="auth-container">
    <div class="box">
      <slot />
    </div>

    <ModalsContainer />
  </div>

  <div v-else class="admin-panel">

    <div class="admin-content d-flex gap-4">
      <ClientOnly>
        <AdminSideNavbar />
      </ClientOnly>

      <section style="min-width: 0; width: 100%">
        <div class="d-flex flex-column gap-4 main-content">
          <AdminTopNavbar />

          <slot />
        </div>
      </section>
    </div>

    <ModalsContainer />
  </div>
</template>

<style lang="scss">
  :root {
    --bg-primary: white;
    --bg-secondary: #f0f3f4;
    --bg-tertiary: #738290;

    --color-text-primary: black;
    --color-text-secondary: white;
    --color-text-disabled: color-mix(in srgb,var(--navbar-text), #000 15%);

    //--color-link: #e5ffb4;

    //--btn-bg-primary: #59702e;
    //--btn-bg-secondary: #f2ffda;
  }

  .auth-container {
    position: relative;
    height: 100vh;
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .bg-primary {
    background-color: var(--bg-primary)!important;
  }

  .bg-secondary {
    background-color: var(--bg-secondary)!important;
  }

  .bg-tertiary {
    background-color: var(--bg-tertiary)!important;
  }

  .btn {
    border-radius: 8px;
    &.btn-primary {
      background-color: var(--bg-tertiary);
      border: 2px solid var(--bg-tertiary);
      color: var(--color-text-secondary);
      &:active {
        background-color: color-mix(in srgb, var(--bg-tertiary), #000 15%);
        border-color: color-mix(in srgb, var(--bg-tertiary), #000 15%);
      }
    }
    &.btn-outline-primary {
      border: 2px solid var(--bg-tertiary)!important;
      color: var(--bg-tertiary);
      &:hover, &:focus, &.show {
        background-color: var(--bg-tertiary);
        color: var(--color-text-secondary);
        box-shadow: none;
      }
      &:active {
        border-color: var(--bg-tertiary);
      }
    }
    &.btn-outline-danger {
      border: 2px solid #dc3545!important;
    }
    &.btn-secondary {
      background-color: color-mix(in srgb, var(--bg-secondary), #000 15%);
      border: 2px solid var(--bg-secondary);
      color: var(--color-text-primary);
    }
    &.btn-danger {
      border: 2px solid #dc3545;
    }
    &.btn-action {
      background-color: transparent;
      border: 0;
      border-radius: 6px;
      padding: 0.5rem 0.6rem;
      img {
        position: relative;
        top: -2px;
      }
      &:hover {
        background-color: rgba(0,0,0,0.1);
      }
    }
  }

  .card {
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.03);
  }

  .table {
    thead {
      border-radius: 8px;
      margin-bottom: 0.5rem;
      tr {
        border: 0;
        th {
          &:first-child {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
            padding-left: 1rem;
          }
          &:last-child {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
            padding-right: 1rem;
          }
          background: var(--bg-tertiary);
          color: var(--color-text-secondary);
          padding: 1rem 0.5rem;
        }
      }
    }
    tbody {
      &:before {
        content:"@";
        display:block;
        line-height:10px;
        text-indent:-99999px;
      }

      tr {
        &:hover {
          border: 1px solid rgba(0,0,0,0.2);
        }
        td {
          vertical-align: middle;
          padding: 1rem 0.5rem;
          &:first-child {
            padding-left: 1rem;
          }
          &:last-child {
            padding-right: 1rem;
          }
        }
      }
    }
  }

  .form-control, .form-select {
    background-color: var(--bg-secondary);
    border: 2px solid rgba(0,0,0,0.1);
    &:focus {
      border-width: 2px;
      background-color: var(--bg-secondary);
      box-shadow: none;
      border-color: rgba(0,0,0,0.1);
    }
  }

  .form-floating > .form-control:focus ~ label::after, .form-floating > .form-control:not(:placeholder-shown) ~ label::after, .form-floating > .form-control-plaintext ~ label::after, .form-floating > .form-select ~ label::after {
    background-color: var(--bg-secondary);
  }

  .dropdown-menu {
    border-radius: 0.5rem;
    padding: 0.5rem;
    .dropdown-item {
      border-radius: 8px;
      cursor: pointer;
      padding: 0.3rem 0.5rem;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .nav.nav-pills {
    .nav-item .nav-link {
      color: var(--color-text-primary);
      cursor: pointer;
      &.active {
        background-color: var(--bg-tertiary);
        color: var(--color-text-secondary);
      }
    }
  }

  .modal {
    .modal-body {
      padding: 1.5rem;
    }
  }

  .admin-panel {
    background-color: #b5c2ca;
    min-height: 100vh;
    padding: 1rem;
  }

  .text-subtle {
    color: color-mix(in srgb,var(--color-text-primary), #fff 40%);
  }

  @media (min-width: 992px) {
    .admin-content .main-content {
      min-height: calc(100vh - 2rem);
    }
  }

  @media (min-width: 1400px) {
    .admin-content {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
    }
  }

  @media (max-width: 575px) {
    .auth-container .box {
      padding: 0 1rem;
      width: 100%;
    }
  }
</style>
<script setup lang="ts">
  // @ts-ignore
  import * as Toast from "vue-toastification/dist/index.mjs";
  import type { ApiResponse } from "~/types/ApiResponse";

  const { useToast } = Toast;
  const toast = useToast();

  const isSubmitting = ref(false);

  const settings = reactive({
    colorBgPrimary: '',
    colorBgSecondary: '',
    colorTextPrimary: '',
    colorTextSecondary: '',
    colorTextLink: '',
    buttonPrimary: '',
    buttonSecondary: '',
    buttonTextPrimary: '',
    buttonTextSecondary: '',
    email: '',
    sms_number: ''
  });

  // Validation messages
  const validation = reactive({
    colorBgPrimary: [],
    colorBgSecondary: [],
    colorTextPrimary: [],
    colorTextSecondary: [],
    colorTextLink: [],
    buttonPrimary: [],
    buttonSecondary: [],
    buttonTextPrimary: [],
    buttonTextSecondary: [],
    email: [],
    sms_number: []
  })

  const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/settings/site', {
    method: "GET"
  });

  if (result.value) {
    const payload = result.value.data;

    settings.colorBgPrimary = payload['color-bg-primary'];
    settings.colorBgSecondary = payload['color-bg-secondary'];

    settings.colorTextPrimary = payload['color-text-primary'];
    settings.colorTextSecondary = payload['color-text-secondary'];
    settings.colorTextLink = payload['color-text-link'];

    settings.buttonPrimary = payload['color-btn-primary'];
    settings.buttonSecondary = payload['color-btn-secondary'];
    settings.buttonTextPrimary = payload['color-btn-text-primary'];
    settings.buttonTextSecondary = payload['color-btn-text-secondary'];
    settings.email = payload['email'] || '';
    settings.sms_number = payload['sms_number'] || '';
  }

  // Handle form
  const handleFormSubmit = async () => {
    isSubmitting.value = true;

    const form = new FormData();
    form.append('_method', 'PATCH');
    form.append('colorBgPrimary', settings.colorBgPrimary);
    form.append('colorBgSecondary', settings.colorBgSecondary);
    form.append('colorTextPrimary', settings.colorTextPrimary);
    form.append('colorTextSecondary', settings.colorTextSecondary);
    form.append('colorTextLink', settings.colorTextLink);
    form.append('colorBtnPrimary', settings.buttonPrimary);
    form.append('colorBtnSecondary', settings.buttonSecondary);
    form.append('colorBtnTextPrimary', settings.buttonTextPrimary);
    form.append('colorBtnTextSecondary', settings.buttonTextSecondary);
    form.append('email', settings.email);
    form.append('sms_number', settings.sms_number)

    const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/settings/site', {
      method: "POST",
      body: form,
      headers: {
        ContentType: 'multipart/form-data'
      }
    });

    if (result.value) {
      isSubmitting.value = false;
      toast.success("Changes saved successfully");
    }

    if (error.value) {
      isSubmitting.value = false;
      const payload = error.value.data.errors;

      switch (error.value.statusCode) {
        case 422:
          validation.colorBgPrimary = payload.colorBgPrimary || [];
          validation.colorBgSecondary = payload.colorBgSecondary || [];
          validation.colorTextPrimary = payload.colorTextPrimary || [];
          validation.colorTextSecondary = payload.colorTextSecondary || [];
          validation.colorTextLink = payload.colorTextLink || [];
          validation.buttonPrimary = payload.colorBtnPrimary || [];
          validation.buttonSecondary = payload.colorBtnSecondary || [];
          validation.buttonTextPrimary = payload.colorBtnTextPrimary || [];
          validation.buttonTextSecondary = payload.colorBtnTextSecondary || [];
          validation.email = payload.email || [];
          validation.sms_number = payload.sms_number || [];
          break;
        default:
          toast.error("Something went wrong while handling your request");
      }
    }
  }
</script>

<template>
  <section>
    <div class="d-flex align-items-center justify-content-between mb-5">
      <h4 class="fw-bold mb-0">
        Site Settings
      </h4>

      <button class="btn btn-primary" :disabled="isSubmitting" @click="handleFormSubmit">
        <LoadingIcon v-if="isSubmitting" color="white" width="20" height="20" class="position-relative me-2" style="top: -1px" />
        <span>Save Changes</span>
      </button>
    </div>

    <div class="d-flex flex-column flex-lg-row gap-0 flex-50 gap-lg-5">
      <div class="mb-5">
        <h5 class="fw-bold">
          Color Settings
        </h5>
        <p class="mb-3">Personalize your store with your selected colors</p>
        <div class="alert alert-info">
          Click the tabs to change the colors of your site.
        </div>
      </div>

      <div>
        <h5 class="mb-4">Background Colors</h5>

        <div class="d-flex flex-column flex-sm-row flex-50 gap-3 mb-4">
          <div class="form-floating position-relative">
            <input v-model="settings.colorBgPrimary"
                   type="color"
                   class="form-control"
                   :class="{ 'is-invalid': validation.colorBgPrimary.length > 0 }"
                   placeholder="#fffff" @change="validation.colorBgPrimary.length = 0">
            <label>Primary Color</label>
            <small v-for="error in validation.colorBgPrimary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.colorBgSecondary"
                   type="color"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorBgSecondary.length > 0 }"
                   @change="validation.colorBgSecondary.length = 0">
            <label>Secondary Color</label>
            <small v-for="error in validation.colorBgSecondary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>
        </div>

        <h5 class="mb-4">Text colors</h5>

        <div class="d-flex flex-column flex-sm-row flex-wrap flex-50 gap-3 mb-4">
          <div class="form-floating position-relative">
            <input v-model="settings.colorTextPrimary"
                   type="color"
                   class="form-control mt-1"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorTextPrimary.length > 0 }"
                   @change="validation.colorTextPrimary.length = 0">
            <label>Primary Color</label>
            <small v-for="error in validation.colorTextPrimary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.colorTextSecondary"
                   type="color"
                   class="form-control mt-1"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorTextSecondary.length > 0 }"
                   @change="validation.colorTextSecondary.length = 0">
            <label>Secondary Color</label>
            <small v-for="error in validation.colorTextSecondary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.colorTextLink"
                   type="color"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorTextLink.length > 0 }"
                   @change="validation.colorTextLink.length = 0">
            <label>Links</label>
            <small v-for="error in validation.colorTextLink" class="invalid-feedback">
              {{ error }}
            </small>


          </div>
        </div>

        <h5 class="mb-4">Button Colors</h5>

        <div class="d-flex flex-column flex-sm-row flex-wrap flex-50 gap-3 mb-4">
          <div class="form-floating position-relative">
            <input v-model="settings.buttonPrimary"
                   type="color"
                   class="form-control mt-1"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.buttonPrimary.length > 0 }"
                   @change="validation.buttonPrimary.length = 0">
            <label>Primary Color</label>
            <small v-for="error in validation.buttonPrimary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.buttonSecondary"
                   type="color"
                   class="form-control mt-1"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.buttonSecondary.length > 0 }"
                   @change="validation.buttonSecondary.length = 0">
            <label>Secondary Color</label>
            <small v-for="error in validation.buttonSecondary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.buttonTextPrimary"
                   type="color"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.buttonTextPrimary.length > 0 }"
                   @change="validation.buttonTextPrimary.length = 0">
            <label>Primary Text Color</label>
            <small v-for="error in validation.buttonTextPrimary" class="invalid-feedback">
              {{ error }}
            </small>

          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.buttonTextSecondary"
                   type="color"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.buttonTextSecondary.length > 0 }"
                   @change="validation.buttonTextSecondary.length = 0">
            <label>Secondary Text Color</label>
            <small v-for="error in validation.buttonTextSecondary" class="invalid-feedback">
              {{ error }}
            </small>


          </div>
        </div>

      </div>
    </div>

    <div class="d-flex flex-column flex-lg-row gap-0 gap-lg-5 flex-50 mt-5">

      <div class="mb-5">
        <h5 class="fw-bold">
          Email Notifications
        </h5>
        <p class="mb-3">
          Provide which email should the system send important notifications
        </p>
      </div>

      <div>
        <div class="form-floating mb-3">
          <input v-model="settings.email"
                 type="text"
                 class="form-control mb-2"
                 :class="{ 'is-invalid': validation.email.length > 0 }"
                 :disabled="isSubmitting"
                 placeholder=""
          >
          <label class="form-label">Email</label>

          <small v-for="error in validation.email" class="invalid-feedback">
            {{ error }}
          </small>
        </div>
      </div>

    </div>

    <div class="d-flex flex-column flex-lg-row gap-0 gap-lg-5 flex-50 mt-5">

      <div class="mb-5">
        <h5 class="fw-bold">
          SMS Notifications
        </h5>
        <p class="mb-3">
          Provide which number should the system send SMS notifications
        </p>
      </div>

      <div>
        <div class="input-group">
          <div class="input-group-text">+63</div>
          <div class="form-floating" :class="{ 'is-invalid': validation.sms_number.length > 0 }">
            <input v-model="settings.sms_number"
                   type="text"
                   class="form-control"
                   :class="{ 'is-invalid': validation.sms_number.length > 0 }"
                   :disabled="isSubmitting"
                   placeholder=""
            >
            <label class="form-label">Phone Number</label>
          </div>

          <small v-for="error in validation.sms_number" class="invalid-feedback">
            {{ error }}
          </small>
        </div>

        <div class="form-text">
          e.g: 9123456789
        </div>

      </div>

    </div>

  </section>
</template>

<style scoped lang="scss">
  .color-preview {
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    position: absolute;
    top: 14px;
    right: 1rem;
    width: 40px;
    height: 30px;
  }
  .flex-50 > div {
    flex: 1 1 calc(50% - 1rem);
  }

  .input-group-text {
    background: var(--bs-tertiary-bg);
    border-color: color-mix(in srgb, var(--bg-secondary), #000 20%);
  }
</style>
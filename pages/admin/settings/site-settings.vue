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
    colorText: '',
    colorTextLink: '',
    buttonPrimary: '',
    buttonSecondary: ''
  });

  // Validation messages
  const validation = reactive({
    colorBgPrimary: [],
    colorBgSecondary: [],
    colorText: [],
    colorTextLink: [],
    buttonPrimary: [],
    buttonSecondary: []
  })

  const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/settings/site', {
    method: "GET"
  });

  if (result.value) {
    const payload = result.value.data;

    settings.colorBgPrimary = payload['color-bg-primary'];
    settings.colorBgSecondary = payload['color-bg-secondary'];

    settings.colorText = payload['color-text'];
    settings.colorTextLink = payload['color-text-link'];

    settings.buttonPrimary = payload['color-btn-primary'];
    settings.buttonSecondary = payload['color-btn-secondary'];
  }

  // Handle form
  const handleFormSubmit = async () => {
    isSubmitting.value = true;

    const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/settings/site', {
      method: "PATCH",
      body: {
        colorBgPrimary: settings.colorBgPrimary,
        colorBgSecondary: settings.colorBgSecondary,
        colorText: settings.colorText,
        colorTextLink: settings.colorTextLink,
        colorBtnPrimary: settings.buttonPrimary,
        colorBtnSecondary: settings.buttonSecondary
      }
    });

    if (result.value) {
      isSubmitting.value = false;
      toast.success("Changes saved successfully")
    }

    if (error.value) {
      isSubmitting.value = false;
      const payload = error.value.data.errors;

      switch (error.value.statusCode) {
        case 422:
          validation.colorBgPrimary = payload.colorBgPrimary || [];
          validation.colorBgSecondary = payload.colorBgSecondary || [];
          validation.colorText = payload.colorText || [];
          validation.colorTextLink = payload.colorTextLink || [];
          validation.buttonPrimary = payload.colorBtnPrimary || [];
          validation.buttonSecondary = payload.colorBtnSecondary || [];
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

    <div class="d-flex flex-column flex-lg-row gap-0 gap-lg-5">
      <div class="mb-5">
        <h5 class="fw-bold">
          Color Settings
        </h5>
        <p class="mb-3">Personalize your store with your selected colors</p>
        <div class="alert alert-info">
          Hex code is required. You may get colors through <a href="https://colors.muz.li/" target="_blank">here</a>
        </div>
      </div>

      <div>
        <h5 class="mb-4">Background colors</h5>

        <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
          <div class="form-floating position-relative">
            <input v-model="settings.colorBgPrimary"
                   type="text"
                   class="form-control"
                   :class="{ 'is-invalid': validation.colorBgPrimary.length > 0 }"
                   placeholder="#fffff" @change="validation.colorBgPrimary.length = 0">
            <label>Primary Color</label>
            <small v-for="error in validation.colorBgPrimary" class="invalid-feedback">
              {{ error }}
            </small>

            <div v-if="settings.colorBgPrimary.length > 0"
                 class="color-preview"
                 :style="{ backgroundColor: settings.colorBgPrimary }" />
          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.colorBgSecondary"
                   type="text"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorBgSecondary.length > 0 }"
                   @change="validation.colorBgSecondary.length = 0">
            <label>Secondary Color</label>
            <small v-for="error in validation.colorBgSecondary" class="invalid-feedback">
              {{ error }}
            </small>

            <div v-if="settings.colorBgSecondary.length > 0"
                 class="color-preview"
                 :style="{ backgroundColor: settings.colorBgSecondary }" />
          </div>
        </div>

        <h5 class="mb-4">Text colors</h5>

        <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
          <div class="form-floating position-relative">
            <input v-model="settings.colorText"
                   type="text"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorText.length > 0 }"
                   @change="validation.colorText.length = 0">
            <label>Color</label>
            <small v-for="error in validation.colorText" class="invalid-feedback">
              {{ error }}
            </small>

            <div v-if="settings.colorText.length > 0"
                 class="color-preview"
                 :style="{ backgroundColor: settings.colorText }" />
          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.colorTextLink"
                   type="text"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.colorTextLink.length > 0 }"
                   @change="validation.colorTextLink.length = 0">
            <label>Links</label>
            <small v-for="error in validation.colorTextLink" class="invalid-feedback">
              {{ error }}
            </small>

            <div v-if="settings.colorTextLink.length > 0"
                 class="color-preview"
                 :style="{ backgroundColor: settings.colorTextLink }" />
          </div>
        </div>

        <h5 class="mb-4">Button Colors</h5>

        <div class="d-flex flex-column flex-sm-row gap-3 mb-4">
          <div class="form-floating position-relative">
            <input v-model="settings.buttonPrimary"
                   type="text"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.buttonPrimary.length > 0 }"
                   @change="validation.buttonPrimary.length = 0">
            <label>Primary Color</label>
            <small v-for="error in validation.buttonPrimary" class="invalid-feedback">
              {{ error }}
            </small>

            <div v-if="settings.buttonPrimary.length > 0"
                 class="color-preview"
                 :style="{ backgroundColor: settings.buttonPrimary }" />
          </div>

          <div class="form-floating position-relative">
            <input v-model="settings.buttonSecondary"
                   type="text"
                   class="form-control"
                   placeholder="#fffff"
                   :class="{ 'is-invalid': validation.buttonSecondary.length > 0 }"
                   @change="validation.buttonSecondary.length = 0">
            <label>Secondary Color</label>
            <small v-for="error in validation.buttonSecondary" class="invalid-feedback">
              {{ error }}
            </small>

            <div v-if="settings.buttonSecondary.length > 0"
                 class="color-preview"
                 :style="{ backgroundColor: settings.buttonSecondary }" />
          </div>
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
</style>
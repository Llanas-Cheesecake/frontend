<script setup lang="ts">
  import { VueFinalModal } from "vue-final-modal";
  import type { Promotion } from "~/types/Promotion";
  import type { ApiResponse } from "~/types/ApiResponse";

  const emit = defineEmits<{
    (e: 'cancel'): void
    (e: 'newPromotion', promotion: Promotion): void
  }>();

  const isSubmitting = ref(false);
  const imageUrl = ref('');

  // I hate types ong
  const form = reactive<{
    image: File|null
    text: string
    buttonText: string
    buttonLink: string
  }>({
    image: null,
    text: '',
    buttonText: '',
    buttonLink: ''
  });

  const validation = reactive({
    image: [],
    text: [],
    buttonText: [],
    buttonLink: []
  });

  const resetValidation = () => {
    validation.image = [];
    validation.text = [];
    validation.buttonText = [];
    validation.buttonLink = [];
  }

  const handleFormSubmit = async () => {
    // Reset Validation
    resetValidation();

    // Show loading indicator
    isSubmitting.value = true;

    const data = new FormData();
    data.append('image', form.image as File);
    data.append('text', form.text);
    data.append('button_text', form.buttonText);
    data.append('button_link', form.buttonLink);

    const { data: result, error } = await useFetchAPI<ApiResponse>('/admin/settings/promotions', {
      method: "POST",
      body: data,
      headers: {
        ContentType: 'multipart/form-data'
      }
    });

    if (result.value) {
      isSubmitting.value = false;
      const payload = result.value.data;

      emit('newPromotion', payload);
    }

    if (error.value) {
      isSubmitting.value = false;

      const payload = error.value.data.errors;

      switch (error.value.statusCode) {
        case 422:
          validation.image = payload.image || [];
          validation.text = payload.text || [];
          validation.buttonText = payload.button_text || [];
          validation.buttonLink = payload.button_link || [];
          break;
        default:
          // Handle generic errors
      }
    }

  }

  const handleImageUpload = (files: FileList) => {
    // Create fake url for image preview
    imageUrl.value = URL.createObjectURL(files[0]);

    // Push the file into the form
    form.image = files[0];
  }

  const handleResetPreview = () => {
    imageUrl.value = '';
    form.image = null
  }

  const closeModal = () => {
    emit('cancel')
  }
</script>

<template>
  <VueFinalModal>
    <div class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">

            <div class="d-flex align-items-center justify-content-between mb-3">
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder-plus">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
              </div>
              <div @click="closeModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            </div>

            <h5 class="fw-bold mb-2">
              New Promotion
            </h5>

            <p class="mb-5">You're creating a new promotional banner to be displayed on the homepage.</p>

            <div v-if="!imageUrl">
              <LazyAdminUploadBox :errors="validation.image" @input-changed="validation.image = []" @image-uploaded="handleImageUpload" />
              <small>Recommended Size: 1380x400</small>
            </div>

            <div v-else>
              <div class="upload-preview">
                <LazyCarouselPanel :image="imageUrl"
                                   :text="form.text"
                                   :button_text="form.buttonText"
                                   :button_link="form.buttonLink"
                                   width="100%"
                                   height="280px"
                />
              </div>

              <button class="btn btn-outline-primary mt-4" @click="handleResetPreview">
                Choose a different image
              </button>

              <form class="mt-5" @submit.prevent="handleFormSubmit">
                <h5 class="mb-4">Promotion Info</h5>
                <div class="row">
                  <div class="col-12">
                    <div class="form-floating mb-4">
                      <input v-model="form.text"
                             type="text"
                             class="form-control"
                             :class="{ 'is-invalid': validation.text.length > 0 }"
                             placeholder="Placeholder">
                      <label class="form-label">Display Text</label>
                      <small v-if="validation.text.length === 0" class="form-text">
                        Optional, but recommended.
                      </small>

                      <small v-for="error in validation.text" class="invalid-feedback">
                        {{ error }}
                      </small>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-floating mb-4">
                      <input v-model="form.buttonText"
                             type="text"
                             class="form-control"
                             :class="{ 'is-invalid': validation.buttonText.length > 0 }"
                             placeholder="Placeholder">
                      <label class="form-label">Button Text</label>
                      <small v-if="validation.buttonText.length === 0" class="form-text">
                        This will only appear when display text is present.
                      </small>

                      <small v-for="error in validation.buttonText" class="invalid-feedback">
                        {{ error }}
                      </small>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="form-floating mb-4">
                      <input v-model="form.buttonLink"
                             type="text"
                             class="form-control"
                             :class="{ 'is-invalid': validation.buttonLink.length > 0 }"
                             placeholder="Placeholder">
                      <label class="form-label">Button Link</label>
                      <small v-if="validation.buttonLink.length === 0" class="form-text">
                        e.g: https://google.com
                      </small>

                      <small v-for="error in validation.buttonLink" class="invalid-feedback">
                        {{ error }}
                      </small>
                    </div>
                  </div>
                </div>

                <button type="submit" :disabled="isSubmitting" class="btn btn-primary">
                  <LoadingIcon v-if="isSubmitting" width="20" height="20" class="position-relative" style="top: -1px;" />
                  <span v-if="!isSubmitting">
                    Save changes
                  </span>
                  <span v-else>
                    Saving...
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </VueFinalModal>
</template>

<style scoped lang="scss">
  .icon {
    background-color: rgba(111, 111, 111, 0.2);
    box-shadow: 0 0 6px 4px rgba(1, 1, 1, 0.14);
    border-radius: 50%;
    display: inline-block;
    padding: 0.6rem;

    svg {
      position: relative;
      top: -1px;
    }
  }

  //.upload-preview img {
  //  border-radius: 12px;
  //  width: 100%;
  //  max-height: 280px;
  //}

  @media (min-width: 576px) {
    .modal-dialog {
      max-width: 800px;
    }
  }
</style>
<script setup lang="ts">
  const props = defineProps<{
    errors: []
  }>()

  const emit = defineEmits<{
    (e: 'inputChanged'): void
    (e: 'imageUploaded', files: FileList): void
  }>();

  watch(props.errors, (newValue) => {
    if (newValue.length > 0) {
      errorMessage.value = '';
    }
  })

  const fileInput = ref<HTMLInputElement>();
  const isDraggingOver = ref(false);
  const errorMessage = ref('');

  const handleDragOver = () => {
    isDraggingOver.value = true;
  }

  const handleDragLeave = () => {
    isDraggingOver.value = false;
  }

  const handleFileDrop = (e: DragEvent) => {
    errorMessage.value = '';
    isDraggingOver.value = false;

    if (e.dataTransfer) {
      emit('inputChanged');
      handleFileTransfer(e.dataTransfer.files);
    }
  }

  const handleFileInputClick = () => {
    fileInput.value?.click();
  }

  const handleFileInputChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files

    if (files) {
      emit('inputChanged');
      handleFileTransfer(files)
    }
  }

  const handleFileTransfer = (files: FileList) => {
    // Experimental! May break!
    // Safari & iOS just recently supported this API. May break in older versions
    const list = new DataTransfer();

    // Only allow 1 file to be uploaded
    if (files.length > 1) {
      errorMessage.value = "Only 1 image is allowed";
      return;
    }

    const file: File = files[0];

    // Check if the file uploaded is an image
    if (!isFileTypeAllowed(file)) {
      errorMessage.value = "The file uploaded is not an image. Only allowed file extensions are: jpeg, jpg, png, webp";

      // Remove any files from the <input type="file" />
      fileInput.value!!.value = '';

      return;
    }

    list.items.add(file);

    // This code allows multiple images to be uploaded
    //
    // Array.from(e.dataTransfer?.files).forEach(file => {
    //   list.items.add(file);
    // })

    emit('imageUploaded', list.files);
  }

  const isFileTypeAllowed = (file: File): boolean => {
    const allowedFileTypes = [
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    return allowedFileTypes.includes(file.type);
  }
</script>

<template>
  <div>
    <div v-if="errorMessage.length > 0" class="alert alert-danger" role="alert">
      <small>{{ errorMessage }}</small>
    </div>

    <div v-if="props.errors.length > 0" class="alert alert-danger" role="alert">
      <small v-for="error in props.errors">
        {{ error }}
      </small>
    </div>

    <div class="upload-box"
         :class="{ active: isDraggingOver }"
         @dragover.prevent="handleDragOver"
         @dragleave="handleDragLeave"
         @drop.prevent="handleFileDrop"
         @click="handleFileInputClick"
    >

      <div class="text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <div v-if="!isDraggingOver" class="mt-2 mb-0">
          <p class="mb-1">Drag & drop your image here</p>
          <p class="mb-1">or</p>
          <p class="mb-0">Click on this box</p>
        </div>
        <p v-else class="mt-2 mb-0">Release to upload your image</p>
      </div>

    </div>

    <input ref="fileInput" type="file" style="opacity: 0; position: absolute; top: -100vh;" @change="handleFileInputChange"/>
  </div>
</template>

<style scoped lang="scss">
  .upload-box {
    background-color: rgba(0,0,0,0.04);
    border: 2px dashed var(--bg-tertiary);
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 12rem;
    padding: 1rem;
    &.active {
      border-color: #00dc82;
    }
  }
</style>
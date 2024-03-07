<script setup lang="ts">
  const emit = defineEmits(['imageUploaded'])
  const isDraggingOver = ref(false);

  const handleDragOver = () => {
    isDraggingOver.value = true;
  }

  const handleDragLeave = () => {
    isDraggingOver.value = false;
  }

  const handleFileDrop = (e: DragEvent) => {

    if (e.dataTransfer) {
      // Experimental! May break!
      // Safari & iOS just recently supported this API. May break in older versions
      const list = new DataTransfer();

      Array.from(e.dataTransfer?.files).forEach(file => {
        list.items.add(file);
      })

      emit('imageUploaded', list.files)
    }

    isDraggingOver.value = false;
  }
</script>

<template>
  <div class="upload-box"
       :class="{ active: isDraggingOver }"
       @dragover.prevent="handleDragOver"
       @dragleave="handleDragLeave"
       @drop.prevent="handleFileDrop"
  >

    <div class="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
      </svg>
      <p v-if="!isDraggingOver" class="mt-2 mb-0">Drag & drop your image here</p>
      <p v-else class="mt-2 mb-0">Release to upload your image</p>
    </div>

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
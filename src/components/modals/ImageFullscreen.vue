<template>
  <vue-final-modal v-bind="$attrs" v-slot="{ close }" classes="modal-container" content-class="modal-content">
    <div class="modal__content" @click="close">
      <slot name="card_img"></slot>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: "ImageFullscreen-modal",
  inheritAttrs: false,
}
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #303C6C;
  max-width: 80vw;
  max-height: 80vh;
}

.modal__content {
  display: flex;
  align-self: center;
  max-height: 70vh;
}

</style>
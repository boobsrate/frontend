<template>
  <vue-final-modal v-slot="{ params, close }" v-bind="$attrs" classes="modal-container" content-class="modal-content">
    <span class="modal__title">
      <slot name="title"></slot>
    </span>
    <div class="modal__content">
      <slot :params="params"></slot>
    </div>
    <div class="modal__action">
      <button @click="$emit('confirm', close)">confirm</button>
      <button @click="$emit('cancel', close)">cancel</button>
    </div>
  </vue-final-modal>
</template>

<script>
export default {
  name: "ConfirmModal",
  inheritAttrs: false,
  emits: ['confirm', 'cancel']
}
</script>

<style scoped>
::v-deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin: 0 auto;
}
::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
  width: 30%;
  margin: 0 auto;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}
button {
  background: #3B2894;
  color: #fff;
  outline-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 clamp(12px, 2vw + 0.1%, 4rem);
}
</style>

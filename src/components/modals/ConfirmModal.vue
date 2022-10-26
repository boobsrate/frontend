<template>
  <vue-final-modal v-slot="{ close }" v-bind="$attrs" classes="modal-container" content-class="modal-content">
    <span class="modal__title">
      <slot name="title"></slot>
    </span>
    <p>If you are under 18 please leave this site.</p>
    <div class="modal__action">
      <button class="btn-ok" @click="$emit('confirm', close)">Sure, show me boobs!</button>
      <button class="btn-no" @click="$emit('cancel', close)">No, don't tell my mom.</button>
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
  margin: 0 auto;
}

::v-deep(.modal-content) {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 0.25rem;
  background: #222629;
  color: white;
}

.modal__title {
  font-size: 1.5rem;
  font-weight: 700;
}

.modal__action {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
  margin: 0 auto;
}

.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

.btn-ok:hover {
  background: green;
}

.btn-no:hover {
  background: darkred;
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

@media (max-width: 720px) {

  .modal__action {
    display: block;
    width: 60%;
  }

  button {
    margin: 7px 0;
  }
}
</style>

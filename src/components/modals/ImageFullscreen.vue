<template>
  <vue-final-modal v-bind="$attrs" v-slot="{ close }" classes="modal-container" content-class="modal-content">
    <div class="modal__content" @click="close">
      <div class="loading-indicator" v-if="loading">
        <Loader />
      </div>
      <slot name="card_img"></slot>
    </div>
  </vue-final-modal>
</template>

<script>
import Loader from '@/components/card/Loader'

export default {
  name: "ImageFullscreen-modal",
  components: {Loader},
  inheritAttrs: false,
  data() {
    return {
      loading: true
    }
  },
  watch: {
    // Следим за изменением видимости модального окна
    '$attrs.modelValue': {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loading = true;
          // Используем setTimeout, чтобы дать время для рендеринга изображения
          setTimeout(() => {
            const img = document.getElementById('full-img');
            if (img) {
              if (img.complete) {
                this.loading = false;
              } else {
                img.onload = () => {
                  this.loading = false;
                };
              }
            }
          }, 100);
        }
      }
    }
  }
}
</script>

<style>
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
}

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  z-index: 10000;
}

.modal__content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10001;
  position: relative;
}

.modal__content img {
  max-width: 95vw;
  max-height: 95vh;
  width: auto;
  height: auto;
  object-fit: contain;
  margin: auto;
  z-index: 10002;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10003;
}
</style>
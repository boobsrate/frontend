<template>
  <div class="card">
    <ImageFullscreenModal v-model="showFullscreen">
      <template v-slot:card_img>
        <img v-if="showFullscreen" class="full-img" id="full-img" :src="getCensoredImageUrl(true)" alt="CENSORED">
      </template>
    </ImageFullscreenModal>

    <div class="card-rating">
      <span class="rating-text">RATING: {{ card_data.rating }}</span>
    </div>

    <div class="card-image">
      <Loader v-if="show"/>
      <img v-if="!show" class="img-thumbnail bg-dark border-0" :key="card_data.id"
           :src="getCensoredImageUrl()"
           @click="showFullscreen = true"
           alt="CENSORED">
    </div>
  </div>
</template>

<script>
import Loader from '@/components/card/Loader'
import ImageFullscreenModal from "@/components/modals/ImageFullscreen";

export default {
  name: "CensoredCardTop-component",
  components: {ImageFullscreenModal, Loader},
  inject: ['isConfirmed', 'isAuthenticated', "showLoginModal", "openLoginModalFun"],
  emits: ['getCards'],

  data() {
    return {
      showFullscreen: false,
      show: null,
    }
  },

  methods: {
    /**
     * Возвращает URL цензурированного изображения
     * @returns {string} URL цензурированного изображения
     */
    getCensoredImageUrl() {
      return require('@/assets/censored-improved.svg');
    },
  },

  props: {
    card_data: {
      type: Object,
      required: true,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.card {
  width: 350px;
  box-shadow: 2px 2px 5px #ccc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #303C6C;
}

.card-rating {
  display: flex;
  align-items: center;
  justify-content: center; /* center the text horizontally and vertically */
  color: #fffc;
}

.card-image {
  height: 450px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;
}

.img-thumbnail {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.full-img {
  object-fit: cover;
  background: #303C6C;
  border-color: #303C6C;
  max-width: 100%;
  max-height: 80vh;
}

.rating-text {
  text-align: center; /* Center text horizontally */
  font-size: x-large;
  font-weight: 600;
  color: #d1d1d3;
  font-family: "Akshar", "Andale Mono", serif;
  margin: 0;
}

/* Mobile-specific styles */
@media only screen and (max-width: 600px) {
  .card {
    width: 90%; /* Reduce the width of the card */
  }
  .action-text {
    font-size: medium; /* Reduce font size */
  }
  /* Add new styles for the action button block */
  .actions {
    flex-direction: row; /* Stack buttons vertically */
  }
}
</style>

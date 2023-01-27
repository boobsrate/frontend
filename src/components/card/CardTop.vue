<template>
  <div class="card" :class="{ blur: !isConfirmed }">

    <ImageFullscreenModal v-model="showFullscreen">
      <template v-slot:card_img>
        <img v-if="showFullscreen" class="full-img" id="full-img" :src="card_data.full_url" alt="NO DATA">
      </template>
    </ImageFullscreenModal>

    <div class="card-rating">
      <p>RATING: {{ card_data.rating }}</p>
    </div>

    <div class="card-image">
      <Loader v-if="show"/>
      <img v-if="!show" class="img-thumbnail bg-dark border-0" :class="{ blur: !isConfirmed }" :key="card_data.id"
           :src="card_data.url"
           @click="showFullscreen = true"
           alt="No Image">
    </div>
  </div>
</template>

<script>

import Loader from '@/components/card/Loader'
import ImageFullscreenModal from "@/components/modals/ImageFullscreen";

export default {
  name: "Card-Top-component",
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
    setRating(data) {
      if (this.card_data.id === data.message.tits_id) {
        // eslint-disable-next-line vue/no-mutating-props
        this.card_data.rating = data.message.new_rating
      }
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
  height: 30px;
  color: #fffc;
}

.card-image {
  height: 450px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  position: relative;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center; /* center the text horizontally and vertically */
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  width: 49%; /* Make buttons full width */
  margin-bottom: 10px; /* Add margin between buttons */
  margin-top: 10px;
}

.action-text {
  text-align: center; /* Center text horizontally */
  font-size: x-large;
  font-weight: 600;
  color: #d1d1d3;
  font-family: "Akshar", "Andale Mono", serif;
  margin: 0;
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

.blur {
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -o-filter: blur(20px);
  -ms-filter: blur(20px);
  filter: blur(20px);
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
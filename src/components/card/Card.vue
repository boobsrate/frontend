<template>
  <div class="card" :class="{ blur: !isConfirmed }">

    <ImageFullscreenModal v-model="showFullscreen">
      <template v-slot:card_img>
        <img v-if="showFullscreen" class="full-img" id="full-img" :src="card_data.full_url" alt="NO DATA">
      </template>
    </ImageFullscreenModal>

    <div class="card-rating">
      <span class="rating-text">RATING: {{ card_data.rating }}</span>
    </div>

    <div class="card-image">
      <Loader v-if="show"/>
      <img v-if="!show" class="img-thumbnail bg-dark border-0" :class="{ blur: !isConfirmed }" :key="card_data.id"
           :src="card_data.url"
           @click="openFullscreen()"
           alt="No Image">
    </div>

    <div class="actions container-fluid">
      <div class="report-button action container-fluid" @click="reportCard(this.card_data.id)">
        <span class="action-text">REPORT</span>
      </div>
      <div class="vote-button action container-fluid" @click="voteCard(this.card_data.id)">
        <span class="action-text">LIKE</span>
      </div>
    </div>

  </div>
</template>

<script>

import Loader from '@/components/card/Loader'
import ImageFullscreenModal from "@/components/modals/ImageFullscreen";
import axios from "axios";

export default {
  name: "Card-component",
  components: {ImageFullscreenModal, Loader},
  inject: ['isConfirmed', 'isAuthenticated', "showLoginModal", "openLoginModalFun", "subBoobs"],
  emits: ['getCards'],

  data() {
    return {
      showFullscreen: false,
      show: null,
    }
  },

  methods: {
    /**
     * Открывает полноэкранный режим
     */
    openFullscreen() {
      this.showFullscreen = true;
    },

    voteCard(card_id) {
      this.show = true
      axios.post(
          process.env.VUE_APP_BACKEND_URL + '/tits/' + card_id,
          {}
      ).catch(error => (console.log(error))).then(this.$emit('getCards'))
    },

    reportCard(card_id) {
      console.log(this.isAuthenticated)
      console.log(this.$cookies.get('boobs_session'))
      if (!this.$cookies.get('boobs_session')) {
        console.log("NOT AUTH")
        this.openLoginModalFun()
      } else {
        axios.post(
            process.env.VUE_APP_BACKEND_URL + '/tits/report/' + card_id,
            {}
        ).catch(error => (console.log(error))
        ).then(this.$emit('getCards'))
      }
    },

  },

  mounted() {
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
  box-shadow: 0 0 5px #ccc;
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
  box-shadow: 0 0 5px #ccc;
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

.action:hover {
  background: #081d74;
  color: #fffc;
  border-color: #081d74;
  transition: 0.3s;
  /* rounded corners */
  border-radius: 5px;
 /* external shadow */
  box-shadow: 0 0 0 6px #081d74;
  /* inner shadow */
}

.action-text {
  text-align: center; /* Center text horizontally */
  font-size: x-large;
  font-weight: 600;
  color: #d1d1d3;
  font-family: "Akshar", "Andale Mono", serif;
  margin: 0;
}

.rating-text {
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



/* Styles for narrow screens (both mobile and desktop) */
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

  /* Улучшенный hover-эффект для узких экранов с поддержкой hover */
  .action:hover {
    background: #081d74;
    color: #fffc;
    border-color: #081d74;
    border-radius: 5px;
    box-shadow: 0 0 0 3px #081d74; /* Уменьшенная тень */
    transform: none; /* Без трансформации */
  }

  /* Стили для активного состояния (при нажатии) */
  .action:active {
    background: #081d74;
    color: #fffc;
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  }
}

/* Специальные стили только для сенсорных устройств */
@media (hover: none) and (max-width: 600px) {
  /* Полностью отключаем hover-эффект на сенсорных устройствах */
  .action:hover {
    background: transparent;
    color: inherit;
    border-color: transparent;
    box-shadow: none;
    transform: none;
  }
}

</style>
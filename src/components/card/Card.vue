<template>
  <div class="card" :class="{ blur: !isConfirmed.value }">

    <ImageFullscreenModal v-model="showFullscreen">
      <template v-slot:card_img>
        <img class="full-img" id="full-img" :src="card_data.full_url" alt="NO DATA">
      </template>
    </ImageFullscreenModal>

    <div class="card-rating">
      <p>RATING: {{ card_data.rating }}</p>
    </div>

    <div class="card-image">
      <Loader v-if="show"/>
      <img v-if="!show" class="img-thumbnail bg-dark border-0" :class="{ blur: !isConfirmed.value }" :key="card_data.id"
           :src="card_data.url"
           @click="showFullscreen = true"
           alt="No Image">
    </div>

    <div class="actions container-fluid">
      <div class="report-button action container-fluid" @click="reportCard(this.card_data.id)">
        <p class="action-text">REPORT</p>
      </div>
      <div class="vl"></div>
      <div class="vote-button action container-fluid" @click="voteCard(this.card_data.id)">
        <p class="action-text">LIKE</p>
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
  inject: ['isConfirmed', 'isAuthenticated', "showLoginModal", "openLoginModalFun"],
  emits: ['getCards'],

  data() {
    return {
      showFullscreen: false,
      show: null,
    }
  },

  methods: {
    voteCard(card_id) {
      this.show = true
      axios.post(
          process.env.VUE_APP_BACKEND_URL + '/tits/' + card_id,
          {}
      ).catch(error => (console.log(error))).then(this.$emit('getCards'))
    },

    reportCard(card_id) {
      console.log(this.isAuthenticated.value)
      if (!this.isAuthenticated.value) {
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
    this.$options.sockets.onmessage = (event) => {
      let data = JSON.parse(event.data);
      if (data.type === "new_rating") {
        if (this.card_data.id === data.message.tits_id) {
          // eslint-disable-next-line vue/no-mutating-props
          this.card_data.rating = data.message.new_rating
        }
      }
    }
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

.action-button {
  background: #4c4864;
}

.card {
  padding: 10px;
  margin: 10px;
  background: #303C6C;
  width: 85%;
}

.card-image {
  width: 100%;
  height: 80%;
  cursor: pointer;
}


.actions {
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: space-around;
  height: 10%;
}

.action {
  margin: auto;
  display: flex;
  justify-content: center;
  width: 49%;
  height: 100%;
  cursor: pointer;
}

.action:hover {
  background: #4c4864;
  border: solid 2px #5063b2;
  border-radius: 4px;
  box-shadow: 0 20px 30px rgba(0,0,0,.12), 0 6px 10px rgba(0,0,0,.06);
}

.action-text {
  display: flex;
  margin: auto;
}


.card .card-image {
  background-position: center;
}

.card-rating {
  height: 30px;
  color: #fffc;
}

.img-thumbnail {
  height: 100%;
  width: 100%;
  object-fit: cover;
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

.vl {
  border-left: 2px solid #5063b2;
  height: 80%;
  -webkit-filter: blur(1px);
  -moz-filter: blur(1px);
  -o-filter: blur(1px);
  -ms-filter: blur(1px);
  filter: blur(1px);
}

.action-text {
  font-size: xx-large;
  font-weight: 600;
  color: #d1d1d3;
  font-family: "Akshar", "Andale Mono",serif;
}

@media screen and (max-width: 600px){
  .action-text {
    font-size: large;
    font-weight: 600;
  }
}


@media screen and (max-height: 400px){
  .action-text {
    font-size: medium;
    font-weight: 600;
  }
}

@media screen and (max-width: 350px){
  .action-text {
    font-size: medium;
    font-weight: 600;
  }
}


</style>
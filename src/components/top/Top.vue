<template>
  <div class="cards row justify-content-center">
    <template :key="card.id" v-for="card in cards">
      <div class="card-wrap">
        <card-top-component v-if="!isCensored"
            :card_data="card"
            :show="show"
            @getCards="getCards"
        />
        <censored-card-top v-else
            :card_data="card"
            :show="show"
            @getCards="getCards"
        />
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import CardTopComponent from "@/components/card/CardTop.vue";
import CensoredCardTop from "@/components/card/CensoredCardTop.vue";
import CensorshipService from "@/services/CensorshipService";

export default {
  name: "TopComponent",
  inject: ['subBoobs'],

  components: {
    CardTopComponent,
    CensoredCardTop,
  },

  computed: {
    /**
     * Проверяет, активирован ли режим цензуры
     * @returns {boolean} true, если режим цензуры активирован
     */
    isCensored() {
      return CensorshipService.isCensorshipEnabled();
    }
  },

  created() {
    this.getCards();
  },

  data() {
    return {
      cards: [],
      show: true
    }
  },

  watch: {
    '$route': function(to) {
      this.getCards(to.params.top)
    }
  },

  mounted() {
    this.$watch(
        () => this.subBoobs,
        (val) => {
          if (val) {
            console.log("subBoobs is not null. subscribing to new_rating")
            this.subBoobs.on('publication', function (message) {
              console.log(message)
              if (message.data.type === "new_rating") {
                console.log(message)
                this.cards.forEach((card) => {
                      if (card.id === message.data.message.tits_id) {
                        console.log("update card")
                        card.rating = message.data.message.new_rating
                      }
                    }
                )
              }
            }.bind(this)).subscribe();
          }
        },
    )
  },

  methods: {
    getCards() {
      this.show = true
      axios.get(process.env.VUE_APP_BACKEND_URL + "/tits/top/" + this.$route.params.count).then(response => {
        this.cards = response.data;
        this.show = false
      })
    },
  }
}
</script>

<style scoped>

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align the cards horizontally with equal space between them */
}

.card-wrap {
  width: 350px;
  margin: 10px;
}

@media screen and (max-width: 600px) {
  .card-wrap {
    max-width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}

</style>
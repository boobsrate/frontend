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
  name: "AbyssComponent",

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

  methods: {
    getCards() {
      this.show = true
      axios.get(process.env.VUE_APP_BACKEND_URL + "/tits/abyss/" + this.$route.params.count).then(response => {
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
</style>
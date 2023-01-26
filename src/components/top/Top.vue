<template>
  <div class="cards row justify-content-center">
    <template :key="card.id" v-for="card in cards">
      <div class="card-wrap">
        <card
            :card_data="card"
            :show="show"
            @getCards="getCards"
        />
      </div>
    </template>
  </div>
</template>

<script>
import Card from "@/components/card/Card.vue";
import axios from "axios";

export default {
  name: "TopComponent",

  components: {
    Card
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
</style>
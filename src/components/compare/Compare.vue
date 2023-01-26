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

import Card from "@/components/card/Card";
import axios from "axios";

export default {
  name: "Compare-component",

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

  methods: {
    getCards() {
      this.show = true
      axios.get(process.env.VUE_APP_BACKEND_URL + "/tits").then(response => {
        this.cards = response.data;
        this.show = false
      })
    },
  }


}
</script>

<style scoped>

/* CSS for the parent component */
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
<template>
  <div class="rating row">
    <v-card
        v-for="card_data in cards"
        :key="card_data.id"
        :card_data="card_data"
        @voteCard="voteCard"
    />
  </div>
</template>

<script>
import vCard from "@/components/card";
import axios from "axios";
import WS from "@/services/ws";

export default {
  name: "rating",
  components: {
    vCard
  },
  data() {
    return {
      cards: [
        {
          id: "Card 1",
          url: "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg",
          rating: 4,
          created_at: "2019-01-01",
        },
        {
          id: "Card 2",
          url: "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg",
          rating: 3,
          created_at: "2019-01-01",
        },
      ]
    }
  },

  created() {
    this.getCards();
  },

  mounted() {
    let self = this;
    WS.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (data.type === "new_rating") {
        self.cards.find(card => card.id === data.message.tits_id).rating = data.message.new_rating;
      }
    }
  },

  methods: {

    getCards() {
      axios.get("https://tits.api.boobsrate.com/tits").then(response => {
        this.cards = response.data;
      });
    },

    voteCard(card_data) {
      axios.post(
          'https://tits.api.boobsrate.com/tits/' + card_data,
          {}
      ).then(response => (this.cards = response.data)
      ).catch(error => (console.log(error))
      ).then(this.getCards)
    }
  }
}
</script>


<style>

.rating {
  padding: 10px;
}
</style>
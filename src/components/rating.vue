<template>
  <div class="rating">
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
    this.connection = new WebSocket("wss://tits.api.boobsrate.com/ws");
    this.connection.onmessage = function(event) {
      if (event.data.type === "new_rating") {
        this.cards.find(card => card.id === event.data.tits_id).rating = event.data.new_rating;
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
      console.log(card_data);
      axios.post(
          'https://tits.api.boobsrate.com/tits/' + card_data,
          {}
      ).then(function (response) {
        this.cards = response.data;
      }).catch(function (error) {
        console.log(error);
      }).then(
          this.getCards
      )
    }
  }
}
</script>


<style>

.rating {
  display: flex;
  width: 100%;
  height: 90vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
</style>
<template>
  <div class="rating">
    <div class="cards row justify-content-center">
      <div class="card-wrap">
        <v-card
            :card_data="cards[0]"
            @voteCard="voteCard"
            :show="show"
        />
      </div>
      <div class="card-wrap">
        <v-card
            :card_data="cards[1]"
            @voteCard="voteCard"
            :show="show"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vCard from "@/components/card/Card";
import axios from "axios";
import WS from "@/services/ws";

export default {
  name: "rating",
  components: {
    vCard
  },
  data() {
    return {
      show: true,
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

  // Fetch cards when component is created
  created() {
    this.getCards();
  },

  // Listen for new ratings when the component is mounted
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
    // Method to fetch cards from the API
    getCards() {
      this.show = true
      axios.get("https://tits.api.boobsrate.com/tits").then(response => {
        this.cards = response.data;
        this.show = false
      })
    },

    // Method to vote for a card
    voteCard(card_data) {
      this.show = true
      axios.post(
          'https://tits.api.boobsrate.com/tits/' + card_data,
          {}
      ).then(response => {
            this.cards = response.data
            this.show = false
          }
      ).catch(error => (console.log(error))
      ).then(this.getCards)
    }
  }
}
</script>


<style>
.rating {
  padding: 15px; // Adjusted based on design team feedback
  height: 100%;
}

.card-wrap {
  width: 50%;
  display: flex; // Adjusted based on design team feedback
  justify-content: center;
}

@media screen and (max-width: 900px) {
.card-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}
}
</style>
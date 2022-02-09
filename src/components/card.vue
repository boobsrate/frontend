<template>
    <div class="card">
        <div class="card-image">
            <img :src="card_data.url" alt="No Image">
        </div>
        <div class="card-rating">
            <p>Rating: {{ card_data.rating }}</p>
        </div>
      <button class="btn btn-primary" @click="voteCard">Vote</button>
    </div>
</template>

<script>
export default {
  name: "v-card",
  methods : {
    voteCard() {
      this.$emit('vote-card', this.card_data.id);
    }
  },

  props : {
    card_data : {
      type : Object,
      required : true,
      default() {
        return {
          url : 'www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg',
          rating : 0,
          created_at : '',
        }
      },
      },
    },
}
</script>

<style>

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  margin: auto;
  justify-items: center;
  align-items: center;
  flex: 0 0 50%;
}

.card-image img {
  width: 100%;
  object-fit: contain;
}

.card-image {
  width: 100%;
  height: 100%;
}

.btn {
  margin: 1rem;
}

</style>
<template>
    <div class="card col-sm d-flex align-items-center">
        <div class="card-image mt-auto p-2">
          <img class="img-thumbnail" :key="card_data.id" :src="card_data.url" alt="No Image">
        </div>
        <div class="card-rating mt-auto p-2">
            <p>Rating: {{ card_data.rating }}</p>
        </div>
      <button class="btn btn-primary btn-block w-100" @click="voteCard"> LIKE !</button>
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
  created() {
  }
}
</script>

<style scoped>

.card {
  padding: 10px;
  margin: 10px;
}

.card .card-image {
  background-position: center;
}



</style>
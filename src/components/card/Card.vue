<template>
  <div class="card col-sm d-flex align-items-center rounded">
    <div class="card-image mt-auto p-2">
      <img class="img-thumbnail bg-dark border-0" :class="{ blur: !isAuth.value }" :key="card_data.id" :src="card_data.url"
           alt="No Image">
    </div>
    <div class="card-rating mt-auto p-2">
      <p>RAITING: {{ card_data.rating }}</p>
    </div>
    <button class="btn btn-primary btn-block w-100 border-0" @click="voteCard"> LIKE !</button>
  </div>
</template>

<script>
export default {
  name: "v-card",
  inject: ['isAuth'],
  methods: {
    voteCard() {
      this.$emit('vote-card', this.card_data.id);
    }
  },
  props: {
    card_data: {
      type: Object,
      required: true,
      default() {
        return {
          url: 'www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg',
          rating: 0,
          created_at: '',
        }
      },
    },
  },
}
</script>

<style scoped>

.card {
  padding: 10px;
  margin: 10px;
  background: #080129;
  width: 85%;
}

.card .card-image {
  background-position: center;
}

.card-rating {
  color: #fffc;
}

.btn {
  background: #3B2894;
  outline-color: transparent;
}

.img-thumbnail.blur {
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -o-filter: blur(20px);
  -ms-filter: blur(20px);
  filter: blur(20px);
}
</style>
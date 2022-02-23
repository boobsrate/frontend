<template>
  <div class="card" @click="voteCard">
    <div class="card-image mt-auto p-2">
      <Loader v-if="show" />
      <img v-if="!show" class="img-thumbnail bg-dark border-0" :class="{ blur: !isAuth.value }" :key="card_data.id" :src="card_data.url"
           alt="No Image">
    </div>
    <div class="card-rating mt-auto p-2">
      <p>RAITING: {{ card_data.rating }}</p>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: "v-card",
  inject: ['isAuth'],
  components: {Loader},
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
    show: {
      type: Boolean
    }
  },
}
</script>

<style scoped>

.card {
  padding: 10px;
  margin: 10px;
  background: #080129;
  width: 85%;
  cursor: pointer;
  height: 75vh;
}

.card .card-image {
  background-position: center;
}

.card-rating {
  color: #fffc;
  height: 10%;
}

.btn {
  background: #3B2894;
  outline-color: transparent;
}

.img-thumbnail {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.img-thumbnail.blur {
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -o-filter: blur(20px);
  -ms-filter: blur(20px);
  filter: blur(20px);
}

.card-image {
  width: 100%;
  height: 90%;
}

@media screen and (max-width: 900px) {
  .card {
    height: 50vh;
  }
}
</style>
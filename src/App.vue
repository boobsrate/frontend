<template>
  <Header></Header>
  <div>
    <ConfirmModal v-model="show" @confirm="confirm" @cancel="cancel">
      <template v-slot:title>Please verify your age</template>
      <p>If you are under 18 please leave this site.</p>
    </ConfirmModal>
  </div>
  <router-view></router-view>
</template>

<script>
import Header from "@/components/includes/Header"
import ConfirmModal from "@/components/modals/ConfirmModal";
import {computed} from "vue";

export default {
  name: 'BoobsRate',
  data() {
    return {
      isAuth: null,
      show: null,
    }
  },
  provide() {
    return {
      isAuth: computed(() => (this.isAuth))
    }
  },
  components: {
    Header,
    ConfirmModal
  },
  methods: {
    confirm() {
      this.$cookies.set('isAuth', true)
      this.show = false
      this.isAuth = true
    },
    cancel(close) {
      window.location.href = 'https://www.google.com';
      close()
    }
  },
  created() {
    this.isAuth = !!this.$cookies.get('isAuth')
    this.show = !this.isAuth
  }
}
</script>

<style>
app {
  height: 100vh;
}

html, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.background {
  display: none;
  background-color: rgba(204, 204, 204, 0.5);
  z-index: 2;
  position: fixed;
  top: -15px;
  right: -15px;
  bottom: -15px;
  left: -15px;
}
</style>

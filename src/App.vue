<template>
  <div>
    <ConfirmModal v-model="showConfirmModal" @confirm="confirm" @cancel="cancel" :click-to-close="false">
      <template v-slot:title>Please verify your age</template>
    </ConfirmModal>
  </div>

  <div>
    <LoginModal v-model="showLoginModal">

    </LoginModal>
  </div>

  <div class="container-fluid root-container">

    <div class="row header-component container-fluid">
      <HeaderComponent>

      </HeaderComponent>
    </div>

    <div class="body-component container-fluid">
      <BodyComponent>

      </BodyComponent>
    </div>

  </div>
</template>

<script>

import HeaderComponent from "@/components/core/Header";
import BodyComponent from "@/components/core/Body";
import ConfirmModal from "@/components/modals/ConfirmModal";
import {computed} from "vue";
import LoginModal from "@/components/modals/LoginModal";

export default {
  name: 'App',
  components: {LoginModal, ConfirmModal, BodyComponent, HeaderComponent},

  data() {
    return {
      isConfirmed: null,
      showConfirmModal: null,
      isAuthenticated: null,
      showLoginModal: null,
    }
  },

  provide() {
    return {
      isConfirmed: computed(() => (this.isConfirmed)),
      isAuthenticated: computed(() => (this.isAuthenticated)),
      showLoginModal: computed(() => (this.showLoginModal)),
      openLoginModalFun: () => {
        this.showLoginModal = true;
      },
      closeLoginModalFun: () => {
        this.showLoginModal = false;
      },
    }
  },


  methods: {
    confirm(close) {
      this.$cookies.set('isConfirmed', true)
      this.showConfirmModal = false
      this.isConfirmed = true
      close()
    },
    cancel(close) {
      close()
      window.location.href = 'https://murrengan.ru';
    },
  },


  created() {
    this.showLoginModal = false;
    this.isConfirmed = !!this.$cookies.get('isConfirmed')
    this.showConfirmModal = !this.isConfirmed
    if (!this.$cookies.get('boobs_session')) {
      this.isAuthenticated = false
    } else {
      this.isAuthenticated = true
    }
  }


}
</script>

<style>
html, body {
  background: #222629;
}

#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.p {
  font-size: 0.5rem;
  color: white;
}

.root-container {
  min-height: 100vh;
  margin: 0;
}

.header-component {
  height: 60px;
  color: white;
}

.body-component {
  justify-content: center;
}

</style>

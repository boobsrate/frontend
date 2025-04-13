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
    <!-- Индикатор цензуры -->
    <div v-if="isCensorshipMode" class="censorship-banner">
      <div class="censorship-text">
        <span>Режим цензуры активирован</span>
        <a @click.prevent="disableCensorship" href="#" class="disable-censorship-link">Отключить</a>
      </div>
    </div>

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
import axios from "axios";
import {Centrifuge} from "centrifuge";
import CensorshipService from "@/services/CensorshipService";

export default {
  name: 'App',
  components: {LoginModal, ConfirmModal, BodyComponent, HeaderComponent},

  data() {
    return {
      isConfirmed: null,
      showConfirmModal: null,
      isAuthenticated: null,
      showLoginModal: null,
      centrifuge: null,
      channel: null,
      cToken: null,
      sub: null,
      isCensorshipMode: false,
    }
  },

  computed: {
    /**
     * Проверяет, активирован ли режим цензуры
     * @returns {boolean} true, если режим цензуры активирован
     */
    checkCensorshipMode() {
      return CensorshipService.isCensorshipEnabled();
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
      subBoobs: computed(() => (this.sub)),
      subBoobsOnline: computed(() => (this.sub)),
    }
  },


  methods: {
    /**
     * Отключает режим цензуры
     */
    disableCensorship() {
      // Удаляем параметр murr_censorship из URL
      const url = new URL(window.location.href);
      url.searchParams.delete('murr_censorship');

      // Переходим на новый URL без параметра цензуры
      window.location.href = url.toString();
    },

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

    async getConnectionToken() {
      try {
        const response = await axios.get("https://dev.boobsrate.com/api/auth/get-token");
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    document.title = "Rate Tits";
    // Проверяем режим цензуры
    this.isCensorshipMode = this.checkCensorshipMode();
  },


  async created() {
    this.showLoginModal = false;
    this.isConfirmed = !!this.$cookies.get('isConfirmed')
    this.showConfirmModal = !this.isConfirmed
    this.isAuthenticated = this.$cookies.get('boobs_session');

    const data = await this.getConnectionToken()

    console.log(data)
    this.centrifuge = new Centrifuge(
        "wss://" + process.env.VUE_APP_WS_URL + "/connection/websocket",
        {debug: true, name: "front", token: data.token}
    )

    this.centrifuge.on('connecting', function (ctx) {
      console.log(`connecting: ${ctx.code}, ${ctx.reason}`);
    }).on('connected', function (ctx) {
      console.log(`connected over ${ctx.transport}`);
    }).on('disconnected', function (ctx) {
      console.log(`disconnected: ${ctx.code}, ${ctx.reason}`);
    }).connect();

    this.sub = this.centrifuge.newSubscription("boobs_dev", {token: data.chan_token});
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

/* Стили для баннера цензуры */
.censorship-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #46344E;
  color: #d1d1d3;
  z-index: 9999;
  padding: 5px 0;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.censorship-text {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.disable-censorship-link {
  color: #d1d1d3;
  text-decoration: underline;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #303C6C;
  transition: background-color 0.3s ease;
}

.disable-censorship-link:hover {
  background-color: #081d74;
  color: white;
}

</style>

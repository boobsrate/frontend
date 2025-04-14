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

  <!-- Виджет чата (отображается всегда, но ввод ограничен) -->
  <ChatWidget />
</template>

<script>

import HeaderComponent from "@/components/core/Header";
import BodyComponent from "@/components/core/Body";
import ConfirmModal from "@/components/modals/ConfirmModal";
import {computed, reactive} from "vue";
import LoginModal from "@/components/modals/LoginModal";
import axios from "axios";
import {Centrifuge} from "centrifuge";
import CensorshipService from "@/services/CensorshipService";
import ChatWidget from "@/components/chat/ChatWidget.vue";

export default {
  name: 'App',
  components: {LoginModal, ConfirmModal, BodyComponent, HeaderComponent, ChatWidget},

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
      chatChannelName: "chat_global",
      chatSub: null,
      chatMessages: reactive([]),
      chatError: null,
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
      chatMessages: computed(() => this.chatMessages),
      chatError: computed(() => this.chatError),
      sendChatMessage: this.sendChatMessageViaApi,
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

    async getConnectionToken() {
      try {
        const response = await axios.get(process.env.VUE_APP_BACKEND_URL + "/auth/get-token");
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async sendChatMessageViaApi(messageText) {
      if (!messageText || !messageText.trim()) return;

      if (!this.isAuthenticated) {
        console.warn("User is not authenticated. Cannot send chat message.");
        this.chatError = "You must be logged in to send messages.";
        return;
      }

      this.chatError = null;

      try {
        const response = await axios.post(
            process.env.VUE_APP_BACKEND_URL + '/chat/messages',
            { text: messageText.trim() },
            { withCredentials: true }
        );

        if (response.status === 200 || response.status === 201) {
          console.log('Chat message sent via API');
        } else {
          const errorMsg = response.data?.message || response.statusText || "Server error";
          this.chatError = `Failed to send message: ${errorMsg}`;
          console.error("Failed to send chat message via API:", response);
        }
      } catch (error) {
        console.error("Error sending chat message via API:", error);
        if (error.response) {
          const errorMsg = error.response.data?.message || error.response.statusText || "Server error";
          this.chatError = `Failed to send message: ${errorMsg}`;
        } else {
          this.chatError = "Failed to send message: Network error or server unavailable.";
        }
      }
    },
  },

  mounted() {
    document.title = "Rate Tits";
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

    this.sub = this.centrifuge.newSubscription(process.env.VUE_APP_WS_CHAN, {token: data.chat_token});
    
    // Подписка на канал чата
    this.chatSub = this.centrifuge.newSubscription(this.chatChannelName, {token: data.chat_token});
    
    // Обработчик событий для получения сообщений чата
    this.chatSub.on('publication', (ctx) => {
      const message = ctx.data;
      if (message && (message.text || message.sender)) {
        // Добавляем сообщение в массив сообщений чата
        this.chatMessages.push({
          id: Date.now() + Math.random().toString(36).substr(2, 9), // генерируем уникальный ID
          sender: message.sender || 'System',
          text: message.text || '',
          timestamp: message.timestamp || new Date().toISOString()
        });
      }
    });
    
    // Обработчик ошибок подписки на чат
    this.chatSub.on('error', (ctx) => {
      console.error('Chat subscription error:', ctx);
      this.chatError = 'Ошибка подключения к чату: ' + (ctx.message || 'Неизвестная ошибка');
    });
    
    // Активируем подписку на чат
    this.chatSub.subscribe();
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

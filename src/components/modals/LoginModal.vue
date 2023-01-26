<template>
  <vue-final-modal v-bind="$attrs" classes="modal-container" content-class="modal-content">
    <span class="modal__title">
      Please auth via telegram
    </span>
    <div ref="telegram" class="tg-widget"></div>
  </vue-final-modal>
</template>

<script>

import axios from "axios";

export default {
  name: "LoginModal",
  inject: ["closeLoginModalFun"],

  methods: {
    onTelegramAuth(user) {
      console.log(user)
      axios.post(
          process.env.VUE_APP_BACKEND_URL + '/auth/tg-login',
          user
      ).catch(error => (console.log(error))).then(this.closeLoginModalFun)
      this.isAuthenticated = true
    },
  },

  mounted() {
    let telegramLoginScript = document.createElement("script");
    telegramLoginScript.src = "https://telegram.org/js/telegram-widget.js?19";
    telegramLoginScript.async = true;
    telegramLoginScript.setAttribute("data-size", "medium");
    telegramLoginScript.setAttribute("data-telegram-login", process.env.VUE_APP_BOT_NAME);
    window.onTelegramAuth = this.onTelegramAuth
    telegramLoginScript.setAttribute("data-onauth", "window.onTelegramAuth(user)");
    telegramLoginScript.setAttribute("data-request-access", "write");
    this.$refs.telegram.appendChild(telegramLoginScript);
  }
};


</script>


<style scoped>
::v-deep(.modal-container) {
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

::v-deep(.modal-content) {
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}

.modal__title {
  font-size: 1rem;
  font-weight: 700;
}

.dark-mode div ::v-deep(.modal-content) {
  border-color: #2d3748;
  background-color: #1a202c;
}

button {
  background: #3B2894;
  color: #fff;
  outline-color: transparent;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 clamp(12px, 2vw + 0.1%, 4rem);
}

@media (max-width: 720px) {
  ::v-deep(.modal-container) {
    width: 80%;
  }

  button {
    margin: 7px 0;
  }
}
</style>


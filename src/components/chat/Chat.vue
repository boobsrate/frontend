<template>
  <div class="online info container-fluid">
    Online now: {{ online }}
  </div>
  <div class="chat container-sm overflow-auto">
      <chat_message
          v-for="chat_message in chat_messages.slice().reverse()"
          :key="chat_message.msg_id"
          :chat_message="chat_message"
      />
    </div>
</template>

<script>

import chat_message from "@/components/chat/ChatMessage";
import WS from "@/services/ws";

export default {
  name: "chat",
  components: {
    chat_message
  },


  data() {
    return {
      online: 0,
      chat_messages: []
    }
  },

  methods : {
    setOnline: function (online) {
      this.online = online;
    },
    addMessage: function (message) {
      this.chat_messages.push(message);
    }
  },


  mounted() {
    WS.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if (data.type === "online_users") {
        this.setOnline(data.message.online)
      }
      if (data.type === "new_rating") {
        this.addMessage({"msg_id": data.msg_id, "tits_id": data.message.tits_id, "new_rating": data.message.new_rating})
      }
    }
  }
}
</script>

<style scoped>
.chat {
  border-radius: 5px;
  height: 10vh;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
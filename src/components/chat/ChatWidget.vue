<template>
  <div class="chat-widget-container">
    <!-- Кнопка открытия/закрытия чата -->
    <button @click="toggleChat" class="chat-toggle-button">
      <!-- Можно добавить индикатор новых сообщений -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
        <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
      </svg>
      <span v-if="!isChatOpen" style="margin-left: 5px;">Chat</span>
    </button>

    <!-- Окно чата -->
    <div v-if="isChatOpen" class="chat-window">
      <div class="chat-header">
        Global Chat
        <button @click="closeChat" class="close-button" aria-label="Close chat">&times;</button>
      </div>

      <!-- Сообщения -->
      <div class="chat-messages" ref="messagesContainer">
        <div v-if="chatError" class="chat-error">
          {{ chatError }} <!-- Отображаем ошибку из App.vue -->
        </div>
         <!-- Отображаем сообщения -->
        <div v-for="msg in chatMessages" :key="msg.id" class="message">
          <span class="message-sender">{{ msg.sender || 'System' }}:</span>
          <span class="message-text">{{ msg.text || '' }}</span>
        </div>
         <!-- Инфо-сообщения -->
        <div v-if="!chatError && chatMessages.length === 0" class="chat-info">
          Connecting or no messages yet...
        </div>
      </div>

      <!-- Поле ввода -->
      <div class="chat-input">
        <input
          type="text"
          v-model="newMessage"
          @keyup.enter="handleSendMessage"
          placeholder="Type a message..."
          :disabled="!!chatError || !isAuthenticated" 
        />
        <button @click="handleSendMessage" :disabled="!!chatError || !newMessage.trim() || !isAuthenticated">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, inject } from 'vue';

// Внедряем состояние и метод отправки из App.vue
const chatMessages = inject('chatMessages');
const chatError = inject('chatError');
const sendChatMessage = inject('sendChatMessage');
const isAuthenticated = inject('isAuthenticated');

const isChatOpen = ref(false);
const newMessage = ref('');
const messagesContainer = ref(null);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const closeChat = () => {
  isChatOpen.value = false;
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};

const handleSendMessage = () => {
  if (newMessage.value.trim() && !chatError.value) { // Проверяем и текст, и отсутствие ошибки
    sendChatMessage(newMessage.value); // Используем внедренный метод
    newMessage.value = '';
    // Не нужно прокручивать здесь, watch на chatMessages сделает это
  }
};

// Следим за открытием чата, чтобы прокрутить вниз
watch(isChatOpen, (newVal) => {
  if (newVal) {
    scrollToBottom();
  }
});

// Следим за новыми сообщениями (из App.vue) и прокручиваем вниз
watch(chatMessages, () => {
  if (isChatOpen.value) {
      scrollToBottom();
  }
}, { deep: true });

// Прокрутка при первой загрузке, если чат открыт
onMounted(() => {
    if (isChatOpen.value) {
        scrollToBottom();
    }
});

</script>

<style scoped>
.chat-widget-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1050; /* Убедитесь, что z-index выше других элементов, например, модалок */
}

.chat-toggle-button {
  background-color: #5865F2; /* Discord-подобный цвет */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 50px; /* Круглая кнопка */
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.chat-toggle-button:hover {
  background-color: #4752C4;
}

.chat-window {
  width: 370px; /* Чуть шире */
  height: 550px; /* Чуть выше */
  background-color: #36393f; /* Темный фон */
  color: #dcddde; /* Светлый текст */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  bottom: 70px; /* Выше кнопки */
  right: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.chat-header {
  background-color: #2f3136; /* Еще темнее */
  color: white;
  padding: 12px 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.close-button {
    background: none;
    border: none;
    color: #b9bbbe;
    font-size: 24px;
    cursor: pointer;
    line-height: 1;
    padding: 0 5px;
}
.close-button:hover {
    color: white;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px 15px;
  background-color: #36393f;
}

/* Стилизация скроллбара */
.chat-messages::-webkit-scrollbar {
  width: 8px;
}
.chat-messages::-webkit-scrollbar-thumb {
  background-color: #202225;
  border-radius: 4px;
}
.chat-messages::-webkit-scrollbar-track {
  background-color: #2f3136;
}

.message {
  margin-bottom: 12px;
  padding: 8px 10px;
  background-color: transparent; /* Убираем фон отдельного сообщения */
  border-radius: 5px;
  word-wrap: break-word;
  line-height: 1.4;
  display: flex; /* Для отступов */
}

.message-sender {
    font-weight: 500; /* Немного жирнее */
    margin-right: 8px;
    color: #ffffff; /* Имя пользователя белым */
    flex-shrink: 0; /* Не сжимать имя */
}

.message-text {
    color: #dcddde; /* Основной текст */
}

.chat-info,
.chat-error {
    text-align: center;
    color: #72767d; /* Серый цвет для инфо */
    margin-top: 20px;
    padding: 10px;
}

.chat-error {
    color: #f04747; /* Красный для ошибок */
    background-color: rgba(240, 71, 71, 0.1);
    border-radius: 5px;
}

.chat-input {
  display: flex;
  padding: 15px;
  background-color: #40444b; /* Фон поля ввода */
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.chat-input input {
  flex-grow: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  background-color: #484c52; /* Фон инпута */
  color: #dcddde;
  outline: none;
}
.chat-input input::placeholder {
    color: #72767d;
}

.chat-input button {
  padding: 10px 15px;
  background-color: #5865F2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.chat-input button:hover {
  background-color: #4752C4;
}

.chat-input button:disabled {
  background-color: #72767d; /* Серый для неактивной кнопки */
  cursor: not-allowed;
  opacity: 0.5;
}

</style> 
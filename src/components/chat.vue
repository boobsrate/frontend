<template>
  <div class="chat">
    <div class="chat__body" v-if="isOpen">
      <div class="chat__body-messages">
        <div class="chat__body-message">
          <div class="chat__body-message-text">
            {{ message.text }}
          </div>
          <div class="chat__body-message-time">
            {{ message.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat"
}
</script>

<style scoped>
.chat {
  width: 100%;
  height: 20%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

</style>
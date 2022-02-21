<template>
  <div class="body">
    <div class="wrapper container">
      <ratingWrapper/>
      <div class="chat-wrap">
        <Chat/>
      </div>
    </div>
  </div>
</template>

<script>
import ratingWrapper from "@/components/Rating";
import Chat from "@/components/chat/Chat";

export default {
  name: "Home",
  components: {
    ratingWrapper,
    Chat
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #dcdcdc;
  display: flex;
  flex-direction: column;
}

.chat-wrap {
  padding-bottom: 10px;
}

@media screen and (max-width: 900px) {
  .body {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
  }
}
</style>
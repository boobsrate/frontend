<template>
  <div class="body">
    <ratingWrapper/>
    <Chat/>
  </div>
</template>

<script>
import ratingWrapper from "@/components/rating";
import Chat from "@/components/chat";

export default {
  name: "body",
  components: {
    ratingWrapper,
    Chat
  }
}
</script>

<style scoped>
 .body {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

</style>
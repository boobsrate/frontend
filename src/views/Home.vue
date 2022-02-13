<template>
  <div class="body container">
    <ratingWrapper/>
    <Chat/>
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

</style>
<template>
  <div class="body container">
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

</style>
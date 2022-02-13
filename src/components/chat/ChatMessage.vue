<template>
  <div class="chat-message row">
    <p>Card {{chat_message.tits_id}} updated! New rating: {{chat_message.new_rating}}</p>
  </div>
</template>

<script>
export default {
  name: "chat-message",
  props: {
    chat_message: {
      type: Object,
      required: true,
      default() {
        return {
          tits_id: "",
          new_rating: "",
        }
      },
    },
  },
}
</script>

<style scoped>

</style>
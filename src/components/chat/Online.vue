<template>
  <div class="online-component">
    Online now: {{ online }}
  </div>
</template>

<script>



export default {
  name: "Online-component",

  components: {},


  data() {
    return {
      online: 0,
    }
  },

  created() {
//    this.$options.sockets.onmessage = (event) => {
//      let data = JSON.parse(event.data);
//      console.log(data);
//      if (data.type === "online_users") {
//        this.setOnline(data.message.online)
//      }
//    }
  },

  methods: {
    setOnline: function (online) {
      this.online = online;
    },
  },

}
</script>

<style scoped>

</style>
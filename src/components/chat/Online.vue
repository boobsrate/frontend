<template>
  <div class="online-component">
    Online now: {{ online }}
  </div>
</template>

<script>


export default {
  name: "Online-component",
  inject: ["subBoobs"],
  components: {},


  data() {
    return {
      online: 0,
    }
  },

  created() {
    this.subBoobs.on('publication', function (message) {
      if (message.data.type === "online_users") {
        this.online = message.data.message.online
      }
    }).subscribe();

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
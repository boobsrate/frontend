<template>
  <div class="online-component">
    Online now: {{ online }}
  </div>
</template>

<script>


export default {
  name: "Online-component",
  inject: ["subBoobsOnline"],
  components: {},

  data() {
    return {
      online: 0,
    }
  },

  watch: {},

  mounted() {
    // wait until subBoobsOnline is not null
    this.$watch(
        () => this.subBoobsOnline,
        (val) => {
          if (val) {
            console.log("subBoobsOnline is not null. subscribing to online_users")
            this.subBoobsOnline.on('publication', function (message) {
              console.log(message)
              if (message.data.type === "online_users") {
                console.log(message)
                this.online = message.data.message.online
              }
            }.bind(this)).subscribe();
          }
        },
    )
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
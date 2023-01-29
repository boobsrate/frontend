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

  watch: {
    subBoobsOnline: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          console.log("subBoobsOnline", newVal)
          newVal.on('publication', function (message) {
            if (message.data.type === "online_users") {
              this.online = message.data.message.online
            }
          }.bind(this)).subscribe();
        }
      }
    }
  },

  created() {
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
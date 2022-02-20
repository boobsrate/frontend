<template>
    <Header></Header>
    <router-view></router-view>
</template>

<script>

import Header from "@/components/includes/Header"

export default {
  name: 'BoobsRate',
  components: {
    Header,
  },

}


</script>

<style>
app {
  height: 100vh;
}

html, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #435c75;
  background-color: gainsboro;
}
</style>

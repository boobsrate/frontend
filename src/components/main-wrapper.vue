<template>

  <div class="main-wrapper container-fluid">

    <div class="row">
      <Header/>
    </div>

    <div class="row">
      <Body/>
    </div>


  </div>

</template>

<script>

import Body from "@/components/body";
import Header from "@/components/header";

export default {
  name: 'main-wrapper',
  components: {
    Body,
    Header,
  },
  props: {},
  computed: {},
  methods: {},
  watch: {},
  data() {
    return {
      title: 'main-wrapper'
    }
  },
  mounted() {
    console.log('main-wrapper mounted')
  }
}
</script>

<style scoped>

.main-wrapper {
  height: 100vh;
  padding: 10px;
  margin: 0;
}

</style>
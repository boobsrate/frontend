<template>

  <div class="main-wrapper">
    <Header/>
    <Body/>
    <Footer/>
  </div>

</template>

<script>

import Body from "@/components/body";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  name: 'main-wrapper',
  components: {
    Body,
    Header,
    Footer
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
  display: flex;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  flex-direction: column;
}

</style>
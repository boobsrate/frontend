<template>
  <div class="compare-view container-fluid">
    <CompareComponent>

    </CompareComponent>
  </div>
</template>

<script>
import CompareComponent from "@/components/compare/Compare";

export default {
  name: "Compare-view",
  components: {CompareComponent}
}
</script>

<style scoped>

.compare-view {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
  align-self: center;
  align-content: center;
  height: 85vh;
}

.compare-component {
  display: flex;
  align-self: center;
  align-items: center;
  align-content: center;
  flex-direction: row;
  justify-content: space-evenly;
}

.chat-component {
  align-self: center;
  height: 10vh;
}

</style>
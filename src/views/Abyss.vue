<template>
  <div class="abyss-view container-fluid">
    <AbyssComponent>

    </AbyssComponent>
  </div>
</template>

<script>
import AbyssComponent from "@/components/abyss/Abyss";

export default {
  name: "Abyss-view",
  components: {AbyssComponent}
}
</script>

<style scoped>

.abyss-view {
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

</style>
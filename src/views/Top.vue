<template>
  <div class="top-view container-fluid">
    <TopComponent>

    </TopComponent>
  </div>
</template>

<script>
import TopComponent from "@/components/top/Top";

export default {
  name: "Top-view",
  components: {TopComponent}
}
</script>

<style scoped>

.top-view {
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
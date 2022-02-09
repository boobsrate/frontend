<template>
  <div class="header">
    <div class="header__nav">
      <a href="#">Main</a>
      <a href="#">Top 25 today</a>
      <a href="#">Top 25 this month</a>
      <a href="#">Top 100 ever</a>
      <a href="#">Abyss</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>
.header__nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  max-width: 1100px;
}

.header {
  background-color: #ccc;
  height: 5vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

</style>
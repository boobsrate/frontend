<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Boobs rate</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <div class="left">
            <a class="nav-link" href="#">Main</a>
            <a class="nav-link" href="#">Top 25</a>
            <a class="nav-link" href="#">Top 100</a>
            <a class="nav-link" href="#">Abyss</a>
          </div>
          <div class="right">
            <a class="nav-link" href="https://murrengan.ru"> Murrengan </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "header"
}
</script>

<style scoped>

.navbar-nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.left {
  display: flex;
}

.right {
  display: flex;
}
</style>
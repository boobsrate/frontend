<template>
  <nav class="navbar navbar-expand-xl fixed-top navbar-dark">
    <a class="navbar-brand" href="/">( . )( . ) BoobsRate ( . )( . )</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="left-nav navbar-nav">
        <router-link :to="'/'" class="nav-link">Main</router-link>
        <router-link :to="'/top/25'" class="nav-link">Top 25</router-link>
        <router-link :to="'/top/100'" class="nav-link">Top 100</router-link>
        <router-link :to="'/abyss/100'" class="nav-link">Abyss</router-link>
      </div>
      <div class="dropdown-divider"></div>
      <div class="online-nav navbar-nav">
        <OnlineComponent>

        </OnlineComponent>
      </div>
      <div class="dropdown-divider"></div>

      <div class="right-nav navbar-nav">
        <a class="nav-link murr-nav" href="https://murrengan.ru">  Murrengan  </a>
      </div>
    </div>
  </nav>
</template>


<script>
import OnlineComponent from "@/components/chat/Online";

export default {
  name: "Header-component",
  components: {OnlineComponent},
}
</script>

<style scoped>

.navbar {
  background: #2D283E;
  border-bottom: solid #46344E;
  border-bottom-width: 0.1rem;
  display: flex;
  z-index: 1;
  color: white;
}

.navbar-brand {
  color: white;
  font-weight: bold;
  font-size: x-large;
}

.nav-link, .online-nav {
  color: white !important;
  font-weight: bolder;
}

.navbar-nav {
  display: flex;
}

.left-nav {
  display: flex;
  align-self: flex-start;
}

.online-nav {
  display: flex;
  align-self: center;
  margin-left: 50%;
}

.right-nav {
  margin-left: auto;
  display: flex;
  align-self: center;
}

@media screen and (max-width: 1200px) {
  .online-nav {
    margin-left: 0;
  }
}

@media screen and (max-width: 380px) {
  .navbar-brand {
    font-size: large;
  }
}


</style>
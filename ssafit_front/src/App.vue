<template>
  <div id="app">
    <header-view></header-view>
    <router-view/>
    <footer-view></footer-view>
  </div>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue'
import FooterView from '@/views/FooterView.vue'

export default {
  name: 'HomeView',
  components: {
    HeaderView, FooterView
  }
}

</script>

<style>
#app {
  font-family: 'IBM Plex Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

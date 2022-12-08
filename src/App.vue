<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import HelloWorld from './components/HelloWorld.vue'
  import AboutView from './views/AboutView.vue'
  import MusicView from './views/Music.vue'
  import ListenOne from './views/ListenOne.vue'
  import CloudShow from './views/Echarts/CloudShow.vue'



</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo1.png" width="115" height="115" />


    <p v-show="showTime=false">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/music">music</RouterLink>
      <RouterLink to="/bg/one">背景图片</RouterLink>
    </p>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>

        <RouterLink to="/pushing">pushing</RouterLink>
        <RouterLink to="/dialogOne">每日提示</RouterLink>
        <RouterLink to="/smkmonitor1">数据展示</RouterLink>
        <RouterLink to="/cloud/one">云</RouterLink>
        <RouterLink to="/map/one">苏州地图</RouterLink>
        <RouterLink to="/baberrage/one">弹幕世界</RouterLink>

      </nav>
    </div>
  </header>

  <RouterView />
  <ListenOne>  </ListenOne>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  html{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  }

}
</style>

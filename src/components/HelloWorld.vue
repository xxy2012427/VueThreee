<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      This project use
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a> + Flask
    </h3>
    <p v-show="showTime=false">
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vant-contrib.gitee.io/vant/#/zh-CN/home" target="_blank" rel="noopener">Vant 3</a> +
      <a href="https://echarts.apache.org" target="_blank" rel="noopener">Echarts</a>.
    </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
.greetings2 {
  background: #ff363d;
}
</style>

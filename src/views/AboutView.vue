<template>
  <!-- 可供选择的主题切换按钮 -->
  <div class="about">
    <h1>This is John's Music festival !</h1>
    <br />
    <p></p>
    <span v-once> {{ msg }}</span>
    <li><a>{{msg}}</a></li>
    <li><a>{{msg2}}</a></li>
    <button @click="change">叫声</button>
    <button @click="getInfo">发送(get)</button>
    <button @click="postInfo">发送(post)</button>
  </div>

</template>

<script>
  import {articleList} from '../request/api.js'
  import axios from "axios"
  export default {
  name: 'About',
  data () {
    return {
      link: '<a href="http://localhost:8877">瓶中世界</a>',
      name: 10,
      msg: 'Listen to Johns Sound',
      msg2:'ans',
      id: 1,
      timestamp: 2
    }
  },
  mounted () {
      console.log(`The initial count is ${this.name}.`)
  },
  methods: {
    async initArticleList() {
      const { data: res } = await articleList(1, 2)
      this.list = res.data.results
      console.log(this.list)
    },
    change(){
      this.msg = "咩咩！"  // 改变data中属性的值
    },
    getInfo() {
      axios.get('/api/restful1').then((res) => {
        console.log(res.data)
        this.msg2=res.data
      })
    },
    postInfo() {
      axios.post('/api/restful1').then((res) => {
        console.log(res.data)
        this.msg2=res.data
      })
    },
    }


}
</script>


<style scoped lang="less">
  @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
    <div class="Pushing" ref="PushingRef">
        <h1>{{time}}</h1>
        <p v-show="showAudio">
            <audio controls ref="audioTime"  class="audT">
                <source src="../assets/audios/TimeStop.mp3" />
            </audio>
        </p>
        <van-button hairline round color="linear-gradient(to right, #24EBFA, #3E1CFA)" type="primary" @click="timeStop">時を止まれ</van-button>
        <p v-show="show2">
            <span>{{ publishedBooksMessage }}</span>
            <span>{{ author.books[0] }}</span>
        </p>
        <div :style="styleObject">13</div>
        <van-button hairline round color="linear-gradient(to right, #24EBFA, #3E1CFA)" type="primary" @click="changeStyle">换色</van-button>
        <van-button hairline round color="linear-gradient(to right, #24EBFA, #3E1CFA)" type="primary" @click="showAll">{{showAllText}}</van-button>
    </div>
</template>

<script>
    export default {
        name: "Pushing",
        data() {
            return {
                showAudio:false,
                show2:false,
                showFlag:false,
                showAllText:'现形',
                author: {
                    name: 'John Doe',
                    books: [
                        'Vue 2 - Advanced Guide',
                        'Vue 3 - Basic Guide',
                        'Vue 4 - The Mystery'
                    ]
                },
                styleObject: {
                    color: 'red',
                    fontSize: '33px'
                },
                time: 0,
                timeInter: null,
            }
        },
        mounted() {
            // 在其他方法或是生命周期中也可以调用方法
            this.styleObject.color='blue';
            this.timeInter = setInterval(() => {
                this.clock()  // methods里的方法
            }, 1000)
        },
        computed: {
            // 一个计算属性的 getter
            publishedBooksMessage() {
                // `this` 指向当前组件实例
                return this.author.books.length > 0 ? 'Yes' : 'No'
            }
        },
        methods: {
            changeStyle(){
                const r1 = Math.random() * 10;
                if (r1<4){
                    this.styleObject.color='green'
                }
                else if(r1<7) {
                    this.styleObject.color='red'
                }
                else {
                    this.styleObject.color='yellow'
                }
            },
            clock(){
                var d=new Date();
                const t=d.toLocaleTimeString();
                this.time=t;
            },
            timeStop(){
                clearInterval(this.timeInter);
                this.$refs.audioTime.volume = 0.1;
                this.$refs.audioTime.play();
            },
            showAll(){
                if(!this.showFlag) {
                    this.showAllText='隐藏';
                    this.showFlag = true;
                    this.showAudio = true;
                    this.show2 = true;
                }else{
                    this.showAllText='现形';
                    this.showFlag=false;
                    this.showAudio = false;
                    this.show2 = false;
                }
            }
        },
        beforeUnmount() {
            console.log('定时器释放:', this.timeInter)
            clearInterval(this.timeInter);
            // this.stopColor()
            this.timeInter = null
        },
    }
</script>

<style scoped>


</style>

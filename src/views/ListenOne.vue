<template>
    <div class="ListenOne" ref="playerRef">
        <p v-show="showAudio">
        <audio controls ref="audio"  class="aud">
            <source src="../assets/audios/sg.mp3" />
        </audio>
        </p>
        <van-row justify="end">
            <van-button  hairline round color="linear-gradient(to right, #24EBFA, #3E1CFA)" type="primary" is-link @click="startPlay">播放</van-button>
            <van-button  hairline round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" is-link @click="pausePlay">暂停</van-button>
        </van-row>
        <van-cell is-link title="歌曲选择" v-bind:value="SongSelect"  size="large"  v-model="SongSelect" @click="SongSelectChoice = true" />
        <van-action-sheet v-model:show="SongSelectChoice" :actions="songs" @select="onSelect" />


    </div>
</template>

<script>
    import {Dialog, Toast} from 'vant';
    export default {
        name: 'ListenOne',
        data () {
            return {
                checked: false,
                showAudio:false,
                songs:[{name:'山鬼'},{name:'滕王阁序'},{name:'琵琶行'},],
                musicpath: "../assets/audios/sg.mp3",
                SongSelect:'山鬼',
                SongSelectChoice:false
            }
        },  // 注意：组件挂载后才能访问到 ref 对象
        mounted() {
            //this.$refs.checkbox.toggle();
        },
        watch:{

        },
        methods: {
            startPlay() {
                this.$refs.audio.volume = 0.2;
                this.$refs.audio.play()
            },
            pausePlay() {
                this.$refs.audio.pause()
            },
            changePlay() {
                const url1=new URL("../assets/audios/twgx.mp3", import.meta.url).href;
                this.$refs.audio.src=url1;
            },
            onSelect(item){
                this.SongSelectChoice=false;
                this.SongSelect=item.name;
                if(item.name=="滕王阁序"){
                    const url2=new URL("../assets/audios/twgx.mp3", import.meta.url).href;
                    this.$refs.audio.src=url2;
                }else if (item.name=="山鬼"){
                    const url3=new URL("../assets/audios/sg.mp3", import.meta.url).href;
                    this.$refs.audio.src=url3;
                }
                //this.$Toast("切换歌曲成功");
                Dialog({ message: '切换歌曲成功' });
            },
        }
    }
</script>

<style scoped lang='scss'>
    @import '../assets/scss/globalMixin.scss';
    .ListenOne{
        background-color: $bg-color2;
        border: 1px solid #E0E0E0;
        border-radius: 4px;

    }
    .van-cell {
        background-color: $bg-color2;
    }
</style>

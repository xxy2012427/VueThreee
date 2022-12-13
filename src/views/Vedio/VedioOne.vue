<template>
    <div ref="videoRef" class="player" />
</template>

<script>
    import { ref } from 'vue'
    import Dplayer from 'dplayer'
    export default {
        name: "VedioOne",
        setup(){
            const videoRef = ref(); // 获取视频容器
            new Dplayer({  //初始化视频对象
                container:videoRef.value,   //指定视频容器节点
                video:{
                    url:video.url,   // 指定视频播放链接
                    pic:video.cover  // 指定视频封面图
                },
                danmuku:{
                    addition:video.danmuurl    //配置弹幕接口路径
                }
            });
            return {
                videoRef
            }
        }
    }
</script>

<style scoped>

</style>

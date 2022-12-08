<template>
    <div :style="background" ref="bg2" class="bg" >
        <img src="../assets/images/bg1.jpg" style="width: 400px; height: 400px;">
    </div>
</template>

<script>
    import imgUrl from '../assets/images/bg1.jpg'
    export default {
        name: "bg",
        data() {

            return {
                background: {
                    //背景图片地址
                    backgroundImage: imgUrl,
                    // 背景图片是否重复
                    backgroundRepeat: 'no-repeat',
                    // 背景图片大小
                    backgroundSize: 'cover',
                    // 背景颜色
                    backgroundColor: '#58fa99',
                    // 背景图片位置
                    backgroundPosition: 'center top',

                },
            }
        },
        mounted () {
            // 添加背景图片
            const url1=new URL("../src/assets/images/bg1.jpg", import.meta.url).href;
            document.body.style.backgroundSize = '100%';
            document.body.style.backgroundColor='#415efa';
            //this.$refs.bg2.style.backgroundImage=url1;
            document.body.style.backgroundImage = "url(url1)";
        },
        // 离开VUE时调用的钩子函数
        beforeUnmount () {
            // 清除背景图片
            document.body.style.backgroundImage = ''
        }

    }
</script>

<style scoped>

    .bg {
        height: 545px;
        width: 500px;
        background: no-repeat center top;
    }
    .body2 {
        background-image:url('../assets/images/bg1.jpg');
    }
    .body3 {
        background:#0000FF url('../assets/images/bg1.jpg') repeat-x;
    }
</style>

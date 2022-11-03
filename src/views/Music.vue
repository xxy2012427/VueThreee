<template>
    <div class="music">
    <h1>Music House !</h1>
        <h1>{{msg}}!</h1>
        <h1>{{theme}}!</h1>

        <van-button plain round  hairline size="small" type="primary"></van-button>
        <van-button
                icon="https://cdn.jsdelivr.net/npm/@vant/assets/user-active.png"
                type="primary"
        >
            按钮
        </van-button>
        <van-button disabled hairline round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" to="about">路由跳转</van-button>
        <van-button hairline round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" is-link @click="showPopup">Today</van-button>

        <van-popup
                v-model:show="show"
                closeable
                position="bottom"
                :style="{ height: '90%' }"
                v-html="task"
                style="white-space: pre-wrap"
        ></van-popup>

        <van-cell-group title="九歌">
            <van-cell icon="location-o" title="单元格" value="内容" />
            <van-cell is-link arrow-direction="down" title="单元格" value="内容" label="描述信息" />
        </van-cell-group>
        <van-cell-group title="山鬼">
            <van-cell title="单元格" value="内容" />
        </van-cell-group>
        日历
        <van-icon class="iconfont" class-prefix='icon-date' name='rili1' color="green"></van-icon>
        <van-icon class="iconfont" class-prefix='icon-date' name='rili2' color="blue"></van-icon>


    </div>
</template>

<script >
    import { ref } from 'vue';
    export default {
        name: "Music",
        setup() {
            const show = ref(false);
            const showPopup = () => {
                show.value = true;
            };
            return {
                show,
                showPopup,
            };
        },
        data () {
            var task="今日日常任务：\r\n1、逛集市，找颜料  \r\n2、唤醒连接，重构画画  \r\n3、归档 "
            //var task = str.replace(/\\r\\n/g, '<br/>')
            return {
                theme:"default",
                task,
                msg: 'Listen to First Song :mountain spirit',
            }
        },
        methods:{
            /** 点击更改主题 */
            event2()
            {
                this.theme="primary";
            },

        }
    }
</script>

<style scoped lang="less">
    .cell-check {
        border: 0.02667rem solid red;
        font-weight: 600;
    }
</style>

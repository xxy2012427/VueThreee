<template>
    <div>
        <div class="bullet-wrap">
            <view class="max">
                <image src="../../static/bg.png" mode=""></image>
            </view>
            <div
                    class="bullet-item"
                    :class="
          item.isImportant
            ? 'bold bullet-item-color-' +
              item.color +
              ' bullet-animation-' +
              item.random
            : 'bullet-item-color-' +
              item.color +
              ' bullet-animation-' +
              item.random
        "
                    :data-line="item.line"
                    v-for="item in state.bulletlist"
                    @animationend="animationend"
                    :key="item.id"
            >
                {{ item.name }}
            </div>
        </div>
        <div class="flex">
            <input
                    style="flex: 1 1 auto"
                    type="text"
                    ref="input"
                    v-model="state.values"
            />
            <button style="flex: 0 1 3em; text-align: center" @click="sendBullet">
                发送
            </button>
        </div>
    </div>
</template>
<script>
    import { reactive, onMounted } from "vue";

    export default {
        name: "Baberrage",
        setup() {
            function getUUID() {
                return Date.now() + Math.random();
            }
            const state = reactive({
                list: [
                    {
                        id: getUUID(),
                        name: "弹幕即将来袭~",
                        isLoginUser: true,
                        isImportant: true,
                        color: 0,
                        random: 0,
                        line: 0,
                    },
                    {
                        id: getUUID(),
                        name: "2222222",
                        isLoginUser: true,
                        isImportant: false,
                        color: 1,
                        random: 1,
                        line: 0,
                    },
                    {
                        id: getUUID(),
                        name: "3333",
                        isLoginUser: true,
                        isImportant: true,
                        color: 1,
                        random: 2,
                        line: 0,
                    },
                ], // 普通的弹幕队列
                clist: [], // c位的弹幕队列
                bulletlist: [], // 当前正在执行的
                values: "",
                idx: 3,
            });

            function animationend() {
                state.list.push(state.bulletlist.shift());
            }

            function sendBullet() {
                if (state.values) {
                    // 随机生成重要性和颜色
                    state.clist.push({
                        id: getUUID(),
                        name: state.values,
                        isLoginUser: true,
                        isImportant: Math.random() >= 0.5,
                        color: parseInt(Math.random() * (4 - 0 + 1) + 0, 10),
                        random: parseInt(Math.random() * (3 - 0 + 1) + 0, 10),
                        line: 0,
                    });
                    state.values = "";
                }
            }

            onMounted(() => {
                setInterval(() => {
                    var item = null;
                    if (state.idx == 3) {
                        // c 位
                        item = state.clist.shift();
                    }
                    if (!item) {
                        item = state.list.shift();
                    }
                    if (item) {
                        item.line = state.idx;
                        state.idx = (state.idx % 5) + 1;
                        state.bulletlist.push(item);
                    } else {
                        if (state.clist.length) {
                            item = state.clist.shift();
                            item.line = 3;
                            state.idx = 3;
                            state.bulletlist.push(item);
                        }
                    }
                }, 1000);
            });

            return {
                state,
                sendBullet,
                animationend,
            };
        },
    };
</script>
<style scoped>
    .flex {
        display: flex;
    }
    .div3{
        float:left;
    }
    .van-cell-group--inset {
        margin: auto;
        border-radius: 50px;
        border: 1px solid #d8d7d7;
    }
    .van-cell {
        background: #f8f8f8;
    }
    .bold {
        font-weight: bold;
    }
    .bullet-wrap {
        height: 400px;
        position: relative;
        overflow: hidden;
        background: #333;
        background-size: cover;
        margin-bottom: 40px;
    }
    .bullet-item {
        text-shadow: 1px 1px #000;
        color: #ffffff82;
        white-space: nowrap;
        user-select: none;
        position: absolute;
        top: 0;
        left: 0;
    }
    .bullet-item-color-0 {
        color: rgb(71, 104, 244);
    }
    .bullet-item-color-1 {
        color: rgb(231, 59, 80);
    }
    .bullet-item-color-2 {
        color: rgb(255, 121, 0);
    }
    .bullet-item-color-3 {
        color: rgb(18, 195, 153);
    }
    .bullet-item-color-4 {
        color: rgb(100, 104, 102);
    }
    .bullet-item[data-line="1"] {
        top: 0px;
    }
    .bullet-item[data-line="2"] {
        top: 80px;
    }
    .bullet-item[data-line="3"] {
        top: 160px;
    }
    .bullet-item[data-line="4"] {
        top: 240px;
    }
    .bullet-item[data-line="5"] {
        top: 320px;
    }
    .bullet-animation-0 {
        animation: right2left 6s linear both;
    }
    .bullet-animation-1 {
        animation: right2left 4s linear both;
    }
    .bullet-animation-2 {
        animation: right2left 8s linear both;
    }
    .bullet-animation-3 {
        animation: right2left 5s linear both;
    }

    @keyframes right2left {
        0% {
            transform: translate(100vw);
        }
        100% {
            transform: translate(-100%);
        }
    }
</style>


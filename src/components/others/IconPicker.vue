<template>
    <div class="pp_picker" ref="myRef">
        <div class="inp_box">
            <i class="inp_icon" :class="iconText"></i>
            <input
                    class="inp"
                    type="text"
                    v-model="iconText"
                    @focus="data.isShow = true"
                    placeholder="请选择图标"
            />
            <i class="inp_close" v-if="iconText" @click="changeIcon()">&times;</i>
        </div>
        <div class="poper" :class="data.cTop" v-if="data.isShow">
            <ul class="pp_list">
                <li v-for="(item, index) in data.newIconList" :key="index">
                    <div
                            class="pp_box"
                            :class="{ active: iconText == item }"
                            @click="changeIcon(item, index)"
                    >
                        <i class="pp_name" :class="item" :title="item"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { reactive, ref, toRefs } from "@vue/reactivity";
    import initIcon from "@/utils/iconStyle.js";
    import {
        onBeforeMount,
        onMounted,
        watchEffect,
    } from "@vue/runtime-core";

    const props = defineProps({
        icon: {
            type: String,
            default: "",
        },
        highColor: {
            //图标选中状态高亮颜色
            type: String,
            default: "#409eff",
        },
        iconArr: {
            //获取相对应图标的二维数组,例如[[".el-icon-"], [".fa", "fa"], [".icon-", "iconfont"]]
            // 这里默认使用的是element-plus的图标，[[".el-icon-"]]
            type: Array,
            default: [[".el-icon-"]],
        },
    });

    const myRef = ref(null); //绑定最外层的元素，用于计算位置
    const iconText = ref(props.icon.trim()); //重新定义icon的值,input框的双向绑定
    const data = reactive({
        allIcon: [], //这个数组用于模糊查询
        newIconList: [], //这个数组用于页面数据遍历
        searchVal: "", //用于搜索
        isShow: false, //显示或隐藏图标选择栏
        cTop: "", //图标选择栏的位置（上面或下面）
    });

    // 初始化数据,获取css图标
    const initFontIconData = () => {
        // 这里有异步操作,不使用data.newIconList=res; 使用push(...res)追加到数组中。
        for (const item of props.iconArr) {
            initIcon(...item).then((res) => {
                data.newIconList.push(...res); //用于遍历数据
                data.allIcon.push(...res); //这个于模糊查询
            });
        }
    };

    const emit = defineEmits(["update:icon"], ["chooseIcon"]);

    // 选择图标和清空input框的值
    const changeIcon = (el = "", i) => {
        iconText.value = el;
        emit("update:icon"); //双向绑定,更新父组件的值
        data.newIconList = data.allIcon;
        // data.isShow = false; //关闭图标选择弹窗
    };

    // 关闭图标选择弹窗
    const closeIcon = (e) => {
        if (!myRef.value.contains(e.target)) {
            data.isShow = false;
        }
    };

    watchEffect(() => {
        data.searchVal = iconText.value;
        // 判断input框的值在不在数组里面,如果在，清空searchVal,不做模糊查询
        if (data.allIcon.indexOf(iconText.value) > -1) {
            data.searchVal = "";
            emit("chooseIcon", iconText.value); //选中图标触发父组件事件
        }
        if (data.searchVal) {
            // 正则的方式匹配数组有searchVal的数据来组成新的数组
            const reg = new RegExp(data.searchVal);
            let arr = [];
            for (let i = 0; i < data.allIcon.length; i++) {
                if (reg.test(data.allIcon[i])) {
                    arr.push(data.allIcon[i]);
                }
            }
            data.newIconList = arr;
        }
    });

    onBeforeMount(() => {
        initFontIconData(); //初始化数据
    });

    onMounted(() => {
        //点击空白关闭图标选择弹窗，调用closeIcon
        document.addEventListener("click", closeIcon, false);

        //图标选择的位置（在input的上面或者下面）
        document.addEventListener("scroll", (e) => {
            // scroll,wheel
            // scroll 滚动条滚动,wheel 鼠标滚动。监听滚动条滚动会好一点
            const dom = myRef.value;
            // console.log(window.pageYOffset);// 滚动条滚动的距离
            let winTop = dom.getBoundingClientRect().top; //div顶部到浏览器窗口顶部的距离
            let winBot = window.innerHeight - dom.getBoundingClientRect().bottom; //div底部到浏览器窗口底部的距离

            if (winBot > 315 || winBot < 0) {
                //当div底部
                data.cTop = "";
            } else {
                if (winTop > 315) {
                    data.cTop = "top";
                } else {
                    data.cTop = "";
                }
            }
        });
    });
</script>

<style lang="scss" scoped>
    .pp_picker {
        display: block;
        width: 100%;
        position: relative;
        .inp_box {
            position: relative;
            .inp {
                width: 100%;
                -webkit-appearance: none;
                background-color: transparent;
                border: 1px solid #dcdfe6;
                border-radius: 4px;
                box-sizing: border-box;
                color: #606266;
                display: inline-block;
                height: 34px;
                line-height: 34px;
                outline: 0;
                padding: 0 30px;
                transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
                &:focus {
                    border-color: v-bind("props.highColor");
                    outline: 0;
                }
            }
            & > i {
                font-style: normal;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                font-size: 20px;
                line-height: 20px;
                width: 20px;
                height: 20px;
                text-align: center;
            }
            .inp_icon {
                left: 5px;
                z-index: -1;
                font-size: 14px;
            }
            .inp_close {
                display: none;
                z-index: 10;
                cursor: pointer;
                right: 5px;
            }
            &:hover .inp_close,
            .inp:focus + .inp_close {
                display: block;
            }
        }

        .poper {
            position: absolute;
            left: 0;
            top: 100%;
            width: 100%;
            height: 300px;
            z-index: 100;
            background: #fff;
            border: 1px solid #ebeef5;
            border-radius: 4px;
            -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
            color: #606266;
            font-size: 14px;
            line-height: 1.4;
            min-width: 150px;
            padding: 12px;
            margin-top: 15px;
            &::before {
                content: "";
                width: 12px;
                height: 12px;
                box-sizing: border-box;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                top: -6px;
                background: #fff;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                border: 1px solid #ebeef5;
                border-bottom-color: transparent;
                border-right-color: transparent;
            }
            &.top {
                top: -315px;
                margin-top: 0;
                &::before {
                    top: auto;
                    bottom: -6px;
                    -webkit-transform: rotate(225deg);
                    transform: rotate(225deg);
                }
            }
        }
    }
    .pp_list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -6px;
        max-height: 100%;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 6px;
            border-radius: 4px;
            background: transparent;
        }
        &::-webkit-scrollbar-thumb {
            background: rgba(144, 147, 153, 0.3);
            opacity: 0.5;
            -webkit-box-shadow: 0 0 1px 1px #ccc;
            box-shadow: 0 0 1px 1px #ccc;
            border-radius: 4px;
            &:hover {
                background-color: rgba(144, 147, 153, 0.5);
            }
        }
        li {
            width: 4%;
            padding: 6px;
            .pp_box {
                display: block;
                width: 100%;
                padding-bottom: 80%;
                position: relative;
                border: 1px solid #ddd;
                border-radius: 3px;
                &:hover,
                &.active {
                    color: v-bind("props.highColor");
                    border-color: v-bind("props.highColor");
                }
                i {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
            }
            .icon-name {
                display: none;
            }
        }
    }
    @media screen and (max-width: 1400px) {
        .pp_list li {
            width: 5%;
        }
    }
    @media screen and (max-width: 1100px) {
        .pp_list li {
            width: calc(100% / 17);
        }
    }
    @media screen and (max-width: 960px) {
        .pp_list li {
            width: calc(100% / 15);
        }
    }
    @media screen and (max-width: 768px) {
        .pp_list li {
            width: calc(100% / 12);
        }
    }
    @media screen and (max-width: 600px) {
        .pp_list li {
            width: 50px;
        }
    }
</style>

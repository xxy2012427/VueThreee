<template>
    <div class="DialogEveryDay" ref="ref1">
        <van-button  hairline round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" @click="Dia1">生活</van-button>
        <van-button  hairline round color="linear-gradient(to right, #24EBFA, #3E1CFA)" type="primary" @click="Dia2">睡眠</van-button>
        <van-button  hairline round color="linear-gradient(to right, #A5FAA7, #24B92B)" type="primary" @click="Dia3">交互</van-button>
        <van-button  hairline round color="linear-gradient(to right, #FA8DE5, #E61AFA)" type="primary" @click="Dia4">踏青</van-button>
        <swiper class="mySwiper" :modules="modules" :pagination="{ clickable:true }">
            <swiper-slide>
              <img src="../assets/images/swiper/lbt1.png" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/images/swiper/lbt2.png" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/images/swiper/lbt4.png" alt="">
            </swiper-slide>
            <swiper-slide>
                <img src="../assets/images/swiper/lbt5.png" alt="">
            </swiper-slide>
        </swiper>



    </div>

</template>

<script>
    import { Dialog } from 'vant';
    import { ref } from 'vue';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Pagination } from 'swiper';
    import 'swiper/css';
    import 'swiper/css/pagination';
    Dialog({ message: '小助手启动' });
    export default {
        name: "DialogEveryDay",
        components: {
            Swiper,
            SwiperSlide,
        },
        props: {

        },
        setup() {
            const show = ref(false);
            return { show };
        },
        data () {
            return {
                show: false,
                modules:[ Pagination ],
            }
        },
        methods: {
            Dia1() {
                Dialog.alert({
                    message: '生命远不止连轴转和忙到极限，人类的体验远比这辽阔、丰富得多。',
                    theme: 'round-button',
                }).then(() => {
                    // on close
                });
            },
            Dia2() {
                Dialog.alert({
                    message: '充足且深层的睡眠，产生的脑波能有效提升学习记忆力，同时还保障了人体生态系统的正常运行。',
                    theme: 'round-button',
                }).then(() => {
                    // on close
                });
            },
            Dia3() {
                Dialog.alert({
                    message: '信息孤岛容易空虚，享受现实物质的同时，要去溶解精神上的隔阂，强链接网支撑着你的心理健康。',
                    theme: 'round-button',
                }).then(() => {
                    // on close
                });
            },
            Dia4() {
                Dialog.alert({
                    message: '每天追寻新的色彩，未知的领域，层层递进。若恰逢桃花林，喜感心旷神怡。',
                    theme: 'round-button',
                }).then(() => {
                    // on close
                });
            },
        },
    }
</script>

<style scoped>

    img{width: 95%}

</style>

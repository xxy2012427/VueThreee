<template>
    <div class="DialogEveryDay" ref="ref1">
        <van-button  hairline round color="linear-gradient(to right, #ff6034, #ee0a24)" type="primary" @click="Dia1">提示</van-button>
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
        },
    }
</script>

<style scoped>

    img{width: 95%}

</style>

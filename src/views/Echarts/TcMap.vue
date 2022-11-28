<template>
    <div class="TcMap">
        <h1>苏州地图--svg地图</h1>
        <div ref="EcharMapRef" id="map-box" style="width:700px; height:500px"></div>
    </div>
</template>

<script>
    import * as echarts from 'echarts';
    import $ from "jquery";
    import suzhou from "../../assets/svg/suzhou.svg";
    export default {
        name: "TcMap",
        data () {
            return{

            };
        },
        mounted() {
            this.MapShow();
        },
        methods: {
            MapShow() {
                const map = this.$refs.EcharMapRef;
                const myChart = echarts.init(map);

                // 指定图表的配置项和数据
                var option;
                $.get(suzhou, function (svg) {
                    echarts.registerMap('suzhou', {svg: svg});
                    option = {
                        series: [{
                            name: 'suzhou',
                            type: 'map',
                            map: 'suzhou', // 自定义扩展图表类型
                            data: [
                                { name: "吴中区", value: 15 },
                                { name: "太仓", value: 35 },
                            ],
                        }]
                    };

                    option && myChart.setOption(option);
                });
            }
        }
    }
</script>

<style scoped>

</style>

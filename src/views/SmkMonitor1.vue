<template>

    <div class="smkmonitor1">

        <p v-show="showflag">
            <button @click="postInfo">实时交易更新</button>
            <a>{{msg2}}</a>
            <li v-for="(value, key, index) in mymonitor1">
                {{ key }}: {{ value }}
            </li>
        </p>

        <div ref="EcharRef" id="e1" style="width: 600px;height:400px;"></div>
        <div ref="EcharStackedLine" id="e2" style="width: 700px;height:400px;"></div>

    </div>
</template>

<script>
    import axios from "axios"
    import * as echarts from 'echarts';

    export default {
        name: "SmkMonitor1",
        data () {
            return{
                showflag:false,
                msg2:0,
                mymonitor1:{
                    脱机:10000,
                    一卡通:200,
                    银联:10,
                    苏周到:10,
                    支付宝:500
                },
                monlist1:[0,0,0,0,0],
                monlist2:[0,0,0,0,0],
                mon3list1:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                mon3list2:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                mon3list3:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            }
        },
        mounted() {
            this.showorders();
            this.postInfo();
            this.postInfo2();
            this.postInfo3();
            //this.showstckedline();
            console.log('1')
            this.timeInter = setInterval(() => {
                this.postInfo()  // methods里的方法
            }, 60000)
        },
        methods: {
            postInfo() {
                axios.post('/api/monitor1').then((res) => {
                    //console.log(res.data)
                    this.msg2=res.data;
                    //console.log(res.data.data.v1)
                    this.monlist1[0]=res.data.data.v1;
                    this.monlist1[1]=res.data.data.v2;
                    this.monlist1[2]=res.data.data.v3;
                    this.monlist1[3]=res.data.data.v4;
                    this.monlist1[4]=res.data.data.v5;
                    this.showorders();
                })
            },
            postInfo2() {
                axios.post('/api/monitor2').then((res) => {
                    this.monlist2[0]=res.data.data.v1;
                    this.monlist2[1]=res.data.data.v2;
                    this.monlist2[2]=res.data.data.v3;
                    this.monlist2[3]=res.data.data.v4;
                    this.monlist2[4]=res.data.data.v5;
                    this.showorders();
                })
            },
            postInfo3() {
                axios.post('/api/monitor3').then((res) => {
                    this.mon3list1=res.data.data.list1;
                    this.mon3list2=res.data.data.list2;
                    this.mon3list3=res.data.data.list3;
                    this.showstckedline();
                })
            },
            showorders(){
                // 基于准备好的dom，初始化echarts实例
                //var chartDom = document.getElementById('main');
                const main = this.$refs.EcharRef;
                const myChart = echarts.init(main);
                // 指定图表的配置项和数据
                var option;
                option = {
                title: {
                    text: '实时交易量'
                },
                legend: {//图例组件。图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
                        data: ['昨日','今日']
                },
                xAxis: {
                    type: 'category',
                        data: ['脱机', '一卡通', '银联','苏周到','支付宝']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'昨日',
                        data:this.monlist2,
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            },
                            formatter: '{@value}'
                        }
                    },
                    {
                        name:'今日',
                        data:this.monlist1,
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            },
                            formatter: '{@value}'
                        }
                    }
                ]
            };
                option && myChart.setOption(option);
            },
            showstckedline(){
                const main2 = this.$refs.EcharStackedLine;
                var myChart2 = echarts.init(main2);
                var option2;

                option2 = {
                    title: {
                        text: '上月交易量'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        //data: ['刷卡交易', '市民卡App', '银联云闪付', '苏周到App', '支付宝扫码']
                        data: ['刷卡交易', '市民卡App', '支付宝扫码']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        data: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '刷卡交易',
                            type: 'line',
                            stack: 'Total',
                            data: this.mon3list1
                        },
                        {
                            name: '市民卡App',
                            type: 'line',
                            data: this.mon3list2
                        },
                        {
                            name: '支付宝扫码',
                            type: 'line',
                            data: this.mon3list3
                        }
                    ]
                };

                option2 && myChart2.setOption(option2);

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

<template>

    <div :style="background" class="smkmonitor1">

        <p v-show="showflag">
            <button @click="postInfo">实时交易更新</button>
            <li v-for="(value, key, index) in mymonitor1">
                {{ key }}: {{ value }}
            </li>
         </p>

        <div class="div1" ref="EcharRef" id="e1" style="width: 600px;height:400px;"></div>
        <div class="div2" ref="EcharStackedLine" id="e2" style="width: 600px;height:400px;"></div>

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
                loadingflag:false,
                mymonitor1:{
                    脱机:10000,
                    一卡通:200,
                    银联:10,
                    苏周到:10,
                    支付宝:500
                },
                monlist1:[0,0,0,0,0],
                monlist2:[0,0,0,0,0],
                product:['product', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                mon3list1:['脱机', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                mon3list2:['0',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                mon3list3:['0',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                background: {
                    // 背景图片地址
                    backgroundImage: new URL("../assets/images/bg1.jpg", import.meta.url).href,
                    // 背景图片是否重复
                    backgroundRepeat: 'no-repeat',
                    // 背景图片大小
                    backgroundSize: 'cover',
                    // 背景颜色
                    //backgroundColor: '#58fa99',
                    // 背景图片位置
                    //backgroundPosition: 'center top',
                    height: "100vh",
                    width:"100%",
                }
            }
        },
        mounted() {
            document.body.style.backgroundImage = "url('../src/assets/images/bg1.jpg')";
            this.showorders();
            this.postInfo();
            this.postInfo2();
            this.loadingflag=true;
            this.postInfo3();
            this.timeInter = setInterval(() => {
                this.postInfo()  // methods里的方法
            }, 60000)
        },
        methods: {
            postInfo() {
                if(!this.loadingflag){
                    //console.log('loadingToast')
                    this.$toast.loading({
                       message: '自定义图片',
                        duration: 20000,
                       icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
                    });
                }
                axios.post('/api/monitor1').then((res) => {
                    if (res.data.code === 200) {
                        console.log("成功-清除加载");
                    }
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
                    this.$toast.clear();
                })
            },
            postInfo3() {
                axios.post('/api/monitor3').then((res) => {
                    this.mon3list1=res.data.data.list1;
                    this.mon3list2=res.data.data.list2;
                    this.mon3list3=res.data.data.list3;
                    //console.log(this.mon3list1);
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
                var seriesData=[];
                seriesData.push(this.product);
                seriesData.push(this.mon3list1);
                seriesData.push(this.mon3list2);
                seriesData.push(this.mon3list3);
                //console.log(seriesData)
                setTimeout(function () {
                    option2 = {
                        legend: {},
                        tooltip: {
                            trigger: 'axis',
                            showContent: false
                        },
                        dataset: {
                            source:
                            seriesData,
                                /*[//this.product,
                                ['product', '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                                //this.mon3list1,
                                ['刷卡交易', '4','22','4','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                                ['市民卡App','18','23','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
                                ['支付宝扫码','3','12','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31']
                            ]*/
                        },
                        xAxis: { type: 'category' },
                        yAxis: { gridIndex: 0 },
                        grid: { top: '55%' },
                        series: [
                            {
                                type: 'line',
                                smooth: true,
                                seriesLayoutBy: 'row',
                                emphasis: { focus: 'series' }
                            },
                            {
                                type: 'line',
                                smooth: true,
                                seriesLayoutBy: 'row',
                                emphasis: { focus: 'series' }
                            },
                            {
                                type: 'line',
                                smooth: true,
                                seriesLayoutBy: 'row',
                                emphasis: { focus: 'series' }
                            },
                            {
                                type: 'pie',
                                id: 'pie',
                                radius: '30%',
                                center: ['50%', '25%'],
                                emphasis: {
                                    focus: 'self'
                                },
                                label: {
                                    formatter: '{b}: {@1} ({d}%)'
                                },
                                encode: {
                                    itemName: 'product',
                                    value: '1',
                                    tooltip: '1'
                                }
                            }
                        ]
                    };
                    myChart2.on('updateAxisPointer', function (event) {
                        const xAxisInfo = event.axesInfo[0];
                        if (xAxisInfo) {
                            const dimension = xAxisInfo.value + 1;
                            myChart2.setOption({
                                series: {
                                    id: 'pie',
                                    label: {
                                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                    },
                                    encode: {
                                        value: dimension,
                                        tooltip: dimension
                                    }
                                }
                            });
                        }
                    });
                    myChart2.setOption(option2);
                });

                option2 && myChart2.setOption(option2);

            },
            getImages() {
                return new URL(`/src/assets/images/bg1.jpg`, import.meta.url).href;
            }


        },
        beforeUnmount() {
            console.log('定时器释放:', this.timeInter)
            clearInterval(this.timeInter);
            // this.stopColor()
            this.timeInter = null;
            this.$toast.clear();
            document.body.style.backgroundImage = ''
        },
    }

</script>

<style scoped>
    .div1{
        width:40%;
        height:400px;
        background-color: #fffbca;
        display:inline-block;
    }
    .div2{
        width:40%;
        height:400px;
        background-color: #f7f1ee;
        display:inline-block;
    }
    .div3{
        float:left; width:200px; height:200px;
    }
    .html,.body{
        margin:0;
        padding:0;
    }
</style>

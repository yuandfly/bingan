<template>
    <div>
        <div class="div-card">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-button type="success" round>产能</el-button>
                    <el-button style="float: right;padding: 5px 5px" type="text">1-12月</el-button>
                </div>
                <table class="t1">
                    <tbody>
                    <tr>
                        <td width="80">CMI值</td>
                        <td>{{drgData.cmi}}</td>
                        <td>
                            <span :style="styleObj1">{{drgData.cmiChange}}</span>
                            <span v-if="styleObj1.color=='#ff0000'" :style="styleObj1">↑</span>
                            <span v-if="styleObj1.color=='#07c160'" :style="styleObj1">↓</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="80">DRG组数</td>
                        <td>{{drgData.groupCount}}</td>
                        <td>
                            <span :style="styleObj2">{{drgData.groupCountChange}}</span>
                            <span v-if="styleObj2.color=='#ff0000'" :style="styleObj2">↑</span>
                            <span v-if="styleObj2.color=='#07c160'" :style="styleObj2">↓</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="80">总权重</td>
                        <td>{{drgData.weight}}</td>
                        <td>
                            <span :style="styleObj3">{{drgData.weightChange}}</span>
                            <span v-if="styleObj3.color=='#ff0000'" :style="styleObj3">↑</span>
                            <span v-if="styleObj3.color=='#07c160'" :style="styleObj3">↓</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-button type="primary" round class="elxiaolv">效率</el-button>
                    <el-button style="float: right; padding: 5px 5px" type="text">1-12月</el-button>
                </div>
                <table class="t1">
                    <tbody>
                    <tr>
                        <td width="100">患者基本费率</td>
                        <td>{{drgData.pBasicRate}}</td>
                        <td>
                            <span :style="styleObj4">{{drgData.basicRateChange}}</span>
                            <span v-if="styleObj4.color=='#ff0000'" :style="styleObj4">↑</span>
                            <span v-if="styleObj4.color=='#07c160'" :style="styleObj4">↓</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="100">时间消耗指数</td>
                        <td>{{drgData.timeConsumIndex}}</td>
                        <td>
                            <span :style="styleObj5">{{drgData.timeConsumIndexChange}}</span>
                            <span v-if="styleObj5.color=='#ff0000'" :style="styleObj5">↑</span>
                            <span v-if="styleObj5.color=='#07c160'" :style="styleObj5">↓</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="100">费用消耗指数</td>
                        <td>{{drgData.feeConsumIndex}}</td>
                        <td>
                            <span :style="styleObj6">{{drgData.feeConsumIndexChange}}</span>
                            <span v-if="styleObj6.color=='#ff0000'" :style="styleObj6">↑</span>
                            <span v-if="styleObj6.color=='#07c160'" :style="styleObj6">↓</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <el-button type="danger" round>安全</el-button>
                    <el-button style="float: right; padding: 5px 5px" type="text">1-12月</el-button>
                </div>
                <table class="t1">
                    <tbody>
                    <tr>
                        <td width="120">低风险死亡率</td>
                        <td>{{drgData.lrdr}}</td>
                        <td>
                            <span :style="styleObj7">{{drgData.lrdrChange}}</span>
                            <span v-if="styleObj7.color=='#ff0000'" :style="styleObj7">↑</span>
                            <span v-if="styleObj7.color=='#07c160'" :style="styleObj7">↓</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="120">中低风险死亡率</td>
                        <td>{{drgData.mlrdr}}</td>
                        <td>
                            <span :style="styleObj8">{{drgData.mlrdrChange}}</span></td>
                        <span v-if="styleObj8.color=='#ff0000'" :style="styleObj8">↑</span>
                        <span v-if="styleObj8.color=='#07c160'" :style="styleObj8">↓</span>
                        </td>
                    </tr>
                    <tr>
                        <td width="120">每日床权重</td>
                        <td>{{drgData.dayBedWeight}}</td>
                        <!-- <td>
                          <span :style="styleObj9">{{drgData.dayBedWeightChange}}</span>
                           <span v-if="styleObj9.color=='#ff0000'" :style="styleObj9">↑</span>
                          <span v-if="styleObj9.color=='#07c160'" :style="styleObj9">↓</span
                          </td> -->
                        <td>
                            <span :style="styleObj9">{{drgData.dayBedWeightChange}}</span>
                            <span v-if="styleObj9.color=='#ff0000'" :style="styleObj9">↑</span>
                            <span v-if="styleObj9.color=='#07c160'" :style="styleObj9">↓</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </el-card>
        </div>

        <div class="d2">
            <div class="block">
                <!-- <span class="demonstration">选择年份:</span> -->
                <el-date-picker v-model="year" type="year" placeholder="选择年份" v-on:change="fun1()"
                                size="mini"></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="fun1()" size="mini">查询</el-button>
            </div>

            <!--echart-->
            <div id="myChart"></div>
        </div>
    </div>

</template>

<script>
    import {
        formatDate
    } from '../../utils';//时间格式化
    import {patientOutCount, drgIndex} from "../../api/index.js";
    import "echarts/theme/macarons.js";
    import "echarts/theme/azul.js";
    import "echarts/theme/dark.js";
    import "echarts/theme/blue.js";
    import "echarts/theme/caravan.js";
    import "echarts/theme/carp.js";
    import "echarts/theme/fresh-cut.js";
    import "echarts/theme/infographic.js";
    import "echarts/theme/jazz.js";
    import "echarts/theme/london.js";
    import "echarts/theme/mint.js";
    import "echarts/theme/sakura.js";
    import "echarts/theme/roma.js";
    import "echarts/theme/vintage.js";
    import "echarts/theme/royal.js";

    export default {
        data() {
            return {
                styleObj1: {},
                styleObj2: {},
                styleObj3: {},
                styleObj4: {},
                styleObj5: {},
                styleObj6: {},
                styleObj7: {},
                styleObj8: {},
                styleObj9: {},
                drgData: {},
                year: new Date()
            };
        },
        mounted() {
            this.fun(); //drg指标数据
            this.fun1(); //出院人数柱形图
        },

        methods: {
            timeConsumIndexChange() {
            },

            //drg指标数据
            fun() {
                drgIndex().then(response => {
                   // console.log(response.data);
                    this.drgData = response.data.data;
                    // 第一组
                    if (response.data.data.cmiChange.indexOf('-') == -1) {
                        this.styleObj1.color = "#ff0000"
                    } else if (response.data.data.cmiChange.indexOf('--') == -1) {
                        this.styleObj1.color = "#07c160"
                    } else {
                        this.styleObj1.color = "#999"
                    }
                    ;
                    if (response.data.data.groupCountChange.indexOf('-') == -1) {
                        this.styleObj2.color = "#ff0000"
                    } else if (response.data.data.groupCountChange.indexOf('--') == -1) {
                        this.styleObj2.color = "#07c160"
                    } else {
                        this.styleObj2.color = "#999"
                    }
                    ;
                    if (response.data.data.groupCountChange.indexOf('-') == -1) {
                        this.styleObj3.color = "#ff0000"
                    } else if (response.data.data.groupCountChange.indexOf('--') == -1) {
                        this.styleObj3.color = "#07c160"
                    } else {
                        this.styleObj3.color = "#999"
                    }
                    ;
                    // 第二组
                    if (response.data.data.basicRateChange.indexOf('-') == -1) {
                        this.styleObj4.color = "#ff0000"
                    } else if (response.data.data.basicRateChange.indexOf('--') == -1) {
                        this.styleObj4.color = "#07c160"
                    } else {
                        this.styleObj4.color = "#999"
                    }
                    ;
                    if (response.data.data.timeConsumIndexChange.indexOf('-') == -1) {
                        this.styleObj5.color = "#ff0000"
                    } else if (response.data.data.timeConsumIndexChange.indexOf('--') == -1) {
                        this.styleObj5.color = "#07c160"
                    } else {
                        this.styleObj5.color = "#999"
                    }
                    ;
                    if (response.data.data.feeConsumIndexChange.indexOf('-') == -1) {
                        this.styleObj6.color = "#ff0000"
                    } else if (response.data.data.feeConsumIndexChange.indexOf('--') == -1) {
                        this.styleObj6.color = "#07c160"
                    } else {
                        this.styleObj6.color = "#999"
                    }
                    ;
                    // 第三组
                    if (response.data.data.lrdrChange.indexOf('-') == -1) {
                        this.styleObj7.color = "#ff0000"
                    } else if (response.data.data.lrdrChange.indexOf('--') == -1) {
                        this.styleObj7.color = "#07c160"
                    } else {
                        this.styleObj7.color = "#999"
                    }
                    ;
                    if (response.data.data.mlrdrChange.indexOf('-') == -1) {
                        this.styleObj8.color = "#ff0000"
                    } else if (response.data.data.mlrdrChange.indexOf('--') == -1) {
                        this.styleObj8.color = "#07c160"
                    } else {
                        this.styleObj8.color = "#999"
                    }
                    ;
                    if (response.data.data.dayBedWeightChange.indexOf('-') == -1) {
                        this.styleObj9.color = "#ff0000"
                    } else if (response.data.data.dayBedWeightChange.indexOf('--') == -1) {
                        this.styleObj9.color = "#07c160"
                    } else {
                        this.styleObj9.color = "#999"
                    }
                    ;
                });
            },

            //出院人数柱形图
            fun1() {
                //获取选中年度
                var yearStr = formatDate(this.year,"YYYY");

                patientOutCount(yearStr).then(response => {
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = this.$echarts.init(
                        document.getElementById("myChart"),
                        "royal"
                    );

                    // 绘制图表
                    myChart.setOption({
                        title: {
                            text: "{a|历史趋势-出院人数}",
                            textStyle: {
                                rich: {
                                    a: {
                                        color: '#fff',
                                        backgroundColor: '#17B292',
                                        height: 30,
                                        width: 120,
                                        align: 'center',
                                        borderRadius: 30
                                    }
                                }
                            }

                        },

                        color: ['#1AB394', '#ED9D2C'],
                        tooltip: {
                            trigger: "axis",
                            axisPointer: {
                                type: "cross",
                                crossStyle: {
                                    color: "#ccc"
                                },
                            }
                        },
                        toolbox: {
                            feature: {
                                dataView: {
                                    show: false,
                                    readOnly: false
                                },
                                magicType: {
                                    show: true,
                                    type: ["line", "bar"]
                                },
                                restore: {
                                    show: false
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        legend: {
                            data: ["当前值", "去年同期值"]
                        },
                        xAxis: [
                            {
                                type: "category",
                                data: response.data.data.date,
                                show: true,
                                axisPointer: {
                                    type: "shadow"
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: "value",
                                // name: "数量/人",
                                // min: 0,
                                // max: 4000,
                                interval: 500,
                                axisLabel: {
                                    formatter: "{value}"
                                }
                            },
                            {
                                type: "value",
                                show: false,
                                // min: 0,
                                // max: 4000,
                                interval: 500,
                                axisLabel: {
                                    formatter: "{value}"
                                }
                            }
                        ],
                        series: [
                            {
                                name: "当前值",
                                type: "bar",
                                data: response.data.data.outCount,
                                barWidth: 40,
                            },
                            {
                                name: "去年同期值",
                                type: "line",
                                yAxisIndex: 1,
                                data: response.data.data.lastOutCount,
                                barWidth: 40,
                            }
                        ]
                    });
                });
            }
        }
    };
</script>

<style scoped>
    .div-card {

        display: flex;
        width: 100%;
        height: 300px;
        text-align: center;
        padding-top: 26px;
        /* background: #F3F3F4; */
    }

    /* 调节面板中的样式 */
    .el-card__header {
        padding: 6px 12px;
    }

    .el-button.is-round {
        width: 56px;
        height: 32px;
        line-height: 8px;
        padding-left: 14px;
        transform: translateX(-141px);
    }

    .el-button--text {
        color: 0;
        margin-top: 7px;
        background-color: #d1dade !important;
    }

    .el-button--success {
        background-color: #1c84c6;
        border: 1px solid #1c84c6;
    }

    .el-button--primary {
        background-color: #1ab394;
        border: 1px solid #1ab394;
    }

    .d2 {
        padding: 0 0 0 50px !important;
    }

    .color {
        /* margin-top: -10px;
        margin-left: -10px; */
        /* box-shadow: 5px 5px 5px #ccc; */
        /* -moz-box-shadow:2px 2px 3px #ccc; -webkit-box-shadow:2px 2px 3px #ccc; box-shadow:2px 2px 3px #ccc; */
        /* background-color: #fff; */
    }

    .text {
        font-size: 14px;
    }

    .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both;
    }

    .box-card {
        width: 430px;
        min-height: calc(150px);
        display: inline-block;
        margin-left: 155px;
        margin-bottom: 30px;
        color: #8c8e90;
    }

    table {
        width: 100%;
        height: 150px;
    }

    table td {
        border-top: 1px solid #d1dade;
        line-height: 50px;
    }

    /* .classOne:before{
       content: "↑";
      color: green;
    }
    .classTwo:before{
      content: "↓";
      color: rgb(0, 255, 173);
    } */
    /* table td span {
      color: red;
    }
    table td span::before {
      content: "↑";
      color: red;
    }
    table td .arrow::before {
      content: "↓";
      color: rgb(0, 255, 173);
    } */
    .c1 {
        margin-top: 20px;
    }

    .block {
        margin-top: 10px;
        text-align: center;
    }

    #myChart {
        display: inline-block;
        width: 100%;
        height: 600px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>

<template>
    <div>
        <el-button
                id="btn1"
                plain
                v-for="item in mdcDrgCode"
                @click="fun1(item.mdcCode)"
        >{{item.mdcCode}}
        </el-button>
        <div class="elbutton">
            <el-button size="mini">MDC指标象限分析--</el-button>
        </div>
        <div id="myChart3"></div>
    </div>
</template>

<script>
    import {mcdDrgCodeList, mdcDrgAvgDayAndFee} from "../../api/index.js";
    import "echarts/theme/macarons.js";

    export default {
        data() {
            return {
                mdcDrgCode: []
            };
        },
        mounted() {
            this.fun();
            this.fun1("MDCA");
        },
        methods: {
            //mdcDrg数量查询
            fun() {
                mcdDrgCodeList().then(response => {
                    //console.log(response.data)
                    this.mdcDrgCode = response.data.data;
                });
            },

            //单个mcd分组drg数据
            fun1(code) {
                code = code + "";
                code = code.slice(0, 4);
                //console.log(code);
                mdcDrgAvgDayAndFee(code).then(response => {
                    //console.log(response.data);

                    let myChart3 = this.$echarts.init(
                        document.getElementById("myChart3"),
                        "macarons"
                    );
                    myChart3.setOption({
                        title: {
                            // text: "{a|MDC指标象限分析}",
                            textStyle: {
                                //   rich: {
                                //     a: {
                                //       color: "#fff",
                                //       backgroundColor: "#17B292",
                                //       height: 30,
                                //       width: 120,
                                //       align: "center",
                                //       borderRadius: 30
                                //     }
                                //   }
                            }
                        },
                        // tooltip: {
                        //     trigger: 'axis',
                        //     axisPointer: {
                        //         type: "line",
                        //         label: {
                        //             show: false
                        //         }
                        //     }
                        // },
                        legend: {
                            right: 10,
                          data: [code]
                        },
                        xAxis: {
                            name: "平均住院日/天",
                            scale: true

                        },
                        yAxis: {
                            name: "次均费用/元",
                            scale: true
                        },
                        series: [
                            // {
                            //   type: "effectScatter",
                            //   symbolSize: 50
                            // },
                            {
                                name: code,
                                type: "scatter",
                                symbolSize: 20,
                                data: response.data.data,
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter: function (params) {
                                            return ("平均住院日：" + params.data[0] + "（天）" + "\n" +
                                                "次均费用：" + params.data[1] + "(元)")
                                        },
                                        color: "#9f04f9",//字体颜色
                                        position: "top",//显示位置
                                        fontStyle: 'italic',//字体风格
                                        fontWeight: 'bolder',//字体粗细
                                        backgroundColor: 'rgba(11,11,11,0.22)',//背景色
                                        borderColor: 'transparent',//边框色
                                        borderWidth: 100,
                                        borderRadius: 5,
                                        padding: 5,

                                    }
                                }
                            }
                        ]
                    });
                });
            }
        }
    };
</script>

<style scoped>
    .el-button--mini,
    .el-button--mini.is-round {
        border: none;
        border-radius: 20px;
        color: #fff;
        padding: 10px 15px;
        background: #1ab394;
        margin: 20px 0px 20px 30px;
        /* margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 30px;
      } */
    }

    .elbutton {
        border-bottom: 1px solid #eee;
    }

    #btn1 {
        width: 120px;
        margin: 5px;
    }

    #myChart3 {
        width: 1000px;
        height: 500px;
        margin: 0 auto;
    }
</style>

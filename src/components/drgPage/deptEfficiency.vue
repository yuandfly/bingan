<template>
    <div>
        <div id="myChart4" class="alignChart"></div>

        <div class="tablebox">
            <el-table
                    border
                    :data="deptDrgData"
                    style="width: 100%"
                    :default-sort="{prop: 'groupCount', order: 'descending'}"
            >
                <el-table-column prop="deptCode" label="编号" sortable></el-table-column>
                <el-table-column prop="deptName" label="科室名称" sortable>
                </el-table-column>
                <el-table-column prop="groupCount" label="DRG组数(组)" sortable></el-table-column>
                <el-table-column prop="weight" label="总权重" sortable></el-table-column>
                <el-table-column prop="cmi" label="CMI" sortable></el-table-column>
                <el-table-column prop="drugRatio" label="药占比" sortable></el-table-column>
                <el-table-column prop="timeConsumIndex" label="时间指数" sortable></el-table-column>
                <el-table-column prop="feeConsumIndex" label="费用指数" sortable></el-table-column>
                <el-table-column prop="mlrdr" label="中低风险死亡率" sortable></el-table-column>
                <el-table-column prop="avgHospitalDay" label="平均住院日" sortable></el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="pagationbox">
            <paging-toolbar :pager="pager" @change="tableDataQuery()"/>
        </div>

    </div>
</template>

<script>
    import PagingToolbar from "../../components/toolbar/paging";
    import {
        deptFeeTimeIndex,
        deptTableData
    } from "../../api/index.js";
    import "echarts/theme/macarons.js";

    export default {
        components: {
            PagingToolbar
        },
        data() {
            return {
                pager: {
                    total: 0, // 总条数
                    page: 1, // 当前页
                    rows: 10 // 每页显示多少条
                },
                deptDrgData: [],
            };
        },
        mounted() {
            this.fun4();
            this.tableDataQuery();
        },
        methods: {
            fun4() {
                deptFeeTimeIndex().then(response => {
                    console.log(response.data);

                    let myChart4 = this.$echarts.init(
                        document.getElementById("myChart4"),
                        "macarons"
                    );

                    myChart4.setOption({
                        backgroundColor: this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
                            {
                                offset: 0,
                                color: "#f7f8fa"
                            },
                            {
                                offset: 1,
                                color: "#cdd0d5"
                            }
                        ]),

                        title: {
                            text: "各病区工作效率"
                        },

                        // tooltip: {
                        //     trigger: "axis",
                        // },

                        legend: {
                            right: 10,
                            data: ["时间/费用消耗指数"]
                        },
                        xAxis: {
                            name: "时间消耗指数",
                            splitLine: {
                                lineStyle: {
                                    type: "dashed"
                                }
                            }
                        },
                        yAxis: {
                            name: "费用消耗指数",
                            splitLine: {
                                lineStyle: {
                                    type: "dashed"
                                }
                            },
                            scale: true
                        },
                        series: [
                            {
                                name: "时间/费用消耗指数",
                                data: response.data.data,
                                type: "scatter",
                                symbolSize: function (data) {
                                    return data[2];
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter: function (param) {
                                            return (
                                                param.data[3] +
                                                " \n " +
                                                "时间消耗指数：" +
                                                param.data[0] +
                                                " \n " +
                                                "费用消耗指数：" +
                                                param.data[1]
                                            );
                                        },
                                        color: "#0920ea",//字体颜色
                                        position: "top",//显示位置
                                        //fontStyle: 'italic',//字体风格
                                        fontWeight: 'bolder',//字体粗细
                                        backgroundColor: 'rgba(11,11,11,0.22)',//背景色
                                        borderColor: 'transparent',//边框色
                                        borderWidth: 100,
                                        borderRadius: 5,
                                        padding: 5,
                                    }
                                },
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowColor: "rgba(120, 36, 50, 0.5)",
                                    shadowOffsetY: 5,
                                    color: this.$echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                                        {
                                            offset: 0,
                                            color: "rgb(251, 118, 123)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgb(204, 46, 72)"
                                        }
                                    ])
                                }
                            }
                        ]
                    });
                });
            },

            tableDataQuery() {
                var params = {};
                //分页查询参数
                params = {
                    "page": this.pager.page,
                    "limit": this.pager.rows
                }

                deptTableData(params).then(res => {
                    console.log(res);
                    this.pager.total = res.data.data.total;
                    this.deptDrgData = res.data.data.content;
                })
            }

        }
    };
</script>

<style scoped>
    /* .alignChart {
      width: 100%;
      height: 450px;
    } */
    #myChart4 {
        /* display: inline-block; */
        width: 980px;
        height: 450px;
        margin: 0 auto;
        margin-top: 30px;
    }

    .tablebox{
        margin: 5px;
    }
</style>

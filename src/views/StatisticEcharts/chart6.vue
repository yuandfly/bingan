<template>
    <div>
        <el-form :inline="true" :model="formModel" :rules="rules" style="margin-left: 10px;">
            <el-form-item>
                <el-date-picker v-model="value3" type="year" placeholder="选择年">
                </el-date-picker>
            </el-form-item>

            <el-form-item prop="value2">
                <el-select v-model="value2" placeholder="请选择时间段">
                    <el-option v-for="item in options2" :key="item.dm" :label="item.dmmc" :value="item.dm">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="deptType">
                <el-select v-model="deptType" clearable autocomplete placeholder="请选择统计部门" @change="flushItem()">
                    <el-option v-for="item in deptTypeOption" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>


            <el-form-item prop="value">
                <el-select v-model="value" filterable clearable autocomplete placeholder="请选择项目,可搜索"
                           :filter-method="queryItemByPym">
                    <el-option v-for="item in options" :key="item.dm" :label="item.dmmc" :value="item.dm">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style="margin-left: 10px;" @click="queryByItem()">查询</el-button>
            </el-form-item>
        </el-form>


        <el-row :gutter="20" style="margin-top: 10px;">
            <el-col :span="20" :offset="1">
                <div id="ddd" class="ddd"></div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    import {
        formatDate
    } from '../../utils';
    // import 'echarts-gl';
    // import "echarts/theme/macarons.js";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import {
        staticSelect,
        queryStatisticData,
        dateRangeSelect
    } from '../../api/statisticEcharts.js';

    export default {
        name: "chart1",
        data() {
            return {
                formModel: {},
                rules: { //校验规则
                    value3: [{
                        required: true,
                        message: "请选择查询年度！",
                        trigger: "blur"
                    }],
                    value2: [{
                        required: true,
                        message: "请选择查询时间段！",
                        trigger: "blur"
                    }],
                    deptType: [{
                        required: true,
                        message: "请选择查询部门！",
                        trigger: "blur"
                    }],
                    value: [{
                        required: true,
                        message: "请选择统计项！",
                        trigger: "blur"
                    }]
                },
                options: [{ //统计项选择
                    name1: '选项1',
                    name2: '黄金糕'
                }, {
                    name1: '选项2',
                    name2: '双皮奶'
                }],
                value: "TJM7001",
                options2: [{ //时间段选择
                    label: '一月',
                    value: '0101'
                }],
                value2: '0101',
                value3: new Date(), //年度选择
                deptTypeOption: [{ //部门选择
                    name: '门诊',
                    value: 'TJM7'
                }, {
                    name: '住院',
                    value: 'TJZ2'
                }],
                deptType: 'TJM7',
                dept: [], //科室列表
                currValue: [],
                lastValueList: [],
                growthList: [],
                growthRateList: [],
                value2Name: "", //时间段label
                valueName: "" //统计项label

            };
        },
        mounted() {
            this.chart1Fun();
            this.querySelect();
            this.queryDateSelect();
            // this.queryByItem()
        },
        methods: {
            //刷新select
            flushItem() {
                this.value = "";
                this.querySelect();
            },

            //查询日期范围可选项
            queryDateSelect() {
                var param = {};
                dateRangeSelect(param).then(res => {
                    this.options2 = res.data.data;
                });
            },

            //查询可选项
            querySelect() {
                var param = {
                    "deptType": this.deptType
                }
                staticSelect(param).then(res => {
                    //console.log(res);
                    this.options = res.data.data;
                }).catch(err => {
                    this.$message.error('查询出错！')
                });
            },

            // 根据拼音搜索统计项
            queryItemByPym(val) {
                this.value = val
                var param = {
                    "pym": val,
                    "deptType": this.deptType
                };
                if (val) {
                    staticSelect(param).then(res => {
                        this.options = res.data.data;
                    });
                }
            },

            //查询统计数据
            queryByItem() {
                var currYear = formatDate(this.value3, 'YYYY');
                //获取select选项label
                // this.value2Name = this.options2.find((item) => {
                // 	return item.dm === this.value2
                // }).dmmc;
                // // console.log(this.value2Name)
                // this.valueName = this.options.find((item) => {
                // 	return item.dm === this.value
                // }).dmmc;

                var dateRange = currYear + this.value2;
                var param = {
                    "dateRange": dateRange,
                    "item": this.value
                };
                queryStatisticData(param).then(res => {


                    if (res && res.data.code === 0 && res.data.data.valueList != null) {
                        //清除数据
                        this.dept = [];
                        this.currValue = [];
                        this.growthList = [];
                        this.growthRateList = [];
                        //填充数据
                        this.dept = res.data.data.deptList;
                        this.currValue = res.data.data.valueList;
                        this.lastValueList = res.data.data.lastValueList;
                        if (res.data.data.growthList !== undefined && res.data.data.growthList.length > 0) {
                            this.growthList = res.data.data.growthList;
                        }
                        if (res.data.data.growthRateList !== undefined && res.data.data.growthRateList.length > 0) {
                            this.growthRateList = res.data.data.growthRateList;
                        }


                        this.chart1Fun();
                    } else {
                        this.$message.error(res.data.msg);
                    }

                })
            },

            chart1Fun() {
                var newData = [];
                for (var i = 0; i < this.dept.length; i++) {

                    var item = {
                        category: this.dept[i],
                        first: this.currValue[i],
                        // second: this.growthList[i],
                        // third: this.growthRateList[i]
                    }
                    newData.push(item);
                }

                // 绘制图表
                var myChart = am4core.create('ddd', am4charts.XYChart3D)
                myChart.colors.step = 2;

                myChart.legend = new am4charts.Legend()
                myChart.legend.position = 'top'
                myChart.legend.paddingBottom = 20
                myChart.legend.labels.template.maxWidth = 95


                var xAxis = myChart.xAxes.push(new am4charts.CategoryAxis())
                xAxis.dataFields.category = 'category'
                // xAxis.renderer.cellStartLocation = 0.1
                // xAxis.renderer.cellEndLocation = 0.9
                // xAxis.renderer.grid.template.location = 0;
                xAxis.renderer.labels.template.rotation = 270;
                xAxis.renderer.labels.template.hideOversized = false;
                xAxis.renderer.minGridDistance = 20;
                xAxis.renderer.labels.template.horizontalCenter = "right";
                xAxis.renderer.labels.template.verticalCenter = "middle";
                xAxis.tooltip.label.rotation = 270;
                xAxis.tooltip.label.horizontalCenter = "right";
                xAxis.tooltip.label.verticalCenter = "middle";


                var yAxis = myChart.yAxes.push(new am4charts.ValueAxis());
                yAxis.min = 0;

                function createSeries(value, name) {
                    var series = myChart.series.push(new am4charts.ColumnSeries3D())
                    series.dataFields.valueY = value
                    series.dataFields.categoryX = 'category'
                    series.name = name

                    series.events.on("hidden", arrangeColumns);
                    series.events.on("shown", arrangeColumns);

                    var bullet = series.bullets.push(new am4charts.LabelBullet())
                    bullet.interactionsEnabled = false
                    bullet.dy = 30;
                    bullet.label.text = '{valueY}'
                    bullet.label.fill = am4core.color('#ffffff')

                    return series;
                }

                myChart.data = newData;
                // chart.data = [
                //     {
                //         category: 'Place #1',
                //         first: 40,
                //         second: 55,
                //         third: 60
                //     },
                //     {
                //         category: 'Place #2',
                //         first: 30,
                //         second: 78,
                //         third: 69
                //     },
                //     {
                //         category: 'Place #3',
                //         first: 27,
                //         second: 40,
                //         third: 45
                //     },
                //     {
                //         category: 'Place #4',
                //         first: 50,
                //         second: 33,
                //         third: 22
                //     }
                // ]


                createSeries('first', '查询时间段值');
                createSeries('second', '增长量');
                createSeries('third', '增长率');

                function arrangeColumns() {

                    var series = myChart.series.getIndex(0);

                    var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
                    if (series.dataItems.length > 1) {
                        var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                        var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                        var delta = ((x1 - x0) / myChart.series.length) * w;
                        if (am4core.isNumber(delta)) {
                            var middle = myChart.series.length / 2;

                            var newIndex = 0;
                            myChart.series.each(function (series) {
                                if (!series.isHidden && !series.isHiding) {
                                    series.dummyData = newIndex;
                                    newIndex++;
                                } else {
                                    series.dummyData = myChart.series.indexOf(series);
                                }
                            })
                            var visibleCount = newIndex;
                            var newMiddle = visibleCount / 2;

                            myChart.series.each(function (series) {
                                var trueIndex = myChart.series.indexOf(series);
                                var newIndex = series.dummyData;

                                var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                                series.animate({
                                    property: "dx",
                                    to: dx
                                }, series.interpolationDuration, series.interpolationEasing);
                                series.bulletsContainer.animate({
                                    property: "dx",
                                    to: dx
                                }, series.interpolationDuration, series.interpolationEasing);
                            })
                        }
                    }


                    //去水印
                    var eles = document.querySelectorAll("[aria-labelledby$=-title]")
                    for (var i = 0; i < eles.length; i++) {
                        eles[i].style.visibility = "hidden"
                    }

                }
            }
        }

    }
</script>

<style scoped>
    #ddd {
        /*display: inline-block;*/

        height: 600px;
        width: 1500px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>

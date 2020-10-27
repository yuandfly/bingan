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
                <div id="ccc" class="ccc"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 10px;">
            <el-col :span="20" :offset="1">
                <div id="xxx" class="xxx"></div>
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
                this.value2Name = this.options2.find((item) => {
                	return item.dm === this.value2
                }).dmmc;
                // console.log(this.value2Name)
                this.valueName = this.options.find((item) => {
                	return item.dm === this.value
                }).dmmc;

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
            //图表渲染
            chart1Fun() {
                //数据处理
                var data = [];//查询值和增长率
                var data2 = [];//增长量
                for (var i = 0; i < this.dept.length; i++) {
                    if (this.currValue[i] === undefined) {
                        this.currValue[i] = "";
                    }
                    if (this.growthList === undefined) {
                        this.growthList = "";
                    }
                    if (this.growthRateList[i] === undefined) {
                        this.growthRateList[i] = "";
                    }


                    var item = {
                        "dept": this.dept[i],
                        "currValue": parseInt(this.currValue[i]),
                        "growthRate": parseFloat(this.growthRateList[i])
                    }
                    var item2 = {
                        "dept": this.dept[i],
                        "growth": this.growthList[i]
                    }
                    data.push(item);
                    data2.push(item2);
                }
                console.log(data2);
                // 绘制图表
                // 主题begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                //创建图例
                var chart = am4core.create("ccc", am4charts.XYChart3D);


                // 绑定数据
                chart.data = data;
                /* Create axes */
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

                categoryAxis.dataFields.category = "dept";
                categoryAxis.renderer.minGridDistance = 30;
                categoryAxis.renderer.labels.template.rotation = 270;
                categoryAxis.renderer.labels.template.hideOversized = false;
                categoryAxis.renderer.minGridDistance = 20;
                categoryAxis.renderer.labels.template.horizontalCenter = "right";
                categoryAxis.renderer.labels.template.verticalCenter = "middle";
                categoryAxis.tooltip.label.rotation = 270;
                categoryAxis.tooltip.label.horizontalCenter = "right";
                categoryAxis.tooltip.label.verticalCenter = "middle";


                /* Create value axis */
                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.title.text = formatDate(this.value3, "YYYY") + "年" + this.value2Name + "———" + this.valueName;

                /* Create series 创建系列，柱形图 */
                var columnSeries = chart.series.push(new am4charts.ColumnSeries3D());
                columnSeries.name = "查询值";
                columnSeries.dataFields.valueY = "currValue";
                columnSeries.dataFields.categoryX = "dept";

                columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} -- {categoryX}:\n[/][#fff font-size: 20px]{valueY}人次[/] [#fff]{additional}[/]"
                columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
                columnSeries.columns.template.propertyFields.stroke = "stroke";
                columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
                columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
                columnSeries.tooltip.label.textAlign = "middle";


                var paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                paretoValueAxis.renderer.opposite = true;

                paretoValueAxis.strictMinMax = true;
                paretoValueAxis.renderer.grid.template.disabled = true;
                paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
                paretoValueAxis.numberFormatter.numberFormat = "#'%'"
                paretoValueAxis.cursorTooltipEnabled = false;

                //创建系列折线图
                var lineSeries = chart.series.push(new am4charts.LineSeries());
                lineSeries.name = "增长率";
                lineSeries.yAxis = paretoValueAxis;
                lineSeries.dataFields.valueY = "growthRate";//绑定数据
                lineSeries.dataFields.categoryX = "dept";

                lineSeries.stroke = am4core.color("#fdd400");
                lineSeries.strokeWidth = 3;
                // lineSeries.propertyFields.strokeDasharray = "lineDash";
                lineSeries.tooltip.label.textAlign = "middle";

                var bullet = lineSeries.bullets.push(new am4charts.Bullet());
                bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
                bullet.tooltipText = "[#fff font-size: 15px]{name} -- {categoryX}:\n[/][#fff font-size: 20px]{valueY}%[/] [#fff]{additional}[/]"
                var circle = bullet.createChild(am4core.Circle);
                circle.radius = 4;
                circle.fill = am4core.color("#fff");
                circle.strokeWidth = 3;

                //显示或隐藏柱形图或折现图
                var legend = new am4charts.Legend(); //图例
                legend.useGraphSettings = true;
                legend.position = "top";
                legend.align = "right";
                legend.markerSize = 12;
                legend.fontSize = 12;
                legend.equalWidths = false;
                legend.valueWidth = 0;
                chart.legend = legend;

                chart.exporting.menu = new am4core.ExportMenu();//导出图表
                chart.exporting.menu.items = [//下载菜单汉化
                    {
                        "label": "下载",
                        "menu": [
                            {
                                "label": "图片",
                                "menu": [
                                    {"type": "png", "label": "PNG格式"},
                                    {"type": "jpg", "label": "JPG格式"},
                                    {"type": "svg", "label": "SVG格式"},
                                    {"type": "pdf", "label": "PDF格式"}
                                ]
                            }, {
                                "label": "数据",
                                "menu": [
                                    // { "type": "json", "label": "JSON格式数据" },
                                    // { "type": "csv", "label": "CSV格式数据" },
                                    {"type": "xlsx", "label": "XLSX格式数据"},
                                    {"type": "html", "label": "HTML格式数据"}
                                    // { "type": "pdfdata", "label": "PDF格式数据" }
                                ]
                            }, {
                                "label": "打印", "type": "print"
                            }
                        ]
                    }
                ]

                /************第二个图************/
                    //创建图例
                var chart2 = am4core.create("xxx", am4charts.XYChart3D);

                chart2.data = data2;
                // Create axes
                let categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis2.dataFields.category = "dept";
                categoryAxis2.renderer.labels.template.rotation = 270;
                categoryAxis2.renderer.labels.template.hideOversized = false;
                categoryAxis2.renderer.minGridDistance = 20;
                categoryAxis2.renderer.labels.template.horizontalCenter = "right";
                categoryAxis2.renderer.labels.template.verticalCenter = "middle";
                categoryAxis2.tooltip.label.rotation = 270;
                categoryAxis2.tooltip.label.horizontalCenter = "right";
                categoryAxis2.tooltip.label.verticalCenter = "middle";

                let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.title.text = formatDate(this.value3, "YYYY") + "年" + this.value2Name + "———" + this.valueName;
                valueAxis2.title.fontWeight = "bold";

                // Create series
                var series2 = chart2.series.push(new am4charts.ColumnSeries3D());
                series2.dataFields.valueY = "growth";
                series2.dataFields.categoryX = "dept";
                series2.name = "增长量";
                series2.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series2.columns.template.fillOpacity = .8;

                var columnTemplate = series2.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
                columnTemplate.stroke = am4core.color("#FFFFFF");

                columnTemplate.adapter.add("fill", function(fill, target) {
                    return chart2.colors.getIndex(target.dataItem.index);
                })

                columnTemplate.adapter.add("stroke", function(stroke, target) {
                    return chart2.colors.getIndex(target.dataItem.index);
                })

                chart2.cursor = new am4charts.XYCursor();
                chart2.cursor.lineX.strokeOpacity = 0;
                chart2.cursor.lineY.strokeOpacity = 0;

                chart2.exporting.menu = new am4core.ExportMenu();//导出图表
                chart2.exporting.menu.items = [//下载菜单汉化
                    {
                        "label": "下载",
                        "menu": [
                            {
                                "label": "图片",
                                "menu": [
                                    {"type": "png", "label": "PNG格式"},
                                    {"type": "jpg", "label": "JPG格式"},
                                    {"type": "svg", "label": "SVG格式"},
                                    {"type": "pdf", "label": "PDF格式"}
                                ]
                            }, {
                                "label": "数据",
                                "menu": [
                                    // { "type": "json", "label": "JSON格式数据" },
                                    // { "type": "csv", "label": "CSV格式数据" },
                                    {"type": "xlsx", "label": "XLSX格式数据"},
                                    {"type": "html", "label": "HTML格式数据"}
                                    // { "type": "pdfdata", "label": "PDF格式数据" }
                                ]
                            }, {
                                "label": "打印", "type": "print"
                            }
                        ]
                    }
                ]


                //去水印
                var eles = document.querySelectorAll("[aria-labelledby$=-title]")
                for (var i = 0; i < eles.length; i++) {
                    eles[i].style.visibility = "hidden"
                }

            }
        }


    }
</script>

<style scoped>
    #ccc {
        /*display: inline-block;*/
        height: 600px;
        width: 1500px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    #xxx {
        /*display: inline-block;*/
        height: 600px;
        width: 1500px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>

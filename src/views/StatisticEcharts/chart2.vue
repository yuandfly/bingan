<template>
    <div>
        <el-row :gutter="24">

            <el-col :span="3">
                <el-date-picker v-model="timeValue" type="year" placeholder="选择年"
                                style="margin-left: 10px;"></el-date-picker>
            </el-col>

            <el-col :span="3">
                <el-select v-model="deptType" clearable autocomplete placeholder="请选择统计部门" @change="flushItem()"
                           style="margin-left: 10px;">
                    <el-option v-for="item in deptTypeOption" :key="item.value" :label="item.name" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="3">
                <el-select v-model="deptValue" filterable clearable autocomplete placeholder="请选择科室,可搜索"
                           :filter-method="queryDeptByPym"
                           style="margin-left: 10px;">
                    <el-option v-for="item in deptList" :key="item.dm" :label="item.dmmc" :value="item.dm">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="3">
                <el-select v-model="value" filterable clearable autocomplete placeholder="请选择项目,可搜索"
                           :filter-method="queryItemByPym">
                    <el-option v-for="item in options" :key="item.dm" :label="item.dmmc" :value="item.dm">
                    </el-option>
                </el-select>
            </el-col>

            <el-col :span="1">
                <el-color-picker v-model="color" color-format="rgb" show-alpha
                                 @change="colorChange()"></el-color-picker>
            </el-col>

            <el-col :span="3">
                <el-button type="primary" style="margin-left: 10px;" @click="queryData()">查询</el-button>
            </el-col>

        </el-row>

        <el-row :gutter="20">
            <el-col :span="17" :offset="3">
                <div id="chartContainer3" class="chartContainer3" style="width: 100%"></div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="17" :offset="3">
                <div id="chartContainer4" class="chartContainer4" style="width: 100%"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        formatDate
    } from '../../utils';
    // import "echarts/theme/macarons.js";
    import * as am4core from "@amcharts/amcharts4/core";
    import * as am4charts from "@amcharts/amcharts4/charts";
    import am4themes_animated from "@amcharts/amcharts4/themes/animated";
    import {
        staticSelect,
        outpatientDeptSelect, //门急诊科室
        hospitalizationDeptSelect, //住院科室
        queryYearDataByDept
    } from '../../api/statisticEcharts.js';

    export default {
        data() {
            return {
                timeValue: new Date(),
                value: "TJM7001",
                deptValue: "",
                options: [],
                deptList: [],
                monthList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthDataList: [],
                growthList: [],
                growthRateList: [],
                deptTypeOption: [{
                    name: '门诊',
                    value: 'TJM7'
                }, {
                    name: '住院',
                    value: 'TJZ2'
                }],
                deptType: 'TJM7',
                deptName: '', //选择的科室名称
                valueName: '', //统计项名称
                color: ""//颜色切换
            }
        },
        mounted() {
            this.chart2Fun();
            this.querySelect();
            this.queryDeptSelect()
        },

        methods: {

            //颜色切换
            colorChange() {
                this.chart2Fun();
            },

            //刷新select
            flushItem() {
                this.value = "";
                this.querySelect();
                this.deptValue = "";
                this.queryDeptSelect();
            },

            //查询统计项可选项
            querySelect() {
                var param = {
                    "deptType": this.deptType
                };
                staticSelect(param).then(res => {
                    //console.log(res);
                    this.options = res.data.data;
                }).catch(err => {
                    this.$message.error('查询出错！')
                });
            },

            //查询科室可选项
            queryDeptSelect() {
                var param = {};
                if (this.deptType === "TJM7") {
                    outpatientDeptSelect(param).then(res => {
                        this.deptList = res.data.data;
                    }).catch(err => {
                        this.$message.error('查询科室出错！')
                    });
                } else if (this.deptType === "TJZ2") {
                    hospitalizationDeptSelect(param).then(res => {
                        this.deptList = res.data.data;
                    }).catch(err => {
                        this.$message.error('查询科室出错！')
                    });
                } else {
                    this.$message.error('请选择部门！')
                }


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

            //根据拼音搜索科室
            queryDeptByPym(val) {
                this.deptValue = val;
                var param = {
                    "pym": val
                };
                if (val) {
                    deptSelect(param).then(res => {
                        this.deptList = res.data.data;
                    }).catch(err => {
                        this.$message.error('查询科室出错！')
                    });
                }
            },

            //统计数据查询
            queryData() {
                var queryYear = formatDate(this.timeValue, 'YYYY');

                var dept = this.deptValue;
                var param = {
                    year: queryYear,
                    item: this.value,
                    deptCode: dept
                };
                queryYearDataByDept(param).then(res => {
                    //console.log(res)
                    if (res && res.data.code === 0 && res.data.data[1] != null && res.data.data[1] !== undefined) {
                        //清楚残留数据
                        this.monthDataList = [];
                        this.growthList = [];
                        this.growthRateList = [];
                        //填充数据
                        if (res.data.data[0] !== undefined && res.data.data[0].length > 0) {
                            this.monthList = res.data.data[0];
                        }
                        if (res.data.data[1] !== undefined && res.data.data[1].length > 0) {
                            this.monthDataList = res.data.data[1];
                        }
                        if (res.data.data[2] !== undefined && res.data.data[2].length > 0) {
                            this.growthList = res.data.data[3];
                        }
                        if (res.data.data[4] !== undefined && res.data.data[4].length > 0) {
                            this.growthRateList = res.data.data[4];
                        }
                        //取得选项中文
                        this.deptName = this.deptList.find((item) => {
                            return item.dm === this.deptValue
                        }).dmmc;
                        this.valueName = this.options.find((item) => {
                            return item.dm === this.value
                        }).dmmc;


                        this.chart2Fun();
                    } else {
                        //清楚残留数据
                        this.monthDataList = [];
                        this.growthList = [];
                        this.growthRateList = [];
                        this.$message.error(res.data.msg);
                    }

                })
            },

            chart2Fun() {
                //数据处理
                var data = [];//查询值和增长率
                var data2 = [];//增长量
                for (var i = 0; i < this.monthList.length; i++) {
                    if (this.monthDataList[i] === undefined || this.monthDataList[i] === "-") {
                        this.monthDataList[i] = 0;
                    }
                    if (this.growthList[i] === undefined || this.growthList[i] === "-") {
                        this.growthList[i] = 0;
                    }
                    if (this.growthRateList[i] === undefined || this.growthRateList[i] === "-") {
                        this.growthRateList[i] = 0;
                    }

                    var item = {
                        "month": this.monthList[i],
                        "monthData": parseInt(this.monthDataList[i]),
                        "growthRate": parseFloat(this.growthRateList[i])
                    }
                    var item2 = {
                        "month": this.monthList[i],
                        "growth": this.growthList[i]
                    }
                    data.push(item);
                    data2.push(item2);
                }
                // console.log(data2);

                //绘制图表
                // 主题begin
                am4core.useTheme(am4themes_animated);
                // Themes end

                //创建图例
                var chart = am4core.create("chartContainer3", am4charts.XYChart3D);

                // 绑定数据
                chart.data = data;
                /* Create axes */
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());

                categoryAxis.dataFields.category = "month";
                categoryAxis.renderer.minGridDistance = 30;
                // categoryAxis.renderer.labels.template.rotation = 270;
                // categoryAxis.renderer.labels.template.hideOversized = false;
                // categoryAxis.renderer.minGridDistance = 20;
                // categoryAxis.renderer.labels.template.horizontalCenter = "right";
                // categoryAxis.renderer.labels.template.verticalCenter = "middle";
                // categoryAxis.tooltip.label.rotation = 270;
                // categoryAxis.tooltip.label.horizontalCenter = "right";
                // categoryAxis.tooltip.label.verticalCenter = "middle";

                /* Create value axis */
                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.title.text = formatDate(this.timeValue, 'YYYY') + "年" + "——" + this.deptName + "——" + this.valueName;

                /* Create series 创建系列，柱形图 */
                var columnSeries = chart.series.push(new am4charts.ColumnSeries3D());
                columnSeries.name = "查询值";
                columnSeries.dataFields.valueY = "monthData";
                columnSeries.dataFields.categoryX = "month";

                columnSeries.columns.template.tooltipText = "[#fff font-size: 15px]{name} -- {categoryX}:\n[/][#fff font-size: 20px]{valueY}人次[/] [#fff]{additional}[/]"
                columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
                columnSeries.columns.template.propertyFields.stroke = "stroke";
                columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
                columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
                columnSeries.tooltip.label.textAlign = "middle";
                if (this.color !== "") {//设置柱形图颜色
                    columnSeries.columns.template.fill = am4core.color(this.color);
                }
                //柱形图顶部显示数值
                var columnLabelBullet = columnSeries.bullets.push(new am4charts.LabelBullet());
                columnLabelBullet.label.verticalCenter = "bottom";
                columnLabelBullet.label.dy = -10;
                columnLabelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

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
                lineSeries.dataFields.categoryX = "month";

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

                chart.cursor = new am4charts.XYCursor();//坐标轴定位
                chart.exporting.menu = new am4core.ExportMenu();//导出图表
                chart.exporting.filePrefix = formatDate(this.timeValue, 'YYYY') + "年" + this.deptName + this.valueName;
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
                var chart2 = am4core.create("chartContainer4", am4charts.XYChart3D);

                chart2.data = data2;
                // Create axes
                let categoryAxis2 = chart2.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis2.dataFields.category = "month";
                categoryAxis.renderer.minGridDistance = 30;
                // categoryAxis2.renderer.labels.template.rotation = 45;
                // categoryAxis2.renderer.labels.template.hideOversized = false;
                // categoryAxis2.renderer.minGridDistance = 20;
                // categoryAxis2.renderer.labels.template.horizontalCenter = "right";
                // categoryAxis2.renderer.labels.template.verticalCenter = "middle";
                // categoryAxis2.tooltip.label.rotation = 270;
                // categoryAxis2.tooltip.label.horizontalCenter = "right";
                // categoryAxis2.tooltip.label.verticalCenter = "middle";

                let valueAxis2 = chart2.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.title.text = formatDate(this.timeValue, 'YYYY') + "年" + "——" + this.deptName + "——" + this.valueName;
                valueAxis2.title.fontWeight = "bold";

                // Create series
                var series2 = chart2.series.push(new am4charts.ColumnSeries3D());
                series2.dataFields.valueY = "growth";
                series2.dataFields.categoryX = "month";
                series2.name = "增长量";
                series2.tooltipText = "{categoryX}: [bold]{valueY}[/]";
                series2.columns.template.fillOpacity = .8;

                //柱形图顶部显示数值
                var columnLabelBullet2 = series2.bullets.push(new am4charts.LabelBullet());
                columnLabelBullet2.label.verticalCenter = "bottom";
                columnLabelBullet2.label.dy = -10;
                columnLabelBullet2.label.text = "{values.valueY.workingValue.formatNumber('#.')}";

                //渐变色
                var columnTemplate = series2.columns.template;
                columnTemplate.strokeWidth = 2;
                columnTemplate.strokeOpacity = 1;
                columnTemplate.stroke = am4core.color("#FFFFFF");

                columnTemplate.adapter.add("fill", function (fill, target) {
                    return chart2.colors.getIndex(target.dataItem.index);
                })

                columnTemplate.adapter.add("stroke", function (stroke, target) {
                    return chart2.colors.getIndex(target.dataItem.index);
                })

                chart2.cursor = new am4charts.XYCursor();
                chart2.cursor.lineX.strokeOpacity = 0;
                chart2.cursor.lineY.strokeOpacity = 0;

                //显示或隐藏柱形图或折现图
                var legend = new am4charts.Legend(); //图例
                legend.useGraphSettings = true;
                legend.position = "top";
                legend.align = "right";
                legend.markerSize = 12;
                legend.fontSize = 12;
                legend.equalWidths = false;
                legend.valueWidth = 0;
                chart2.legend = legend;

                chart2.exporting.menu = new am4core.ExportMenu();//导出图表
                chart2.exporting.filePrefix = formatDate(this.timeValue, 'YYYY') + "年" + this.deptName + this.valueName;
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

                var eles = document.querySelectorAll("[aria-labelledby$=-title]")
                for (var i = 0; i < eles.length; i++) {
                    eles[i].style.visibility = "hidden"
                }

            }
        }
    }
</script>

<style scoped>
    .chartContainer3 {
        height: 600px;
        width: 1500px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }

    .chartContainer4 {
        height: 600px;
        width: 1500px;
        margin-top: 10px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    }
</style>

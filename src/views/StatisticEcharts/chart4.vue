<template>
	<div>
		<el-row :gutter="24">
			<el-col :span="3">
				<div>
					<el-date-picker v-model="value3" type="year" placeholder="选择年" style="margin-left: 10px;">
					</el-date-picker>
				</div>
			</el-col>

			<el-col :span="3">
				<el-select v-model="value2" filterable placeholder="请选择时间段" style="margin-left: 10px;">
					<el-option v-for="item in options2" :key="item.dm" :label="item.dmmc" :value="item.dm">
					</el-option>
				</el-select>
			</el-col>

			<el-col :span="2">
				<el-select v-model="deptType" clearable autocomplete placeholder="请选择统计部门" @change="flushItem()">
					<el-option v-for="item in deptTypeOption" :key="item.value" :label="item.name" :value="item.value">
					</el-option>
				</el-select>
			</el-col>

			<el-col :span="8">
				<el-select v-model="value" filterable clearable autocomplete placeholder="请选择项目,可搜索" :filter-method="queryItemByPym"
				 @change="getItemLabel()">
					<el-option v-for="item in options" :key="item.dm" :label="item.dmmc" :value="item.dm">
					</el-option>
				</el-select>
				<span style="margin-left: 10px;">查看前</span>
				<el-input v-model="count" placeholder="请输入数字" type="number" style="width: 70px;"></el-input>
				<span style="">位</span>
				<el-button type="primary" style="margin-left: 10px;" @click="queryByItem()">查询</el-button>
			</el-col>
		</el-row>

		<el-row :gutter="24">
			<el-col :span="20" :offset="2">
				<div id="am4chartsPie" class="am4chartsPie" style="width: 100%;"></div>
			</el-col>
		</el-row>
	</div>
</template>



<script>
	import {
		formatDate
	} from '../../utils';
	import * as am4core from "@amcharts/amcharts4/core";
	import * as am4charts from "@amcharts/amcharts4/charts";
	import am4themes_animated from "@amcharts/amcharts4/themes/animated";
	import {
		staticSelect,
		queryStatisticWithPie,
		dateRangeSelect
	} from '../../api/statisticEcharts.js';
	export default {
		name: "chart4",
		data() {
			return {
				options: [{
					name1: '选项1',
					name2: '黄金糕'
				}],
				value: "TJM7001",
				itemLabel: "",
				options2: [{
					label: '一月',
					value: '0101'
				}],
				value2: '0101',

				deptTypeOption: [{
					name: '门诊',
					value: 'TJM7'
				}, {
					name: '住院',
					value: 'TJZ2'
				}],
				deptType: 'TJM7',

				value3: formatDate(new Date(), 'YYYY'),
				dept: [],
				currValue: [],
				pieList: [],
				count: 10, //显示前几位科室,
				valueName: ''
			};
		},
		mounted() {
			this.chart4Fun();
			this.querySelect();
			this.queryDateSelect();
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

			//查询统计项目
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
			//获取统计项label
			getItemLabel() {
				let obj = {};
				obj = this.options.find((item) => {
					return item.dm === this.value;
				});
				this.itemLabel = obj.dmmc;
			},

			//查询统计数据
			queryByItem() {
				var currYear = formatDate(this.value3, 'YYYY');
				var dateRange = currYear + this.value2;

				this.valueName = this.options.find((item) => {
					return item.dm === this.value
				}).dmmc;

				var param = {
					"dateRange": dateRange,
					"item": this.value
				};
				queryStatisticWithPie(param).then(res => {
					if (res && res.data.code === 0 && res.data.data.valueList != null) {
						this.dept = res.data.data.deptList[0];
						this.currValue = res.data.data.valueList[0];
						//构造饼图格式数据
						this.pieList = []; //清空数据
						if (this.count > this.dept.length) {
							this.count = this.dept.length
						}
						var others = 0; //其它总数
						for (var i = 0; i < this.dept.length; i++) {
							if (i < this.count) { //输出前多少位
								var item = {
									name: this.dept[i],
									value: this.currValue[i]
								};

								this.pieList.push(item);
							} else { //其它类总数
								others += this.currValue[i]
							}
						}
						this.dept.push("其它");
						this.currValue.push(others);
						this.pieList.push({

							name: "其它",
							value: others
						});
						console.log(this.pieList);
						this.chart4Fun();
					} else {
						this.$message.error(res.data.msg);
					}
				})
			},

			chart4Fun() {
				console.log(this.pieList);
				// 绘制图表

				// Themes begin
				am4core.useTheme(am4themes_animated);
				// Themes end

				var chart = am4core.create("am4chartsPie", am4charts.PieChart3D);
				chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
				chart.legend = new am4charts.Legend();
				chart.data = this.pieList;
				chart.exporting.menu = new am4core.ExportMenu();//导出图表
				chart.exporting.filePrefix = "picture";
				chart.exporting.menu.items = [//下载菜单汉化
				  {
				    "label": "下载",
				    "menu": [
				      {
				        "label": "图片",
				        "menu": [
				          { "type": "png", "label": "PNG格式" },
				          { "type": "jpg", "label": "JPG格式" },
				          { "type": "svg", "label": "SVG格式" },
				          { "type": "pdf", "label": "PDF格式" }
				        ]
				      }, {
				        "label": "数据",
				        "menu": [
				          // { "type": "json", "label": "JSON格式数据" },
				          // { "type": "csv", "label": "CSV格式数据" },
				          { "type": "xlsx", "label": "XLSX格式数据" },
				          { "type": "html", "label": "HTML格式数据" }
				          // { "type": "pdfdata", "label": "PDF格式数据" }
				        ]
				      }, {
				        "label": "打印", "type": "print"
				      }
				    ]
				  }
				]
				
				var series = chart.series.push(new am4charts.PieSeries3D());
				series.dataFields.value = "value";
				series.dataFields.category = "name";


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
	#am4chartsPie {
		/* display: inline-block; */
		width: 1200px;
		height: 600px;
		margin-top: 10px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
	}



</style>

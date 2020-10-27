<template>
	<el-tabs v-model="activeName" @tab-click="handleClick" type="card"  style="margin: 10px;width: 100%;">
		<el-tab-pane label="单项部门科室统计(数据)" name="first">
			<chart1></chart1>
		</el-tab-pane>
		
		<el-tab-pane label="单项部门科室统计(占比)" name="second">
			<chart4></chart4>
		</el-tab-pane>
		
		<el-tab-pane label="科室单项全年统计" name="third">
			<chart2></chart2>
		</el-tab-pane>
<!--		<el-tab-pane label="测试" name="forth">-->
<!--			<chart3></chart3>-->
<!--		</el-tab-pane>-->
<!--		<el-tab-pane label="测试2" name="fifth">-->
<!--			<chart5></chart5>-->
<!--		</el-tab-pane>-->
<!--		<el-tab-pane label="测试3" name="sixth">-->
<!--			<chart6></chart6>-->
<!--		</el-tab-pane>-->
		
	</el-tabs>
</template>
<script>
	import chart1 from './chart1.vue';
	import chart2 from './chart2.vue';
	import chart3 from './chart3.vue';
	import chart4 from './chart4.vue';
	import chart5 from './chart5.vue';
	import chart6 from './chart6.vue'
 	export default {
		components: {
			chart1,
			chart2,
			chart3,
			chart4,
			chart5,
			chart6
		},
		data() {
			return {
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
			},
		}
	};
</script>

<style scoped>
	/*下载按钮样式*/
	.amcharts-amexport-item.amcharts-amexport-item-level-0.amcharts-amexport-item-blank{
		width: 60px;
		text-align: center;
		padding: 0.5em 1em;
		font-size: 10px;
		background-color: rgba(169, 201, 203, 1);
	}
	.amcharts-amexport-item.amcharts-amexport-item-level-1{
		width: 60px;
		/*text-align: center;*/
		/*padding: 0.5em 1em;*/
		background-color: rgba(169, 201, 203, 1);
	}
	.amcharts-amexport-item.amcharts-amexport-item-level-2{
		width: 80px;
		/*text-align: center;*/
		/*padding: 0.5em 1em;*/
		background-color: rgba(169, 201, 203, 1);
	}
</style>

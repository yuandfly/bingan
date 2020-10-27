<!--科室-->
<template @keyup.113.native="created">
	<el-dialog title="代码录入窗口" :visible.sync="visible" @close="$emit('update:show', false)" :show="show" width="20%" :modal="false"
	 @opened="AUTO()" :destroy-on-close="true">
		<el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
			<el-form-item label="拼音码" v-if="qun===1">
				<el-input v-model="formInline.pym" ref="input" @input="queryAll()"></el-input>
			</el-form-item>

			<el-form-item label="五笔码" v-if="qun===2">
				<el-input v-model="formInline.wbm" ref="input" @input="queryAll()"></el-input>
			</el-form-item>

			<el-form-item label="YB码" v-if="qun===3">
				<el-input v-model="formInline.ybm" ref="input" @input="queryAll()"></el-input>
			</el-form-item>
		</el-form>
		<el-table :data="gridData" @row-dblclick="dialog" height="300px">
			<el-table-column property="pym" label="拼音码" v-if="qun===1"></el-table-column>
			<el-table-column property="wbm" label="五笔码" v-if="qun===2"></el-table-column>
			<el-table-column property="ybm" label="YB码" v-if="qun===3"></el-table-column>
			<el-table-column property="dmmc" label="科室名称"></el-table-column>
		</el-table>
		</br>
		<div>
			<h2 v-if="qun===1">按F2切换为:五笔码</h2>
			<h2 v-if="qun===2">按F2切换为:YB码</h2>
			<h2 v-if="qun===3">按F2切换为:拼音码</h2>
		</div>
	</el-dialog>

</template>

<script>
	import {
		GetDepartmentDictionary
	} from "@/api";
	export default {
		data() {
			return {
				msgs: '',
				type: 1,
				qun: 1,
				formInline: {},
				gridData: [],
				visible: this.show
			};
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			msg: {
				type: Number,
			}
		},
		watch: {
			show() {
				this.visible = this.show;
				this.msgs = this.msg
			}

		},
		mounted() {
			this.queryAll()
		},
		methods: {
			queryAll() {
				GetDepartmentDictionary(this.formInline).then(res=>{
					this.gridData =res.data.data
				})
			
			},
			dialog(row) {
				this.$parent.fatherMethod(row, this.msgs);
			},
			/**input框获取焦点*/
			AUTO() {
				this.$nextTick(function() {
					this.$refs.input.$el.querySelector('input').focus();
				})
			},
		},
		/**页面按键事件*/
		created() {
			var lett = this
			document.onkeydown = function(e) {
				// debugger
				var key = window.event.keyCode;
				if (key == 113) {
					if (lett.qun === 3) {
						lett.qun = 1;
					} else {
						lett.qun++;
					}
					lett.AUTO();
				}
			}
		}
	};
</script>

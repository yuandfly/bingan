<template>
    <div id="d1">

        <!-- 表单 -->

        <el-form :inline="true" :model="formInline" class="demo-form-inline demo-ruleForm">

            <el-form-item label="筛选">
                <el-select v-model="reason" placeholder="全部" v-on:change="notInDrgData()">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="住院天数大于60天和住院费用小于5元" value="1"></el-option>
                    <el-option label="主诊断码错误" value="2"></el-option>

                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>

            <!-- 表格 -->
            <el-table :data="notInData" stripe style="width: 100%" v-model="reason" @row-click="toHomePage">

                <el-table-column prop="hospitalizationCode" label="病案号主键" width="180">
                </el-table-column>

                <el-table-column prop="medicalRecordCode" label="病案号" width="180"></el-table-column>
                <el-table-column prop="patientName" label="患者姓名"></el-table-column>
                <el-table-column prop="hospitalDays" label="住院天数"></el-table-column>
                <el-table-column prop="totalCost" label="总费用"></el-table-column>
                <el-table-column prop="dtName" label="主治医师"></el-table-column>

            </el-table>
            <!--分页-->
            <paging-toolbar :pager="pager" @change="notInDrgData()"/>
        </el-form>


    </div>
</template>

<script>
    import PagingToolbar from '../../components/toolbar/paging';
    import {
        notInDrg
    } from "../../api";
	import { mapMutations } from "vuex";
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
                reason: null,
                notInData: [],
                formInline: {
                    user: '',
                    region: ''
                },
				tableData:[]
            }
        },
        mounted() {
            this.notInDrgData();
        },
        methods: {
			...mapMutations('homepage', ['setSearchInfo']),
            onSubmit() {
            //    console.log('submit!');
            },
            notInDrgData() {
                let formInitData = {
                    "page": this.pager.page,
                    "limit": this.pager.rows,
                    "reason": this.reason
                };

                notInDrg(formInitData).then(res => {
                    //console.log(res);
                    this.notInData = res.data.data.content;
                    this.pager.total = res.data.data.total;
                })
            },

			//去往首页编辑
            toHomePage(val){
            	var baza00 = val.medicalRecordCode;

				for (let i = 0; i < this.notInData.length; i++) {
					let item = {
					    "baza00":this.notInData[i].hospitalizationCode,
						"baza01":this.notInData[i].medicalRecordCode.slice(5,11),
						"baza02":this.notInData[i].patientName
					}
					this.tableData.push(item);
				}
			//	console.log(this.tableData.slice())

				this.setSearchInfo({
					baza00,
					notInDrgCondition: this.reason,
					searchData: {
						tableData: this.tableData.slice(),
						pager: { ...this.pager }
					}
				})
				this.$router.push({ path: '/admin/homepage/index' })
			}

        }
    }
</script>

<style scoped>
    #d1 {
        text-align: center;
        margin: 10px;
    }

    .link {
        color: #409eff;
        cursor: pointer;
    }
</style>

<template>
    <div>
        <el-card shadow="never" body-style="padding: 10px 20px">
            <el-form ref="registerForm" :model="registerForm" label-width="90px" class="form">
                <el-row :gutter="16">
                    <el-col :span="12">
                        <el-form-item label="借 阅 人">
                            <el-input style="width: 30%" size="mini" :value="registerForm.bafy03" @keyup.native.32="handleDictInputOpen"></el-input>
                            <el-input style="width: 68%; float: right" disabled size="mini" :value="registerForm.bafy02"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="借阅者科别">
                            <el-input style="width: 30%" size="mini" disabled v-model="registerForm.bafy07"></el-input>
                            <el-input style="width: 68%; float: right" disabled size="mini" v-model="registerForm.bafy07c"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="8">
                        <el-form-item label="借阅用途">
                            <el-select style="width: 100%" size="mini" v-model="registerForm.bafy09">
                                <el-option value="临床" label="临床" />
                                <el-option value="教学" label="教学" />
                                <el-option value="科研" label="科研" />
                                <el-option value="其他" label="其他" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="借阅者职级">
                            <el-select style="width: 100%" size="mini" v-model="registerForm.bafy08">
                                <el-option value="正高" label="正高" />
                                <el-option value="副高" label="副高" />
                                <el-option value="中级" label="中级" />
                                <el-option value="初级" label="初级" />
                                <el-option value="其他" label="其他" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="借阅日期">
                            <el-input size="mini" v-model="registerForm.bafy04"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="8">
                        <el-form-item label="病案号登记">
                            <el-input size="mini" v-model="registerForm.baza00" @keyup.native.13="handleSearchInfo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="归档号登记">
                            <el-input size="mini" v-model="registerForm.baza80"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="借阅份数">
                            <el-input style="width: 100%" size="mini" :value="borrowCount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="16">
                    <el-col :span="24">
                        <el-form-item label="请选择需借出的病案">
                            <div class="baza-box">
                                <div v-for="item in willBorrowData" :key="item.baza00">
                                    <el-checkbox v-model="item.checked">
                                        病案号：{{item.baza00}} 病患姓名：{{item.baza02}} 归档号：{{item.baza80 || ''}}
                                    </el-checkbox>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="btn-box">
                    <el-button :loading="loading" type="primary" size="mini" @click="this.handleSave">保存</el-button>
                    <el-button type="primary" size="mini" @click="handleContinue">继续</el-button>
                </div>
            </el-form>
        </el-card>
        <el-table
            style="margin-top: 10px"
            :data="tableData"
            border
            size="small"
            highlight-current-row
            v-loading="loading"
        >
            <el-table-column align="center" prop="bafy03" label="借阅者代码"></el-table-column>
            <el-table-column align="center" prop="bafy02" label="借阅者姓名"></el-table-column>
            <el-table-column align="center" prop="bafy07" label="借阅者科别"></el-table-column>
            <el-table-column align="center" prop="bafy08" label="借阅者职级"></el-table-column>
            <el-table-column align="center" prop="bafy10" label="借阅份数"></el-table-column>
        </el-table>
        <dict-input
            :append-to-body="false"
            :visible.sync="dictInputDialog.visible"
            :dictType="dictInputDialog.dictType"
            @submit="handleDictInputSubmit"
        />
    </div>
</template>

<script>
    import PagingToolbar from '../../components/toolbar/paging.vue';
    import DictInput from '../../components/dialog/dict-input.vue';
    import {borrow, searchInfo, searchUnBackBorrowRecords} from '../../api/borrowManager';
    import {formatDate} from '../../utils/index';
    const getRegisterForm = function () {
        return {
            bafy04: formatDate(new Date(), 'YYYY-MM-DD'), // 借阅日期
            bafy09: '临床', // 用途
            bafy08: '中级', //职级
            count: 1,
        }
    };
    export default {
        name: "register",
        components: {PagingToolbar, DictInput},
        data() {
            return {
                registerForm: getRegisterForm(),
                willBorrowData: [],
                tableData: [],
                loading: false,
                dictInputDialog: {
                    visible: false,
                    dictType: 'doctorDict',
                    fields: [
                        {dictFied: 'dm', targetField: 'bafy03'}, // code
                        {dictFied: 'dmmc', targetField: 'bafy02'}, // name
                        {dictFied: 'ksdm', targetField: 'bafy07'}, // 科室 code
                        {dictFied: 'ksmc', targetField: 'bafy07c'}, // 科室名称
                    ]
                }
            }
        },
        computed: {
          borrowCount() {
            //  console.log(this.willBorrowData.filter(item => item.checked).length);
              return this.willBorrowData.filter(item => item.checked).length
          }
        },
        mounted() {
          this.getUnbackData()
        },
        methods: {

            getUnbackData() {
                this.loading = true;
                searchUnBackBorrowRecords().then(res => {
                    if (res && res.data) {
                        this.tableData = res.data;
                    } else {
                        this.$message.error(res && res.msg ? res.msg : '获取未归还病案失败')
                    }
                }).catch(err => {
                    this.$message.error('获取未归还病案错误')
                }).finally(() => {
                    this.loading = false;
                })
            },

            handleDictInputOpen() {
              this.dictInputDialog.visible = true
            },

            handleDictInputSubmit(dictItem) {
                this.dictInputDialog.fields.forEach(item => {
                    this.registerForm[item.targetField] = dictItem[item.dictFied]
                })
            },

            // 病案号enter后查询病案信息
            handleSearchInfo() {
                if (this.registerForm.baza00) {
                    searchInfo(this.registerForm.baza00).then(res => {
                        if (res && res.code === 0) {
                            if (!res.data) return this.$message.error('该病案不存在！');
                            if (this.willBorrowData.some(item => item.baza00 === res.data.baza00)) {
                                this.$message.error('该病案已查出，请勿重复查询')
                            } else {
                                this.willBorrowData = this.willBorrowData.concat([{...res.data, checked: true}]);
                                // 清除原来的筛选
                                this.registerForm.baza00 = undefined;
                                this.registerForm.baza80 = undefined;
                            }
                        } else {
                            this.$message.error(res && res.msg ? res.msg : '查询病案信息失败')
                        }
                    }).catch(err => {
                        this.$message.error('查询病案信息出错')
                    })
                }
            },

            handleSave() {
                if (this.registerForm.bafy03) {
                    const medicals = this.willBorrowData.filter(item => item.checked);
                    if (medicals.length) {
                        this.loading = true;
                        const params = medicals.map(item => ({
                            ...this.registerForm,
                            baza00: item.baza00,
                            baza01: item.baza01,
                            baza02: item.baza02, // 病案姓名
                            bafy10: this.borrowCount // 借阅份数
                        }));
                        borrow(params).then(res => {
                            if (res && res.code === 0) {
                                this.$message.success('保存成功');
                                this.getUnbackData()
                            }
                            else this.$message.error(res && res.msg ? res.msg : '保存失败');
                        }).catch(err => {
                            this.$message.error('保存错误')
                        }).finally(() => {
                            this.loading = false;
                        })
                    } else {
                        this.$message.error('请勾选需要借出的病案');
                    }
                } else {
                    this.$message.error('请选择借阅人');
                }
            },

            handleContinue() {
                this.willBorrowData = [];
                this.registerForm = getRegisterForm();
            }
        }
    }
</script>

<style scoped lang="less">

        /deep/ .el-input__inner:focus {
            background: #409EFF;
            color: #ffffff;
            border-top-color: #409EFF;
        }


    .form {
        .el-form-item {
            margin-bottom: 0;
        }
    }
    .btn-box {
        text-align: center;
        margin-top: 10px;
    }
    .baza-box {
        margin-top: 10px;
        padding: 10px;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        height: 200px;
        overflow-y: auto;
        line-height: 24px;
    }
</style>

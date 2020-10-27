<template>
    <div>
        <el-tabs type="border-card" @tab-click="selectTabIndex">
            <el-tab-pane label="审核列表" >
                <el-card shadow="never" body-style="padding: 10px 20px">
                    <el-form ref="borrowForm" :model="borrowForm" label-width="90px" class="form">
                        <el-row :gutter="16">
                            <el-col :span="24">
                                    <el-card shadow="never" class="card" body-style="padding: 10px" :style="{ overflowY: 'auto'}">
                                        <el-table
                                                ref="leftTable"
                                                highlight-current-row
                                                :data="listData"
                                                style="font-size: 13px;"
                                                @selection-change="handleSelectionChange"
                                        >
                                            <el-table-column
                                                    type="selection"
                                                    width="55">
                                            </el-table-column>
                                            <el-table-column prop="baza01" width="120" align="left">
                                                <template slot="header" slot-scope="scope">
                                                    <div>病案号</div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="baza02" align="left" width="65" label="姓名"></el-table-column>
                                            <el-table-column prop="kb" align="center" width="150" label="出院科别"></el-table-column>
                                            <el-table-column prop="BAZA27" align="center" width="170px" label="出院日期"></el-table-column>
                                            <el-table-column prop="baza65" align="center" width="140" label="ICD10"></el-table-column>
                                            <el-table-column prop="baza29" align="center" width="140" label="住院天数"></el-table-column>
                                            <el-table-column prop="dmmc" min-width="200px" label="诊断名称" show-overflow-tooltip>
                                                <template slot-scope="scope">
                                                    <div class="ellipsis">{{scope.row.dmmc}}</div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" style="font-size: 12px;">通过</el-button>
                                                    <el-button type="text" style="color: orangered;font-size: 12px;" @click="dialogFormVisible = true">驳回</el-button>
                                                </template>
                                            </el-table-column>

                                            <!-- <el-table-column prop="ssmc" min-width="200px" label="手术名称"></el-table-column>
                                            <el-table-column prop="ssbm" align="center" width label="手术编码"></el-table-column>-->

                                        </el-table>
                                    </el-card>
                                    <div>
                                        <el-pagination
                                                layout="prev, pager, next"
                                                :pager-count="5"
                                                :total="total"
                                                :current-page.sync="page"
                                                :page-size="limit"
                                                @current-change="handlePageChange"
                                        ></el-pagination>
                                        <!--                    <paging-toolbar :pager="list.pager" :small="true" :pager-count="5" @change="getList(list.filters, list.pager)"/>-->
                                    </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="审核员列表">

                <el-card shadow="never" body-style="padding: 10px 20px">
                    <el-form ref="registerForm" :model="registerForm" label-width="90px" class="form">
                        <el-row :gutter="16">
                            <el-col :span="10">
                                <el-form-item label="借 阅 人">
                                    <el-input style="width: 30%" size="mini" disabled :value="registerForm.bas502n" @keyup.native.32="handleDictInputOpen(1)"></el-input>
                                    <el-input style="width: 68%; float: right" disabled size="mini" :value="registerForm.bas502"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="借阅者科别">
                                    <el-input style="width: 30%" size="mini" disabled v-model="registerForm.bas503n"></el-input>
                                    <el-input style="width: 68%; float: right" disabled size="mini" v-model="registerForm.bas503"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                    <el-form-item label="申请日期">
                                        <el-input size="mini" :disabled="true" v-model="registerForm.bas501"></el-input>
                                    </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
                <br/>
                <el-card shadow="never" body-style="padding: 10px 20px;">
                    <el-row>
                        <el-col>
                            <div>
                                <el-table
                                        ref="leftTable"
                                        highlight-current-row
                                        :data="multipleSelection"
                                        style="font-size: 13px;"
                                >
                                    <el-table-column prop="baza01" width="75" align="left">
                                        <template slot="header" slot-scope="scope">
                                            <div>病案号</div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="baza02" align="left" width="65" label="姓名"></el-table-column>
                                    <el-table-column prop="kb" align="center" width="140" label="出院科别"></el-table-column>
                                    <el-table-column prop="BAZA27" align="center" width="100" label="出院日期"></el-table-column>
                                    <el-table-column prop="baza29" align="center" width="80" label="住院天数"></el-table-column>
                                    <el-table-column prop="dmmc" min-width="300px" label="诊断名称" show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <div class="ellipsis">{{scope.row.dmmc}}</div>
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column prop="ssmc" min-width="200px" label="手术名称"></el-table-column>
                                    <el-table-column prop="ssbm" align="center" width label="手术编码"></el-table-column>-->

                                </el-table>
                            </div>
                            <div>
                                <el-pagination
                                        layout="prev, pager, next"
                                        :pager-count="5"
                                        :total="total"
                                        :current-page.sync="page"
                                        :page-size="limit"
                                        @current-change="handlePageChange"
                                ></el-pagination>
                                <!--                    <paging-toolbar :pager="list.pager" :small="true" :pager-count="5" @change="getList(list.filters, list.pager)"/>-->
                            </div>
                        </el-col>
                    </el-row>
                    <div class="btn-box">
                        <el-button :loading="loading" type="primary" size="mini" @click="handleSave">添加</el-button>
                    </div>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <el-dialog title="驳回申请" :visible.sync="dialogFormVisible">
            <div>
                驳回理由：
            </div>
            <br/>
            <div>
                <el-input type="textarea"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleSubmit">确 定</el-button>
            </div>
        </el-dialog>
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
    import {selectTraceability, borrowList, getDetailList,  addApply,  delApply, borrowExamine, getExamineList, getListBas6} from '../../api/shelf';
    import {SearchHomePage} from '../../api';
    import crypto from "@/common/js/crypto.js";
    const getRegisterForm = function () {
        return {
            bas501: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 申请日期
            bas502: undefined, // 申请者代码
            bas503: undefined, // 申请者科室代码
            bas504: undefined, // 借阅份数
            bas505: '0', // 用途
            bas506: undefined, //审批者
            bas507: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 审批日期
            bas511: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 借出日期
            bas512: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 归还日期
        }
    };
    const getBorrowForm = function () {
        return {
            bas501: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 申请日期
            bas502: undefined, // 申请者代码
            bas503: undefined, // 申请者科室代码
            bas504: undefined, // 借阅份数
            bas505: '0', // 用途
            bas506: undefined, //审批者
            bas507: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 审批日期
            bas511: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 借出日期
            bas512: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'), // 归还日期
        }
    };
    export default {
        name: "register",
        components: {PagingToolbar, DictInput},
        data() {
            return {
                handleSubmit() {
                    borrowExamine().then(res => {
                        console.log(res);
                        this.dialogFormVisible = false;
                    })
                },
                filters:{
                    startTime: formatDate(new Date(), "YYYY-01-01"),
                    endTime: formatDate(new Date(), "YYYY-MM-DD"),
                    state: "1",
                    years: "2020",
                    baza01: '',
                    kebieName: ''
                },
                page: 1,
                total: 100,
                limit: 10,
                registerForm: getRegisterForm(),
                borrowForm: getBorrowForm(),
                willBorrowData: [],
                tableData: [],
                multipleSelection: [],
                listData: [],
                adminData: {},
                loading: false,
                form: {
                    state: 1
                },
                dialogFormVisible: false,
                dictInputDialog: {
                    visible: false,
                    dictType: 'doctorDict',
                    fields: [
                        {dictFied: 'dm', targetField: 'bas502'}, // code
                        {dictFied: 'dmmc', targetField: 'bas502n'}, // name
                        {dictFied: 'ksdm', targetField: 'bas503'}, // 科室 code
                        {dictFied: 'ksmc', targetField: 'bas503n'}, // 科室名称
                    ]
                },
                tabIndex: '0'
            }
        },
        computed: {
            borrowCount() {
                //  console.log(this.willBorrowData.filter(item => item.checked).length);
                return this.willBorrowData.filter(item => item.checked).length
            }
        },
        mounted() {
            this.getUserInfo();
            this.getBorrowList();
            this.getList();
        },
        methods: {
            handleReset() {
                    // this.form = {};
                    this.filters.year = undefined;
                    this.filters.startTime = undefined;
                    this.filters.endTime = undefined;
                    this.filters.kebieName = undefined;
                    this.filters.baza01 = undefined;
                    this.filters.dm1 = undefined;
                    this.getList();

            },
            getUserInfo() {
                this.adminData = crypto.getUserInfo();
                this.$set(this.registerForm, 'bas502', this.adminData.adminData.adminId);
                this.$set(this.registerForm, 'bas502n', this.adminData.adminData.username);
                this.$set(this.borrowForm, 'bas502', this.adminData.adminData.adminId);
                this.$set(this.borrowForm, 'bas502n', this.adminData.adminData.username);

                this.$set(this.registerForm, 'bas503', 'BG10');
                this.$set(this.registerForm, 'bas503n', this.adminData.adminData.username);
                this.$set(this.borrowForm, 'bas503', 'BG10');
                this.$set(this.borrowForm, 'bas503n', this.adminData.adminData.username);
                console.log(this.registerForm);
                console.log(this.adminData);
            },
            selectTabIndex (ev) {
                this.tabIndex = ev.paneName;
                console.log(ev);
            },
            getBorrowList () {
                getExamineList().then(res => {
                    console.log(res);
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            handleLeftRowClick (row) {
                selectTraceability({baza00: row.baza00}).then(res => {
                    console.log(res);
                })
            },
            handlePageChange(page) {
                this.page = page;
                this.getList()
            },

            getList() {

                getListBas6({ ...this.filters, page: this.page, limit: this.limit }).then(res => {
                    if (res && res.data) {
                        this.listData = res.data.content;
                        this.total = res.data.total;
                        console.log(this.listData);

                    } else {
                        this.$message.error(res && res.msg ? res.msg : '获取审核员列表失败')
                    }
                }).catch(err => {
                    this.$message({ type: 'error', message: '获取审核员列表错误' });
                })
            },


            handleDictInputOpen(index) {
                if (index === 2) {
                    this.dictInputDialog.dictType = 'departmentDict';
                }
                this.dictInputDialog.visible = true
                 this.tabIndex = index;
            },

            handleDictInputSubmit(dictItem) {
                console.log(dictItem);
                if (this.tabIndex === 0) {
                    this.dictInputDialog.fields.forEach(item => {
                        this.borrowForm[item.targetField] = dictItem[item.dictFied]
                    })
                } else if (this.tabIndex === 1){
                    this.dictInputDialog.fields.forEach(item => {
                        this.registerForm[item.targetField] = dictItem[item.dictFied]
                    })
                } else if (this.tabIndex === 2) {
                    this.filters['kebieName'] = dictItem['dmmc'];
                    this.filters['dm1'] = dictItem['dm'];
                }

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

                console.log(this.registerForm);
                if (this.registerForm.bas511 > this.registerForm.bas512) {
                    this.$message.error('借出日期不能大于归还日期');
                    return;
                }
                if (this.multipleSelection.length === 0) {
                    this.$message.error('请选择需要借阅的病案');
                    return;
                }

                        this.$set(this.registerForm, 'bas504', this.multipleSelection.length);
                        this.$set(this.registerForm, 'bafxDOList', this.multipleSelection);
                             this.loading = true;
                console.log(this.registerForm);
                     addApply(this.registerForm).then(res => {
                            if (res && res.code === 0) {
                                this.$message.success('添加成功');
                            }
                            else this.$message.error(res && res.msg ? res.msg : '添加失败');
                        }).catch(err => {
                            this.$message.error('添加错误')
                        }).finally(() => {
                            this.loading = false;
                        })


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
        text-align: right;
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

    /deep/ .el-table td, .el-table th {
        padding: 5px 0;
    }
    /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 100%;
    }

    /deep/ .el-card__header {
        padding: 0 20px;
    }

</style>

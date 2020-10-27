<template>
    <div>
        <el-tabs type="border-card" @tab-click="selectTabIndex">
            <el-tab-pane label="申请列表" >
                <el-card shadow="never" body-style="padding: 10px 20px">
                    <el-form ref="borrowForm" :model="borrowForm" label-width="90px" class="form">
                        <el-row :gutter="16">
                            <el-col :span="10">
                                <el-form-item label="借 阅 人">
                                    <el-input style="width: 30%" size="mini" disabled :value="borrowForm.bas502n" @keyup.native.32="handleDictInputOpen(0)"></el-input>
                                    <el-input style="width: 68%; float: right" disabled size="mini" :value="borrowForm.bas502"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item label="借阅者科别">
                                    <el-input style="width: 30%" size="mini" disabled v-model="borrowForm.bas503n"></el-input>
                                    <el-input style="width: 68%; float: right" disabled size="mini" v-model="borrowForm.bas503"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="申请日期">
                                    <el-input size="mini" disabled v-model="borrowForm.bas501"></el-input>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row :gutter="12">
                            <el-col :span="5">
                                <el-form-item label="借阅用途">
                                    <el-select style="width: 100%" size="mini" v-model="borrowForm.bas505">
                                        <el-option value="0" label="临床" />
                                        <el-option value="1" label="教学" />
                                        <el-option value="2" label="科研" />
                                        <el-option value="3" label="其他" />
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="借出日期">
                                    <el-date-picker
                                            v-model="borrowForm.bas511"
                                            align="right"
                                            type="date"
                                            size="mini"
                                            value-format="yyyy-MM-dd"
                                            :clearable="false"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="归还日期">

                                    <el-date-picker
                                            v-model="borrowForm.bas501"
                                            align="right"
                                            type="date"
                                            size="mini"
                                            value-format="yyyy-MM-dd"
                                            :clearable="false"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4" style="line-height: 35px;">
                                <el-button type="primary" size="mini" @click="getBorrowList">查询</el-button>
                            </el-col>
                        </el-row>
                        <el-row :gutter="16">
                            <el-col :span="24">
                                <el-form-item label="请选择需借出的病案">
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
                                            <el-table-column prop="bas502" align="left" width="65" label="申请者"></el-table-column>
                                            <el-table-column prop="bas503Name" align="center" width="120" label="科别"></el-table-column>
                                            <el-table-column prop="bas504" align="center" width="80px" label="借阅份数"></el-table-column>
                                            <el-table-column prop="bas505" align="center" width="80" label="借阅用途"></el-table-column>
                                            <el-table-column prop="bas506" align="center" width="80" label="审批者"></el-table-column>
                                            <el-table-column prop="bas507" align="center" width="120" label="审批时间"></el-table-column>
                                            <el-table-column prop="bas508" align="center" width="80" label="状态"></el-table-column>
                                            <el-table-column prop="bas509" align="center" width="120" label="不通过原因"></el-table-column>
                                            <el-table-column prop="bas510" align="center" width="120" label="审批层级"></el-table-column>
                                            <el-table-column prop="bas511" align="center" width="120" label="借出日期"></el-table-column>
                                            <el-table-column prop="bas512" align="center" width="120" label="归还日期"></el-table-column>
                                            <el-table-column  align="center" width="120" label="操作">
                                                <template slot-scope="scope">
                                                    <el-button type="text" @click="showCaseInfo(scope.row)">查看</el-button>
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
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-tab-pane>
            <el-tab-pane label="添加申请">

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
                        <el-row :gutter="16">
                            <el-col :span="5">
                                <el-form-item label="借阅用途">
                                    <el-select style="width: 100%" size="mini" v-model="registerForm.bas505">
                                        <el-option value="0" label="临床" />
                                        <el-option value="1" label="教学" />
                                        <el-option value="2" label="科研" />
                                        <el-option value="3" label="其他" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="借出日期">
                                    <el-date-picker
                                            v-model="registerForm.bas511"
                                            align="right"
                                            type="date"
                                            size="mini"
                                            :clearable="false"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="归还日期">
                                    <el-date-picker
                                            v-model="registerForm.bas512"
                                            align="right"
                                            type="date"
                                            size="mini"
                                            :clearable="false"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="16">
                            <el-col :span="24">
                                <el-form-item label="请选择需借出的病案">
                                    <el-card shadow="never" class="card" body-style="padding: 10px" :style="{ overflowY: 'auto'}">
                                            <div style="margin-bottom: 10px;">
                                                <el-form :model="form" >
                                                    <el-row :gutter="4">
                                                        <el-col :span="4" style="min-width: 175px;">
                                                            <el-form-item  label="执行年度" label-width="80px">
                                                                <el-date-picker
                                                                        ref="years"
                                                                        value-format="yyyy"
                                                                        v-model="filters.years"
                                                                        type="year"
                                                                        size="mini"
                                                                        :clearable="false"
                                                                />
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="3">
                                                            <el-form-item label="科别" label-width="50px">
                                                                <el-input
                                                                        @keyup.native.32="handleDictInputOpen(2)"
                                                                        ref="kebieName"
                                                                        size="mini"
                                                                        :value="filters.kebieName"
                                                                />
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="5">
                                                            <el-form-item  label-width="120px" label="出院起止日期 从">
                                                                <el-date-picker
                                                                        ref="startTime"
                                                                        v-model="filters.startTime"
                                                                        value-format="yyyy-MM-dd"
                                                                        type="date"
                                                                        size="mini"
                                                                        :clearable="false"
                                                                />
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <el-form-item label-width="40px" label="到">
                                                                <el-date-picker
                                                                        ref="endTime"
                                                                        v-model="filters.endTime"
                                                                        value-format="yyyy-MM-dd"
                                                                        type="date"
                                                                        size="mini"
                                                                        :clearable="false"
                                                                />
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="4">
                                                            <el-form-item  label="定位病案号" label-width="100px">
                                                                <el-input v-model="filters.baza01" ref="baza01" size="mini"></el-input>
                                                            </el-form-item>
                                                        </el-col>
                                                        <el-col :span="3" >
                                                            <el-form-item >
                                                                <el-button type="primary" size="mini" @click="getList">搜索</el-button>
                                                                <el-button size="mini" @click="handleReset">重置</el-button>
                                                            </el-form-item>
                                                        </el-col>


                                                        <!--      <el-form-item v-if="fraction">-->
                                                        <!--        评分合计：<span style="color: brown;">{{fraction}}</span>-->
                                                        <!--      </el-form-item>-->

                                                    </el-row>
                                                </el-form>
                                            </div>
                                        <div style="float:left;width: 400px;">
                                            <el-card shadow="never">
                                                <div slot="header" style="font-size:15px;text-align: left;">
                                                    病案列表
                                                </div>
                                                <div>
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
                                                        <el-table-column prop="baza01" width="80" align="left">
                                                            <template slot="header" slot-scope="scope">
                                                                <div>病案号</div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="baza02" align="left" width="65" label="姓名"></el-table-column>
                                                        <el-table-column prop="kb" align="center" width="120" label="出院科别"></el-table-column>

                                                        <!-- <el-table-column prop="ssmc" min-width="200px" label="手术名称"></el-table-column>
                                                        <el-table-column prop="ssbm" align="center" width label="手术编码"></el-table-column>-->

                                                    </el-table>
                                                </div>
                                            </el-card>
                                        </div>
                                        <div style="float:left;width: calc(100% - 420px);margin-left: 10px;">
                                            <el-card shadow="never">
                                                <div slot="header" style="font-size:15px;text-align: left;">
                                                    待借阅列表
                                                </div>
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
                                            </el-card>
                                        </div>
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
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="btn-box">
                            <el-button :loading="loading" type="primary" size="mini" @click="handleSave">保存</el-button>
                        </div>
                    </el-form>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                :title="`病案信息`"
                :visible.sync="resultVisible"
                width="95%"
                top="40px"
                class="search-dialog"
                :close-on-click-modal="false"
        >
            <div style="overflow: hidden">

                <el-table
                        :data="caseData"
                        class="group-table"
                        border
                        size="small"
                        row-key="baza01"
                        highlight-current-row
                >
                    <el-table-column prop="baza01" width="140" align="left">
                        <template slot="header" slot-scope="scope">
                            <div>病案号</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baza02" align="left" width="75" label="姓名"></el-table-column>
                    <el-table-column prop="kb" align="center" width="140" label="出院科别"></el-table-column>
                    <el-table-column prop="BAZA27" align="center" width="140px" label="出院日期"></el-table-column>
                    <el-table-column prop="baza65" align="center" width="140" label="ICD10"></el-table-column>
                    <el-table-column prop="baza41" align="center" width="140" label="转归">
                        <template slot-scope="scope">
                            <span v-if="scope.row.baza41 === '1'">治愈</span>
                            <span v-if="scope.row.baza41 === '2'">好转</span>
                            <span v-if="scope.row.baza41 === '3'">未愈</span>
                            <span v-if="scope.row.baza41 === '4'">死亡</span>
                            <span v-if="scope.row.baza41 === '5'">其他</span>
                            <span v-if="scope.row.baza41 === '9'">其他</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="baza29" align="center" width="140" label="住院天数"></el-table-column>
                    <el-table-column prop="dmmc" min-width="300px" label="诊断名称" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="ellipsis">{{scope.row.dmmc}}</div>
                        </template>
                    </el-table-column>
                    <!--            <el-table-column prop="j" label="签收日期"></el-table-column>-->
                </el-table>
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
    import {selectTraceability, borrowList, getDetailList,  addApply,  delApply} from '../../api/shelf';
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
                resultVisible: false,
                caseData: [],
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
            this.getUnbackData();
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
                let params = {...this.borrowForm, page: this.page, limit: this.limit}
                borrowList(params).then(res => {
                    if (res && res.data) {
                        this.listData = res.data.content;

                    } else {
                        this.$message.error(res && res.msg ? res.msg : '获取病案列表失败')
                    }
                })
            },
            showCaseInfo(row) {
                console.log(row);
                getDetailList({id: row.bas500}).then( res => {
                    if (res.code === 0) {
                        this.caseData = res.data;
                        this.resultVisible = true;

                    } else {
                        this.$message.success(res.msg);
                    }
                });
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

                SearchHomePage({ ...this.filters, page: this.page, limit: this.limit }).then(res => {
                    if (res && res.data) {
                        this.listData = res.data.content;
                        this.total = res.data.total;
                        console.log(this.listData);

                    } else {
                        this.$message.error(res && res.msg ? res.msg : '获取病案列表失败')
                    }
                }).catch(err => {
                    this.$message({ type: 'error', message: '获取病案列表错误' });
                })
            },
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
                                this.getUnbackData()
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

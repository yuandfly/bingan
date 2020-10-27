<template>
    <div>
        <el-row :gutter="0" class="header">
            <el-col :span="12" class="header-box">
                <div class="title">病案借阅查询</div>
                <el-radio v-model="searchForm.searchType" label="person">按借阅者姓名：</el-radio>
                <div class="input-box">
                    <div class="input-item">
                        <div class="input-label">借阅者姓名：</div>
                        <div class="input-content">
                            <el-input :value="searchForm.bafy02" @keydown.native.32="handleDictInputOpen" size="mini" :disabled="searchForm.searchType !== 'person'" style="width: 90%"></el-input>
                        </div>
                    </div>
                </div>
                <el-radio v-model="searchForm.searchType" label="number">按病案号查询：</el-radio>
                <div class="input-box">
                    <div class="input-item">
                        <div class="input-label">病案号：</div>
                        <div class="input-content">
                            <el-input v-model="searchForm.baza01" size="mini" :disabled="searchForm.searchType !== 'number'" style="width: 90%"></el-input>
                        </div>
                    </div>
                </div>
                <div class="header-footer">
                    <el-button type="primary" size="mini" @click="handleSearch">查询</el-button>
                </div>
            </el-col>
            <el-col :span="12" class="header-box border-left">
                <div class="title">病案借阅统计</div>
                <div class="input-item">
                    <div class="input-label">统计起始日期：</div>
                    <div class="input-content">
                        <el-date-picker value-format="yyyy-MM-dd" size="mini" v-model="statisticsForm.bafy04" style="width: 100%"></el-date-picker>
                    </div>
                </div>
                <div class="input-item">
                    <div class="input-label">统计结束日期：</div>
                    <div class="input-content">
                        <el-date-picker value-format="yyyy-MM-dd"  size="mini" v-model="statisticsForm.bafy04End" style="width: 100%"></el-date-picker>
                    </div>
                </div>
                <div class="input-item">
                    <div class="input-label">统计类型：</div>
                    <div class="input-content">
                        <el-radio-group class="radio-group" v-model="statisticsForm.flag">
                            <div class="radio-item">
                                <el-radio label="1">按借阅者统计</el-radio>
                                <el-radio label="2">按科别统计</el-radio>
                                <el-radio label="3">所有未归还的病案</el-radio>
                            </div>
                            <div class="radio-item"></div>
                        </el-radio-group>
                    </div>
                </div>
                <div class="header-footer">
                    <el-button type="primary" size="mini" @click="handleStatistics">统计</el-button>
                </div>
            </el-col>

        </el-row>

        <el-table
            style="margin-top: 10px"
            :data="tableData"
            v-loading="loading"
            border
            size="small"
            highlight-current-row
        >
            <el-table-column
                v-for="item in columns[currentColumnName]"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
            />
        </el-table>

        <dict-input
            :visible.sync="dictInputDialog.visible"
            dictType="doctorDict"
            @submit="handleDictInputSubmit"
        />

    </div>
</template>

<script>
    import DictInput from '../../components/dialog/dict-input.vue';
    import {borrowSearch, borrowStatistics} from '../../api/borrowManager';
    function getColumns() {
        const all = {
            no: {prop: 'baza01', label: '病案号'},
            name: {prop: 'bafy02', label: '借出者姓名'},
            department: {prop: 'bafy07c', label: '借出者科别'},
            nums: {prop: 'bafy10', label: '借阅份数'},
            borrowDate: {prop: 'bafy04', label: '借阅日期'},
            level: {prop: 'bafy08', label: '借阅者职级'},
            use: {prop: 'bafy09', label: '借阅者用途'},
            code: {prop: 'bafy03', label: '借阅者代码'},
            backDate: {prop: 'bafy05', label: '归还日期'},
            backPerson: {prop: 'bafy06', label: '归还接收者'},
            total: {prop: 'count', label: '借阅总数'}
        };
        return {
            search: [all.no, all.name, all.code, all.department,  all.borrowDate, all.backDate, all.backPerson],
            statisticsByPerson: [all.name, all.nums, all.department, all.borrowDate, all.level, all.use, all.code],
            statisticsByDepartment: [all.department, all.total],
            statisticsByAll: [all.no, all.name, all.borrowDate, all.department, all.code]
        };
    }
    export default {
        name: "statistics",
        components: {DictInput},
        data() {
            return {
                searchForm: {
                    searchType: 'person',
                    bafy02: undefined, // 姓名
                    bafy03: undefined, // 代码
                    baza01: undefined,
                },
                statisticsForm: {
                    bafy04: undefined,
                    bafy04End: undefined,
                    flag: undefined
                },
                currentColumnName: 'search',
                columns: getColumns(),
                tableData: [],
                pager: {page: 1, rows: 10, total: 0},
                loading: false,
                dictInputDialog: {
                    visible: false
                }
            }
        },

        methods: {

            handleDictInputOpen() {
                this.dictInputDialog.visible = true;
            },

            handleDictInputSubmit(item) {
              this.searchForm.bafy02 = item.dmmc;
              this.searchForm.bafy03 = item.dm; // 代码
            },

            handleSearch() {
                const params = this.searchForm.searchType === 'person' ? {
                    bafy03: this.searchForm.bafy03
                } : {
                    baza01: this.searchForm.baza01
                };
                this.loading = true;
                this.currentColumnName = 'search';
                borrowSearch(params).then(res => {
                    if (res && res.data) {
                        this.tableData = res.data;
                    } else {
                        this.$message.error(res && res.msg ? res.msg : '查询失败')
                    }
                }).catch(err => {
                    this.$message.error('查询错误')
                }).finally(() => {
                    this.loading = false
                })
            },

            handleStatistics() {
                this.loading = true;
                const columnNameObj = {1: 'statisticsByPerson', 2: 'statisticsByDepartment', 3: 'statisticsByAll'};
                this.currentColumnName = columnNameObj[this.statisticsForm.flag];
                borrowStatistics(this.statisticsForm).then(res => {
                    if (res && res.data) {
                        this.tableData = res.data;
                    } else {
                        this.$message.error(res && res.msg ? res.msg : '查询失败')
                    }
                }).catch(err => {
                    this.$message.error('查询错误')
                }).finally(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .header {
        border: 1px solid #EBEEF5;
        border-radius: 2px;
        margin-top: 10px;
    }
    .header-box {
        padding: 22px 50px 10px;
        position: relative;
    }
    .border-left {
        border-left: 1px solid #EBEEF5;
    }
    .title {
        position: absolute;
        top: -12px;
        left: 20px;
        padding: 0 10px;
        line-height: 24px;
        color: #333333;
        background: #ffffff;
    }
    .input-box {
        /*border: 1px solid #e0e0e0;*/
        border-radius: 2px;
        margin: 20px 0;
    }
    .input-item {
        margin: 20px 0;
    }
    .input-label {
        width: 100px;
        float: left;
        font-size: 14px;
        line-height: 28px;
        text-align: right;
    }
    .input-content {
        margin-left: 100px;
    }
    .header-footer {
        text-align: center;
    }
    .radio-group {
        padding-top: 8px;
    }
    .radio-item {
        margin-bottom: 10px;;
    }
    /deep/ .el-input__inner:focus {
        background: #409EFF;
        color: #ffffff;
        border-top-color: #409EFF;
    }
</style>

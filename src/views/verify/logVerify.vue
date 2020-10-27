
<template>
    <div class="page-home-verify">
        <div class="filter-box">
            <span class="label">出院科室：</span>
            <el-select clearable v-model="deptCode" size="small" style="margin-right: 20px">
                <el-option v-for="item in departmentData" :value="item.dm" :label="item.dmmc"></el-option>
            </el-select>
            <span class="label">起止日期：</span>
            <el-date-picker
                size="small"
                v-model="dateRange"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
            <el-button size="small" style="margin-left: 20px" type="primary" @click="getData({page: 1, rows: 10})">查询</el-button>
        </div>
        <div shadow="never" class="table-box">
            <el-table
                :data="tableData"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                v-loading="loading"
                :default-expand-all="false"
            >
                <el-table-column prop="tjz1rq" label="日期" align="center"></el-table-column>
                <el-table-column prop="tjz1kb" label="科室代码" align="center" ></el-table-column>
                <el-table-column prop="bqmc" label="病区" align="center"></el-table-column>
                <el-table-column prop="kb" label="科室" align="center"></el-table-column>
                <el-table-column prop="bjxm" label="审核项目" align="center"></el-table-column>
                <el-table-column prop="tj" label="日志人数" align="center"></el-table-column>
                <el-table-column prop="ba" label="病案人数/号"></el-table-column>
            </el-table>
            <paging-toolbar
                style="margin-top: 20px;"
                :pager="pager"
                @change="getData"
            />
        </div>
    </div>
</template>

<script>
    import PagingToolbar from '../../components/toolbar/paging.vue';
    import {formatDate} from '../../utils/index';
    import {LogCheck} from '../../api/verify';
    import {GetDepartment} from '../../api/dictionary';
    export default {
        name: "homeVerify", // 住院日志审核
        components: {PagingToolbar},
        data() {
            return {
                dateRange: undefined,
                deptCode: undefined,
                departmentData: [],
                tableData: [],
                pager: {page: 0, rows: 10, total: 0},
                loading: false
            }
        },

        mounted() {
            this.getDepartment()
        },

        methods: {

            getDepartment() {
                GetDepartment({}).then(res => {
                    if (res && res.data) {
                        this.departmentData = res.data
                    } else {
                        this.$message.error('科室数据查询失败')
                    }
                }).catch(err => {
                    this.$message.error('科室数据查询错误')
                })
            },

            getData(pager) {
                const pagination = pager || this.pager;
                if (this.dateRange && this.dateRange.length) {
                    this.loading = true;
                    const params = {
                        startDate: formatDate(this.dateRange[0], 'YYYY-MM-DD'),
                        endDate: formatDate(this.dateRange[1], 'YYYY-MM-DD'),
                        deptCode: this.deptCode || '0000',
                        page: pagination.page,
                        size: pagination.rows
                    };
                    LogCheck(params).then(res => {
                        if (res && res.code === 0) {
                            // 处理表格数据，每行添加id作为key，并将baList整理为children
                            this.tableData = (res.data.content || []).map((item, index) => ({
                                ...item,
                                id: 'item-' + index,
                                children: item.baList.map((ba, idx) => ({
                                    ba,
                                    id: 'item-' + index + idx
                                }))
                            }));
                            console.log(this.tableData, 'op')
                            this.pager = {...pagination, total: res.data.total}
                        } else {
                            this.$message.error(res && res.msg ? res.msg : '查询失败')
                        }
                    }).catch(err => {
                        this.$message.error('查询错误')
                    }).finally( _ => {
                        this.loading = false;
                    })
                } else {
                    this.$message.error('请选择查询范围')
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .page-home-verify {

    }
    .filter-box {
        text-align: center;
        background: #eee;
        padding-bottom: 10px;
    }
    .label {
        color: #606266;
        font-size: 14px;
    }
    .table-box {
        margin: 20px;
    }
</style>

<template>

    <el-form :inline="true" :model="filters" class="demo-form-inline" style="padding: 20px;">
        <el-form-item label="编辑员代码">
            <el-input v-model="filters.czydm" placeholder="编辑员代码"></el-input>
        </el-form-item>

        <el-form-item label="操作日期：">
            <el-date-picker
                    v-model="filters.czrq"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="queryAll()">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="download()">下载</el-button>
        </el-form-item>
        <czrzxq :hzyVisible="dialogVisible" v-on:childShow="childShowFun" :uuid="uuid"  ref="queryList"></czrzxq>
        <el-table
                :data="tableData"
                border
                style="width: 100%"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column
                    fixed="left"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="open(scope.row)" type="text"  size="small" >查看详情</el-button>

                </template>
            </el-table-column>
            <el-table-column
                    prop="czydm"
                    label="操作员代码"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="czy"
                    label="操作员"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="czrq"
                    label="操作日期">
            </el-table-column>
            <el-table-column
                    prop="czsj"
                    label="操作时间">
            </el-table-column>
            <el-table-column
                    prop="czsx"
                    label="操作事项">
            </el-table-column>
            <el-table-column
                    prop="bz"
                    label="标志">
            </el-table-column>
            <el-table-column prop="kbmc"label="科别">

            </el-table-column>
        </el-table>

        <el-col :span="24"
                class="toolbar">
            <paging-toolbar :pager="pager"
                            @change="queryAll('condition')"/>
        </el-col>
    </el-form>
</template>

<script>
    import {getCzrzPageList, getCzrzPageListAll} from "../../api/system/czrz.js";
    import PagingToolbar from '../../components/toolbar/paging'
    import czrzxq from "./czrzxq";
    import FileSaver from "file-saver";
    import XLSX from "xlsx";
    import {
        formatDate
    } from '../../utils';

    export default {
        components: {PagingToolbar, czrzxq},
        data() {
            return {
                tableData: [],
                formInline: {},
                uuid:"",
                dialogVisible: false,
                filters: {
                    czrq: [
                        formatDate(new Date,"YYYY-MM-DD"),
                        formatDate(new Date,"YYYY-MM-DD"),
                    ]
                },
                pager: {
                    total: 0, // 总条数
                    page: 1, // 当前页
                    rows: 10 // 每页显示多少条
                },
                loading: true,
                pickerStartDate: {
                    disabledDate: time => {
                        if (this.filters.endDate) {
                            return time.getTime() > this.filters.endDate
                        }
                    }
                },
                pickerCloseDate: {
                    disabledDate: time => {
                        return time.getTime() < this.filters.startDate
                    }
                },
            }
        },
        /**页面加载事件*/
        mounted() {
            this.queryAll();
        },

        /**方法*/

        methods: {


            open(row){
                this.dialogVisible = true
                this.uuid=row.id;
                this.$refs.queryList.query();
            },
            childShowFun() {
                this.dialogVisible = false

            },


            queryAll(condition) {
                this.loading = true
                let formInitData = {}
                if (condition === undefined) { // 条件查询
                    sessionStorage.setItem('formInit', JSON.stringify(this.filters))
                    this.filters.page = 1
                    this.filters.limit = this.pager.rows
                    formInitData = this.filters
                } else { // 分页查询
                    let formInit = JSON.parse(sessionStorage.getItem('formInit'))
                    if (JSON.stringify(formInit) !== '{}') {
                        formInitData = formInit
                    }
                    formInitData.page = this.pager.page
                    formInitData.limit = this.pager.rows
                }
                // 请求数据
                formInitData.startDate = formInitData.czrq[0]
                formInitData.endDate = formInitData.czrq[1]
                getCzrzPageList(formInitData).then(res => {
                    this.pager.page = formInitData.page
                    this.pager.total = res.data.data.total
                    this.tableData = res.data.data.content

                    this.loading = false
                }).catch(res => {
                    this.loading = false
                })

            },
            download () {
                this.loading = true
                let formInitData = {}
                formInitData.startDate = this.filters.czrq[0];
                formInitData.endDate = this.filters.czrq[1];
                formInitData.czydm = this.filters.czydm;
                getCzrzPageListAll(formInitData).then( res => {
                    console.log(res);
                    this.loading = false;
                    let tableData = res.data.data;
                    // todo 日志下载
                    var wopts = {
                        bookType: 'xlsx',
                        bookSST: false,
                        type: 'array'
                    };
                    var workBook = {
                        SheetNames: ['Sheet1'],
                        Sheets: {},
                        Props: {}
                    };
                    const headerDisplay = {czy:"操作员", czydm:"操作员代码", czsx:"操作事项",czrq: '操作日期', czsj: '操作时间', bz: '标志', kbmc: '科别'};

//将表头放到原始数据里面去，要保证表头在数组的最前面
                    const newData = [headerDisplay, ...tableData];
                    console.log(newData);
                    /* 从表生成工作簿对象 */
                    workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(newData, { skipHeader:true});
                    /* 获取二进制字符串作为输出 */
                    var wbout = XLSX.write(workBook, wopts);
                    try {
                        FileSaver.saveAs(
                            //Blob 对象表示一个不可变、原始数据的类文件对象。
                            //Blob 表示的不一定是JavaScript原生格式的数据。
                            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                            new Blob([wbout], { type: "application/octet-stream" }),
                            //设置导出文件名称
                            "操作日志.xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }

                }, err => {
                    this.loading = false;
                })

            }
        }

    }
</script>
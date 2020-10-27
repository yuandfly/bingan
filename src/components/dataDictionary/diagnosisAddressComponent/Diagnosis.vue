<!--诊断地址等-->
<template slot-scope="props">
    <section class="diagnosis">
        <el-form :inline="true" :model="form" class="demo-form-inline" size="medium"  >
            <div style="padding: 20px;">
                <el-table
                        class="table"
                        :data="tableData"
                        default-expand-all
                        row-key="id"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                        border
                        >
                    <el-table-column prop="dm" label="项目代码">
                    </el-table-column>
                    <el-table-column prop="dmmc" label="项目名称">
                        <template slot-scope="scope">
                            <el-input
                                    :ref="'dmmc'+scope.$index"
                                    @keydown.native.13="focus('icd9',scope.$index)"
                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                                    @keydown.native.39="moveRight('icd9',scope.$index)"
                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                                    v-model.trim="scope.row.dmmc"
                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                                    size="small"
                                    placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
<!--                    <el-table-column prop="icd9" label="ICD-9">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-input-->
<!--                                    :ref="'icd9'+scope.$index"-->
<!--                                    @keydown.native.13="focus('icd10',scope.$index)"-->
<!--                                    @keydown.native.37="moveLeft('dmmc',scope.$index)"-->
<!--                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"-->
<!--                                    @keydown.native.39="moveRight('icd10',scope.$index)"-->
<!--                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"-->
<!--                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"-->
<!--                                    v-model="scope.row.icd9"-->
<!--                                    size="small"-->
<!--                            ></el-input>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="icd10" label="ICD-10">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-input-->
<!--                                    :ref="'icd10'+scope.$index"-->
<!--                                    @keydown.native.13="focus('tjm',scope.$index)"-->
<!--                                    @keydown.native.37="moveLeft('icd9',scope.$index)"-->
<!--                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"-->
<!--                                    @keydown.native.39="moveRight('tjm',scope.$index)"-->
<!--                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"-->
<!--                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"-->
<!--                                    v-model="scope.row.icd10"-->
<!--                                    size="small"-->
<!--                            ></el-input>-->
<!--                        </template>-->
<!--                    </el-table-column>-->



<!--                    <el-table-column prop="tjm" label="统计码（ICD-9）">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-input-->
<!--                                    :ref="'tjm'+scope.$index"-->
<!--                                    @keydown.native.13="focus('tjm1',scope.$index)"-->
<!--                                    @keydown.native.37="moveLeft('icd10',scope.$index)"-->
<!--                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"-->
<!--                                    @keydown.native.39="moveRight('tjm1',scope.$index)"-->
<!--                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"-->
<!--                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"-->
<!--                                    v-model="scope.row.tjm"-->
<!--                                    size="small"-->
<!--                            ></el-input>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
<!--                    <el-table-column prop="tjm1" label="统计码（ICD-10）">-->
<!--                        <template slot-scope="scope">-->
<!--                            <el-input-->
<!--                                    :ref="'tjm1'+scope.$index"-->
<!--                                    @keydown.native.13="focus('pym',scope.$index)"-->
<!--                                    @keydown.native.37="moveLeft('tjm',scope.$index)"-->
<!--                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"-->
<!--                                    @keydown.native.39="moveRight('pym',scope.$index)"-->
<!--                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"-->
<!--                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"-->
<!--                                    size="small"-->
<!--                                    v-model="scope.row.tjm1"-->
<!--                            ></el-input>-->
<!--                        </template>-->
<!--                    </el-table-column>-->
                    <el-table-column prop="pym" label="拼音码">
                        <template slot-scope="scope">
                            <el-input
                                    :ref="'pym'+scope.$index"
                                    @keydown.native.13="focus('wbm',scope.$index)"
                                    @keydown.native.37="moveLeft('tjm1',scope.$index)"
                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                                    @keydown.native.39="moveRight('wbm',scope.$index)"
                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                                    v-model.trim="scope.row.pym"
                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                                    size="small"
                                    placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="wbm" label="五笔码">
                        <template slot-scope="scope">
                            <el-input
                                    :ref="'wbm'+scope.$index"
                                    @keydown.native.13="focus('ybm',scope.$index)"
                                    @keydown.native.37="moveLeft('pym',scope.$index)"
                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                                    @keydown.native.39="moveRight('ybm',scope.$index)"
                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                                    v-model.trim="scope.row.wbm"
                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                                    size="small"
                                    placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ybm" label="YB码">
                        <template slot-scope="scope">
                            <el-input
                                    :ref="'ybm'+scope.$index"
                                    @keydown.native.13="focus('dmmc',scope.$index)"
                                    @keydown.native.37="moveLeft('wbm',scope.$index)"
                                    @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                                    @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                                    v-model.trim="scope.row.ybm"
                                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                                    size="small"
                                    placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                  <el-table-column prop="bz" label="是否停用">
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.bz"
                                active-value="0"
                                inactive-value="1"
                                active-text="启"
                                inactive-text="停"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                        ></el-switch>
                    </template>
                </el-table-column>
                    <el-table-column label="操作" width="220">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="update(scope.row)" type="primary">修改</el-button>
                            <el-button type="primary" v-if="scope.row.level === 0" size="mini" @click="addMedical(scope.row)">新增</el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div style="padding: 20px;text-align: center;" v-if="total">
                    <el-pagination style="float:right;"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="total"
                                   :current-page.sync="nowPage"
                                   :page-size="pageSizes"
                                   @current-change="onChangePage"
                                   :background="true">
                    </el-pagination>
                </div>
            </div>
        </el-form>
        <DiagnosisBox ref="child"  @fun="queryAll"></DiagnosisBox>
    </section>
</template>

<script>
    import {
        GetDiagnosis,
        UpdateDiagnosis,
        DeleteDiagnosis,
    } from "@/api";
    import DiagnosisBox from './diagnosisBox';
    import KeyControll from '../config/index';
    export default {
        components: {
            DiagnosisBox,
        },
        data() {
            return {
                KeyControll: KeyControll,
                pageSizes: 10,
                nowPage: 1,
                total: 0,
                show1: false,
                index: 0,
                currentItem: undefined,
                restaurants: [],
                form: this.filter,

                tableData: [],
            };
        },
        props: ["filter"],
        methods: {
            openBox() {
                this.$refs['child'].openBox();
            },
            queryAll(condition) {
                let getItem = new Function();
                this.form.limit = this.pageSizes;
                this.form.page = this.nowPage;
                console.log(this.Keshi);

                GetDiagnosis(this.form).then(res => {
                    if (res.data.code === 0) {
                        if (res.data.data.content) {
                            this.tableData = res.data.data.content;
                            this.total = res.data.data.total;
                        } else {
                            this.tableData = res.data.data;
                            this.total = undefined;
                        }

                    }
                })

            },
            fatherMethod(res, index) {
                this.tableData[index].kmdm = res.dm;
                this.tableData[index].kmmc = res.dmmc;
                this.show1 = false;
            },
            handleDelete(row) {
                this.$confirm("确认删除吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        DeleteDiagnosis(row).then((res) => {
                            console.log(res);
                            if (res.data.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!",
                                });
                                this.queryAll();
                            } else {
                                this.$message({
                                    type: "error",
                                    message: "删除失败！",
                                });
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            },
            addMedical() {
                this.$refs.child.openBox();
            },
            onChangePage(val) {
                this.nowPage = val;
                this.queryAll();
            },
            KeshiChange(ev) {
                console.log(ev);
                this.Keshi = ev;
                this.queryAll();
            },

            update(row) {
                this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        if (row.dmmc.trim() === '') {
                            this.$message.error('项目名称不能为空');
                            return;
                        }
                        UpdateDiagnosis(row).then((res) => {
                            if (res.data.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "修改成功!",
                                });
                            } else {
                                this.$message({
                                    type: "error",
                                    message: "修改失败请联系管理员!",
                                });
                            }
                            this.queryAll();
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消修改",
                        });
                        this.queryAll();
                    });
            },
            // 打开代码录入
            handleOpenDictInput(item, type, index) {
                const { name, dictType, dictField, range } = item;
                this.dictInputDialog = {
                    visible: true,
                    dictType: type,
                    currentOpener: { name, dictField },
                };
                this.index = index;
                this.currentItem = item;
            },
            // 代码录入提交
            handleDictInputSubmit(row) {
                this.currentItem.tjgk = row.dm;
                this.$set(this.currentItem, 'tjgkName', row.dmmc );
                console.log(row, this.currentItem)

            },
            // f4 清除科别的选择
            clearDictInputValue(type) {
                this.currentItem.tjgk = "";
                this.currentItem.tjgkName = "";
            },

            // 键盘操作
            // 键盘操作
            focus(str, n) {
                let name = "";
                name = str + n;
                this.$refs[name].focus();
            },
            moveRight(str, n) {
                console.log(str, n);
                let name = "";
                name = str + n;
                console.log(this.$refs[name]);
                this.$refs[name].focus();
            },
            moveLeft(str, n) {
                let name = "";
                name = str + n;
                console.log(name, this.$refs[name]);
                this.$refs[name].focus();
            },
            moveUp(str, n) {
                let name = "";
                console.log(str, n);
                if (n !== 0) {
                    if (this.$refs[str + (n - 1)].disabled === true) {
                        this.moveUp(str, n - 1);
                    } else {
                        name = str + (n - 1);
                        this.$refs[name].focus();
                    }
                }


            },
            moveDown(str, n) {
                let name = "";
                if (n < this.tableData.length - 1) {
                    if (this.$refs[str + (n + 1)].disabled === true) {
                        this.moveDown(str, n + 1);
                    } else {
                        name = str + (n + 1);
                        this.$refs[name].focus();
                    }
                }
            },
            // 键盘操作 end

        },
        mounted() {
            this.queryAll();
        },


    };
</script>

<style lang="less" scoped>
    .table {
        /deep/ .el-input__inner:focus {
            background: #409EFF;
            color: #ffffff;
            border-top-color: #409EFF;
        }
    }
    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dict_lan {
        display: flex;
        padding: 10px 20px;
        background-color: #eee;
    }
</style>

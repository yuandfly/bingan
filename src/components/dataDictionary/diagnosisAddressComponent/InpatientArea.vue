<!--住院病区设置等-->
<template slot-scope="props">
    <section>
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
                    <el-table-column prop="dmmc" label="病区名称">
                        <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.dmmc" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="kbxh" label="序号">
                        <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.kbxh" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cws" label="床位数">
                        <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.cws" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="pym" label="拼音码">
                        <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.pym" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="wbm" label="五笔码">
                        <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.wbm" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small" placeholder="请输入"></el-input>
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
        <InpatientAreaBox ref="child"  @fun="queryAll"></InpatientAreaBox>
    </section>
</template>

<script>
    import {

        GetInpatientArea,
        UpdateInpatientArea,
        DeleteInpatientArea,
    } from "@/api";
    import InpatientAreaBox from './InpatientAreaBox';
    export default {
        components: {
            InpatientAreaBox,
        },
        data() {
            return {
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

                GetInpatientArea(this.form).then(res => {
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
                        DeleteInpatientArea(row).then((res) => {
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
                        UpdateInpatientArea(row).then((res) => {
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

<template>
    <el-container style=" border: 1px solid #eee;">
        <el-aside width="320px" style="height:100%;border-right: 1px solid #eee;padding: 15px;">
            <el-card class="" >
                <div slot="header" class="clearfix">
                    <span style="float:left;">货架信息</span>
                    <span style="float:right;">
                        <el-button type="text" style="padding:0;" @click="handleAddShelf(1)">新增</el-button>
                    </span>
                </div>
                <div class="text item">
                    <div >
                        <el-table
                                :data="shelfInfoData"
                                stripe
                                border
                                @row-click="showShelfInfo"
                                :header-cell-style="{
                                'background-color': '#0393d7',
                                'color': '#fff',
                                'font-weight': 'bold'
                            }"
                                style="width: 100%">
                            <el-table-column prop="bas200" label="编号" width="53"></el-table-column>
                            <el-table-column prop="bas202" width="53" label="位置"></el-table-column>
                            <el-table-column prop="bas204" width="55" label="容量"></el-table-column>
                            <el-table-column
                                    width="85"
                                    label="操作">
                                <template slot-scope="scope">
                                    <el-button type="text" style="color: orangered;font-size: 12px;" @click="handleRemoveShelf(scope.row)">删除</el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>

            <el-card class="" style="margin-top:5px;" v-if="shelfInfoDetail[0].value">
                <div slot="header" class="clearfix">
                    <span style="float:left;">【{{shelfInfoDetail[0].value}}】详情</span>
                    <span style="float:right;">
                        <el-button type="text" style="padding:0;" @click="handleEditShelfGrid(1)">修改</el-button>
                    </span>

                </div>
                <div class="text item">
                    <div >
                        <el-table
                                :data="shelfInfoDetail"
                                stripe
                                border
                                :header-cell-style="{
                                'background-color': '#0393d7',
                                'color': '#fff',
                                'font-weight': 'bold'
                            }"
                                style="width: 100%">
                            <el-table-column
                                    prop="key"
                                    label="类型"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="value"
                                    label="值"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </el-card>
        </el-aside>
        <el-container style="height: 100%;padding:20px;">
            <div style="width: 100%;display: flex; flex-wrap: wrap">
                <el-card class="box-card" style="width: 48%;" >
                    <div slot="header" class="clearfix">
                        <span style="float:left;">货架1</span>
                        <span style="float:right;">
                             <el-button type="text" style=" padding: 0;"  @click="handleAddShelfGrid(1)">新增</el-button>
                         </span>
                    </div>
                    <div class="text item">
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-card class="item-card item-card-active" shadow="hover"  >
                                    <span>
                                        <i class="el-icon-edit-outline" @click="handleEditShelfGrid(1)"></i>
                                        <i class="el-icon-close" @click="handleRemoveShelfGrid(1)"></i>
                                    </span>
                                    <div >
                                        1-1
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        1-2
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        1-3
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        1-4
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        2-1
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        2-2
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        2-3
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        2-4
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <el-card class="box-card" style="width: 48%;" >
                    <div slot="header" class="clearfix">
                        <span style="float:left;">货架2</span>
                        <span style="float:right;">
                        <el-button type="text" style="padding:0;">新增</el-button>
                    </span>
                    </div>
                    <div class="text item">
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        1-1
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        1-2
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        1-3
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        1-4
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
                <el-card class="box-card" style="width: 48%;" >
                    <div slot="header" class="clearfix">
                        <span style="float:left;">货架3</span>
                        <span style="float:right;">
                        <el-button type="text" style="padding:0;">新增</el-button>
                    </span>
                    </div>
                    <div class="text item">
                        <el-row :gutter="6">
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        1-1
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        1-2
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        1-3
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        1-4
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row> <el-row :gutter="6">
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover"  >
                                    <div >
                                        2-1
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="6">
                                <el-card class="item-card" shadow="hover" >
                                    <div >
                                        2-2
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </el-container>

        <el-dialog :visible="addShelfGridVisible" @close="cancelShelfGrid" width="500px">
            <el-form label-width="100px">
                <el-form-item label="层级" >
                    <el-input v-model="shelfGridForm.bas301" size="small"></el-input>
                </el-form-item>
                <el-form-item label="格子编号">
                    <el-input v-model="shelfGridForm.bas302" size="small"></el-input>
                </el-form-item>
                <el-form-item label="每格总容量">
                    <el-input v-model="shelfGridForm.bas304" size="small"></el-input>
                </el-form-item>
                <el-form-item label="每格剩余容量">
                    <el-input v-model="shelfGridForm.bas305" size="small"></el-input>
                </el-form-item>
            </el-form>
            <el-footer style="text-align:right;height: 40px;padding: 0;">
                <el-button size="small" @click="cancelShelfGrid">取 消</el-button>
                <el-button size="small" type="primary" @click="AddShelf">确 定</el-button>
            </el-footer>
        </el-dialog>
        <el-dialog :visible="editShelfGridVisible" @close="cancelEditShelf" width="500px">
            <el-form label-width="100px">
                <el-form-item label="货架编号" >
                    <el-input v-model="editShelfForm.bas200" size="small"></el-input>
                </el-form-item>
                <el-form-item label="货架管理员">
                    <el-input v-model="editShelfForm.bas201" size="small"></el-input>
                </el-form-item>
                <el-form-item label="货架位置">
                    <el-input v-model="editShelfForm.bas202" size="small"></el-input>
                </el-form-item>
                <el-form-item label="病区">
                    <el-input v-model="editShelfForm.bas203" size="small"></el-input>
                </el-form-item>
                <el-form-item label="容量">
                    <el-input v-model="editShelfForm.bas204" size="small"></el-input>
                </el-form-item>
            </el-form>
            <el-footer style="text-align:right;height: 40px;padding: 0;">
                <el-button size="small" @click="cancelEditShelf">取 消</el-button>
                <el-button size="small" type="primary" @click="EditShelf">确 定</el-button>
            </el-footer>
        </el-dialog>
        <el-dialog :visible="addShelfVisible" @close="cancelShelf" width="500px">
            <el-form label-width="100px">
                <el-form-item label="货架编号" >
                    <el-input v-model="shelfForm.bas200" size="small"></el-input>
                </el-form-item>
                <el-form-item label="货架管理员">
                    <el-input v-model="shelfForm.bas201" size="small"></el-input>
                </el-form-item>
                <el-form-item label="货架位置">
                    <el-input v-model="shelfForm.bas202" size="small"></el-input>
                </el-form-item>
                <el-form-item label="病区">
                    <el-input v-model="shelfForm.bas203" size="small"></el-input>
                </el-form-item>
                <el-form-item label="容量">
                    <el-input v-model="shelfForm.bas204" size="small"></el-input>
                </el-form-item>
            </el-form>
            <el-footer style="text-align:right;height: 40px;padding: 0;">
                <el-button size="small" @click="cancelShelf">取 消</el-button>
                <el-button size="small" type="primary" @click="AddShelf">确 定</el-button>
            </el-footer>
        </el-dialog>
    </el-container>
</template>

<script>
    import {insertData, updateData, bas2PageList, deleteCellById, getCellList, insertCell, updateCell} from '@/api/shelf';
    import {deleteById} from '../../api/shelf';
    export default {
        name: 'sheIfList',
        data () {
            return {
                shelfInfoData: [],
                shelfInfoRow: {},
                shelfInfoDetail: [
                    {id: 1, key: "货架编号", value: '' },
                    {id: 2, key: "货架管理员", value: '' },
                    {id: 3, key: "货架位置", value: '' },
                    {id: 4, key: "病区", value: '' },
                    {id: 5, key: "容量", value: '' },
                ],
                shelfForm: {
                    bas200: undefined, // 货架编号
                    bas201: undefined, // 货架管理员
                    bas202: undefined, // 货架位置
                    bas203: undefined, // 病区
                    bas204: undefined, // 容量
                },
                editShelfForm: {
                    bas200: undefined, // 货架编号
                    bas201: undefined, // 货架管理员
                    bas202: undefined, // 货架位置
                    bas203: undefined, // 病区
                    bas204: undefined, // 容量
                },
                shelfGridForm: {
                    "bas201": undefined, // 货架编号
                    "bas300": undefined, // 自增id
                    "bas301": undefined, // 层级
                    "bas302": undefined, // 格子编号
                    "bas304": undefined, // 每格总容量
                    "bas305": undefined // 每格剩余容量
                },
                addShelfGridVisible: false,
                editShelfGridVisible: false,
                addShelfVisible: false,
                limit: 10,
                page: 1
            }
        },
        methods: {
            handleRemoveShelfGrid (row) {
                this.$confirm(`确定删除吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteCellById(row.bas300).then( res => {
                        if (res.code === 0) {
                            this.$message.success('删除货架格子成功');
                        } else {
                            this.$message.error('删除货架格子失败');
                        }
                        this.getShelfList();
                    });
                });
            },
            handleAddShelfGrid (row) {
                this.addShelfGridVisible = true;
                console.log(row);
            },
            handleEditShelfGrid (row) {
                this.shelfInfoRow = row
                this.editShelfGridVisible = true;
                console.log(row);
            },
            handleAddShelf (row) {
                this.addShelfVisible = true;
                console.log(row);
            },
            handleRemoveShelf(row) {
                this.$confirm(`确定删除吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(row);
                    deleteById(row.bas200).then( res => {
                        if (res.code === 0) {
                            this.$message.success('删除货架成功');
                        } else {
                            this.$message.error('删除货架失败');
                        }
                        this.getShelfList();
                    });
                });
            },
            // 点击货架 显示详细信息
            showShelfInfo (row) {
                console.log(row);
                this.shelfInfoRow = row;
                this.shelfInfoDetail[0].value = row.bas200;
                this.shelfInfoDetail[1].value = row.bas201;
                this.shelfInfoDetail[2].value = row.bas202;
                this.shelfInfoDetail[3].value = row.bas203;
                this.shelfInfoDetail[4].value = row.bas204;
            },
            getShelfList () {
                bas2PageList({limit: this.limit, page: this.page}).then( res => {
                    if (res.code === 0) {
                        if (res.data) {
                            this.shelfInfoData = res.data.content;
                        }
                    } else {
                        this.$message.error('查询失败');
                    }
                });
            },

            // 新增货架
            AddShelf () {

                if (this.validateShelf(this.shelfForm)) {
                    return;
                }
                insertData(this.shelfForm).then( res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.$message.success('新增货架成功');
                        this.getShelfList();
                        this.cancelShelf();
                    } else {
                        this.$message.error('新增货架失败');
                    }
                })
            },
            // 修改货架
            EditShelf () {

                if (this.validateShelf(this.editShelfForm)) {
                    return;
                }
                updateData(this.editShelfForm).then( res => {
                    console.log(res);
                })
            },

            // 新增货架格子
            AddShelfGrid () {

                insertCell(this.shelfGridForm).then( res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.$message.success('新增货架格子成功');
                        this.getShelfList();
                        this.cancelShelf();
                    } else {
                        this.$message.error('新增货架格子失败');
                    }
                })
            },
            validateShelf (form) {
                if (!form.bas200) {
                    this.$message.error('请输入货架编号');
                    return true;
                }

                if (!form.bas201) {
                    this.$message.error('请输入货架管理员');
                    return true;
                }
                if (!form.bas202) {
                    this.$message.error('请输入货架位置');
                    return true;
                }
                if (!form.bas203) {
                    this.$message.error('请输入病区');
                    return true;
                }
                if (!form.bas204) {
                    this.$message.error('请输入容量');
                    return true;
                }
                return false;
            },

            // 退出清空 新增货架表单
            cancelShelf () {
                this.shelfForm = {
                        bas200: undefined, // 货架编号
                        bas201: undefined, // 货架管理员
                        bas202: undefined, // 货架位置
                        bas203: undefined, // 病区
                        bas204: undefined, // 容量
                }
                this.addShelfVisible = false;
            },
            // 退出清空 修改货架表单
            cancelEditShelf () {
                this.editShelfForm = {
                        bas200: undefined, // 货架编号
                        bas201: undefined, // 货架管理员
                        bas202: undefined, // 货架位置
                        bas203: undefined, // 病区
                        bas204: undefined, // 容量
                }
                this.editShelfGridVisible = false;
            },
            // 退出清空 新增货架格子表单
            cancelShelfGrid () {
                this.shelfGridForm = {
                    "bas201": undefined, // 货架编号
                    "bas300": undefined, // 自增id
                    "bas301": undefined, // 层级
                    "bas302": undefined, // 格子编号
                    "bas304": undefined, // 每格总容量
                    "bas305": undefined // 每格剩余容量
                }
                this.addShelfGridVisible = false;
            }
        },
        mounted() {
            this.getShelfList();
        },
        watch: {
            editShelfGridVisible: (val) => {
                console.log(val);
                if (val) {
                    this.editShelfForm = JSON.parse(JSON.stringify(this.shelfInfoRow));
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .text {
        font-size: 13px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        margin:5px;
    }

    .item-card {
        background: rgb(2, 93, 136);
        color: white;
        margin-bottom: 3px;
        cursor: pointer;
        position: relative;
        .el-icon-close {
            position: absolute;right: 5px;top: 5px;
        }
        .el-icon-edit-outline {
            position: absolute;right: 25px;top: 5px;
        }
    }

    .item-card-active {
        background: rgb(254, 96, 99);
    }
    /deep/ .el-table td, .el-table th {
        padding: 5px 0;
    }
</style>
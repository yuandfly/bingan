<template>
    <div>

        <div class="back-type-title">
            <el-radio @change="handleChangeType" v-model="giveBackType" label="number">按病案号归还</el-radio>
        </div>

        <el-row :gutter="16">
            <el-col :span="12">
                <div class="back-content-title">所有未归还的病案：</div>
            </el-col>
            <el-col :span="10" :offset="2">
                <div class="back-content-title">将归还的病案：</div>
            </el-col>
            <el-col :span="12">
                <div class="back-content-box" v-loading="fetchLoading">
                    <div
                        class="info-item"
                        v-for="(item, index) in backByNumber.unBackData"
                        :key="item.baza00"
                        @click="handleTransfer('number', 'right', index)"
                    >
                        {{item.baza00}}({{item.baza02}}) 借阅({{item.bafy02}} {{item.bafy04}})
                    </div>
                </div>
            </el-col>
            <el-col :span="2" class="center-btn-box">
                <div>
                    <el-button
                        @click="handleTransfer('number', 'right')"
                        plain size="mini" icon="el-icon-d-arrow-right"
                        :disabled="giveBackType !== 'number' || !backByNumber.unBackData.length"
                    />
                </div>
                <div>
                    <el-button
                        @click="handleTransfer('number', 'left')"
                        plain size="mini" icon="el-icon-d-arrow-left"
                        :disabled="giveBackType !== 'number' || !backByNumber.willBackData.length"
                    />
                </div>
            </el-col>
            <el-col :span="10">
                <div class="back-content-box">
                    <div
                        class="info-item"
                        v-for="(item, index) in backByNumber.willBackData"
                        :key="item.baza00"
                        @click="handleTransfer('number', 'left', index)"
                    >
                        {{item.baza00}}({{item.baza02}})
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-divider style="margin: 15px 0"></el-divider>

        <div class="back-type-title">
            <el-radio @change="handleChangeType" v-model="giveBackType" label="person">按借阅者归还</el-radio>
            <span class="filter-item">
                <span class="filter-item-label">借阅者</span>
                <el-input :value="filter.name" @keyup.native.32="handleDictInputOpen" size="mini" style="width: 200px"></el-input>
            </span>
            <span class="filter-item">
                <span class="filter-item-label">所在科别</span>
                <el-input disabled :value="filter.department" size="mini" style="width: 200px"></el-input>
            </span>
        </div>

        <el-row :gutter="16">
            <el-col :span="12">
                <div class="back-content-title">所有未归还的病案：</div>
            </el-col>
            <el-col :span="10" :offset="2">
                <div class="back-content-title">将归还的病案：</div>
            </el-col>
            <el-col :span="12">
                <div class="back-content-box" v-loading="fetchLoading">
                    <div
                        class="info-item"
                        v-for="(item, index) in backByPerson.unBackData"
                        :key="item.baza00"
                        @click="handleTransfer('person', 'right', index)"
                    >
                        {{item.baza00}}({{item.baza02}}) 借阅({{item.bafy02}} {{item.bafy04}})
                    </div>
                </div>
            </el-col>
            <el-col :span="2" class="center-btn-box">
                <div>
                    <el-button
                        @click="handleTransfer('person', 'right')"
                        plain size="mini" icon="el-icon-d-arrow-right"
                        :disabled="giveBackType !== 'person' || !backByPerson.unBackData.length"
                    />
                </div>
                <div>
                    <el-button
                        @click="handleTransfer('person', 'left')"
                        plain size="mini" icon="el-icon-d-arrow-left"
                        :disabled="giveBackType !== 'person' || !backByPerson.willBackData.length"
                    />
                </div>
            </el-col>
            <el-col :span="10">
                <div class="back-content-box">
                    <div
                        class="info-item"
                        v-for="(item, index) in backByPerson.willBackData"
                        :key="item.baza00"
                        @click="handleTransfer('person', 'left', index)"
                    >
                        {{item.baza00}}({{item.baza02}})
                    </div>
                </div>
            </el-col>
        </el-row>

        <div class="footer">
            <span class="filter-item-label">归还日期</span>
            <el-date-picker :clearable="false" v-model="giveBackDate" value-format="yyyy-MM-dd" size="mini" style="width: 200px"></el-date-picker>
            <el-button :loading="loading" size="mini" type="primary" style="margin-left: calc(50% - 266px)" @click="handleSave">保存</el-button>
        </div>

        <dict-input
            :append-to-body="false"
            :visible.sync="dictInputDialog.visible"
            :dictType="dictInputDialog.dictType"
            @submit="handleDictInputSubmit"
        />

    </div>
</template>

<script>
    import {formatDate} from '../../utils';
    import DictInput from '../../components/dialog/dict-input.vue';
    import {searchUnBackBorrowRecords, giveBack} from '../../api/borrowManager';
    export default {
        name: "giveback", // 归还
        components: {DictInput},
        data() {
            return {
                fetchLoading: false,
                loading: false,
                giveBackType: 'number',
                filter: {},
                giveBackDate: formatDate(new Date(), 'YYYY-MM-DD'),
                backByNumber: {
                    unBackData: [],
                    willBackData: []
                },
                backByPerson: {
                    unBackData: [],
                    willBackData: []
                },
                dictInputDialog: {
                    visible: false,
                    dictType: 'doctorDict'
                }
            }
        },

        mounted() {
          this.getUnBackBorrowRecord()
        },
        methods: {

            handleChangeType(backType) {
                // data里的类型名称
                const preTypeName = backType === 'number' ? 'backByPerson' : 'backByNumber';
                this[preTypeName] = {unBackData: [], willBackData: []};
                if (backType === 'number') {
                    this.filter = {};
                    this.getUnBackBorrowRecord()
                }
            },

            // 获取未归还病案
            getUnBackBorrowRecord(dm) {
                const bafy03 = dm || (this.giveBackType === 'person' ? this.filter.bafy03 : undefined);
                this.fetchLoading = true;
                searchUnBackBorrowRecords(bafy03).then(res => {
                    if (res && res.data) {
                        const typeName = this.giveBackType === 'person' ? 'backByPerson' : 'backByNumber';
                        this[typeName].unBackData = res.data;
                        this[typeName].willBackData = []
                    } else {
                        this.$message.error(res && res.msg ? res.msg : '获取病案失败')
                    }
                }).catch(() => {
                    this.$message.error('获取病案错误')
                }).finally(() => {
                    this.fetchLoading = false
                })
            },

            // 穿梭数据
            handleTransfer(backType, direction, index) {
                // 如果点击的是某方式中的一项，但当前归还方式是另一种，取消转移
                if (index >= 0 && this.giveBackType !== backType) return false;
                // data里的类型名称
                const typeName = backType === 'number' ? 'backByNumber' : 'backByPerson';
                // 源列表名称
                const originName = direction === 'right' ? 'unBackData' : 'willBackData';
                // 目标列表名称
                const targetName = direction === 'right' ? 'willBackData' : 'unBackData';
                // 需要转移的项目, 一项或者全部
                const transferData = index >= 0 ? [this[typeName][originName][index]] : this[typeName][targetName].concat(this[typeName][originName]);
                // 是点击某项，需转移一个
                if (index >= 0) {
                    this[typeName][targetName] = this[typeName][targetName].concat(transferData);
                    this[typeName][originName].splice(index, 1)
                } else { // 全部转移
                    this[typeName][targetName] = transferData.slice();
                    this[typeName][originName] = []
                }
            },

            handleDictInputOpen() {
                this.dictInputDialog.visible = true
            },

            handleDictInputSubmit(dictItem) {
                this.filter = {
                    bafy03: dictItem.dm,
                    name: dictItem.dmmc,
                    department: dictItem.ksmc
                };
                this.getUnBackBorrowRecord(dictItem.dm)
            },

            handleSave() {
                const typeName = this.giveBackType === 'number' ? 'backByNumber' : 'backByPerson';
                const targetData = this[typeName].willBackData;
                if (targetData.length) {
                    this.loading = true;
                    const params = targetData.map(item => ({
                        ...item,
                        bafy05: this.giveBackDate // 归还日期
                    }));
                    giveBack(params).then(res => {
                        if (res && res.code === 0) {
                            this.$message.success('归还成功');
                            this.getUnBackBorrowRecord()
                        } else {
                            this.$message.error(res && res.msg ? res.msg : '归还失败')
                        }
                    }).catch(err => {
                        this.$message.error('归还错误')
                    }).finally(() => {
                        this.loading = false
                    })
                } else {
                    this.$message.error('未选择需要归还的病案')
                }
            },
        }
    }
</script>

<style scoped lang="less">
    .back-type-title {
        margin-bottom: 10px;
    }
    .filter-item {
        margin-left: 20px;
    }
    .filter-item-label {
        padding-right: 10px;
        font-size: 14px;
        color: #333;
    }
    .back-content-title {
        margin-bottom: 5px;
        padding-left: 10px;
        font-size: 14px;
        color: #333;
    }
    .center-btn-box {
        text-align: center;
        line-height: 50px;
        padding: 50px 0;
    }
    .back-content-box {
        height: 200px;
        border: 1px solid #e0e0e0; // EBEEF5
        border-radius: 5px;
        padding: 10px;
        overflow-y: auto;
    }
    .info-item {
        line-height: 20px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
            background: #e0e0e0;
        }
    }
    .footer {
        /*text-align: center;*/
        margin-top: 10px;
    }

    /deep/ .el-input__inner:focus {
        background: #409EFF;
        color: #ffffff;
        border-top-color: #409EFF;
    }
</style>

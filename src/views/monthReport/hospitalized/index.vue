<template>
    <div class="page-outpatient-report">
        <el-card shadow="never" body-style="padding: 0">
            <div class="topside">
                <span class="topside-item">
                    年度：
                    <el-date-picker
                            ref="years"
                            value-format="yyyy"
                            v-model="topForm.tjm7rq"
                            type="year"
                            size="mini"
                            @change="handleSearch"
                            :picker-options="{disabledDate: disabledYears}"
                            @keydown.native.13="handleFocusNextOfTop('years', 'months')"
                    />
                </span>
                <span class="topside-item">
                    时间范围：
                    <el-input
                            style="width: 200px; display: inline-block"
                            ref="months"
                            id="months"
                            size="mini"
                            :value="topForm.monthName"
                            @keyup.native.32="openDict($event, 'DateRangeDict', 'month,monthName')"
                            @keydown.native.13="handleFocusNextOfTop('months', 'kebieName')"
                    />
<!--                    <el-select-->
<!--                            ref="months"-->
<!--                            id="months"-->
<!--                            value-format="mm"-->
<!--                            v-model="topForm.month"-->
<!--                            type="month"-->
<!--                            size="mini"-->
<!--                            @keydown.native.13="handleFocusNextOfTop('months', 'kebieName')"-->
<!--                    >-->
<!--                        <el-option v-for="(item, index) in months" :key="item" :value="index + 1" :label="item">{{item}}</el-option>-->
<!--                    </el-select>-->
                </span>
                <span class="topside-item">
                    科别名称：
                    <el-input
                            style="width: 200px; display: inline-block"
                            ref="kebieName"
                            id="kebieName"
                            size="mini"
                            :value="topForm.tjm7mc"
                            @change="handleSearch"
                            @keyup.native.32="openDict($event, 'departmentDict', 'tjm7kb,tjm7mc')"
                    />
                </span>
            </div>
            <div class="btnside">
<!--                <el-button size="mini" type="primary" :loading="loading" @click="handleSearch">查询</el-button>-->
                <el-button size="small" type="primary" :loading="loading" @click="handleCreatFromKu">由库生成</el-button>
                <el-button size="small" type="primary" :loading="loading" @click="handleSumbit">保存</el-button>
                <el-button size="small" type="primary" :loading="loading" @click="handleCancel">放弃存盘</el-button>
            </div>
            <div class="contentside" v-loading="loading">
                <el-tabs v-model="activePageIndexStr" type="card" v-if="fieldsPager.pageNum > 0">
                    <el-tab-pane v-for="(page, pageIndex) in fieldsPager.pageNum" :label="`第${page}页`" :name="pageIndex.toString()">
                        <el-row :gutter="32">
                            <el-col v-for="(column, columnIndex) in fieldsPager.columns" :span="24 / fieldsPager.columns">
                                <num-input-item
                                        v-for="(field, fieldIndex) in contentFields[pageIndex][columnIndex]"
                                        :key="field.name"
                                        :value.sync="contentForm[field.name]"
                                        :item="field"
                                        :itemMarginBottom="6"
                                        :labelWidth="210"
                                        @focusNext="handleFocusNextOfContent(1, fieldIndex, columnIndex, pageIndex)"
                                        @focusLeft="handleFocusNextOfContent(2, fieldIndex, columnIndex, pageIndex)"
                                        @focusUp="handleFocusNextOfContent(3, fieldIndex, columnIndex, pageIndex)"
                                        @focusRight="handleFocusNextOfContent(4, fieldIndex, columnIndex, pageIndex)"
                                        @focusDown="handleFocusNextOfContent(5, fieldIndex, columnIndex, pageIndex)"
                                />
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-card>

        <dict-input
                :visible.sync="dictInputDialog.visible"
                :dictType="dictInputDialog.dictType"
                :extraParams="dictInputDialog.extraParams"
                @submit="this.handleDictInputSubmit"
        />

    </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
    .page-outpatient-report {
        padding: 10px;
        font-size: 14px;
    }
    .topside {
        margin: 0 auto;
        padding: 10px;
        border-bottom: 1px solid #EBEEF5;
        overflow: hidden;
        color: #606266;
        display: flex;
        justify-content: center;
        .topside-item {
            margin: 0 10px;
        }
    }
    .btnside {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 10px;
        overflow: hidden;
    }
    .contentside {
        padding: 10px;
        border-top: 1px solid #EBEEF5;
        /deep/ .el-tabs__item {
            height: 30px;
            line-height: 30px;
        }
    }
    /deep/ .el-input__inner:focus {
        background: #409EFF;
        color: #ffffff;
        border-top-color: #409EFF;
    }
</style>

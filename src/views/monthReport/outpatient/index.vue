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
                            @keydown.native.13="handleFocusNextOfTop('months', 'days')"
                    />
<!--                    <el-select-->
<!--                            ref="months"-->
<!--                            id="months"-->
<!--                            value-format="mm"-->
<!--                            v-model="topForm.month"-->
<!--                            type="month"-->
<!--                            size="mini"-->
<!--                            @keydown.native.13="handleFocusNextOfTop('months', 'days')"-->
<!--                    >-->
<!--                        <el-option v-for="(item, index) in months" :key="item" :value="index + 1" :label="item">{{item}}</el-option>-->
<!--                    </el-select>-->
                </span>
                <span class="topside-item">
                    期内工作日：
                    <el-input-number
                            ref="days"
                            id="days"
                            v-model="topForm.qngzr"
                            :controls="false"
                            :min="1"
                            size="mini"
                            @keydown.native.13="handleFocusNextOfTop('days', 'kebieName')"
                    />
                </span>
                <span class="topside-item">
                    科别名称：
                    <el-input
                            style="width: 200px; display: inline-block"
                            ref="kebieName"
                            id="kebieName"
                            size="mini"
                            :value="topForm.tjm7mc"
                            @keyup.native.32="openDict($event, 'departmentDict', 'tjm7kb,tjm7mc')"
                    />
                </span>
            </div>
            <div class="btnside">
<!--                <el-button size="mini" type="primary" :loading="loading" @click="handleSearch">查询</el-button>-->
                <el-button size="small" type="primary" :loading="loading" @click="handleOpenWorkDaysDialog">设置工作日</el-button>
                <el-button size="small" type="primary" :loading="loading" @click="handleCreateKu()">由库生成</el-button>
                <el-button size="small" type="primary" :loading="loading" @click="handleSumbit">存盘退出</el-button>
                <el-button size="small" type="primary" :loading="loading" @click="handleCancel">放弃存盘</el-button>
            </div>
            <div class="contentside" v-loading="loading">
                <el-row :gutter="32">
                    <el-col :span="8">
                        <num-input-item
                                v-for="(item, index) in fields.firstColumns"
                                :key="item.name"
                                :value.sync="contentForm[item.name]"
                                :item="item"
                                :itemMarginBottom="11"
                                :labelWidth="160"
                                :ref="item.name + index"
                                @focusNext="handleFocusNextOfContent(1, index, 'firstColumns')"
                                @focusLeft="handleFocusNextOfContent(2, index, 'firstColumns')"
                                @focusUp="handleFocusNextOfContent(3, index, 'firstColumns')"
                                @focusRight="handleFocusNextOfContent(4, index, 'firstColumns')"
                                @focusDown="handleFocusNextOfContent(5, index, 'firstColumns')"
                        />
                    </el-col>
                    <el-col :span="8">
                        <num-input-item
                                v-for="(item, index) in fields.secondColumns"
                                :key="item.name"
                                :value.sync="contentForm[item.name]"
                                :item="item"
                                :labelWidth="160"
                                :itemMarginBottom="8.4"
                                @focusNext="handleFocusNextOfContent(1, index, 'secondColumns')"
                                @focusLeft="handleFocusNextOfContent(2, index, 'secondColumns')"
                                @focusUp="handleFocusNextOfContent(3, index, 'secondColumns')"
                                @focusRight="handleFocusNextOfContent(4, index, 'secondColumns')"
                                @focusDown="handleFocusNextOfContent(5, index, 'secondColumns')"
                        />
                    </el-col>
                    <el-col :span="8">
                        <num-input-item
                                v-for="(item, index) in fields.thirdColumns"
                                :key="item.name"
                                :value.sync="contentForm[item.name]"
                                :item="item"
                                @focusNext="handleFocusNextOfContent(1, index, 'thirdColumns')"
                                @focusLeft="handleFocusNextOfContent(2, index, 'thirdColumns')"
                                @focusUp="handleFocusNextOfContent(3, index, 'thirdColumns')"
                                @focusRight="handleFocusNextOfContent(4, index, 'thirdColumns')"
                                @focusDown="handleFocusNextOfContent(5, index, 'thirdColumns')"
                        />
                    </el-col>
                </el-row>
            </div>
        </el-card>

        <el-dialog
                width="850px"
                class="workday-dialog"
                :visible.sync="workDaysDialog.visible"
                :close-on-click-modal="false"
                title="设置门诊期内实际工作日"
        >
            <div  v-loading="workDaysDialog.loading">
                <div v-for="(items, i) in workDaysDialog.fields">
                <span class="workday-item" v-for="(item, j) in items" :key="item.name">
                    <span class="workday-item-label">{{item.label}}</span>
                    <el-date-picker
                            v-if="item.name === 'years'"
                            style="width: 90px"
                            value-format="yyyy"
                            v-model="workDaysDialog.workDayForm[item.name]"
                            type="year"
                            size="mini"
                            :id="item.name"
                            :clearable="false"
                            @keydown.native.13="handleGetWorkDaysData"
                            @change="handleGetWorkDaysData"
                    />
                    <el-input-number
                            v-else
                            style="width: 90px"
                            v-model="workDaysDialog.workDayForm[item.name]"
                            :id="item.name"
                            :controls="false"
                            :disabled="item.disabled"
                            :max="workDaysDialog.workDayMax[item.name]"
                            size="mini"
                            @change="handleWorkDayItemChange"
                            @keydown.native.13="handleFocusNextOfWorkDay(i, j)"
                    />
                </span>
                </div>
            </div>
            <div slot="footer" style="text-align: center">
                <el-button size="small" type="primary" :loading="workDaysDialog.loading" @click="handleSaveWorkDays()">保存</el-button>
<!--                <el-button size="small" type="primary" :loading="workDaysDialog.loading" @click="handleExit">退出</el-button>-->
<!--                <el-button size="small" type="primary" :loading="workDaysDialog.loading" @click="handleSaveWorkDays(true)">存盘退出</el-button>-->
            </div>
        </el-dialog>

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
    }
    .workday-dialog {
        /deep/ .el-dialog__body {
            padding: 10px 10px 10px 20px;
        }
    }
    .workday-item {
        display: inline-block;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    .workday-item-label {
        padding-right: 5px;
        width: 62px;
        text-align: right;
        display: inline-block;
    }

    /deep/ .el-input__inner:focus {
        background: #409EFF;
        color: #ffffff;
        border-top-color: #409EFF;
    }

</style>

<template>
    <div class="homepage clearfix">
        <div class="topside">

            <el-form :model="form" :inline="true">
                <el-form-item label="住院一级科室">
                    <el-select v-model="form.daily" placeholder="请选择" size="mini" @change="selectValue">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始日期">
                    <el-date-picker
                            v-model="form.qs"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd"
                            @change="getWordDay"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="终止日期">
                    <el-date-picker
                            v-model="form.zz"
                            type="date"
                            size="small"
                            placeholder="选择日期"
                            format="yyyy年MM月dd日"
                            value-format="yyyy-MM-dd"
                            @change="getWordDay"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="期内工作日"  >
                    <el-input v-model="form.gzr" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="输出类型"  v-if="form.daily === 1 || form.daily === 4">

                    <el-select v-model="form.vBase" placeholder="请选择" size="mini">
                        <el-option key="1" label="基础数据输出" value="1"></el-option>
                        <el-option key="0" label="由月报库输出" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="几级科室输出" v-if="form.daily === 1 || form.daily === 4">
                    <el-select v-model="form.bz" placeholder="请选择" size="mini" @change="officeGrade">
                        <el-option key="22" label="按一级科室生成报表" value="22"></el-option>
                        <el-option key="21" label="按二级科室生成报表" value="21"></el-option>
                        <el-option key="23" label="按科目专业分类生成报表" value="23"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
                    <el-button class="btn" type="primary" size="small" @click="exportCheck">下载</el-button>

                    <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
                </el-form-item>
            </el-form>
        </div>
        <component :is="showCom" :dataList="this.form" ref="child"></component>
    </div>
</template>

<script>
    import { showOkMsg, formatDate, showErrorMsg, yesterday } from "@/utils/index.js";
    const outpatientWorkStatistics = () =>
        import("../../components/table/outpatientWorkStatistics");
    const outpatientWorkStatistics2 = () =>
        import("../../components/table/outpatientWorkStatistics2");
    const outpatientWorkStatistics3 = () =>
        import("../../components/table/outpatientWorkStatistics3");
    const outpatientRegistration = () =>
        import("../../components/table/outpatientRegistration");
    const hospitalizedWorkStatistics = () =>
        import("../../components/table/hospitalizedWorkStatistics");
    const hospitalizedWorkStatistics2 = () =>
        import("../../components/table/hospitalizedWorkStatistics2");
    const hospitalizedWorkStatistics3 = () =>
        import("../../components/table/hospitalizedWorkStatistics3");
    const hospitalizedStatistics = () =>
        import("../../components/table/hospitalizedStatistics");
    const outpatientComparison = () =>
        import("../../components/table/outpatientComparison");
    const hospitalizedComparison = () =>
        import("../../components/table/hospitalizedComparison");
    const organizationOperationDynamic = () =>
        import("../../components/table/organizationOperationDynamic");
    const organizationOperationLibrary = () =>
        import("../../components/table/organizationOperationLibrary");
    const inTheWork = () =>
        import("../../components/table/inTheWork");


    export default {
        data() {
            return {
                form: {
                    daily: 1,
                    qs: formatDate(new Date(), "YYYY-01-01"),
                    zz: formatDate(new Date(), "YYYY-MM-DD"),
                    gzr: "",
                    bz: "22",
                    vBase: "1",
                    kbdm: "0000",
                    xbz: "1"
                },
                showCom: "outpatientWorkStatistics",
                comList: [
                    "outpatientWorkStatistics",
                    "outpatientWorkStatistics2",
                    "outpatientWorkStatistics3",
                    "hospitalizedWorkStatistics",
                    "hospitalizedWorkStatistics2",
                    "hospitalizedWorkStatistics3",
                    "outpatientRegistration",
                    "outpatientComparison",
                    "hospitalizedComparison",
                    "hospitalizedStatistics",
                    "organizationOperationDynamic",
                    "organizationOperationLibrary",
                    "inTheWork"
                ],
                options: [
                    {
                        name: 'outpatientWorkStatistics',
                        value: 1,
                        label: "门诊工作分科统计表"
                    },
                    // {
                    //     name: 'outpatientRegistration',
                    //     value: 2,
                    //     label: "门诊挂号分科统计表"
                    // },
                    {
                        name: 'outpatientComparison',
                        value: 3,
                        label: "门诊分科同期对比报表"
                    },
                    {
                        name: 'hospitalizedWorkStatistics',
                        value: 4,
                        label: "住院工作分科统计表"
                    },
                    {
                        name: 'hospitalizedComparison',
                        value: 5,
                        label: "住院分科同期对比报表"
                    },
                    {
                        name: 'hospitalizedStatistics',
                        value: 6,
                        label: "住院工作统计报表"
                    },
                    {
                        name: 'organizationOperationDynamic',
                        value: 7,
                        label: "机构运营情况-动态生成"
                    },
                    // {
                    //     name: 'organizationOperationLibrary',
                    //     value: 8,
                    //     label: "机构运营情况-由库生成"
                    // },
                    // {
                    //     name: 'inTheWork',
                    //     value: 9,
                    //     label: "院内工作报表"
                    // }
                ],
                tableList: [],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() <= Date.now();
                    }
                }
            };
        },
        created() {
           this.getWordDay();
        },
        components: {
            outpatientWorkStatistics,
            outpatientWorkStatistics2,
            outpatientWorkStatistics3,
            outpatientRegistration,
            outpatientComparison,
            hospitalizedWorkStatistics,
            hospitalizedWorkStatistics2,
            hospitalizedWorkStatistics3,
            hospitalizedComparison,
            hospitalizedStatistics,
            organizationOperationDynamic,
            organizationOperationLibrary,
            inTheWork
        },
        watch: {
            form: {
                immediate: true,
                deep: true,
                handler(newName, oldName) {
                    this.flag = true;
                }
            }
        },
        methods: {
            printContext() {
                this.$refs.child.printContext();
            },
            exportCheck() {
                this.$refs.child.exportExcel();
            },
            beginningDate() {
                this.form.qs = yesterday();
            },
            getWordDay () {
                    //计算工作日方法：遍历这两个日期区间的每一个日期，获取他的getDay()

                    //分别获取first和last的毫秒数(时间戳)
                   let first = new Date(this.form.qs).getTime();
                   let last = new Date(this.form.zz).getTime();

                    var count = 0;
                    for (var i = first; i <= last; i += 24 * 3600 * 1000) {
                        var d = new Date(i);
                        if (d.getDay() >= 1 && d.getDay() <= 5) {
                            count++;
                        }
                    }
                    this.form.gzr = count;


            },
            selectValue(val) {
                this.options.some(ele => {
                    if (ele.value === val) {
                        this.showCom = ele.name;
                    }
                });

            },
            officeGrade(val) {
                console.log(val);
                // if (val === '22') {
                //     this.options.some(ele => {
                //         if (ele.value === this.form.daily) {
                //             this.showCom = ele.name;
                //         }
                //     });
                // } else  if (val === '21') {
                //     this.options.some(ele => {
                //         if (ele.value === this.form.daily) {
                //             this.showCom = ele.name + '2';
                //         }
                //     });
                // } else  if (val === '23') {
                //     this.options.some(ele => {
                //         if (ele.value === this.form.daily) {
                //             this.showCom = ele.name + '3';
                //         }
                //     });
                // }
            },
            inquire() {

                if (this.form['qs'] > this.form['zz']) {
                    this.$message.error('起始日期不能大于终止日期');
                    return;
                }

                if (this.form['qs'].substr(0, 4) !== this.form['zz'].substr(0, 4)) {
                    this.$message.error('不能跨年查询');
                    return;
                }

                if (!this.form['gzr']) {
                    this.$message.error('期内工作日必填');
                    return;
                }


                this.$refs.child.getTableList();
                    this.flag = false;

            },

        }
    };
</script>

<style lang="less" scoped>
    .homepage {
        width: 100%;

        .topside {
            padding-top: 10px;
            min-height: 50px;
            border-radius: 6px;
            background-color: #eee;
            .el-form {
                margin-left: 50px;
            }
            .el-date-editor.el-input,
            .el-date-editor.el-input__inner {
                width: 200px;
            }
        }
    }
    .day {
        display: flex;
        padding: 14px 0;
    }
    .lan {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
    .lan span {
        width: 100px;
        font-size: 16px;
        text-align: right;
    }
    .treatmentSelect {
        width: 220px;
    }
    .date {
        margin-top: 20px;
    }
    .btn_lan {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
</style>
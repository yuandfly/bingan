import {CreateFormKu, CreateFormLog, SeletcTjm7List, UpdateTjm7, GetGzrList, InsertGzrList, UpdateGzrList} from '../../../api/monthReport';
import NumInputItem from '../compontents/num-input-item';
import DictInput from '../../../components/dialog/dict-input';
import {formatDate} from "../../../utils";
import functionCaller from "less/lib/less/functions/function-caller";
import {getMonthMaxDays} from '../report-utils';
const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
// 初始化top表单数据为当前日期、默认科别
const initTopForm = function () {
    const year = formatDate(new Date(), 'YYYY');
    const month = new Date().getMonth() + 1;
    const days = getMonthMaxDays(parseInt(year), parseInt(month));
    return {
        tjm7rq: year,
        month: month > 9 ? String(month) + String(month) : '0' + month + '0' + month,
        monthName: monthNames[month - 1],
        qngzr: days,
        tjm7kb: '0000', // 科别代码
        tjm7mc: '全院' // 科别名称
    }
}
export default {
    name: "outpatientReport",
    components: { NumInputItem, DictInput },
    data() {
        return {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            fields: {
                firstColumns: [
                    {name: 'tjm7001', label: '总诊疗人次'},
                    {name: 'tjm7002', label: '其中：门诊人次', indent: 0},
                    {name: 'tjm7003', label: '其中：专科门诊人次', indent: 2},
                    {name: 'tjm7004', label: '专家门诊人次', indent: 5},
                    {name: 'tjm7005', label: '急诊人次', indent: 3},
                    {name: 'tjm7010', label: '出诊人次', indent: 3},
                    {name: 'tjm7041', label: '预 约 数', indent: 0},
                    {name: 'tjm7042', label: '节假日诊疗人次数', indent: 0},
                    {name: 'tjm7007', label: '危重抢救人数', indent: 2},
                    {name: 'tjm7008', label: '抢救成功人数', indent: 2},
                    {name: 'tjm7009', label: '急诊死亡人数', indent: 2},
                    {name: 'tjm7021', label: '平均每天门、急诊人次', indent: 0},
                    {name: 'tjm7006', label: '其中：急诊出车', indent: 2},
                ],
                secondColumns: [
                    {name: 'tjm7011', label: '观察室收容病人数'},
                    {name: 'tjm7012', label: '其中：死亡人数', indent: 2},
                    {name: 'tjm7013', label: '观察室病人占床日数'},
                    {name: 'tjm7020', label: '观察室病人均留观日数'},
                    {name: 'tjm7014', label: '健康检查人数'},
                    {name: 'tjm7040', label: '单项健康检查人次数'},
                    {name: 'tjm7015', label: '门诊手术例数'},
                    {name: 'tjm7016', label: '正副主任医师人日数'},
                    {name: 'tjm7017', label: '正副主任医师工时数'},
                    {name: 'tjm7019', label: '急诊危重病人抢救成功率'},
                    {name: 'tjm7018', label: '日均正副主任出门诊数'},
                    {name: 'tjm7023', label: '上期末实有家床数'},
                    {name: 'tjm7024', label: '本期开设家床总数'},
                    {name: 'tjm7034', label: '出会诊诊疗人次数'},
                ],
                thirdColumns: [
                    {name: 'tjm7022', label: '家庭病床撤床病人诊疗人次数'},
                    {name: 'tjm7025', label: '家庭病床撤床病人数'},
                    {name: 'tjm7026', label: '撤床病人治愈数'},
                    {name: 'tjm7027', label: '撤床病人好转数'},
                    {name: 'tjm7028', label: '撤床病人未愈数'},
                    {name: 'tjm7029', label: '撤床病人死亡数'},
                    {name: 'tjm7030', label: '期末实有病床数'},
                    {name: 'tjm7031', label: '家床累积开设日数'},
                    {name: 'tjm7032', label: '撤床病人占用总床日数'},
                    {name: 'tjm7033', label: '赴家庭病床诊疗人次'},
                    {name: 'tjm7035', label: '地段诊疗人次数'},
                    {name: 'tjm7036', label: '儿保诊疗人次数'},
                    {name: 'tjm7037', label: '其他诊疗人次数'},
                    {name: 'tjm7038', label: '最低门诊数'},
                    {name: 'tjm7039', label: '最高门诊数'},
                ],
            },
            topForm: initTopForm(),
            contentForm: {},
            dictInputDialog: {
                visible: false,
                dictType: undefined,
                currentOpener: undefined
            },
            colFieldName: ['firstColumns', ],
            loading: false,
            workDaysDialog: {
                fields: [
                    [
                        {label: '设置年度', name: 'years', disabled: false},
                        {label: '一季度', name: 'q1th', disabled: true},
                        {label: '一月份', name: 'january', calc: 'q1th' },
                        {label: '二月份', name: 'february', calc: 'q1th' },
                        {label: '三月份', name: 'march', calc: 'q1th'}
                    ], [
                        {label: '上半年', name: 'firstHalf', disabled: true},
                        {label: '二季度', name: 'q2nd', disabled: true},
                        {label: '四月份', name: 'april', calc: 'q2th' },
                        {label: '五月份', name: 'may', calc: 'q2th' },
                        {label: '六月份', name: 'june', calc: 'q2th'}
                    ], [
                        {label: '下半年', name: 'secondHalf', disabled: true},
                        {label: '三季度', name: 'q3rd', disabled: true},
                        {label: '七月份', name: 'july', calc: 'q3th' },
                        {label: '八月份', name: 'august', calc: 'q3th' },
                        {label: '九月份', name: 'september', calc: 'q3th'}
                    ], [
                        {label: '全年', name: 'annual', disabled: true},
                        {label: '四季度', name: 'q4th', disabled: true},
                        {label: '十月份', name: 'october', calc: 'q4th' },
                        {label: '十一月份', name: 'november', calc: 'q4th' },
                        {label: '十二月份', name: 'december', calc: 'q4th'}
                    ],
                ],
                visible: false,
                loading: false,
                actionType: undefined,
                workDayMax: {},
                workDayForm: {
                    'years': formatDate(new Date(), 'YYYY')
                }
            },
            itemData: []
        }
    },
    mounted() {
        this.handleSearch();
        this.handleGetWorkDaysData(1); // 初始化工作日
    },
    watch: {
        "topForm.monthName": function (val) {
            this.handleSearch();
        },
        "topForm.tjm7mc": function (val) {
            this.handleSearch();
        }
    },
    methods: {
        // 禁用的年份：当年之后都禁用
        disabledYears(date) {
            return date.getFullYear() > new Date().getFullYear()
        },

        openDict(e, dictType, currentOpener) {
            this.dictInputDialog = {visible: true, dictType, currentOpener};
            e.target.blur()
        },

        handleDictInputSubmit(row) {
            const [dm, dmmc] = this.dictInputDialog.currentOpener.split(',');
            this.topForm[dm] = row.dm;
            this.topForm[dmmc] = row.dmmc;
            console.log(this.topForm, this.dictInputDialog);

            if (dm === 'month') {
                // 去掉所有空格
                let monthName = this.topForm['monthName'].replace(/\s/g, "");
                for (let item of this.workDaysDialog.fields) {
                    for (let value of item) {
                        // console.log(value.label.slice(0, monthName.length), monthName);
                        // console.log(value.label.slice(0, monthName.length) === monthName);
                        if (value.label.slice(0, monthName.length) === monthName) {
                            console.log( this.workDaysDialog.workDayForm, value);
                            this.topForm['qngzr'] = this.workDaysDialog.workDayForm[value.name];
                        }
                    }
                }
            }

            dm === 'month' && this.handleFocusNextOfTop('months', 'days')
        },

        // 头部表单聚焦
        handleFocusNextOfTop(lastRefName, nextRefName) {
            this.$refs[lastRefName].blur && this.$refs[lastRefName].blur();
            this.$refs[lastRefName].handleClose && this.$refs[lastRefName].handleClose();
            if (this.$refs[nextRefName]) {
                this.$refs[nextRefName].focus();
                this.$refs[nextRefName].$el.click();
                console.log(this.$refs[nextRefName])
            }
        },

        // 验证头部筛选条件
        validateTopForm() {
            let fields = [
                ['tjm7rq', '请选择年度条件'], ['month', '请选择时间范围'],
                ['qngzr', '请输入期内工作日'], ['tjm7kb', '请选择科别']
            ];
            for (let i = 0; i < fields.length; i++) {
                // 验证是否有值
                if (!this.topForm[fields[i][0]]) {
                    this.$message.error(fields[i][1]);
                    return false;
                }
                // 验证年份、月份/季度与期内工作日的关系
                if (fields[i][0] === 'qngzr') {
                    const {tjm7rq, month, qngzr} = this.topForm;
                    // 时间范围代码与月份的对应关系
                    const monthObj = {
                        '0103': [1, 2, 3], // 一季度 对应 1、2、3月
                        '0406': [4, 5, 6],
                        '0106': [1, 2, 3, 4, 5, 6],
                        '0709': [7, 8, 9],
                        '1012': [10, 11, 12],
                        '0712': [7, 8, 9, 10, 11, 12],
                        '0112': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                    }
                    let max = 0;
                    if (monthObj[month]) {
                        max = monthObj[month].map(item => getMonthMaxDays(parseInt(tjm7rq), item)).reduce((sum, item) => sum + item, 0)
                    } else {
                        const monthNumber = parseInt(month.slice(0, 2));
                        max = getMonthMaxDays(parseInt(tjm7rq), monthNumber);
                    }
                    console.log(qngzr, max)
                    if (qngzr > max) {
                        this.$message.error(`${tjm7rq}年${this.topForm.monthName}最多${max}天`);
                        return false;
                    }
                }
            }
            return true
        },

        // 查询
        handleSearch() {
            if (this.validateTopForm()) {
                const params = {...this.topForm, tjm7rq: `${this.topForm.tjm7rq}${this.topForm.month}`};
                this.loading = true;
                SeletcTjm7List(params).then(res => {
                    console.log(res);
                    if (res && res.code === 0) {
                        if (res.data && res.data[0]) {
                            const form = {};
                            this.itemData = res.data;
                            for(let item in res.data[0]) {
                                const val = parseInt(res.data[0][item]);
                                form[item] = isNaN(val) ? undefined : val
                            }
                            console.log(form, 'search')
                            this.contentForm = form;
                        }
                    } else {
                        if (this.topForm.qngzr < 32) {
                            this.$confirm('期内无数据，是否由库生成?', '提示', {
                                confirmButtonText: '是',
                                cancelButtonText: '否',
                                type: 'info'
                            }).then(() => {
                                this.handleCreatFromKu()
                            }).catch(() => {
                                this.contentForm = {}
                            });
                        } else {
                            this.$confirm('期内无数据，是否生成?', '提示', {
                                distinguishCancelAndClose: true,
                                confirmButtonText: '是, 由门诊月报库生成',
                                cancelButtonText: '否，由门诊日志生成',
                                type: 'info'
                            }).then(() => {
                                this.handleCreate('ku')
                            }).catch((action) => {
                                action === 'cancel' ? this.handleCreate('log') : (this.contentForm = {})
                            });
                        }

                    }
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            }
        },


        handleCreateKu () {
            console.log(this.itemData);
           if (this.itemData.length > 2) {
               this.$confirm('期内有数据，是否由库生成?', '提示', {
                   distinguishCancelAndClose: true,
                   confirmButtonText: '是',
                   cancelButtonText: '否',
                   type: 'info'
               }).then(() => {
                   this.handleCreate('ku')
               }).catch((action) => {

               });
           } else {
               this.handleCreate('ku')
           }
        },

        // 生成
        handleCreate(type) {

            if (this.validateTopForm()) {
                // 组合参数
                const params = {...this.topForm, tjm7rq: `${this.topForm.tjm7rq}${this.topForm.month}`};
                console.log(params);
                this.loading = true;
                const APIs = {ku: CreateFormKu, log: CreateFormLog};
                APIs[type](params).then(res => {
                    if (res && res.code === 0) {
                        if (res.data && res.data[0]) {
                            const form = {};
                            for(let item in res.data[0]) {
                                const val = parseInt(res.data[0][item])
                                form[item] = isNaN(val) ? undefined : val
                            }
                            console.log(form, 'we')
                            this.contentForm = form;



                        } else {
                            this.contentForm = {}
                        }

                        if (type === 'ku') {
                            SeletcTjm7List(params).then(res => {
                                if (res && res.code === 0) {
                                    if (res.data && res.data[0]) {
                                        const form = {};
                                        this.itemData = res.data;
                                        for(let item in res.data[0]) {
                                            const val = parseInt(res.data[0][item]);
                                            form[item] = isNaN(val) ? undefined : val
                                        }
                                        console.log(form, 'search')
                                        this.contentForm = form;
                                    }
                                }
                            })
                        }
                    } else {
                        this.contentForm = {}
                        this.$message.error(res && res.msg ? res.msg : '生成失败')
                    }

                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    this.contentForm = {}
                    console.log(err)
                    this.$message.error('生成错误')
                });
            }
        },

        // 输入项聚焦
        handleFocusNextOfContent(type, index, columnsName) {
            console.log(type, index);
            let nextId = undefined; // 下一个要聚焦的输入项id
            if (type === 1) {
                if (index < this.fields[columnsName].length - 1) { // 下一项还在这一列内
                    nextId = this.fields[columnsName][index + 1].name
                } else { // 到底了，找另一列的第一个
                    const names = ['firstColumns', 'secondColumns', 'thirdColumns'];
                    const nextName = names[names.indexOf(columnsName) + 1];
                    nextName && (nextId = this.fields[nextName][0].name)
                }
            } else if (type === 2) {

                if (columnsName === 'firstColumns') { // 上一项还在这一列内
                    nextId = this.fields['thirdColumns'][index ].name
                } else if (columnsName === 'secondColumns'){ // 到底了，找另一列的第一个
                    nextId = this.fields['firstColumns'][index ].name
                } else if (columnsName === 'thirdColumns'){ // 到底了，找另一列的第一个
                    nextId = this.fields['secondColumns'][index ].name
                }
            } else if (type === 3) {
                if (index  > 0) { // 上一项还在这一列内
                    nextId = this.fields[columnsName][index - 1].name
                } else { // 到底了，找另一列的第一个
                    console.log(this.fields[columnsName].length);
                    nextId = this.fields[columnsName][this.fields[columnsName].length - 1].name
                }
            } else if (type === 4) {
                if (columnsName === 'firstColumns') { // 上一项还在这一列内
                    nextId = this.fields['secondColumns'][index ].name
                } else if (columnsName === 'secondColumns'){ // 到底了，找另一列的第一个
                    nextId = this.fields['thirdColumns'][index ].name
                } else if (columnsName === 'thirdColumns'){ // 到底了，找另一列的第一个
                    nextId = this.fields['firstColumns'][index ].name
                }
            } else if (type === 5) {
                if (index < this.fields[columnsName].length - 1) { // 下一项还在这一列内
                    nextId = this.fields[columnsName][index + 1].name
                } else { // 到底了，找另一列的第一个
                    nextId = this.fields[columnsName][0].name
                }
            }
            if (nextId) {
                const boxEl = document.getElementById(nextId);
                boxEl && boxEl.focus();
            }
        },

        validateContentForm() {
            let error = false;
            for (let columnName in this.fields) {
                if (error) break;
                for (let i = 0; i < this.fields[columnName].length; i++) {
                    const item = this.fields[columnName][i];
                    if (!this.contentForm[item.name] && this.contentForm[item.name] !== 0 ) {
                        error = true;
                        this.$message.error(`【${item.label}】不能为空`);
                        // 某一列的第一个为空，从上一列的最后一个向后聚焦到本字段
                        if ( i === 0) {
                            const names = ['firstColumns', 'secondColumns', 'thirdColumns'];
                            const lastColumnIndex = names.findIndex(item => item === columnName) - 1;
                            const lastColumnName = lastColumnIndex < 0 ? 'firstColumns' : names[lastColumnIndex]
                            this.handleFocusNextOfContent(lastColumnIndex < 0 ? -1 : this.fields[lastColumnName].length - 1, lastColumnName)
                        } else {
                            this.handleFocusNextOfContent(i - 1, columnName)
                        }

                        break;
                    }
                }
            }
            return !error // 验证通过返回true
        },

        handleSumbit() {
            if (!this.validateTopForm()) return;
            if (!this.validateContentForm()) return;
            const topParams = {...this.topForm, tjm7rq: `${this.topForm.tjm7rq}0${this.topForm.month}`};
            this.loading = true;
            UpdateTjm7({...this.contentForm, ...topParams}).then(res => {
                if (res && res.code === 0) {
                    this.$message.success('保存成功');
                    // 若本次提交的新增，那现在提交成功后数据未清除，若再次点击提交应为edit操作
                    this.actionType === 'add' && (this.actionType = 'edit')
                } else {
                    this.$message.error(res && res.msg ? res.msg : '保存失败');
                }
                this.loading = false;
            }).catch(err => {
                this.$message.error('月报保存出错')
                this.loading = false;
            })
        },

        handleCancel() {
            this.contentForm = {};
        },

        /* ---------------------------- 设置工作日 ---------------------------- */

        // 打开工作日设置
        handleOpenWorkDaysDialog() {
            this.workDaysDialog.visible = true
        },

        // 工作日内的enter聚焦
        handleFocusNextOfWorkDay(i, j) {
            const { fields } = this.workDaysDialog;
            let nextId = undefined;
            // 下一个在同一行
            if (j < 4) {
                nextId = fields[i][j+1].name;
            } else if (fields[i+1]) { // 否则取下一行的
                nextId = fields[i+1].find(item => !item.disabled).name
            }
            if (nextId) {
                const boxEl = document.getElementById(nextId);
                const inputEl = boxEl.querySelector('.el-input__inner');
                inputEl && inputEl.focus();
            }
        },

        // 输入年份，获取工作日数据
        // type: 1 初始化时不需要聚焦到月份
        handleGetWorkDaysData(type = 2) {
            clearTimeout(this.changeTimeout);
            // timeout：防止enter事件和change事件同时触发
            this.changeTimeout = setTimeout(() => {
                if (this.workDaysDialog.workDayForm.years) {
                    this.workDaysDialog.loading = true;
                    // 获取这年的工作日数据
                    const { years } = this.workDaysDialog.workDayForm;
                    GetGzrList({years}).then(res => {
                        if (res && res.code === 0) {
                            // 填入表单值、计算各月份最大值
                            const form = {years};
                            const workDayMax = {};
                            for(let item in (res.data || {})) {
                                const val = parseInt(res.data[item]);
                                form[item] = isNaN(val) ? undefined : val;
                                workDayMax[item] = getMonthMaxDays(parseInt(years), item)
                            }
                            this.workDaysDialog.workDayForm = form;
                            // 计算各月份最大值
                            this.workDaysDialog.workDayMax = workDayMax;
                            console.log(workDayMax, 'm')
                            // 聚焦到一月份
                           if (type === 2) {
                               this.handleFocusNextOfWorkDay(0, 1);
                           }
                            // 设置稍后提交时的类型
                            this.workDaysDialog.actionType = res.data ? 'edit' : 'add'
                        } else {
                            this.$message.error(res && res.msg ? res.msg : '获取工作日数据失败');
                        }
                        this.workDaysDialog.loading = false;
                    }).catch(err => {
                        this.workDaysDialog.loading = false;
                        this.$message.error('获取工作日数据错误')
                        console.log(err);
                    })
                }
            }, 50)
        },

        // 各月份数值改变，重新计算和
        handleWorkDayItemChange(val) {
            const {fields, workDayForm} = this.workDaysDialog;
            // 计算各个季度
            const qthNameArray = ['q1th', 'q2nd', 'q3rd', 'q4th'];
            fields.forEach((qth, index) => {
                workDayForm[qthNameArray[index]] = qth.slice(2).reduce((sum, item) => {
                    return sum + (workDayForm[item.name] || 0)
                }, 0)
            });
            // 上下半年
            workDayForm.firstHalf = (workDayForm.q1th || 0) + (workDayForm.q2nd || 0);
            workDayForm.secondHalf = (workDayForm.q3rd || 0) + (workDayForm.q4th || 0);
            // 全年
            workDayForm.annual = (workDayForm.firstHalf || 0) + (workDayForm.secondHalf || 0);
        },

        // 保存工作日设置
        handleSaveWorkDays(needExit) {
            // 检查是否已经设值
            const {fields, workDayForm, actionType} = this.workDaysDialog;
            let error = false;
            for (let i = 0; i < fields.length; i++) {
                if (error) { break; }
                for (let j = 0; j < fields[i].length; j++) {
                    if (!workDayForm[fields[i][j].name]) {
                        this.$message.error(`${fields[i][j].label}数值为空`);
                        error = true;
                        break;
                    }
                }
            }
            if (!error && actionType) {
                const API = {add: InsertGzrList, edit: UpdateGzrList};
                API[actionType](workDayForm).then(res => {
                    if (res && res.code === 0) {
                        this.$message.success('设置成功');
                        // 存盘退出就关闭弹窗
                        if (needExit) this.handleExit();
                        // 否则不关闭弹框，将actionType改为edit，这样不换年份再次点击提交时为update
                        else if (actionType === "add") {
                            this.workDaysDialog.actionType = 'edit'
                        }
                    } else {
                        this.$message.error(res && res.msg ? res.msg : '设置失败');
                    }
                    this.workDaysDialog.loading = false;
                }).catch(err => {
                    this.workDaysDialog.loading = false;
                    this.$message.error('设置工作日数据错误')
                })
            }
        },
        // 键盘操作
        focus(str, n) {
            let name = "";
            if (str === "dmmc") {
                if (n < this.tableData.length - 1) {
                    let j = n + 1;
                    if (this.$refs[str + j].disabled === true) {
                        n = n + 2;
                    } else {
                        n++;
                    }
                } else {
                    n = 0
                }
            }
            name = str + n;
            this.$refs[name].focus();
        },
        moveRight(str, n) {
            console.log(str, n);
            let name = "";
            name = str + n;
            this.$refs[name].focus();
        },
        moveLeft(str, n) {
            let name = "";
            name = str + n;
            this.$refs[name].focus();
        },
        moveUp(str, n) {
            let name = "";
            if (n > 0) {


                let j = n + 1;
                console.log(this.$refs[str + j]);
                if (this.$refs[str + j].disabled === true) {
                    name = str + String(n - 2);
                } else {
                    name = str + String(n - 1);
                }



            } else {
                name = str + n;
            }
            this.$refs[name].focus();
        },
        moveDown(str, n) {
            let name = "";
            if (n < this.tableData.length - 1) {

                let j = n + 1;
                console.log(this.$refs[str + j]);
                if (this.$refs[str + j].disabled === true) {
                    name = str + String(n + 2);
                } else {
                    name = str + String(n + 1);
                }
            } else {
                name = str + n;
            }
            this.$refs[name].focus();
        },
        // 键盘操作 end
        // 退出
        handleExit() {
            this.workDaysDialog.visible = false;
            this.workDaysDialog.loading = false;
            this.workDaysDialog.actionType = undefined;
            this.workDaysDialog.workDayForm = {}
        }
    }
}

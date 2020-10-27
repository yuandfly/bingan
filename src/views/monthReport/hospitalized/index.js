import {
    CreateFormKu,
    CreateFormLog,
    GetTjz2list,
    SaveTjz2List,
    SeletcTjm7List,
    SeletcTjz2List
} from '../../../api/monthReport';
import NumInputItem from '../compontents/num-input-item';
import DictInput from '../../../components/dialog/dict-input';
import {FIELDS, calcPages} from "./fieldsConfig";
import {formatDate} from "../../../utils";
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
    name: "HospitalizedMonthReport",
    components: { NumInputItem, DictInput },
    data() {
        return {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            topForm: initTopForm(),
            dictInputDialog: {
                visible: false,
                dictType: undefined,
                currentOpener: undefined
            },
            loading: false,
            actionType: undefined,
            activePageIndexStr: '0', // 当前激活的tab
            contentForm: {}, // 表单值
            fieldsPager: {
                pageNum: 0, // 一共分几页tab
                columns: 3, // 一页内分几列
                numsInOneColumn: 0, // 一列多少项
                numsInOnePage: 0 // 一页多少项
            },
            contentFields: [] // 处理后的字段配置
        }
    },
    computed: {

    },
    created() {
        // 计算页码等数值，处理字段
        const {pageNum, numsInOnePage, numsInOneColumn, columns} = calcPages();
        const contentFields = [];
        // 遍历页数，得到每一页的字段配置
        for (let pageIndex = 0; pageIndex < pageNum; pageIndex++) {
            contentFields[pageIndex] = [];
            // 每一页内遍历列数，得到各列的具体字段
            for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
                // 本列在FIELDS配置中的开始索引，根据页数和列数计算得出
                const start = (pageIndex * numsInOnePage) + (columnIndex * numsInOneColumn);
                // 本列在FIELDS配置中的结束索引，即开始索引加本列项目数
                let end = start + numsInOneColumn;
                // 从FIELDS中截取这一段，作为第 (pageIndex + 1) 页 第 (columnIndex + 1) 列要显示的字段
                contentFields[pageIndex][columnIndex] = FIELDS.slice(start, end)
                // 若 end 大于等于FIELDS的长度了，代表已到最后，不应该再继续遍历之后的列
                if (end >= FIELDS.length) break;
            }
        }
        this.fieldsPager = {pageNum, columns, numsInOneColumn, numsInOnePage}
        this.contentFields = contentFields;
        console.log(contentFields)
    },
    mounted() {
        this.handleSearch()
    },
    methods: {

        // 禁用的年份：当年之后都禁用
        disabledYears(date) {
            return date.getFullYear() > new Date().getFullYear()
        },

        // 打开字典
        openDict(e, dictType, currentOpener) {
            this.dictInputDialog = {visible: true, dictType, currentOpener};
            e.target.blur()
        },

        // 字典提交
        handleDictInputSubmit(row) {
            const [dm, dmmc] = this.dictInputDialog.currentOpener.split(',');
            this.topForm[dm] = row.dm;
            this.topForm[dmmc] = row.dmmc;
            dm === 'month' && this.handleFocusNextOfTop('months', 'kebieName')
        },

        // 头部条件enter聚焦
        handleFocusNextOfTop(lastRefName, nextRefName) {
            this.$refs[lastRefName].blur && this.$refs[lastRefName].blur();
            this.$refs[lastRefName].handleClose && this.$refs[lastRefName].handleClose();
            if (this.$refs[nextRefName]) {
                this.$refs[nextRefName].focus();
                this.$refs[nextRefName].$el.click();
                console.log(this.$refs[nextRefName])
            }
        },

        // 输入项聚焦
        handleFocusNextOfContent(type, fieldIndex, columnIndex, pageIndex, mustWait = false) {

            function doFocus(nextId) {
                const boxEl = document.getElementById(nextId);
                boxEl && boxEl.focus();
            }
            let nextId = undefined; // 下一个要聚焦的输入项id
            let needWait = false; // 是否要稍等下再聚焦（翻页导致聚焦失败）
            const {contentFields} = this;
            // 如果必须等待，即强制切页，需先定位给定字段所在页


            if (mustWait) this.activePageIndexStr = String(pageIndex);
            if (type === 1) {
                if (contentFields[pageIndex][columnIndex][fieldIndex + 1]) {
                    // 若本列还有下一个，聚焦下一个
                    nextId = contentFields[pageIndex][columnIndex][fieldIndex + 1].name
                } else if (contentFields[pageIndex][columnIndex + 1]){
                    // 当前列结束，若本页还有下一列，聚焦本页下一列的第一个
                    nextId = contentFields[pageIndex][columnIndex + 1][0].name;
                } else if (contentFields[pageIndex + 1]) {
                    // 当前页结束，还有下一页，聚焦下一页第一列第一个
                    nextId = contentFields[pageIndex + 1][0][0].name;
                    // 同时翻一页
                    this.activePageIndexStr = String(pageIndex + 1);
                    needWait = true;
                }
            } else if (type === 2) {

                if (contentFields[pageIndex][columnIndex - 1]) {
                    // 若还有上一列
                    nextId = contentFields[pageIndex][columnIndex - 1][fieldIndex ].name
                } else {
                    // 否则到最后一列
                    nextId = contentFields[pageIndex][contentFields[pageIndex].length - 1][fieldIndex].name;
                }
            } else if (type === 3) {
                if (fieldIndex > 0) {
                    // 若本列还有上一个，聚焦上一个
                    nextId = contentFields[pageIndex][columnIndex][fieldIndex - 1].name
                } else {
                    // 否则到最后一个
                    nextId = contentFields[pageIndex][columnIndex][contentFields[pageIndex][columnIndex].length - 1].name;
                }
            } else if (type === 4) {
                if (contentFields[pageIndex][columnIndex+ 1]) {
                    // 若还有下一列
                    nextId = contentFields[pageIndex][columnIndex+ 1][fieldIndex ].name
                } else {
                    // 否则到第一列
                    console.log(contentFields[pageIndex]);
                    nextId = contentFields[pageIndex][0][fieldIndex].name;
                }
            } else if (type === 5) {
                if (contentFields[pageIndex][columnIndex][fieldIndex + 1]) {
                    // 若本列还有下一个，聚焦下一个
                    nextId = contentFields[pageIndex][columnIndex][fieldIndex + 1].name
                } else {
                    // 否则到第一个
                    nextId = contentFields[pageIndex][columnIndex][0].name;
                }
            }







            if (nextId) {
                needWait || mustWait ? setTimeout(() => doFocus(nextId), 50) : doFocus(nextId)
            }
        },

        validateTopForm() {
            let fields = [
                ['tjm7rq', '请选择年度条件'], ['month', '请选择时间范围'], ['tjm7kb', '请选择科别']
            ];
            for (let i = 0; i < fields.length; i++) {
                // 验证是否有值
                if (!this.topForm[fields[i][0]]) {
                    this.$message.error(fields[i][1]);
                    return false;
                }
            }
            return true
        },

        // 查询
        handleSearch() {
            if (this.validateTopForm()) {
                const params = {...this.topForm, tjm7rq: `${this.topForm.tjm7rq}${this.topForm.month}`};
                this.loading = true;
                SeletcTjz2List(params).then(res => {
                    if (res && res.code === 0) {
                        if (res.data) {
                            const form = {
                                tjz2rq: res.data[0].tjz2rq,
                                tjz2kb: res.data[0].tjz2kb,
                                tjz2mc: res.data[0].tjz2mc
                            };
                            FIELDS.forEach(field => {
                                const val = parseInt(res.data[0][field.name])
                                console.log(field.name);
                                form[field.name] = isNaN(val) ? undefined : val
                            })
                            this.contentForm = form;
                        }
                    } else {
                        console.log(this.topForm);
                        // 如果选的是 月份 则由库生成
                        if (this.topForm.monthName.indexOf('月') > -1) {
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
                    console.log(err)
                    this.loading = false;
                })
            }
        },

        // 由库生成
        handleCreatFromKu() {
            if (this.validateTopForm()) {
                // 组合参数
                const params = {...this.topForm, tjm7rq: `${this.topForm.tjm7rq}${this.topForm.month}`};
                console.log(params);
                this.loading = true;
                GetTjz2list(params).then(res => {
                    if (res && res.code === 0) {
                        if (res.data) {
                            const form = {
                                tjz2rq: res.data[0].tjz2rq,
                                tjz2kb: res.data[0].tjz2kb,
                                tjz2mc: res.data[0].tjz2mc
                            };
                            FIELDS.forEach(field => {
                                const val = parseInt(res.data[0][field.name])
                                form[field.name] = isNaN(val) ? undefined : val
                            })
                            this.contentForm = form;
                            this.actionType = 'edit';
                        } else {
                            this.actionType = 'add';
                        }
                    } else {
                        this.$message.error(res && res.msg ? res.msg : '由库生成失败')
                    }
                    this.loading = false;
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                    this.$message.error('由库生成错误')
                });
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

        // 验证内容表单
        validateContentForm() {
            const getFieldPagerInfo = errFieldName => {
                let pageNo = 0, columnNo = 0, fieldNo = 0;
                for (let pageIndex = 0; pageIndex < this.contentFields.length; pageIndex++) {
                    if (fieldNo) break;
                    const pageData = this.contentFields[pageIndex];
                    for (let columnIndex = 0; columnIndex < pageData.length; columnIndex++) {
                        if (fieldNo) break;
                        const columnData = pageData[columnIndex];
                        for (let fieldIndex = 0; fieldIndex < columnData.length; fieldIndex++) {
                            if (columnData[fieldIndex].name === errFieldName) {
                                fieldNo = fieldIndex + 1;
                                columnNo = columnIndex + 1;
                                pageNo = pageIndex + 1;
                                break;
                            }
                        }
                    }
                }
                return {pageNo, columnNo, fieldNo}
            }
            let error = false;
            for (let i = 0; i < FIELDS.length; i++) {
                const field = FIELDS[i];
                if (!this.contentForm[field.name]) {
                    error = true;
                    // 找到这个字段所在页面、列号、字段号信息
                    const {pageNo, columnNo, fieldNo} = getFieldPagerInfo(field.name);
                    this.$message.error(`第${pageNo}页 第${columnNo}列 第${fieldNo}个字段【${field.label}】数值为空`);
                    // 聚焦到这个字段
                    if (i === 0) {
                        this.handleFocusNextOfContent(-1, 0, 0, true)
                    } else {
                        // 找到上一个字段的页码信息
                        const lastFieldPagerInfo = getFieldPagerInfo(FIELDS[i - 1].name);
                        // 通过focusNext聚焦
                        this.handleFocusNextOfContent(lastFieldPagerInfo.fieldNo - 1, lastFieldPagerInfo.columnNo - 1, lastFieldPagerInfo.pageNo - 1, true)
                    }
                    break;
                }
            }
            return !error // 验证通过返回true
        },

        handleSumbit() {
            if (!this.validateTopForm()) return;
            // if (!this.validateContentForm()) return;
            if (this.actionType) {
                const topParams = {...this.topForm, tjm7rq: `${this.topForm.tjm7rq}${this.topForm.month}`};
                this.loading = true;
             //   this.contentForm.tjz2011 = Number(this.contentForm.tjz2011);
                SaveTjz2List({...this.contentForm, ...topParams}).then(res => {
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
            } else {
                this.$message.error('未知操作')
            }
        },

        handleCancel() {
            this.contentForm = {};
            this.actionType = undefined;
        }
    }
}

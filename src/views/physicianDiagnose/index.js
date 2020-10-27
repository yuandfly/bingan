import TopFilter from './components/top-filter';
import { SearchHomePage, QueryPatient, EditBaza, AddBaza, AuditBaza, icd, iccm } from "../../api";
import { RandomSearch } from '../../api/randomSearch';
import { UnionSearch } from '../../api/groupSearch';
import PagingToolbar from "../../components/toolbar/paging";
import InputItem from './components/input-item';
import DictInput from '../../components/dialog/dict-input';
import AllergicDrugsInput from './components/allergic-drugs-input'; // 过敏药物录入
import PathologicDiagnosisInput from './components/pathologic-diagnosis-input'; // 病理诊断录入
import draggable from "vuedraggable";
import inputConfig from "./config/inputConfig";
import utils from './utils';
import { formatDate } from "../../utils";
import { mapMutations } from "vuex";
import fi from "element-ui/src/locale/lang/fi";
import crypto from "@/common/js/crypto.js";
import supplementBox from "./components/supplementBox";

let timeOut = undefined;
export default {
    components: { TopFilter, PagingToolbar, InputItem, DictInput, draggable, AllergicDrugsInput, PathologicDiagnosisInput, supplementBox },
    data() {
        return {
            age: 0,
            test: undefined,
            // 左侧是否展开
            isExpand: false,
            // 右侧内容的loading
            rightLoading: false,
            // 三段输入项配置
            firstInputs: inputConfig.slice(0, 54),
            secondInputs: inputConfig.slice(54, 76),
            thirdInputs: inputConfig.slice(76, inputConfig.length),
            // 顶部筛选和左侧表格相关
            list: {
                filters: {},
                pager: {
                    total: 100, // 总条数
                    page: 1, // 当前页
                    rows: 61 // 每页显示多少条
                },
                loading: false,
                selectedKeys: [], // 勾选的key集合
                tableData: []
            },
            // 所有输入项绑定的值
            inputValues: utils.initInputsValues(),
            // 需要用到的一些判断（显示与不显示的）
            judge: {
                hospitalType: 'Both', // 医院类型 Western 西医 Chinese 中医 Both 中西医结合
                isNewBaby: true, // 是否显示新生儿输入项
            },
            // 动态的单位后缀,如年龄的单位需要根据具体的详情数据显示岁、月或日
            dynamicAfterObj: {
                ageAfter: '', // 年龄的单位后缀
            },
            // 西医诊断表格数据
            WesternDiagnoseTable: [{ type: 'main' }],
            // 中医诊断表格数据
            ChineseDiagnoseTable: [{ type: 'main' }],
            // 手术表格数据
            operationTable: [],
            // 代码录入窗口数据
            dictInputDialog: {
                visible: false, // 是否打开
                dictType: undefined, // 字典类型，给代码录入组件使用，根据此类型获取对应的字典数据
                dictExtraParams: undefined, // 额外参数
                opener: undefined, // 当前打开录入窗口的调用者 inputValues / WesternDiagnoseTable / ChineseDiagnoseTable / operationTable
                fields: [], // 需要填入的字段 eg: [{dictField: 'dmmc', targetField: 'baf405}]，表示选择字典某项后，将此项字典的dmmc值赋给opener.baf405
                index: 0, // 如果opener是表格，填入表格第几行
            },
            // 过敏药物录入框
            allergicDrugsDialog: {
                visible: false,
                baza00: undefined,
                allergicDrugsData: []
            },
            // 病理诊断录入框
            pathologicDiagnosisDialog: {
                visible: false,
                baza00: undefined,
                diagnosisData: []
            },
            // 其他一些下拉选项
            optionData: {
                // 转归
                turnReturn: [
                    { label: '治愈', value: '1' }, { label: '好转', value: '2' },
                    { label: '未愈', value: '3' }, { label: '死亡', value: '4' },
                    { label: '其他', value: '5' }, { label: '其他', value: '9' },
                ],
                // 手术级别
                operationLevel: [
                    { label: '一级', value: '1' }, { label: '二级', value: '2' },
                    { label: '三级', value: '3' }, { label: '四级', value: '4' },
                ],
                // 切口
                incision: [{ label: '0', value: '0' }, { label: 'I', value: '1' },
                { label: 'II', value: '2' }, { label: 'III', value: '3' },
                ],
                // 愈合等级
                healingLevel: [
                    { label: '甲', value: '1' }, { label: '乙', value: '2' }, { label: '丙', value: '3' },
                ],
                // 入院病情
                entryState: [
                    { label: '有', value: '1' }, { label: '临床未确定', value: '2' },
                    { label: '情况不明', value: '3' }, { label: '无', value: '4' },
                ]
            },
            // 当前提交类型
            submitType: 'add',
            // 提交后的错误信息
            errorInfo: {
                visible: false,
                height: 40,
                errorData: [],
                tableErrorObj: { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} },
                errorObj: {}, // eg: {[inputConfig里的name]: true}
                currentFocus: undefined
            }
        }
    },

    computed: {
        // 动态的禁用状态，如离院方式，需inputConfig中设置valuesToJumpNext
        dynamicDisabledObj() {
            return {
                'bazaDO.baza00': this.submitType === 'edit',
                // 在入院目的是否禁用：是否有出院31天内再住院计划不为1就禁用
                'bazaDO.bazad6': this.inputValues['bazaDO.bazad5'] !== '1',
                // 拟接受医疗机构名称是否禁用：离院方式不为2、3就禁用
                'bazaDO.bazaf9': this.inputValues['bazaDO.bazaf8'] !== '2' && this.inputValues['bazaDO.bazaf8'] !== '3',
                // 过敏药物：药物过敏值不为2就禁用
                'bazaDO.allergicDrugs': this.inputValues['bazaDO.baza52'] !== '2'
            }
        },
        fixedBottonHeight() {
            return this.errorInfo.height + 53 + 'px'
        },
        showTopFilter() {
            return !this.$store.state.homepage.baza00
        }
    },

    mounted() {
      //  console.log(this.$store.state.homepage, 'orign')
        // 从组合查询、随机查询跳转过来的，直接获取病案详情
        const { baza00, searchData } = this.$store.state.homepage;
        if (baza00) {
            // 设置左侧表格
            this.list.pager = searchData.pager;
            this.list.tableData = searchData.tableData;
            // console.log(this.list.tableData)
            // 获取详情
            this.handleLeftRowClick({ baza00 });
        } else {
            this.handleSearch({}); // 获取左侧列表
        }
    },

    beforeDestroy() {
        // 清空baza00
        this.setSearchInfo({});
        // 清空utilds上的
        this.handleReset();
    },

    methods: {

        ...mapMutations('homepage', ['setSearchInfo']),

        /* -------------------------------- 左侧列表相关 ------------------------------------- */

        /**
         * 顶部筛选
         * @param filters: topFilters组件处理过的查询条件
         */
        handleSearch(filters) {
            this.list.filters = filters;
            this.list.pager = { ...this.list.pager, page: 1 };
            this.getList(filters, { page: 1, rows: this.list.pager.rows })
        },

        /**
         * 分页change
         * @param page
         */
        handlePageChange(page) {
            this.list.pager.page = page;
            if (this.$store.state.homepage.baza00) {
                this.getListByCondition(page)
            } else {
                this.getList(this.list.filters, this.list.pager)
            }
        },

        // 展开收起
        handleExpand() {
            this.isExpand = !this.isExpand;
          //  console.log(this.$refs.leftTable);
            this.$refs.leftTable.doLayout()
        },

        /**
         * 页面搜索获取左侧列表数据
         * @param filters 筛选条件
         * @param pager 分页条件
         */
        getList(filters, pager) {
            this.list.loading = true;
            this.list.selectedKeys = [];
            SearchHomePage({ ...filters, page: pager.page, limit: pager.rows }).then(res => {
                if (res && res.data) {
                    this.list.pager.total = res.data.total;
                    this.list.tableData = res.data.content;
              //      console.log(this.list.tableData)
                } else {
                    this.$message.error(res && res.msg ? res.msg : '获取病案列表失败')
                }
                this.list.loading = false
            }).catch(err => {
                this.list.loading = false;
                this.$message({ type: 'error', message: '获取病案列表错误' });
            })
        },

        /**
         * 通过随机或组合查询出左侧列表
         * @param page 页码
         */
        getListByCondition(page) {
            const { baza00, randomSearchCondition, groupSearchCondition } = this.$store.state.homepage;
            const api = randomSearchCondition ? RandomSearch : UnionSearch;
            const conditionParams = randomSearchCondition ? { conditionList: randomSearchCondition } : groupSearchCondition;
            this.list.loading = true;
            this.list.selectedKeys = [];
            api({
                page,
                size: this.list.pager.rows,
                ...conditionParams
            }).then(res => {
                if (res && res.data) {
                    this.list.pager.total = res.data.total;
                    this.list.tableData = res.data.content;
                } else {
                    this.$message.error(res && res.msg ? res.msg : '获取病案列表失败')
                }
                this.list.loading = false
            }).catch(err => {
                this.list.loading = false;
                this.$message({ type: 'info', message: '获取病案列表错误' });
            })
        },

        /**
         * 勾选
         * @param rows
         */
        handleSelectionChange(rows) {
            this.list.selectedKeys = rows.map(item => item.baza00)
        },

        /**
         * 批量审核
         */
        handleAudit() {
            if (this.list.selectedKeys.length) {
                AuditBaza(this.list.selectedKeys).then(res => {
                    this.$message.success('审核成功');
                    this.getList(this.list.filters, { page: 1, rows: this.list.pager.rows })
                }).catch(err => {
                    this.$message.error('审核失败')
                })
            } else {
                this.$message.info('请先勾选需要审核的数据')
            }
        },

        /* -------------------------------- 输入项相关 ------------------------------------- */

        /**
         * 左侧表格右击事件处理：获取右侧病历数据，初始化一次所有输入和表格
         */
        handleLeftRowClick(row, col, event) {
            event && event.preventDefault();
            this.rightLoading = true;
            this.errorInfo = {
                visible: false,
                height: 40,
                errorData: [],
                tableErrorObj: { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} },
                errorObj: {}, // eg: {[inputConfig里的name]: true}
                currentFocus: undefined
            }
            QueryPatient(row.baza00).then(res => {
                if (res && res.code === 0) {
                    const { data } = res;
                    // 设置提交类型为修改
                    this.submitType = 'edit';
                    // 记录原始数据
                    utils.originData = data;
                    // 整理一些判断点
                    const western = data.bazaDO.baza65; const chinese = data.baf9D && data.baf9D.baf902;
                    this.judge = {
                        hospitalType: 'Both', // western && chinese ? 'Both' : (western ? 'Western' : 'Chinese')
                        isNewBaby: data.bazaDO.bazaa1 === 'M' || data.bazaDO.bazaa1 === 'D'
                    };
                    // 动态的后缀单位名称
                    this.dynamicAfterObj = {
                        ageAfter: ({ Y: '岁', M: '月', D: '日' })[data.bazaDO.bazaa1],
                    };
                    // 所有输入项的值
                    this.inputValues = utils.setInputValues(data);
                    if (!this.inputValues['bazaDO.baza59']) {
                        this.inputValues['bazaDO.baza59'] = this.userName()
                    }
                    // console.log(1, this.inputValues)
                    // 过敏药物数据
                    this.allergicDrugsDialog.allergicDrugsData = data.baf5DO || [];
                    // 病理诊断数据
                    this.pathologicDiagnosisDialog.diagnosisData = data.baf2DO || [];
                    // 西医诊断表格数据
                    this.WesternDiagnoseTable = utils.setWesternDiagnoseTable(data);
                    // 中医诊断表格数据
                    this.ChineseDiagnoseTable = utils.setChineseDiagnoseTable(data);
                    // 手术表格
                    this.operationTable = utils.setOperationTable(data);
                    // 使第一个输入项获取焦点
                    utils.focusNext('bazaDO.baza01', true);
                } else {
                    this.$message({ type: 'error', message: '获取失败' });
                }
                this.rightLoading = false;
            }).catch((e) => {
                this.rightLoading = false;
                throw new Error(e);
                this.$message({ type: 'error', message: '初始化错误' });
            })
        },

        //获取登录用户名
        userName() {
            let sessionUser = sessionStorage.getItem("sessionUser");
            let sessionUserValue = JSON.parse(crypto.decrypt(sessionUser, null));
            return sessionUserValue.adminData.username
        },

        /**
         * 所有input-item输入项值的变化监听，记录到inputValues中
         * @param name：key
         * @param value
         * @param computed: input-config里配置的computed，如果有，则执行配置的方法并赋值
         */
        handleInputItemChange(name, value, computed) {
            this.inputValues[name] = value;
            if (computed) { // 需要计算其他值
                this.$nextTick(() => {
                    // 将新的全量输入项值传给计算函数
                    const values = { ...this.inputValues };
                    // 遍历computed对象，可计算多个值，computed对象的key是被计算字段的字段名
                    Object.keys(computed).forEach(key => {
                        // 执行计算函数得到计算值
                        const comoutedVal = computed[key](values)
                        // 如果可以得到计算值，填入inputValues
                        if (comoutedVal !== null) this.inputValues[key] = comoutedVal
                    })
                })
            }
            // 病理号
            if (name === 'bazaDO.baf202') {
                const firstItem = this.pathologicDiagnosisDialog.diagnosisData[0];
                this.pathologicDiagnosisDialog.diagnosisData[0] = { ...firstItem, baf202: value };
            }
        },

        /**
         * 调用字典的输入项按del键进行删除
         * @param fields 待删除的字段
         */
        handleDelDictValue(fields) {
            fields.forEach(item => this.inputValues[item] = undefined)
        },

        /* -------------------------------- 表格相关 ------------------------------------- */

        /**
         * 新增其他诊断
         * @param tableName
         */
        handleAddDiagnose(tableName) {
            // 有originData表示已获取详情, 无详情不给新增
            if (utils.originData) {
                this[tableName] = this[tableName].concat([{
                    type: 'other',
                    baza00: utils.originData.bazaDO.baza00, // 主键
                    baza01: utils.originData.bazaDO.baza00 ? utils.originData.bazaDO.baza00.slice(4) : undefined,
                    diseaseCode: '',
                    diseaseName: '',
                    entryState: '',
                }])
            }
        },

        /**
         * 新增手术记录
         */
        handleAddOperation() {
            if (utils.originData) {
                this.operationTable = this.operationTable.concat([{
                    baza00: utils.originData.bazaDO.baza00, // 主键
                    baza01: utils.originData.bazaDO.baza00 ? utils.originData.bazaDO.baza00.slice(4) : undefined,
                    baf405: undefined, // 手术操作 编码
                    baf411: undefined, // 手术操作日期
                    baf404: undefined, // 手术级别
                    baf408name: undefined, // 手术操作 名称
                    baf409: undefined, // 术者
                    baf414: undefined, // Ⅰ助
                    baf415: undefined, // Ⅱ助
                    baf413: undefined, // 切口愈合等级
                    baf410: undefined, // 麻醉方式 编码
                    baf410name: undefined, // 麻醉方式 名称
                    baf416: undefined // 麻醉医师
                }])
            }

        },

        /**
         * 删除诊断或手术表格某一行
         * @param tableName
         * @param index
         */
        handleDelTableRow(tableName, index) {
            const tableData = this[tableName].slice();
            tableData.splice(index, 1);
            this[tableName] = tableData
        },

        // 表格内输入项的enter聚焦
        tableFocusNext(tableName, rowIndex, currentField, focusSelf) {
            const fields = {
                WesternDiagnoseTable: ['diseaseName', 'entryState', 'turnReturn'],
                ChineseDiagnoseTable: ['diseaseName', 'entryState', 'turnReturn'],
                operationTable: ['baf411', 'baf404', 'baf408name', 'baf409', 'baf414', 'baf415', 'baf412', 'baf413', 'baf410name', 'baf416']
            };
            if (!focusSelf) {
                // 当前聚焦的select的下拉菜单样式类名（当前是input的话就没有）
                const currentSelectPoperClassName = tableName + rowIndex + currentField + 'poper';
                // 隐藏当前下拉框
                const poper = document.querySelector(`.${currentSelectPoperClassName}`);
                if (poper) poper.style.display = 'none';
            }
            // 下一个聚焦的列索引
            const nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) + 1);
            // 下一个聚焦的行索引
            const nextRowIndex = nextColIndex < fields[tableName].length ? rowIndex : (rowIndex + 1);
            // 下一个聚焦的元素id名称
            let nextIdName = tableName;
            if (nextRowIndex === rowIndex) { // 还在当前行继续向右聚焦
                nextIdName = nextIdName + nextRowIndex + fields[tableName][nextColIndex];
            } else { // 聚焦下一行的第一个
                nextIdName = nextIdName + nextRowIndex + fields[tableName][0]
            }
            // 执行聚焦
            const table = document.getElementById(tableName);
            const input_inner = table.querySelector(`#${nextIdName}`);
            if (input_inner) {
                input_inner.focus();
                input_inner.click();
            }
        },

        /* -------------------------------- 代码(字典)录入相关 ------------------------------------- */

        /**
         * 打开代码录入窗口
         * 参数意义见data.codeInputDialog和handleCodeInput
         * @param e
         * @param dictType
         * @param opener
         * @param fields
         * @param index
         */
        showDictInputDialog(e, { dictType, dictExtraParams, opener, fields, index }) {
            // console.log(90, dictType, opener, fields, index)
            e.preventDefault();
            e.stopPropagation();
            this.dictInputDialog = {
                visible: true,
                dictExtraParams, // 额外参数
                dictType, // 字典类型
                opener, // 调用者
                fields, // 需填入的字段
                index // 填入表格第几行
            };
        },

        /**
         * 代码录入的确定，替换对应的数据
         * @param dict 选择的字典项 {dm, dmcc, pym, ...}
         */
        handleDictInputSubmit(dict) {
            const { opener, fields, index } = this.dictInputDialog;
            if (opener === 'inputValues') { // 输入项中打开, 把对应值填入this.inputValues中
                fields.forEach(item => {
                    this.inputValues[item.targetField] = dict[item.dictField]
                });
                // 选择后使下移个输入项聚焦
                utils.focusNext(fields[0].targetField, false);
            } else { // 中医诊断、西医诊断、手术 三个表格内打开的, 填入表格index行对应字段中
                fields.forEach(item => {
                    this[opener][index][item.targetField] = dict[item.dictField]
                });
                // 表格里也是聚焦下个输入框
                // todo 这里用 fields[0].targetField 代表了当前输入的字段名，所以在设置fields的时候需要注意将其放在第一个
                this.tableFocusNext(opener, index, fields[0].targetField)
            }
            if (this.inputValues['bazaDO.baza04']) {
                this.age = new Date().getFullYear() - Number(this.inputValues['bazaDO.baza04'].split('-')[0])
            }
            // console.log('00', this.operationTable)
            // console.log('@', this.dictInputDialog.dictType)
            if (this.dictInputDialog.dictType === "westernDiagnoseDict") {
             //   console.log('00', this.dictInputDialog.dictType)
                icd({
                    "age": this.age,
                    "icCode": this.WesternDiagnoseTable[0].ICD10,
                    "sex": this.inputValues['bazaDO.baza03']
                }).then(res => {
                    if (res.code === 0) {
                        this.$message.success(res.msg)
                    }
                    if (res.code === 1) {
                        this.$confirm(res.msg, "提示", {
                            //type: 'warning'
                        }).then(() => {
                            const temp = this.WesternDiagnoseTable.slice();
                            temp[index].diseaseName = ''
                            temp[index].ICD10 = ''
                            this.WesternDiagnoseTable = temp;
                        })
                    }
                    if (res.code === 2) {
                        this.$confirm(res.msg, "提示", {
                            //type: 'warning'
                        }).then(() => {
                            this.$refs.child.showBox(this.dictInputDialog.dictType, res.data);
                        }).catch(() => {
                            //
                        });
                    }
                })
            }
            if (this.dictInputDialog.dictType === "operationDict") {
                iccm({
                    "age": this.age,
                    "icCode": this.operationTable[0].baf405,
                    "sex": this.inputValues['bazaDO.baza03']
                }).then(res => {
              //      console.log('==', this.operationTable)
                    if (res.code === 0) {
                        this.$message.success(res.msg)
                    }
                    if (res.code === 1) {
                        this.$confirm(res.msg, "提示", {
                            //type: 'warning'
                        }).then(() => {
                            const temp = this.operationTable.slice();
                            temp[0].baf405 = ''
                            temp[0].baf408name = ''
                            this.operationTable = temp;
                        })
                    }
                    if (res.code === 2) {
                        this.$confirm(res.msg, "提示", {
                            //type: 'warning'
                        }).then(() => {
                            this.$refs.child.showBox(this.dictInputDialog.dictType, res.data);
                        }).catch(() => {
                            //
                        });
                    }
                })
            }
        },

        /**
         * 打开特殊的录入框（过敏药物）
         * @param config inputConfig配置项
         */
        openSpecialDialog(config) {
            if (config.name === 'bazaDO.allergicDrugs') {
                if (this.inputValues['bazaDO.baza00']) {
                    this.allergicDrugsDialog.visible = true;
                    this.allergicDrugsDialog.baza00 = this.inputValues['bazaDO.baza00'];
                } else {
                    this.$message.error('病案号为空')
                }
            } else if (config.specialInput === 'pathologicDiagnosis') {
                if (this.inputValues['bazaDO.baza00']) {
                    this.pathologicDiagnosisDialog.visible = true;
                    this.pathologicDiagnosisDialog.baza00 = this.inputValues['bazaDO.baza00'];
                } else {
                    this.$message.error('病案号为空')
                }
            }
        },

        /**
         * 过敏药物提交
         * @param allergicDrugs
         */
        handleAllergicDrugsSubmit(allergicDrugs) {
            this.allergicDrugsDialog.visible = false;
            this.inputValues['bazaDO.allergicDrugs'] = allergicDrugs;
            utils.focusNext('bazaDO.allergicDrugs', false);
        },

        /**
         * 病理诊断提交
         */
        handlePathologicSubmit(firstItem) {
            this.inputValues['bazaDO.pathologicDiagnosisName'] = firstItem.baf203; // 诊断名称
            this.inputValues['bazaDO.pathologicDiagnosis'] = firstItem.baf207; // 诊断编码
            this.inputValues['bazaDO.baf202'] = firstItem.baf202; // 病理号
            this.pathologicDiagnosisDialog.visible = false;
            utils.focusNext('bazaDO.pathologicDiagnosisName', false); //
        },



        /* -------------------------------- 提交相关 ------------------------------------- */

        handleSubmit() {
            if (utils.originData) {
             //   console.log('+', utils.originData)
                this.rightLoading = true;
                this.errorInfo = {
                    visible: false,
                    height: 40,
                    errorData: [],
                    tableErrorObj: { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} },
                    errorObj: {}, // eg: {[inputConfig里的name]: true}
                    currentFocus: undefined
                }
                const type = this.submitType;
                const typeMsg = { edit: '修改', add: '新增' };
                const api = { add: AddBaza, edit: EditBaza };
                const params = this.groupParams(type);
                api[type](params).then(res => {
                    if (res && res.code === 0) {
                        this.$message.success(`${typeMsg[type]}成功`);
                    } else if (res && res.data) {
                        this.setErrorInfo(res)
                    } else {
                        this.$message.error(res && res.msg ? res.msg : `${typeMsg[type]}失败`)
                    }
                    this.rightLoading = false;
                }).catch(err => {
                    this.$message.error(`${typeMsg[type]}错误`);
                    this.rightLoading = false;
                })
                if (utils.originData.bazaDO.baza04) {
                    this.age = new Date().getFullYear() - Number(utils.originData.bazaDO.baza04.split('-')[0])
                }
                // iccm({
                //     "age": this.age,
                //     "icCode": utils.originData.baf4DO[0].baf408,
                //     "sex": utils.originData.bazaDO.baza03
                // }).then(res => {
                //     if (res.code === 0) {
                //         this.$message.success(res.msg)
                //     }
                // })
                // icd({
                //     "age": this.age,
                //     "icCode": utils.originData.bazaDO.baza38,
                //     "sex": utils.originData.bazaDO.baza03
                // }).then(res => {
                //     if (res.code === 0) {
                //         this.$message.success(res.msg)
                //     }
                // })
            }
        },

        handleReset(focusFirst) {
            this.inputValues = utils.initInputsValues();
            this.judge = { hospitalType: 'Both', isNewBaby: true, };
            // 动态的单位后缀,如年龄的单位需要根据具体的详情数据显示岁、月或日
            this.dynamicAfterObj = { ageAfter: '' };
            this.WesternDiagnoseTable = [{ type: 'main' }];
            this.ChineseDiagnoseTable = [{ type: 'main' }];
            this.operationTable = [];
            this.submitType = 'add';
            this.allergicDrugsDialog = { visible: false, allergicDrugsData: [], baza00: undefined };
            this.errorInfo = {
                tableErrorObj: { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} },
                visible: false, height: 40, errorData: [], errorObj: {}, currentFocus: undefined
            };
            utils.originData = {
                baf0DO: [],
                baf1DO: [],
                baf4DO: [],
                bazaDO: {},
                baf6DO: {},
                baf2DO: {}
            };
            utils.fixedFooterHeight = 120;
            focusFirst && this.$nextTick(() => {
                utils.focusNext(inputConfig[0].name, true)
            })
        },

        groupParams(type) {
            const params = utils.getSubmitParams(
                this.inputValues,
                this.allergicDrugsDialog.allergicDrugsData,
                this.pathologicDiagnosisDialog.diagnosisData,
                this.WesternDiagnoseTable,
                this.ChineseDiagnoseTable,
                this.operationTable
            );
            // 新增，处理必要的病案号等数据
            if (type === 'add') {
                // 病案号
                const baza00 = params.bazaDO.baza00;
                const baza01 = params.bazaDO.baza01;
                Object.keys(params).forEach(key => {
                    const dataItem = params[key]
                    if (Array.isArray(dataItem)) {
                        dataItem.forEach(item => { item.baza00 = baza00; item.baza01 = item.baza01 })
                    } else if (typeof dataItem === 'object' && dataItem !== null) {
                        dataItem.baza00 = baza00;
                        dataItem.baza01 = baza01;
                    }
                });
            }
            return params
        },

        /* -------------------------------- 错误提示 ------------------------------------- */

        // 展开或关闭错误提示
        triggerErrorVisible() {
            const nextVisible = !this.errorInfo.visible
            this.errorInfo.visible = nextVisible;
            this.animateErrorInfo(10, nextVisible);
            utils.fixedFooterHeight = nextVisible ? 300 : 120
        },

        // errorInfo展开收起的动画（20毫秒一次，共设置10次，所以动画时长200ms）
        animateErrorInfo(times, nextVisible) {
            if (times >= 1) {
                // 设置高度 20 * 10 + 40 = 300 errorInfo最高300px
                if (nextVisible) this.errorInfo.height = this.errorInfo.height + 20;
                else this.errorInfo.height = this.errorInfo.height - 20;
                // window滚动到底部（没有这么高的时候会自动滚到底部）
                // window.scrollTo('auto', 10000);
                this.timeout = setTimeout(() => {
                    this.animateErrorInfo(times - 1, nextVisible)
                }, 20)
            } else {
                clearTimeout(this.timeout)
            }
        },

        // 设置错误信息
        setErrorInfo(res) {
            const errorData = res.data.slice();
            const errorObj = {}; // 记录inputConfig中的输入项的错误 errorObj，用来给item变红
            const tableErrorObj = { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} }; // 三个表格内容的错误
            res.data.forEach((error, errIndex) => {
                // 先看是否为表格内的错误，从表格内容查找设置
                const { tableName, index, fieldName } = this.findErrorItemFromTable(error);
                if (tableName) {
                    tableErrorObj[tableName][`${fieldName}-${index}`] = true; // 将此字段记为错误
                    errorData[errIndex] = {
                        ...errorData[errIndex],
                        tableName, index, fieldName
                    }; // 记录此错误字段的信息，跳转聚焦时使用
                } else { // 否则从inputConfig中查找设置
                    const index = this.findErrorItemIndexFromConfig(error.column);
                    if (index >= 0) {
                        errorObj[inputConfig[index].name] = true; // 将此字段记为错误
                        errorData[errIndex].index = index; // 记录此字段在config中的索引，跳转聚焦时使用
                    }
                }
            });
            this.errorInfo.errorData = errorData
            this.errorInfo.tableErrorObj = tableErrorObj;
            this.errorInfo.errorObj = errorObj;
            !this.errorInfo.visible && this.triggerErrorVisible();
         //   console.log(this.errorInfo, 'errorInfo')
        },

        // 从三个表格中查找到此错误信息所在的表格名、行索引、错误字段
        findErrorItemFromTable(error) {
            // 由于西医诊断和中医诊断中使用的字段名与后台使用不同，先定义接口字段名和表格字段名的对应关系
            const fieldMap = {
                // 西医诊断
                WesternDiagnoseTable: {
                    westernmedicine: 'diseaseName-main', // 主诊断 疾病名称
                    baza38: 'diseaseName-main', // 主诊断 疾病编码
                    baza65: 'diseaseName-main', // 主诊断 疾病icd10 （这三个都只需diseaseName名称调字典后代码设置）
                    bazafa: 'entryState-main', // 主诊断 入院病情
                    baza41: 'turnReturn-main', // 主诊断 转归
                    baf103name: 'diseaseName-other', // 次诊断 疾病名称
                    baf103: 'diseaseName-other', // 次诊断 疾病编码
                    baf111: 'diseaseName-other', // 次诊断 疾病icd10
                    baf108: 'entryState-other', // 次诊断 入院病情
                    baf105: 'turnReturn-other', // 次诊断 转归
                },
                // 中医诊断
                ChineseDiagnoseTable: {
                    baf906name: 'diseaseName-main', // 主诊断 疾病名称
                    baf906: 'diseaseName-main', // 主诊断 疾病编码
                    baf908: 'entryState-main', // 主诊断 入院病情
                    baf916: 'turnReturn-main', // 主诊断 转归
                    baf003name: 'diseaseName-other', // 次诊断 疾病名称
                    baf003: 'diseaseName-other', // 次诊断 疾病编码
                    baf004: 'entryState-other', // 次诊断 入院病情
                    baf005: 'turnReturn-other'// 次诊断 转归
                },
                // 手术是一致的
                operationTable: {
                    baf405: 'baf408name', // 手术编码(字典关联的)
                    baf408: 'baf408name', // 名称编码
                    baf408name: 'baf408name', // 名称
                    baf411: 'baf411', // 日期
                    baf404: 'baf404', // 级别
                    baf409: 'baf409', // 术者
                    baf414: 'baf414', // I助
                    baf415: 'baf415', // II助
                    baf412: 'baf412', // 切口
                    baf413: 'baf413', // 愈合等级
                    baf410: 'baf410name', // 麻醉方式（字典关联的）
                    baf416: 'baf416', // 麻醉医师
                }
            };
            // 查找有无
            const westerName = fieldMap.WesternDiagnoseTable[error.column];
            const chineseName = fieldMap.ChineseDiagnoseTable[error.column];
            const operationName = fieldMap.operationTable[error.column];
            if (westerName) {
             //   console.log(error.column, westerName, '西医表格错误字段')
                // 后台主诊断数据在bazaDO中，次诊断数据在baf1DO list 中，次诊断有序号，主没有，但前端显示是在一个表格内，
                const field = westerName.split('-');
                return {
                    tableName: 'WesternDiagnoseTable',
                    index: field[1] === 'main' ? this.WesternDiagnoseTable.findIndex(item => item.type === 'main') : (error.xh - 1),
                    fieldName: field[0]
                }
            } else if (chineseName) {
             //   console.log(error.column, chineseName, '中医表格错误字段')
                const field = chineseName.split('-');
                return {
                    tableName: 'ChineseDiagnoseTable',
                    index: field[1] === 'main' ? this.ChineseDiagnoseTable.findIndex(item => item.type === 'main') : (error.xh - 1),
                    fieldName: field[0]
                }
            } else if (operationName) {
               // console.log(error.column, operationName, '手术表格错误字段')
                return { tableName: 'operationTable', index: error.xh - 1, fieldName: operationName }
            } else {
                return {}
            }
        },

        // 从inputConfig中找到错误项的索引
        // 查找方法：inputConfig某项的name包含row.column或者某项的relationFields中dm关联字段包含row.column
        findErrorItemIndexFromConfig(column) {
            const index = inputConfig.findIndex(item => {
                const inName = item.name.indexOf(column) >= 0;
                if (inName) return true;
                if (item.relationFields && item.relationFields.length) {
                    const dmIndex = item.relationFields.findIndex(field => field.indexOf('dm/') >= 0);
                    return dmIndex >= 0 ? item.relationFields[dmIndex].indexOf(column) >= 0 : false
                }
                return false
            });
            return index;
        },

        // 点击错误信息行 跳转到错误输入项
        jumpToErrInput(row) {
          //  console.log(row, '错误行');
            if (row.tableName) { // 有tableName，说明是表格内的错误项
                // 聚焦到表格此项
                this.tableFocusNext(row.tableName, row.index, row.fieldName, true);
                // 闪烁
                const el = document.getElementById(`${row.tableName}${row.index}${row.fieldName}`)
                el && this.animateTableError(el, 7);
            } else if (row.index >= 0) { // 否则若index>=0,则说明是输入项的错误
                let item = inputConfig[row.index]
                if (item.disabled || this.dynamicDisabledObj[item.name]) {
                    item = inputConfig[row.index - 1]
                }
                this.errorInfo.currentFocus = item.name;
                utils.focusNext(item.name, true);
                this.$nextTick(() => {
                    this.errorInfo.currentFocus = undefined
                })
            } else { // 其他的就找不到了
                this.$message.error('未找到该项')
            }
        },

        // 表格错误闪烁
        animateTableError(el, times) {
            const colors = ['#F56C6C', '#ffffff'];
            el.style = `background: ${colors[times % 2]}`;
            const restTimes = times - 1;
            if (restTimes > 0) {
                setTimeout(() => {
                    this.animateTableError(el, restTimes)
                }, 200)
            } else {
                el.style = ''
            }
        },

        //复选字典
        againDictionaries(type, list) {
            if (type === 'westernDiagnoseDict') {
                const temp = this.WesternDiagnoseTable.slice();
                temp[0].diseaseName = list.dmmc
                temp[0].ICD10 = list.icdCode
                this.WesternDiagnoseTable = temp;
            }
            if (type === 'operationDict') {
                const operation = this.operationTable.slice();
                operation[0].baf405 = list.icdCode
                operation[0].baf408name = list.dmmc
                this.operationTable = operation;
            }

        }

    }
}

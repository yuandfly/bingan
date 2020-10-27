import TopFilter from './components/top-filter';
import { SearchHomePage, QueryPatient, EditBaza, AddBaza, AuditBaza, cost } from "../../api";
import { RandomSearch } from '../../api/randomSearch';
import { UnionSearch } from '../../api/groupSearch';
import PagingToolbar from "../../components/toolbar/paging";
import InputItem from './components/input-item';
import DictInput from '../../components/dialog/dict-input';
import AllergicDrugsInput from './components/allergic-drugs-input'; // 过敏药物录入
import PathologicDiagnosisInput from './components/pathologic-diagnosis-input'; // 病理诊断录入

import ChangeDepartmentInput from './components/change-department-input'; // 转科科别录入
import DragDialog from './components/drag-dialog'; // 拖拽dialog
import TutelageDialog from './components/tutelage-dialog'; // 重症监护信息
import NewbabyDialog from './components/newbaby-dialog'; // 新生儿信息
import draggable from "vuedraggable";
import inputConfig from "./config/inputConfig";
import utils from './utils';
import {formatDate, DateDiff, randomStr, MonthsBetw, getDaysBetween} from "../../utils";
import { mapMutations } from "vuex";
import fi from "element-ui/src/locale/lang/fi";
import crypto from "@/common/js/crypto.js";
import clickoutside from "element-ui/src/utils/clickoutside";
import editPatientCode from './components/editPatientCode';
import current from 'element-ui/packages/table/src/store/current';
import dieInfoDialog from './components/die-info-dialog';

let timeOut = undefined;
export default {
    components: { dieInfoDialog, TopFilter, editPatientCode, PagingToolbar, InputItem, DictInput, TutelageDialog, NewbabyDialog,  draggable, AllergicDrugsInput, PathologicDiagnosisInput, ChangeDepartmentInput, DragDialog },
    directives: { clickoutside },

    data() {
        return {
            // 获取屏幕高度
            AsideHeight: document.documentElement.clientHeight - 275,
            MainHeight: document.documentElement.clientHeight - 245,
            // 初始化需要动态改变的对象
            dynamic: {
                baf810: undefined, // 身份证类型
                baza05: undefined, // 身份证号
                baf811: undefined, // 其它身份证
                bazaf3: undefined, // 新生儿出生体重
                bazagc: undefined, // apgar评分
                bazaf4: undefined, // 新生儿入院体重
                bafc02: undefined, // 红细胞
                bafc03: undefined, // 血小板
                bafc04: undefined, // 血浆
                bafc05: undefined, // 全血
                bafc11: undefined, // 自体血回输
                bazag5: undefined, // 重症监护信息
                bazace: undefined,
                baf805: undefined, // 退出原因
                baf807: undefined, // 变异原因
                "bazad7.days": undefined, // 颅脑损伤昏迷 入院前
                "bazad7.hours": undefined,
                "bazad7.minutes": undefined,
                "bazad8.days": undefined,// 颅脑损伤昏迷 入院后
                "bazad8.hours": undefined,
                "bazad8.minutes": undefined,
                bazaf8: undefined, // 离院方式,
                bazaa7: undefined, // 入院途径为 其它机构 ，填入其它机构名称

            },

            test: undefined,
            // 左侧是否展开
            isExpand: false,
            // 右侧内容的loading
            rightLoading: false,
            // 三段输入项配置
            filters:{
                outTime: [
                    formatDate(new Date(), "YYYY-01-01"),
                    formatDate(new Date(), "YYYY-MM-DD")
                ],
                startTime: formatDate(new Date(), "YYYY-01-01"),
                endTime: formatDate(new Date(), "YYYY-MM-DD"),
                years: '2020',
                state: '0'
            },
            firstInputs: inputConfig.slice(0, 64),
            secondInputs: inputConfig.slice(64, 95),
            thirdInputs: inputConfig.slice(95, 149),
            fourthlyInputs: inputConfig.slice(149, inputConfig.length),

            // 顶部筛选和左侧表格相关
            list: {
                filters: { outTime: [
                        formatDate(new Date(), "YYYY-01-01"),
                        formatDate(new Date(), "YYYY-MM-DD")
                    ],
                    years: '2020',
                    state: '0' },
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
                isTutelage: true, // 是否显示 实施重症监护
            },
            // 动态的单位后缀,如年龄的单位需要根据具体的详情数据显示岁、月或日
            dynamicAfterObj: {
                ageAfter: {
                    options: [
                        { label: '岁', value: 'Y' },
                        { label: '月', value: 'M' },
                        { label: '天', value: 'D' },

                    ],
                    value: 'Y',
                    disable: true,
                    name: 'bazaDO.bazaa1'
                }, // 年龄的单位后缀

            },

            // 动态的单位前缀,
            dynamicBeforeObj: {
                cardBefore: {
                    options: [
                        {label: '居民身份证', value: '1'},
                        {label: '中国人民解放军军人身份证件', value: '2'},
                        {label: '中国人民武装警察身份证件', value: '3'},
                        {label: '港澳居民来往内地通行证', value: '4'},
                        {label: '台湾居民来往大陆通行证', value: '5'},
                        {label: '护照', value: '6'},
                        {label: '其它', value: '9'},
                    ],
                    value: '1',
                    name: 'baf8DO.baf810'
                }, // 身份证的单位前缀
            },
            // 西医诊断表格数据
            WesternDiagnoseTable: [{ type: 'main' }],
            // 中医诊断表格数据
            ChineseDiagnoseTable: [{ type: 'main' }],
            // 手术表格数据
            operationTable: [],
            // 表格当前高亮行的索引
            tableActiveRow: {
                operationTable: undefined,
                ChineseDiagnoseTable: undefined,
                WesternDiagnoseTable: undefined
            },
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

            // 转科科别录入框
            changeDepartmentDialog: {
              visible: false,
              enterDate: undefined,
              baza00: undefined,
              departmentData: []
            },
            // 重症监护录入框
            intensiveCareDialog: {
              visible: false,
              enterDate: undefined,
              baza00: undefined,
              TutelageData: [],
                totalTime: "",
                rysj: undefined, // 住院日期
                cysj: undefined, // 出院日期
            },
            // 新生儿信息录入框
            NewBaby: {
              visible: false,
              enterDate: undefined,
              baza00: undefined,
              newBabyData: []
            },
            dieInfo: {
              visible: false,
                swsjhz: undefined,
              baza00: undefined,
              dieInfoData:  {}
            },
            // 其他一些下拉选项
            optionData: {
                // 转归
                turnReturn: [
                    { label: '治愈', value: '1' }, { label: '好转', value: '2' },
                    { label: '未愈', value: '3' }, { label: '死亡', value: '4' },
                    { label: '其他', value: '5' },
                ],

                // 诊断类别
                zdType: [
                    { label: '院内感染', value: '1' },
                    { label: '并发症', value: '4' },
                    { label: '空', value: '0' },
                ],
                // 感染部位
                grType: [
                    { label: '上呼吸道', value: '0' },
                    { label: '泌尿道', value: '1' },
                    { label: '下呼吸道', value: '2' },
                    { label: '胃肠道', value: '3' },
                    { label: '烧伤', value: '4' },
                    { label: '术后伤口', value: '5' },
                    { label: '皮肤', value: '6' },
                    { label: '腹腔', value: '7' },
                    { label: '败血症', value: '8' },
                    { label: '其它', value: '9' },
                ],
                // 手术有关
                ssType: [
                    { label: '是', value: '1' },
                    { label: '否', value: '2' }
                ],
                // 手术级别
                operationLevel: [
                    { label: '无', value: undefined }, { label: '一级', value: '1' }, { label: '二级', value: '2' },
                    { label: '三级', value: '3' }, { label: '四级', value: '4' },
                ],
                // 切口
                incision: [{ label: '无', value: undefined },{ label: '0', value: '0' }, { label: 'I', value: '1' },
                    { label: 'II', value: '2' }, { label: 'III', value: '3' },
                ],
                // 愈合等级
                healingLevel: [
                    { label: '无', value: undefined }, { label: '甲', value: '1' }, { label: '乙', value: '2' }, { label: '丙', value: '3' }, { label: '其它', value: '9' },
                ],
                // 入院病情
                entryState: [
                    { label: '有', value: '1' }, { label: '临床未确定', value: '2' },
                    { label: '情况不明', value: '3' }, { label: '无', value: '4' },
                ],
                // 手术类型
                opetationType: [
                    {label: '无', value: undefined}, {label: '择期手术', value: '1'}, {label: '急诊手术', value: '2'}, {label: '限期手术', value: '3'}
                ],
                // 麻醉等级
                opetationLevel: [
                    {label: '无', value: undefined},
                    {label: 'P1级', value: '1'},
                    {label: 'P2级', value: '2'},
                    {label: 'P3级', value: '3'},
                    {label: 'P4级', value: '4'},
                    {label: 'P5级', value: '5'},
                    {label: 'P6级', value: '6'},
                ],
                // 手术/操作类别 ②1.手术  2.介入治疗  3.治疗性操作  4.诊断性操作
                operationProperty: [
                    { label: '无', value: undefined },{ label: '手术', value: '1' }, { label: '介入治疗', value: '2' },
                    { label: '治疗性操作', value: '3' }, { label: '诊断性操作', value: '4' },{ label: '中医治疗性操作', value: '5' },
                ],
                // 手术/操作类别 ②1.手术  2.介入治疗  3.治疗性操作  4.诊断性操作
                dayTimeOperation: [
                    { label: '是', value: '1' },
                    { label: '否', value: '0' }
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
            },


            // 扣分项信息
            scoreInfo: {
                visible: false,
                height: 40,
                scoreData: [],
                tableErrorObj: { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} },
                scoreObj: {}, // eg: {[inputConfig里的name]: true}
                currentFocus: undefined,
                fraction: undefined
            },

            HIS: {
                visible: false,
                title: undefined,
                type: undefined, // diagnose or operation
                data: []
            }

        }
    },

    computed: {
        // 动态的禁用状态，如离院方式，需inputConfig中设置valuesToJumpNext
        dynamicDisabledObj() {
            return {
                'bazaDO.baza00': this.submitType === 'edit',
                // 在入院目的是否禁用：是否有出院31天内再住院计划不为1就禁用
                'bazaDO.bazad6': this.inputValues['bazaDO.bazad5'] !== '2',
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
    activated () {
        console.log('activated');
    },
    created() {
        // 找到需要根据条件动态修改的index
        for (let item in this.dynamic) {
            this.dynamic[item] = inputConfig[this.findErrorItemIndexFromConfig(item)];
        }
      //  console.log(this.dynamic);
    },

    mounted() {
        console.log(this.AsideHeight)
        // console.log(this.$store.state.homepage, 'orign')
        // 从组合查询、随机查询跳转过来的，直接获取病案详情
        const { baza00, searchData } = this.$store.state.homepage;
        if (baza00) {
            // 设置左侧表格
            this.list.pager = searchData.pager;

            this.list.tableData = searchData.tableData;
          //  console.log(this.list.tableData)
            // 获取详情
            this.handleLeftRowClick({ baza00 });
        } else {
            this.handleSearch(this.filters); // 获取左侧列表
        }


    },
    watch: {
        'WesternDiagnoseTable': {
            handler: function (value) {
             //   console.log(value);
            }
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


        openHIS(type) {
            this.HIS.visible = true;
            this.HIS.title = type === 'diagnose' ? 'HIS原始诊断' : 'HIS原始信息';
            // 若当前type和本次需打开的type不一样，或者数据为空，则需要重新生成数据
            if (type !== this.HIS.type || !this.HIS.data.length) {
                if (type === 'diagnose') {
                    this.HIS.data = [
                        {diagnoseType: '门急诊诊断', diagnoseName: '哈哈', icd10: 'asf', entryState: '1', turnReturn: '0'},
                        {diagnoseType: '入院诊断', diagnoseName: '哈哈', icd10: 'asf', entryState: '1', turnReturn: '0'},
                        {diagnoseType: '出院主诊断', diagnoseName: '哈哈', icd10: 'asf', entryState: '1', turnReturn: '0'},
                        {diagnoseType: '其他诊断 1', diagnoseName: '哈哈', icd10: 'asf', entryState: '1', turnReturn: '0'},
                    ]
                } else {
                    this.HIS.data = [{icd10: '45678', operationName: 'zvdd'}]
                }
            }
            this.HIS.type = type;
          //  console.log(this.HIS)
        },

        // table textarea自适应高度
        inputInfo( id) {
            if (id) {
                let textArea = document.getElementById(id);
                textArea.style.height = '20px'
                textArea.style.height = textArea.scrollHeight + 'px'
            } else {
                let textArea = document.getElementsByTagName('textarea');

                for (let i = 0;i< textArea.length;i++) {
                    this.inputInfo(textArea[i].id);
                }
            }
        },

        /* -------------------------------- 左侧列表相关 ------------------------------------- */

        /**
         * 顶部筛选
         * @param filters: topFilters组件处理过的查询条件
         */
        handleSearch(filters) {
            console.log(filters);
            this.filters = filters;
            this.list.filters = this.filters;
            this.list.pager = { ...this.list.pager, page: 1 };
            console.log(this.list);
            this.getList( { page: 1, rows: this.list.pager.rows })
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
                this.getList( this.list.pager)
            }
        },

        // 展开收起
        handleExpand() {

            this.isExpand = !this.isExpand;
            // console.log(this.$refs.leftTable);
            this.$refs.leftTable.doLayout()
        },

        /**
         * 页面搜索获取左侧列表数据
         * @param filters 筛选条件
         * @param pager 分页条件
         */
        getList( pager) {

            this.list.loading = true;
            this.list.selectedKeys = [];
            SearchHomePage({ ...this.filters, page: pager.page, limit: pager.rows }).then(res => {
                if (res && res.data) {
                    this.list.pager.total = res.data.total;
                    this.list.tableData = res.data.content;
                 //   console.log(this.list.tableData)

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
                let adminData = JSON.parse(crypto.decrypt(sessionStorage.getItem("sessionUser"))).adminData;
                AuditBaza({
                    bazaId: this.list.selectedKeys,
                    adminDO: adminData
                }).then(res => {
                    this.$message.success('审核成功');
                    this.getList( { page: 1, rows: this.list.pager.rows })
                }).catch(err => {
                    this.$message.error('审核失败')
                })
            } else {
                this.$message.info('请先勾选需要审核的数据')
            }
        },

        // table 诊断类别change
        zdlbChange(item) {
            console.log(item);
                this.$set(item, 'baf109', '');
                this.$set(item, 'baf107', '');


        },

        // 修改病案号后 刷新病案信息
        editPatient(page, baza00) {
            this.getList(page);
            this.queryPatient(baza00);
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

            this.queryPatient(row.baza00);

            if (this.isExpand) {
                this.isExpand = !this.isExpand;
                this.$refs.leftTable.doLayout()
            }
        },
        dragTable(ev) {
            console.log(this.WesternDiagnoseTable);
            if (ev.newIndex === 0 || ev.oldIndex === 0) {
                this.WesternDiagnoseTable[0].type === 'main';
            }
            console.log(ev);
        },
        // 查询病案列表
        queryPatient (baza00) {
            QueryPatient(baza00).then(res => {

                if (res && res.code === 0) {
                    const { data } = res;
                    //   console.log(data);
                    // 设置提交类型为修改
                    this.submitType = 'edit';
                    // 记录原始数据
                    utils.originData = data;
                    // 记录复制的原始数据以作为修改对比
                    utils.copyOriginData = JSON.parse(JSON.stringify(data));
                    // 整理一些判断点
                    const western = data.bazaDO.baza65; const chinese = data.baf9D && data.baf9D.baf902;
                    this.judge = {
                        hospitalType: 'Both', // western && chinese ? 'Both' : (western ? 'Western' : 'Chinese')
                        isNewBaby: data.bazaDO.bazaa1 === 'M' || data.bazaDO.bazaa1 === 'D',
                    };
                    this.dynamicAfterObj = {
                        ageAfter: {
                            options: [

                                {label: '岁', value: 'Y'},
                                {label: '月', value: 'M'},
                                { label: '天', value: 'D' },
                            ],
                            value: data.bazaDO.bazaa1,
                            disable: true,
                            name: 'bazaDO.bazaa1'
                        }
                    };

                    // 动态的前缀单位名称
                    this.dynamicBeforeObj = {
                        cardBefore: {
                            options: [
                                {label: '居民身份证', value: '1'},
                                {label: '中国人民解放军军人身份证件', value: '2'},
                                {label: '中国人民武装警察身份证件', value: '3'},
                                {label: '港澳居民来往内地通行证', value: '4'},
                                {label: '台湾居民来往大陆通行证', value: '5'},
                                {label: '护照', value: '6'},
                                {label: '其它', value: '9'},
                            ],
                            value: '1',
                            name: 'baf8DO.baf810'
                        }
                    };
                    // 所有输入项的值
                    this.inputValues = utils.setInputValues(data);
                    if (!this.inputValues['bazaDO.baza59']) {
                        this.inputValues['bazaDO.baza59'] = this.userName()

                    }
                    //  console.log(this.inputValues);
                    // console.log(1, this.inputValues)
                    // 过敏药物数据
                    this.allergicDrugsDialog.allergicDrugsData = data.baf5DO || [];
                    // 病理诊断数据，(加个唯一key，el-table表格拖拽时必须指定row-key，否则拖拽或数据错乱)
                    this.pathologicDiagnosisDialog.diagnosisData = (data.baf2DO || []).map(item => ({ ...item, key: randomStr(8) }));
                    // 西医诊断表格数据
                    this.WesternDiagnoseTable = utils.setWesternDiagnoseTable(data);
                    // 中医诊断表格数据
                    this.ChineseDiagnoseTable = utils.setChineseDiagnoseTable(data);
                    // 手术表格
                    this.operationTable = utils.setOperationTable(data);
                    // 使第一个输入项获取焦点
                    utils.focusNext('bazaDO.baza01', true);

                    // 死亡尸检是否开启
                    console.log(this.WesternDiagnoseTable[0]);
                    this.setDieState(this.WesternDiagnoseTable[0]);

                    // 重症监护信息显示
                    if (this.inputValues['bazaDO.bazag5'] === '2') {
                        this.dynamic['bazag5'].isBtnAfter = false;
                        this.intensiveCareDialog.TutelageData = this.inputValues['baf7DO'];
                        //      console.log(this.intensiveCareDialog.TutelageData);
                    } else {
                        this.dynamic['bazag5'].isBtnAfter = true;
                    }

                    // 死亡信息显示
                    this.setDieInfo();

                    // 儿童信息显示
                    this.NewBaby.newBabyData = this.inputValues['bafaDO'];

                    // 儿童显示条件check
                    this.checkNewBaby();

                    //输血反应 开启条件
                    this.transfusion();

                    // 身份证类型
                    this.checkCardType();


                    // 完成及变异情况
                    this.Checkfinish();

                    // 身份类型默认 居民身份证
                    if (!this.inputValues['baf8DO.baf810']) {
                    this.inputValues['baf8DO.baf810'] = '1';
                    }

                    // 入院途径 为其它医院转入 可填机构名称
                    if (this.inputValues['bazaDO.baza56'] === '3') {
                        console.log(this.dynamic['bazaa7']);
                        this.dynamic['bazaa7'].disabled = false;
                    } else {
                        this.dynamic['bazaa7'].disabled = true;
                    }

                    setTimeout(() => {
                        this.inputInfo();
                    }, 200);
                    //   console.log(this.inputValues);

                    // 初始化扣分项信息
                    this.setScoreInfo(data.kfjlDO);
                    this.scoreInfo.fraction = data.fraction;
                    console.log(this.scoreInfo);
                } else {
                    this.$message({ type: 'error', message: '获取失败' });
                }
                this.rightLoading = false;
            }).catch((e) => {
                this.rightLoading = false;
                console.log(e);
                this.$message({ type: 'error', message: '初始化错误' });
            })

        },


        // 下拉框数字按键事件。按对应数字，填入对应的值
        handleSelectEnterNum(e, options, ref, item, key) {
            // 按了"点" 如1.2
            if (e.keyCode === 190) {
                this.isDecimal = true; // 记为是小数
                return;
            }
            let val = null;



            const values = options.map(item => Number(item.value));
            // 得到数字对应的keyCode
            let v1 =  values.map(item => (48 + item));
            let v2 =  values.map(item => (96 + item));


            // 输入小数
            if (this.isDecimal && options.some(item => item.value.indexOf('.') >= 0)) {
                val = '1.' + String(e.keyCode - 48);
            } else if (v1.indexOf(e.keyCode) >= 0 ) { // 输入整数
                console.log(e.keyCode);
                val = String(e.keyCode - 48);
            } else if (v2.indexOf(e.keyCode) >= 0 ) { // 输入整数
                console.log(e.keyCode);
                val = String(e.keyCode - 96);
            } else if (e.keyCode === 115) {
                val = undefined;
            }
            // 找到当前值在options里的index，手动给select设置当前hover索引，否则按enter键后值会设置为hoverIndex处的option.value
            const index = options.findIndex(item => item.value == val);
            console.log(index);
            console.log(index);
            if (index >= 0) {
                console.log(ref, this.$refs[ref]);
                this.$refs[ref][0].hoverIndex = index;
               item[key] = val;
                console.log(item, e.keyCode, val);
                this.isDecimal = false;
            }
        },


        // 若有值，聚焦不显示下拉，空格显示
        triggerSelectVisible(visible, ref) {
            console.log(this.$refs[ref][0], visible);
            setTimeout(() => {
                this.$refs[ref][0].visible = visible;
            }, 20)
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

        handleInputItemChange(name, value, computed,) {
            console.log(this.inputValues, name, value);
            if (this.inputValidate(name, value)) {
                return;
            }

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

            // 出生日期  出院日期 不足一年 计算月份
            if (name === 'bazaDO.baza24' || name === 'bazaDO.baza04') {
                let monthDiff = MonthsBetw(this.inputValues['bazaDO.baza04'], this.inputValues['bazaDO.baza24']);
                if (monthDiff < 12) {

                    if (monthDiff === 1) {
                        this.inputValues['bazaDO.bazaa1'] = 'D';
                        this.$set(this.dynamicAfterObj.ageAfter, 'value', this.inputValues['bazaDO.bazaa1']);
                    } else {
                        this.inputValues['bazaDO.bazaa1'] = 'M';
                        this.$set(this.dynamicAfterObj.ageAfter, 'value', this.inputValues['bazaDO.bazaa1']);
                    }
                } else {
                    this.inputValues['bazaDO.bazaa1'] = 'Y';
                }
            }

            // 病理号
            if (name === 'bazaDO.baf202') {
                const firstItem = this.pathologicDiagnosisDialog.diagnosisData[0];
              //  this.pathologicDiagnosisDialog.diagnosisData[0] = { ...firstItem, baf202: value, baf208: 1, baza00: this.inputValues['bazaDO.displaybaza00'] };
                this.$set(this.pathologicDiagnosisDialog.diagnosisData, '0', { ...firstItem, baf202: value, baf208: 1, baza00: this.inputValues['bazaDO.displaybaza00'] });
            }

            //输血量 为 1 或 2 时 后面几个相关值可以输入
            this.transfusion();

            // 实施重症监护 为 2 时，重症监护信息按钮可以点击
            if (name ==='bazaDO.bazag5' && value === '2') {
                this.dynamic['bazag5'].isBtnAfter = false;
            } else if (name ==='bazaDO.bazag5' && value === '1'){
                this.dynamic['bazag5'].isBtnAfter = true;
            }


            // 死亡信息显示
            this.setDieInfo();

            // 身份类型选择
            if (name === 'baf8DO.baf810') {
               this.checkCardType();
            }

            if (name === 'baf8DO.baf804' || name === 'baf8DO.baf806'  ) {
                // 完成变异情况
                this.Checkfinish();
            }


            //如果出院诊断不是Z37，但性别为女并且年龄12岁以上，可以填“新生儿出生体重”，当填写了“新生儿出生体重”后，“新生儿信息按钮”才可用。
            this.checkNewBaby();

            // 肿瘤分期字段拼接
            if ((name === 'zlfqt' || name === 'zlfqn' || name === 'zlfqm') &&  this.inputValues['zlfqt'] &&  this.inputValues['zlfqn'] &&  this.inputValues['zlfqm'] ) {
                    this.inputValues['bazaDO.bazagb'] = `T${this.inputValues['zlfqt']}N${this.inputValues['zlfqn']}M${this.inputValues['zlfqm']}`;
            }

            // 街村地址记忆
            if (name === 'bazaDO.bazaf7') {
                this.inputValues['bazaDO.baza13'] = this.inputValues['bazaDO.baza18'] = this.inputValues['bazaDO.bazaf7'];
            }

            // 中医药费用
            console.log(!Number(this.inputValues['baf6DO.baf633']));
            if (
                !Number(this.inputValues['baf6DO.baf633']) &&
                !Number(this.inputValues['baf6DO.baf617']) &&
                !Number(this.inputValues['baf6DO.baf634']) &&
                !Number(this.inputValues['baf6DO.baf635']) &&
                !Number(this.inputValues['baf6DO.baf636']) &&
                !Number(this.inputValues['baf6DO.baf637']) &&
                !Number(this.inputValues['baf6DO.baf638']) &&
                !Number(this.inputValues['baf6DO.baf639']) &&
                !Number(this.inputValues['baf6DO.baf640']) &&
                !Number(this.inputValues['baf6DO.baf641']) &&
                !Number(this.inputValues['baf6DO.baf642']) &&
                !Number(this.inputValues['baf6DO.baf620']) &&
                !Number(this.inputValues['baf6DO.baf643']) &&
                !Number(this.inputValues['baf6DO.baf621'])
            ) {
                this.inputValues['bazaDO.baza55'] = '3';
            }

            // 入院途径 为其它医院转入 可填机构名称
            if (this.inputValues['bazaDO.baza56'] === '3') {
                console.log(this.dynamic['bazaa7']);
                this.dynamic['bazaa7'].disabled = false;
            } else {
                this.dynamic['bazaa7'].disabled = true;
            }


        },

        // 死亡详情
        setDieInfo () {
            // 死亡信息显示
            if (this.inputValues['bazaDO.bazaf8'] === '5') {
                this.dynamic['bazaf8'].isBtnAfter = false;
                console.log(this.inputValues['baf3DO'])
                this.dieInfo.dieInfoData = this.inputValues['baf3DO'];
                //      console.log(this.intensiveCareDialog.TutelageData);
            } else {
                this.dynamic['bazaf8'].isBtnAfter = true;
            }
        },
        Checkfinish () {
            console.log(this.inputValues['baf8DO.baf804'], this.dynamic['baf805'])
            if (this.inputValues['baf8DO.baf804'] === '2') {
                this.$set( this.dynamic['baf805'], 'disabled', false)
            } else {
                this.$set( this.dynamic['baf805'], 'disabled', true)
            }
            if (this.inputValues['baf8DO.baf806'] === '2') {
                this.dynamic['baf807'].disabled = false;
            } else {
                this.dynamic['baf807'].disabled = true;
            }
        },
        // 输血量 开启条件
        transfusion () {
       //     console.log(this.inputValues['bazaDO.baza57']);
            if (this.inputValues['bazaDO.baza57'] === '1' || this.inputValues['bazaDO.baza57'] === '2') {
                    this.dynamic['bafc02'].disabled = false;
                    this.dynamic['bafc03'].disabled = false;
                    this.dynamic['bafc04'].disabled = false;
                    this.dynamic['bafc05'].disabled = false;
                     this.dynamic['bafc11'].disabled = false;
            }  else {
             //   console.log(this.dynamic['bafc04']);
                this.dynamic['bafc04'].disabled = true;
                this.dynamic['bafc05'].disabled = true;
                this.dynamic['bafc11'].disabled = true;
                this.dynamic['bafc03'].disabled = true;
                this.dynamic['bafc02'].disabled = true;
            }
        },


        // 新生儿体重 新生儿信息 开启条件
        checkNewBaby () {

           setTimeout(() => {
               // 如果主要诊断包含z37
               if (this.WesternDiagnoseTable[0]['ICD10'] && this.WesternDiagnoseTable[0]['ICD10'].includes('Z37')) {
                   console.log(this.firstInputs);
                   this.dynamic['bazaf3'].disabled = false; // 开启新生儿出生体重
                   this.dynamic['bazaf3'].isBtnAfter = false; // 开启新生儿信息按钮
               } else {
                   // 如果出院诊断不是Z37，但性别为女并且年龄12岁以上，可以填“新生儿出生体重”，当填写了“新生儿出生体重”后，“新生儿信息按钮”才可用。
                   // 如果性别为女
                   if (this.inputValues['bazaDO.baza03'] === '2' ) {
                        // 如果年龄大于12岁
                       if ( this.inputValues['bazaDO.bazaa1'] === 'Y') {
                           if (Number(this.inputValues['bazaDO.baza06.normal']) > 12) {
                               this.dynamic['bazaf3'].disabled = false;
                               console.log(this.firstInputs, this.inputValues['bazaDO.bazaf3']);
                               if(!this.inputValues['bazaDO.bazaf3']) {

                                   this.dynamic['bazaf3'].isBtnAfter = true;
                               } else {
                                   this.dynamic['bazaf3'].isBtnAfter = false;
                               }
                               this.dynamic['bazagc'].disabled = true;
                               this.dynamic['bazaf4'].disabled = true;
                           } else {
                               this.dynamic['bazaf3'].disabled = true;
                               this.dynamic['bazaf3'].isBtnAfter = true;
                               this.dynamic['bazagc'].disabled = true;
                               this.dynamic['bazaf4'].disabled = true;
                           }

                       } else  if ( this.inputValues['bazaDO.bazaa1'] === 'D') {
                           // 如果年龄小于28天
                           console.log(this.inputValues['bazaDO.baza06.normal']);
                           if (Number(this.inputValues['bazaDO.baza06.normal']) <= 28) {
                               this.dynamic['bazaf3'].disabled = true;
                               this.dynamic['bazaf3'].isBtnAfter = true;
                               this.dynamic['bazagc'].disabled = false;
                               this.dynamic['bazaf4'].disabled = false;
                           } else {
                               this.dynamic['bazaf3'].disabled = true;
                               this.dynamic['bazaf3'].isBtnAfter = true;
                               this.dynamic['bazagc'].disabled = true;
                               this.dynamic['bazaf4'].disabled = true;
                           }

                       } else if (this.inputValues['bazaDO.bazaa1'] === 'M') {
                            // 如果年龄单位为月份
                           this.dynamic['bazaf3'].disabled = true;
                           this.dynamic['bazaf3'].isBtnAfter = true;
                           this.dynamic['bazagc'].disabled = true;
                           this.dynamic['bazaf4'].disabled = true;
                          }



                   } else  if (this.inputValues['bazaDO.baza03'] === '1' ) {
                       // 如果出院诊断不是Z37，但性别为为男，且年龄大于28天
                       this.dynamic['bazaf3'].disabled = true;
                       this.dynamic['bazaf3'].isBtnAfter = true;
                       if (Number(this.inputValues['bazaDO.baza06.normal']) <= 28 && this.inputValues['bazaDO.bazaa1'] === 'D') {
                           this.dynamic['bazagc'].disabled = false;
                           this.dynamic['bazaf4'].disabled = false;
                       } else {
                           this.dynamic['bazagc'].disabled = true;
                           this.dynamic['bazaf4'].disabled = true;
                       }
                           this.inputValues['bazaDO.bazaf3'] = null;

                   }

               }
            }, 0);
            // 如果主要诊断为 z37


        },
        // 颅脑昏迷
        checkLLHM () {
            console.log(this.dynamic);
            if (this.WesternDiagnoseTable[0]['ICD10'] && this.WesternDiagnoseTable[0]['ICD10'].includes('S06')) {
                this.dynamic['bazad7.days'].disabled = false; // 开启新生儿出生体重
                this.dynamic['bazad7.hours'].disabled = false; // 开启新生儿出生体重
                this.dynamic['bazad7.minutes'].disabled = false; // 开启新生儿出生体重
                this.dynamic['bazad8.days'].disabled = false; // 开启新生儿出生体重
                this.dynamic['bazad8.hours'].disabled = false; // 开启新生儿出生体重
                this.dynamic['bazad8.minutes'].disabled = false; // 开启新生儿出生体重

            } else {
                this.dynamic['bazad7.days'].disabled = true; // 开启新生儿出生体重
                this.dynamic['bazad7.hours'].disabled = true; // 开启新生儿出生体重
                this.dynamic['bazad7.minutes'].disabled = true; // 开启新生儿出生体重
                this.dynamic['bazad8.days'].disabled = true; // 开启新生儿出生体重
                this.dynamic['bazad8.hours'].disabled = true; // 开启新生儿出生体重
                this.dynamic['bazad8.minutes'].disabled = true; // 开启新生儿出生体重
                this.inputValues['bazaDO.bazad7.days'] = undefined;
                this.inputValues['bazaDO.bazad7.hours'] = undefined;
                this.inputValues['bazaDO.bazad7.minutes'] = undefined;
                this.inputValues['bazaDO.bazad8.days'] = undefined;
                this.inputValues['bazaDO.bazad8.hours'] = undefined;
                this.inputValues['bazaDO.bazad8.minutes'] = undefined;
            }
        },
        //  身份证类型切换
        checkCardType () {
                if (this.inputValues['baf8DO.baf810'] === '9') {
                    this.dynamic['baza05'].disabled = true;
                    // this.firstInputs[16].disabled = true;
                    this.dynamic['baf811'].disabled = false;
                    this.inputValues['bazaDO.baza05'] = '';
                } else {
                    this.dynamic['baza05'].disabled = false;
                    this.dynamic['baf811'].disabled = true;
                    this.inputValues['baf8DO.baf811'] = '';
                }

        },


        // 动态后缀变化监听
        handleInputItemdynamicAfter(name, value){
            console.log(name, value);
            this.inputValues[name] = value;
            // 当年龄单位改变时 动态计算 月份和天数
            // this.inputValues['bazaDO.baza06.normal'] =  utils.age(this.inputValues);

            if (name === 'bazaDO.bazaa1') {

                this.checkNewBaby();
                // 如果年龄单位不为天的话 ，清空apgar评分


            }

        },
        // input 表单验证
        inputValidate (name, value) {
            let error = false;
            if (name === 'bazaDO.baza04' && this.inputValues['bazaDO.baza24'] < value) {
                this.$message.error('出生日期不能大于入院日期');
                return !error;
            }

            if (name === 'bazaDO.baza24' && this.inputValues['bazaDO.baza04'] > value) {
                this.$message.error('入院日期不能小于出生日期');
                return !error;
            }
            if (name === 'bazaDO.baza24' && value > this.inputValues['bazaDO.baza27']) {
                this.$message.error('入院日期不能大于出院日期');
                return !error;

            }
            if (name === 'bazaDO.baza27' && value < this.inputValues['bazaDO.baza24']) {
                this.$message.error('出院日期不能小于入院日期');
                return !error;
            }

            return error;
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
                // 如果有手术记录，追加时复制上一条记录的值
                if (this.operationTable && this.operationTable.length > 0) {
                    let item = JSON.parse(JSON.stringify(this.operationTable[this.operationTable.length - 1]));
                    this.operationTable = this.operationTable.concat([item]);
                } else {
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
                        baf416: undefined, // 麻醉医师
                        baf416name: undefined // 麻醉医师
                    }])
                }

            }
            console.log(this.operationTable);

            setTimeout(() => {
                this.inputInfo();
            }, 200);

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

        /**
         * 设置三个表格当前高亮的行索引
         * @param index
         * @param tableName
         */
        setTableActiveRow(index, tableName) {
            this.$nextTick(() => {
                this.tableActiveRow = { [tableName]: index };
            })
        },

        /**
         * 清空表格的点击高亮
         * @param existTableName
         */
        clearTableActiveRow(existTableName) {
            this.tableActiveRow = {}
        },

        /**
         * 中西医表格darg拖动change事件。更新新数据第一行为主诊断
         * @param tableName
         */
        handleDragChange(tableName) {
            if (tableName) {
                const tableData = this[tableName].slice();
                const mainIndex = tableData.findIndex(item => item.type === 'main');
                if (mainIndex === 0) return;
                tableData[0].type = 'main';
                tableData[mainIndex].type = 'other';
                this[tableName] = tableData
            }
        },

        /**
         * 中医表格drag拖动的change，主病不可改变顺序
         * @param param
         */
        handleChineseTableDrag(param) {
            console.log(param);
            const { element: { type }, newIndex, oldIndex } = param.moved;
            // 不允许移动主病或把其他项移动到主病上
            if (type !== 'main' && newIndex !== 0) return;
            const arr = this.ChineseDiagnoseTable.slice();
            const temp = arr.splice(oldIndex, 1);
            arr.splice(newIndex, 0, temp[0]);
            this.ChineseDiagnoseTable = arr;
        },



        // 表格内输入项的enter聚焦
        tableFocusNext(tableName, rowIndex, currentField, value = undefined, focusSelf) {
            console.log(tableName, value, currentField);
            const fields = {
                WesternDiagnoseTable: ['diseaseName', 'entryState', 'turnReturn', 'baf106', 'baf107', 'baf109'],
                ChineseDiagnoseTable: ['diseaseName', 'entryState', 'turnReturn'],
                operationTable: ['baf405', 'baf411', 'baf404',  'baf409', 'baf414', 'baf415', 'baf412', 'baf413', 'baf410name', 'baf423', 'baf416', 'baf421','baf422','baf424']
            };
            if (!focusSelf) {
                // 当前聚焦的select的下拉菜单样式类名（当前是input的话就没有）
                const currentSelectPoperClassName = tableName + rowIndex + currentField + 'poper';
                // 隐藏当前下拉框
                const poper = document.querySelector(`.${currentSelectPoperClassName}`);
                if (poper) poper.style.display = 'none';
            }
            // 下一个聚焦的列索引
            let nextColIndex = '';
            let nextRowIndex = '';
            console.log(value);
            if (currentField === 'baf106' && (value == '4' || value == null || value.trim() == '')) {
                 nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) + 2);
                nextRowIndex = nextColIndex < fields[tableName].length ? rowIndex : (rowIndex + 1);
            } else if (currentField === 'baf106' && value == '0') {
                 nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) + 1);
                nextRowIndex = nextColIndex < 4 ? rowIndex : (rowIndex + 1);
                console.log(nextRowIndex);
            } else {
                 nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) + 1);
                // 下一个聚焦的行索引
                 nextRowIndex = nextColIndex < fields[tableName].length ? rowIndex : (rowIndex + 1);
            }


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
            console.log(input_inner, nextIdName, nextColIndex, nextRowIndex);
            if (input_inner) {
                input_inner.focus();
                input_inner.click();
            } else {
                if (tableName === 'WesternDiagnoseTable') {
                    // 如果当前行是第一行转归，且有第二行，跳转到第二行，
                    if (rowIndex === 0 && currentField === 'turnReturn' && document.getElementById('WesternDiagnoseTable').querySelector(`#WesternDiagnoseTable1diseaseName`)) {
                        // 跳转到 中医tbale
                        let i = document.getElementById('WesternDiagnoseTable').querySelector(`#WesternDiagnoseTable1diseaseName`);
                        console.log(i);
                        i.focus();
                        i.click();
                    } else {
                        // 跳转到 中医tbale
                        let i = document.getElementById('ChineseDiagnoseTable').querySelector(`#ChineseDiagnoseTable0diseaseName`);
                        console.log(i);
                        i.focus();
                        i.click();
                    }

                } else if (tableName === 'ChineseDiagnoseTable') {
                    // 跳转到 input
                    let i = document.getElementById('bazaDO.dmmc').querySelector(`.el-input__inner`);
                    console.log(i);
                    i.focus();
                    i.click();
                } else if (tableName === 'operationTable') {
                    // 跳转到 input
                    let i = document.getElementById('baf8DO.baf813').querySelector(`.el-input__inner`);
                    console.log(i);
                    i.focus();
                    i.click();
                }
            }
        },
        // 表格内输入项的up聚焦 向右
        tableFocusUp(tableName, rowIndex, currentField, value = undefined, focusSelf) {
            console.log(tableName);
            const fields = {
                WesternDiagnoseTable: ['diseaseName', 'entryState', 'turnReturn', 'baf106', 'baf107', 'baf109'],
                ChineseDiagnoseTable: ['diseaseName', 'entryState', 'turnReturn'],
                operationTable: ['baf405', 'baf411', 'baf404',  'baf409', 'baf414', 'baf415', 'baf412', 'baf413', 'baf410name', 'baf423', 'baf416', 'baf421','baf422','baf424']
            };
            if (!focusSelf) {
                // 当前聚焦的select的下拉菜单样式类名（当前是input的话就没有）
                const currentSelectPoperClassName = tableName + rowIndex + currentField + 'poper';
                // 隐藏当前下拉框
                const poper = document.querySelector(`.${currentSelectPoperClassName}`);
                if (poper) poper.style.display = 'none';
            }
            // 下一个聚焦的列索引
            let nextColIndex = '';
            let nextRowIndex = '';
            console.log(currentField === 'baf109' && (value == '0' || value == null || value.trim() == ''));
            if (currentField === 'baf109' && (value == '4' || value == null || value.trim() == '')) {
                 nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) - 2);
                nextRowIndex = nextColIndex < fields[tableName].length ? rowIndex : (rowIndex - 1);
            } else if (currentField === 'baf109' && (value == '0' || value == null || value.trim() == '')) {
                 nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) - 1);
                nextRowIndex = nextColIndex < 4 ? rowIndex : (rowIndex - 1);
                console.log(nextRowIndex);
            } else {

                if (fields[tableName].indexOf(currentField) === 0) {
                    nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : fields[tableName].length - 1;
                } else {
                    nextColIndex = focusSelf ? fields[tableName].indexOf(currentField) : (fields[tableName].indexOf(currentField) - 1);
                }

                console.log(nextColIndex,  nextRowIndex);
                // 下一个聚焦的行索引
                 nextRowIndex = nextColIndex < fields[tableName].length - 1 ? rowIndex : (rowIndex - 1);

                console.log(fields[tableName][nextColIndex],  nextRowIndex);
            }


            // 下一个聚焦的元素id名称
            let nextIdName = tableName;
            if (nextRowIndex === rowIndex) { // 还在当前行继续向右聚焦
                nextIdName = nextIdName + nextRowIndex + fields[tableName][nextColIndex];
            } else { // 聚焦上一行的最后一个

                nextIdName = nextIdName + nextRowIndex + fields[tableName][fields[tableName].length - 1]
            }
            // 执行聚焦
            let table = document.getElementById(tableName);
            let input_inner = table.querySelector(`#${nextIdName}`);

            if (input_inner && input_inner.disabled === true) {
                nextIdName = tableName;
                nextIdName = nextIdName + nextRowIndex + fields[tableName][fields[tableName].length - 3];
                console.log(nextIdName);
                 table = document.getElementById(tableName);
                 input_inner = table.querySelector(`#${nextIdName}`);
            }

            if (input_inner) {
                input_inner.focus();
                input_inner.click();
            } else {
                if (tableName === 'WesternDiagnoseTable') {
                    // 如果当前行是第二行第一列，跳转到第一行最后一列
                    if (rowIndex === 1 && currentField === 'diseaseName') {

                        let i = document.getElementById('WesternDiagnoseTable').querySelector(`#WesternDiagnoseTable0turnReturn`);
                        console.log(i);
                        i.focus();
                        i.click();
                    } else if (rowIndex === 0 && currentField === 'diseaseName') {
                        // 跳转到辩证施护
                      let i = document.getElementById('bazaDO.bazag3').querySelector(`.el-input__inner`);
                        console.log(i);
                        i.focus();
                        i.click();
                    }

                } else if (tableName === 'ChineseDiagnoseTable') {
                    // 跳转到 input
                    if (rowIndex === 0 && currentField === 'diseaseName') {

                        let i = document.getElementById('WesternDiagnoseTable').querySelector(`#WesternDiagnoseTable0diseaseName`);
                        console.log(i);
                        i.focus();
                        i.click();
                    } else {
                        let i = document.getElementById('bazaDO.dmmc').querySelector(`.el-input__inner`);
                        console.log(i);
                        i.focus();
                        i.click();
                    }

                } else if (tableName === 'operationTable') {


                    if (rowIndex === 0 && currentField === 'baf405') {

                        let i = document.getElementById('bazaDO.bazab6').querySelector(`.el-input__inner`);
                        console.log(i);
                        i.focus();
                        i.click();
                    } else {
                        // 跳转到 input
                        let i = document.getElementById('baf8DO.baf813').querySelector(`.el-input__inner`);
                        console.log(i);
                        i.focus();
                        i.click();
                    }
                }
            }
        },


        // 表格内 向上
        tableFocusUp2 (tableName, rowIndex, currentField, step = 1) {

            // 当前聚焦的select的下拉菜单样式类名（当前是input的话就没有）
            const currentSelectPoperClassName = tableName + rowIndex + currentField + 'poper';
            // 隐藏当前下拉框
            const poper = document.querySelector(`.${currentSelectPoperClassName}`);
            if (poper) poper.style.display = 'none';

            let nextIdName = tableName + (rowIndex + step) + currentField;
           let table = document.getElementById(tableName);
            let input_inner = table.querySelector(`#${nextIdName}`);
            console.log(nextIdName, input_inner, rowIndex, );
            if (input_inner && input_inner.disabled === true) {
                this.tableFocusUp2 (tableName, rowIndex + step, currentField);
            } else if (input_inner) {
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
            console.log(fields);
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
            console.log(dict, this.dictInputDialog);
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
                    console.log(this[opener][index][item.targetField])
                });
                console.log(this.operationTable);
                if (opener === "operationTable") {
                   if (this[opener][index]['baf410'] === '9' || this[opener][index]['baf410'] === 'RNA00'  ) {
                    this.$set(this[opener][index], 'baf410', null);
                    this.$set(this[opener][index], 'baf410name', null);
                   }
                }

                if (opener === "WesternDiagnoseTable") {
                    console.log(this.WesternDiagnoseTable[0]);
                    // 主要诊断为 z37的 “新生儿出生体重”，“新生儿信息按钮”可用
                    this.checkNewBaby();
                    // 主要诊断为s06 的 颅脑昏迷才能填写
                    this.checkLLHM();
                }
                if (opener === "ChineseDiagnoseTable") {
                    console.log(this.ChineseDiagnoseTable);
                    this.inputValues['baf9DO.baf907'] = this.ChineseDiagnoseTable[1]['diseaseCode'];
                    console.log(this.inputValues)

                }

                // 表格里也是聚焦下个输入框
                // todo 这里用 fields[0].targetField 代表了当前输入的字段名，所以在设置fields的时候需要注意将其放在第一个
                this.tableFocusNext(opener, index, fields[0].targetField)
            }

            setTimeout(() => {
                this.inputInfo();
            }, 200);

        },

        // 清除特定字段
        clearField (arr, field) {
            this.$set(arr, field, null);
        },


        // 清除 select 的值
        clearSelectValue(value) {
            console.log(value);
        },



        /**
         * 清除由字典录入的值（字典录入项聚焦后可按f4清除录入的值，包括输入项内、表格内）
         * @param keys Array 需要清除值的字段集合(字典录入一般会设置名称和代码等多个字段值，一同清空) // chendimao:这个只能用在inputValues上，3个table的清除多个字段，我是在position字段中用逗号分开
         * @param position String[inputValues, 三个table名称] 从哪里清除，如输入项的清除是从 inputValues 中清除，position = inputValues
         * @param index 对于从表格数据行清除的，提供行索引
         */
        clearDictInputValue(keys, position, index) {
            console.log(keys, position, index);
            if (position === 'pathologicDiagnosis') {
                // 病理诊断清空
                this.pathologicDiagnosisDialog.diagnosisData = [];
                this.inputValues['bazaDO.pathologicDiagnosisName'] = undefined; // 诊断名称
                this.inputValues['bazaDO.pathologicDiagnosis'] = undefined; // 诊断编码
                this.inputValues['bazaDO.baf202'] = undefined; // 病理号
            } else {
                if (index >= 0) {
                    // keys.forEach(key => {
                    //     console.log(key);
                    //     // this[position][index][key] = ''
                    // })
                    position.split(',').forEach((value, i) => {
                        keys[index][value] = '';
                    })

                } else {
                    keys.forEach(key => {
                        this[position][key] = ''
                    })
                }
            }
            setTimeout(() => {
                this.inputInfo();
            }, 20);
        },

        /**
         * 打开特殊的录入框（过敏药物）
         * @param config inputConfig配置项
         */
        openSpecialDialog(config) {

            console.log(config);
            if (config.name === 'bazaDO.allergicDrugs') { // 过敏药物
                if (this.inputValues['bazaDO.baza00']) {
                    this.allergicDrugsDialog.visible = true;
                    this.allergicDrugsDialog.baza00 = this.inputValues['bazaDO.baza00'];
                } else {
                    this.$message.error('病案号为空')
                }
            } else if (config.specialInput === 'pathologicDiagnosis') {
                if (this.inputValues['bazaDO.baza00']) {
                    this.pathologicDiagnosisDialog.visible = true;
                    this.pathologicDiagnosisDialog.baza00 = this.inputValues['bazaDO.displaybaza00'];
                } else {
                    this.$message.error('病案号为空')
                }

            } else if (config.name === 'bazaDO.baza22name') { // 转科科别
                if (this.inputValues['bazaDO.baza00']) {
                    if (this.inputValues['bazaDO.baza24']) {
                        this.changeDepartmentDialog.visible = true;
                        this.changeDepartmentDialog.baza00 = this.inputValues['bazaDO.baza00'];
                        this.changeDepartmentDialog.enterDate = this.inputValues['bazaDO.baza24'];
                    } else {
                        this.$message.error('入院时间为空')
                    }
                } else {
                    this.$message.error('病案号为空')
                }
            }else if (config.name === 'bazaDO.bazag5') {
                if (this.inputValues['bazaDO.baza00']) {
                    this.intensiveCareDialog.visible = true;
                    this.intensiveCareDialog.baza00 = this.inputValues['bazaDO.baza00'];
                    this.intensiveCareDialog.rysj = this.inputValues['bazaDO.baza24'] + ' 00:00';
                    this.intensiveCareDialog.cysj = this.inputValues['bazaDO.baza27']+ ' 00:00';
                    console.log(this.intensiveCareDialog);
                } else {
                    this.$message.error('病案号为空')
                }
            }else if (config.name === 'bazaDO.bazaf3') {
                if (this.inputValues['bazaDO.baza00']) {
                    this.NewBaby.visible = true;
                    this.NewBaby.baza00 = this.inputValues['bazaDO.baza00'];
                } else {
                    this.$message.error('病案号为空')
                }
            }else if (config.name === 'bazaDO.bazaf8') {
                if (this.inputValues['bazaDO.baza00']) {
                    this.dieInfo.visible = true;
                    this.dieInfo.baza00 = this.inputValues['bazaDO.baza00'];
                    this.dieInfo.swsjhz = this.inputValues['bazaDO.bazace'];
                } else {
                    this.$message.error('病案号为空')
                }
            }
        },

        /**
         * 过敏药物提交
         * @param allergicDrugs
         */
        handleAllergicDrugsSubmit(data) {
            this.allergicDrugsDialog.visible = false;
            this.inputValues['bazaDO.allergicDrugs'] = data;
            utils.focusNext('bazaDO.allergicDrugs', false);
        },
        /**
         * 新生儿信息提交
         * @param allergicDrugs
         */
        handleNewBabySubmit(data) {
            this.NewBaby.visible = false;
            this.inputValues['bafaDO'] = data;
            // this.inputValues['bazaDO.allergicDrugs'] = allergicDrugs;
          //  utils.focusNext('bazaDO.allergicDrugs', false);
        },
        /**
         * 死亡详情
         * @param allergicDrugs
         */
        handleDieInfoSubmit(data) {
            this.dieInfo.visible = false;
            this.inputValues['baf3DO'] = data;
            console.log(this.inputValues['baf3DO']);
            // this.inputValues['bazaDO.allergicDrugs'] = allergicDrugs;
          //  utils.focusNext('bazaDO.allergicDrugs', false);
        },

        /**
         * 重症监护信息提交
         * @param allergicDrugs
         */
        handleTutelageSubmit(data) {
            this.intensiveCareDialog.visible = false;
            console.log(data);
            this.inputValues['baf7DO'] = data;
            console.log(this.inputValues);
            this.inputValues['bazaDO.bazag6'] = this.intensiveCareDialog.totalTime;
            // this.inputValues['bazaDO.allergicDrugs'] = allergicDrugs;
           // utils.focusNext('bazaDO.allergicDrugs', false);

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
            // cost({
            //     baf1DOList: utils.originData.baf1DO,
            //     baf4DOList: utils.originData.baf4DO,
            //     bazaDO: utils.originData.bazaDO
            // }).then(res => {
            //     console.log('++', res)
            //     if (res.code === 1) {
            //         this.errorMsg = { column: '主诊断', errMsg: res.msg }
            //         this.handleHint()
            //     }
            //     if (res.code === 0) {
            //         this.errorMsg = { column: 'DRGS错误信息', errMsg: res.data }
            //         this.handleHint()
            //     }
            // })

            if (this.handleValidate()) {
                return;
            }

            this.handleHint();
            document.querySelector('main').scrollTo('auto', 0);
        },
        handleValidate () {
            let error = false;
            let errorData = undefined;
            // 邮编
            let YB= /^[1-9][0-9]{5}$/
            if(!YB.test(this.inputValues['bazaDO.bazaa6']) && this.inputValues['bazaDO.bazaa6'] !== '-') {
                errorData = {data: [{errMsg: '邮编格式错误', column: 'bazaa6', xh: 0 }]}
                error = true;
            }
            if(!YB.test(this.inputValues['bazaDO.baza14']) && this.inputValues['bazaDO.baza14'] !== '-') {
                errorData = {data: [{errMsg: '邮编格式错误', column: 'baza14', xh: 0 }]}
                error = true;
            }
            if(!YB.test(this.inputValues['bazaDO.bazaa4']) && this.inputValues['bazaDO.bazaa4'] !== '-') {
                errorData = {data: [{errMsg: '邮编格式错误', column: 'bazaa4', xh: 0 }]}
                error = true;
            }

            if (error) {
                this.setErrorInfo(errorData);
            }
            console.log(YB.test(this.inputValues['bazaDO.bazaa6']));
            return error;
        },
        handleHint() {
            if (utils.originData) {
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
              //  debugger
                const params = this.groupParams(type);
                api[type](params).then(res => {
                    if (res && res.code === 0) {
                        this.$message.success(`${typeMsg[type]}成功`);
                        this.queryPatient(this.inputValues['bazaDO.baza00']);
                        // this.getList(this.list.filters, { page: this.list.pager.page, rows: this.list.pager.rows })
                    } else if (res && res.data) {
                        console.log(res);
                        this.setErrorInfo(res)
                    } else {
                        this.$message.error(res && res.msg ? res.msg : `${typeMsg[type]}失败`)
                    }
                    this.getList( { page: this.list.pager.page, rows: this.list.pager.rows })
                    this.rightLoading = false;
                }).catch(err => {
                    this.$message.error(`${typeMsg[type]}错误`);
                    this.rightLoading = false;
                })
            }
        },

        handleReset(focusFirst) {
            this.inputValues = utils.initInputsValues();
            this.judge = { hospitalType: 'Both', isNewBaby: true, };
            // 动态的单位后缀,如年龄的单位需要根据具体的详情数据显示岁、月或日

            this.dynamicAfterObj = {
                ageAfter: {
                    options: [
                        { label: '岁', value: 'Y' },
                        { label: '月', value: 'M' },
                        { label: '天', value: 'D' },

                    ],
                    value: 'Y',
                    disable: true,
                    name: 'bazaDO.bazaa1'

                } };

            // 动态的单位前缀,如年龄的单位需要根据具体的详情数据显示岁、月或日
            this.dynamicBeforeObj = {
                cardBefore: {
                    options: [
                        {label: '居民身份证', value: '1'},
                        {label: '中国人民解放军军人身份证件', value: '2'},
                        {label: '中国人民武装警察身份证件', value: '3'},
                        {label: '港澳居民来往内地通行证', value: '4'},
                        {label: '台湾居民来往大陆通行证', value: '5'},
                        {label: '护照', value: '6'},
                        {label: '其它', value: '9'},
                    ],
                    value: '1',
                    name: 'baf8DO.baf810'
                } };
            this.WesternDiagnoseTable = [{ type: 'main' }];
            this.ChineseDiagnoseTable = [{ type: 'main' }];
            this.operationTable = [];
            this.submitType = 'add';
            this.allergicDrugsDialog = { visible: false, allergicDrugsData: [], baza00: undefined };
            this.errorInfo = {
                tableErrorObj: { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} },
                visible: false, height: 40, errorData: [], errorObj: {}, currentFocus: undefined
            };
            utils.originData = utils.copyOriginData = {
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
                type,
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
            console.log(errorData);
            const errorObj = {}; // 记录inputConfig中的输入项的错误 errorObj，用来给item变红
            const tableErrorObj = { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} }; // 三个表格内容的错误
            console.log(errorData);
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
                        console.log(inputConfig[index].name, index);
                        errorObj[inputConfig[index].name] = true; // 将此字段记为错误
                        errorData[errIndex].index = index; // 记录此字段在config中的索引，跳转聚焦时使用
                    }
                }
            });
            console.log('---', res.data.slice())
            errorData.push(this.errorMsg)
            this.errorInfo.errorData = errorData
            this.errorInfo.tableErrorObj = tableErrorObj;
            this.errorInfo.errorObj = errorObj;
            !this.errorInfo.visible && this.triggerErrorVisible();
            // console.log(this.errorInfo, 'errorInfo')
        },


        // 设置扣分信息
        setScoreInfo(data ) {

            console.log(data);
            if (!data) {
                return;
            }
            const scoreData = data.slice() ;
            const scoreObj = {}; // 记录inputConfig中的输入项的错误 errorObj，用来给item变红
            const tablescoreObj = { WesternDiagnoseTable: {}, ChineseDiagnoseTable: {}, operationTable: {} }; // 三个表格内容的错误
            console.log(scoreData);
            data.forEach((error, errIndex) => {
                // 先看是否为表格内的错误，从表格内容查找设置
                const { tableName, index, fieldName } = this.findErrorItemFromTable(error);
                if (tableName) {
                    tablescoreObj[tableName][`${fieldName}-${index}`] = true; // 将此字段记为错误
                    scoreData[errIndex] = {
                        ...scoreData[errIndex],
                        tableName, index, fieldName
                    }; // 记录此错误字段的信息，跳转聚焦时使用
                } else { // 否则从inputConfig中查找设置
                    const index = this.findErrorItemIndexFromConfig(error.column);
                    if (index >= 0) {
                        console.log(inputConfig[index].name, index);
                        scoreObj[inputConfig[index].name] = true; // 将此字段记为错误
                        scoreData[errIndex].index = index; // 记录此字段在config中的索引，跳转聚焦时使用
                    }
                }
            });
            console.log('---', data.slice())
            this.scoreInfo.scoreData = scoreData
            this.scoreInfo.tableErrorObj = tablescoreObj;
            this.scoreInfo.scoreObj = scoreObj;
            console.log(this.scoreInfo);
            // console.log(this.errorInfo, 'errorInfo')
        },

        // 诊断类别为1时 手术有关才能选
        baf106Change (ev) {
            console.log(ev, this.WesternDiagnoseTable);
            if (this.WesternDiagnoseTable[ev.index]['baf106'] !== '1' ) {
                this.WesternDiagnoseTable[ev.index]['baf109'] === '';
            }
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
                    baf416: 'baf416', // 麻醉医师dm
                    baf416name: 'baf416name', // 麻醉医师
                }
            };
            // 查找有无
            const westerName = fieldMap.WesternDiagnoseTable[error.column];
            const chineseName = fieldMap.ChineseDiagnoseTable[error.column];
            const operationName = fieldMap.operationTable[error.column];
            if (westerName) {
                // console.log(error.column, westerName, '西医表格错误字段')
                // 后台主诊断数据在bazaDO中，次诊断数据在baf1DO list 中，次诊断有序号，主没有，但前端显示是在一个表格内，
                const field = westerName.split('-');
                return {
                    tableName: 'WesternDiagnoseTable',
                    index: field[1] === 'main' ? this.WesternDiagnoseTable.findIndex(item => item.type === 'main') : (error.xh - 1),
                    fieldName: field[0]
                }
            } else if (chineseName) {
                // console.log(error.column, chineseName, '中医表格错误字段')
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
            // console.log(row, '错误行');
            if (row.tableName) { // 有tableName，说明是表格内的错误项
                // 聚焦到表格此项
                this.tableFocusNext(row.tableName, row.index, row.fieldName, true);
                // 闪烁
                const el = document.getElementById(`${row.tableName}${row.index}${row.fieldName}`)
                el && this.animateTableError(el, 7);
            } else if (row.index >= 0) { // 否则若index>=0,则说明是输入项的错误
                let item = inputConfig[row.index]
                console.log(item);
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


        // 设置 主症 转归为死亡时
        setDieState(item) {
            console.log(item);
            if (item.type === 'main' && item.turnReturn === '4') {
                this.$set(this.dynamic['bazace'], 'disabled', false);
                this.inputValues['bazaDO.bazaf8'] = '5';
                this.dynamic['bazaf8'].isBtnAfter = true;
                this.setDieInfo();
            } else {
                this.$set(this.dynamic['bazace'], 'disabled', true);
                this.inputValues['bazaDO.bazace'] = undefined;
                this.setDieInfo();
            }
            console.log(this.dynamic['bazace']);
        },

        editCode(row) {
            this.$refs.child.openBox(row);
        }
    }
}

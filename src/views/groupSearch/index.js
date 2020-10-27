import filtersFields from "./filtersFields";
import FilterBox from './filterBox.vue';
import DictInput from '../../components/dialog/dict-input.vue';
import PagingToolbar from '../../components/toolbar/paging.vue';
import { UnionSearch } from '../../api/groupSearch';
import { mapMutations } from "vuex";
function getFilterDisabledObj() {
    const result = {};
    Object.keys(filtersFields).forEach(infoType => {
        filtersFields[infoType].fields.forEach(item => {
            result[item.name] = true
        })
    });
    // console.log(result);
    return result;
}
function initFilterValues() {
    const values = {};
    Object.keys(filtersFields).forEach(infoType => {
        filtersFields[infoType].fields.forEach(item => {
            if (item.range) {
                values[item.range[0]] = undefined;
                values[item.range[1]] = undefined;
            }
            if (item.dictField) values[item.dictField] = undefined
            values[item.name] = undefined;
        })
    });
    console.log(values, 'filtervalues')
    return values
}
export default {
    name: "groupSearch", // 组合查询
    components: { FilterBox, DictInput, PagingToolbar },
    data() {
        return {
            flag38: false,
            flag103: false,
            flag408: false,
            // 筛选弹框的所有字段配置
            filterFields: filtersFields,
            // 弹框可见
            filterVisible: false,
            // 筛选字段是否禁用 CheckBox check之后对应的改为false
            filterDisabledObj: getFilterDisabledObj(),
            loading: false,
            // 所有筛选项填入的值
            filterValues: initFilterValues(),
            // 上方显示的主要信息有哪些字段
            mainInfoFields: [
                { label: '姓　　名', key: 'baza02' }, { label: '病 案 号', key: 'baza01' }, { label: '主 诊 断', key: 'zdName' },
                { label: '入院科别', key: 'inDeptName' }, { label: '出院科别', key: 'deptName' }, { label: '住院天数', key: 'baza29' },
                { label: '联 系 人', key: 'baza15' }, { label: '联系电话', key: 'baza19' }
            ],
            resultVisible: false,
            // 当前选中的表格某条数据，用于显示上方主要信息
            currentInfo: {},
            // 表格数据
            tableData: [],
            pager: { page: 1, rows: 10, total: 0 },
            // 代码录入弹框
            dictInputDialog: {
                visible: false,
                dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
                extraParams: undefined, // 额外参数，如科室,见 filtersFields
                currentOpener: {} // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
            }
        }
    },

    computed: {
        resultTableMaxHeight() {
            const clientH = window.document.documentElement.clientHeight;
            return (clientH - 320) > 300 ? ((clientH - 320) + 'px') : '300px'
        }
    },

    deactivated() {
        this.dictInputDialog.visible = false;
        this.resultVisible = false;
    },
    methods: {
        ...mapMutations('homepage', ['setSearchInfo']),
        // 设置选择的当前行
        setCurrentInfo(row) {
            this.currentInfo = row
        },

        // 切换筛选的显示
        triggerFilterVisible() {
            this.filterVisible = !this.filterVisible
        },

        /**
         * 勾选or取消勾选
         * @param infoType 分类，如基础信息baseInfo等
         * @param name 字段名
         * @param checked 是否勾选
         */
        handleCheck({ infoType, name, checked }) {
            // 将对应字段输入禁用或去除禁用
            this.filterDisabledObj[name] = !checked;
            const field = filtersFields[infoType].fields.find(item => item.name === name);
            console.log('&', field)
            if (!checked) { // 取消勾选时，清空对应字段值
                if (field.range) {
                    this.filterValues[field.range[0]] = undefined;
                    this.filterValues[field.range[1]] = undefined;
                }
                if (field.unit) {
                    this.filterValues[field.unit[0]] = undefined;
                    this.filterValues[field.unit[1]] = undefined;
                }
                if (field.dictType) {
                    // const realPropName = field.name.split('-')[0];
                    const realPropName = field.name.slice(0, field.name.length - 4)
                    this.filterValues[realPropName] = undefined;
                    // this.filterValues[realPropName + 'C'] = undefined;
                }
                this.filterValues[name] = undefined
            } else if (field.type === 'check') { // 勾选且该字段是个checkbox，将值填为true，否则无需任何操作
                this.filterValues[name] = true
            }
            if (checked) {
                if (field.range) {
                    if (field.type !== 'date') {
                        this.filterValues[field.range[0]] = ' ';
                        this.filterValues[field.range[1]] = ' ';
                    }

                }
                if (field.unit) {
                    this.filterValues[field.unit[0]] = ' ';
                    this.filterValues[field.unit[1]] = ' ';
                }
                if (field.dictType) {
                    // const realPropName = field.name.split('-')[0];
                    const realPropName = field.name.slice(0, field.name.length - 4)
                    this.filterValues[realPropName] = ' ';
                }
            }
        },

        /**
         * 表单验证
         */
        validate() {
            const rules = {
                required: [
                    { originalName: 'baza06Begin', targetName: 'bazaa1Begin', msg: '起始年龄单位不能为空' },
                    { originalName: 'baza06End', targetName: 'bazaa1End', msg: '结束年龄单位不能为空' }
                ],
                range: [],
                ageRange: [],
                dateRange: []
            };
            let error = false;
            for (let key in rules) {
                if (error) break;
                for (let i = 0; i < rules[key].length; i++) {
                    if (error) break;
                    const item = rules[key][i];
                    if (key === 'required') {
                        if (this.filterValues[item.originalName] && !this.filterValues[item.targetName]) {
                            error = true;
                            this.$message.error(item.msg)
                            break;
                        }
                    }
                }
            }
            return !error
        },

        /**
         *
         */
        groupParams() {
            const params = {}
            // console.log(this.filterValues, 'kl')
            for (let item in this.filterValues) {
                // 只检索手术 中医治疗 有输血 三个checkbox
                if (item === 'baza53' || item === 'baf617' || item === 'baza57') {
                    if (this.filterValues[item] !== undefined) params[item] = this.filterValues[item] ? '1' : '0';
                } else if (this.filterValues[item]) {
                    params[item] = this.filterValues[item]
                }
            }
            // if (!this.flag38) {
            //     // params['baza38' + 'C'] = params['baza38-name']
            //     params['baza38' + 'C'] = params['baza38Name']
            //     // params['baza38'] = ''
            // }
            // if (!this.flag103) {
            //     // params['baf103' + 'C'] = params['baf103-name']
            //     params['baf103' + 'C'] = params['baf103Name']
            //     // params['baf103'] = ''
            // }
            // if (!this.flag408) {
            //     // params['baf408' + 'C'] = params['baf408-name']
            //     params['baf408' + 'C'] = params['baf408Name']
            //     // params['baf408-name'] = ''
            //     // params['baf408'] = ''
            // }
            return params
        },

        /**
         * 获取列表的主方法
         * @param pager 分页信息
         */
        getData(pager) {
            let obj = this.groupParams();
            console.log('pp', obj.baza38, typeof obj.baza38)
            if (obj.baza38 != " " && (obj.baza38 != null || obj.baza38 != undefined)) {
                obj.baza38Name = ''
            }
            if (obj.baf103 != " " && (obj.baf103 != null || obj.baf103 != undefined)) {
                obj.baf103Name = ''
            }
            if (obj.baf408 != " " && (obj.baf408 != null || obj.baf408 != undefined)) {
                obj.baf408Name = ''
            }
            // 组合筛选项
            let pagination = pager || this.pager;
            let params = { page: pagination.page, limit: pagination.rows, ...obj };
            // console.log(params, 'params');
            if (Object.keys(params).length > 2) {
                if (this.validate()) {
                    this.loading = true;
                    console.log('55', params)
                    UnionSearch(params).then(res => {
                        if (res && res.data) {
                            this.tableData = res.data.content;
                            this.currentInfo = res.data.content[0] ? res.data.content[0] : {};
                            this.pager = { ...pagination, total: res.data.total };
                            this.filterVisible = false;
                            this.resultVisible = true;
                            // this.flag38 = false;
                            // this.flag103 = false;
                            // this.flag408 = false
                        } else {
                            this.$message.error(res && res.msg ? res.msg : '查询失败')
                        }
                        this.loading = false
                    }).catch(err => {
                        this.$message.error('查询失败');
                        this.loading = false
                    })
                }
            } else {
                this.$message.error('请选择查询条件')
            }
            console.log(this.groupParams())
        },
        // 导出
        download(pager) {
            let obj = this.groupParams();
            console.log('pp', obj.baza38, typeof obj.baza38)
            if (obj.baza38 != " " && (obj.baza38 != null || obj.baza38 != undefined)) {
                obj.baza38Name = ''
            }
            if (obj.baf103 != " " && (obj.baf103 != null || obj.baf103 != undefined)) {
                obj.baf103Name = ''
            }
            if (obj.baf408 != " " && (obj.baf408 != null || obj.baf408 != undefined)) {
                obj.baf408Name = ''
            }
            // 组合筛选项
            let pagination =  this.pager;
            let params = { page: pagination.page, excel: 1, limit: pagination.rows, ...obj };
            this.loading = true;
            console.log('55', params)
            UnionSearch(params).then(res => {
                if (res && res.data) {
                    window.open(res.data);
                } else {
                    this.$message.error(res && res.msg ? res.msg : '导出失败')
                }
                this.loading = false
            }).catch(err => {
                this.$message.error('导出失败');
                this.loading = false
            })
        },
        // 打开代码录入
        handleOpenDictInput(item) {
            if (item.name === 'baf103Name') {
                this.flag103 = true
            }
            if (item.name === 'baza38Name') {
                this.flag38 = true
            }
            if (item.name === 'baf408Name') {
                this.flag408 = true
            }
            const { name, dictType, dictField, range } = item;
            this.dictInputDialog = {
                visible: true,
                dictType,
                extraParams: item.dictExtraParams,
                currentOpener: { name, dictField }
            }
        },

        // 代码录入提交
        handleDictInputSubmit(row) {
            const { currentOpener } = this.dictInputDialog;
            this.filterValues[currentOpener.name] = row.dmmc;
            if (currentOpener.dictField) this.filterValues[currentOpener.dictField] = row.dm;
        },

        // 去往首页编辑
        toHomePage(baza00) {
            this.setSearchInfo({
                baza00,
                groupSearchCondition: this.groupParams(),
                searchData: {
                    tableData: this.tableData.slice(),
                    pager: { ...this.pager }
                }
            })
            // this.$store.commit('homepage/changeBaza00', baza00)
            this.$router.push({ path: '/admin/homepage/index' })
        },

        changeFlag(name) {
            if (name === 'baza38Name') {
                this.flag38 = false
                // this.filterValues['baza38'] = ''
            }
            if (name === 'baf103Name') {
                this.flag103 = false
                // this.filterValues['baf103'] = ''
            }
            if (name === 'baf408Name') {
                this.flag408 = false
                // this.filterValues['baf408'] = ''
            }
        }
    }
}

import DictInput from '../../components/dialog/dict-input.vue';
import PagingToolbar from '../../components/toolbar/paging.vue';
import OutPutDialog from './components/output-dialog.vue';
import medicalDialog from './components/medicalDialog.vue';
import { mapMutations } from "vuex";
import { GroupNameSelect, ConditionSelect, ConditionDel, ConditionSave, RandomSearch } from '../../api/randomSearch';

export default {
    name: "item-control",
    components: { DictInput, PagingToolbar, OutPutDialog,medicalDialog},
    data() {
        return {
            // 条件右侧表格高度
            rightContentHeight: '100px',
            // 条件项与值的关系
            conditionRelationOptions: [
                { label: '=', value: '=' }, { label: '>=', value: '>=' }, { label: '<=', value: '<=' },
                { label: '>', value: '>' }, { label: '<', value: '<' }, { label: '<>', value: '<>' },
                { label: 'like', value: 'like' }, { label: '包含', value: 'include' },
            ],
            // 已保存的条件组名称，左侧下拉选择
            savedGroups: [],
            // 新建的条件组名称
            addGroupName: undefined,
            // 选择的条件组名称
            editGroupId: undefined,
            // 条件项集合
            conditionItems: [],
            // conditionItems 当前行索引
            currentIndex: 0,
            // 下方查询结果表格数据
            resultData: [],
            // 表格loading
            resultLoading: false,
            // 分页
            pager: { page: 1, rows: 10, total: 0 },
            // 代码录入
            dictInputDialog: {
                visible: false,
                dictType: undefined,
                extraParams: {}, // 字典的额外查询参数
                currentOpener: {
                    rowIndex: undefined,
                    fields: [] // 填充的字段列表 [{dictField: 'dmmc', targetField: 'name'}]
                }
            },
            dialogTableVisible: false,
            // 输出用到的已处理好的条件组 (在随机查询之后将其设置，用于输出)
            conditionList: undefined,
            /* 分数 */
            itemScore: null,
        /* 模块名称 */
            moduleName: '',
        /* 模块选择标记 */
            selectModule: false,
        /* 检查该项必填 */
        checkRequired:false
        }
    },
    props: {
        qualityItem:{
            type: Array,
            default:()=>[]
        },
        score: {
            type: Number,
            default:null 
        },
        linkId: {
            type: String|Number,
            default:'' 
        },
        module:{
            type: String,
            default:''
        }
    },
    created() {
        this.initData()
    },
    mounted() {
     
        // 获取已保存的条件组
        this.getSavedGroup()
    },
    deactivated() {
        this.dictInputDialog.visible = false
    },

    watch: {
        checkRequired(val) {
            if (val) {
                this.conditionItems = [{
                    index:1,
                    conditionField: '',
                    conditionFieldName: '',
                    conditionValue: '',
                    conditionValueName: '',
                    conditionRelation: '',
                    itemRelation: '',
                    bzk: '', // 值的字典表
                    bzkdmmc: '', // 字典字段
                    type: '', // 条件类型
                    xh: '', // 排序
                    km: '', // 条件项所在表名
                    fh1: '', // 左括号
                    fh2: '' // 右括号,
                }]
            }
        }
    },

    methods: {

        ...mapMutations("homepage", ["setSearchInfo"]),
    

        /* ----------------------------------- 左侧条件组相关--------------------------------------------- */

        // 输入名称，创建新的筛选条件
        handleCreateGroup() {
            if (this.addGroupName) {
                this.editGroupId = undefined;
                this.conditionItems = [{ index: 0 }]; // 括号: fh1: '(', fh2: ')'
                this.currentIndex = 0;
            }
            this.$refs.groupAdd.blur()
        },

    /* 外部传入初始值 */
        initData() {
            this.itemScore = this.score
            this.moduleName = this.module
              this.conditionItems = this.qualityItem.map((item, index) => ({
                  index,
                  conditionField: item.cxx,
                  conditionFieldName: item.name,
                  conditionValue: item.ysz,
                  conditionValueName: item.yszt,
                  conditionRelation: item.gxf,
                  itemRelation: item.glf,
                  bzk: item.bzk, // 值的字典表
                  bzkdmmc: item.bzkdmmc, // 字典字段
                  type: item.type, // 条件类型
                  xh: item.xh, // 排序
                  km: item.km, // 条件项所在表名
                  fh1: item.fh1, // 左括号
                  fh2: item.fh2 // 右括号,
              }));
            this.pager = { page: 1, rows: 10, total: 0 };
        },

        // 选择已有的条件组：根据选择的条件组名称，获取所有条件项
        handleEditGroup() {
            if (this.editGroupId) {
                this.addGroupName = undefined;
                ConditionSelect(this.editGroupId).then(res => {
                    if (res && res.data) {
                        const list = res.data[0] ? res.data[0].list : [];
                        this.conditionItems = list.map((item, index) => ({
                            index,
                            conditionField: item.cxx,
                            conditionFieldName: item.name,
                            conditionValue: item.ysz,
                            conditionValueName: item.yszt,
                            conditionRelation: item.gxf,
                            itemRelation: item.glf,
                            bzk: item.bzk, // 值的字典表
                            bzkdmmc: item.bzkdmmc, // 字典字段
                            type: item.type, // 条件类型
                            xh: item.xh, // 排序
                            km: item.km, // 条件项所在表名
                            fh1: item.fh1, // 左括号
                            fh2: item.fh2 // 右括号
                        }));
                        this.pager = { page: 1, rows: 10, total: 0 };
                    } else this.$message.error(res && res.msg ? res.msg : '获取条件项失败')
                }).catch(err => {
                    this.$message.error('获取条件项错误')
                });
                this.currentIndex = 0;
                this.$refs.groupSelect.blur()
            }
        },

        // 获取已保存有的条件组
        getSavedGroup() {
            GroupNameSelect('sj_cxtj').then(res => {
                if (res && res.data) this.savedGroups = res.data;
                else this.$message.error(res && res.msg ? res.msg : '获取已有条件组失败')
            }).catch(err => {
                this.$message.error('获取已有条件组失败')
            })
        },

        /* ----------------------------------- 右侧条件项表格相关--------------------------------------------- */

        // 条件项内的enter事件自动聚焦
        focusNext(currentIdName) {
            // 名称顺序
            const order = ['fh1', 'conditionField', 'conditionRelation', 'conditionValueName', 'fh2', 'itemRelation'];
            let [name, rowindex] = currentIdName.split('-');
            // rowIndex、colIndex：当前输入项所在表格的行索引与列索引
            const colIndex = order.indexOf(name);
            rowindex = Number(rowindex);
            let nextIdName = undefined;
            if (colIndex < 5) {
                // 列索引小于3：继续向右聚焦
                nextIdName = order[colIndex + 1] + '-' + rowindex;
            } else if (rowindex + 1 < this.conditionItems.length) {
                // 已到最右项，若还有下一行，聚焦下一行第一项
                nextIdName = `fh1-${rowindex + 1}`;
            }
            // 隐藏下拉框
            if (name === 'conditionRelation' || name === 'itemRelation') {
                this.$refs['select-' + currentIdName].blur()
                // document.querySelectorAll(`.selectwrap-${name}-${rowindex}`)[0].style.display = 'none';
            }
            // console.log(nextIdName, 'next');
            if (nextIdName) {
                // 下一个输入项获取焦点并展开下拉
                const input_inner = document.querySelector(`#${nextIdName}`);
                if (input_inner) {
                    // if (input_inner.attributes.readonly) input_inner.click();
                    input_inner.focus();
                    input_inner.click();
                }
            }
        },

        // 设置当前行索引
        setCurrentItem(row, col, cell) {
            if (col.property === 'index') this.currentIndex = row.index
        },

        // 表格单元格双击，添加括号
        handleAddBrackets(row, col) {
            if (col.property === 'fh1' || col.property === 'fh2') {
                const val = col.property === 'fh1' ? '(' : ')';
                const oldValue = this.conditionItems[row.index][col.property];
                this.conditionItems[row.index][col.property] = oldValue ? (oldValue + val) : val;
                this.conditionItems = this.conditionItems.slice()
            }
        },

        // 删除括号
        handleDelBrackets(field, index) {
            this.conditionItems[index][field] = '';
            this.conditionItems = this.conditionItems.slice();
        },

        /* ----------------------------------- 右侧按钮相关--------------------------------------------- */

        // 增加一项
        handleAddItem() {
            const oldLength = this.conditionItems.length;
            const conditionItems = this.conditionItems.slice();
            const newCondition = { index: oldLength };
            // 原来无条件，新增的条件要加上左右括号并将当前索引置为0
            if (oldLength === 0) {
                // newCondition.fh1 = "(";
                // newCondition.fh2 = ")";
                this.currentIndex = 0;
            } else {
                // 原来有条件，新增的条件需有右括号
                // newCondition.fh2 = ")";
            }
            conditionItems.push(newCondition);
            this.conditionItems = conditionItems;
            this.currentIndex = conditionItems.length - 1;
            this.$nextTick(() => {
                this.focusNext('fh1-' + (conditionItems.length - 1))
            })
        },

        // 插入一项
        handleInsertItem() {
            if (this.conditionItems.length) {
                let conditionItems = this.conditionItems.slice();
                // 当前行前面插入一行
                conditionItems.splice(this.currentIndex, 0, {});
                // 重置index
                conditionItems = conditionItems.map((item, index) => ({
                    ...item,
                    index: index,
                }));
                // 在第一行前面插入：新的集合里第一行有左括号
                if (this.currentIndex === 0) {
                    // conditionItems[0].fh1 = '('
                }
                console.log(conditionItems, '插入后的');
                this.conditionItems = conditionItems;
                this.$nextTick(() => {
                    this.focusNext('fh1-' + (this.currentIndex))
                })
            } else {
                this.handleAddItem()
            }
        },

        // 删除一项
        handleRemoveItem() {
            // 从conditionItems中删除这一项
            const removeItem = () => {
                let conditionItems = this.conditionItems.slice();
                // 删除一行
                conditionItems.splice(this.currentIndex, 1);
                // 重置index
                conditionItems = conditionItems.map((item, index) => ({
                    ...item,
                    index: index,
                }));
                const newLength = conditionItems.length;
                // 删除最后一行：清除原倒数第二行的关联，给原倒数第二行加右括号
                if (this.currentIndex === newLength && newLength > 0) {
                    this.currentIndex = newLength - 1;
                    // conditionItems[newLength - 1].fh2 = ")";
                    conditionItems[newLength - 1].itemRelation = undefined
                }
                // 删到只剩一行的时候，要加上左右括号，去除条件间的关系
                // 比如当前有2个条件，第二个无(,当删除第一个时，需要给剩下的添加（
                if (conditionItems.length === 1) {
                    // conditionItems[0].fh1 = '(';
                    // conditionItems[0].fh2 = ')';
                    conditionItems[0].itemRelation = undefined;
                }
                console.log(conditionItems, '删除后的');
                this.conditionItems = conditionItems;
            };
            removeItem();
      
        },

        // 保存
        handleSave() {
            if (this.addGroupName || this.editGroupId) {
                // 如果是新增条件组，需要判断是否重名
                if (this.addGroupName && this.savedGroups.indexOf(this.addGroupName) >= 0) {
                    return this.$message.error('条件组名称重复')
                }
                this.validateCondition(() => {
                    const list = this.dealConditionItems();
                    ConditionSave(list).then(res => {
                        if (res && res.code === 0) {
                            this.$message.success('保存成功');
                            this.addGroupName && this.getSavedGroup()
                        }
                        else this.$message.error(res && res.msg ? res.msg : '保存失败');
                    }).catch(err => {
                        this.$message.error('保存出错')
                    })
                })
            } else {
                this.$message.error('请输入条件组名称')
            }
        },

        // 查询病案结果数据
        getResultData(pager) {
            const pagination = pager || this.pager;
            this.validateCondition(() => {
                const conditionList = this.dealConditionItems();
                this.resultLoading = true;
                RandomSearch({
                    page: pagination.page,
                    size: pagination.rows,
                    conditionList: conditionList
                }).then(res => {
                    this.dialogTableVisible = true
                    if (res && res.data) {
                        this.resultData = res.data.content;
                        this.pager = { ...pagination, total: res.data.total };
                        this.conditionList = conditionList;
                    } else {
                        this.$message.error('查询失败');
                        this.resultData = [];
                        this.pager = { page: 1, rows: 10, total: 0 };
                        this.conditionList = undefined
                    }
                    this.resultLoading = false
                }).catch(res => {
                    this.$message.error('查询失败');
                    this.resultData = [];
                    this.pager = { page: 1, rows: 10, total: 0 };
                    this.conditionList = undefined;
                    this.resultLoading = false
                })
            });
        },

        // 校验条件项是否完整
        validateCondition(successCallBack) {
            if (!this.conditionItems.length) {
                this.$message.error('请设置条件');
            } else {
                // 判断括号是否匹配
                const fh1Nums = this.conditionItems.filter(item => item.fh1).reduce((sum, item) => (item.fh1.length + sum), 0);
                const fh2Nums = this.conditionItems.filter(item => item.fh2).reduce((sum, item) => (item.fh2.length + sum), 0);
                if (fh1Nums !== fh2Nums) {
                    this.$message.error(`括号不匹配，左括号数 ${fh1Nums}，右括号数 ${fh2Nums}`);
                    return
                }
                // 判断括号方向是否匹配（如第一个时),第二个是(,数量一致但方向不对）
                const str = this.conditionItems.map(item => ((item.fh1 || '') + (item.fh2 || ''))).join('');
                console.log(str, 'str');
                let lastLeft = undefined;
                let errIndex = -1;
                for (let i = 0; i < str.length; i++) {
                    if (errIndex >= 0) break;
                    if (str[i] === '(') {
                        lastLeft = '('
                    } else if (str[i] === ')') {
                        if (!lastLeft) errIndex = i;
                        else lastLeft = undefined;
                    }
                }
                if (errIndex >= 0) {
                    this.$message.error(`左右括号不匹配`); // 第${errIndex + 1}个右括号没有匹配的左括号
                    return;
                }
                const names = ['conditionField', 'conditionRelation', 'itemRelation']; //  'conditionValueName',
                const labels = ['条件项', '关系', '关联']; // '条件值',
                let err = false;
                for (let i = 0; i < this.conditionItems.length; i++) {
                    if (err) break;
                    for (let j = 0; j < names.length; j++) {
                        // 没有值，且不是最后一个itemRelation，显示error
                        if (!this.conditionItems[i][names[j]] && (i !== this.conditionItems.length - 1 || j !== names.length - 1)) {
                            this.$message.error(`第${i + 1}个条件未设置${labels[j]}`);
                            err = true;
                            break;
                        }
                    }
                }
                !err && successCallBack()
            }
        },

        // 整理条件项数据 用于保存和查询
        dealConditionItems() {
            return this.conditionItems.map((item, index) => ({
                hmm: this.addGroupName || this.editGroupId, // 条件组名称
                cxx: item.conditionField, // 条件项字段名
                name: item.conditionFieldName, // 条件项字段名对应中文
                ysz: item.bzk ? (item.conditionValue) : (item.conditionValueName ? item.conditionValueName.trim() : ''), // 条件项值(没有bzk是直接输入的值)
                yszt: item.conditionValueName ? item.conditionValueName.trim() : '', // 条件项值对应中文
                gxf: item.conditionRelation, // 条件字段与条件值的关系
                glf: item.itemRelation, // 条件之间的关系
                km: item.km, // 条件项所在表名
                bzk: item.bzk, // 值的字典表
                bzkdmmc: item.bzkdmmc, // 字典字段
                type: item.type, // 条件类型
                xh: (index + 1), // 排序
                fh1: item.fh1, // 左括号
                fh2: item.fh2 // 右括号
            }))
        },

        /* ----------------------------------- 代码录入相关--------------------------------------------- */

        /**
         * 打开字典录入
         * @param e 事件
         * @param name field or value ，即是条件字段的录入还是条件值的录入
         * @param rowIndex
         */
        handleOpenDictDialog(e, name, rowIndex) {
            this.selectModule = false
            if (name === 'field') {
                this.dictInputDialog = {
                    visible: true,
                    dictType: 'conditionDict',
                    currentOpener: {
                        rowIndex,
                        fields: [
                            { dictField: 'dm', targetField: 'conditionField' },
                            { dictField: 'dmmc', targetField: 'conditionFieldName' },
                            { dictField: 'fieldKu', targetField: 'km' },
                            { dictField: 'fieldDmkm', targetField: 'bzk' },
                            { dictField: 'fieldDmmc', targetField: 'bzkdmmc' },
                            { dictField: 'fieldType', targetField: 'type' }
                        ]
                    }
                };
                // e.target.blur();
            } else if (name === 'value' && this.conditionItems[rowIndex].bzk) {
                this.dictInputDialog = {
                    visible: true,
                    dictType: 'conditionValueDict',
                    extraParams: {
                        tableName: this.conditionItems[rowIndex].bzk,
                        fieldName: this.conditionItems[rowIndex].bzkdmmc
                    },
                    currentOpener: {
                        rowIndex,
                        fields: [
                            { dictField: 'dmmc', targetField: 'conditionValueName' },
                            { dictField: 'code', targetField: 'conditionValue' }
                        ]
                    }
                };
                e.target.blur();
            } else if (name === 'module') {
                this.selectModule = true
                this.dictInputDialog = {
                    visible: true,
                    dictType: 'conditionDict',
                    currentOpener: {
                        rowIndex,
                        fields: [
                            // { dictField: 'dm', targetField: 'conditionField' },
                            // { dictField: 'dmmc', targetField: 'conditionFieldName' },
                            // { dictField: 'fieldKu', targetField: 'km' },
                            // { dictField: 'fieldDmkm', targetField: 'bzk' },
                            // { dictField: 'fieldDmmc', targetField: 'bzkdmmc' },
                            // { dictField: 'fieldType', targetField: 'type' }
                        ]
                    }
                };
            }
        },

        // 字典选择
        handleDictInputSubmit(dictRow) {
            if (this.selectModule) {
                console.log('dictRow', dictRow) 
                this.moduleName = dictRow.dmmc
            } else {
                const { rowIndex, fields } = this.dictInputDialog.currentOpener;
                const conditionItems = this.conditionItems.slice();
                fields.forEach(item => {
                    conditionItems[rowIndex][item.targetField] = dictRow[item.dictField] || undefined
                });
                this.conditionItems = conditionItems;
                this.$nextTick(function () {
                    this.focusNext(`${fields[0].targetField}-${rowIndex}`)
                })
            }
        },

        // 去往首页编辑
        toHomePage(baza00) {
            this.validateCondition(() => {
                this.setSearchInfo({
                    baza00,
                    randomSearchCondition: this.dealConditionItems(),
                    searchData: {
                        pager: { ...this.pager },
                        tableData: this.resultData.slice()
                    }
                });
                this.$router.push({ path: '/admin/homepage/index' })
                this.dialogTableVisible = false
            });
        }
    }
}

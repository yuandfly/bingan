import DictInput from '../../components/dialog/dict-input.vue';
import PagingToolbar from '../../components/toolbar/paging.vue';
import { receiveSearch, receiveSave } from '../../api/receiveManager';
import { formatDate, today } from "../../utils";
import crypto from "@/common/js/crypto.js";

export default {
    name: "receiveManager", // 病案签收管理
    components: { DictInput, PagingToolbar },
    data() {
        return {
            registerForm: {
                baza01: undefined,
                hsry: '登录人账号',
                hsrq: formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')
            },
            searchForm: {state: '1'},
            tableData: [],
            pager: { page: 1, rows: 100, total: 0 },
            loading: false,
            saveLoading: false,
            dictInputDialog: {
                currentOpener: [],
                visible: false,
                dictType: 'departmentDict' // 出入院科室字典
            },
        }
    },
    created() {
        this.getUser()
        // this.registerForm.baza27 = today().split('-')[0] + '-01-01'
    },
    mounted() {
        this.handleSearch(today().split('-')[0] + '-01-01')
    },

    methods: {

        // 聚焦不显示日期面板，按空格键后显示
        triggerDatePickVisible(popperClassName, visible) {
            if (visible) {
                document.getElementsByClassName(popperClassName)[0].style.display = 'block'
            } else {
                setTimeout(() => {
                    const a = document.getElementsByClassName(popperClassName)[0];
                    a && (a.style.display = 'none')
                }, 50);
                // document.querySelector(`.date-${this.config.name}`).style.display = 'block'
            }
        },

        handleBazaInput(val) {
            if (val.length === 7 && /^\d+$/.test(val)) {
                this.handleSave()

            }
        },

        // 登记保存
        handleSave() {
            this.saveLoading = true;
            receiveSave(this.registerForm).then(res => {
                if (res && res.code === 0) {
                    this.$message.success('保存成功');
                    this.registerForm.baza01 = undefined;
                    this.getData()
                }
                else this.$message.error(res && res.msg ? res.msg : '保存失败')
            }).catch(err => {
                this.$message.error('保存错误')
            }).finally(() => {
                this.saveLoading = false;
                this.registerForm.baza01 = undefined;

            })
        },

        handleSearch(data) {
            this.getData({ page: 1, rows: 100 }, data)
        },

        getData(pager, data) {
            const pagination = pager || this.pager;
            let params = {
                page: pagination.page,
                limit: pagination.rows,
                ...this.searchForm
            };
            if (!data) {
                // 出院时间和签收时间
                ['baza27', 'hsrq'].forEach(key => {
                    if (params[key] && params[key].length) {
                        params[`${key}End`] = params[key][1];
                        params[key] = params[key][0]
                    }
                });
            } else {
                params.baza27 = data
            }
            this.loading = true;
            receiveSearch(params).then(res => {
                if (res && res.data) {
                    this.tableData = res.data.content;
                    this.pager = { ...this.pager, total: res.data.total }
                    params.baza27 = ''
                } else {
                    this.$message.error(res && res.msg ? res.msg : '查询失败')
                }
            }).catch(err => {
                this.$message.error('查询错误')
            }).finally(() => {
                this.loading = false;
            })
        },

        // 打开字典录入
        handleOpenDict(type, event) {
            event.target.blur();
            this.dictInputDialog.visible = true;
            this.dictInputDialog.currentOpener = [type, type + 'name'];
        },

        // 字典录入的提交
        handleDictInputSubmit(dictItem) {
            console.log(dictItem);
            const [keyField, nameField] = this.dictInputDialog.currentOpener;
            if (keyField) this.searchForm[keyField] = dictItem.dm;
            if (nameField) this.searchForm[nameField] = dictItem.dmmc;
            this.dictInputDialog.visible = false;
        },

        //获取登录账号
        getUser() {
            let sessionUser = sessionStorage.getItem("sessionUser");
            let sessionUserValue = crypto.decrypt(sessionUser, null);
            if (sessionUserValue) {
                sessionUserValue = JSON.parse(sessionUserValue);
                this.registerForm.hsry = sessionUserValue.adminData.username;
            }
        }
    }
}

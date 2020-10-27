
<template>
    <el-dialog
            title="转科科别详情"
            class="pathologic-dialog"
            :visible="visible"
            :append-to-body="false"
            width="1100px"
            top="50px"
            :close-on-click-modal="false"
            @close="handleClose"
    >
        <div class="drugs-header">
            <el-form :inline="true" :model="form">
                <el-form-item label="病案号">
                    <el-input
                            :ref="formFields[0]"
                            style="width: 180px"
                            size="mini"
                            :value="this.form.baza00"
                            @keydown.native.enter="handleFocus(1)"
                    />
                </el-form-item>
                <el-form-item label="转出科别">
                    <el-input
                            :ref="formFields[1]"
                            :value="form.kebieNameOut"
                            size="mini"
                            style="width: 100px"
                            @keydown.native.enter="handleFocus(2)"
                            @keyup.native.32="openDictInput('departmentDict', [formFields[1], 'kebieNameOut'])"
                    />
                </el-form-item>
                <el-form-item label="转入科别">
                    <el-input
                            :ref="formFields[2]"
                            style="width: 130px"
                            size="mini"
                            :value="form.kebieNameIn"
                            @keydown.native.enter="handleFocus(3)"
                            @keyup.native.32="openDictInput('departmentDict', [formFields[2], 'kebieNameIn'])"
                    />
                </el-form-item>
                <el-form-item label="转科日期">
                    <el-date-picker
                            :ref="formFields[3]"
                            style="width: 130px"
                            size="mini"
                            value-format="yyyy-MM-dd"
                            v-model="form[formFields[3]]"
                    />
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-bottom: 10px">
            <el-button type="primary" size="mini" @click="handleAdd">追加</el-button>
        </div>
        <el-table :data="departmentData || []" border>
            <el-table-column prop="baf208" label="序号"></el-table-column>
            <el-table-column prop="kebieNameOut" label="转出科别"></el-table-column>
            <el-table-column prop="kebieNameIn" label="转入科别"></el-table-column>
            <el-table-column prop="stayDays" label="转出前在本科入住天数">
                <template slot-scope="scope">
                    <el-input-number size="small" :controls="false" v-model="scope.row.stayDays" />
                </template>
            </el-table-column>
            <el-table-column prop="changeDate" label="转科日期"></el-table-column>
            <el-table-column prop="c" label="操作">
                <template slot-scope="scope">
                    <el-button
                            style="color: #F56C6C"
                            @click="handleDel(scope.$index)"
                            type="text"
                            size="mini"
                            icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <DictInput
                :visible.sync="dict.visible"
                :append-to-body="true"
                :dictType="dict.dictType"
                :extraParams="dict.extraParams"
                @submit="this.handleDictInputSubmit"
        />
        <span slot="footer">
      <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import DictInput from "../../../components/dialog/dict-input";
    import { GetUpdateKeyDiagnosis } from "../../../api/dictionary";
    export default {
        name: "change-department-input", // 转科科别录入
        components: { DictInput },
        props: {
            visible: {
                type: Boolean,
                default: false,
                required: true
            },
            baza00: {
                type: String,
                default: "",
                required: true
            },
            enterDate: { // 入院日期
                type: String,
                default: "",
                required: true
            },
            departmentData: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                dict: {
                    dictType: undefined,
                    visible: false,
                    currentOpener: [],
                },
                formFields: ["baza00", "baf205", "baf202", "changeDate"],
                formFieldsName: [
                    "病案号",
                    "转出科别",
                    "转入科别",
                    "转科日期"
                ],
                form: {},
                tableData: [],
                options: []
            };
        },
        watch: {
            baza00(val) {
                this.form.baza00 = val;
            }
        },
        methods: {

            openDictInput(dictType, currentOpener) {
                this.dict = {
                    visible: true,
                    dictType,
                    extraParams: {},
                    currentOpener
                };
            },

            handleDictInputSubmit(item) {
                if (this.dict.currentOpener) {
                    this.form[this.dict.currentOpener[0]] = item.dm;
                    this.form[this.dict.currentOpener[1]] = item.dmmc;
                    const index = this.formFields.indexOf(this.dict.currentOpener[0]);
                    (index && index < 3) && this.handleFocus(index + 1);
                }
            },

            handleFocus(nextIndex) {
                this.$refs[this.formFields[nextIndex]].focus();
                this.$refs[this.formFields[nextIndex]].$el.click();
            },

            handleAdd() {
                let error = false;
                // 验证完整
                for (let i = 0; i < this.formFields.length; i++) {
                    const val = this.form[this.formFields[i]];
                    if (!val || !val.trim()) {
                        error = true;
                        this.$message.error(`请输入${this.formFieldsName[i]}`);
                        break;
                    }
                }
                // 验证时间先后
                const startDate = this.departmentData.length ? this.departmentData[this.departmentData.length - 1].changeDate : this.enterDate;
                const days = Date.parse(this.form[this.formFields[3]]) - Date.parse(startDate);
                if (days < 0) {
                    error = true;
                    this.$message.error(`转科日期小于${this.departmentData.length ? '上次转科日期' : '入院时间'}`)
                }
                if (!error) {
                  //  console.log("good");
                    const departmentData = this.departmentData.slice();
                    departmentData.push({
                        baf208: String(departmentData.length + 1), // 序号
                        ...this.form,
                    });
                    this.calcStayDays(departmentData);
                    this.$emit("update:departmentData", departmentData);
                    this.form = { baza00: this.baza00 };
                }
            },

            handleDel(index) {
                const departmentData = this.departmentData.slice();
                departmentData.splice(index, 1);
                departmentData.forEach((item, index) => {
                    item.baf208 = String(index + 1);
                });
                this.calcStayDays(departmentData);
                this.$emit("update:departmentData", departmentData);
            },

            // 计算各次转院逗留天数
            calcStayDays(departmentData) {
                let error = false;
                for(let index = 0; index < departmentData.length; index++) {
                    const item = departmentData[index];
                    const startDate = index === 0 ? this.enterDate : departmentData[index - 1].changeDate;
                    const endDate = item.changeDate;
                    let days = Date.parse(endDate) - Date.parse(startDate);
                    days = Math.floor(days / (24 * 3600 * 1000));
                    item.stayDays = days
                }
                return !error
            },

            handleSubmit() {
                const firstItem = this.departmentData.find(item => item.baf208 == 1) || {};
                this.$emit("submit", firstItem);
            },

            handleClose() {
                this.$emit("update:visible", false);
            }
        }
    };
</script>

<style scoped lang="less">
    .pathologic-dialog {
    }
</style>


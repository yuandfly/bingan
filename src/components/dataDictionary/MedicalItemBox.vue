<template>
    <div>
        <el-dialog title="添加医技项目"  :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
                <el-row :gutter="4">
                    <el-col :span="11" v-if="currentItem.dm1">
                        <el-form-item label="项目代码2" :label-width="formLabelWidth" prop="dm2">
                            <el-input v-model="form.dm2" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-else>
                        <el-form-item label="项目代码1" :label-width="formLabelWidth" prop="dm1">
                            <el-input v-model="form.dm1" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-if="currentItem.dm1">
                        <el-form-item label="项目名称2" :label-width="formLabelWidth"  prop="xmmc">
                            <el-input v-model="form.xmmc" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" v-else>
                        <el-form-item label="项目名称1" :label-width="formLabelWidth"  prop="lmmc">
                            <el-input v-model="form.lmmc" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="单位名称" :label-width="formLabelWidth" prop="dwmc">
                            <el-input v-model="form.dwmc" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="统计归口" :label-width="formLabelWidth" prop="tjgkName">
                            <el-input
                                    :value="form.tjgkName"
                                    @keyup.native.32="handleOpenDictInput({},'GetMedicalProjectFile')"
                                    @keydown.native.115="clearDictInputValue('GetMedicalProjectFile')"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="起始日期" :label-width="formLabelWidth" prop="qsrq">
                            <el-date-picker size="small"
                                            v-model="form.qsrq"
                                            placeholder="选择日期时间"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"
                                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="停止日期" :label-width="formLabelWidth" prop="tzrq">
                            <el-date-picker size="small"
                                            v-model="form.tzrq"
                                            placeholder="选择日期时间"
                                            format="yyyy-MM-dd"
                                            style="width: 100%"
                                            value-format="yyyy-MM-dd"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="阳性率标志" :label-width="formLabelWidth">
                            <el-switch
                                    v-model="form.yxbz"
                                    active-value="1"
                                    inactive-value="0"
                                    active-text="阳性"
                                    inactive-text="阴性"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            ></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="是否停用" :label-width="formLabelWidth">
                            <el-switch
                                    v-model="form.bz"
                                    active-text="启"
                                    inactive-text="停"
                                    active-value="0"
                                    inactive-value="1"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                            ></el-switch>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" size="medium" @click="addOutpatient">确 定</el-button>
            </div>
            <DictInput
                    :visible.sync="dictInputDialog.visible"
                    :dictType="dictInputDialog.dictType"
                    :extraParams="dictInputDialog.extraParams"
                    @submit="handleDictInputSubmit"
                    :appendToBody="true"
            />
        </el-dialog>
    </div>
</template>

<script>
    import { InsertMedicalItem } from "../../api/index";
    import { showOkMsg, showErrorMsg } from "@/utils/index.js";
    import DictInput from "../../components/dialog/dict-input";
    export default {
        components: {
            DictInput
        },
        props: {
            kbdm: {},
            currentItem: {}
        },
        data() {
            return {
                dictInputDialog: {
                    visible: false,
                    dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
                    extraParams: undefined, // 额外参数，如科室,见 filtersFields
                    currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
                },
                dialogFormVisible: false,
                form: {
                    bz: "0",
                    kbdm: this.kbdm
                },
                formLabelWidth: "110px",
                rulesForm: {
                    dm1: [
                        {
                            required: true,
                            message: "请填写医技项目代码",
                            trigger: ["change"],
                        },
                    ],
                    lmmc: [
                        {
                            required: true,
                            message: "请填写医技项目名称",
                            trigger: ["change"],
                        }
                    ],
                    dm2: [
                        {
                            required: true,
                            message: "请填写医技项目代码",
                            trigger: ["change"],
                        },
                    ],
                    xmmc: [
                        {
                            required: true,
                            message: "请填写医技项目名称",
                            trigger: ["change"],
                        }
                    ],
                    tjgkName: [
                        {
                            required: true,
                            message: "请选择统计归口",
                            trigger: ["change"],
                        }
                    ],
                    qsrq: [
                        {
                            required: true,
                            message: "请选择起始日期",
                            trigger: ["change"],
                        }
                    ],
                    tzrq: [
                        {
                            required: true,
                            message: "请选择停止日期",
                            trigger: ["change"],
                        }
                    ]
                },
            };
        },
        methods: {
            openBox() {
                this.dialogFormVisible = true;
            },
            addOutpatient() {
                console.log(this.currentItem);
                this.$refs["rulesFormRef"].validate((valid) => {
                    if (valid) {

                        if (this.form.qsrq > this.form.tzrq) {
                            this.$message.error('起始日期不能大于停止日期');
                            return;
                        }

                        if (this.currentItem.dm1) {
                            this.form.dm1 = this.currentItem.dm1;
                            this.form.lmmc = this.currentItem.lmmc;
                        }


                        this.form.kbdm = this.kbdm;
                        //   this.form.bz ? (this.form.bz = "1") : (this.form.bz = "0");
                        InsertMedicalItem(this.form).then((res) => {
                            console.log(res);
                            if (res.data.code === 0) {
                                showOkMsg(res.data.msg);
                                this.$emit("fun");

                                this.dialogFormVisible = false;
                            } else this.$message.error(res.data.msg);
                            this.form = {bz: "1"};
                        });
                    }
                });
            },
            // 打开代码录入
            handleOpenDictInput(item, type, index) {
                const { name, dictType, dictField, range } = item;
                this.dictInputDialog = {
                    visible: true,
                    dictType: type,
                    currentOpener: { name, dictField },
                };
                this.kbType = type;
            },
            // f4 清除科别的选择
            clearDictInputValue(type, index) {

                if (type === "medicalSubjects") {
                   this.form.kmdm = "";
                    this.form.tjgk = "";
                }
            },
            // 代码录入提交
            handleDictInputSubmit(row) {
                console.log(row);
                // if (this.kbType === "medicalSubjects") {
                    this.form.tjgk = row.dm;
                    this.form.tjgkName = row.dmmc;
                // }
            },
        },
    };
</script>

<style scoped>
</style>
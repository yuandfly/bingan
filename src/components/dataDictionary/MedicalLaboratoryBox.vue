<template>
    <div>
        <el-dialog title="添加医技科室"  :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
                <el-row :gutter="4">
                    <el-col :span="11">
                        <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
                            <el-input v-model="form.dm" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="科室名称" :label-width="formLabelWidth"  prop="dmmc">
                            <el-input v-model="form.dmmc" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="科别简称" :label-width="formLabelWidth" prop="kbjc">
                            <el-input v-model="form.kbjc" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="11">
                        <el-form-item label="科别序号" :label-width="formLabelWidth" prop="kbxh">
                            <el-input v-model="form.kbxh" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="22">
                        <el-row :gutter="4">
                            <el-col :span="12">
                                <el-form-item label="科目代码" :label-width="formLabelWidth" prop="kmdm">
                                    <el-input
                                            :value="form.kmdm"
                                            size="small"
                                            @keyup.native.32="handleOpenDictInput({},'medicalSubjects')"
                                            @keydown.native.115="clearDictInputValue('medicalSubjects')"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="科目名称" :label-width="formLabelWidth">
                                    <el-input :value="form.kmmc" size="small" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
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
    import { InsertMedicalLaboratory } from "../../api/index";
    import { showOkMsg, showErrorMsg } from "@/utils/index.js";
    import DictInput from "../../components/dialog/dict-input";
    export default {
        components: {
            DictInput
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
                },
                formLabelWidth: "110px",
                rulesForm: {
                    kbxh: [
                        {
                            required: true,
                            message: "请填写序号",
                            trigger: ["change"],
                        },
                        {
                            min: 1,
                            max: 4,
                            message: "长度在 1 到 4 个字符",
                            trigger: ["change", "blur"],
                        },
                    ],
                    dm: [
                        {
                            required: true,
                            message: "请填写门观科室代码",
                            trigger: ["change"],
                        },
                    ],
                    dmmc: [
                        {
                            required: true,
                            message: "请填写医技科室名称",
                            trigger: ["change"],
                        }
                    ],
                    kmdm: [
                        {
                            required: true,
                            message: "请选择科目代码",
                            trigger: ["change"],
                        }
                    ],
                    kbjc: [
                        {
                            required: true,
                            message: "请填写科别简称",
                            trigger: ["change"],
                        }
                    ],
                },
            };
        },
        methods: {
            openBox() {
                this.dialogFormVisible = true;
            },
            addOutpatient() {
                this.$refs["rulesFormRef"].validate((valid) => {
                    if (valid) {

                        if  (this.form.kbxh.length !== 1) {
                            this.$message.error('科别序号必须为1个字符');
                            return;
                        }

                        //   this.form.bz ? (this.form.bz = "1") : (this.form.bz = "0");
                        InsertMedicalLaboratory(this.form).then((res) => {
                            console.log(res);
                            if (res.data.code === 0) {
                                showOkMsg(res.data.msg);
                                this.$emit("fun");
                                this.dialogFormVisible = false;
                            } else this.$message.error(res.data.msg);
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
                this.index = index;
                this.kbType = type;
            },
            // f4 清除科别的选择
            clearDictInputValue(type, index) {
                this.index = index;
                if (type === "medicalSubjects") {
                   this.form.kmdm = "";
                    this.form.kmmc = "";
                }
            },
            // 代码录入提交
            handleDictInputSubmit(row) {
                console.log(row);
                // if (this.kbType === "medicalSubjects") {
                    this.form.kmdm = row.dm;
                    this.form.kmmc = row.dmmc;
                // }
            },
        },
    };
</script>

<style scoped>
</style>
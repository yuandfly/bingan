<template>
    <div>
        <el-dialog title="添加西医诊断"  :visible.sync="dialogFormVisible" width="800px">
            <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="项目代码" :label-width="formLabelWidth" prop="dm">
                            <el-input v-model="form.dm" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="项目名称" :label-width="formLabelWidth"  prop="dmmc">
                            <el-input v-model="form.dmmc" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ICD-9" :label-width="formLabelWidth" prop="icd9">
                            <el-input v-model="form.icd9" size="small"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="ICD-10" :label-width="formLabelWidth" prop="icd10">
                            <el-input
                                    v-model="form.icd10"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="统计码（ICD-9）" :label-width="formLabelWidth" prop="tjm">
                            <el-input
                                    v-model="form.tjm"
                                    size="small"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="统计码（ICD-10）" :label-width="formLabelWidth" prop="tjm1">
                            <el-input
                                    v-model="form.tjm1"
                                    size="small"

                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
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
        </el-dialog>
    </div>
</template>

<script>
    import { InsertDiagnosis } from "../../../api/index";
    export default {
        components: {
        },
        props: {

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
                formLabelWidth: "100",
                rulesForm: {
                    dm: [
                        {
                            required: true,
                            message: "请填写西医诊断代码",
                            trigger: ["change"],
                        },
                    ],
                    dmmc: [
                        {
                            required: true,
                            message: "请填写西医诊断名称",
                            trigger: ["change"],
                        }
                    ],
                    icd9: [
                        {
                            required: true,
                            message: "请填写ICD-9",
                            trigger: ["change"],
                        }
                    ],
                    icd10: [
                        {
                            required: true,
                            message: "请填写ICD-10",
                            trigger: ["change"],
                        }
                    ],
                    tjm: [
                        {
                            required: true,
                            message: "请填写统计码（ICD-9）",
                            trigger: ["change"],
                        }
                    ],
                    tjm1: [
                        {
                            required: true,
                            message: "请填写统计码（ICD-10）",
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
                this.$refs["rulesFormRef"].validate((valid) => {
                    if (valid) {
                        console.log(this.kbdm);
                        this.form.kbdm = this.kbdm;
                        //   this.form.bz ? (this.form.bz = "1") : (this.form.bz = "0");
                        InsertDiagnosis(this.form).then((res) => {
                            console.log(res);
                            if (res.data.code === 0) {
                                this.$message.success(res.data.msg);
                                this.$emit("fun");
                                this.dialogFormVisible = false;
                            } else this.$message.error(res.data.msg);
                        });
                    }
                });
            },
        },
    };
</script>

<style scoped>
</style>
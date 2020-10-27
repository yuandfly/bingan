<template>
    <div>
        <el-dialog title="添加医技项目归口"  :visible.sync="dialogFormVisible" width="800px">
            <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
                <el-row >
                    <el-col :span="12">
                        <el-form-item label="归口代码" :label-width="formLabelWidth" prop="dm">
                            <el-input v-model="form.dm" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="归口名称" :label-width="formLabelWidth"  prop="dmmc">
                            <el-input v-model="form.dmmc" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位" :label-width="formLabelWidth"  prop="kbxh">
                            <el-input v-model="form.dw" size="small"></el-input>
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
    import { InsertMedicalProjectFile } from "../../../api/index";
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
                            message: "请填写归口代码",
                            trigger: ["change"],
                        },
                    ],
                    dmmc: [
                        {
                            required: true,
                            message: "请填写归口名称",
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
                        InsertMedicalProjectFile(this.form).then((res) => {
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
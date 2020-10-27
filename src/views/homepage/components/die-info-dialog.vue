
<template>
    <el-dialog
            title="死亡详情"
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
                <el-form-item label="根本死因">
                    <el-input
                            :ref="formFields[1]"
                            style="width: 130px"
                            size="mini"
                            :value="form.baf302Name"
                            @keydown.native.enter="handleFocus(2)"
                            @keyup.native.32="openDictInput('westernDiagnoseDict', [formFields[1],formFields[2],formFields[3],formFields[4],  'baf302Name'])"
                    />
                </el-form-item>
                <el-form-item label="ICD-10">
                    <el-input
                            :ref="formFields[2]"
                            style="width: 130px"
                            size="mini"
                            :value="form.baf308"
                            @keydown.native.enter="handleFocus(3)"
                    />
                </el-form-item>
                <el-form-item label="统计码">
                    <el-input
                            :ref="formFields[3]"
                            style="width: 130px"
                            size="mini"
                            :value="form.baf304"
                            @keydown.native.enter="handleFocus(4)"
                    />
                </el-form-item>
                <el-form-item label="ICD-9">
                    <el-input
                            :ref="formFields[4]"
                            style="width: 130px"
                            size="mini"
                            :value="form.baf303"
                            @keydown.native.enter="handleFocus(5)"
                    />
                </el-form-item>

                <el-form-item label="尸检诊断">
                    <el-input
                            :ref="formFields[5]"
                            style="width: 130px"
                            size="mini"
                            v-model="form.baf305Name"
                            @keydown.native.enter="handleFocus(6)"
                            @keyup.native.32="openDictInput('westernDiagnoseDict', [formFields[5], 'baf305Name'])"
                    />
                </el-form-item>
                <el-form-item label="尸检诊断符合情况">
                    <el-select v-model="form.baf306"  :ref="formFields[6]"  @keydown.native.enter="handleFocus(7)" size="mini">
                        <el-option label="无" value="0">0.无</el-option>
                        <el-option label="符合" value="1">1.符合</el-option>
                        <el-option label="不符合" value="2">2.不符合</el-option>
                        <el-option label="不肯定" value="3">3.不肯定</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="死亡时间">

                    <el-time-picker
                            :ref="formFields[7]"
                            style="width: 130px"
                            size="mini"
                            format="HH:mm"
                            value-format="HH:mm"
                            v-model="form.baf307"
                            @keydown.native.enter="handleSubmit"
                    />
                </el-form-item>
            </el-form>
        </div>
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
        name: "die-info-dialog", // 转科科别录入
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
            swsjhz: { // 入院日期
                type: String,
                default: "",
                required: true
            },
            dieInfoData: {
                type: Object,
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
                formFields: ["baza00", "baf302", "baf308", "baf304", "baf303", "baf305", "baf306", "baf307"],
                formFieldsName: [
                    "病案号",
                    "根本死因",
                    "ICD-10",
                    "统计码",
                    "ICD-9",
                    "尸检诊断",
                    "尸检诊断符合情况",
                    "死亡时间"
                ],
                form: {
                    baf306: "1",

                },
                tableData: [],
                options: []
            };
        },
        watch: {
            baza00(val) {
                this.form.baza00 = val;
            },
            visible (val) {
                if (val) {
                    console.log(this.dieInfoData);
                    if (this.dieInfoData) {
                        this.form = this.dieInfoData;
                        this.form.baza00 = this.baza00;
                    }   else {
                        this.form =  {
                            baf306: "1",
                            baza00: this.baza00
                        }
                    }
                }
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
                console.log(this.dict.currentOpener);
                if (this.dict.currentOpener[0] === "baf302") {
                    this.form[this.dict.currentOpener[0]] = item.dm;
                    this.form[this.dict.currentOpener[1]] = item.icd10;
                    this.form[this.dict.currentOpener[2]] = item.tjm;
                    this.form[this.dict.currentOpener[3]] = item.icd9;
                    this.form["baf302Name"] = item.dmmc;
                    this.handleFocus(5);
                } else if (this.dict.currentOpener[0] === "baf305") {
                    this.form[this.dict.currentOpener[0]] = item.dm;
                    this.form["baf305Name"] = item.dmmc;
                    this.handleFocus(6);
                }
            },


            handleFocus(nextIndex) {
                this.$refs[this.formFields[nextIndex]].focus();
                this.$refs[this.formFields[nextIndex]].$el.click();
            },


            handleSubmit() {
                console.log(this.swsjhz);
                if (!this.form['baf302']) {
                    this.$message.error('请选择根本死因');
                    return;
                }
                if (!this.form['baf305'] && this.swsjhz === '1') {
                    this.$message.error('请选择尸检诊断');
                    return;
                }
                if (!this.form['baf307']) {
                    this.$message.error('请选择死亡时间');
                    return;
                }

                this.$emit("submit", this.form);
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


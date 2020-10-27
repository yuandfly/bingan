<template>
  <div>
    <el-dialog title="添加医师" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="医师代码" :label-width="formLabelWidth" prop="code">
              <el-input v-model="form.code" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医师姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科室代码" :label-width="formLabelWidth">
              <el-input
                v-model="form.kbCode"
                size="small"
                @keyup.native.32="handleOpenDictInput({},'departmentDict')"
                @keydown.native.115="clearDictInputValue"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科室名称" :label-width="formLabelWidth">
              <el-input v-model="form.kbName" size="small" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医师类别" :label-width="formLabelWidth">
              <el-select v-model="form.physicianType" placeholder="请选择活动区域" size="small">
                <el-option label="门诊医师" value="1"></el-option>
                <el-option label="住院医师" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="医师职称" :label-width="formLabelWidth">
              <el-select v-model="form.qualifications" placeholder="请选择活动区域" size="small">
                <el-option label="正副主任医师" value="1"></el-option>
                <el-option label="主治医师" value="2"></el-option>
                <el-option label="医师医士" value="3"></el-option>
                <el-option label="进修实习人员" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="addDoctor">确 定</el-button>
      </div>
    </el-dialog>

    <DictInput
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="handleDictInputSubmit"
    />
  </div>
</template>

<script>
import { insetDoctorDictionary } from "../../api/dictionary";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
// import departmentDictionary from "../../components/dialog/departmentdictionary";
import DictInput from "../../components/dialog/dict-input";

export default {
  data() {
    return {
      show: false,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "100px",
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      rulesForm: {
        code: [
          { required: true, message: "请填写医师代码", trigger: ["change"] },
        ],
      },
    };
  },
  components: {
    DictInput,
  },
  methods: {
    openBox() {
      this.dialogFormVisible = true;
    },
    // 打开代码录入
    handleOpenDictInput(item, type, obj) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
      this.zdType = type;
      this.physicianObj = obj;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      this.form.kbName = row.dmmc;
      this.form.kbCode = row.dm;
    },
    // f4 清除科别的选择
    clearDictInputValue() {
      this.form.kbName = "";
      this.form.kbCode = "";
    },
    addDoctor() {
      this.$refs["rulesFormRef"].validate((valid) => {
        if (valid) {
          insetDoctorDictionary({
            dm: this.form.code,
            dmmc: this.form.name,
            ksdm: this.form.kbCode,
            ksmc: this.form.kbName,
            ysbz: this.form.physicianType,
            yszc: this.form.qualifications,
          }).then((res) => {
            if (res.code === 0) {
              showOkMsg(res.msg);
              this.$emit("fun");
              this.dialogFormVisible = false;
            } else showErrorMsg(res.msg);
          });
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
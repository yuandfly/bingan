<template>
  <div>
    <el-dialog title="添加门急诊" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="科别序号" :label-width="formLabelWidth">
              <el-input v-model="form.kbxh" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input v-model="form.dm" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科室名称" :label-width="formLabelWidth">
              <el-input v-model="form.dmmc" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="科别简称" :label-width="formLabelWidth">
              <el-input v-model="form.kbjc" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="科目名称" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.kmdm"
                    size="small"
                    @keyup.native.32="handleOpenDictInput({},'medicalSubjects')"
                    @keydown.native.115="clearDictInputValue('medicalSubjects')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="form.kmmc" size="small" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="4">
              <el-col :span="12">
                <el-form-item label="统计归口" :label-width="formLabelWidth">
                  <el-input
                    v-model="form.tjgk"
                    size="small"
                    @keyup.native.32="handleOpenDictInput({},'departmentStatistics')"
                    @keydown.native.115="clearDictInputValue('departmentStatistics')"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item>
                  <el-input v-model="form.tjName" size="small" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-form-item label="专科级别" :label-width="formLabelWidth">
              <el-select v-model="form.zkbz" placeholder="请选专科级别" size="small">
                <el-option label="否" value></el-option>
                <el-option label="国家级专科" value="1"></el-option>
                <el-option label="省（市区）级专科" value="2"></el-option>
                <el-option label="地（市）级专科" value="3"></el-option>
                <el-option label="院级专科" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label>
              <el-checkbox v-model="form.jtbz">家庭病床</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label>
              <el-checkbox v-model="form.jzbz">急诊标志</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="addOutpatient">确 定</el-button>
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
import { insertOutpatientDepartment } from "../../api/dictionary";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import DictInput from "../../components/dialog/dict-input";

export default {
  data() {
    return {
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
        dm: [
          {
            required: true,
            message: "请填写住院科别代码",
            trigger: ["change"],
          },
          {
            min: 2,
            max: 4,
            message: "长度在 2 到 4 个字符",
            trigger: ["change", "blur"],
          },
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
      this.form = {};
    },
    // 打开代码录入
    handleOpenDictInput(item, type) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
      this.ksType = type;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      if (this.ksType === "medicalSubjects") {
        this.form.kmdm = row.dm;
        this.form.kmmc = row.dmmc;
      }
      if (this.ksType === "departmentStatistics") {
        this.form.tjgk = row.dm;
        this.form.tjName = row.dmmc;
      }
    },
    // f4 清除科别的选择
    clearDictInputValue(type) {
      if (type === "medicalSubjects") {
        this.form.kmdm = "";
        this.form.kmmc = "";
      }
      if (type === "departmentStatistics") {
        this.form.tjgk = "";
        this.form.tjName = "";
      }
    },
    addOutpatient() {
      this.$refs["rulesFormRef"].validate((valid) => {
        if (valid) {
          insertOutpatientDepartment(this.form).then((res) => {
            if (res.code === 0) {
              this.$emit("fun");
              showOkMsg(res.msg);
            } else showErrorMsg(res.msg);
          });
          // this.dialogFormVisible = false;
        }
      });
    },
  },
};
</script>

<style scoped>
.dict_lan {
  display: flex;
  padding: 10px 20px;
  background-color: #eee;
}
</style>
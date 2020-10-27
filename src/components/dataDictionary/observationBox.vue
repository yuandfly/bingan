<template>
  <div>
    <el-dialog title="添加门观科室" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="rulesFormRef" :rules="rulesForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="科别序号" :label-width="formLabelWidth" prop="kbxh">
              <el-input v-model="form.kbxh" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="代码" :label-width="formLabelWidth" prop="dm">
              <el-input v-model="form.dm" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.dmmc" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="床位数" :label-width="formLabelWidth">
              <el-input v-model="form.cws" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="科别简称" :label-width="formLabelWidth">
              <el-input v-model="form.kbjc" size="small"></el-input>
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
    </el-dialog>
  </div>
</template>

<script>
import { insertObservationRoom } from "../../api/dictionary";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        bz: "0",
      },
      formLabelWidth: "100px",
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
  methods: {
    openBox() {
      this.dialogFormVisible = true;
    },
    addOutpatient() {
      this.$refs["rulesFormRef"].validate((valid) => {
        if (valid) {
          //   this.form.bz ? (this.form.bz = "1") : (this.form.bz = "0");
          insertObservationRoom(this.form).then((res) => {
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
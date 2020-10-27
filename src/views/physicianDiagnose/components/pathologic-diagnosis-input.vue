


<template>
  <el-dialog
    title="病理诊断录入"
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
            style="width: 130px"
            size="mini"
            :value="baza00"
            @keydown.native.enter="handleFocus(1)"
          />
        </el-form-item>
        <el-form-item label="医技诊断标志">
          <el-select
            :ref="formFields[1]"
            v-model="form[formFields[1]]"
            size="mini"
            style="width: 100px"
            @keydown.native.enter="handleFocus(2)"
          >
            <el-option v-for="item in options" :value="item.dm" :label="item.dmmc" :key="item.dm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病理检查号">
          <el-input
            :ref="formFields[2]"
            style="width: 130px"
            size="mini"
            v-model="form[formFields[2]]"
            @keydown.native.enter="handleFocus(3)"
          />
        </el-form-item>
        <el-form-item label="病理诊断">
          <el-input
            :ref="formFields[3]"
            style="width: 130px"
            size="mini"
            @keyup.native.32="openDictInput('gb48Dict')"
            v-model="form[formFields[3]]"
            @keydown.native.enter="handleFocus(4)"
          />
        </el-form-item>
        <el-form-item label="诊断符合情况">
          <el-input
            :ref="formFields[4]"
            :controls="false"
            :min="0"
            :max="3"
            style="width: 50px"
            size="mini"
            @input="handleInput"
            v-model="form[formFields[4]]"
          />
          <!--                    <el-select-->
          <!--                        v-model="form[formFields[4]]"-->
          <!--                        size="mini"-->
          <!--                        style="width: 100px"-->
          <!--                        :ref="formFields[4]"-->
          <!--                        automatic-dropdown-->
          <!--                    >-->
          <!--                        <el-option value="0" label="未做"></el-option>-->
          <!--                        <el-option value="1" label="符合"></el-option>-->
          <!--                        <el-option value="2" label="不符合"></el-option>-->
          <!--                        <el-option value="3" label="不肯定"></el-option>-->
          <!--                    </el-select>-->
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-bottom: 10px">
      <el-button type="primary" size="mini" @click="handleAdd">追加</el-button>
    </div>
    <el-table :data="diagnosisData || []" border>
      <el-table-column prop="baf208" label="序号"></el-table-column>
      <el-table-column prop="baf203" label="病理诊断名称"></el-table-column>
      <el-table-column prop="baf207" label="诊断编码"></el-table-column>
      <el-table-column prop="c" label="操作">
        <template slot-scope="scope">
          <el-button
            style="color: #F56C6C"
            @click="handleDel(scope.row.$index)"
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
  name: "pathologic-diagnosis-input", // 病理诊断录入
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
    diagnosisData: {
      type: Array,
      required: false
    }
  },
  data() {
    return {
      dict: {
        dictType: undefined,
        visible: false,
        extraParams: undefined
      },
      formFields: ["baza00", "baf205", "baf202", "baf203", "baf206"],
      formFieldsName: [
        "病案号",
        "医技诊断标志",
        "病理检查号",
        "病理诊断",
        "诊断符合情况"
      ],
      form: {},
      tableData: [],
      options: []
    };
  },
  watch: {
    baza00(val) {
      this.form.baza00 = val;
    },
    visible(next) {
      next && !this.options.length && this.getOptions();
    }
  },
  mounted() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      GetUpdateKeyDiagnosis({}).then(res => {
        if (res && res.data) {
          this.options = res.data;
        }
      });
    },

    handleInput(val) {
      const num = val[val.length - 1];
      if (Number(num) <= 3) this.form[this.formFields[4]] = num;
      else this.form[this.formFields[4]] = val[val.length - 2] || undefined;
    },

    openDictInput(dictType) {
      this.dict = {
        visible: true,
        dictType,
        extraParams: { bz: "0" }
      };
    },

    handleDictInputSubmit(item) {
      const fields = ["baf203/dmmc", "baf207/dm"];
      fields.forEach(field => {
        const [targetField, dictField] = field.split("/");
        this.form[targetField] = item[dictField];
      });
      this.handleFocus(4);
    },

    handleFocus(nextIndex) {
      if (nextIndex === 2) {
        this.$refs[this.formFields[1]].blur();
      }
      this.$refs[this.formFields[nextIndex]].focus();
      this.$refs[this.formFields[nextIndex]].$el.click();
    },

    handleAdd() {
      // 验证完整
      let error = false;
      for (let i = 0; i < this.formFields.length; i++) {
        const val = this.form[this.formFields[i]];
        if (!val || !val.trim()) {
          error = true;
          this.$message.error(`请输入${this.formFieldsName[i]}`);
          break;
        }
      }
      if (!error) {
      //  console.log("good");
        const diagnosisData = this.diagnosisData.slice();
        diagnosisData.push({
          baf208: String(diagnosisData.length + 1), // 序号
          ...this.form
        });
        this.$emit("update:diagnosisData", diagnosisData);
        this.form = { baza00: this.baza00 };
      }
    },

    handleDel(index) {
      const diagnosisData = this.diagnosisData.slice();
      diagnosisData.splice(index, 1);
      diagnosisData.forEach((item, index) => {
        item.baf208 = String(index + 1);
      });
      this.$emit("update:diagnosisData", diagnosisData);
    },

    handleSubmit() {
      const firstItem = this.diagnosisData.find(item => item.baf208 == 1) || {};
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


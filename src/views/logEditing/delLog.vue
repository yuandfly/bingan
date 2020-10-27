<template>
  <div
    class="homepage clearfix"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-background="rgba(0, 0, 0, 0.0)"
    element-loading-text="正在删除 . . ."
  >
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item>
          <el-radio-group v-model="form.delType" @change="changeType">
            <el-radio :label="'1'">门诊</el-radio>
            <el-radio :label="'2'">住院</el-radio>
            <el-radio :label="'3'">医技</el-radio>
            <el-radio :label="'4'">留观</el-radio>
            <el-radio :label="'5'">体验</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起始日期:">
          <el-date-picker
            v-model="form.dateBegin"
            type="date"
            size="small"
            placeholder="开始日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerBegin"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期:">
          <el-date-picker
            v-model="form.dateEnd"
            type="date"
            size="small"
            placeholder="终止日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerEnd"
            :clearable="false"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="del">删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content_box">
      <div class="content_num">
        <el-input
          :value="form.kbName"
          placeholder="请输入科别"
          @keyup.native.32="handleOpenDictInput({}, departmentDict)"
          @keydown.native.115="clearDictInputValue"
          :disabled="kbDisabled"
        ></el-input>
      </div>
    </div>

    <DictInput
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />
  </div>
</template>

<script>
import { deleteLog } from "@/api";
import { yesterday, today, showOkMsg, showErrorMsg } from "@/utils/index.js";
import DictInput from "../../components/dialog/dict-input";

export default {
  data() {
    return {
      form: {
        delType: "1",
        // recordCode: "",
        dateBegin: "",
        dateEnd: "",
        kbCode: "",
        kbName: "",
      },
      kbDisabled: false,
      fullscreenLoading: false,
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      departmentDict: 'outpatientDeptDict',
      pickerBegin: {
        disabledDate: (time) => {
          if (this.form.dateEnd) {
            return (
              time.getTime() > new Date(this.form.dateEnd).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        },
      },
      pickerEnd: {
        disabledDate: (time) => {
          if (this.form.dateBegin) {
            return (
              time.getTime() <
                new Date(this.form.dateBegin).getTime() - 12 * 60 * 60 * 1000 ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        },
      },
    };
  },
  created() {
    this.beginningDate();
  },
  components: {
    DictInput,
  },
  methods: {
    beginningDate() {
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
    },
    changeType(val) {

      switch (val) {
        case '1': this.departmentDict = 'outpatientDeptDict';break;
        case '2': this.departmentDict = 'departmentDict';break;
        case '3': this.departmentDict = 'GetMedicalLaboratoryDict';break;
        case '4': this.departmentDict = 'GetObservationRoomDict';break;
      }
      console.log(this.departmentDict);

      if (val != 5) {
        this.form.kbName = "";
        this.form.kbCode = "";
        this.kbDisabled = false;
              } else {
        this.form.kbName = "";
        this.form.kbCode = "";
        this.kbDisabled = true;
      }
    },
    del() {
      this.$confirm("此操作将永久删除日志, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delLog();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // // if (this.form.kbCode || this.form.delType === "5") {
      // this.fullscreenLoading = true;
      // deleteLog({
      //   bz: this.form.delType,
      //   dml: this.form.kbCode,
      //   endTime: this.form.dateEnd,
      //   startTime: this.form.dateBegin,
      // }).then((res) => {
      //   if (res.code === 0) {
      //     showOkMsg(res.msg);
      //     this.form.kbName = "";
      //     this.fullscreenLoading = false;
      //   } else {
      //     showErrorMsg("删除失败");
      //     this.fullscreenLoading = false;
      //   }
      // });
      // // } else showErrorMsg("请选择科别");
    },
    delLog() {
      this.fullscreenLoading = true;
      deleteLog({
        bz: this.form.delType,
        dm1: this.form.kbCode,
        endTime: this.form.dateEnd,
        startTime: this.form.dateBegin,
      }).then((res) => {
        if (res.code === 0) {
          showOkMsg(res.msg);
          this.form.kbName = "";
          this.fullscreenLoading = false;
        } else {
          showErrorMsg("删除失败");
          this.fullscreenLoading = false;
        }
      });
    },
    // 打开代码录入
    handleOpenDictInput(item, type) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      console.log(row.dm);
      this.form.kbName = row.dmmc;
      this.form.kbCode = row.dm;
    },
    // f4 清除科别的选择
    clearDictInputValue() {
      this.form.kbName = undefined;
      this.form.kbCode = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 60px;
    border-radius: 6px;
    background-color: #eee;
    padding-top: 10px;
    /deep/.el-input--mini .el-input__inner {
      width: 190px !important;
    }
    .el-form {
      margin-left: 50px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }
  }
}
.content_box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content_num {
  width: 30%;
  margin-top: 150px;
}
</style>
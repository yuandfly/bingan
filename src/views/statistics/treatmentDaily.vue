<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true" style="padding-top: 15px;">
        <el-form-item label="统计日报表">
          <el-select v-model="form.daily" placeholder="请选择" size="mini" @change="selectValue">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.dateValue"
            type="date"
            size="small"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="form.daily === 111">
          <el-radio-group v-model="form.grade" @change="officeGrade">
            <el-radio label="0">按二级科室生成报表</el-radio>
            <el-radio label="1">按一级科室生成报表</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
          <el-button class="btn" type="primary" size="small" @click="exportCheck">下载</el-button>

          <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component :is="showCom" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { showOkMsg, showErrorMsg, yesterday } from "@/utils/index.js";

const medicalTreatmentDaily = () =>
  import("../../components/table/statisticsDaily2");
const medicalTreatmentStatistics = () =>
  import("../../components/table/statisticsDaily3");

export default {
  data() {
    return {
      form: {
        daily: 111,
        dateValue: "",
        grade: "0"
      },
      showCom: "medicalTreatmentDaily",
      comList: ["medicalTreatmentDaily", "medicalTreatmentStatistics"],
      options: [
        {
          value: 111,
          label: "医疗业务统计日报表（BZB）"
        },
        {
          value: 114,
          label: "医疗业务统计日报表（cz3）"
        },
        {
          value: 112,
          label: "医疗业务统计日报表（HNB）"
        }
      ],
      tableList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      }
    };
  },
  created() {
    this.beginningDate();
  },
  components: {
    medicalTreatmentDaily,
    medicalTreatmentStatistics
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      }
    }
  },
  methods: {
    printContext() {
      this.$refs.child.printContext();
    },
    exportCheck() {
      this.$refs.child.exportExcel();
    },
    beginningDate() {
      this.form.dateValue = yesterday();
    },
    selectValue(val) {
      this.form.daily = val;
      this.beginningDate();
      this.$refs.child.getTableList();
    },
    officeGrade(val) {
      this.showCom = this.comList[val];
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      }
    },

  }
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    min-height: 50px;
    border-radius: 6px;
    background-color: #eee;
    /deep/.el-input--mini .el-input__inner {
      width: 220px !important;
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
.day {
  display: flex;
  padding: 14px 0;
}
.lan {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.lan span {
  width: 100px;
  font-size: 16px;
  text-align: right;
}
.treatmentSelect {
  width: 220px;
}
.date {
  margin-top: 20px;
}
.btn_lan {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item label="开始日期:">
          <el-date-picker
            v-model="form.dateBegin"
            type="date"
            size="small"
            placeholder="开始日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerBegin"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期:">
          <el-date-picker
            v-model="form.dateEnd"
            type="date"
            size="small"
            placeholder="结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerEnd"
          ></el-date-picker>
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
import { yesterday, today } from "@/utils/index.js";

const beHospitalizedStatisticsAnalyze = () =>
  import("../../components/table/beHospitalizedStatisticsAnalyze");

export default {
  data() {
    return {
      form: {
        dateBegin: "",
        dateEnd: "",
      },
      showCom: "beHospitalizedStatisticsAnalyze",
      flag: false,
      tableList: [],
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
              time.getTime() < new Date(this.form.dateBegin).getTime() ||
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
    beHospitalizedStatisticsAnalyze,
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      },
    },
  },
  methods: {
    printContext() {
      this.$refs.child.printContext();
    },
    exportCheck() {
      this.$refs.child.exportExcel();
    },
    beginningDate() {
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      }
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
.numInput {
  width: 90px;
}
</style>
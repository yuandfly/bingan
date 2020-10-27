<template>
  <!-- 临床科室指标完成情况、住院病人费用统计、病房工作辅助报表 -->
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item label="开始日期:">
          <el-date-picker
            v-model="form.dateBegin"
            type="date"
            size="small"
            placeholder="开始日期"
            format="yyyy 年 MM 月 dd 日"
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
        <el-form-item v-if="$route.params.statisticsName === 'inHospitalCost'">
          <el-radio v-model="form.output" label="1">按科别输出</el-radio>
          <el-radio v-model="form.output" label="2">按病区输出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
          <el-button class="btn" type="primary" size="small" @click="exportCheck">下载</el-button>
          <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component :is="$route.params.statisticsName" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { showOkMsg, showErrorMsg, today, yesterday } from "@/utils/index.js";

const clinicIndexSituation = () =>
  import("../../components/table/clinicIndexSituation");
const inHospitalCost = () => import("../../components/table/inHospitalCost");
const sickroomAssist = () => import("../../components/table/sickroomAssist");

export default {
  data() {
    return {
      form: {
        daily: 111,
        dateBegin: "",
        dateEnd: "",
        output: "1"
      },
      // showCom: "physicalExaminationStatistics",
      tableList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
      pickerBegin: {
        disabledDate: time => {
          if (this.form.dateEnd) {
            return (
              time.getTime() > new Date(this.form.dateEnd).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        }
      },
      pickerEnd: {
        disabledDate: time => {
          if (this.form.dateBegin) {
            return (
              time.getTime() < new Date(this.form.dateBegin).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        }
      }
    };
  },
  created() {
    this.beginningDate();
  },
  components: {
    clinicIndexSituation,
    inHospitalCost,
    sickroomAssist
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
    beginningDate() {
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
    },
    selectValue(val) {
      this.form.daily = val;
      this.beginningDate();
      this.options.some(ele => {
        if (ele.value === val) {
          this.showCom = ele.name;
        }
      });
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      }
    },
    exportCheck() {
      this.$refs.child.exportExcel();
    },
    printContext() {
      this.$refs.child.printContext();
    },
  }
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 50px;
    border-radius: 6px;
    background-color: #eee;
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
.administrativewidth {
  width: 117px;
}
</style>
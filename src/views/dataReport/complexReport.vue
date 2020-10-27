<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item>
          <el-radio v-model="form.grade" label="0">由报表库生成报表</el-radio>
          <el-radio v-model="form.grade" label="1">动态数据生成报表</el-radio>
        </el-form-item>
        <el-form-item label=" 输出报表形式:">
          <el-select v-model="form.output" placeholder="输出报表形式" size="small" class="selectwidth">
            <el-option
              v-for="item in outputOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="统计报表年度和时段:" v-if="form.grade === '0'">
          <el-date-picker
            v-model="form.year"
            type="year"
            placeholder="选择年"
            size="small"
            :picker-options="pickerYear"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.month"
            placeholder="请选择"
            size="small"
            class="selectwidth"
            v-if="form.grade === '0'"
          >
            <el-option
              v-for="item in monthOptions"
              :key="item.dm"
              :label="item.dmmc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期:" v-if="form.grade === '1'">
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
        <el-form-item label="结束日期:" v-if="form.grade === '1'">
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
        </el-form-item>
      </el-form>
    </div>
    <component :is="$route.params.dataReportName" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { getDateRangeList } from "@/api";
import { yesterday, today } from "@/utils/index.js";

const hospitalWorkReport = () =>
  import("../../components/table/hospitalWork20131");

export default {
  data() {
    return {
      form: {
        dateBegin: "",
        dateEnd: "",
        grade: "0",
        year: "",
        month: "",
        output: 0,
      },
      outputOptions: [
        {
          value: 0,
          label: "院内科室",
        },
        {
          value: 1,
          label: "上报科室",
        },
        {
          value: "2",
          label: "科目专业",
        },
      ],
      monthOptions: [],
      flag: false,
      tableList: [],
      pickerYear: {
        disabledDate: (time) => {
          if (this.form.year) {
            return time.getTime() >= Date.now();
          }
        },
      },
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
    this.monthList();
  },
  components: {
    hospitalWorkReport,
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
    monthList() {
      getDateRangeList({}).then((res) => {
        if (res.code === 0) {
          this.monthOptions = res.data;
          this.form.month = res.data[0].dmmc;
        }
      });
    },
    beginningDate() {
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
      this.form.year = today();
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
.selectwidth {
  width: 150px;
}
</style>
<template>
  <div
    class="homepage clearfix"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-background="rgba(0, 0, 0, 0.0)"
    element-loading-text="加载中 . . ."
  >
    <div class="topside">
      <el-form :model="form" :inline="true">
        <!-- <el-form-item label="开始日期:">
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
        </el-form-item>-->
        <el-form-item>
          <el-checkbox v-model="form.regionFlag" checked @change="timeRegion">按标准时段上报数据</el-checkbox>
        </el-form-item>
        <el-form-item v-if="form.regionFlag">
          <el-date-picker
            :clearable="false"
            v-model="form.year"
            type="year"
            placeholder="选择年"
            size="small"
            value-format="yyyy"
            :picker-options="pickerYear"
          ></el-date-picker>
        </el-form-item>
        <el-form-item v-if="form.regionFlag">
          <el-select v-model="form.month" placeholder="请选择" size="small" class="selectwidth">
            <el-option
              v-for="item in monthOptions"
              :key="item.dm"
              :label="item.dmmc"
              :value="item.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期:" v-if="!form.regionFlag">
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
        <el-form-item label="结束日期:" v-if="!form.regionFlag">
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
          <el-radio-group v-model="form.audit">
            <el-radio label="1">审核结果汇总</el-radio>
            <el-radio label="2">审核结果</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" :disabled="!loading" @click="inquire">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-link target="_blank" class="export_btn" :disabled="urlFlag" @click="reportedUrl">导出</el-link>
        </el-form-item>
        <el-form-item v-if="form.audit === '2'">
          <el-button  size="small" type="primary" @click="exportCheck" :disabled="urlFlag">导出审核结果</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component
      :is="comName"
      :dateList="this.form"
      ref="child"
      @fun="modification"
      @loadFun="loading"
    ></component>
  </div>
</template>

<script>
import { getDateRangeList, generateCsv } from "@/api";
import { yesterday, today } from "@/utils/index.js";

const performanceAppraisal = () =>
  import("../../components/table/performanceAppraisal");

export default {
  data() {
    return {
      form: {
        dateBegin: "",
        dateEnd: "",
        year: "",
        regionFlag: null,
        month: "0101",
        audit: "1",
      },
      comName: "performanceAppraisal",
      monthOptions: [],
      flag: false,
      exportFlag: true,
      tableList: [],
      fullscreenLoading: false,
      urlFlag: true,
      num: 1,
      url: "",
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
    performanceAppraisal,
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
    exportCheck() {
      this.$refs.child.exportExcel();
    },
    loading(val) {
      this.fullscreenLoading = val;
    },
    modification(n, val) {
      this.num = n;
      this.urlFlag = val;
    },
    reportedUrl() {

      let params = {};
      // if (this.form.regionFlag) {
      //   params.year = this.form.year;
      //   params.month = this.form.month;
      // } else {
        params.startTime = this.form.dateBegin;
        params.endTime = this.form.dateEnd;
        params.sq = this.form.year + this.form.month;
      // }

      if (this.num) {
        this.$confirm("是否确认导出文件?", "提示", {
          //type: 'warning'
        })
          .then(() => {
            generateCsv(params).then((obj) => {
              if (obj.code === 0) {
                this.url = obj.data;
                window.open("http://" + this.url);
              }
            });
          })
          .catch(() => {
            // this.url = "";
          });
      } else {
        generateCsv(params).then((obj) => {
          if (obj.code === 0) {
            this.url = obj.data;
            window.open("http://" + this.url);
            this.$emit("fun", this.url, false);
          }
        });
      }
    },
    beginningDate() {
      // this.form.dateBegin = yesterday();
      // this.form.dateEnd = today();
      this.form.year = today().split("-")[0];
    },
    monthList() {
      getDateRangeList({}).then((res) => {
        if (res.code === 0) {
          this.monthOptions = res.data;
          this.form.month = res.data[0].dm;
        }
      });
    },
    timeRegion(val) {
      if (val) {
        this.form.year = today().split("-")[0];
        this.form.month = "0101";
        this.form.dateBegin = "";
        this.form.dateEnd = "";
      } else {
        this.form.dateBegin = yesterday();
        this.form.dateEnd = today();
        this.form.year = "";
        this.form.month = "";
      }
    },
    inquire() {
        this.$refs.child.getTableList();
    },
  },
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    min-height: 60px;
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
  width: 100px;
}
.export_btn {
  padding: 0 13px;
  line-height: 30px;
  border: 1px solid #409eff;
  background-color: #409eff;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
}
.export_btn:hover {
  color: #fff;
  background-color: #61b2ff;
  border: 1px solid #61b2ff;
}
</style>
<template>
  <!-- 医院工作报表_2013 -->
  <div>
    <h1>医疗机构工作报表（一）</h1>
    <h2>
      <span></span>
      <span>时期：{{startDate}}~{{endDate}}</span>
      <span>表号：卫统第1表</span>
    </h2>
    <h2>
      <span></span>
      <span>制表机关名称：天津市卫生局</span>
    </h2>
    <h2>
      <span></span>
      <span>批准机关名称：天津市统计局</span>
    </h2>
    <h2>
      <span>单位名称：{{unitName}}</span>
      <span>批准文号：(84)津统字第28号</span>
    </h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label=" " align="center" width></el-table-column>
      <el-table-column label="诊疗人次数" align="center" width>
        <el-table-column label="总计" align="center" width></el-table-column>
        <el-table-column label="其中:" align="center" width>
          <el-table-column label="门诊人次数" align="center" width>
            <el-table-column label="计" align="center" width></el-table-column>
            <el-table-column label="预约人次数" align="center" width></el-table-column>
            <el-table-column label="节假日人次数" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="急诊人次数" align="center" width>
            <el-table-column label="计" align="center" width></el-table-column>
            <el-table-column label="其中:死亡" align="center" width></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="观察室收容病人数" align="center" width>
        <el-table-column label="计" align="center" width></el-table-column>
        <el-table-column label="其中:死亡" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="健康检查人数" align="center" width></el-table-column>
      <el-table-column label="期末实有病床数" align="center" width></el-table-column>
      <el-table-column label="上期末留院人数" align="center" width></el-table-column>
      <el-table-column label="入院人数" align="center" width></el-table-column>
      <el-table-column label="他科转入" align="center" width></el-table-column>
      <el-table-column label="出院人数" align="center" width>
        <el-table-column label="计" align="center" width></el-table-column>
        <el-table-column label="内:死亡" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="转往他科" align="center" width></el-table-column>
      <el-table-column label="期末留院人数" align="center" width></el-table-column>
      <el-table-column label="实际开放总床日数" align="center" width></el-table-column>
      <el-table-column label="平均开放病床数" align="center" width></el-table-column>
      <el-table-column label="实际占用总床日数" align="center" width></el-table-column>
      <el-table-column label="出院者占用总床日数" align="center" width></el-table-column>
      <el-table-column label="平均病床工作日" align="center" width></el-table-column>
      <el-table-column label="平均病床周转次数" align="center" width></el-table-column>
      <el-table-column label="实际病床使用率(%)" align="center" width></el-table-column>
      <el-table-column label="出院者平均住院日" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { hospitalWork } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        hospitalWork({
          startDate: this.dateList.dateBegin,
          endDate: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
          } else {
            showErrorMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  text-align: center;
  padding: 23px 0;
}
h3 {
  text-align: center;
  padding-bottom: 20px;
}
h2 {
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
h4 {
  display: flex;
  justify-content: flex-end;
  padding: 2px 0;
  font-size: 14px;
}
</style>
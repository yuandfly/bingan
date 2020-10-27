<template>
  <!-- 出院病人疾病归转情况 -->
  <div>
    <h1>政府办医院出院病人疾病归转情况(1)</h1>
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
      <el-table-column prop="f0" label="疾病名称ICD-10" width="440"></el-table-column>
      <el-table-column label="出院人数" align="center" width>
        <el-table-column prop="f11" label="总计" align="center" width></el-table-column>
        <el-table-column prop="f13" label="治愈" align="center" width></el-table-column>
        <el-table-column prop="f14" label="好转" align="center" width></el-table-column>
        <el-table-column prop="f15" label="未愈" align="center" width></el-table-column>
        <el-table-column prop="f16" label="死亡" align="center" width></el-table-column>
        <el-table-column prop="f17" label="其他" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="f23" label="出院者占用总床日数" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { patientOutcome } from "@/api";
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
        patientOutcome({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
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
</style>
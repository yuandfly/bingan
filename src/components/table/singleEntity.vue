<template>
  <!-- 部分病种住院医疗费用 -->
  <div>
    <h1>政府办医院单病种医疗信息公示统计表</h1>
    <h3>时期：{{startDate}}~{{endDate}}</h3>
    <h2>填报单位：{{unitName}}</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="f0" label="疾病名称" width="500"></el-table-column>
      <el-table-column prop="g0" label="期内出院病人数" align="center" width></el-table-column>
      <el-table-column prop="g1" label="择期手术前平均住院日（天）" width></el-table-column>
      <el-table-column prop="g2" label="出院者平均住院日（天）" align="center" width></el-table-column>
      <el-table-column prop="g3" label="入出院诊断符合率（%）" align="center" width></el-table-column>
      <el-table-column prop="g4" label="治愈好转率（%）" align="center" width></el-table-column>
      <el-table-column prop="g5" label="出院者平均住院费(元)" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { dbz } from "@/api";
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
        dbz({
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
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
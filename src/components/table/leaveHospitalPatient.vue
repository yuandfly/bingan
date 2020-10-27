<template>
  <!-- 出院病人统计表 -->
  <div>
    <h1>出院病人统计表</h1>
    <h3>时期：</h3>
    <h2>单位名称：{{unitName}}</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
      <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
      <el-table-column prop="baza01" label="病案号" align="center" width></el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
      <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
      <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
      <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
      <el-table-column prop="baza80" label="归档号" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { primaryIndex } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      name: "",
      icd: "",
      num: 0,
      icd10: "",
      icd9: "",
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
        primaryIndex({
          endTime: this.dateList.dateEnd,
          startTime: this.dateList.dateBegin
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
}
</style>
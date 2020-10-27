<template>
  <!-- 死亡病人登记一览表 -->
  <div>
    <h1>死亡病人登记一览表</h1>
    <h3>时期：{{startDate}} ～ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="baza01" label="病案号" align="center" width></el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
      <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
      <el-table-column prop="baza27" label="死亡日期" align="center" width></el-table-column>
      <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
      <el-table-column prop="baza23c1" label="科别" align="center" width></el-table-column>
      <el-table-column prop="baf302c" label="根本死因" align="center" width></el-table-column>
      <el-table-column prop="baf308" label="ICD" align="center" width></el-table-column>
      <el-table-column prop="baza80" label="归档号" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deadPatientRegister } from "@/api";
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
        deadPatientRegister({
          endTime: this.dateList.dateEnd,
          dm: this.dateList.level,
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
<template>
  <!-- 医技工作量同期对比表 -->
  <div>
    <h1>医技科室工作量同期对比表</h1>
    <h3>时期：</h3>
    <h2>医院名称</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="mc" label="科室名称" align="center" width></el-table-column>
      <el-table-column prop="lmmc" label="项目名称" align="center" width></el-table-column>
      <el-table-column label="本年工作量" align="center" width>
        <el-table-column prop label="合计" align="center" width></el-table-column>
        <el-table-column label="门诊" align="center" width></el-table-column>
        <el-table-column label="住院" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop label="上年工作量" align="center" width>
        <el-table-column label="合计" align="center" width></el-table-column>
        <el-table-column label="门诊" align="center" width></el-table-column>
        <el-table-column label="住院" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop label="增减（%）" align="center" width>
        <el-table-column label="合计" align="center" width></el-table-column>
        <el-table-column label="门诊" align="center" width></el-table-column>
        <el-table-column label="住院" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchMedicalSkillsDeptWork } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: ""
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        searchMedicalSkillsDeptWork({
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
}
</style>
<template>
  <!-- 手术病人登记表 -->
  <div>
    <h1>手术病人登记一览表</h1>
    <h3>时期：</h3>
    <h2>医院名称：</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop label="病案号" align="center" width></el-table-column>
      <el-table-column prop label="姓名" align="center" width></el-table-column>
      <el-table-column prop label="性别" align="center" width></el-table-column>
      <el-table-column prop label="年龄" align="center" width></el-table-column>
      <el-table-column prop label="入院日期" align="center" width></el-table-column>
      <el-table-column prop label="出院日期" align="center" width></el-table-column>
      <el-table-column prop label="天数" align="center" width></el-table-column>
      <el-table-column prop label="科别" align="center" width></el-table-column>
      <el-table-column prop label="出院第一诊断" align="center" width></el-table-column>
      <el-table-column prop label="ICD" align="center" width></el-table-column>
      <el-table-column prop label="手术名称" align="center" width></el-table-column>
      <el-table-column prop label="手术医师" align="center" width></el-table-column>
      <el-table-column prop label="麻醉方式" align="center" width></el-table-column>
      <el-table-column prop label="住院费用" align="center" width></el-table-column>
      <el-table-column prop label="住院医师" align="center" width></el-table-column>
      <el-table-column prop label="归档号" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  props: ["dataList"],
  watch: {
    dataList(val) {
      this.tableData = val;
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
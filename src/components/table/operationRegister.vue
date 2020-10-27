<template>
  <!-- 手术登记表 -->
  <div>
    <h1>XXXX医院手术登记表</h1>
    <h3>时期：</h3>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop label="序号" align="center" width></el-table-column>
      <el-table-column prop label="ICD序号" align="center" width></el-table-column>
      <el-table-column prop label="病案号" align="center" width></el-table-column>
      <el-table-column prop label="姓名" align="center" width></el-table-column>
      <el-table-column prop label="性别" align="center" width></el-table-column>
      <el-table-column prop label="年龄" align="center" width></el-table-column>
      <el-table-column prop label="出院科别" align="center" width></el-table-column>
      <el-table-column prop label="出院情况" align="center" width></el-table-column>
      <el-table-column prop label="手术日期" align="center" width></el-table-column>
      <el-table-column prop label="手术编码" align="center" width></el-table-column>
      <el-table-column prop label="出院诊断" align="center" width></el-table-column>
      <el-table-column prop label="麻醉" align="center" width></el-table-column>
      <el-table-column prop label="手术情况" align="center" width>
        <el-table-column prop label="类别" align="center" width></el-table-column>
        <el-table-column prop label="愈合" align="center" width></el-table-column>
      </el-table-column>
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
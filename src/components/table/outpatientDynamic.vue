<template>
  <!-- 门诊工作动态 -->
  <div>
    <h1>门 诊 分 科 医 师 工 作 量 统 计 表</h1>
    <h3>时期：</h3>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop label="科别" align="center" width></el-table-column>
      <el-table-column prop label="医师" align="center" width></el-table-column>
      <el-table-column prop label="职称" align="center" width></el-table-column>
      <el-table-column prop label="工时" align="center" width></el-table-column>
      <el-table-column prop label="门诊人次" align="center" width>
        <el-table-column prop label="小计" align="center" width></el-table-column>
        <el-table-column prop label="专科" align="center" width></el-table-column>
        <el-table-column prop label="专家" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop label="急诊人次" align="center" width></el-table-column>
      <el-table-column prop label="单项健康检查" align="center" width></el-table-column>
      <el-table-column prop label="手术例数" align="center" width></el-table-column>
      <el-table-column prop label="会诊人次" align="center" width></el-table-column>
      <el-table-column prop label="出诊人次" align="center" width></el-table-column>
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
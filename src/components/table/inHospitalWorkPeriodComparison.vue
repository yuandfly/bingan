<template>
  <!-- 住院工作统计指标同期对比表 -->
  <div>
    <h1>住院工作统计指标同期对比表</h1>
    <h3>时期</h3>
    <h2>医院名称</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="科别" align="center" width></el-table-column>
      <el-table-column label="出院人数" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="治愈率%" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="病死率%" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="实际占用总床日数" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="病床周转次数" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="病床使用率%" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="平均住院日" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="期内手术数" align="center" width>
        <el-table-column label="本年" align="center" width></el-table-column>
        <el-table-column label="上年" align="center" width></el-table-column>
        <el-table-column label="比较" align="center" width></el-table-column>
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
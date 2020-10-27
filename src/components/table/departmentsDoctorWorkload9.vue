<template>
  <!-- 科室医师工作量 -->
  <div>
    <h1>医 院 门 诊 工 作 统 计 报 表</h1>
    <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop label="科别" align="center" width></el-table-column>
      <el-table-column prop label="总诊疗人次" align="center" width>
        <el-table-column prop label="总计" align="center" width></el-table-column>
        <el-table-column prop label="其中：门、急诊人次数" align="center" width>
          <el-table-column prop label="合计" align="center" width></el-table-column>
          <el-table-column prop label="门诊人次" align="center" width></el-table-column>
          <el-table-column prop label="急诊人次" align="center" width>
            <el-table-column prop label="计" align="center" width></el-table-column>
            <el-table-column prop label="抢救人数" align="center" width></el-table-column>
            <el-table-column prop label="抢救成功人数" align="center" width></el-table-column>
            <el-table-column prop label="死亡人数" align="center" width></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop label="主治医师" align="center" width></el-table-column>
        <el-table-column prop label="医师医士" align="center" width></el-table-column>
        <el-table-column prop label="进修实习人员" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop label="观察室" align="center" width>
        <el-table-column prop label="收容病人数" align="center" width></el-table-column>
        <el-table-column prop label="死亡人数" align="center" width></el-table-column>
        <el-table-column prop label="病人占床日数" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitName: sessionStorage.getItem('unitName'),
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
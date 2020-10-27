<template>
  <!-- 产科病人出院登记一览表 -->
  <div>
    <h1>产科病人出院登记一览表</h1>
    <h3>时期：{{startDate}} ～ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="baza01" label="病案号" align="center" width="120"></el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza06" label="年龄" align="center" width></el-table-column>
      <el-table-column prop="baza27" label="出院日期" align="center" width="120"></el-table-column>
      <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
      <el-table-column prop="bafa04" label="分娩数" align="center" width></el-table-column>
      <el-table-column prop="hcs" label="活产数" align="center" width></el-table-column>
      <el-table-column prop="sts" label="死胎数" align="center" width></el-table-column>
      <el-table-column prop="scs" label="死产数" align="center" width></el-table-column>
      <el-table-column prop="bafa03" label="产次" align="center" width></el-table-column>
      <el-table-column prop="bafa29" label="孕周" align="center" width></el-table-column>
      <el-table-column prop="bafa11c" label="分娩方式" align="center" width></el-table-column>
      <el-table-column prop="bafa22c" label="生产胎方位" align="center" width></el-table-column>
      <el-table-column prop="bafa08c" label="分娩时间" align="center" width="150"></el-table-column>
      <el-table-column prop="bafa13" label="会阴破裂" align="center" width></el-table-column>
      <el-table-column prop="bafa23" label="产后失血" align="center" width></el-table-column>
      <el-table-column prop="bafa30" label="伤口愈合" align="center" width></el-table-column>
      <el-table-column label="新生儿" align="center" width>
        <el-table-column prop="bafa15" label="身长(cm)" align="center" width></el-table-column>
        <el-table-column prop="bafa16" label="体重(g)" align="center" width></el-table-column>
        <el-table-column prop="bafa27" label="头围(cm)" align="center" width></el-table-column>
        <el-table-column prop="bafa28" label="胸围(cm)" align="center" width></el-table-column>
        <el-table-column prop="bafa31c" label="血型" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { obstetrics } from "@/api";
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
        obstetrics({
          endDate: this.dateList.dateEnd,
          sign: this.dateList.level,
          startDate: this.dateList.dateBegin
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
}
</style>
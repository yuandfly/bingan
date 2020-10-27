<template>
  <!-- 分科登记表 -->
  <div>
    <h1>分 科 疾 病 分 析 登 记 表</h1>
    <h3>时期：{{startDate}} ～ {{endDate}}</h3>
    <h2>
      <span>科别：{{category}}</span>
      <span>{{unitName}}</span>
    </h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="baza01" label="病案号" align="center" width></el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
      <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
      <el-table-column prop="baza24" label="入院日期" align="center" width></el-table-column>
      <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
      <el-table-column prop="baza29" label="天数" align="center" width></el-table-column>
      <el-table-column prop="baf906c" label="出院诊断" align="center" width></el-table-column>
      <el-table-column prop="baf906" label="TCD" align="center" width></el-table-column>
      <el-table-column prop="baza38c" label="出院第一诊断" align="center" width></el-table-column>
      <el-table-column prop="baza65" label="ICD" align="center" width></el-table-column>
      <el-table-column prop="jbcd" label="疾病程度" align="center" width></el-table-column>
      <el-table-column prop="baza55c" label="中医参与" align="center" width></el-table-column>
      <el-table-column prop="baf908c" label="疗效" align="center" width></el-table-column>
      <el-table-column label="抢救次数" align="center" width>
        <el-table-column prop="baza47" label="成功" align="center" width></el-table-column>
        <el-table-column prop="baza47c" label="失败" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="baza53c" label="是否手术" align="center" width></el-table-column>
      <el-table-column prop="baf412c" label="有菌无菌" align="center" width></el-table-column>
      <el-table-column prop="baza61c" label="有否病理" align="center" width></el-table-column>
      <el-table-column prop="baza42c" label="单病种否" align="center" width></el-table-column>
      <el-table-column prop="baza54c" label="院内感染" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { diseaseAnalysis } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      category: "",
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
        diseaseAnalysis({
          kb: this.dateList.administrative,
          endDate: this.dateList.dateEnd,
          outputMethod: this.dateList.level,
          startDate: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.category = this.dateList.administrativeName;
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
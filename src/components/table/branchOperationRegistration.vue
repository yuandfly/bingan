<template>
  <!-- 分科疾病种类统计表 -->
  <div>
    <h1>出 院 分 科 登 记 一 览 表</h1>
    <h3>时期：{{startDate}} ～ {{endDate}}</h3>
    <h2>
      <span>医院名称：{{unitName}}</span>
      <span>科别：{{category}}</span>
      <span>本科例数：{{num}}</span>
    </h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="baza01" label="病案号" align="center" width="120"></el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
      <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
      <el-table-column prop="baza24" label="入院日期" align="center" width></el-table-column>
      <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
      <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
      <el-table-column prop="baza23c" label="确诊天数" align="center" width></el-table-column>
      <el-table-column prop="baza38c" label="出院主诊断" align="center" width="200"></el-table-column>
      <el-table-column prop="icd" label="手术名称" align="center" width></el-table-column>
      <el-table-column prop="icd" label="ＩＣＤ" align="center" width></el-table-column>
      <el-table-column prop="baza41c" label="转归诊断" align="center" width></el-table-column>
      <el-table-column prop="baza53c" label="抢救次数" align="center" width></el-table-column>
      <el-table-column prop="baza53c" label="门出诊断符合" align="center" width></el-table-column>
      <el-table-column prop="baza53c" label="入出诊断符合" align="center" width></el-table-column>
      <el-table-column prop="baza53c" label="手术日期" align="center" width></el-table-column>
      <el-table-column prop="baza53c" label="手术前后诊断" align="center" width></el-table-column>
      <el-table-column prop="baza53c" label="切口及愈合" align="center" width></el-table-column>
      <el-table-column prop="baza55c" label="临床及病理" align="center" width></el-table-column>
      <el-table-column prop="baza83" label="住院费用" align="center" width></el-table-column>
      <el-table-column prop="baza13c" label="工作单位、地址" align="center" width="230"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { branchRegistration } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      category: "",
      num: 0,
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
        branchRegistration({
          categoryCode: this.dateList.administrative,
          endDate: this.dateList.dateEnd,
          serialNumber: this.dateList.level,
          startDate: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.category = this.dateList.administrativeName;
            this.tableData = res.data;
            this.num = this.tableData.length > 0 ? this.tableData[0].bkls : 0;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },

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
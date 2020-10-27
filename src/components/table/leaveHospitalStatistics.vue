<template>
  <!-- 分科疾病种类统计表 -->
  <div>
    <h1>出 院 分 科 登 记 一 览 表</h1>
    <h3>时期：{{startDate}} ～ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="bqmc" label="科别" align="center"></el-table-column>
      <el-table-column label="出院病人" align="center" width>
        <el-table-column prop="f1" label="合计" align="center" width></el-table-column>
        <el-table-column label="其中:出院病人数" align="center" width>
          <el-table-column prop="f2" label="小计" align="center" width></el-table-column>
          <el-table-column prop="f3" label="治愈" align="center" width></el-table-column>
          <el-table-column prop="f4" label="好转" align="center" width></el-table-column>
          <el-table-column prop="f5" label="未愈" align="center" width></el-table-column>
          <el-table-column prop="f6" label="死亡" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column prop="qt" label="其它" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="f13" label="出院者占用总床日数" align="center" width></el-table-column>
      <el-table-column label="出院者住院费用" align="center" width>
        <el-table-column prop="f15" label="总计" align="center" width></el-table-column>
        <el-table-column prop="f26" label="平均" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deptOutStatis } from "@/api";
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
        deptOutStatis({
          endTime: this.dateList.dateEnd,
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
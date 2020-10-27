<template>
  <!-- 门急观工作量同期对比表 -->
  <div>
    <h1>门急观工作量同期对比表</h1>
    <h3>时期</h3>
    <h2>医院名称：</h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="tjm7mc" label="科别" align="center" width></el-table-column>
      <el-table-column label="门急诊人次合计" align="center" width>
        <el-table-column prop="count1" label="本年" align="center" width></el-table-column>
        <el-table-column prop="count2" label="上年" align="center" width></el-table-column>
        <el-table-column prop="count3" label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="门诊人次" align="center" width>
        <el-table-column prop="tjm7002" label="本年" align="center" width></el-table-column>
        <el-table-column prop="tjm70021" label="上年" align="center" width></el-table-column>
        <el-table-column prop="count4" label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="急诊人次" align="center" width>
        <el-table-column prop="tjm7005" label="本年" align="center" width></el-table-column>
        <el-table-column prop="tjm70051" label="上年" align="center" width></el-table-column>
        <el-table-column prop="count5" label="比较" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="观察室收容病人" align="center" width>
        <el-table-column prop="tjm7011" label="本年" align="center" width></el-table-column>
        <el-table-column prop="tjm70111" label="上年" align="center" width></el-table-column>
        <el-table-column prop="count6" label="比较" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { outpatientWorkCompare } from "@/api";
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
    this.splicingDate();
  },
  props: ["dateList"],
  methods: {
    splicingDate() {
      let begin = this.dateList.dateBegin.split("-");
      let end = this.dateList.dateEnd.split("-");
      if (begin[1].length < 2) {
        begin[1] = 0 + begin[1];
      }
      if (end[1].length < 2) {
        end[1] = 0 + end[1];
      }
      return begin[0] + begin[1] + end[1];
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        outpatientWorkCompare({ dateRange: this.splicingDate() }).then(res => {
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
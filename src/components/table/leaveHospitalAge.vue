<template>
  <!-- 出院病人疾病分类年龄情况 -->
  <div>
    <h1>医院出院病人疾病分类年龄情况</h1>
    <h2>
      <span></span>
      <span>时期：{{startDate}}~{{endDate}}</span>
      <span>表号：卫统4表2</span>
    </h2>
    <h2>
      <span></span>
      <span>制表机关：卫生部</span>
    </h2>
    <h2>
      <span></span>
      <span>批准机关：国家统计局</span>
    </h2>
    <h2>
      <span>填报单位：{{unitName}}</span>
      <span>批准文号：国家函【2007】11号</span>
    </h2>
    <h2>
      <span>资料类别：{{datumName}}</span>
      <span>有效期至：2009年</span>
    </h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="f0" label="疾病名称ICD-10" width="500"></el-table-column>
      <el-table-column label="出院人数" align="center" width>
        <el-table-column prop="f11" label="总计" align="center" width></el-table-column>
        <el-table-column prop="f42" label="5岁以下" align="center" width></el-table-column>
        <el-table-column prop="f47" label="5-14岁" align="center" width></el-table-column>
        <el-table-column prop="f50" label="15-44岁" align="center" width></el-table-column>
        <el-table-column prop="f51" label="45-59岁" align="center" width></el-table-column>
        <el-table-column prop="f52" label="60岁以上" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { classificationAge } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      datumName: "",
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
        classificationAge({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          bbxh: this.dateList.datum
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            this.datumName = this.dateList.datumName;
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
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
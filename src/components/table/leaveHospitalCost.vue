<template>
  <!-- 部分病种住院医疗费用 -->
  <div>
    <h1>政府办医院部分病种住院医疗费用</h1>
    <h2>
      <span></span>
      <span>时期：{{startDate}}~{{endDate}}</span>
      <span>表号：卫统4表3</span>
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
      <span>资料类别：省中医院</span>
      <span>有效期至：2009年</span>
    </h2>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="f0" label="疾病名称ICD-10" width="500"></el-table-column>
      <el-table-column prop="f1" label="出院病人数（人）" align="center" width></el-table-column>
      <el-table-column prop="f2" label="出院病人占用总床日数（日）" width></el-table-column>
      <el-table-column prop="f3" label="出院病人住院医疗费（人）" align="center" width></el-table-column>
      <el-table-column label="其中" align="center" width>
        <el-table-column prop="f4" label="床位费" align="center" width></el-table-column>
        <el-table-column prop="f5" label="药费" align="center" width></el-table-column>
        <el-table-column prop="f6" label="手术费" align="center" width></el-table-column>
        <el-table-column prop="f7" label="检查治疗费" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { hospitalCostsVO } from "@/api";
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
        hospitalCostsVO({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
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
  padding: 2px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>
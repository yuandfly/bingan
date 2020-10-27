<template>
  <!-- 危重病人抢救表 -->
  <div id="print">
    <template v-if="manyData.length > 0 && tableIsShow">
      <template v-for="(data, index) in manyData">
        <h1>危重病人抢救及医疗缺陷表(S)</h1>
        <h3>时期: {{startDate}} ～ {{endDate}}</h3>
        <h2>医院名称：{{unitName}}</h2>
        <el-table  :data="data" :key="index"    stripe border  style="height: 569px;">
          <el-table-column prop="kb" label="科别" align="center" width="100px"></el-table-column>
          <el-table-column label="抢救情况" align="center" width>
            <el-table-column prop="f1" label="人次数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f2" label="成功数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f3" label="失败数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f4" label="成功率" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="输血" align="center" width>
            <el-table-column prop="f5" label="次数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f6" label="反应数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f7" label="反应率" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="输液" align="center" width>
            <el-table-column prop="f8" label="次数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f9" label="反应数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f10" label="反应率" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="院内感染" align="center" width>
            <el-table-column prop="f11" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f12" label="%" align="center" width="60px"></el-table-column>
          </el-table-column>
        </el-table>
      </template>
    </template>
    <template v-else>
      <h1>危重病人抢救及医疗缺陷表(S)</h1>
      <h3>时期: {{startDate}} ～ {{endDate}}</h3>
      <h2>医院名称：{{unitName}}</h2>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="kb" label="科别" align="center" width></el-table-column>
        <el-table-column label="抢救情况" align="center" width>
          <el-table-column prop="f1" label="人次数" align="center" width></el-table-column>
          <el-table-column prop="f2" label="成功数" align="center" width></el-table-column>
          <el-table-column prop="f3" label="失败数" align="center" width></el-table-column>
          <el-table-column prop="f4" label="成功率" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="输血" align="center" width>
          <el-table-column prop="f5" label="次数" align="center" width></el-table-column>
          <el-table-column prop="f6" label="反应数" align="center" width></el-table-column>
          <el-table-column prop="f7" label="反应率" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="输液" align="center" width>
          <el-table-column prop="f8" label="次数" align="center" width></el-table-column>
          <el-table-column prop="f9" label="反应数" align="center" width></el-table-column>
          <el-table-column prop="f10" label="反应率" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="院内感染" align="center" width>
          <el-table-column prop="f11" label="例数" align="center" width></el-table-column>
          <el-table-column prop="f12" label="%" align="center" width></el-table-column>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { emergencyPatientDefectStatistics } from "@/api";
import { showOkMsg, showErrorMsg, reSetData  } from "@/utils/index.js";
import XLSX from 'xlsx';

export default {
  data() {
    return {
      tableData: [],
      title: "",
      startDate: "",
      endDate: "",
      manyData: [],
      tableIsShow: false,
      printLength: 10,
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
        emergencyPatientDefectStatistics({
          kb: this.dateList.administrative,
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            console.log(this.dateList);
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },
    printContext () {


      this.tableIsShow = true;
      this.manyData = reSetData(this.tableData, this.printLength);
      setTimeout(() => {
        this.$print(document.querySelector('#print'));
        console.log(this.tableIsShow);
      }, 500);

      setTimeout(() => {
        this.tableIsShow = false;
        console.log(this.tableIsShow);
      }, 2000);



      // this.$print(document.querySelector('#print'), this.printOptions);
    },
    exportExcel() {

      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        emergencyPatientDefectStatistics({
          kb: this.dateList.administrative,
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          excel: 1
        }).then(res => {
          if (res.code === 0) {
            console.log(this.dateList);
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

<style lang="less" scoped>
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
/deep/ .el-table  {
td, th {
  padding: 5px 0;
  font-size: 12px;
}



}
/deep/ .el-table::before {
  width: 0;

}
/deep/ .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #fff;
}

/deep/ .el-table--border, .el-table--group {
  border: 0;
}
</style>
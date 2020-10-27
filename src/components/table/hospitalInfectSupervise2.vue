<template>
  <!-- 医院感染病人登记表 -->
  <div id="print">
    <h1>医院感染监测信息反馈表（二）</h1>
    <h3>时期: {{startDate}} ~ {{endDate}}</h3>
    <h2>单位：{{unitName}}</h2>
      <template v-if="manyData.length > 0 && tableIsShow">
        <el-table v-for="(data, index) in manyData" :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
          <el-table-column prop="jbfl" label="病种名称" align="center" width="120px"></el-table-column>
          <el-table-column prop="f1" label="出院人数" align="center" width="80px"></el-table-column>
          <el-table-column prop="f2" label="感染人数" align="center" width="80px"></el-table-column>
          <el-table-column label="感染部位（例次）" align="center" width>
            <el-table-column prop="f3" label="下呼吸到" align="center" width="80px"></el-table-column>
            <el-table-column prop="f4" label="手术伤口" align="center" width="80px"></el-table-column>
            <el-table-column prop="f5" label="泌尿道" align="center" width="80px"></el-table-column>
            <el-table-column prop="f6" label="胃肠道" align="center" width="80px"></el-table-column>
            <el-table-column prop="f7" label="血液" align="center" width="80px"></el-table-column>
            <el-table-column prop="f8" label="皮肤与软组织" align="center" width="80px"></el-table-column>
            <el-table-column prop="f9" label="其它" align="center" width="80px"></el-table-column>
            <el-table-column prop="f10" label="合计" align="center" width="80px"></el-table-column>
          </el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="jbfl" label="病种名称" align="center" width="440"></el-table-column>
          <el-table-column prop="f1" label="出院人数" align="center" width></el-table-column>
          <el-table-column prop="f2" label="感染人数" align="center" width></el-table-column>
          <el-table-column label="感染部位（例次）" align="center" width>
            <el-table-column prop="f3" label="下呼吸到" align="center" width></el-table-column>
            <el-table-column prop="f4" label="手术伤口" align="center" width></el-table-column>
            <el-table-column prop="f5" label="泌尿道" align="center" width></el-table-column>
            <el-table-column prop="f6" label="胃肠道" align="center" width></el-table-column>
            <el-table-column prop="f7" label="血液" align="center" width></el-table-column>
            <el-table-column prop="f8" label="皮肤与软组织" align="center" width></el-table-column>
            <el-table-column prop="f9" label="其它" align="center" width></el-table-column>
            <el-table-column prop="f10" label="合计" align="center" width></el-table-column>
          </el-table-column>
        </el-table>
      </template>
  </div>
</template>

<script>
import { infect2 } from "@/api";
import { showOkMsg, showErrorMsg, reSetData } from "@/utils/index.js";

import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      manyData: [],
      tableIsShow: false,
      printLength: 10,
      startDate: "",
      endDate: "",
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList(this.dateList.dateBegin, this.dateList.dateEnd);
  },
  props: ["dateList"],
  methods: {
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
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        infect2({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
        }).then((res) => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            this.manyData = reSetData(this.tableData, this.printLength);
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },
    exportExcel() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        infect2({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          excel: 1
        }).then((res) => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            this.manyData = reSetData(this.tableData, this.printLength);
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    }
  },
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
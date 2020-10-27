<template>
  <!-- 诊断质量情况表 -->
  <div id="print">
   <template v-if="manyData.length > 0 && tableIsShow">
    <template v-for="(data, index) in manyData" >
      <h1>诊断质量情况统计表</h1>
      <h2>医院名称: {{startDate}} ~ {{endDate}}</h2>
      <el-table  :data="data"  stripe border style="width: 100%">
        <el-table-column prop="kb" label="科别" align="center" width="100px"></el-table-column>
        <el-table-column prop="f1" label="出院人数" align="center" width="50px"></el-table-column>
        <el-table-column label="门诊与出院" align="center" width>
          <el-table-column prop="f2" label="符合人数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f3" label="不符合人数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f4" label="符合率%" align="center" width="50px"></el-table-column>
        </el-table-column>
        <el-table-column label="入院与出院" align="center" width>
          <el-table-column prop="f5" label="符合人数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f6" label="不符合人数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f7" label="符合率%" align="center" width="50px"></el-table-column>
        </el-table-column>
        <el-table-column label="待诊情况" align="center" width>
          <el-table-column prop="f8" label="门诊待诊数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f9" label="入院待诊数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f10" label="出院待诊数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f11" label="门诊待诊率%" align="center" width="50px"></el-table-column>
          <el-table-column prop="f12" label="入院待诊率%" align="center" width="50px"></el-table-column>
          <el-table-column prop="f13" label="出院待诊率%" align="center" width="50px"></el-table-column>
        </el-table-column>
        <el-table-column label="手术前后诊断" align="center" width>
          <el-table-column prop="f14" label="手术总例数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f15" label="符合例数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f16" label="不符合例数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f17" label="待查人数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f18" label="符合率%" align="center" width="50px"></el-table-column>
        </el-table-column>
        <el-table-column label="三日确诊" align="center" width>
          <el-table-column prop="f19" label="例数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f20" label="%" align="center" width="50px"></el-table-column>
        </el-table-column>
        <el-table-column label="七日确诊" align="center" width>
          <el-table-column prop="f21" label="例数" align="center" width="50px"></el-table-column>
          <el-table-column prop="f22" label="%" align="center" width="50px"></el-table-column>
        </el-table-column>
      </el-table>
    </template>
   </template>
    <template v-else>
      <h1>诊断质量情况统计表</h1>
      <h2>医院名称: {{startDate}} ~ {{endDate}}</h2>
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="kb" label="科别" align="center" width="100px"></el-table-column>
        <el-table-column prop="f1" label="出院人数" align="center" width></el-table-column>
        <el-table-column label="门诊与出院" align="center" width>
          <el-table-column prop="f2" label="符合人数" align="center" width></el-table-column>
          <el-table-column prop="f3" label="不符合人数" align="center" width></el-table-column>
          <el-table-column prop="f4" label="符合率%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="入院与出院" align="center" width>
          <el-table-column prop="f5" label="符合人数" align="center" width></el-table-column>
          <el-table-column prop="f6" label="不符合人数" align="center" width></el-table-column>
          <el-table-column prop="f7" label="符合率%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="待诊情况" align="center" width>
          <el-table-column prop="f8" label="门诊待诊数" align="center" width></el-table-column>
          <el-table-column prop="f9" label="入院待诊数" align="center" width></el-table-column>
          <el-table-column prop="f10" label="出院待诊数" align="center" width></el-table-column>
          <el-table-column prop="f11" label="门诊待诊率%" align="center" width></el-table-column>
          <el-table-column prop="f12" label="入院待诊率%" align="center" width></el-table-column>
          <el-table-column prop="f13" label="出院待诊率%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="手术前后诊断" align="center" width>
          <el-table-column prop="f14" label="手术总例数" align="center" width></el-table-column>
          <el-table-column prop="f15" label="符合例数" align="center" width></el-table-column>
          <el-table-column prop="f16" label="不符合例数" align="center" width></el-table-column>
          <el-table-column prop="f17" label="待查人数" align="center" width></el-table-column>
          <el-table-column prop="f18" label="符合率%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="三日确诊" align="center" width>
          <el-table-column prop="f19" label="例数" align="center" width></el-table-column>
          <el-table-column prop="f20" label="%" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="七日确诊" align="center" width>
          <el-table-column prop="f21" label="例数" align="center" width></el-table-column>
          <el-table-column prop="f22" label="%" align="center" width></el-table-column>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { diagnosticQualityStatistics } from "@/api";
import { showOkMsg, showErrorMsg, reSetData } from "@/utils/index.js";

import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      manyData: [],
      tableIsShow: false,
      printLength: 10,
      tableData: [],
      startDate: "",
      endDate: ""
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        diagnosticQualityStatistics({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            showOkMsg(res.msg);
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
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
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        diagnosticQualityStatistics({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          excel: 1
        }).then(res => {
          if (res.code === 0) {
            showOkMsg(res.msg);
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
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
<template>
  <!-- 手术质量情况表 -->
  <div id="print">


    <template v-if="manyData.length > 0 && tableIsShow">
      <template v-for="(data, index) in manyData">
        <h1>手 术 质 量 情 况 统 计 表</h1>
        <h3>时期: {{startDate}} ~ {{endDate}}</h3>
        <h2>单位：{{unitName}}</h2>
        <el-table  :data="data" :key="index"    stripe border >
          <el-table-column prop="kb" label="科别" align="center" width="120px"></el-table-column>
          <el-table-column prop="f1" label="手术例数" align="center" width="60px"></el-table-column>
          <el-table-column prop="f2" label="手术人数" align="center" width="60px"></el-table-column>
          <el-table-column label="术前住院天数" align="center"  >
            <el-table-column prop="f3" label="计" align="center" width="60px"></el-table-column>
            <el-table-column prop="f4" label="平均天数" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="无菌切口" align="center" >
            <el-table-column prop="f5" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f6" label="甲" align="center" width="60px"></el-table-column>
            <el-table-column prop="f7" label="乙" align="center" width="60px"></el-table-column>
            <el-table-column prop="f8" label="丙" align="center" width="60px"></el-table-column>
            <el-table-column prop="f9" label="化脓率%" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="沾染切口" align="center" >
            <el-table-column prop="f10" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f11" label="甲" align="center" width="60px"></el-table-column>
            <el-table-column prop="f12" label="乙" align="center" width="60px"></el-table-column>
            <el-table-column prop="f13" label="丙" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="感染切口" align="center" width>
            <el-table-column prop="f14" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f15" label="甲" align="center" width="60px"></el-table-column>
            <el-table-column prop="f16" label="乙" align="center" width="60px"></el-table-column>
            <el-table-column prop="f17" label="丙" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="急诊手术" align="center" >
            <el-table-column prop="f18" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f19" label="%" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column prop label="择期手术" align="center" >
            <el-table-column prop="f20" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f21" label="3日内手术" align="center"width="60px" ></el-table-column>
          </el-table-column>
          <el-table-column prop label="手术并发症" align="center" >
            <el-table-column prop="f22" label="例数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f23" label="%" align="center" width="60px"></el-table-column>
          </el-table-column>
        </el-table>
      </template>

    </template>
    <template v-else>
      <h1>手 术 质 量 情 况 统 计 表</h1>
      <h3>时期: {{startDate}} ~ {{endDate}}</h3>
      <h2>单位：{{unitName}}</h2>
      <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
        <el-table-column prop="kb" label="科别" align="center" ></el-table-column>
        <el-table-column prop="f1" label="手术例数" align="center" ></el-table-column>
        <el-table-column prop="f2" label="手术人数" align="center" ></el-table-column>
        <el-table-column label="术前住院天数" align="center" >
          <el-table-column prop="f3" label="计" align="center" ></el-table-column>
          <el-table-column prop="f4" label="平均天数" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column label="无菌切口" align="center" >
          <el-table-column prop="f5" label="例数" align="center" ></el-table-column>
          <el-table-column prop="f6" label="甲" align="center" ></el-table-column>
          <el-table-column prop="f7" label="乙" align="center" ></el-table-column>
          <el-table-column prop="f8" label="丙" align="center" ></el-table-column>
          <el-table-column prop="f9" label="化脓率%" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column label="沾染切口" align="center" >
          <el-table-column prop="f10" label="例数" align="center" ></el-table-column>
          <el-table-column prop="f11" label="甲" align="center" ></el-table-column>
          <el-table-column prop="f12" label="乙" align="center" ></el-table-column>
          <el-table-column prop="f13" label="丙" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column label="感染切口" align="center" width>
          <el-table-column prop="f14" label="例数" align="center" ></el-table-column>
          <el-table-column prop="f15" label="甲" align="center" ></el-table-column>
          <el-table-column prop="f16" label="乙" align="center" ></el-table-column>
          <el-table-column prop="f17" label="丙" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column label="急诊手术" align="center" >
          <el-table-column prop="f18" label="例数" align="center" ></el-table-column>
          <el-table-column prop="f19" label="%" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column prop label="择期手术" align="center" >
          <el-table-column prop="f20" label="例数" align="center" ></el-table-column>
          <el-table-column prop="f21" label="3日内手术" align="center" ></el-table-column>
        </el-table-column>
        <el-table-column prop label="手术并发症" align="center" >
          <el-table-column prop="f22" label="例数" align="center" ></el-table-column>
          <el-table-column prop="f23" label="%" align="center" ></el-table-column>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { surgeryQualityStatistics } from "@/api";
import { showOkMsg, showErrorMsg,reSetData } from "@/utils/index.js";

import FileSaver from "file-saver";

import XLSX from 'xlsx';
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      manyData: [],
      tableIsShow: false,
      printLength: 23, // a3
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
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
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        surgeryQualityStatistics({
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
    exportExcel() {

      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        surgeryQualityStatistics({
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
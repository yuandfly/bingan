<template>
  <!-- 急症、危重、疑难病人情况统计 -->
  <div id="print">



      <template v-if="manyData.length && tableIsShow ">
        <template v-for="(data, index) in manyData">
          <h1>急症、危重、疑难病人情况统计表</h1>
          <h3>时期: {{startDate}} ～ {{endDate}}</h3>
          <h2>医院名称：{{unitName}}</h2>

          <el-table  :data="data" :key="index"    stripe border  >
            <el-table-column prop="kb" label="科别" align="center" width="90px"></el-table-column>
            <el-table-column label="出院病人数" align="center" width>
              <el-table-column prop="f11" label="合计" align="center" width="55px"></el-table-column>
              <el-table-column prop="f12" label="中医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f13" label="西医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f14" label="中西治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f15" label="中医治疗率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f16" label="中医参与率 %" align="center" width="55px"></el-table-column>
            </el-table-column>
            <el-table-column label="急症数" align="center" width>
              <el-table-column prop="f21" label="合计" align="center" width="55px"></el-table-column>
              <el-table-column prop="f20" label="占有率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f22" label="中医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f23" label="西医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f24" label="中西治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f25" label="中医治疗率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f26" label="中医参与率 %" align="center" width="55px"></el-table-column>
            </el-table-column>
            <el-table-column label="危重数" align="center" width>
              <el-table-column prop="f31" label="合计" align="center" width="55px"></el-table-column>
              <el-table-column prop="f30" label="占有率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f32" label="中医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f33" label="西医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f34" label="中西治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f35" label="中医治疗率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f36" label="中医参与率 %" align="center" width="55px"></el-table-column>
            </el-table-column>
            <el-table-column label="疑难数" align="center" width>
              <el-table-column prop="f41" label="合计" align="center" width="55px"></el-table-column>
              <el-table-column prop="f40" label="占有率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f42" label="中医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f43" label="西医治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f44" label="中西治疗" align="center" width="55px"></el-table-column>
              <el-table-column prop="f45" label="中医治疗率 %" align="center" width="55px"></el-table-column>
              <el-table-column prop="f46" label="中医参与率 %" align="center" width="55px"></el-table-column>
            </el-table-column>
          </el-table>
        </template>

      </template>
      <div v-else>
        <h1>急症、危重、疑难病人情况统计表</h1>
        <h3>时期: {{startDate}} ～ {{endDate}}</h3>
        <h2>医院名称：{{unitName}}</h2>
        <el-table :data="tableData" id="out-table" :fit="true"  stripe border >
          <el-table-column prop="kb" label="科别" align="center"  ></el-table-column>
          <el-table-column label="出院病人数" align="center">
            <el-table-column prop="f11" label="合计" align="center" ></el-table-column>
            <el-table-column prop="f12" label="中医治疗" align="center" ></el-table-column>
            <el-table-column prop="f13" label="西医治疗" align="center" ></el-table-column>
            <el-table-column prop="f14" label="中西治疗" align="center" ></el-table-column>
            <el-table-column prop="f15" label="中医治疗率%" align="center" ></el-table-column>
            <el-table-column prop="f16" label="中医参与率%" align="center" ></el-table-column>
          </el-table-column>
          <el-table-column label="急症数" align="center" >
            <el-table-column prop="f21" label="合计" align="center" ></el-table-column>
            <el-table-column prop="f20" label="占有率%" align="center" ></el-table-column>
            <el-table-column prop="f22" label="中医治疗" align="center" ></el-table-column>
            <el-table-column prop="f23" label="西医治疗" align="center" ></el-table-column>
            <el-table-column prop="f24" label="中西治疗" align="center" ></el-table-column>
            <el-table-column prop="f25" label="中医治疗率%" align="center" ></el-table-column>
            <el-table-column prop="f26" label="中医参与率%" align="center" ></el-table-column>
          </el-table-column>
          <el-table-column label="危重数" align="center" >
            <el-table-column prop="f31" label="合计" align="center" ></el-table-column>
            <el-table-column prop="f30" label="占有率%" align="center" ></el-table-column>
            <el-table-column prop="f32" label="中医治疗" align="center" ></el-table-column>
            <el-table-column prop="f33" label="西医治疗" align="center" ></el-table-column>
            <el-table-column prop="f34" label="中西治疗" align="center" ></el-table-column>
            <el-table-column prop="f35" label="中医治疗率%" align="center" ></el-table-column>
            <el-table-column prop="f36" label="中医参与率%" align="center" ></el-table-column>
          </el-table-column>
          <el-table-column label="疑难数" align="center" >
            <el-table-column prop="f41" label="合计" align="center" ></el-table-column>
            <el-table-column prop="f40" label="占有率%" align="center" ></el-table-column>
            <el-table-column prop="f42" label="中医治疗" align="center" ></el-table-column>
            <el-table-column prop="f43" label="西医治疗" align="center" ></el-table-column>
            <el-table-column prop="f44" label="中西治疗" align="center" ></el-table-column>
            <el-table-column prop="f45" label="中医治疗率%" align="center" ></el-table-column>
            <el-table-column prop="f46" label="中医参与率%" align="center" ></el-table-column>
          </el-table-column>
        </el-table>
      </div>

  </div>
</template>

<script>
import { emergencyPatientStatistics } from "@/api";
import { showOkMsg, showErrorMsg, reSetData } from "@/utils/index.js";

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
      printLength: 22,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        emergencyPatientStatistics({
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
        emergencyPatientStatistics({
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
<template>
  <!-- 医院感染监测信息反馈表 -->
  <div  id="print">

      <template v-if="manyData.length > 0 && tableIsShow">
       <template v-for="(data, index) in manyData">
         <h1>手术切口感染率</h1>
         <h3>时期: {{startDate}} ~ {{endDate}}</h3>
         <h2>单位：{{unitName}}</h2>
         <el-table  :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
           <el-table-column prop="kbmc" label="科别" align="center" width="120px"></el-table-column>
           <el-table-column label="手术病人数" align="center" width>
             <el-table-column prop="f1" label="I级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f2" label="II级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f3" label="III级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f4" label="其他" align="center" width="60px"></el-table-column>
           </el-table-column>
           <el-table-column label="切口感染人数" align="center" width>
             <el-table-column prop="f5" label="I级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f6" label="II级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f7" label="III级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f8" label="其他" align="center" width="60px"></el-table-column>
           </el-table-column>
           <el-table-column label="手术切口感染率" align="center" width>
             <el-table-column prop="f9" label="I级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f10" label="II级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f11" label="III级" align="center" width="60px"></el-table-column>
             <el-table-column prop="f12" label="其他" align="center" width="60px"></el-table-column>
           </el-table-column>
         </el-table>
       </template>
      </template>
      <template v-else>
        <h1>手术切口感染率</h1>
        <h3>时期: {{startDate}} ~ {{endDate}}</h3>
        <h2>单位：{{unitName}}</h2>
        <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="kbmc" label="科别" align="center" width></el-table-column>
          <el-table-column label="手术病人数" align="center" width>
            <el-table-column prop="f1" label="I级" align="center" width></el-table-column>
            <el-table-column prop="f2" label="II级" align="center" width></el-table-column>
            <el-table-column prop="f3" label="III级" align="center" width></el-table-column>
            <el-table-column prop="f4" label="其他" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="切口感染人数" align="center" width>
            <el-table-column prop="f5" label="I级" align="center" width></el-table-column>
            <el-table-column prop="f6" label="II级" align="center" width></el-table-column>
            <el-table-column prop="f7" label="III级" align="center" width></el-table-column>
            <el-table-column prop="f8" label="其他" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="手术切口感染率" align="center" width>
            <el-table-column prop="f9" label="I级" align="center" width></el-table-column>
            <el-table-column prop="f10" label="II级" align="center" width></el-table-column>
            <el-table-column prop="f11" label="III级" align="center" width></el-table-column>
            <el-table-column prop="f12" label="其他" align="center" width></el-table-column>
          </el-table-column>
        </el-table>
      </template>

  </div>
</template>

<script>
import { infect3 } from "@/api";
import { showOkMsg, showErrorMsg ,reSetData} from "@/utils/index.js";

import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      manyData: [],
      tableIsShow: false,
      printLength: 10,
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



    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        infect3({
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
    },

    exportExcel() {

      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        infect3({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          excel: 1
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
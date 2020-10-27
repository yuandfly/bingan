<template>
  <!-- 部分医疗质量指标汇总表 -->
  <div  id="print">
    <h1>全院及分科部分医疗质量指标汇总表</h1>
    <h3>时期: {{startDate}} ～ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>


      <template v-if="manyData.length > 0 && tableIsShow">
        <el-table v-for="(data, index) in manyData" :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
          <el-table-column prop="bqmc" label="科别" align="center" width="80px"></el-table-column>
          <el-table-column label="治疗质量项指标" align="center" width>
            <el-table-column prop="f1" label="治愈率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f2" label="好转率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f3" label="病死率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f4" label="危重病人抢救成功率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f5" label="治愈者平均住院天数" align="center" width="60px"></el-table-column>
            <el-table-column prop="f23" label="无菌手术率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f6" label="无菌切口甲级愈合率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f7" label="中西医治疗率" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="诊断质量指标" align="center" width>
            <el-table-column prop="f8" label="门出院诊断符合率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f9" label="门诊收治待诊率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f10" label="入出院诊断符合率" align="center" width="55px"></el-table-column>
            <el-table-column prop="f11" label="入院收治待诊率" align="center" width="55px"></el-table-column>
            <el-table-column prop="f12" label="出院待诊率" align="center" width="55px"></el-table-column>
            <el-table-column prop="f13" label="入院三日确诊率" align="center" width="55px"></el-table-column>
            <el-table-column prop="f14" label="入院到确诊平均天数" align="center" width="55px"></el-table-column>
            <el-table-column prop="f15" label="手术前后诊断符合率" align="center" width="55px"></el-table-column>
            <el-table-column prop="f16" label="术前平均占用天数" align="center" width="55px"></el-table-column>
            <el-table-column prop="f17" label="临床病理诊断符合率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f18" label="住院四日手术率" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="医疗缺陷指标" align="center" width>
            <el-table-column prop="f19" label="无菌手术化脓率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f24" label="并发症发生率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f20" label="术后并发症发生率" align="center" width="60px"></el-table-column>
            <el-table-column prop="f21" label="医院感染发生率" align="center" width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="费用" align="center" width>
            <el-table-column prop="f22" label="出院者平均住院费用" align="center" width="60px"></el-table-column>
          </el-table-column>
        </el-table>
      </template>
    <template v-else>
      <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
        <el-table-column prop="bqmc" label="科别" align="center" width></el-table-column>
        <el-table-column label="治疗质量项指标" align="center" width>
          <el-table-column prop="f1" label="治愈率" align="center" width></el-table-column>
          <el-table-column prop="f2" label="好转率" align="center" width></el-table-column>
          <el-table-column prop="f3" label="病死率" align="center" width></el-table-column>
          <el-table-column prop="f4" label="危重病人抢救成功率" align="center" width></el-table-column>
          <el-table-column prop="f5" label="治愈者平均住院天数" align="center" width></el-table-column>
          <el-table-column prop="f23" label="无菌手术率" align="center" width></el-table-column>
          <el-table-column prop="f6" label="无菌切口甲级愈合率" align="center" width></el-table-column>
          <el-table-column prop="f7" label="中西医治疗率" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="诊断质量指标" align="center" width>
          <el-table-column prop="f8" label="门出院诊断符合率" align="center" width></el-table-column>
          <el-table-column prop="f9" label="门诊收治待诊率" align="center" width></el-table-column>
          <el-table-column prop="f10" label="入出院诊断符合率" align="center" width></el-table-column>
          <el-table-column prop="f11" label="入院收治待诊率" align="center" width></el-table-column>
          <el-table-column prop="f12" label="出院待诊率" align="center" width></el-table-column>
          <el-table-column prop="f13" label="入院三日确诊率" align="center" width></el-table-column>
          <el-table-column prop="f14" label="入院到确诊平均天数" align="center" width></el-table-column>
          <el-table-column prop="f15" label="手术前后诊断符合率" align="center" width></el-table-column>
          <el-table-column prop="f16" label="术前平均占用天数" align="center" width></el-table-column>
          <el-table-column prop="f17" label="临床病理诊断符合率" align="center" width></el-table-column>
          <el-table-column prop="f18" label="住院四日手术率" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="医疗缺陷指标" align="center" width>
          <el-table-column prop="f19" label="无菌手术化脓率" align="center" width></el-table-column>
          <el-table-column prop="f24" label="并发症发生率" align="center" width></el-table-column>
          <el-table-column prop="f20" label="术后并发症发生率" align="center" width></el-table-column>
          <el-table-column prop="f21" label="医院感染发生率" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="费用" align="center" width>
          <el-table-column prop="f22" label="出院者平均住院费用" align="center" width></el-table-column>
        </el-table-column>
      </el-table>
    </template>

  </div>
</template>

<script>
import { medicalQualitySummary } from "@/api";
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
      printLength: 20,
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
        medicalQualitySummary({
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
        medicalQualitySummary({
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
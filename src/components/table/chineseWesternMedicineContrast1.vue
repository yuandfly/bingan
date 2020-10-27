<template>
  <!-- 中西医诊断对照表 -->
  <div id="print">
    <h1>中医病症与西医疾病对照统计报表（二）</h1>
    <h3>时期: {{startDate}} ～ {{endDate}}</h3>
    <h2>
      <span>医院名称：{{unitName}}</span>
      <span>科 别：{{label}}</span>
      <span></span>
    </h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="xh" label="序号" align="center" width></el-table-column>
      <el-table-column prop="zydm" label="中医病名编码" align="center" width></el-table-column>
      <el-table-column prop="zymc" label="中医疾病名称" align="center" width></el-table-column>
      <el-table-column prop="zhdm" label="中医证候编码" align="center" width></el-table-column>
      <el-table-column prop="zhMC" label="中医证候名称" align="center" width></el-table-column>
      <el-table-column prop="icd" label="ICD类目" align="center" width></el-table-column>
      <el-table-column prop="xymc" label="西医疾病名称" align="center" width></el-table-column>
      <el-table-column prop="f1" label="构成比(%)" align="center" width></el-table-column>
      <el-table-column prop="f2" label="出院人数" align="center" width></el-table-column>
      <el-table-column label="出院病人数(人)" align="center" width>
        <el-table-column prop label="合计" align="center" width></el-table-column>
        <el-table-column prop="f4" label="治愈" align="center" width></el-table-column>
        <el-table-column prop="f5" label="好转" align="center" width></el-table-column>
        <el-table-column prop="f6" label="未愈" align="center" width></el-table-column>
        <el-table-column prop="f7" label="死亡" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="f8" label="出院病人占用总床日数" align="center" width></el-table-column>
      <el-table-column prop="f9" label="中医治疗例数" align="center" width></el-table-column>
      <el-table-column prop="f10" label="出院者总费用" align="center" width></el-table-column>
      <el-table-column prop="f11" label="辨识与出院诊断符合人数" align="center" width></el-table-column>
      <el-table-column prop="f12" label="入院与出诊断符合人数" align="center" width></el-table-column>
      <el-table-column prop="f13" label="入院三日内诊断符合人数" align="center" width></el-table-column>
      <el-table-column prop="f14" label="无菌手术例数" align="center" width></el-table-column>
      <el-table-column prop="f15" label="无菌手术切口甲级愈合例数" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { tcmWesternContrast } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

import FileSaver from "file-saver";
import XLSX from 'xlsx';
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      label: "",
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        tcmWesternContrast({
          bz: this.dateList.administrative,
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.label = this.dateList.officeLable;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },
    exportExcel() {

      // if (this.tableData && this.tableData.length === 0) {
      //   this.$message.error('数据为空不能下载');
      //   return;
      // }

      var wopts = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'array'
      };
      var workBook = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
      };

//将表头放到原始数据里面去，要保证表头在数组的最前面
      //  const newData = [headerDisplay, ...this.tableData];
      //  console.log(newData);
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      try {
        FileSaver.saveAs(
                //Blob 对象表示一个不可变、原始数据的类文件对象。
                //Blob 表示的不一定是JavaScript原生格式的数据。
                //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                new Blob([wbout], { type: "application/octet-stream" }),
                //设置导出文件名称
                "中医病症与西医疾病对照统计报表（二）.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
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
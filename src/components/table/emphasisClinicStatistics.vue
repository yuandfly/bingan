<template>
  <!-- 中医重点专科临床工作统计表 -->
  <div id="print">
    <h1>中医重点专科临床工作统计表</h1>
    <h3>年度：{{startDate}}</h3>
    <h2>
      <span>医院名称：{{unitName}}</span>
      <span>科 别：{{label}}</span>
    </h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="yfmc" label="月份" align="center" width></el-table-column>
      <el-table-column prop="f1" label="中医治疗率%" align="center" width></el-table-column>
      <el-table-column prop="f2" label="中西医结合治疗率%" align="center" width></el-table-column>
      <el-table-column prop="f3" label="中医参与率%" align="center" width></el-table-column>
      <el-table-column prop="f4" label="甲级病案率%" align="center" width></el-table-column>
      <el-table-column prop="f5" label="辨证论治优良率%" align="center" width></el-table-column>
      <el-table-column prop="f6" label="上级医师指导优良率%" align="center" width></el-table-column>
      <el-table-column label="急、危、重病人" align="center" width>
        <el-table-column prop="f7" label="收治率%" align="center" width></el-table-column>
        <el-table-column prop="f8" label="中医参治率%" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="f9" label="区域外病人收治率%" align="center" width></el-table-column>
      <el-table-column prop="f10" label="医院感染率%" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { keySpecialist } from "@/api";
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
        keySpecialist({
          kb: this.dateList.administrative,
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin.slice(0, 4) + " 年";
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
                "中医重点专科临床工作统计表.xlsx"
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
<template>
  <!-- 住院病种统计分析表 -->
  <div id="print">
    <h1>住院病种统计分析表（一）</h1>
    <h3>时期: {{startDate}} ～ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="xh" label="顺位" align="center" width></el-table-column>
      <el-table-column prop="icd" label="ICD" align="center" width></el-table-column>
      <el-table-column prop="bm" label="病种" width="240"></el-table-column>
      <el-table-column prop="f1" label="构成比%" align="center" width></el-table-column>
      <el-table-column prop="f2" label="累计构成比%" align="center" width></el-table-column>
      <el-table-column prop="f3" label="出院人数" align="center" width></el-table-column>
      <el-table-column label="出院病人数" align="center" width>
        <el-table-column prop="f4" label="小计" align="center" width></el-table-column>
        <el-table-column prop="f5" label="治愈" align="center" width></el-table-column>
        <el-table-column prop="f6" label="好转" align="center" width></el-table-column>
        <el-table-column prop="f7" label="未愈" align="center" width></el-table-column>
        <el-table-column prop="f8" label="病死" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="治疗类别" align="center" width>
        <el-table-column prop="f9" label="中医" align="center" width></el-table-column>
        <el-table-column prop="f10" label="西医" align="center" width></el-table-column>
        <el-table-column prop="f11" label="中西" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="入院病情" align="center" width>
        <el-table-column prop="f12" label="危重" align="center" width></el-table-column>
        <el-table-column prop="f13" label="急症" align="center" width></el-table-column>
        <el-table-column prop="f14" label="一般" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="入院途径" align="center" width>
        <el-table-column prop="f15" label="门诊" align="center" width></el-table-column>
        <el-table-column prop="f16" label="急症" align="center" width></el-table-column>
        <el-table-column prop="f17" label="转院" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="f18" label="住院总天数" align="center" width></el-table-column>
      <el-table-column label="住院天数" align="center" width>
        <el-table-column prop="f19" label="最小值" align="center" width></el-table-column>
        <el-table-column prop="f20" label="最大值" align="center" width></el-table-column>
        <el-table-column prop="f21" label="平均数" align="center" width></el-table-column>
        <el-table-column prop="f22" label="标准签" align="center" width></el-table-column>
        <el-table-column prop="f23" label="方差" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchDiseaseName } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

import XLSX from 'xlsx';

import FileSaver from "file-saver";
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

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        searchDiseaseName({
          startDate: this.dateList.dateBegin,
          endDate: this.dateList.dateEnd
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
                "住院病种统计分析表（一）.xlsx"
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
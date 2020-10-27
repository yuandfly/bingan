<template>
  <!-- 门诊工作统计 -->
  <div id="print">
    <h1>医 技 科 室 工 作 量 台 账</h1>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="lmmc" label="项目" align="center" width="170"></el-table-column>
      <el-table-column prop="y0101" label="一月份" align="center" width></el-table-column>
      <el-table-column prop="y0202" label="二月份" align="center" width></el-table-column>
      <el-table-column prop="y0303" label="三月份" align="center" width></el-table-column>
      <el-table-column prop="y0103" label="一季度" align="center" width></el-table-column>
      <el-table-column prop="y0404" label="四月份" align="center" width></el-table-column>
      <el-table-column prop="y0505" label="五月份" align="center" width></el-table-column>
      <el-table-column prop="y0606" label="六月份" align="center" width></el-table-column>
      <el-table-column prop="y0406" label="二季度" align="center" width></el-table-column>
      <el-table-column prop="y0106" label="上半年" align="center" width></el-table-column>
      <el-table-column prop="y0707" label="七月份" align="center" width></el-table-column>
      <el-table-column prop="y0808" label="八月份" align="center" width></el-table-column>
      <el-table-column prop="y0909" label="九月份" align="center" width></el-table-column>
      <el-table-column prop="y0709" label="三季度" align="center" width></el-table-column>
      <el-table-column prop="y1010" label="十月份" align="center" width></el-table-column>
      <el-table-column prop="y1111" label="十一月份" align="center" width></el-table-column>
      <el-table-column prop="y1212" label="十二月份" align="center" width></el-table-column>
      <el-table-column prop="y1012" label="四季度" align="center" width></el-table-column>
      <el-table-column prop="y0712" label="下半年" align="center" width></el-table-column>
      <el-table-column prop="y0112" label="全年" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deptWorkLedger } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
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
        deptWorkLedger({
          kb: this.dateList.administrative,
          startTime: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始和结束日期");
      }
    },

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    // 导出表格为excel
    //定义导出Excel表格事件
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
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'), {raw:true});
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
                "医技科室工作量台账.xlsx"
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
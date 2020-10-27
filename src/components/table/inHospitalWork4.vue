<template>
  <!-- 住院工作统计台账 -->
  <div id="print">
    <h1>住院工作统计台账（一）</h1>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="tjz2mc" label="时期" align="center" width></el-table-column>
      <el-table-column prop="tjz2001" label="期末实有病床" align="center" width></el-table-column>
      <el-table-column prop="tjz2002" label="期初原有人数" align="center" width></el-table-column>
      <el-table-column prop="tjz2003" label="入院人数" align="center" width></el-table-column>
      <el-table-column prop="tjz2004" label="他科转入人数" align="center" width></el-table-column>
      <el-table-column label="出院人数（人）" align="center" width>
        <el-table-column prop="tjz2005" label="总计" align="center" width></el-table-column>
        <el-table-column label="其中" align="center" width>
          <el-table-column prop="sum" label="小计" align="center" width></el-table-column>
          <el-table-column prop="tjz2007" label="治愈" align="center" width></el-table-column>
          <el-table-column prop="tjz2008" label="好转" align="center" width></el-table-column>
          <el-table-column prop="tjz2009" label="未愈" align="center" width></el-table-column>
          <el-table-column prop="tjz2010" label="死亡" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="其他" align="center" width>
          <el-table-column prop="tjz2011" label="小计" align="center" width></el-table-column>
          <el-table-column label="其中" align="center" width>
            <el-table-column prop="tjz2012" label="正常分娩" align="center" width></el-table-column>
            <el-table-column prop="tjz2013" label="计划生育" align="center" width></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="tjz2014" label="转往他科人数" align="center" width></el-table-column>
      <el-table-column prop="tjz2015" label="期末留院人数" align="center" width></el-table-column>
      <el-table-column prop="tjz2016" label="实际开放总床日数" align="center" width></el-table-column>
      <el-table-column prop="tjz2017" label="平均开放病床数" align="center" width></el-table-column>
      <el-table-column prop="tjz2018" label="实际占用总床日数" align="center" width></el-table-column>
      <el-table-column prop="tjz2019" label="出院者占用总床日数" align="center" width></el-table-column>
      <el-table-column prop="tjz2020" label="陪护人日数" align="center" width></el-table-column>
      <el-table-column prop="tjz2068" label="期内手术人数" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { hospitalizeLedger } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
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

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        hospitalizeLedger({
          kb: this.dateList.administrative,
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data.list1;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始和结束日期");
      }
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
                "住院工作统计台账 .xlsx"
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
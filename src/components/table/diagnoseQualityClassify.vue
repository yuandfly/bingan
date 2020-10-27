<template>
  <!-- 中医病症诊断分类统计表 -->
  <div id="print">
    <h1>中医病症诊断分类统计表</h1>
    <h3>时期: {{startDate}} ~ {{endDate}}</h3>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="xh" label="序号" align="center" width></el-table-column>
      <el-table-column prop="zydm" label="中医编码" align="center" width></el-table-column>
      <el-table-column prop="zymc" label="中医疾病名称" align="center" width></el-table-column>
      <el-table-column prop="f1" label="病例总数" align="center" width></el-table-column>
      <el-table-column prop="f2" label="证候个数" align="center" width></el-table-column>
      <el-table-column label="病因证候（B）" align="center" width>
        <el-table-column prop="f3" label="小计" align="center" width></el-table-column>
        <el-table-column prop="f4" label="风F" align="center" width></el-table-column>
        <el-table-column prop="f5" label="寒H" align="center" width></el-table-column>
        <el-table-column prop="f6" label="暑S" align="center" width></el-table-column>
        <el-table-column prop="f7" label="湿M" align="center" width></el-table-column>
        <el-table-column prop="f8" label="燥Z" align="center" width></el-table-column>
        <el-table-column prop="f9" label="火U" align="center" width></el-table-column>
        <el-table-column prop="f10" label="热R" align="center" width></el-table-column>
        <el-table-column prop="f11" label="毒D" align="center" width></el-table-column>
        <el-table-column prop="f12" label="邪X" align="center" width></el-table-column>
        <el-table-column prop="f13" label="情志V" align="center" width></el-table-column>
        <el-table-column prop="f14" label="饮食Y" align="center" width></el-table-column>
        <el-table-column prop="f15" label="外伤W" align="center" width></el-table-column>
        <el-table-column prop="f16" label="虫C" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="阴阳气血津液痰证候（Y）" align="center" width>
        <el-table-column prop="f17" label="小计" align="center" width></el-table-column>
        <el-table-column prop="f18" label="阴Y" align="center" width></el-table-column>
        <el-table-column prop="f19" label="阳A" align="center" width></el-table-column>
        <el-table-column prop="f20" label="气V" align="center" width></el-table-column>
        <el-table-column prop="f21" label="血瘀X" align="center" width></el-table-column>
        <el-table-column prop="f22" label="津液J" align="center" width></el-table-column>
        <el-table-column prop="f23" label="痰水T" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { classification } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

import FileSaver from "file-saver";
import XLSX from 'xlsx';
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
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        classification({
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
                "中医病症诊断分类统计表.xlsx"
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
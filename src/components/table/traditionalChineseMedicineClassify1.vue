<template>
  <!-- 中医疾病分类统计表 -->
  <div id="print">
    <h1>中医疾病(TCD)分类情况统计表 (一)</h1>
    <h3>时期: {{startDate}} ~ {{endDate}}</h3>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="xh" label="序号" align="center" width></el-table-column>
      <el-table-column prop="zydm " label="中医编码" align="center" width></el-table-column>
      <el-table-column prop="zymc" label="中医疾病名称" align="center" width></el-table-column>
      <el-table-column prop="f1" label="构成比(%)" align="center" width></el-table-column>
      <el-table-column prop="f2" label="出院人数合计" align="center" width></el-table-column>
      <el-table-column label="出院病人数(人)" align="center" width>
        <el-table-column prop="f3" label="合计" align="center" width></el-table-column>
        <el-table-column prop="f4" label="治愈" align="center" width></el-table-column>
        <el-table-column prop="f5" label="好转" align="center" width></el-table-column>
        <el-table-column prop="f6" label="未愈" align="center" width></el-table-column>
        <el-table-column prop="f7" label="死亡" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="f8" label="出院病人占用总床日数" align="center" width></el-table-column>
      <el-table-column prop="f9" label="中医治疗例数" align="center" width></el-table-column>
      <el-table-column label="出院病人住院医疗费用(元)" align="center" width>
        <el-table-column prop="f10" label="总费用" align="center" width></el-table-column>
        <el-table-column label="其中" align="center" width>
          <el-table-column prop="f11" label="服务费" align="center" width></el-table-column>
          <el-table-column prop="f12" label="西药费" align="center" width></el-table-column>
          <el-table-column prop="f13" label="中药费" align="center" width></el-table-column>
          <el-table-column prop="f14" label="手术费" align="center" width></el-table-column>
          <el-table-column prop="f15" label="检查费" align="center" width></el-table-column>
          <el-table-column prop="f16" label="治疗费" align="center" width></el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="f17" label="门、出诊断符合数(人)" align="center" width></el-table-column>
      <el-table-column prop="f18" label="入、出诊断符合数(人)" align="center" width></el-table-column>
      <el-table-column prop="f19" label="三日内诊断符合数(人)" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { diseaseSortStatistics } from "@/api";
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
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        diseaseSortStatistics({
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

    printContext () {
      this.$print(document.querySelector('#print'));
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
                "中医疾病(TCD)分类情况统计表.xlsx"
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
<template>
  <!-- 急症、危重、疑难病人情况统计 -->
  <div id="print">
    <h1>疾病病种统计分类登记一览表</h1>
    <h3>时期:{{startDate}} ~ {{endDate}}</h3>
    <div class="piece" v-for="item in tableData">
      <h2>
        <span>病种:{{item.itemName}}</span>
        <span>医院名称：{{unitName}}</span>
      </h2>
      <el-table :data="item.pageList" id="out-table" stripe border style="width: 100%">
        <el-table-column prop="baza01" label="病案号" align="center" width="120"></el-table-column>
        <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
        <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
        <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
        <el-table-column prop="baza24" label="入院日期" align="center" width="110"></el-table-column>
        <el-table-column prop="baza27" label="出院日期" align="center" width="110"></el-table-column>
        <el-table-column prop="baza29" label="天数" align="center" width></el-table-column>
        <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
        <el-table-column prop="baza38c" label="出院主诊断" align="center" width="150"></el-table-column>
        <el-table-column prop="icd" label="ICD" align="center" width></el-table-column>
        <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
        <el-table-column prop="baza53c" label="手术" align="center" width></el-table-column>
        <el-table-column prop="baza55c" label="治疗" align="center" width></el-table-column>
        <el-table-column prop="baza13c" label="工作单位及地址" align="center" width="220"></el-table-column>
        <el-table-column prop="baza83" label="住院费用" align="center" width></el-table-column>
        <el-table-column prop="baza80" label="归档号" align="center" width></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { diseaseTypeRegister } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      type: "",
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
        diseaseTypeRegister({
          ord: this.dateList.grade,
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
                "疾病病种统计分类登记一览表.xlsx"
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
.piece {
  margin-bottom: 30px;
}
</style>
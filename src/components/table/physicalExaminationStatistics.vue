<template>
  <!-- 健康体检全年台账 -->
  <div id="print">
    <h1>{{startDate}} 年度健康体检工作统计报表</h1>
    <h2>单位名称：{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="rq" label="日期" align="center" width></el-table-column>
      <el-table-column prop="m01" label="健康检查人数" align="center" width></el-table-column>
      <el-table-column prop="m02" label="其中：高干体检" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { healthyExamination } from "@/api";
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

    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateBegin) {
        healthyExamination({
          endTime: "",
          kb: "0000",
          startTime: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择年度");
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
                this.startDate + "年度健康体检工作统计报表.xlsx"
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
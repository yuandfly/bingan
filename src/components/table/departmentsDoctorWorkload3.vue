<template>
  <!-- 科室医师工作量 -->
  <div  id="print">
    <h1>门诊分科医师工作量统计表</h1>
    <h3>时期:{{startDate}} ～ {{endDate}}</h3>
    <h2>医院名称:{{unitName}}</h2>


      <template v-if="manyData.length > 0 && tableIsShow">
        <el-table v-for="(data, index) in manyData" :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
          <el-table-column prop="kbjc" label="科别" align="center" width></el-table-column>
          <el-table-column prop="tjm1ysdm" label="医师" align="center" width></el-table-column>
          <el-table-column prop="tjm1yszc" label="职称" align="center" width></el-table-column>
          <el-table-column prop="tjm1001" label="工时" align="center" width></el-table-column>
          <el-table-column label="门诊人次" align="center">
            <el-table-column prop="tjm1002" label="小计" align="center" width></el-table-column>
            <el-table-column prop="tjm1008" label="专科" align="center" width></el-table-column>
            <el-table-column prop="tjm1009" label="专家" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop="tjm1003" label="急诊人次" align="center" width></el-table-column>
          <el-table-column prop="tjm1004" label="单项健康检查" align="center" width></el-table-column>
          <el-table-column prop="tjm1005" label="手术例数" align="center" width></el-table-column>
          <el-table-column prop="tjm1006" label="会诊人次" align="center" width></el-table-column>
          <el-table-column prop="tjm1007" label="出诊人次" align="center" width></el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="kbjc" label="科别" align="center" width></el-table-column>
          <el-table-column prop="tjm1ysdm" label="医师" align="center" width></el-table-column>
          <el-table-column prop="tjm1yszc" label="职称" align="center" width></el-table-column>
          <el-table-column prop="tjm1001" label="工时" align="center" width></el-table-column>
          <el-table-column label="门诊人次" align="center">
            <el-table-column prop="tjm1002" label="小计" align="center" width></el-table-column>
            <el-table-column prop="tjm1008" label="专科" align="center" width></el-table-column>
            <el-table-column prop="tjm1009" label="专家" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop="tjm1003" label="急诊人次" align="center" width></el-table-column>
          <el-table-column prop="tjm1004" label="单项健康检查" align="center" width></el-table-column>
          <el-table-column prop="tjm1005" label="手术例数" align="center" width></el-table-column>
          <el-table-column prop="tjm1006" label="会诊人次" align="center" width></el-table-column>
          <el-table-column prop="tjm1007" label="出诊人次" align="center" width></el-table-column>
        </el-table>
      </template>

  </div>
</template>

<script>
import { outPatientWorkAmount } from "@/api";
import { showOkMsg, showErrorMsg,reSetData } from "@/utils/index.js";
import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      manyData: [],
      tableIsShow: false,
      printLength: 17,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        outPatientWorkAmount({
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

    printContext () {

      this.$prompt('请输入每页打印行数', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: this.printLength
      }).then(({ value }) => {
        this.tableIsShow = true;
        this.printLength = Number(value);
        this.manyData = reSetData(this.tableData, this.printLength);
        setTimeout(() => {
          this.$print(document.querySelector('#print'));
          console.log(this.tableIsShow);
        }, 500);

        setTimeout(() => {
          this.tableIsShow = false;
          console.log(this.tableIsShow);
        }, 2000);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消打印'
        });
      });


      // this.$print(document.querySelector('#print'), this.printOptions);
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
                "门诊分科医师工作量统计表.xlsx"
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
<template>
  <!-- 科室医师工作量 -->
  <div id="print">
    <h1>住院分科工作量报表</h1>
    <h3>时期：{{dateList.dateBegin}} ~ {{dateList.dateEnd}}</h3>
    <h2>医院名称:{{unitName}}</h2>

      <template v-if="manyData.length > 0 && tableIsShow">
        <el-table v-for="(data, index) in manyData" :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
          <el-table-column prop="kbjc" label="科别" align="center" width></el-table-column>
          <el-table-column prop="qmcws" label="期末实有病床" align="center" width></el-table-column>
          <el-table-column prop="qcs" label="期初原有人数" align="center" width></el-table-column>
          <el-table-column prop="z03" label="入院人数" align="center" width></el-table-column>
          <el-table-column prop="z04" label="他科转入人数" align="center" width></el-table-column>
          <el-table-column label="出院人数" align="center" width>
            <el-table-column prop="tjz2005" label="合计" align="center" width></el-table-column>
            <el-table-column prop label="出院病人数" align="center" width>
              <el-table-column prop="z06" label="小计" align="center" width></el-table-column>
              <el-table-column prop="z07" label="治愈" align="center" width></el-table-column>
              <el-table-column prop="z08" label="好转" align="center" width></el-table-column>
              <el-table-column prop="z09" label="未愈" align="center" width></el-table-column>
              <el-table-column prop="z10" label="死亡" align="center" width></el-table-column>
            </el-table-column>
            <el-table-column prop="z12" label="正常分娩" align="center" width></el-table-column>
            <el-table-column prop="z13" label="计划生育" align="center" width></el-table-column>
            <el-table-column prop="z14" label="其他" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop="z15" label="转往他科人数" align="center" width></el-table-column>
          <el-table-column prop="qms" label="期末留院人数" align="center" width></el-table-column>
          <el-table-column prop="z01" label="实际开放总床日数" align="center" width></el-table-column>
          <el-table-column prop="pjkf" label="平均开放病床数" align="center" width></el-table-column>
          <el-table-column prop="z16" label="实际占用总床日数" align="center" width></el-table-column>
          <el-table-column prop="z17" label="出院者占用总床日数" align="center" width></el-table-column>
          <el-table-column prop="z19" label="陪伴人数" align="center" width></el-table-column>
        </el-table>
      </template>
    <div v-else>
      <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
        <el-table-column prop="kbjc" label="科别" align="center" width></el-table-column>
        <el-table-column prop="qmcws" label="期末实有病床" align="center" width></el-table-column>
        <el-table-column prop="qcs" label="期初原有人数" align="center" width></el-table-column>
        <el-table-column prop="z03" label="入院人数" align="center" width></el-table-column>
        <el-table-column prop="z04" label="他科转入人数" align="center" width></el-table-column>
        <el-table-column label="出院人数" align="center" width>
          <el-table-column prop="tjz2005" label="合计" align="center" width></el-table-column>
          <el-table-column prop label="出院病人数" align="center" width>
            <el-table-column prop="z06" label="小计" align="center" width></el-table-column>
            <el-table-column prop="z07" label="治愈" align="center" width></el-table-column>
            <el-table-column prop="z08" label="好转" align="center" width></el-table-column>
            <el-table-column prop="z09" label="未愈" align="center" width></el-table-column>
            <el-table-column prop="z10" label="死亡" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop="z12" label="正常分娩" align="center" width></el-table-column>
          <el-table-column prop="z13" label="计划生育" align="center" width></el-table-column>
          <el-table-column prop="z14" label="其他" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column prop="z15" label="转往他科人数" align="center" width></el-table-column>
        <el-table-column prop="qms" label="期末留院人数" align="center" width></el-table-column>
        <el-table-column prop="z01" label="实际开放总床日数" align="center" width></el-table-column>
        <el-table-column prop="pjkf" label="平均开放病床数" align="center" width></el-table-column>
        <el-table-column prop="z16" label="实际占用总床日数" align="center" width></el-table-column>
        <el-table-column prop="z17" label="出院者占用总床日数" align="center" width></el-table-column>
        <el-table-column prop="z19" label="陪伴人数" align="center" width></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { inpatientWorkload } from "@/api";
import { showOkMsg, showErrorMsg, reSetData } from "@/utils/index.js";
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
      printLength: 14,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList(this.dateList.dateBegin, this.dateList.dateEnd);
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        inpatientWorkload({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            showOkMsg(res.msg);
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
                "住院分科工作量报表.xlsx"
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
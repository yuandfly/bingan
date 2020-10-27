<template>
  <!-- 科室医师工作量 -->
  <div id="print" >
    <h1>家 庭 病 床 工 作 量 统 计 表</h1>
    <h3>时期：{{dateList.dateBegin}} ~ {{dateList.dateEnd}}</h3>
    <h2>医院名称:{{unitName}}</h2>


      <template v-if="manyData.length > 0 && tableIsShow">
        <el-table v-for="(data, index) in manyData" :data="data" :key="index"    stripe border style="width: 100%;margin-bottom: 180px;">
          <el-table-column prop label="科别" align="center" width></el-table-column>
          <el-table-column prop label="撤床病人诊疗人次数" align="center" width></el-table-column>
          <el-table-column prop label="期初原有人数" align="center" width></el-table-column>
          <el-table-column prop label="入床人数" align="center" width></el-table-column>
          <el-table-column prop label="撤床人数" align="center" width>
            <el-table-column prop label="小计" align="center" width></el-table-column>
            <el-table-column prop label="治愈" align="center" width></el-table-column>
            <el-table-column prop label="好转" align="center" width></el-table-column>
            <el-table-column prop label="未愈" align="center" width></el-table-column>
            <el-table-column prop label="死亡" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop label="期末留床人数" align="center" width></el-table-column>
          <el-table-column prop label="实际开设总床日数" align="center" width></el-table-column>
          <el-table-column prop label="撤床者占用总床日数" align="center" width></el-table-column>
          <el-table-column prop label="日平留床人数" align="center" width></el-table-column>
          <el-table-column prop label="治愈率%" align="center" width></el-table-column>
          <el-table-column prop label="好转率%" align="center" width></el-table-column>
          <el-table-column prop label="病死率%" align="center" width></el-table-column>
          <el-table-column prop label="撤床者平均占床日" align="center" width></el-table-column>
          <el-table-column prop label="赴家庭病床诊疗人次" align="center" width></el-table-column>
        </el-table>
      </template>
      <template v-else>
        <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
          <el-table-column prop label="科别" align="center" width></el-table-column>
          <el-table-column prop label="撤床病人诊疗人次数" align="center" width></el-table-column>
          <el-table-column prop label="期初原有人数" align="center" width></el-table-column>
          <el-table-column prop label="入床人数" align="center" width></el-table-column>
          <el-table-column prop label="撤床人数" align="center" width>
            <el-table-column prop label="小计" align="center" width></el-table-column>
            <el-table-column prop label="治愈" align="center" width></el-table-column>
            <el-table-column prop label="好转" align="center" width></el-table-column>
            <el-table-column prop label="未愈" align="center" width></el-table-column>
            <el-table-column prop label="死亡" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop label="期末留床人数" align="center" width></el-table-column>
          <el-table-column prop label="实际开设总床日数" align="center" width></el-table-column>
          <el-table-column prop label="撤床者占用总床日数" align="center" width></el-table-column>
          <el-table-column prop label="日平留床人数" align="center" width></el-table-column>
          <el-table-column prop label="治愈率%" align="center" width></el-table-column>
          <el-table-column prop label="好转率%" align="center" width></el-table-column>
          <el-table-column prop label="病死率%" align="center" width></el-table-column>
          <el-table-column prop label="撤床者平均占床日" align="center" width></el-table-column>
          <el-table-column prop label="赴家庭病床诊疗人次" align="center" width></el-table-column>
        </el-table>
      </template>
  </div>
</template>

<script>
import { emergencyDepartmentWorkload } from "@/api";
import { showOkMsg, showErrorMsg,reSetData } from "@/utils/index.js";
import XLSX from 'xlsx';

import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      manyData: [],
      tableIsShow: false,
      printLength: 14,
      unitName: sessionStorage.getItem('unitName')
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {

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
    getTableList() {
      if (this.dateList.dateEnd && this.dateList.dateBegin) {
        emergencyDepartmentWorkload({
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
                "家庭病床工作量统计表.xlsx"
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
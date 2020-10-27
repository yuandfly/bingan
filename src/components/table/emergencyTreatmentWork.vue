<template>
  <!-- 急诊工作逐日登记表 -->
  <div id="print">
    <template  v-if="manyData.length > 0 && tableIsShow">
     <template v-for="(data, index) in manyData">
       <h1>急诊工作逐日登记表</h1>
       <h3>统计时期：{{year}} 年 {{monthName}}</h3>
       <h2>
         <span>单位名称：{{unitName}}</span>
         <span>科室名称：{{officeName}}</span>
       </h2>
       <el-table :data="data" :key="index"    stripe border style="width: 100%">
         <el-table-column prop="rq" label="日期" align="center" width="60px"></el-table-column>
         <el-table-column label="急诊人数" align="center" width>
           <el-table-column prop="tjm3001" label="合计" align="center" width="60px"></el-table-column>
           <el-table-column prop="tjm3002" label="回家" align="center" width="60px"></el-table-column>
           <el-table-column prop="tjm3003" label="入观" align="center" width="60px"></el-table-column>
           <el-table-column prop="tjm3004" label="入院" align="center" width="60px"></el-table-column>
           <el-table-column prop="tjm3005" label="死亡" align="center" width="60px"></el-table-column>
         </el-table-column>
         <el-table-column prop="tjm3006" label="平诊人数" align="center" width="70px"></el-table-column>
         <el-table-column prop="tjm3007" label="危重抢救人数" align="center" width="70px"></el-table-column>
         <el-table-column prop="tjm3008" label="抢救成功人数" align="center" width="70px"></el-table-column>
         <el-table-column label="急诊原因分类" align="center" width>
           <el-table-column prop="tjm3009" label="中毒" align="center" width="50px"></el-table-column>
           <el-table-column prop="tjm3010" label="外伤" align="center" width="50px"></el-table-column>
           <el-table-column prop="tjm3011" label="内科" align="center" width="50px"></el-table-column>
           <el-table-column prop="tjm3012" label="其他" align="center" width="50px"></el-table-column>
         </el-table-column>
         <el-table-column prop="tjm3013" label="急诊出车" align="center" width="50px"></el-table-column>
         <el-table-column prop="tjm3014" label="急诊手术" align="center" width="50px"></el-table-column>
       </el-table>
     </template>
    </template>
    <template v-else>
      <h1>急诊工作逐日登记表</h1>
      <h3>统计时期：{{year}} 年 {{monthName}}</h3>
      <h2>
        <span>单位名称：{{unitName}}</span>
        <span>科室名称：{{officeName}}</span>
      </h2>
      <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
        <el-table-column prop="rq" label="日期" align="center" width></el-table-column>
        <el-table-column label="急诊人数" align="center" width>
          <el-table-column prop="tjm3001" label="合计" align="center" width></el-table-column>
          <el-table-column prop="tjm3002" label="回家" align="center" width></el-table-column>
          <el-table-column prop="tjm3003" label="入观" align="center" width></el-table-column>
          <el-table-column prop="tjm3004" label="入院" align="center" width></el-table-column>
          <el-table-column prop="tjm3005" label="死亡" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column prop="tjm3006" label="平诊人数" align="center" width></el-table-column>
        <el-table-column prop="tjm3007" label="危重抢救人数" align="center" width></el-table-column>
        <el-table-column prop="tjm3008" label="抢救成功人数" align="center" width></el-table-column>
        <el-table-column label="急诊原因分类" align="center" width>
          <el-table-column prop="tjm3009" label="中毒" align="center" width></el-table-column>
          <el-table-column prop="tjm3010" label="外伤" align="center" width></el-table-column>
          <el-table-column prop="tjm3011" label="内科" align="center" width></el-table-column>
          <el-table-column prop="tjm3012" label="其他" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column prop="tjm3013" label="急诊出车" align="center" width></el-table-column>
        <el-table-column prop="tjm3014" label="急诊手术" align="center" width></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { emergencyDepartmentRegister } from "@/api";
import { showOkMsg, showErrorMsg,reSetData } from "@/utils/index.js";
import XLSX from 'xlsx';
import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      year: "",
      month: "",
      monthName: "",
      officeName: "",
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
    getTableList() {
      if (this.dateList.month) {
        emergencyDepartmentRegister({
          kb: this.dateList.administrative,
          sq: this.dateList.year + this.dateList.month
        }).then(res => {
          if (res.code === 0) {
            this.year = this.dateList.year;
            this.monthName = this.dateList.monthName;
            this.officeName = this.dateList.administrativeName;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择月份");
      }
    },

    printContext () {

      this.tableIsShow = true;
      this.manyData = reSetData(this.tableData, this.printLength);
      setTimeout(() => {
        this.$print(document.querySelector('#print'));
        console.log(this.tableIsShow);
      }, 500);

      setTimeout(() => {
        this.tableIsShow = false;
        console.log(this.tableIsShow);
      }, 2000);



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
                "急诊工作逐日登记表.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }
  }
};
</script>

<style lang="less" scoped>
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
/deep/ .el-table  {
td, th {
  padding: 5px 0;
  font-size: 12px;
}



}
/deep/ .el-table::before {
  width: 0;

}
/deep/ .el-table--border::after, .el-table--group::after, .el-table::before {
  background-color: #fff;
}

/deep/ .el-table--border, .el-table--group {
  border: 0;
}
</style>
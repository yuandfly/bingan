<template>
  <!-- 各临床科室指标完成情况表 -->
  <div id="print">
    <h1>各临床科室指标完成情况表</h1>
    <h3>时期：{{startDate}} ~ {{endDate}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="bqmc" label="病区 简称" align="center" width="150"></el-table-column>
      <el-table-column label="工作效率指标" align="center" width>
        <el-table-column prop="tjz2005" label="出院人数" align="center" width></el-table-column>
        <el-table-column prop="tjz2057" label="床位使用率(%)" align="center" width></el-table-column>
        <el-table-column prop="tjz2058" label="床位周转次" align="center" width></el-table-column>
        <el-table-column prop="tjz2059" label="出院者平均住院日" align="center" width></el-table-column>
        <el-table-column prop="tjz2056" label="平均病床工作日" align="center" width></el-table-column>
        <el-table-column prop="f1" label="手术前平均住院天数" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="工作质量指标(%)" align="center" width>
        <el-table-column prop="tjz2047" label="出入院诊断符合率" align="center" width></el-table-column>
        <el-table-column prop="tjz2053" label="手术前后诊断符合率" align="center" width></el-table-column>
        <el-table-column prop="f2" label="临床病理诊断符合率" align="center" width></el-table-column>
        <el-table-column prop="tjz2050" label="入院三日确诊率" align="center" width></el-table-column>
        <el-table-column prop="tjz2071" label="治愈好转率" align="center" width></el-table-column>
        <el-table-column prop="tjz2060" label="危重病人抢救成功率" align="center" width></el-table-column>
        <el-table-column prop="f4" label="病例医疗质量合格率" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="医疗缺陷" align="center" width>
        <el-table-column prop="tjz2052" label="无菌切口感染率" align="center" width></el-table-column>
        <el-table-column prop="f3" label="医院感染率" align="center" width></el-table-column>
        <el-table-column prop="tjz2055" label="手术并发症发生率" align="center" width></el-table-column>
        <el-table-column prop="tjz2076" label="褥疮发生率" align="center" width></el-table-column>
        <el-table-column prop="tjz2045" label="陪护率" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { clinicalDepartmentIndexComplete } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
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
        clinicalDepartmentIndexComplete({
          endTime: this.dateList.dateEnd,
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
                "各临床科室指标完成情况表.xlsx"
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
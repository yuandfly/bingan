<template>
  <!-- 住院工作分科统计表 -->
  <div id="print">
    <h1>医院住院工作统计表（四）</h1>
    <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column label="病区" align="center" width></el-table-column>
      <el-table-column label="期末实有病床" align="center" width></el-table-column>
      <el-table-column label="初期原有人数" align="center" width></el-table-column>
      <el-table-column label="入院人数" align="center" width></el-table-column>
      <el-table-column label="他科转入人数" align="center" width></el-table-column>
      <el-table-column label="出院人数（人）" align="center" width>
        <el-table-column label="总计" align="center" width></el-table-column>
        <el-table-column label="其中：门、急诊人次数" align="center" width>
          <el-table-column label="合计" align="center" width></el-table-column>
          <el-table-column label="出院病人数" align="center" width>
            <el-table-column label="合计" align="center" width></el-table-column>
            <el-table-column label="治愈" align="center" width></el-table-column>
            <el-table-column label="好转" align="center" width></el-table-column>
            <el-table-column label="未愈" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="非病人" align="center" width>
            <el-table-column label="正常分娩" align="center" width></el-table-column>
            <el-table-column label="计划生育" align="center" width></el-table-column>
            <el-table-column label="其它" align="center" width></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="转往他科人数" align="center" width></el-table-column>
      <el-table-column label="期末留院人数" align="center" width></el-table-column>
      <el-table-column label="实际开放总床数日数" align="center" width></el-table-column>
      <el-table-column label="平均开放病床数" align="center" width></el-table-column>
      <el-table-column label="实际占用总床日数" align="center" width></el-table-column>
      <el-table-column label="平均病床工作日" align="center" width></el-table-column>
      <el-table-column label="病床使用率" align="center" width></el-table-column>
      <el-table-column label="病床周转次数" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {hoBrStatistics} from '@/api';
  import XLSX from 'xlsx';
  import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      unitName: sessionStorage.getItem('unitName'),
      form: {
        startTime: '',
        endTime: '',
      }
    };
  },
  props: ["dataList"],
  watch: {
    dataList(val) {
      this.tableData = val
    }
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      hoBrStatistics(this.dataList).then(res => {
        if (res.data.code === 0) {
          this.administrativeList = res.data.data;
          this.form.administrative = this.administrativeList[0].dm;
        }
      })
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
                "中医医院质控评分表.xlsx"
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
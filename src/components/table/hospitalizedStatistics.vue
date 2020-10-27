<template>
  <!-- 住院工作统计报表 -->
  <div id="print">
    <h1>医院住院工作统计表</h1>
    <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column prop="tjz2mc" label="科别" align="center" width></el-table-column>
      <el-table-column  prop="tjz2001" label="期末实有病床" align="center" width></el-table-column>
      <el-table-column  prop="tjz2003" label="入院人数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2004" label="他科转入人数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2014" label="转往他科人数" align="center" width></el-table-column>

      <el-table-column label="出院人数" align="center" width>
        <el-table-column  prop="tjz2005" label="总计" align="center" width></el-table-column>
        <el-table-column  prop="tjz2007" label="治愈" align="center" width></el-table-column>
        <el-table-column  prop="tjz2008" label="好转" align="center" width></el-table-column>
        <el-table-column  prop="tjz2009" label="未愈" align="center" width></el-table-column>
        <el-table-column  prop="tjz2010" label="死亡" align="center" width></el-table-column>
        <el-table-column  prop="tjz2013" label="其他" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column  prop="tjz2016" label="实际开放总床数日数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2017" label="平均开放病床数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2018" label="实际占用总床日数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2019" label="出院者占用总床数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2041" label="治愈率%" align="center" width></el-table-column>
      <el-table-column prop="tjz2042"  label="好转率%" align="center" width></el-table-column>
      <el-table-column prop="tjz2044"  label="死亡率%" align="center" width></el-table-column>
      <el-table-column  prop="tjz2058" label="病床周转次数" align="center" width></el-table-column>
      <el-table-column prop="tjz2056"  label="平均病床工作日" align="center" width></el-table-column>
      <el-table-column  prop="tjz2057" label="病床使用率%" align="center" width></el-table-column>
      <el-table-column prop="tjz2059"  label="出院者平均住院日" align="center" width></el-table-column>
      <el-table-column  prop="tjz2080" label="总费用（万元）" align="center" width></el-table-column>
      <el-table-column  prop="tjz2047" label="入出院诊断符合率%" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {searchHospitalInpatientWork} from '@/api';
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
      searchHospitalInpatientWork(this.dataList).then(res => {
        if ( res.code === 0) {
          this.tableData = res.data.data ||res.data || [];
          console.log(this.tableData);
          if (this.tableData.length === 0) {
            this.$message.error('没有数据');
          }
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    printContext () {
      this.$print(document.querySelector('#print'));
    },
    exportExcel() {
      this.dataList.excel = 1;
      searchHospitalInpatientWork(this.dataList).then(res => {
        if ( res.code === 0) {
          window.open(res.data);
        } else {
          this.$message.error(res.msg);
        }
      })
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
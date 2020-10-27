<template>
  <!-- 机构运营情况-动态生成 -->
  <div id="print">
    <h1>机构运营情况-动态生成</h1>
    <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column label="总诊疗人次数" align="center" width>
        <el-table-column  prop="tjm7001" label="总计" align="center" width></el-table-column>
        <el-table-column label="其中：门、急诊人次数" align="center" width>
          <el-table-column  prop="hj1" label="合计" align="center" width></el-table-column>
          <el-table-column prop="tjm7002"  label="门诊人次" align="center" width></el-table-column>
          <el-table-column label="急诊人次" align="center" width>
            <el-table-column  prop="tjm7005" label="计" align="center" width></el-table-column>
            <el-table-column prop="tjm7009"  label="死亡人数" align="center" width></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="观察室" align="center" width>
        <el-table-column  prop="tjm7011" label="收容病人数" align="center" width></el-table-column>
        <el-table-column  prop="tjm7012" label="死亡人数" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column  prop="tjm7014" label="健康检查人数" align="center" width></el-table-column>
      <el-table-column  prop="zzcb" label="门、急诊诊次占总诊次之比%" align="center" width></el-table-column>
      <el-table-column prop="jsb"  label="急诊死亡率%" align="center" width></el-table-column>
      <el-table-column  prop="gsb" label="观察室死亡率%" align="center" width></el-table-column>
      <el-table-column  prop="tjz2003" label="入院人数" align="center" width></el-table-column>
      <el-table-column label="出院人数" align="center" width>
        <el-table-column prop="tjz2005"  label="总计" align="center" width></el-table-column>
        <el-table-column prop="tjz2007"  label="治愈" align="center" width></el-table-column>
        <el-table-column  prop="tjz2008" label="好转" align="center" width></el-table-column>
        <el-table-column  prop="tjz2009" label="未愈" align="center" width></el-table-column>
        <el-table-column  prop="tjz2010" label="死亡" align="center" width></el-table-column>
        <el-table-column  prop="qt" label="其它" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column prop="tjz2029"  label="住院病人手术人次" align="center" width></el-table-column>
      <el-table-column label="住院危重抢救人次" align="center" width>
        <el-table-column  prop="tjz2066" label="总计" align="center" width></el-table-column>
        <el-table-column  prop="tjz2067" label="抢救成功人次数" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column  prop="tjz2041" label="治愈率%" align="center" width></el-table-column>
      <el-table-column  prop="tjz2042" label="好转率%" align="center" width></el-table-column>
      <el-table-column  prop="tjz2044" label="病死率%" align="center" width></el-table-column>
      <el-table-column  prop="tjz2060" label="住院危重病人抢救成功率" align="center" width></el-table-column>
      <el-table-column  prop="mzb" label="每百门、急诊的入院人数" align="center" width></el-table-column>
      <el-table-column prop="tjz2001"  label="实有床位数（张）" align="center" width></el-table-column>
      <el-table-column prop="tjz2016"  label="实际开放总床日数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2017" label="平均开放病床数" align="center" width></el-table-column>
      <el-table-column prop="tjz2018"  label="实际占用总床日数" align="center" width></el-table-column>
      <el-table-column prop="tjz2019"  label="出院者占用总床日数" align="center" width></el-table-column>
      <el-table-column prop="tjz2058"  label="病床周转次数" align="center" width></el-table-column>
      <el-table-column  prop="tjz2056" label="病床工作日" align="center" width></el-table-column>
      <el-table-column  prop="tjz2057" label="病床使用率%" align="center" width></el-table-column>
      <el-table-column  prop="tjz2059" label="出院者平均住院日" align="center" width></el-table-column>
      <el-table-column  prop="zcb" label="每床与每日门、急诊诊次之比%" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {SelectHospitalStatistics} from '@/api';
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
      this.dataList.number = 131;
      SelectHospitalStatistics(this.dataList).then(res => {
        if ( res.code === 0) {
          this.tableData = res.data || [];
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
      this.dataList.number = 131;
      this.dataList.excel = 1;
      SelectHospitalStatistics(this.dataList).then(res => {
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
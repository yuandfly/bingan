<template>
  <!-- 门诊分科同期对比报表 -->
  <div id="print">
    <h1>门诊综合统计分科同期对比报表</h1>
    <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
    <h2>医院名称:{{unitName}}</h2>
    <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
      <el-table-column label="科别" prop="tjm7mc" align="center" width></el-table-column>
      <el-table-column label="年份" align="center" width></el-table-column>
      <el-table-column label="总诊疗人次" align="center" width>
        <el-table-column label="总计" prop="tjm7001" align="center" width></el-table-column>
        <el-table-column label="门诊人次"  align="center" width>
          <el-table-column label="计" prop="tjm7002" align="center" width></el-table-column>
          <el-table-column label="专科人次" prop="tjm7003" align="center" width></el-table-column>
          <el-table-column label="专家人次" prop="tjm7004" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="急诊人次" align="center" width>
          <el-table-column label="计" align="center" prop="tjm7005" width></el-table-column>
          <el-table-column label="其中：出车" align="center" prop="tjm7006" width></el-table-column>
          <el-table-column label="抢救人数" align="center" prop="tjm7007" width></el-table-column>
          <el-table-column label="抢救成功人数" align="center" width prop="tjm7008"></el-table-column>
          <el-table-column label="死亡人数" align="center" width prop="tjm7009"></el-table-column>
        </el-table-column>
        <el-table-column label="出诊人次" align="center" width prop="tjm7010"></el-table-column>
        <el-table-column label="赴家庭病床诊疗人次数" align="center" prop="tjm7033" width></el-table-column>
      </el-table-column>
      <el-table-column label="观察室" align="center" width>
        <el-table-column label="收容病人数" align="center" width prop="tjm7011"></el-table-column>
        <el-table-column label="死亡人数" align="center" width prop="tjm7012"></el-table-column>
        <el-table-column label="病人占床日数" align="center" width prop="tjm7013"></el-table-column>
      </el-table-column>
      <el-table-column label="健康检查人数" align="center" width prop="tjm7014"></el-table-column>
      <el-table-column label="门诊手术例数" align="center" width prop="tjm7015"></el-table-column>
      <el-table-column label="正副主任医师门诊人日数" align="center" width prop="tjm7016"></el-table-column>
      <el-table-column label="正副主任医师门诊总工时数" align="center" width prop="tjm7017"></el-table-column>
      <el-table-column label="急诊危重病人抢数成功率%" align="center" width prop="tjm7019"></el-table-column>
      <el-table-column label="观察室病人平均留观日数" align="center" width prop="tjm7020"></el-table-column>
      <el-table-column label="平均每日门急诊数" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {zspTjm7Db} from '@/api';
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
      // let dataList = JSON.parse
      // this.dataList.daily = undefined;
      // this.dataList.bz = undefined;
      // this.dataList.kbdm = undefined;
      // this.dataList.vBase = undefined;
      // this.dataList.xbz = undefined;
      let dataList = JSON.parse(JSON.stringify(this.dataList));
      zspTjm7Db(dataList).then(res => {
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
      let dataList = JSON.parse(JSON.stringify(this.dataList));
      dataList.excel = 1;
      zspTjm7Db(dataList).then(res => {
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

/deep/ .el-table thead {
  display: table-header-group;
}


</style>
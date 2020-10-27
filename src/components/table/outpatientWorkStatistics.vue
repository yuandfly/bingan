<template>
  <!-- 医院门诊工作统计报表 -->
  <div id="print">
    <template v-if="manyData.length > 0 && tableIsShow">
      <template v-for="(data, index) in manyData">
        <h1>医 院 门 诊 工 作 统 计 报 表</h1>
        <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
        <el-table :data="data"   stripe border style="width: 100%">
          <el-table-column prop="tjm7mc" label="科别" align="center"  width="120px"></el-table-column>
          <el-table-column label="总诊疗人次" align="center" width>
            <el-table-column prop="tjm7001" label="总计" align="center"  width="65px"></el-table-column>
            <el-table-column label="门诊人次" align="center"  width="60px">
              <el-table-column prop="tjm7002" label="计" align="center"  width="65px"></el-table-column>
              <el-table-column prop="tjm7003" label="专科人次" align="center"  width="65px"></el-table-column>
              <el-table-column prop="tjm7004" label="专家人次" align="center"  width="65px"></el-table-column>
            </el-table-column>
            <el-table-column label="急诊人次" align="center" width>
              <el-table-column prop="tjm7005" label="计" align="center"  width="65px"></el-table-column>
              <el-table-column prop="tjm7006" label="其中：出车" align="center"  width="65px"></el-table-column>
              <el-table-column prop="tjm7007" label="抢救人次" align="center"  width="65px"></el-table-column>
              <el-table-column prop="tjm7008" label="抢救成功人数" align="center"  width="65px"></el-table-column>
              <el-table-column prop="tjm7009" label="死亡人数" align="center"  width="65px"></el-table-column>
            </el-table-column>
            <el-table-column prop="tjm7010" label="出诊人次" align="center"  width="60px"></el-table-column>
            <el-table-column prop="tjm7033" label="赴家庭病床诊疗人次数" align="center"  width="60px"></el-table-column>
          </el-table-column>
          <el-table-column label="观察室" align="center" width>
            <el-table-column prop="tjm7011" label="收容病人数" align="center"  width="60px"></el-table-column>
            <el-table-column prop="tjm7012" label="死亡人数" align="center"  width="60px"></el-table-column>
            <el-table-column prop="tjm7013" label="病人占床日数" align="center"  width="60px"></el-table-column>
          </el-table-column>
          <el-table-column prop="tjm7014" label="健康检查人数" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7015" label="门诊手术例数" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7016" label="正副主任医师门诊人日数" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7017" label="正副主任医师门诊总工时数" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7018" label="日均正副主任医师出门诊数" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7019" label="急诊危重病人抢救成功率%" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7020" label="留观室病人平均留观日数" align="center"  width="60px"></el-table-column>
          <el-table-column prop="tjm7021" label="平均每日门诊急诊人次" align="center"  width="60px"></el-table-column>
        </el-table>
      </template>
    </template>
    <template v-else>
      <h1>医 院 门 诊 工 作 统 计 报 表</h1>
      <h3>时期：{{dataList.qs}} 至 {{dataList.zz}}</h3>
      <h2>医院名称:{{unitName}}</h2>
      <el-table :data="tableData" id="out-table" stripe border style="width: 100%">
        <el-table-column prop="tjm7mc" label="科别" align="center" width></el-table-column>
        <el-table-column label="总诊疗人次" align="center" width>
          <el-table-column prop="tjm7001" label="总计" align="center" width></el-table-column>
          <el-table-column label="门诊人次" align="center" width>
            <el-table-column prop="tjm7002" label="计" align="center" width></el-table-column>
            <el-table-column prop="tjm7003" label="专科人次" align="center" width></el-table-column>
            <el-table-column prop="tjm7004" label="专家人次" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="急诊人次" align="center" width>
            <el-table-column prop="tjm7005" label="计" align="center" width></el-table-column>
            <el-table-column prop="tjm7006" label="其中：出车" align="center" width></el-table-column>
            <el-table-column prop="tjm7007" label="抢救人次" align="center" width></el-table-column>
            <el-table-column prop="tjm7008" label="抢救成功人数" align="center" width></el-table-column>
            <el-table-column prop="tjm7009" label="死亡人数" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column prop="tjm7010" label="出诊人次" align="center" width></el-table-column>
          <el-table-column prop="tjm7033" label="赴家庭病床诊疗人次数" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column label="观察室" align="center" width>
          <el-table-column prop="tjm7011" label="收容病人数" align="center" width></el-table-column>
          <el-table-column prop="tjm7012" label="死亡人数" align="center" width></el-table-column>
          <el-table-column prop="tjm7013" label="病人占床日数" align="center" width></el-table-column>
        </el-table-column>
        <el-table-column prop="tjm7014" label="健康检查人数" align="center" width></el-table-column>
        <el-table-column prop="tjm7015" label="门诊手术例数" align="center" width></el-table-column>
        <el-table-column prop="tjm7016" label="正副主任医师门诊人日数" align="center" width></el-table-column>
        <el-table-column prop="tjm7017" label="正副主任医师门诊总工时数" align="center" width></el-table-column>
        <el-table-column prop="tjm7018" label="日均正副主任医师出门诊数" align="center" width></el-table-column>
        <el-table-column prop="tjm7019" label="急诊危重病人抢救成功率%" align="center" width></el-table-column>
        <el-table-column prop="tjm7020" label="留观室病人平均留观日数" align="center" width></el-table-column>
        <el-table-column prop="tjm7021" label="平均每日门诊急诊人次" align="center" width></el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import {zspTjm7} from '@/api';
  import XLSX from 'xlsx';
  import {reSetData } from "@/utils/index.js";
  import FileSaver from "file-saver";
export default {
  data() {
    return {
      manyData: [],
      tableIsShow: false,
      printLength: 23, // a3
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
     // this.tableData = val
    }
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      let dataList = JSON.parse(JSON.stringify(this.dataList));
      dataList['vBase'] = Number(dataList['vBase']);

      zspTjm7(dataList).then(res => {
        console.log(res);
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
    exportExcel() {
      let dataList = JSON.parse(JSON.stringify(this.dataList));
      dataList['vBase'] = Number(dataList['vBase']);
      dataList.excel = 1;
      zspTjm7(dataList).then(res => {
        console.log(res);
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
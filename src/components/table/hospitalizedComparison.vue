<template>
  <!-- 住院分科同期对比报表 -->
  <div id="print">


    <el-tabs type="border-card">
      <el-tab-pane label="住院综合统计分科同期对比报表（一）">
        <h1>住院综合统计分科同期对比报表（一）</h1>
        <h3>时期: {{dataList.qs}} ~ {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
        <el-table :data="tableDataOne" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="kbjc" label="科别" align="center" width></el-table-column>
          <el-table-column prop="nf" label="年份" align="center" width></el-table-column>
          <el-table-column prop="qmcws" label="期末实有病床" align="center" width></el-table-column>
          <el-table-column prop="qcs" label="期初原有人数" align="center" width></el-table-column>
          <el-table-column prop="z03" label="入院人数" align="center" width></el-table-column>
          <el-table-column prop="z04" label="他科转入人数" align="center" width></el-table-column>
          <el-table-column label="出院人数" align="center" width>
            <el-table-column prop="z05" label="总计" align="center" width></el-table-column>
            <el-table-column prop label="其中" align="center" width>
              <el-table-column prop="z06" label="小计" align="center" width></el-table-column>
              <el-table-column prop="z07" label="治愈" align="center" width></el-table-column>
              <el-table-column prop="z08" label="好转" align="center" width></el-table-column>
              <el-table-column prop="z09" label="未愈" align="center" width></el-table-column>
              <el-table-column prop="z10" label="死亡" align="center" width></el-table-column>
            </el-table-column>
            <el-table-column  label="其它" align="center" width>
              <el-table-column prop="tjz2011" label="小计" align="center" width></el-table-column>
              <el-table-column  label="其中：" align="center" width>
                <el-table-column prop="z12" label="正常分娩" align="center" width></el-table-column>
                <el-table-column prop="z13" label="计划生育" align="center" width></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="z15" label="转往他科人数" align="center" width></el-table-column>
          <el-table-column prop="qms" label="期末留院人数" align="center" width></el-table-column>
          <el-table-column prop="z01" label="实际开放总床日数" align="center" width></el-table-column>
          <el-table-column prop="pjkf" label="平均开放病床数" align="center" width></el-table-column>
          <el-table-column prop="z16" label="实际占用总床日数" align="center" width></el-table-column>
          <el-table-column prop="z17" label="出院者占用总床日数" align="center" width></el-table-column>
          <el-table-column prop="z19" label="陪护人日数" align="center" width></el-table-column>
          <el-table-column prop="z19" label="期内手术人数" align="center" width></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="住院综合统计分科同期对比报表（二）">
        <h1>住院综合统计分科同期对比报表（二）</h1>
        <h3>时期: {{dataList.qs}} ~ {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
        <el-table :data="tableDataTwo" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="bqmc" label="科别" align="center" width></el-table-column>
          <el-table-column prop="bqmc" label="诊断符合情况" align="center" width>
            <el-table-column  prop="tjz2022" label="门诊与出院诊断符合人数" align="center" width></el-table-column>
            <el-table-column  prop="sum" label="门诊与出院诊断不符人数" align="center" width></el-table-column>
            <el-table-column  prop="tjz2023" label="门诊诊断未明人数" align="center" width></el-table-column>
            <el-table-column  prop="tjz2025" label="入院与出院诊断符合人数" align="center" width></el-table-column>
            <el-table-column  prop="sum2" label="入院与出院诊断不符人数" align="center" width></el-table-column>
            <el-table-column  prop="tjz2026" label="入院诊断未明人数" align="center" width></el-table-column>
            <el-table-column  prop="tjz2027" label="出院诊断未明人数" align="center" width></el-table-column>
            <el-table-column  prop="tjz2028" label="入院三日确诊人数" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column label="住院手术情况" align="center" width>
            <el-table-column  prop="tjz2029" label="合计" align="center" width></el-table-column>
            <el-table-column label="其中：无菌手术" align="center" width>
              <el-table-column  prop="tjz2030" label="小计" align="center" width></el-table-column>
              <el-table-column  prop="tjz2031" label="甲级愈合" align="center" width></el-table-column>
              <el-table-column  prop="tjz2032" label="乙级愈合" align="center" width></el-table-column>
              <el-table-column  prop="tjz2033" label="丙级愈合" align="center" width></el-table-column>
            </el-table-column>
            <el-table-column label="术前后诊断符合" align="center" width>
              <el-table-column  prop="tjz2034" label="参加例数" align="center" width></el-table-column>
              <el-table-column  prop="tjz2035" label="符合例数" align="center" width></el-table-column>
              <el-table-column  prop="tjz2036" label="术前待查" align="center" width></el-table-column>
            </el-table-column>
            <el-table-column  prop="tjz2037" label="术后十日内死亡数" align="center" width></el-table-column>
            <el-table-column  prop="tjz2038" label="手术并发症发生数" align="center" width></el-table-column>
          </el-table-column>
          <el-table-column  prop="tjz2066" label="危重病人抢救次数" align="center" width></el-table-column>
          <el-table-column  prop="tjz2067" label="危重病人抢救成功次数" align="center" width></el-table-column>
          <el-table-column  prop="tjz2061" label="病房中医治疗数" align="center" width></el-table-column>
          <el-table-column  prop="tjz2062" label="病房中西结合治疗数" align="center" width></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="住院综合统计分科同期对比报表（三）">
        <h1>住院综合统计分科同期对比报表（三）</h1>
        <h3>时期: {{dataList.qs}} ~ {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
        <el-table :data="tableDataThree" id="out-table" stripe border style="width: 100%">
          <el-table-column  prop="bqmc" label="科别" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="年份" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="治愈率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="好转率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="未愈率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="病死率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="陪伴率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="bqmc" label="门诊与出院诊断符合率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="入院与出院诊断符合率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="门诊疑诊率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="入院疑诊率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="入院三日确诊率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="无菌手术甲级愈合率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="无菌手术切口感染率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="手术前后诊断符合率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="手术后十日内死亡率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="手术并发症发生率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="平均病床工作日" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="病床使用率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="病床周转次数" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="出院者平均住院日" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="危重病人抢救成功率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="病房中医治疗率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="病房中医参与治疗率%" align="center" width></el-table-column>
          <el-table-column  prop="bqmc"  label="病房中西医结合治疗率%" align="center" width></el-table-column>
          <el-table-column   prop="bqmc" label="术前平均住院天数" align="center" width></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import {compared} from '@/api';
  import XLSX from 'xlsx';
  import FileSaver from "file-saver";
export default {
  data() {
    return {
      tableData: [],
      tableDataOne: [],
      tableDataTwo: [],
      tableDataThree: [],
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
      let dataList = JSON.parse(JSON.stringify(this.dataList));
      dataList.startTime = dataList.qs;
      dataList.endTime = dataList.zz;
      compared(dataList).then(res => {
        if ( res.code === 0) {
          window.open(res.data);
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
      compared(this.dataList).then(res => {
        if ( res.code === 0) {
          this.tableDataOne = res.data ? res.data.hoBrStatisticsDOList : [];
          this.tableDataTwo = res.data ? res.data.hoBrStatisticsTwoDOList : [];
          this.tableDataThree = res.data ? res.data.hoBrStatisticsThreeDOList : [];
          console.log(this.tableData);
          if (this.tableDataOne.length === 0) {
            this.$message.error('没有数据');
          }
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
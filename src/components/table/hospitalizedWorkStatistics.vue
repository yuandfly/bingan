<template>
  <!-- 住院工作分科统计表 -->
  <span id="print">
    <el-tabs type="border-card">
      <el-tab-pane label="医院住院工作统计表（一）">
        <h1>医 院 住 院 工 作 统 计 表（一）</h1>
        <h3>时期: {{dataList.qs}} ~ {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
         <el-table :data="tableDataOne" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="tjz2mc" label="科别" align="center" width></el-table-column>
          <el-table-column prop="tjz2001" label="期末实有病床" align="center" width></el-table-column>
          <el-table-column prop="tjz2002" label="期初原有人数" align="center" width></el-table-column>
          <el-table-column prop="tjz2003" label="入院人数" align="center" width></el-table-column>
          <el-table-column prop="tjz2004" label="他科转入人数" align="center" width></el-table-column>
          <el-table-column label="出院人数" align="center" width>
            <el-table-column prop="tjz2005" label="总计" align="center" width></el-table-column>
           <el-table-column label="出院人数" align="center" width>
        <el-table-column  prop="sum" label="总计" align="center" width></el-table-column>
        <el-table-column  prop="tjz2007" label="治愈" align="center" width></el-table-column>
        <el-table-column  prop="tjz2008" label="好转" align="center" width></el-table-column>
        <el-table-column  prop="tjz2009" label="未愈" align="center" width></el-table-column>
        <el-table-column  prop="tjz2010" label="死亡" align="center" width></el-table-column>
      </el-table-column>
            <el-table-column  label="其它" align="center" width>
              <el-table-column prop="tjz2011" label="小计" align="center" width></el-table-column>
              <el-table-column  label="其中：" align="center" width>
                <el-table-column prop="tjz2012" label="正常分娩" align="center" width></el-table-column>
                <el-table-column prop="tjz2013" label="计划生育" align="center" width></el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="tjz2014" label="转往他科人数" align="center" width></el-table-column>
          <el-table-column prop="tjz2015" label="期末留院人数" align="center" width></el-table-column>
          <el-table-column prop="tjz2016" label="实际开放总床日数" align="center" width></el-table-column>
          <el-table-column prop="tjz2017" label="平均开放病床数" align="center" width></el-table-column>
          <el-table-column prop="tjz2018" label="实际占用总床日数" align="center" width></el-table-column>
          <el-table-column prop="tjz2019" label="出院者占用总床日数" align="center" width></el-table-column>
          <el-table-column prop="tjz2020" label="陪护人日数" align="center" width></el-table-column>
          <el-table-column prop="tjz2068" label="期内手术人数" align="center" width></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="医院住院工作统计表（二）">
        <h1>医 院 住 院 工 作 统 计 表（二）</h1>
        <h3>时期: {{dataList.qs}} ~ {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
        <el-table :data="tableDataTwo" id="out-table" stripe border style="width: 100%">
          <el-table-column prop="tjz2mc" label="科别" align="center" width></el-table-column>
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
      <el-tab-pane label="医院住院工作统计表（三）">
        <h1>医 院 住 院 工 作 统 计 表（三）</h1>
        <h3>时期: {{dataList.qs}} ~ {{dataList.zz}}</h3>
        <h2>医院名称:{{unitName}}</h2>
        <el-table :data="tableDataThree" id="out-table" stripe border style="width: 100%">
          <el-table-column  prop="tjz2mc" label="科别" align="center" width="60px"></el-table-column>
          <el-table-column   prop="tjz2041" label="治愈率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="tjz2042" label="好转率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="tjz2043" label="未愈率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="tjz2044" label="病死率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="tjz2045" label="陪伴率%" align="center" width="60px"></el-table-column>
          <el-table-column   prop="tjz2046" label="门诊与出院诊断符合率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2047" label="入院与出院诊断符合率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2048" label="门诊疑诊率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2049" label="入院疑诊率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2050" label="入院三日确诊率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2051" label="无菌手术甲级愈合率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2052" label="无菌手术切口感染率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2053" label="手术前后诊断符合率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2054" label="手术后十日内死亡率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2055" label="手术并发症发生率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2056" label="平均病床工作日" align="center" width></el-table-column>
          <el-table-column   prop="tjz2057" label="病床使用率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2058" label="病床周转次数" align="center" width></el-table-column>
          <el-table-column   prop="tjz2059" label="出院者平均住院日" align="center" width></el-table-column>
          <el-table-column   prop="tjz2060" label="危重病人抢救成功率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2063" label="病房中医治疗率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2064" label="病房中医参与治疗率%" align="center" width></el-table-column>
          <el-table-column  prop="tjz2069"  label="病房中西医结合治疗率%" align="center" width></el-table-column>
          <el-table-column   prop="tjz2070" label="病房西医治疗率%" align="center" width></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
 </span>

</template>

<script>
  import {hoBrStatistics} from '@/api';
export default {
  data() {
    return {
      tableDataOne: [],
      tableDataTwo: [],
      tableDataThree: [],
      startDate: '',
      endDate: '',
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
      dataList.startTime = this.dataList.qs;
      dataList.endTime = this.dataList.zz;

      if (this.dataList.bz === '21') {
        dataList.level = '11';
      } else if (this.dataList.bz === '22') {
        dataList.level = '12';
      } else if (this.dataList.bz === '23') {
        dataList.level = '13';
      }

      dataList.dataOutput = this.dataList.vBase === '1' ? 0 : 1;
      hoBrStatistics(dataList).then(res => {
        if ( res.code === 0) {
          this.tableDataOne = res.data ? res.data.hoBrStatisticsDOList : [];
          this.tableDataTwo = res.data ? res.data.hoBrStatisticsTwoDOList : [];
          this.tableDataThree = res.data ? res.data.hoBrStatisticsThreeDOList : [];
          console.log(this.tableDataOne, this.tableDataTwo, this.tableDataThree);
          if (this.tableDataOne.length === 0) {
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
      dataList.startTime = this.dataList.qs;
      dataList.endTime = this.dataList.zz;

      if (this.dataList.bz === '21') {
        dataList.level = '11';
      } else if (this.dataList.bz === '22') {
        dataList.level = '12';
      } else if (this.dataList.bz === '23') {
        dataList.level = '13';
      }
      dataList.excel = 1;
      dataList.dataOutput = this.dataList.vBase === '1' ? 0 : 1;
      hoBrStatistics(dataList).then(res => {
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
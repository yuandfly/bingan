<template>
  <!-- 传染科医疗质量信息报表 -->
  <div>
    <h1>传染科治疗控制中心医疗质量信息报表</h1>
    <h3>时期: {{startDate}} ~ {{endDate}}</h3>
    <h2>医院名称：{{unitName}}</h2>
    <h1>一 般 信 息</h1>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="f1" label="开放床位数" align="center" width></el-table-column>
      <el-table-column prop="f2" label="出院病人数" align="center" width></el-table-column>
      <el-table-column prop="f3" label="入院疑诊数" align="center" width></el-table-column>
      <el-table-column prop="f4" label="入出院诊断符合数" align="center" width></el-table-column>
      <el-table-column prop="f5" label="治愈率%" align="center" width></el-table-column>
      <el-table-column prop="f6" label="好转率%" align="center" width></el-table-column>
      <el-table-column prop="f7" label="危重病例数" align="center" width></el-table-column>
      <el-table-column prop="f8" label="危重病例抢救成功数" align="center" width></el-table-column>
      <el-table-column prop="f9" label="医院感染数" align="center" width></el-table-column>
      <el-table-column prop="f10" label="传染病报卡率%" align="center" width></el-table-column>
      <el-table-column prop="f11" label="平均住院日" align="center" width></el-table-column>
      <el-table-column prop="f12" label="住院病历甲级率%" align="center" width></el-table-column>
      <el-table-column prop="f13" label="平均住院医疗费用" align="center" width></el-table-column>
      <el-table-column prop="f14" label="药品占总费用比例" align="center" width></el-table-column>
    </el-table>
    <h1>专 业 信 息</h1>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column label="慢性乙型肝炎" align="center" width>
        <el-table-column prop="f15" label="出院病人数" align="center" width></el-table-column>
        <el-table-column prop="f16" label="平均住院日" align="center" width></el-table-column>
        <el-table-column prop="f17" label="HBV-M检测数" align="center" width></el-table-column>
        <el-table-column prop="f18" label="HBV DNA定量检测数" align="center" width></el-table-column>
        <el-table-column prop="f19" label="干扰素使用数" align="center" width></el-table-column>
        <el-table-column prop="f20" label="核苷类药物使用数" align="center" width></el-table-column>
        <el-table-column prop="f21" label="平均医药费用" align="center" width></el-table-column>
        <el-table-column prop="f22" label="药品占总费用比例" align="center" width></el-table-column>
      </el-table-column>
      <el-table-column label="重型肝炎" align="center" width>
        <el-table-column prop="f23" label="出院病人数" align="center" width></el-table-column>
        <el-table-column prop="f24" label="入出院诊断符合率" align="center" width></el-table-column>
        <el-table-column prop="f25" label="死亡数" align="center" width></el-table-column>
        <el-table-column prop="f26" label="并发症发生数" align="center" width></el-table-column>
        <el-table-column prop="f27" label="治愈数" align="center" width></el-table-column>
        <el-table-column prop="f28" label="好转数" align="center" width></el-table-column>
        <el-table-column prop="f29" label="平均住院日" align="center" width></el-table-column>
        <el-table-column prop="f30" label="院内感染发生数" align="center" width></el-table-column>
        <el-table-column prop="f31" label="平均医疗费用" align="center" width></el-table-column>
        <el-table-column prop="f32" label="药品占总费用比例" align="center" width></el-table-column>
      </el-table-column>
    </el-table>
    <h1>细 菌 性 痢 疾</h1>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="f33" label="出院病人数" align="center" width></el-table-column>
      <el-table-column prop="f34" label="大便培养检测数" align="center" width></el-table-column>
      <el-table-column prop="f35" label="大便培养阳性数" align="center" width></el-table-column>
      <el-table-column prop="f36" label="治愈数" align="center" width></el-table-column>
      <el-table-column prop="f37" label="好转数" align="center" width></el-table-column>
      <el-table-column prop label="好转率%" align="center" width></el-table-column>
      <el-table-column prop="f38" label="平均住院日" align="center" width></el-table-column>
      <el-table-column prop="f39" label="平均医药费用" align="center" width></el-table-column>
      <el-table-column prop="f40" label="药品占总费用比例" align="center" width></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { contagionDeptMedicalQuality } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

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
    this.getTableList(this.dateList.dateBegin, this.dateList.dateEnd);
  },
  props: ["dateList"],
  methods: {
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        contagionDeptMedicalQuality({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
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
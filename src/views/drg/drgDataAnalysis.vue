<template>
  <el-tabs type="border-card" id>
    <el-tab-pane label="全院drg指标">
      <drg-index-page></drg-index-page>
    </el-tab-pane>

    <el-tab-pane label="科室drg指标对比">
      <dept-data></dept-data>
    </el-tab-pane>

    <el-tab-pane label="MDC指标分析">
      <mdc-drg></mdc-drg>
    </el-tab-pane>

    <el-tab-pane label="科室工作效率分析">
      <dept-efficiency></dept-efficiency>
    </el-tab-pane>

    <el-tab-pane label="医师绩效">
      <doctor-efficiency></doctor-efficiency>
    </el-tab-pane>
    <el-tab-pane label="患者基本信息分析">
      <basicpatient-information></basicpatient-information>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import drgIndexPage from "../../components/drgPage/drgIndexPage.vue";
import deptData from "../../components/drgPage/deptCompare.vue";
import mdcDrg from "../../components/drgPage/mdcDrgData.vue";
import deptEfficiency from "../../components/drgPage/deptEfficiency.vue";
import doctorEfficiency from "../../components/drgPage/doctorEfficiency.vue";
import basicpatientInformation from "../../components/drgPage/basicpatientInformation.vue";
export default {
  components: {
    drgIndexPage,
    deptData,
    mdcDrg,
    deptEfficiency,
    doctorEfficiency,
    basicpatientInformation
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>



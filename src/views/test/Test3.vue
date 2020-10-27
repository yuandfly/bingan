<template>
  <div class="homepage clearfix">
    <div class="topside">
      <!-- <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-user-solid"></i> 医(护)师
          </span>
          <doctor :dataList="this.tableHeight"></doctor>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-s-home"></i> 住院科室
          </span>
          <department-dictionary :dataList="this.tableHeight"></department-dictionary>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-date"></i> 门急诊
          </span>
          <outpatientDepartment :dataList="this.tableHeight"></outpatientDepartment>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-view"></i> 门观科室
          </span>
          <observationRoom :dataList="this.tableHeight"></observationRoom>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-tickets"></i> 医技科室
          </span>
          <medical-laboratory :dataList="this.tableHeight" />
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-document-add"></i> 医技项目
          </span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-mouse"></i> 标准代码
          </span>
          <NationDictionary :dataList="this.tableHeight"></NationDictionary>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-map-location"></i> 诊断/地址等
          </span>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <i class="el-icon-edit"></i> 输入码
          </span>
        </el-tab-pane>
      </el-tabs>-->
      <!---->
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
        <el-form-item label="医师姓名:">
          <el-autocomplete
            class="inline-input"
            @input="findName"
            v-model="formInline.dmmc"
            :fetch-suggestions="search"
            placeholder="请输入内容"
            size="small"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addRow()">新增</el-button>
        </el-form-item>
      </el-form>-->
    </div>
    <div class="menu_bar">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/admin/system/dict/doctor">医(护)师</el-menu-item>
        <el-menu-item index="/admin/system/dict/departmentDictionary">住院科室</el-menu-item>
        <el-menu-item index="/admin/system/dict/outpatientDepartment">门急诊</el-menu-item>
        <el-menu-item index="/admin/system/dict/observationRoom">门观科室</el-menu-item>
        <el-menu-item index="/admin/system/dict/MedicalLaboratory">医技科室</el-menu-item>
        <el-menu-item index="/admin/system/dict/MedicalItem">医技项目</el-menu-item>
        <el-menu-item index="/admin/system/dict/StandardCode">标准代码</el-menu-item>
        <el-menu-item index="/admin/system/dict/diagnosisAddress">诊断/地址等</el-menu-item>
        <el-menu-item index="/admin/system/dict/InputCode">输入码</el-menu-item>
      </el-menu>
    </div>
    <component :is="$route.params.dictName" ref="child"></component>
  </div>
</template>

<script>
import doctor from "../../components/dataDictionary/doctor.vue";
import departmentDictionary from "../../components/dataDictionary/departmentDictionary.vue";
import outpatientDepartment from "../../components/dataDictionary/outpatientDepartment.vue";
import observationRoom from "../../components/dataDictionary/observationRoom.vue";
import MedicalLaboratory from "../../components/dataDictionary/MedicalLaboratory.vue";
import NationDictionary from "../../components/dataDictionary/NationDictionary.vue";
import MedicalItem from '../../components/dataDictionary/MedicalItem';
import StandardCode from '../../components/dataDictionary/StandardCode';
import diagnosisAddress from '../../components/dataDictionary/diagnosisAddress';
import InputCode from '../../components/dataDictionary/InputCode';

export default {
  components: {
    doctor,
    departmentDictionary,
    outpatientDepartment,
    observationRoom,
    MedicalLaboratory,
    NationDictionary,
    MedicalItem,
    StandardCode,
    diagnosisAddress,
    InputCode
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableHeight: 0,
      activeIndex: "/admin/system/test3/doctor",
    };
  },
  methods: {
    getHeight() {
      this.tableHeight = document.body.clientHeight - 238;
    },
    // findName() {
    //   this.$refs.child.queryAll();
    // },
    // search() {
    //   this.$refs.child.querySearch();
    // },
  },
  beforeMount() {
    this.getHeight();
  },
};
</script>

<style lang="less" scoped>
.leftside {
  border-radius: 8px;
  width: 60%;
  margin: 10px 40px 0px 18%;
  float: left;
}
.homepage {
  width: 100%;
  .topside {
    height: 10px;
    border-radius: 6px;
    background-color: #eee;
    padding-top: 10px;
    /deep/.el-input--mini .el-input__inner {
      width: 190px !important;
    }
    .el-form {
      margin-left: 50px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }
  }
}
.menu_bar {
  padding: 0 20px;
}
</style>

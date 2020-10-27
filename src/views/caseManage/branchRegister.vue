<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item label="开始日期:">
          <el-date-picker
            v-model="form.dateBegin"
            type="date"
            size="small"
            placeholder="开始日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerBegin"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期:">
          <el-date-picker
            v-model="form.dateEnd"
            type="date"
            size="small"
            placeholder="结束日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="选择科室"
          v-if="$route.params.caseManageName === 'branchOperationRegistration' || 
                $route.params.caseManageName === 'branchIllnessanAlyze' || 
                $route.params.caseManageName === 'leaveHospitalBranch'"
        >
          <el-select
            v-model="form.administrative"
            placeholder="请选择"
            size="small"
            class="administrativewidth"
            @change="selectCategory"
          >
            <el-option
              v-for="one in administrativeList"
              :key="one.dm"
              :label="one.dmmc"
              :value="one.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-radio
            v-for="(item, index) in levelList"
            v-model="form.level"
            :key="index"
            :label="index"
          >{{item}}</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component :is="$route.params.caseManageName" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { GetDepartmentDictionary } from "@/api";
import { yesterday, today } from "@/utils/index.js";

const branchOperationRegistration = () =>
  import("../../components/table/branchOperationRegistration");
const branchIllnessanAlyze = () =>
  import("../../components/table/branchIllnessanAlyze");
const leaveHospitalBranch = () =>
  import("../../components/table/leaveHospitalBranch");
const dieRegisterSurvey = () =>
  import("../../components/table/dieRegisterSurvey");
const obstetricsDepartmentRegister = () =>
  import("../../components/table/obstetricsDepartmentRegister");
const casualPatientRegister = () =>
  import("../../components/table/casualPatientRegister");

export default {
  data() {
    return {
      form: {
        dateBegin: "",
        dateEnd: "",
        administrative: "",
        administrativeName: "",
        level: 0,
      },
      // showCom: "branchOperationRegistration",
      flag: false,
      levelList: ["按病案号", "按出院日期", "按姓名"],
      administrativeList: [],
      allItem: { dm: "0000", dmmc: "全院" },
      tableList: [],
      pickerBegin: {
        disabledDate: (time) => {
          if (this.form.dateEnd) {
            return (
              time.getTime() > new Date(this.form.dateEnd).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        },
      },
      pickerEnd: {
        disabledDate: (time) => {
          if (this.form.dateBegin) {
            return (
              time.getTime() < new Date(this.form.dateBegin).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        },
      },
    };
  },
  created() {
    this.beginningDate();
    this.administrativeOfficeList();
  },
  components: {
    branchOperationRegistration,
    branchIllnessanAlyze,
    leaveHospitalBranch,
    dieRegisterSurvey,
    obstetricsDepartmentRegister,
    casualPatientRegister,
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      },
    },
  },
  methods: {
    beginningDate() {
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      }
    },
    selectCategory(val) {
      this.administrativeList.some((ele) => {
        if (ele.dm === val) {
          this.form.administrativeName = ele.dmmc;
        }
      });
    },
    administrativeOfficeList() {
      GetDepartmentDictionary({}).then((res) => {
        if (res.data.code === 0) {
          this.administrativeList = res.data.data;
          this.administrativeList.unshift(this.allItem);
          this.form.administrative = this.administrativeList[0].dm;
          this.form.administrativeName = this.administrativeList[0].dmmc;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 60px;
    border-radius: 6px;
    background-color: #eee;
    padding-top: 10px;
    // /deep/.el-input--mini .el-input__inner {
    //   width: 190px !important;
    // }
    .el-form {
      margin-left: 50px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }
  }
}
.day {
  display: flex;
  padding: 14px 0;
}
.lan {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.lan span {
  width: 100px;
  font-size: 16px;
  text-align: right;
}
.treatmentSelect {
  width: 220px;
}
.date {
  margin-top: 20px;
}
.btn_lan {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.dailywidth {
  width: 200px;
}
.administrativewidth {
  width: 110px;
}
</style>
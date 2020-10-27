<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item label="住院分科工作量">
          <el-select
            v-model="form.daily"
            placeholder="请选择"
            size="small"
            @change="selectValue"
            class="dailywidth"
          >
            <el-option
              v-for="item in branch"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="选择科室" v-if="form.daily === 111">
          <el-select
            v-model="form.administrative"
            placeholder="请选择"
            size="small"
            class="administrativewidth"
          >
            <el-option
              v-for="one in administrativeList"
              :key="one.dm"
              :label="one.dmmc"
              :value="one.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.daily === 111">
          <el-radio
            v-for="(item, index) in form.levelList"
            v-model="form.level"
            :key="index"
            :label="index"
          >{{item}}</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
          <el-button class="btn" type="primary" size="small" @click="exportCheck">下载</el-button>
          <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component :is="showCom" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { GetDepartmentDictionary } from "@/api";
import { yesterday, today } from "@/utils/index.js";

const physicianWorkloadStatistics = () =>
  import("../../components/table/physicianWorkloadStatistics1");
const inHospitalWorkload = () =>
  import("../../components/table/departmentsDoctorWorkload1");
const outpatientServiceBranch = () =>
  import("../../components/table/departmentsDoctorWorkload3");
const outpatientServicePhysician = () =>
  import("../../components/table/departmentsDoctorWorkload8");
const emergencyTreatmentWorkload = () =>
  import("../../components/table/departmentsDoctorWorkload4");
const familyHospitalBedWorkload = () =>
  import("../../components/table/departmentsDoctorWorkload6");
const medicalProjectWorkload = () =>
  import("../../components/table/departmentsDoctorWorkload7");
const medicalAdministrativeWorkload = () =>
  import("../../components/table/departmentsDoctorWorkload10");
const watchRoomWorkload = () =>
  import("../../components/table/departmentsDoctorWorkload5");
const HHBmedicalOfficeWork = () =>
  import("../../components/table/departmentsDoctorWorkload12");
const HNBmedicalOfficeWork = () =>
  import("../../components/table/departmentsDoctorWorkload13");
const LYBmedicalOfficeWork = () =>
  import("../../components/table/departmentsDoctorWorkload14");

export default {
  data() {
    return {
      form: {
        daily: 111,
        dateBegin: "",
        dateEnd: "",
        administrative: "",
        level: 0,
        levelList: ["科主任", "主任医师", "主治医师", "住院医师", "门诊医师"]
      },
      showCom: "physicianWorkloadStatistics",
      flag: false,
      branch: [
        {
          name: "physicianWorkloadStatistics",
          value: 111,
          label: "病区医师工作量统计"
        },
        {
          name: "inHospitalWorkload",
          value: 112,
          label: "住院分科工作量"
        },
        {
          name: "outpatientServiceBranch",
          value: 122,
          label: "门诊医师工作量表"
        },
        {
          name: "outpatientServicePhysician",
          value: 113,
          label: "门诊科室工作量报表"
        },
        {
          name: "emergencyTreatmentWorkload",
          value: 114,
          label: "急诊科室分科工作量"
        },
        {
          name: "watchRoomWorkload",
          value: 115,
          label: "观察室分科工作量"
        },
        {
          name: "familyHospitalBedWorkload",
          value: 116,
          label: "家庭病床分科工作量"
        },
        {
          name: "medicalProjectWorkload",
          value: 117,
          label: "医技项目工作量报表"
        },
        {
          name: "medicalAdministrativeWorkload",
          value: 118,
          label: "医技科室工作量表（BZB）"
        },
        {
          name: "HHBmedicalOfficeWork",
          value: 119,
          label: "医技科室工作量表（HHB）"
        },
        {
          name: "HNBmedicalOfficeWork",
          value: 120,
          label: "医技科室工作量表（HNB）"
        },
        {
          name: "LYBmedicalOfficeWork",
          value: 121,
          label: "医技科室工作量表（LYB）"
        }
      ],
      administrativeList: [],
      tableList: [],
      pickerBegin: {
        disabledDate: time => {
          if (this.form.dateEnd) {
            return (
              time.getTime() > new Date(this.form.dateEnd).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        }
      },
      pickerEnd: {
        disabledDate: time => {
          if (this.form.dateBegin) {
            return (
              time.getTime() < new Date(this.form.dateBegin).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        }
      }
    };
  },
  created() {
    this.beginningDate();
    this.administrativeOfficeList();
  },
  components: {
    inHospitalWorkload,
    physicianWorkloadStatistics,
    outpatientServiceBranch,
    outpatientServicePhysician,
    emergencyTreatmentWorkload,
    familyHospitalBedWorkload,
    medicalAdministrativeWorkload,
    medicalProjectWorkload,
    watchRoomWorkload,
    HHBmedicalOfficeWork,
    HNBmedicalOfficeWork,
    LYBmedicalOfficeWork
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      }
    }
  },
  methods: {
    printContext() {
      this.$refs.child.printContext();
    },
    exportCheck() {
      this.$refs.child.exportExcel();
    },
    beginningDate() {
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
    },
    selectValue(val) {
      this.form.daily = val;
      this.beginningDate();
      this.branch.some(ele => {
        if (ele.value === val) {
          this.showCom = ele.name;
        }
      });
    },
    inquire() {
        this.$refs.child.getTableList();

    },
    administrativeOfficeList() {
      GetDepartmentDictionary({}).then(res => {
        if (res.data.code === 0) {
          this.administrativeList = res.data.data;
          this.form.administrative = this.administrativeList[0].dm;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    min-height: 50px;
    border-radius: 6px;
    background-color: #eee;
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
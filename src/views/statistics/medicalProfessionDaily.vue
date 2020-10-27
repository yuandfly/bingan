<template>
  <!-- 医疗业务逐日登记表 -->
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true" ref="rulesFormRef" :rules="rulesForm">
        <el-form-item label="医疗业务逐日登记表">
          <el-select v-model="form.daily" placeholder="请选择" size="small" @change="selectValue">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期:" v-if="form.daily === 116">
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
        <el-form-item label="结束日期:" v-if="form.daily === 116">
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
        <el-form-item label="年" prop="year" v-if="form.daily != 116">
          <el-input
            v-model.number="form.year"
            placeholder="请输入年"
            size="small"
            class="administrativewidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="月" v-if="form.daily != 116">
          <el-select
            v-model="form.month"
            placeholder="请选择"
            size="small"
            class="administrativewidth"
            @change="selectMonth"
          >
            <el-option v-for="ele in monthGroup" :key="ele.dm" :label="ele.dmmc" :value="ele.dm"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科别" v-if="form.daily != 116">
          <el-select
            v-model="form.administrative"
            placeholder="请选择"
            size="small"
            class="administrativewidth"
            @change="administrativeValue"
          >
            <el-option
              v-for="one in administrativeList"
              :key="one.dm"
              :label="one.dmmc"
              :value="one.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="verifyForm">查询</el-button>
          <el-button class="btn" type="primary" size="small" @click="exportCheck">下载</el-button>
          <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component :is="showCom" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import {
  getDateRangeList,
  GetOutpatientDepartment,
  GetObservationRoom
} from "@/api";
import { showOkMsg, showErrorMsg, today, yesterday } from "@/utils/index.js";
//
const medicalTreatmentDaily = () =>
  import("../../components/table/outpatientWorkDaily");
const emergencyTreatmentWork = () =>
  import("../../components/table/emergencyTreatmentWork");
const observationRoomWork = () =>
  import("../../components/table/observationRoomWork");
const beHospitalizedWork = () =>
  import("../../components/table/beHospitalizedWork");
const familyHospitalBedWork = () =>
  import("../../components/table/familyHospitalBedWork");
const physicalExaminationWork = () =>
  import("../../components/table/physicalExaminationWork");

export default {
  data() {
    const valdityYear = (rule, value, callback) => {
      if (/^\d{4}$/.test(value) || !value) {
        callback();
      } else {
        callback(new Error("年份格式不正确！"));
      }
    };
    return {
      form: {
        daily: 111,
        month: "",
        monthName: "",
        year: 2000,
        administrative: "",
        administrativeName: "",
        dateBegin: "",
        dateEnd: ""
      },
      showCom: "medicalTreatmentDaily",
      options: [
        {
          name: "medicalTreatmentDaily",
          value: 111,
          label: "门诊工作逐日登记表"
        },
        {
          name: "emergencyTreatmentWork",
          value: 112,
          label: "急诊工作逐日登记表"
        },
        {
          name: "observationRoomWork",
          value: 113,
          label: "观察室工作逐日登记表"
        },
        {
          name: "beHospitalizedWork",
          value: 114,
          label: "住院工作逐日登记表"
        },
        {
          name: "familyHospitalBedWork",
          value: 115,
          label: "家床工作逐日登记表"
        },
        {
          name: "physicalExaminationWork",
          value: 116,
          label: "健康体检逐日登记表"
        }
      ],
      administrativeList: [],
      monthGroup: [],
      tableList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() >= Date.now();
        }
      },
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
      },
      rulesForm: {
        year: [
          {
            required: true,
            message: "请输入年份",
            trigger: ["blur", "change"]
          },
          { trigger: ["change"], validator: valdityYear }
        ]
      }
    };
  },
  created() {
    this.beginningDate();
    this.monthList();
    this.administrativeOfficeList();
  },
  components: {
    medicalTreatmentDaily,
    emergencyTreatmentWork,
    observationRoomWork,
    beHospitalizedWork,
    familyHospitalBedWork,
    physicalExaminationWork
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
      this.form.monthValue = today();
      this.form.year = today().split("-")[0];
      this.form.dateBegin = yesterday();
      this.form.dateEnd = today();
    },
    selectValue(val) {
      this.form.daily = val;
      this.beginningDate();
      this.administrativeOfficeList();
      this.options.some(ele => {
        if (ele.value === val) {
          this.showCom = ele.name;
        }
      });
    },
    selectMonth(val) {
      this.form.month = val;
      this.monthGroup.some(ele => {
        if (ele.dm === val) {
          this.form.monthName = ele.dmmc;
        }
      });
    },
    administrativeValue(val) {
      this.form.administrative = val;
      this.administrativeList.some(ele => {
        if (ele.dm === val) {
          this.form.administrativeName = ele.dmmc;
        }
      });
    },
    monthList() {
      getDateRangeList({}).then(res => {
        if (res.code === 0) {
          this.monthGroup = res.data;
          this.form.month = this.monthGroup[0].dm;
          this.form.monthName = this.monthGroup[0].dmmc;
        }
      });
    },
    administrativeOfficeList() {
      if (this.form.daily === 113) {
        this.watchRoomList();
      } else if (this.form.daily === 115) {
        this.familyBedWork();
      } else {
        this.allOfficeList();
      }
    },
    //全部科别
    allOfficeList() {
      GetOutpatientDepartment({ bz: "0" }).then(res => {
        if (res.data.code === 0) {
          this.administrativeList = res.data.data;
          let item = {};
          item.dm = "0000";
          item.dmmc = "全院";
          this.administrativeList.unshift(item);
          this.form.administrative = this.administrativeList[0].dm;
          this.form.administrativeName = this.administrativeList[0].dmmc;
        }
      });
    },
    //观察室科室下拉选
    watchRoomList() {
      GetObservationRoom({}).then(res => {
        if (res.data.code === 0) {
          this.administrativeList = res.data.data;
          let item = {};
          item.dm = "0000";
          item.dmmc = "全院";
          this.administrativeList.unshift(item);
          this.form.administrative = this.administrativeList[0].dm;
          this.form.administrativeName = this.administrativeList[0].dmmc;
        }
      });
    },
    //家床工作科室下拉选
    familyBedWork() {},
    verifyForm() {
      this.$refs.rulesFormRef.validate(val => {
        if (val) {
          this.inquire();
        } else {
          showErrorMsg("请正确填写年份");
        }
      });
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 50px;
    border-radius: 6px;
    background-color: #eee;
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
.administrativewidth {
  width: 117px;
}
</style>
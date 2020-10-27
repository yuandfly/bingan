<template>
  <!-- 医疗业务逐日登记表 -->
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
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
        <el-form-item label="年度:">
          <el-date-picker
            v-model="form.dateBegin"
            type="year"
            size="small"
            placeholder="开始日期"
            format="yyyy 年"
            value-format="yyyy"
            :picker-options="pickerBegin"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="~" v-if="form.daily != 111 && form.daily != 114">
          <el-date-picker
            v-model="form.dateEnd"
            type="year"
            size="small"
            placeholder="结束日期"
            format="yyyy 年"
            value-format="yyyy"
            :picker-options="pickerEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="科别" v-if="form.daily != 111 && form.daily != 112">
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
import { GetOutpatientDepartment, GetObservationRoom } from "@/api";
import { showOkMsg, showErrorMsg, today } from "@/utils/index.js";

const physicalExaminationStatistics = () =>
  import("../../components/table/physicalExaminationStatistics");
const familyHospitalBedBill = () =>
  import("../../components/table/familyHospitalBedBill");
const outpatientStatistics = () =>
  import("../../components/table/outpatientStatistics");
const administrativeOfficeWorkload = () =>
  import("../../components/table/administrativeOfficeWorkload");
const inHospitalWork = () => import("../../components/table/inHospitalWork4");

export default {
  data() {
    return {
      form: {
        daily: 111,
        administrative: "",
        dateBegin: "",
        dateEnd: ""
      },
      showCom: "physicalExaminationStatistics",
      options: [
        {
          name: "physicalExaminationStatistics",
          value: 111,
          label: "健康体检全年台账"
        },
        {
          name: "familyHospitalBedBill",
          value: 112,
          label: "家庭病床工作台账"
        },
        {
          name: "outpatientStatistics",
          value: 113,
          label: "门诊工作统计台账"
        },
        {
          name: "administrativeOfficeWorkload",
          value: 114,
          label: "医技科室工作量台账"
        },
        {
          name: "inHospitalWork",
          value: 115,
          label: "住院工作统计台账"
        }
      ],
      administrativeList: [],
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
      }
    };
  },
  created() {
    this.beginningDate();
    this.administrativeOfficeList();
  },
  components: {
    physicalExaminationStatistics,
    familyHospitalBedBill,
    outpatientStatistics,
    administrativeOfficeWorkload,
    inHospitalWork
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
      this.form.dateBegin = today().split("-")[0];
      this.form.dateEnd = today().split("-")[0];
    },
    selectValue(val) {
      this.form.daily = val;
      this.beginningDate();
      this.options.some(ele => {
        if (ele.value === val) {
          this.showCom = ele.name;
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
    administrativeOfficeList() {
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
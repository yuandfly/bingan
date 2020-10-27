<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true" ref="rulesFormRef" :rules="rulesForm">
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
        <el-form-item label="选择科室" v-if="selectFlag">
          <el-select
            v-model="form.administrative"
            placeholder="请选择"
            size="mini"
            @change="selectValue"
          >
            <el-option
              v-for="one in administrativeList"
              :key="one.dm"
              :label="one.dmmc"
              :value="one.dm"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="输出前位数:" prop="num" v-if="constituteFlag">
          <el-input v-model="form.num" size="small" placeholder="位数" class="numInput"></el-input>
        </el-form-item>
        <el-form-item v-if="constituteFlag">
          <el-radio v-model="form.grade" label="0">按主病构成输出</el-radio>
          <el-radio v-model="form.grade" label="1">按中医主证构成输出</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>

          <el-button class="btn" type="primary" size="small" @click="exportCheck">下载</el-button>
          <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
        </el-form-item>
      </el-form>
    </div>
    <component :is="$route.params.comName" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { GetDepartmentDictionary } from "@/api";
import { yesterday, today, showErrorMsg } from "@/utils/index.js";
//
const traditionalChineseMedicineClassify = () =>
  import("../../components/table/traditionalChineseMedicineClassify1");
const diagnoseQualityClassify = () =>
  import("../../components/table/diagnoseQualityClassify");
const chineseWesternMedicineContrast = () =>
  import("../../components/table/chineseWesternMedicineContrast1");
const traditionalChineseMedicineQualityControlNurse = () =>
  import(
    "../../components/table/traditionalChineseMedicineQualityControlNurse"
  );
const emphasisClinicStatistics = () =>
  import("../../components/table/emphasisClinicStatistics");
const traditionalChineseMedicineQualityControl = () =>
  import("../../components/table/traditionalChineseMedicineQualityControl");
const illnessIndexes = () => import("../../components/table/illnessIndexes");
const illnessCategoryOrderStatistics = () =>
  import("../../components/table/illnessCategoryOrderStatistics");

export default {
  data() {
    const valdityNum = (rule, value, callback) => {
      if (/(^[0-9]\d*$)/.test(value) || !value) {
        callback();
      } else {
        callback(new Error("请输入非负整数！"));
      }
    };
    return {
      form: {
        dateBegin: "",
        dateEnd: "",
        administrative: "",
        officeLable: "",
        num: 0,
        grade: "0",
      },
      flag: false,
      selectFlag: false,
      constituteFlag: false,
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
      rulesForm: {
        num: [{ trigger: ["change"], validator: valdityNum }],
      },
    };
  },
  created() {
    this.beginningDate();
    this.administrativeOfficeList();
  },
  components: {
    traditionalChineseMedicineClassify,
    diagnoseQualityClassify,
    chineseWesternMedicineContrast,
    traditionalChineseMedicineQualityControlNurse,
    emphasisClinicStatistics,
    traditionalChineseMedicineQualityControl,
    illnessIndexes,
    illnessCategoryOrderStatistics,
  },
  watch: {
    "$route.params.comName"(val) {
      if (
        val === "chineseWesternMedicineContrast" ||
        val === "emphasisClinicStatistics"
      ) {
        this.selectFlag = true;
      } else {
        this.selectFlag = false;
      }
      if (val === "illnessCategoryOrderStatistics") {
        this.constituteFlag = true;
      } else {
        this.constituteFlag = false;
      }
    },
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      },
    },
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
      this.administrativeList.some((ele) => {
        if (ele.dm === val) {
          this.form.officeLable = ele.dmmc;
        }
      });
    },
    administrativeOfficeList() {
      GetDepartmentDictionary({}).then((res) => {
        if (res.data.code === 0) {
          this.administrativeList = res.data.data;
          this.form.administrative = res.data.data[0].dm;
          this.form.officeLable = res.data.data[0].dmmc;
        }
      });
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      }
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
.numInput {
  width: 90px;
}
</style>
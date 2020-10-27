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
        <el-form-item
          label="疾病名称:"
          prop="illName"
          v-if="$route.params.caseManageName === 'illnessClassifyIndexes' || 
          $route.params.caseManageName === 'illnessMinorIndexes' ||
          $route.params.caseManageName === 'dieIndexes'"
        >
          <el-input
            :value="form.illName"
            placeholder="请输入空格键"
            size="small"
            @keyup.native.space="handleOpenDictInput"
            @keydown.native.115="clearDictInputValue"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手术名称:"
          prop="illName"
          v-if=" $route.params.caseManageName === 'operationIndexes' ">
          <el-input
            :value="form.illName"
            placeholder="请输入空格键"
            size="small"
            @keyup.native.space="handleOpenDictInput"
            @keydown.native.115="clearDictInputValue"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="姓氏："
          v-if="$route.params.caseManageName === 'nameIndexes' || $route.params.caseManageName === 'patientNameIndexes'"
        >
          <el-input v-model="form.illName" placeholder size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group
                  v-model="form.pagingCode"
                  ref="state"
                  v-if="$route.params.caseManageName !== 'nameIndexes'"
          >
            <el-radio label="1">分页</el-radio>
            <el-radio label="2">不分页</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
          <el-button class="btn" type="primary" size="small" @click="printContext">打印</el-button>
        </el-form-item>
      </el-form>
    </div>

    <DictInput
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />
    <component :is="$route.params.caseManageName" :dateList="this.form" ref="child"></component>
  </div>
</template>

<script>
import { yesterday, today } from "@/utils/index.js";
import { UnionSearch } from "../../api/groupSearch";
import DictInput from "../../components/dialog/dict-input";

const illnessClassifyIndexes = () =>
  import("../../components/table/illnessClassifyIndexes");
const illnessMinorIndexes = () =>
  import("../../components/table/illnessMinorIndexes");
const operationIndexes = () =>
  import("../../components/table/operationIndexes");
const complicationIndexes = () =>
  import("../../components/table/complicationIndexes");
const dieIndexes = () => import("../../components/table/dieIndexes");
const nameIndexes = () => import("../../components/table/nameIndexes");
const patientNameIndexes = () =>
  import("../../components/table/patientNameIndexes");
const leaveHospitalStatistics = () =>
  import("../../components/table/leaveHospitalStatistics");
const tumourIndex = () =>
  import("../../components/table/tumourIndex");

export default {
  data() {
    const valdityIllName = (rule, value, callback) => {
      if ((value = "")) {
        callback();
      } else {
        // callback(new Error("请单击空格查找疾病名称！"));
        this.form.illName = this.form.illName + "";
      }
    };
    return {
      form: {
        dateBegin: "",
        dateEnd: "",
        illName: "",
        illCode: "0",
        pagingCode: "1",
      },
      paging: true,
      flag: false,
      tableList: [],
      filterVisible: false,
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
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
        illName: [
          {
            required: true,
            message: "请单击空格查找疾病名称",
            trigger: ["blur", "change"],
            validator: valdityIllName,
          },
        ],
      },
    };
  },
  created() {
    this.beginningDate();
  },
  components: {
    DictInput,
    illnessClassifyIndexes,
    illnessMinorIndexes,
    operationIndexes,
    complicationIndexes,
    dieIndexes,
    nameIndexes,
    patientNameIndexes,
    leaveHospitalStatistics,
    tumourIndex
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      },
    },
    "$route.params.caseManageName"() {
      this.form.illName = "";
    },
  },
  methods: {
    printContext() {
      this.$refs.child.printContext();
    },
    indexPaging(val) {
      this.form.pagingCode = Number(val);

    },
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
    /**
     *
     */
    groupParams() {
      const params = {};
     // console.log(this.filterValues, "kl");
      for (let item in this.filterValues) {
        // 只检索手术 中医治疗 有输血 三个checkbox
        if (item === "baza53" || item === "baf617" || item === "baza57") {
          if (this.filterValues[item] !== undefined)
            params[item] = this.filterValues[item] ? "1" : "0";
        } else if (this.filterValues[item]) {
          params[item] = this.filterValues[item];
        }
      }
      return params;
    },

    /**
     * 获取列表的主方法
     * @param pager 分页信息
     */
    getData(pager) {
      // 组合筛选项
      const pagination = pager || this.pager;
      const params = {
        page: pagination.page,
        limit: pagination.rows,
        ...this.groupParams(),
      };
      // console.log(params, 'params');
      if (Object.keys(params).length > 2) {
        if (this.validate()) {
          this.loading = true;
          UnionSearch(params)
            .then((res) => {
              if (res && res.data) {
                this.tableData = res.data.content;
                this.currentInfo = res.data.content[0]
                  ? res.data.content[0]
                  : {};
                this.pager = { ...pagination, total: res.data.total };
                this.filterVisible = false;
                this.resultVisible = true;
              } else {
                this.$message.error(res && res.msg ? res.msg : "查询失败");
              }
              this.loading = false;
            })
            .catch((err) => {
              this.$message.error("查询失败");
              this.loading = false;
            });
        }
      } else {
        this.$message.error("请选择查询条件");
      }
    },

    // 打开代码录入
    handleOpenDictInput(item) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: "westernDiagnoseDict",
        // extraParams: item.dictExtraParams,
        currentOpener: { name, dictField },
      };
    },

    // 代码录入提交
    handleDictInputSubmit(row) {
      this.form.illName = row.dmmc;
      this.form.illCode = row.dm;
    },

    // 去往首页编辑
    toHomePage(baza00) {
      this.setSearchInfo({
        baza00,
        groupSearchCondition: this.groupParams(),
        searchData: {
          tableData: this.tableData.slice(),
          pager: { ...this.pager },
        },
      });
      // this.$store.commit('homepage/changeBaza00', baza00)
      this.$router.push({ path: "/admin/homepage/index" });
    },

    // f4 清除科别的选择
    clearDictInputValue() {


        this.form.illCode = "";
        this.form.illName = "";

    },

    //
  },
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    min-height: 60px;
    border-radius: 6px;
    background-color: #eee;
    padding-top: 10px;
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
</style>
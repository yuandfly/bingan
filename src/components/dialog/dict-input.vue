<template>
  <el-dialog
    title="代码录入窗口"
    class="dict-dialog"
    :visible="visible"
    :append-to-body="appendToBody || false"
    width="800px"
    top="50px"
    v-dialogDrag
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <div style="overflow: hidden">
      <el-form :model="filters" :inline="true">
        <el-form-item label="代码" v-if="currentFilterType === 'dm'">
          <el-input
            ref="dmInput"
            size="small"
            placeholder="请输入代码"
            v-model="filters.dm"
            @input="handleSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="拼音码" v-if="currentFilterType === 'pym'">
          <el-input
            ref="pymInput"
            size="small"
            placeholder="请输入拼音码"
            v-model="filters.pym"
            @input="handleSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="五笔码" v-if="currentFilterType === 'wbm'">
          <el-input
            ref="wbmInput"
            size="small"
            placeholder="请输入五笔码"
            v-model="filters.wbm"
            @input="handleSearch"
          ></el-input>
        </el-form-item>
        <el-form-item label="YB码" v-if="currentFilterType === 'ybm'">
          <el-input
            ref="ybmInput"
            size="small"
            placeholder="请输入YB码"
            v-model="filters.ybm"
            @input="handleSearch"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="ICD10"
          v-if="currentFilterType === 'icd10' && dictType === 'westernDiagnoseDict'"
        >
          <el-input
            ref="icd10Input"
            size="small"
            placeholder="请输入ICD10编码"
            v-model="filters.icd10"
            @input="handleSearch"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="ICCM"
          v-if="currentFilterType === 'iccm' && dictType === 'operationDict'"
        >
          <el-input
            ref="iccmInput"
            size="small"
            placeholder="请输入手术编码"
            v-model="filters.iccm"
            @input="handleSearch"
          ></el-input>
        </el-form-item>

        <el-form-item label="名称">
          <el-input size="small" placeholder="请输入名称" v-model="filters.dmmc" @input="handleSearch"></el-input>
        </el-form-item>
      </el-form>
      <div class="table-box">
        <el-table
          border
          highlight-current-row
          row-key="dm"
          v-loading="loading"
          :data="tableData"
          size="small"
          :current-row-key="currentRowKey"
          :max-height="tableMaxHeight"
          @row-click="handleRowClick"
          @row-dblclick="handleSubmit"
        >
          <el-table-column
            :prop="currentFilterType"
            :label="keyCodeLabel[currentFilterType]"
            align="center"
            width="150"
          ></el-table-column>
          <el-table-column prop="dmmc" label="名称" align="center"></el-table-column>
          <el-table-column
            v-if=" dictType === 'westernDiagnoseDict' "
            prop="icd10"
            label="ICD10"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column
            v-if=" dictType === 'westernDiagnoseDict' "
            prop="fjm"
            label="附码"
            align="center"
            width="100"
          ></el-table-column>
        </el-table>
      </div>
      <paging-toolbar
        v-if="pager.total > 0"
        style="margin-top: 10px; float: right"
        :pager="pager"
        @change="getData({})"
      />
    </div>

    <span slot="footer" class="dialog-footer">
      <span class="key-desc">
        <span>f2: 代码</span>
        <el-divider direction="vertical"></el-divider>
        <span>f3: 拼音</span>
        <el-divider direction="vertical"></el-divider>
        <span>f4: 五笔</span>
        <el-divider direction="vertical"></el-divider>
        <span>f5: {{dictType === 'westernDiagnoseDict' ? 'ICD10' : (dictType === 'operationDict' ? 'ICCM' : 'YB码')}}</span>
      </span>
      <el-button size="small" @click="handleClose">取 消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  GetAnesthesiaDict,
  GetOperationDict,
  GetWesternDiagnoseDict,
  GetChineseDiagnoseDict,
  GetTCM_Disease,
  GetDistrictDict,
  GetOccupation,
  GetDepartment,
  GetNationality,
  GetNation,
  GetDoctor,
  GetConditionDict,
  GetConditionValueDict,
  GetGb29ListDict,
  GetInpatientArea,
  GetGb48ListDict,
  GetAllergicDrugs,
  GetAllergen,
  outpatientDeptSelect,
  GetMedicalLaboratory,
  GetObservationRoom,
  GetDateRangeList,
  getGb51List,
  getGb50List,
  GetMedicalSubjects,
  GetDepartmentStatistics,
  GetMedicalProjectFile
} from "../../api/dictionary";

import { clearBlankParam } from "../../utils";
import PagingToolbar from "../toolbar/paging.vue";
// type对应的api方法
const typeAPI = {
  westernDiagnoseDict: GetWesternDiagnoseDict, // 西医疾病编码字典
  chineseDiagnoseDict: GetTCM_Disease, // 中医疾病编码字典
  anesthesiaDict: GetAnesthesiaDict, // 麻醉方式
  operationDict: GetOperationDict, // 手术操作编码
  districtDict: GetDistrictDict, // 区域行政规划
  occupationDict: GetOccupation, // 职业
  departmentDict: GetDepartment, // 科室(住院，入院、出院科室)
  doctorDict: GetDoctor, // 医师
  nationalityDict: GetNationality, // 国籍
  nationDict: GetNation, // 民族
  conditionDict: GetConditionDict, // 随机查询的条件项字典
  conditionValueDict: GetConditionValueDict, // 随机查询的条件项的值字典
  gb29Dict: GetGb29ListDict, // 损伤、中毒的外部原因， 特殊检查、治疗项目代码表接口
  gb48Dict: GetGb48ListDict, // 病理诊断
  inpatientAreaDict: GetInpatientArea, // 住院病区、病室
  allergicDrugsDict: GetAllergicDrugs, // 过敏药物
  AllergenDict: GetAllergen, // 过敏源
  DateRangeDict: GetDateRangeList, // 门诊、住院时间范围
  economicsDict: getGb51List, //经济类型
  sanitationDict: getGb50List, //卫生机构类别
  medicalSubjects: GetMedicalSubjects, //科目
  departmentStatistics: GetDepartmentStatistics, //归统
  // DateRangeDict: GetDateRangeList, // 门诊、住院时间范围
  outpatientDeptDict: outpatientDeptSelect, // 删除日志 门诊
  GetMedicalLaboratoryDict: GetMedicalLaboratory, // 删除日志 医技
  GetObservationRoomDict: GetObservationRoom, // 删除日志 观察
  GetMedicalProjectFile: GetMedicalProjectFile, // 统计归口

};
let timeOut = undefined;
export default {
  name: "code-input",
  components: { PagingToolbar },
  props: {
    // ['appendToBody', 'visible', 'dictType']
    appendToBody: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
      required: true,
    },
    dictType: {
      type: String,
      validator: function (value) {
        return Object.keys(typeAPI).indexOf(value) >= 0;
      },
    },
    // 额外的参数
    extraParams: {
      type: Object,
      default: undefined,
      required: false,
    },
  },
  created() {
    window.addEventListener("keydown", this.handleKeyDown);
  },
  data() {
    return {
      loading: false,
      keyCodeName: {
        113: "dm",
        114: "pym",
        115: "wbm",
        116: {
          westernDiagnoseDict: "icd10",
          operationDict: "iccm",
          other: "ymb",
        },
      }, // f2到f5按键对应的筛选字段
      keyCodeLabel: {
        dm: "代码",
        pym: "拼音码",
        wbm: "五笔码",
        ybm: "YB码",
        icd10: "ICD10",
        iccm: "手术编号",
      }, // // 筛选字段对应名称
      currentRowKey: undefined,
      tableData: [],
      currentFilterType: "pym",
      filters: {
        dm: undefined,
        pym: undefined,
        wbm: undefined,
        ybm: undefined,
        dmmc: undefined,
      },
      pager: { page: 1, rows: 30, total: 0 },
    };
  },

  computed: {
    tableMaxHeight() {
      const clientH = window.document.documentElement.clientHeight;
      return clientH - 400 > 300 ? clientH - 400 + "px" : "300px";
    },
  },

  watch: {
    dictType: function (newType, oldType) {
      this.currentFilterType = "pym";
    },
    visible: function (newVisible) {
      newVisible && this.initData(this.dictType);
    },
  },

  destroyed() {
    window.removeEventListener("keydown", this.handleKeyDown);
  },

  methods: {
    initData(newType) {
      // 先置空
      this.currentRowKey = undefined;
      this.filters = {};
      this.pager = { page: 1, rows: 30, total: 0 };
      this.tableData = [];
      // 重新获取
      this.getData({
        dictType: newType,
        pager: { page: 1, rows: 30 },
        filters: {},
      });
      // 获取焦点
      this.$nextTick(function () {
        this.$refs[this.currentFilterType + "Input"].focus();
      });
    },

    getData({
      dictType = this.dictType,
      pager = this.pager,
      filters = this.filters,
    }) {
      if (typeAPI[dictType]) {
        let filter = JSON.parse(JSON.stringify(filters));
        // 病理诊断字典 如果 西医诊断里icd10 包含c00 - c99 d00 - d18的 查询时 添加斜杠 /
        if (this.extraParams && this.extraParams.blzdTag) {
          let icd10 = filter.icd10 ? filter.icd10 : '';
          filter.icd10 = '/' + icd10;
        }


        const params = clearBlankParam({
          ...pager,
          limit: pager.rows,
          ...filter,
          ...this.extraParams,
        });
        this.loading = true;
        console.log(this.extraParams);
        typeAPI[dictType](params)
          .then((res) => {
            this.loading = false;
            console.log(res.data);
            if (res && res.data) {
              if (Array.isArray(res.data)) {
                // 表格以dm为key
                const tableData = res.data.map((item) => ({
                  ...item,
                  dm: item.dm || item.code,
                }));
                this.tableData = tableData;
                this.currentRowKey = tableData[0] ? tableData[0].dm : undefined;
              } else {
                console.log(res);
                const tableData = res.data.content.map((item) => ({
                  ...item,
                  dm: item.dm || item.code,
                }));
                this.tableData = tableData;
                this.currentRowKey = tableData[0] ? tableData[0].dm : undefined;
                this.pager = {
                  page: params.page,
                  rows: params.rows,
                  total: res.data.total,
                };
              }
            } else {
              this.$message.error(res && res.msg ? res.msg : "字典查询失败");
            }
          })
          .catch((err) => {
            this.loading = false;
            this.$message({ type: "info", message: "字典查询失败" });
          });
      }
    },

    handleSearch() {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        this.getData({
          pager: { page: 1, rows: this.pager.rows },
          filters: this.filters,
        });
      }, 200);
    },

    handleRowClick(row) {
      this.currentRowKey = row.dm;
    },

    handleSubmit() {
      const { tableData, currentRowKey } = this;
      const index = tableData.findIndex((item) => item.dm === currentRowKey);
      console.log(tableData[index]);
      if (index >= 0) {
        this.$emit("submit", tableData[index]);
        this.handleClose();
      } else {
        this.$message.error("未选择字典项");
      }
    },

    handleClose() {
      this.$emit("update:visible", false);
    },
    getOffsetTop(el) {
      // console.log(el, el.offsetTop);
      if (el.offsetParent) return this.getOffsetTop(el.offsetParent) + el.offsetTop;
      return el.offsetTop
    },
    handleKeyDown(e) {
      const { tableData, currentRowKey } = this;
      if (this.visible) {
        switch (e.keyCode) {
          case 13: // enter
            // 当enter事件的target不是input时，提交。（分页器里的页码框enter事件不响应提交）
            e.target.type !== "number" && this.handleSubmit();
            break;
          case 38: // 上


            console.log(this, tableData);
            // 当前选择的索引
            const indexUp = tableData.findIndex(
                    (item) => item.dm === currentRowKey
            );
            // 下一个需要选中状态的行索引
            let nextIndexUp = 0;
            if (indexUp >= 0) {
              // 按上键，当前index为0时，需选中最后一项，否则取上一项
                nextIndexUp = indexUp === 0 ? tableData.length - 1 : indexUp - 1;

            }
            // 设置当前选中行的key
            this.currentRowKey = tableData[nextIndexUp]
                    ? tableData[nextIndexUp].dm
                    : undefined;

            let parentBoxUp = document.querySelector('.table-box .el-table__body-wrapper');
            let elBoxUp = document.querySelector('.table-box .el-table__body-wrapper .current-row');

            // 滚到目标元素上方100px处
            if (parentBoxUp.scrollTop > 0) {
              parentBoxUp.scrollTop =  parentBoxUp.scrollTop - 30;
            }
            console.log(parentBoxUp);
            break;
          case 40: // 下
            // 当前选择的索引
            const index = tableData.findIndex(
              (item) => item.dm === currentRowKey
            );
            // 下一个需要选中状态的行索引
            let nextIndex = 0;
            if (index >= 0) {
              // 按上键，当前index为0时，需选中最后一项，否则取上一项
              if (e.keyCode === 38)
                nextIndex = index === 0 ? tableData.length - 1 : index - 1;
              // 按下键，当前index为最后时，需选中第一项，否则取下一项
              else nextIndex = index === tableData.length - 1 ? 0 : index + 1;
            }
            // 设置当前选中行的key
            this.currentRowKey = tableData[nextIndex]
              ? tableData[nextIndex].dm
              : undefined;

            console.log(this.currentRowKey);
            let parentBox = document.querySelector('.table-box .el-table__body-wrapper');
            let elBox = document.querySelector('.table-box .el-table__body-wrapper .current-row');
            const boxOffsetTop = this.getOffsetTop(elBox);

              // 滚到目标元素上方100px处
            if (parentBox.scrollTop < 851) {
              parentBox.scrollTop =  parentBox.scrollTop + 30;
            }

            break;
          case 113: //  f2 代码
          case 114: // f3 拼音
          case 115: // f4 五笔
          case 116: // f5 YB码/icd10/iccm
            e.preventDefault();
            e.stopPropagation();
            e.returnValue = false;
            if (e.keyCode === 116) {
              this.currentFilterType =
                this.keyCodeName[e.keyCode][this.dictType] || "ybm";
            } else {
              this.currentFilterType = this.keyCodeName[e.keyCode];
            }
            this.filters = {
              [this.currentFilterType]: undefined,
              dmmc: this.filters.dmmc,
            };
            // 获取焦点
            this.$nextTick(function () {
              this.$refs[this.currentFilterType + "Input"].focus();
            });
          default:
            break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.dict-dialog {
  /deep/ .el-dialog__body {
    padding: 10px 20px 0;
  }
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
}
.table-box {
  /deep/ tr.current-row > td {
    background: rgb(121, 187, 255);
  }
}
.key-desc {
  float: left;
  line-height: 40px;
  font-size: 14px;
  color: #3c3c3c;
}
</style>


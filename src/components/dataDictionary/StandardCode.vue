<!--标准代码-->
<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium"  >
      <div class="dict_lan">
        <el-form-item label="选择标准表">
          <el-select v-model="Keshi" @change="handleTable"  size="small" style="width: 240px;">
            <el-option v-for="item in KeshiList" :label="item.value" :value="item.id" :key="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代码名称">
          <el-input
                  class="inline-input"
                  @input="queryAll()"
                  v-model="formInline.dmmc"
                  placeholder="请输入内容"
                  size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addMedical">新增</el-button>
        </el-form-item>
      </div>


      <div style="padding: 20px;">
        <el-table :data="tableData" class="table" border :height="dataList">
          <el-table-column prop="dm" label="代码" width="80">
            <template slot-scope="scope">
            {{scope.row.dm}}
            </template>
          </el-table-column>
          <el-table-column prop="dmmc" label="代码名称">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.dmmc" size="small" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="pym" label="拼音码">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.pym" size="small" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="wbm" label="五笔码">
            <template slot-scope="scope">
              <el-input v-model.trim="scope.row.wbm" size="small" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="bz" label="是否停用">
            <template slot-scope="scope">
              <el-switch
                      v-model="scope.row.bz"
                      active-value="0"
                      inactive-value="1"
                      active-text="启"
                      inactive-text="停"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="update(scope.row)" type="primary">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding: 20px;text-align: center;" v-if="total">
          <el-pagination style="float:right;"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"
                         :current-page.sync="nowPage"
                         :page-size="pageSizes"
                         @current-change="onChangePage"
                         :background="true">
          </el-pagination>
        </div>
      </div>
    </el-form>
    <StandardCodeBox ref="child" :id="Keshi" @fun="queryAll"></StandardCodeBox>
    <DictInput
            :visible.sync="dictInputDialog.visible"
            :dictType="dictInputDialog.dictType"
            :extraParams="dictInputDialog.extraParams"
            @submit="handleDictInputSubmit"
            :appendToBody="true"
    />
  </section>
</template>

<script>
import {
  GetMedicalItem, updateMedicalItem, deleteMedicalItem,
  GetNationDictionary,
  UpdateNationDictionary,
  DeleteNationDictionary,
  InsertNationDictionary,
  GetDistrict,
  UpdateDistrict,
  DeleteDistrict,
  InsertDistrict,
  GetTCM_Disease,
  UpdateTCM_Disease,
  DeleteTCM_Disease,
  InsertTCM_Disease,
  UpdateMedicalSubjects,
  InsertMedicalSubjects,
  DeleteMedicalSubjects,
  GetMedicalSubjects,
  GetAllergyDrugs,
  UpdateAllergyDrugs,
  InsertAllergyDrugs,
  DeleteAllergyDrugs,
  GetAnesthesia,
  UpdateAnesthesia,
  DeleteAnesthesia,
  InsertAnesthesia,
  GetKeyDiagnosis,
  UpdateKeyDiagnosis,
  GetFetalPosition,
  UpdateFetalPosition,
  DeleteFetalPosition,
  InsertFetalPosition,
  InsertKeyDiagnosis,
  DeleteKeyDiagnosis,
  UpdateDepartmentStatistics,
  DeleteDepartmentStatistics,
  GetDepartmentStatistics,
  InsertDepartmentStatistics,
  GetOutpatientDepartmentStatistics,
  DeleteOutpatientDepartmentStatistics,
  InsertOutpatientDepartmentStatistics,
  UpdateOutpatientDepartmentStatistics,
  GetInpatientDepartmentStatistics,
  UpdateInpatientDepartmentStatistics,
  DeleteInpatientDepartmentStatistics,
  InsertInpatientDepartmentStatistics,
  GetStreet,
  UpdateStreet,
  DeleteStreet,
  InsertStreet
} from "@/api";
import departmentDictionary from "../../components/dialog/departmentdictionary";
import PagingToolbar from "../../components/toolbar/paging";
import MedicalSubjects from "../../components/dialog/medicalSubjects";
import MedicalLaboratoryBox from './MedicalLaboratoryBox';
import DictInput from "../../components/dialog/dict-input";
import {GetMedicalLaboratory} from '../../api/dictionary';
import MedicalItemBox from './MedicalItemBox';
import StandardCodeBox from './StandardCodeBox';
export default {
  components: {
    StandardCodeBox,
    DictInput,
    MedicalSubjects,
    MedicalLaboratoryBox,
    MedicalItemBox,
    "department-dictionary": departmentDictionary,
  },
  data() {
    return {
      pageSizes: 10,
      nowPage: 1,
      total: 0,
      show1: false,
      index: 0,
      restaurants: [],
      formInline: {
        user: "",
        region: "",
      },
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      tableData: [],
      currentData: [],
      KeshiList: [
        {value: '民族代码表', id: 1},
        {value: '行政区划代码表', id: 2},
        {value: '中医病、证代码表', id: 3},
        {value: '诊疗科目代码表', id: 4},
        {value: '过敏药物代码表', id: 5},
        {value: '麻醉方法代码表', id: 6},
        {value: '重点医技诊断代码表', id: 7},
        {value: '生产胎方位代码表', id: 8},
        {value: '上报科室统计归口代码表', id: 9},
        {value: '门诊科室统计分类代码表', id: 10},
        {value: '住院科室统计分类代码表', id: 11},
        {value: '街道/乡镇名称代码表', id: 12},
      ],
      Keshi: 1
    };
  },
  props: ["dataList"],
  methods: {
    queryAll(condition) {
      let getItem = new Function();
      this.formInline.limit = this.pageSizes;
      this.formInline.page = this.nowPage;
      console.log(this.Keshi);
      switch (this.Keshi) {
        case 1: getItem = GetNationDictionary(this.formInline);break;
        case 2: getItem = GetDistrict(this.formInline);break;
        case 3: getItem = GetTCM_Disease(this.formInline);break;
        case 4: getItem = GetMedicalSubjects(this.formInline);break;
        case 5: getItem = GetAllergyDrugs(this.formInline);break;
        case 6: getItem = GetAnesthesia(this.formInline);break;
        case 7: getItem = GetKeyDiagnosis(this.formInline);break;
        case 8: getItem = GetFetalPosition(this.formInline);break;
        case 9: getItem = GetDepartmentStatistics(this.formInline);break;
        case 10: getItem = GetOutpatientDepartmentStatistics(this.formInline);break;
        case 11: getItem = GetInpatientDepartmentStatistics(this.formInline);break;
        case 12: getItem = GetStreet(this.formInline);break;
      }
      getItem.then(res => {
        if (res.data.code === 0) {
          if (res.data.data.content) {
            this.tableData = res.data.data.content;
            this.total = res.data.data.total;
          } else {
            this.tableData = res.data.data;
            this.total = undefined;
          }

        }
      })

    },
    fatherMethod(res, index) {
      this.tableData[index].kmdm = res.dm;
      this.tableData[index].kmmc = res.dmmc;
      this.show1 = false;
    },
    handleTable(val) {
      console.log(val);
      this.Keshi = val;
      this.nowPage = 1;
      this.queryAll();
    },
    handleDelete(row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          let getItem = new Function();
          switch (this.Keshi) {
            case 1: getItem = DeleteNationDictionary(row);break;
            case 2: getItem = DeleteDistrict(row);break;
            case 3: getItem = DeleteTCM_Disease(row);break;
            case 4: getItem = DeleteMedicalSubjects(row);break;
            case 5: getItem = DeleteAllergyDrugs(row);break;
            case 6: getItem = DeleteAnesthesia(row);break;
            case 7: getItem = DeleteKeyDiagnosis(row);break;
            case 8: getItem = DeleteFetalPosition(row);break;
            case 9: getItem = DeleteDepartmentStatistics(row);break;
            case 10: getItem = DeleteOutpatientDepartmentStatistics(row);break;
            case 11: getItem = DeleteInpatientDepartmentStatistics(row);break;
            case 12: getItem = DeleteStreet(row);break;
          }
          getItem.then((res) => {
            if (res.data.code === 0) {
              this.$message.success('删除成功!');
            } else {
              this.$message({
                type: "error",
                message: "删除失败请联系管理员!",
              });
            }
            this.queryAll();
          });
        }).catch((err) => {
        console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addMedical() {
      this.$refs.child.openBox();
    },
    onChangePage(val) {
      this.nowPage = val;
      this.queryAll();
    },
    update(row) {
      this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let getItem = new Function();
          if (row.dmmc.trim() === '') {
            this.$message.error('代码名称不能为空');
            return;
          }
          switch (this.Keshi) {
            case 1: getItem = UpdateNationDictionary(row);break;
            case 2: getItem = UpdateDistrict(row);break;
            case 3: getItem = UpdateTCM_Disease(row);break;
            case 4: getItem = UpdateMedicalSubjects(row);break;
            case 5: getItem = UpdateAllergyDrugs(row);break;
            case 6: getItem = UpdateAnesthesia(row);break;
            case 7: getItem = UpdateKeyDiagnosis(row);break;
            case 8: getItem = UpdateFetalPosition(row);break;
            case 9: getItem = UpdateDepartmentStatistics(row);break;
            case 10: getItem = UpdateOutpatientDepartmentStatistics(row);break;
            case 11: getItem = UpdateInpatientDepartmentStatistics(row);break;
            case 12: getItem = UpdateStreet(row);break;
          }
          getItem.then((res) => {
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "修改失败请联系管理员!",
              });
            }
            this.queryAll();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
          this.queryAll();
        });
    },

    // 打开代码录入
    handleOpenDictInput(item, type, index) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
      this.index = index;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
        this.tableData[this.index].kmdm = row.dm;
        this.tableData[this.index].kmmc = row.dmmc;

      console.log(row, this.tableData[this.index])

    },
    // f4 清除科别的选择
    clearDictInputValue(type) {
        this.tableData[this.index].kmdm = "";
        this.tableData[this.index].kmmc = "";
    },
    // 键盘操作
    focus(str, n) {
      let name = "";
      name = str + n;
      this.$refs[name].focus();
    },
    moveRight(str, n) {
      console.log(str, n);
      let name = "";
      name = str + n;
      console.log(this.$refs[name]);
      this.$refs[name].focus();
    },
    moveLeft(str, n) {
      let name = "";
      name = str + n;
      console.log(name, this.$refs[name]);
      this.$refs[name].focus();
    },
    moveUp(str, n) {
      let name = "";
      console.log(str, n);
      if (n !== 0) {
        if (this.$refs[str + (n - 1)].disabled === true) {
          this.moveUp(str, n - 1);
        } else {
          name = str + (n - 1);
          this.$refs[name].focus();
        }
      }


    },
    moveDown(str, n) {
      let name = "";
      if (n < this.tableData.length - 1) {
        if (this.$refs[str + (n + 1)].disabled === true) {
          this.moveDown(str, n + 1);
        } else {
          name = str + (n + 1);
          this.$refs[name].focus();
        }
      }
    },
  },
  mounted() {
    this.queryAll();
  },
};
</script>

<style lang="less" scoped>
  .table {
    /deep/ .el-input__inner:focus {
      background: #409EFF;
      color: #ffffff;
      border-top-color: #409EFF;
    }
  }
.el-select .el-input {
  width: 220px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-dropdown-link {
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.dict_lan {
  display: flex;
  padding: 10px 20px;
  background-color: #eee;
}
</style>

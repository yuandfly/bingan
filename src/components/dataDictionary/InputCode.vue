<!--输入码-->
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
          <el-button type="primary" size="small" @click="updateAll">全部生成</el-button>
        </el-form-item>
      </div>


      <div style="padding: 20px;">
        <el-table :data="tableData" v-loading="loading" border :height="dataList">
          <el-table-column prop="dm" label="代码" width="80">
            <template slot-scope="scope">
              {{scope.row.dm}}
            </template>
          </el-table-column>
          <el-table-column prop="dmmc" label="代码名称">
            <template slot-scope="scope">
              {{scope.row.dmmc}}
            </template>
          </el-table-column>
          <el-table-column prop="pym" label="拼音码">
            <template slot-scope="scope">
              {{scope.row.pym}}
            </template>
          </el-table-column>
          <el-table-column prop="wbm" label="五笔码">
            <template slot-scope="scope">
              {{scope.row.wbm}}
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
              <el-button size="mini" @click="update(scope.row)" type="primary">生成输入码</el-button>
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
  deleteOutpatientDepartment,
  DeleteMedicalLaboratory,
  GetDistrict,
  DeleteDistrict,
  GetTCM_Disease,
  DeleteTCM_Disease,
  deleteDepartmentDictionary,
  DeleteDiagnosis,
  DeleteOperationName,
  deleteDoctorDictionary,
  DeleteUnitAddress,
  GetOutpatientDepartment,
  GetDepartmentDictionary,
  GetDiagnosis,
  GetOperationName,
  GetDoctorDictionary,
  GetUnitAddress,
  GetMedicalLaboratory,
  universalGenerate
} from "@/api";
import departmentDictionary from "../../components/dialog/departmentdictionary";
import PagingToolbar from "../../components/toolbar/paging";
import MedicalSubjects from "../../components/dialog/medicalSubjects";
import MedicalLaboratoryBox from './MedicalLaboratoryBox';
import DictInput from "../../components/dialog/dict-input";
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
      loading: false,
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
        {value: '门急诊科室名称',table_name: 'gb22', id: 1},
        {value: '医技科室名称',table_name: 'gb24', id: 2},
        {value: '住院科室名称',table_name: 'gb25', id: 3},
        {value: '西医诊断名称',table_name: 'gb17', id: 4},
        {value: '手术名称',table_name: 'gb18', id: 5},
        {value: '中医病、证名称',table_name: 'gb19', id: 6},
        {value: '医师姓名', table_name: 'gb27',id: 7},
        {value: '患者单位地址',table_name: 'gb31', id: 8},
        {value: '行政区划',table_name: 'gb05', id: 9}
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
        case 1: getItem = GetOutpatientDepartment(this.formInline);break;
        case 2: getItem = GetMedicalLaboratory(this.formInline);break;
        case 3: getItem = GetDepartmentDictionary(this.formInline);break;
        case 4: getItem = GetDiagnosis(this.formInline);break;
        case 5: getItem = GetOperationName(this.formInline);break;
        case 6: getItem = GetTCM_Disease(this.formInline);break;
        case 7: getItem = GetDoctorDictionary(this.formInline);break;
        case 8: getItem = GetUnitAddress(this.formInline);break;
        case 9: getItem = GetDistrict(this.formInline);break;
      }
      this.loading = true;
      getItem.then(res => {
        console.log(res);
        if (res.data.code === 0) {
          if (res.data.data.content) {
            this.tableData = res.data.data.content;
            this.total = res.data.data.total;
          } else {
            this.tableData = res.data.data;
            this.total = undefined;
          }

        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
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
            case 1: getItem = deleteOutpatientDepartment(row);break;
            case 2: getItem = DeleteMedicalLaboratory(row);break;
            case 3: getItem = deleteDepartmentDictionary(row);break;
            case 4: getItem = DeleteDiagnosis(row);break;
            case 5: getItem = DeleteOperationName(row);break;
            case 6: getItem = DeleteTCM_Disease(row);break;
            case 7: getItem = deleteDoctorDictionary(row);break;
            case 8: getItem = DeleteUnitAddress(row);break;
            case 9: getItem = DeleteDistrict(row);break;
          }
        console.log(getItem);
          getItem.then((res) => {

            if ( res.code === 0 || res.data.code === 0) {
              this.$message.success('删除成功!');
            } else {
              this.$message({
                type: "error",
                message: "删除失败请联系管理员!",
              });
            }
            this.queryAll();
          }).catch(err => {
            console.log(err);
          });
        }).catch((err) => {

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
    updateAll() {
      this.$confirm("确定要生成全部输入码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.formInline.tableName = this.KeshiList[this.Keshi - 1]['table_name'];
          universalGenerate(this.formInline).then((res) => {
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "生成成功!",
              });
              this.formInline = {
                user: "",
                region: "",
              };
            } else {
              this.$message({
                type: "error",
                message: "生成失败请联系管理员!",
              });
            }
            this.loading = false;
            this.queryAll();
          });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消修改",
          });
          this.queryAll();
        });
    },

    update(row) {
      this.$confirm("确定要生成输入码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.formInline.tableName = this.KeshiList[this.Keshi - 1]['table_name'];
          this.formInline.dm = row.dm;
          this.formInline.dmmc = row.dmmc;

          universalGenerate(this.formInline).then((res) => {
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "生成成功!",
              });
              this.formInline = {
                user: "",
                        region: "",
              };
            } else {
              this.$message({
                type: "error",
                message: "生成失败请联系管理员!",
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

<style scoped>
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

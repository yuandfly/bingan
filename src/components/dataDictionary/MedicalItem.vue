<!--医技项目-->
<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium"  >
      <div class="dict_lan">
        <el-form-item label="科室">
          <el-select v-model="Keshi" size="small" @change="KeshiChange">
            <el-option v-for="item in KeshiList"  :label="item.kmmc" :value="item.dm" :key="item.dm" >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科室名称">
          <el-input
                  class="inline-input"
                  @input="queryAll()"
                  v-model="formInline.lmmc"
                  placeholder="请输入内容"
                  size="small"
          ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" size="small" @click="addMedical({})">新增</el-button>
        </el-form-item>
      </div>

      <div style="padding: 20px;">
      <el-table
              :data="tableData"
              default-expand-all
              row-key="id"
              class="table"
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              border
              :height="dataList">
        <el-table-column prop="dm" label="项目代码">
          <template slot-scope="scope">
            {{ scope.row.level === 0 ? scope.row.dm1 : scope.row.dm2}}
          </template>
        </el-table-column>
        <el-table-column prop="lmmc" label="类目名称">
          <template slot-scope="scope">
            <el-input v-if="scope.row.level === 0" v-model.trim="scope.row.lmmc"  :disabled="scope.row.bz === '1' || scope.row.bz === null" size="small" placeholder="请输入"></el-input>
            <el-input v-if="scope.row.level === 1" v-model.trim="scope.row.xmmc"  :disabled="scope.row.bz === '1' || scope.row.bz === null" size="small" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dwmc" label="单位名称">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.dwmc" size="small" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="qsrq" label="起始日期" style="padding-right: 20px;">
          <template slot-scope="scope">
            <el-date-picker size="small"
                            :disabled="scope.row.bz === '1' || scope.row.bz === null"
                            v-model="scope.row.qsrq"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="tzrq" label="停止日期">
          <template slot-scope="scope">
            <el-date-picker size="small"
                            :disabled="scope.row.bz === '1' || scope.row.bz === null"
                            v-model="scope.row.tzrq"
                    style="width: 100%"
                    placeholder="选择日期时间"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="tjgkName" label="统计归口">
          <template slot-scope="scope">
            <el-input
                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                    :value="scope.row.tjgkName" size="small"
                      @keyup.native.32="handleOpenDictInput(scope.row,'GetMedicalProjectFile', scope.$index)"
                      @keydown.native.115="clearDictInputValue('GetMedicalProjectFile')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="阳性标志">
          <template slot-scope="scope">
            <el-switch
                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                    v-model="scope.row.yxbz"
              active-value="1"
              inactive-value="0"
              active-text="阳性"
              inactive-text="阴性"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column> <el-table-column prop="bz" label="是否停用">
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
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <el-button size="mini" @click="update(scope.row)" type="primary">修改</el-button>
            <el-button type="primary" v-if="scope.row.level === 0" size="mini" @click="addMedical(scope.row)">新增</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-form>
    <MedicalItemBox ref="child" :kbdm="Keshi" :currentItem="currentItem" @fun="queryAll"></MedicalItemBox>
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
import { GetMedicalItem, updateMedicalItem, deleteMedicalItem } from "@/api";
import departmentDictionary from "../../components/dialog/departmentdictionary";
import PagingToolbar from "../../components/toolbar/paging";
import MedicalSubjects from "../../components/dialog/medicalSubjects";
import MedicalLaboratoryBox from './MedicalLaboratoryBox';
import DictInput from "../../components/dialog/dict-input";
import {GetMedicalLaboratory} from '../../api/dictionary';
import MedicalItemBox from './MedicalItemBox';
export default {
  components: {
    DictInput,
    MedicalSubjects,
    MedicalLaboratoryBox,
    MedicalItemBox,
    "department-dictionary": departmentDictionary,
  },
  data() {
    return {
      show1: false,
      index: 0,
      currentItem: {},
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
      KeshiList: [],
      Keshi: undefined
    };
  },
  props: ["dataList"],
  methods: {
    queryAll(condition) {
      this.formInline.kbdm = this.Keshi;
      GetMedicalItem(this.formInline).then((res) => {
        this.tableData = res.data.data;
        console.log(this.tableData);
        let id = 1;
        this.tableData.forEach((value, index, arr ) => {
          this.$set(arr[index], 'id', id++);
          this.$set(arr[index], 'level', 0);
          if (arr[index].children && arr[index].children.length > 0) {
            arr[index].children.forEach((v, i, a) => {
              this.$set(a[i], 'id', id++);
              this.$set(a[i], 'level', 1);
            })
          }
        })
        console.log(this.tableData);
        if (res.data.data.length  === 0 ) {
          this.$message.error('该科室没有数据');
        }
      });
    },
    fatherMethod(res, index) {
      this.tableData[index].kmdm = res.dm;
      this.tableData[index].kmmc = res.dmmc;
      this.show1 = false;
    },
    handleDelete(row) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteMedicalItem(row).then((res) => {
            console.log(res);
            if (res.data.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryAll();
            } else {
              this.$message({
                type: "error",
                message: "删除失败！",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addMedical(row) {
      this.currentItem = row;
      this.$refs.child.openBox();
    },

    KeshiChange(ev) {
      console.log(ev);
      this.Keshi = ev;
      this.queryAll();
    },

    update(row) {
      this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateMedicalItem(row).then((res) => {
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
     async GetMedicalLaboratory () {
       await  GetMedicalLaboratory(this.formInline).then(res => {
        if (res.code === 0) {
            this.KeshiList = res.data;
            this.Keshi = this.KeshiList[0].dm;
          this.queryAll();

        }
      })
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
      this.currentItem = item;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
        this.currentItem.tjgk = row.dm;
        this.$set(this.currentItem, 'tjgkName', row.dmmc );
      console.log(row, this.currentItem)

    },
    // f4 清除科别的选择
    clearDictInputValue(type) {
      this.currentItem.tjgk = "";
      this.currentItem.tjgkName = "";
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
     this.GetMedicalLaboratory();
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
  width: 130px;
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

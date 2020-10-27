<!--医技科室-->
<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium"  >
      <div class="dict_lan">
        <el-form-item label="科室名称">
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
        <el-table-column prop="kbxh" label="序号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kbxh" size="small"  :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dm" label="科别代码">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.dm" size="small" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kbjc" label="科别简称">
          <template slot-scope="scope">
            <el-input v-model.trim="scope.row.kbjc" size="small"  :disabled="scope.row.bz === '1' || scope.row.bz === null" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dmmc" label="科室名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dmmc" size="small"  :disabled="scope.row.bz === '1' || scope.row.bz === null" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kmdm" label="科目代码">
          <template slot-scope="scope">
            <el-input
                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                    :value="scope.row.kmdm"
                    size="small"
                    @keyup.native.32="handleOpenDictInput({},'medicalSubjects', scope.$index)"
                    @keydown.native.115="clearDictInputValue('medicalSubjects')"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kmmc" label="科目名称">
          <template slot-scope="scope">
            <el-input :value="scope.row.kmmc" size="small" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
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
      </div>
    </el-form>
    <MedicalLaboratoryBox ref="child" @fun="queryAll"></MedicalLaboratoryBox>
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
import { GetMedicalLaboratory, UpdateMedicalLaboratory, DeleteMedicalLaboratory } from "@/api";
import departmentDictionary from "../../components/dialog/departmentdictionary";
import PagingToolbar from "../../components/toolbar/paging";
import MedicalSubjects from "../../components/dialog/medicalSubjects";
import MedicalLaboratoryBox from './MedicalLaboratoryBox';
import DictInput from "../../components/dialog/dict-input";
export default {
  components: {
    DictInput,
    MedicalSubjects,
    MedicalLaboratoryBox,
    "department-dictionary": departmentDictionary,
  },
  data() {
    return {
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
    };
  },
  props: ["dataList"],
  methods: {
    queryAll(condition) {
      GetMedicalLaboratory(this.formInline).then((res) => {
        this.tableData = res.data.data;
      });
    },
    fatherMethod(res, index) {
      this.tableData[index].kmdm = res.dm;
      this.tableData[index].kmmc = res.dmmc;
      this.show1 = false;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除此人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {

          DeleteMedicalLaboratory(row).then((res) => {
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
    addMedical() {
      this.$refs.child.openBox();
    },
    update(row) {
      this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (row.dmmc.trim() === '') {
            this.$message.error('科室名称不能为空');
            return;
          }
          UpdateMedicalLaboratory(row).then((res) => {
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

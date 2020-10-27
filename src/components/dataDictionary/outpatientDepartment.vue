<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <div class="dict_lan">
        <el-form-item label="科室名称">
          <el-autocomplete
            size="small"
            class="inline-input"
            v-model="formInline.dmmc"
            @input="queryAll()"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addOutpatient">新增</el-button>
        </el-form-item>
      </div>
      <div style="padding: 20px;">
      <el-table :data="tableData" class="table" border fit :height="dataList">
        <el-table-column prop="kbxh" label="序号">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.kbxh"  :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dm" label="代码">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.dm"  :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kbjc" label="简称">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.kbjc" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dmmc" label="科室名称">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.dmmc"  :disabled="scope.row.bz === '1' || scope.row.bz === null" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kmdm" label="科目代码">
          <template slot-scope="scope">
            <el-input
                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
                    size="small"
              v-model.trim="scope.row.kmdm"
              placeholder="请输入"
              @keyup.native.32="handleOpenDictInput({},'medicalSubjects',scope.$index)"
              @keydown.native.115="clearDictInputValue('medicalSubjects',scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kmmc" label="科目名称">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.kmmc" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="jzbz" label="急诊">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.jzbz" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="jtbz" label="家庭病床">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.jtbz" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="是否停用" width="120" align="center">
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
        <el-table-column prop="zkbz" label="专科级别" :formatter="zkbzFormat">
          <template slot-scope="scope">
            <el-select size="small" v-model="scope.row.zkbz" :disabled="scope.row.bz === '1' || scope.row.bz === null"  placeholder="请选择">
              <el-option
                v-for="item in zkbzOptions"
                :key="item.zkbzvalue"
                :label="item.zkbzlabel"
                :value="item.zkbzvalue"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="tjgk" label="统计归口">
          <template slot-scope="scope">
            <el-input
              size="small"
              :disabled="scope.row.bz === '1' || scope.row.bz === null"
              v-model.trim="scope.row.tjgk"
              placeholder="请输入"
              @keyup.native.32="handleOpenDictInput({},'departmentStatistics',scope.$index)"
              @keydown.native.115="clearDictInputValue('departmentStatistics',scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-form>
    <outpatientBox ref="child" @fun="queryAll"></outpatientBox>
    <DictInput
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="handleDictInputSubmit"
    />
  </section>
</template>

<script>
import {
  GetOutpatientDepartment,
  UpdateOutpatientDepartment,
  deleteOutpatientDepartment,
} from "@/api";
import PagingToolbar from "../../components/toolbar/paging";
import InpatientArea from "../../components/dialog/inpatientArea";
import outpatientBox from "./outpatientBox";
import DictInput from "../../components/dialog/dict-input";

export default {
  components: {
    PagingToolbar,
    InpatientArea,
    outpatientBox,
    DictInput,
  },
  data() {
    return {
      index: 0,
      kbType: "",
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      pager: {
        total: 0, // 总条数
        page: 1, // 当前页
        rows: 10, // 每页显示多少条
      },
      restaurants: [],
      formInline: {},
      tableData: [],
      zkbzOptions: [
        {
          zkbzvalue: "0",
          zkbzlabel: "---请选择---",
        },
        {
          zkbzvalue: "1",
          zkbzlabel: "国家级专科",
        },
        {
          zkbzvalue: "2",
          zkbzlabel: "省(市区)级专科",
        },
        {
          zkbzvalue: "3",
          zkbzlabel: "地(市)级专科",
        },
        {
          zkbzvalue: "4",
          zkbzlabel: "院级专科",
        },
      ],
      zkbzvalue: "",
    };
  },
  props: ["dataList"],
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    queryAll() {
      GetOutpatientDepartment(this.formInline).then((res) => {
        this.tableData = res.data.data;
      });
    },
    zkbzFormat(row, column) {
      if (row.zkbz === "1") {
        return "国家级专科";
      } else if (row.zkbz === "2") {
        return "省(市区)级专科";
      } else if (row.zkbz === "3") {
        return "地(市)级专科";
      } else if (row.zkbz === "4") {
        return "院级专科";
      }
    },
    loadAll() {
      return [];
    },
    handleSelect(item) {},
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
          UpdateOutpatientDepartment(row).then((res) => {
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
    handleDelete(row) {
      this.$confirm("确定要删除此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteOutpatientDepartment({ dm: row.dm }).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryAll();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
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
    addOutpatient() {
      this.$refs.child.openBox();
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
      this.kbType = type;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      if (this.kbType === "medicalSubjects") {
        this.tableData[this.index].kmdm = row.dm;
        this.tableData[this.index].kmmc = row.dmmc;
      }
      if (this.kbType === "departmentStatistics") {
        this.tableData[this.index].tjgk = row.dm;
      }
    },
    // f4 清除科别的选择
    clearDictInputValue(type, index) {
      this.index = index;
      if (type === "medicalSubjects") {
        this.tableData[this.index].kmdm = "";
        this.tableData[this.index].kmmc = "";
      }
      if (type === "departmentStatistics") {
        this.tableData[this.index].tjgk = "";
      }
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
    this.restaurants = this.loadAll();
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
.dict_lan {
  display: flex;
  padding: 10px 20px;
  background-color: #eee;
}
</style>

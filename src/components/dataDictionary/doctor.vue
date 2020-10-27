<!--医师-->
<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <div class="dict_lan">
        <el-form-item label="医师姓名">
          <el-autocomplete
            class="inline-input"
            @input="queryAll()"
            v-model="formInline.dmmc"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            size="small"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addRow">新增</el-button>
        </el-form-item>
      </div>

      <el-table :data="tableData" class="table" border :height="dataList">
        <el-table-column prop="dm" label="代码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dm"
                      :disabled="scope.row.bz === '1' || scope.row.bz === null"
                      placeholder="请输入"
                      size="small"
                      :ref="'dm' + scope.$index"
                      @keydown.native.13="focus('ksdm',scope.$index)"
                      @keydown.native.37="moveLeft('ysbz',scope.$index)"
                      @keydown.native.38="moveUp('dm', scope.$index)"
                      @keydown.native.39="moveRight('ksdm',scope.$index)"
                      @keydown.native.40="moveDown('dm',scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ksdm" label="科室代码">
          <template slot-scope="scope">
            <el-input
                    :disabled="scope.row.bz === '1' || scope.row.bz === null"
              size="small"
              v-model.trim="scope.row.ksdm"
              placeholder="请输入"
                    :ref="'ksdm' + scope.$index"
                    @keydown.native.13="focus('dmmc',scope.$index)"
                    @keydown.native.37="moveLeft('dm',scope.$index)"
                    @keydown.native.38="moveUp('ksdm', scope.$index)"
                    @keydown.native.39="moveRight('dmmc',scope.$index)"
                    @keydown.native.40="moveDown('ksdm',scope.$index)"
              @keyup.native.32="handleOpenDictInput({},'departmentDict',scope.$index)"
              @keydown.native.115="clearDictInputValue(scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ksmc" label="科室名称"></el-table-column>
        <el-table-column prop="dmmc" label="医师姓名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dmmc"
                      :ref="'dmmc' + scope.$index"
                      :disabled="scope.row.bz === '1' || scope.row.bz === null"
                      placeholder="请输入"
                      size="small"
                      @keydown.native.13="focus('yszc',scope.$index)"
                      @keydown.native.37="moveLeft('ksdm',scope.$index)"
                      @keydown.native.38="moveUp('dmmc', scope.$index)"
                      @keydown.native.39="moveRight('yszc',scope.$index)"
                      @keydown.native.40="moveDown('dmmc',scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="yszc" label="医师职称" :formatter="yszcFormat">
          <template slot-scope="scope">
            <el-select v-model="scope.row.yszc"
                       :ref="'yszc' + scope.$index"
                       :disabled="scope.row.bz === '1' || scope.row.bz === null"
                       placeholder="请选择"
                       size="small"
                       @keydown.native.13="focus('ysbz',scope.$index)"
                       @keydown.native.37="moveLeft('dmmc',scope.$index)"
                       @keydown.native.ctrl.38="moveUp('yszc', scope.$index)"
                       @keydown.native.39="moveRight('ysbz',scope.$index)"
                       @keydown.native.ctrl.40="moveDown('yszc',scope.$index)"
            >
              <el-option
                v-for="item in yszcOptions"
                :key="item.yszcvalue"
                :label="item.yszclabel"
                :value="item.yszcvalue"

              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="ysbz" label="医师类别" :formatter="ysbzFormat">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ysbz"
                       :ref="'ysbz' + scope.$index"
                       :disabled="scope.row.bz === '1' || scope.row.bz === null"
                       placeholder="请选择"
                       size="small"
                       @keydown.native.13="focus('dm',scope.$index + 1)"
                       @keydown.native.37="moveLeft('yszc',scope.$index)"
                       @keydown.native.38="moveUp('ysbz', scope.$index)"
                       @keydown.native.39="moveRight('dm',scope.$index)"
                       @keydown.native.40="moveDown('ysbz',scope.$index)"
            >
              <el-option
                v-for="item in ysbzOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="bz" label="是否停用" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
                    :ref="'bz' + scope.$index"
              size="small"
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
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

    <div class="page_lan">
      <paging-toolbar :pager="pager" @change="queryAll('condition')" />
    </div>

    <!-- <department-dictionary :show.sync="show" ref="dialogtree" :msg.sync="indexs"></department-dictionary> -->

    <editDictBox ref="child" @fun="queryAll"></editDictBox>

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
  GetDoctorDictionary,
  UpdategetDoctorDictionary,
  deleteDoctorDictionary,
} from "@/api";
// import departmentDictionary from "../../components/dialog/departmentdictionary";
import editDictBox from "./editDictBox";
import PagingToolbar from "../../components/toolbar/paging";
import DictInput from "../../components/dialog/dict-input";

export default {
  components: {
    PagingToolbar,
    editDictBox,
    // "department-dictionary": departmentDictionary,
    DictInput,
  },
  data() {
    return {
      // show: false,
      // indexs: 0,
      pager: {
        total: 0, // 总条数
        page: 1, // 当前页
        rows: 10, // 每页显示多少条
      },
      restaurants: [],
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      index: 0,
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      ysbzOptions: [
        {
          value: "1",
          label: "门诊医师",
        },
        {
          value: "2",
          label: "住院医师",
        },
      ],
      value: "",
      yszcOptions: [
        {
          yszcvalue: "1",
          yszclabel: "正副主任医师",
        },
        {
          yszcvalue: "2",
          yszclabel: "主治医师",
        },
        {
          yszcvalue: "3",
          yszclabel: "医师医士",
        },
        {
          yszcvalue: "4",
          yszclabel: "进修实习人员",
        },
      ],
      yszcvalue: "",
      editFlag: [],
      formLabelWidth: "100px",
    };
  },
  props: ["dataList"],
  methods: {
    // eee(index, res) {
    //   this.indexs = index;
    //   this.show = true;
    // },
    // bbb() {
    //   this.$refs.dialogtree.dialogOpen();
    // },

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
    queryAll(condition) {
      let formInitData = {};
      if (condition === undefined) {
        // 条件查询
        sessionStorage.setItem("formInit", JSON.stringify(this.formInline));
        this.formInline.page = 1;
        this.formInline.limit = this.pager.rows;
        formInitData = this.formInline;
      } else {
        // 分页查询
        let formInit = JSON.parse(sessionStorage.getItem("formInit"));
        if (JSON.stringify(formInit) !== "{}") {
          formInitData = formInit;
        }
        formInitData.page = this.pager.page;
        formInitData.limit = this.pager.rows;
      }
      // 请求数据
      GetDoctorDictionary(formInitData).then((res) => {
        this.pager.page = formInitData.page;
        this.pager.total = res.data.data.total;
        this.tableData = res.data.data.content;
        console.log("2", this.tableData);
      });
    },

    yszcFormat(row, column) {
      if (row.yszc === "1") {
        return "正副主任医师";
      } else if (row.yszc === "2") {
        return "主治医师";
      } else if (row.yszc === "3") {
        return "医师医士";
      } else if (row.yszc === "4") {
        return "进修实习人员";
      }
    },

    ysbzFormat(row, column) {
      if (row.ysbz === "1") {
        return "门诊医师";
      } else if (row.ysbz === "2") {
        return "住院医师";
      }
    },
    loadAll() {
      return [];
    },
    handleSelect(item) {
      console.log(item);
    },
    // fatherMethod(res, index) {
    //   this.tableData[index].ksdm = res.dm;
    //   this.tableData[index].ksmc = res.dmmc;
    //   this.show = false;
    // },
    handleDelete(row) {
      this.$confirm("此操作将永久删除此人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteDoctorDictionary({ dm: row.dm }).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryAll();
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
    update(row) {
      this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          UpdategetDoctorDictionary(row).then((res) => {
            if (res.data.code === 0) {
              this.queryAll();
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
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
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

    addRow() {
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
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      this.tableData[this.index].ksdm = row.dm;
      this.tableData[this.index].ksmc = row.dmmc;
    },
    // f4 清除科别的选择
    clearDictInputValue(index) {
      this.index = index;
      this.tableData[this.index].ksdm = "";
      this.tableData[this.index].ksmc = "";
    },
  },
  created() {
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
.page_lan {
  display: flex;
  justify-content: center;
  padding: 24px 0;
}
</style>

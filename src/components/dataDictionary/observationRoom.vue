<template slot-scope="props">
  <section>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="medium">
      <div class="dict_lan">
        <el-form-item label="科室名称">
          <el-input
            class="inline-input"
            v-model="formInline.dmmc"
            @input="queryAll()"
            placeholder="请输入内容"
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="addObservation">新增</el-button>
        </el-form-item>
      </div>
      <div style="padding: 20px;">
      <el-table :data="tableData" class="table" border fit>
        <el-table-column prop="kbxh" label="序号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kbxh" placeholder="请输入" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dm" label="代码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dm" placeholder="请输入" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dmmc" label="科室名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dmmc" placeholder="请输入" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kbjc" label="科室简称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kbjc" placeholder="请输入" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="cws" label="床位数">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cws" placeholder="请输入" :disabled="scope.row.bz === '1' || scope.row.bz === null"  size="small"></el-input>
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
        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="update(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-form>

    <observationBox ref="child" @fun="queryAll"></observationBox>
  </section>
</template>

<script>
import {
  GetObservationRoom,
  UpdateObservationRoom,
  deleteObservationRoom,
} from "@/api";
import observationBox from "./observationBox";

export default {
  components: {
    observationBox,
  },
  data() {
    return {
      restaurants: [],
      formInline: {},
      tableData: [],
    };
  },
  props: ["dataList"],
  methods: {
    queryAll() {
      GetObservationRoom({}).then((res) => {
        this.tableData = res.data.data;
      });
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
          UpdateObservationRoom(row).then((res) => {
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
    addObservation() {
      this.$refs.child.openBox();
    },
    handleDelete(row) {
      this.$confirm("确定要修改此项吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteObservationRoom({ dm: row.dm }).then((res) => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
            this.queryAll();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
.dict_lan {
  display: flex;
  padding: 10px 20px;
  background-color: #eee;
}
</style>


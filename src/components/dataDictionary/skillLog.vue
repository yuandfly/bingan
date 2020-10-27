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

      <el-table :data="tableData" border fit>
        <el-table-column prop="kbxh" label="序号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kbxh" placeholder="请输入" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dm" label="科别代码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dm" placeholder="请输入" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="dmmc" label="简称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dmmc" placeholder="请输入" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="kbjc" label="科室名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.kbjc" placeholder="请输入" size="small"></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="cws" label="科目代码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cws" placeholder="请输入" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="cws" label="科目名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.cws" placeholder="请输入" size="small"></el-input>
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
    </el-form>

    <skill-log-box ref="child" @fun="queryAll"></skill-log-box>
  </section>
</template>

<script>
import {
    GetMedicalLaboratory,
    UpdateMedicalLaboratory,
    InsertMedicalLaboratory,
} from "@/api";
import skillLogBox from "./MedicalLaboratoryBox";

export default {
  components: {
      skillLogBox,
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
  },
  mounted() {
    this.queryAll();
  },
};
</script>

<style scoped>
.dict_lan {
  display: flex;
  padding: 10px 20px;
  background-color: #eee;
}
</style>


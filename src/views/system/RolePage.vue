<template>
  <section>
    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.roleName" placeholder="请输入角色名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryAll()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>-->

    <div class="homepage clearfix">
      <div class="topside">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.roleName" size="small" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" v-on:click="queryAll()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--列表-->
    <el-table
      :data="tableData"
      class="gutter"
      border
      highlight-current-row
      height="540"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
    >
      <el-table-column prop="roleName" align="center" label="角色名" min-width="80"></el-table-column>
      <el-table-column prop="roleKey" align="center" label="角色key" min-width="80"></el-table-column>
      <el-table-column label="操作" align="center" width="250" fixed="left">
        <template slot-scope="scope">
          <el-link type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
          <el-link type="primary" @click="handlePurview(scope.$index, scope.row)">权限设置</el-link>
          <el-link
            type="danger"
            v-show="scope.row.id != 1"
            @click="handleDel(scope.$index, scope.row)"
          >删除</el-link>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="page_bar">
      <paging-toolbar :pager="pager" @change="queryAll('condition')" />
    </el-col>

    <!--编辑模块-->
    <edit-role
      :detailData="detailData"
      v-if="editRoleVisible"
      :visible.sync="editRoleVisible"
      @refresh="queryAll()"
    ></edit-role>

    <!--新增模块-->
    <add-role v-if="addRoleVisible" :visible.sync="addRoleVisible" @refresh="queryAll()"></add-role>

    <!-- 权限设置-->
    <purview-setting :roleId="roleId" v-if="purviewVisible" :visible.sync="purviewVisible"></purview-setting>
  </section>
</template>
<script>
import PurviewSetting from "../../components/system/role/purviewSetting";
import EditRole from "../../components/system/role/editRole";
import AddRole from "../../components/system/role/addRole";
import PagingToolbar from "../../components/toolbar/paging";
import { getRolePageList, deleteRoleById } from "../../api/system/role";

export default {
  components: { PagingToolbar, AddRole, EditRole, PurviewSetting },
  data() {
    return {
      labelPosition: "right",
      filters: {},
      // 权限设置列表是否显示
      purviewVisible: false,
      // 权限行的id..
      roleId: "",
      // 显示编辑界面
      editRoleVisible: false,
      // 编辑详情数据
      detailData: {},
      // 新增界面是否显示
      addRoleVisible: false,
      pager: {
        total: 0, // 总条数
        page: 1, // 当前页
        rows: 10, // 每页显示多少条
      },
      loading: false,
      tableData: [],
    };
  },
  methods: {
    // 获取角色列表-------start
    queryAll(condition) {
      this.loading = true;
      let formInitData = {};
      if (condition === undefined) {
        // 条件查询
        sessionStorage.setItem("formInit", JSON.stringify(this.filters));
        this.filters.page = 1;
        this.filters.limit = this.pager.rows;
        formInitData = this.filters;
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
      getRolePageList(formInitData)
        .then((res) => {
          this.pager.page = formInitData.page;
          this.pager.total = res.data.data.total;
          this.tableData = res.data.data.content;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
        });
    },

    // 删除-------start
    handleDel: function (index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          let para = row.id;
          deleteRoleById(para).then((res) => {
            this.loading = false;
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.queryAll();
          });
        })
        .catch(() => {});
    },
    // 删除--------end

    // 是否显示权限设置
    handlePurview(index, row) {
      this.purviewVisible = true;
      this.roleId = row.id;
    },

    // 是否显示编辑页面
    handleEdit(index, row) {
      this.editRoleVisible = true;
      this.detailData = Object.assign({}, row);
    },

    // 显示新增界面
    handleAdd: function () {
      this.addRoleVisible = true;
    },
  },
  mounted() {
    this.queryAll();
  },
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 60px;
    border-radius: 6px;
    background-color: #eee;
    padding-top: 10px;
    /deep/.el-input--mini .el-input__inner {
      width: 190px !important;
    }
    .el-form {
      margin-left: 50px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }
  }
}
.page_bar {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}
</style>

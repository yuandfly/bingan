<template>
  <section>
    <!--工具条-->
    <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="菜单名">
          <el-input v-model="filters.name" placeholder="请输入菜单名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryAll()">查询</el-button>
    </el-form-item>-->
    <!-- // -->
    <!--<el-form-item>-->
    <!--<el-button type="primary"-->
    <!--@click="handleAdd">新增</el-button>-->
    <!--</el-form-item>-->
    <!-- // -->
    <!-- </el-form>
    </el-col>-->

    <div class="homepage clearfix">
      <div class="topside">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item label="菜单名">
              <el-input v-model="filters.name" size="small" placeholder="请输入菜单名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" v-on:click="queryAll()">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
    </div>

    <!--列表-->
    <el-table
      :data="tableData"
      class="gutter"
      border
      highlight-current-row
      height="600"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
      @expand-change="rowExpand"
    >
      <el-table-column type="expand" prop="children">
        <template slot-scope="scope">
          <permiss-expand-page :perimissParentId="scope.row.id"></permiss-expand-page>
        </template>
      </el-table-column>

      <!--<el-table-column label="操作"-->
      <!--width="100">-->
      <!--<template slot-scope="scope">-->
      <!--<el-link type="primary"-->
      <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-link>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column
        prop="category"
        align="center"
        label="功能的类别"
        min-width="80"
        :formatter="formatCategory"
      ></el-table-column>
      <el-table-column prop="name" align="center" label="顶级权限名称" min-width="80"></el-table-column>
      <el-table-column prop="key" align="center" label="功能的键值" min-width="80"></el-table-column>
      <el-table-column prop="level" align="center" label="等级" min-width="80"></el-table-column>
      <el-table-column prop="order" align="center" label="排序" min-width="80"></el-table-column>
      <el-table-column prop="position" align="center" label="功能位置" min-width="80"></el-table-column>
      <el-table-column prop="createTime" align="center" label="创建时间" min-width="100" sortable></el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="page_bar">
      <paging-toolbar :pager="pager" @change="queryAll('condition')" />
    </el-col>

    <!--新增模块-->
    <!--<add-route v-if="addRouteVisible"-->
    <!--:visible.sync="addRouteVisible"-->
    <!--@refresh="queryAll()"></add-route>-->

    <!--编辑模块-->
    <!--<edit-route :routeId="routeId"-->
    <!--v-if="editRouteVisible"-->
    <!--:visible.sync="editRouteVisible"-->
    <!--@refresh="queryAll"></edit-route>-->
  </section>
</template>
<script>
import { getPageList } from "../../api/system/permiss";
import PagingToolbar from "../../components/toolbar/paging";
import PermissExpandPage from "../../components/system/perminssion/permissExpandPage";
//import AddRoute from '../../components/need/route/addRoute'
//import EditRoute from '../../components/need/route/editRoute'

export default {
  components: { PagingToolbar, PermissExpandPage },
  data() {
    return {
      filters: {},
      pager: {
        total: 0, // 总条数
        page: 1, // 当前页
        rows: 10 // 每页显示多少条
      },
      // 新增界面是否显示
      addPermissVisible: false,
      // 显示编辑界面
      editPermissVisible: false,
      // 编辑详情数据
      routeId: "",
      loading: false,
      tableData: []
    };
  },
  methods: {
    formatCategory: function(row) {
      return row.category == 0 ? "菜单" : row.category == 1 ? "按钮" : "未知";
    },
    // 获取列表-------start
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
      formInitData.category = 0;
      formInitData.level = 1;
      getPageList(formInitData)
        .then(res => {
          this.pager.page = formInitData.page;
          this.pager.total = res.data.data.total;
          this.tableData = res.data.data.content;
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },

    rowExpand(row, isExpanded) {}

    // 显示新增界面
    // handleAdd: function () {
    //   this.addRouteVisible = true
    // },

    // 是否显示编辑页面
    // handleEdit (index, row) {
    //   this.editRouteVisible = true
    //   this.routeId = row.routeId
    // }
  },
  mounted() {
    this.queryAll();
  }
};
</script>

<style lang="less" scoped>
.homepage {
  width: 100%;
  .topside {
    height: 50px;
    border-radius: 6px;
    background-color: #eee;
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

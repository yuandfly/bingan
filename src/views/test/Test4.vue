<template>
  <div class="test4">
    <div class="w">
      <div class="top">
        <el-form :inline="true" :model="formInline">
          <el-form-item>
            <el-input v-model="formInline.user" placeholder="请输入角色名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onSubmitAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="down">
        <!-- 表格区域 -->
        <div class="tablebox">
          <el-table
            :data="tableData"
            class="gutter"
            border
            highlight-current-row
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          roleName: "超级管理员",
          roleKey: "superManager"
        },
        {
          roleName: "系统管理员",
          roleKey: "systemManager"
        },
        {
          roleName: "客服",
          roleKey: "kefuManager"
        },
        {
          roleName: "护士",
          roleKey: "denstent"
        },
        {
          roleName: "院长",
          roleKey: "yuanzhang"
        },
        {
          roleName: "病人",
          roleKey: "bingren"
        },
        {
          roleName: "收银",
          roleKey: "shouMoney"
        }
      ],
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //查询
      console.log("submit!");
    },
    onSubmitAdd() {
      //新增
      console.log("add!");
    },
    // 是否显示权限设置
    handlePurview(index, row) {
      // this.purviewVisible = true;
      // this.roleId = row.id;
    },

    // 是否显示编辑页面
    handleEdit(index, row) {
      // this.editRoleVisible = true;
      // this.detailData = Object.assign({}, row);
    }
  }
};
</script>
<style lang="less" scoped>
.test4 {
  margin: 0 auto;
  .top {
    transform: translateY(30px);
    height: 80px;
    // background-color: #eee;
    padding: 15px 0px;
  }
  .down {
    margin-top: 50px;
    min-height: calc(200px);
    // padding-top: 20px;
    // .tablebox {
    //   width: 100%;
    //   min-height: calc(200px);
    //   background-color: pink;
    // }
  }
}
</style>
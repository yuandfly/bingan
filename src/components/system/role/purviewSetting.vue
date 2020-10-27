<template>
  <el-dialog
    title="权限设置"
    :visible.sync="visible"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    关键字搜索&nbsp;&nbsp;&nbsp;&nbsp;
    <el-input placeholder="请输入关键字搜索" class="myselect" v-model="filterText"></el-input>
    <el-tree
      class="filter-tree"
      :data="data2"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :default-checked-keys="check"
      :check-strictly="associate"
      ref="tree2"
    ></el-tree>
    <div slot="footer" class="dialog-footer" id="el-dialog__footer">
      <el-button @click.native="close">取消</el-button>
      <el-button type="primary" @click.native="ztreeSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getRolePerTree } from "../../../api/system/role";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  data() {
    return {
      listLoading: false,
      filterText: "",
      data2: [],
      check: [],
      associate: false,
      defaultProps: {
        id: "id",
        label: "name",
        children: "childList"
      }
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleId: ""
  },
  mounted() {
    this.initData();
  },
  methods: {
    close() {
      // 直接修改父组件的属性
      this.$emit("update:visible", false);
    },
    // 权限设置
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    initData: function() {
      this.listLoading = true;
      // 初始化时，父子不互相关联
      this.associate = true;
      getRolePerTree(this.roleId).then(res => {
        this.listLoading = false;
        this.data2 = res.data.data.permissionTreeVOList;
        this.check = res.data.data.permissionIds;

        // 编辑回显后，父子互相关联
        this.associate = false;
      });
    },
    // 提交..
    ztreeSubmit: function() {
      let roleId = this.roleId;
      // 选中的节点---某个按钮（删除、新增）
      let webKey = this.$refs.tree2.getCheckedKeys();
      // 半选中的节点---某个页面（组织架构）
      let webKeys = this.$refs.tree2.getHalfCheckedKeys();
      let permissionId = webKey.concat(webKeys);
      if (permissionId.length < 1) {
        this.$message({
          message: "请配置菜单权限",
          type: "warning"
        });
        return;
      }
      this.$confirm("确认提交吗？", "提示", {}).then(() => {
        this.$axios
          .get("/web/permission/updatePermissByRoleId?roleId=" + roleId, {
            params: { permissionId: permissionId },
            paramsSerializer: function(params) {
              let newParams = params.permissionId
                .map(_ => `permissionId=${_}`)
                .join("&");
              return newParams;
            }
          })
          .then(res => {
            this.$message({
              message: "权限设置成功",
              type: "success"
            });
            // 直接修改父组件的属性
            this.$emit("update:visible", false);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  }
};
</script>

<style scoped>
#el-dialog {
  overflow: hidden;
  margin-left: 20%;
  width: 55% !important;
}
#el-dialog__footer {
  margin-top: -34px;
}
.el-tree {
  margin-top: 10px;
  overflow: auto;
  height: 300px;
}
#el-input__inner {
  width: 280px !important;
}
#el-textarea {
  width: 360px !important;
}
span {
  font-size: 20px;
  font-weight: bold;
}
.myselect {
  width: 192px;
}
</style>

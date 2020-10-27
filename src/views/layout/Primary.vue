<template>
  <!-- 顶部下一行 这个会出现面包屑的导航 这个和路径一起配合使用 面包屑实现动态路由-->
  <div class="primary">
    <div class="content">
<!--      <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--        &lt;!&ndash; <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">{{this.$route.meta.title}}</el-breadcrumb-item> &ndash;&gt;-->
<!--        <el-breadcrumb-item :to="{ path: '/admin/homepage/index' }">首页</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>数据编辑</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>病案首页</el-breadcrumb-item>-->
<!--        &lt;!&ndash; <el-breadcrumb-item-->
<!--        v-for="item in levellist"-->
<!--        :key="item.path"-->
<!--        :to="item.path"-->
<!--        >{{item.meta.title}}</el-breadcrumb-item>&ndash;&gt;-->
<!--      </el-breadcrumb>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levellist: []
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped>
//顶部下一行
.primary {
  width: 100%;
  /*height: 50px;*/
  background-color: #fff;
  box-shadow: 0px 12px 0px #eee;
  .el-breadcrumb {
    margin-left: 52px;
    line-height: 4;
  }
  .el-breadcrumb__item {
    margin-right: 10px;
  }
}
</style>

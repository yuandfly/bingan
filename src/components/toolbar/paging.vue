<template>
  <!-- 分页 -->
  <el-pagination style="float:right;"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="pager.total"
                 :current-page.sync="pager.page"
                 :page-size="pager.rows"
                 :page-sizes="pageSizes || [5, 10, 20, 30]"
                 @size-change="onChangeSize"
                 @current-change="onChangePage"
                 :background="true">
  </el-pagination>

</template>
<script>
export default {
  name: 'Pagination',
  props: ['pager', 'pageSizes'],
  computed: {
    total () {
      return this.pager.total
    },
    // 检测是否获取到无数据
    initBack () {
      return this.pager.total / this.pager.rows < this.pager.page
    }
  },
  /* watch: {
    total() {
      // 存在记录但未获取到数据时, 重新请求
      //  debugger
      if (this.initBack) {
        this.pager.page -= 1;
        this.$emit('change');
      }
    },
  }, */
  methods: {
    // 每页条数
    onChangeSize (rows) {
      this.pager.rows = rows;
      this.pager.page = 1;
      this.$emit('change')
    },
    // 翻页
    onChangePage (page) {
      this.pager.page = page;
      this.$emit('change')
    }
  }
}
</script>

<style scoped>
.el-pagination {
  padding: 0;
}
</style>

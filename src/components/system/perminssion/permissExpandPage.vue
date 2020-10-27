<template slot-scope="props" >
  <el-form label-position="left"
           id="inside"
           inline
           class="demo-table-expand">
    <el-table :data="dataList"
              class="childGutter"
              :header-cell-style="{background:'#B0E2FF',color:'black'}"
              style="width: 100%"
              max-height="250">
      <el-table-column prop="category"
                       align="center"
                       label="功能的类别"
                       min-width="80"
                       :formatter="formatCategory">
      </el-table-column>
      <el-table-column prop="name"
                       align="center"
                       label="二级权限名称"
                       min-width="80">
      </el-table-column>
      <el-table-column prop="key"
                       align="center"
                       label="功能的键值"
                       min-width="80">
      </el-table-column>
      <el-table-column prop="level"
                       align="center"
                       label="等级"
                       min-width="80">
      </el-table-column>
      <el-table-column prop="order"
                       align="center"
                       label="排序"
                       min-width="80">
      </el-table-column>
      <el-table-column prop="position"
                       align="center"
                       label="功能位置"
                       min-width="80">
      </el-table-column>
      <el-table-column prop="createTime"
                       align="center"
                       label="创建时间"
                       min-width="100"
                       sortable>
      </el-table-column>
    </el-table>
  </el-form>
</template>

<script>
import { getList } from '../../../api/system/permiss'
export default {
  data () {
    return {
      dataList: []
    }
  },
  props: {
    perimissParentId: ''
  },
  mounted () {
    this.getView()
  },
  methods: {
    getView () {
      let para = {}
      para.parentid = this.perimissParentId
      getList(para).then(res => {
        this.dataList = res.data.data
      }).catch(res => {
      })
    },
    formatCategory: function (row) {
      return row.category == 0 ? '菜单' : row.category == 1 ? '按钮' : '未知';
    }
  }
}
</script>

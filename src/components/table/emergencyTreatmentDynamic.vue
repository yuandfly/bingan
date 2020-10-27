<template>
<!-- 急诊工作动态 -->
    <div>
        <h1>急诊科室工作量统计表</h1>
        <h3>时期:2002-01-01 ～ 2002-01-30</h3>
        <el-table
    :data="tableData"
    stripe
    border
    style="width: 100%">
    <el-table-column
        prop=""
        label="科别"
        align="center"
        width="">
    </el-table-column>
    <el-table-column
        prop=""
        label="急诊人数"
        align="center"
        width=""> 
        <el-table-column
         prop=""
         label="合计"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="回家"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="入观"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="入院"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="死亡"
         align="center"
         width="">
        </el-table-column>
    </el-table-column> 
    <el-table-column
        prop=""
        label="危重抢救人数"
        align="center"
        width="">
    </el-table-column>
    <el-table-column
        prop=""
        label="抢救成功人数"
        align="center"
        width=""> 
    </el-table-column> 
    <el-table-column
        prop=""
        label="抢救成功率%"
        align="center"
        width="">
    </el-table-column>
    <el-table-column
        prop=""
        label="急诊原因分类"
        align="center"
        width="">
        <el-table-column
         prop=""
         label="中毒"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="外伤"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="内科"
         align="center"
         width="">
        </el-table-column>
        <el-table-column
         prop=""
         label="其他"
         align="center"
         width="">
        </el-table-column>
    </el-table-column>
    <el-table-column
        prop=""
        label="急诊出车"
        align="center"
        width="">
    </el-table-column>
    <el-table-column
        prop=""
        label="急诊手术"
        align="center"
        width="">
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: []
      }
    },
    props:['dataList'],
    watch:{
       dataList(val){ 
          this.tableData = val
       }
    }

}
</script>

<style scoped>
h1{ font-size: 24px; text-align: center; padding: 23px 0;}
h3{ text-align: center; padding-bottom: 20px;}
h2{ padding: 4px 0; display: flex; justify-content:space-between}
</style>
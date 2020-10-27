<template>
<!-- 医疗业务统计日报表5 -->
    <div>
        <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      label="门诊总量"
      align="center"
      width="">
      <el-table-column
        prop="mjc"
        label="科别"
        align="center"
        width="">
      </el-table-column>
      <el-table-column
        prop="tjm2009"
        label="门诊人次"
        align="center"
        width="">
      </el-table-column>  
      <el-table-column
        prop="tjm2012"
        label="急诊人次"
        align="center"
        width="">
      </el-table-column> 
      <el-table-column
        prop=""
        label="留观人数"
        align="center"
        width="">
      </el-table-column> 
    </el-table-column>
    <el-table-column label="住 院 部 分" align="center" width="">
      <el-table-column
        prop="zjc"
        label="科别"
        align="center"
        width="">
      </el-table-column>
      <el-table-column
        prop="tjz1001"
        label="实际开放床数"
        align="center"
        width="">
      </el-table-column>
      <el-table-column
        prop="tjz1002"
        label="原有人数"
        align="center"
        width="">
      </el-table-column>
      <el-table-column
        prop="tjz1003"
        label="入院人数"
        align="center"
        width="">
      </el-table-column>
      <el-table-column
        prop="tjz1004"
        label="他科转入"
        align="center"
        width="">
      </el-table-column>
      <el-table-column
        label="出院人数"
        align="center"
        width="">
         <el-table-column
         prop=""
         label="合计"
         align="center"
         width="">
         </el-table-column>
         <el-table-column
          prop="tjz1010"
          label="死亡"
          align="center"
          width="">
         </el-table-column>
      </el-table-column>
      <el-table-column
          prop="tjz1015"
          label="转往他科"
          align="center"
          width="">
      </el-table-column>
      <el-table-column
          prop="tjz1016"
          label="留院人数"
          align="center"
          width="">
      </el-table-column>
      <el-table-column
          prop=""
          label="病床使用率%"
          align="center"
          width="">
      </el-table-column>
      <el-table-column
          prop="tjz1018"
          label="危重病人"
          align="center"
          width="">
      </el-table-column>
      <el-table-column
          prop="tjz1019"
          label="陪伴人数"
          align="center"
          width="">
      </el-table-column>
      <el-table-column
          prop=""
          label="本日手术人数"
          align="center"
          width="">
      </el-table-column>
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
          val.forEach(el => { 
             el.total = Number(el.tjm2009)+Number(el.tjm2012)
          })
       }
    }

}
</script>

<style scoped>

</style>
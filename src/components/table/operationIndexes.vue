<template>
  <!-- 手术索引 -->
  <div>
   <div id="print">
     <div v-for="item in tableData" style="padding: 20px;" >
       <el-card class="box-card">
         <div slot="header" class="clearfix">
           <h2>
             <span>【手术索引】手术名称：{{item.baf408c}}</span>
           </h2>
           <h2>
             <span>ICD-CM-3:{{item.baf405}}</span>
             <span>例数:{{item.ssLs}}</span>
           </h2>

         </div>
         <div>
           <el-table :data="item.childList" stripe border style="width: 100%">
             <el-table-column prop="baza01" label="病案号" align="center" width>

             </el-table-column>
             <el-table-column prop="baf408c" label="手术名称" align="center" width></el-table-column>
             <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
             <el-table-column prop="baf405" label="icd-cm-3" align="center" width></el-table-column>
             <el-table-column prop="baf411" label="手术日期" align="center" width></el-table-column>
             <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
             <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
             <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
             <el-table-column prop="qy" label="切/愈" align="center" width></el-table-column>
             <el-table-column prop="ssLs" label="例数" align="center" width></el-table-column>
             <el-table-column prop="baf409" label="手术医师" align="center" width></el-table-column>
             <el-table-column prop="baf410c" label="麻醉方法" align="center" width></el-table-column>
           </el-table>
         </div>
       </el-card>
     </div>
   </div>


    <div class="page_block" v-if="this.dateList.pagingCode === '1'">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { operationIndex } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
      name: "",
      icd: "",
      num: 0,
      icd10: "",
      icd9: "",
      currentPage: 1,
      pageNum: 1,
      pageSize: 15,
      total: 0
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
    },
    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        operationIndex({
          dm:  this.dateList.illCode ? this.dateList.illCode  : "0",
          endTime: this.dateList.dateEnd,
          fy: this.dateList.pagingCode,
          jbName: this.dateList.illCode,
          kb: "0000",
          limit: this.pageSize,
          page: this.pageNum,
          startTime: this.dateList.dateBegin
        }).then(res => {

            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data.content;
            this.total = res.data.total;
            showOkMsg(res.msg);

        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    }
  }
};
</script>

<style scoped>
h2 {
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
}
.page_block {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}
</style>
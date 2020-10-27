<template>
  <!-- 疾病分类次索引 -->
  <div>
    <div id="print">
      <div v-for="item in tableData" style="padding: 20px;" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2>
              <span>病名：{{item.baf103c}}</span>
              <span>例数：{{item.bmLs}}</span>
            </h2>
            <h2>
              <span>ICD类目: {{item.icd}}</span>
              <span>{{item.bzLs}}</span>
            </h2>
            <h2>
              <span>ICD-10: {{item.baf111}}</span>
              <span>ICD-9: {{item.baza39}}</span>
            </h2>

          </div>
          <div>
            <el-table :data="item.childList" stripe border style="width: 100%">
              <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
              <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
              <el-table-column prop="baza01" label="病案号" align="center" width></el-table-column>
              <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
              <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
              <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
              <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
              <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
              <el-table-column prop="baza80" label="并症" align="center" width></el-table-column>
            </el-table>
          </div>
        </el-card>
      </div>
    </div>
    <div class="page_block" v-if="this.dateList.pagingCode === '1'">
      <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total"
      ></el-pagination>
    </div>
  </div>

</template>

<script>
import { secondaryIndex } from "@/api";
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
      pageSize: 1,
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
      //  this.$emit('func',this.pageNum,this.pageSize)
      //   console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
      //  this.$emit('func',this.pageNum,this.pageSize)
      //   console.log(`当前页: ${val}`);
    },
    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        secondaryIndex({
          dm: this.dateList.illCode ? this.dateList.illCode  : "0",
          endTime: this.dateList.dateEnd,
          fy: Number(this.dateList.pagingCode),
          jbName: this.dateList.illName,
          kb: "0000",
          limit: this.pageSize,
          page: this.pageNum,
          startTime: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data.content;
            this.total = res.data.total;

            console.log(this.tableData);
          }
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
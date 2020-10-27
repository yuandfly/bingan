<template>
  <!-- 疾病分类主索引 -->
  <div>


    <div  id="print">
      <div v-for="item in tableData" style="padding: 20px;">
        <el-card class="box-card" v-if="item">
          <div slot="header" class="clearfix" >
            <h2>
              <span>病名：{{item.itemName}}</span>
              <span>例数：{{item.pageList[0].bmLs}}</span>
            </h2>
            <h2>
              <span>ICD类目: {{item.pageList[0].icd}}</span>
              <span>{{item.pageList[0].bzLs}}</span>
            </h2>
            <h2>
              <span>ICD-10: {{item.pageList[0].baza65}}</span>
              <span>ICD-9: {{item.pageList[0].baza39}}</span>
            </h2>

          </div>
          <div>
            <el-table :data="item.pageList" stripe border style="width: 100%">
              <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
              <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
              <el-table-column prop="baza01" label="病案号" align="center" width>
                <template slot-scope="scope">
                  {{scope.row.baza01.substr(4, 8)}}
                </template>
              </el-table-column>
              <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
              <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
              <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
              <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
              <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
              <el-table-column prop="baza80" label="归档号" align="center" width></el-table-column>
            </el-table>
          </div>
        </el-card>


      </div>
    </div>
    <div class="page_block">
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
import { primaryIndex } from "@/api";
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
      pageSize: 10,
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
    //  console.log("+ ", this.dateList.illCode, this.dateList.illName);
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        primaryIndex({
          dm:  this.dateList.illCode ? this.dateList.illCode  : "0",
          endTime: this.dateList.dateEnd,
          fy: this.dateList.pagingCode,
          // jbName: this.dateList.illCode,
          // kb: "0000",
          limit: this.pageSize,
          page: this.pageNum,
          startTime: this.dateList.dateBegin
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data || [];
            showOkMsg(res.msg);
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
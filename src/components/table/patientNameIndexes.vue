<template>
  <!-- 病人姓名索引 -->
  <div>
    <div  id="print">
      <div  v-for="item in tableData" style="padding: 20px;" >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2>【姓名索引】</h2>
            <h2>姓氏：{{item.surname}}</h2>

          </div>
          <div>
            <el-table :data="item.childList" stripe border style="width: 100%">
              <el-table-column prop="baza01" label="病案号" align="center" width>
                <template slot-scope="scope">
                  {{scope.row.baza01.substr(4, 8)}}
                </template>
              </el-table-column>
              <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
              <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
              <el-table-column prop="baza05" label="身份证号" align="center" width></el-table-column>
              <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
              <el-table-column prop="baza29" label="天数" align="center" width></el-table-column>
              <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
              <el-table-column prop="baza37c" label="出院主诊" align="center" width></el-table-column>
              <el-table-column prop="baza65" label="ICD" align="center" width></el-table-column>
              <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
              <el-table-column prop="baza83" label="住院费用" align="center" width></el-table-column>
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
import { groupBySurname } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
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

    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
      //  this.$emit('func',this.pageNum,this.pageSize)
      //   console.log(`当前页: ${val}`);
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        groupBySurname({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd,
          dm: this.dateList.illName,
          fy: Number(this.dateList.pagingCode),
          limit: this.pageSize,
          page: this.pageNum
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data.content || [];
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },
    printContext () {
      console.log('test');
      this.$print(document.querySelector('#print'));
    },
  }
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  text-align: center;
  padding: 23px 0;
}
h3 {
  text-align: center;
  padding-bottom: 20px;
}
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
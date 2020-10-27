<template>
  <!-- 病人姓名索引 -->
  <div>
    <h1>肿瘤索引</h1>
    <h3>时期：{{dateList.dateBegin}} ~ {{dateList.dateEnd}}</h3>
<!--    <h2>姓氏：{{dateList.illName}}</h2>-->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="baza01" label="病案号" align="center" width>
        <template slot-scope="scope">
          {{scope.row.baza01.substr(4, 8)}}
        </template>
      </el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
      <el-table-column prop="baza06c" label="姓名" align="center" width></el-table-column>
      <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
      <el-table-column prop="baza24" label="入院日期" align="center" width></el-table-column>
      <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
      <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
      <el-table-column prop="baza83" label="住院费用" align="center" width></el-table-column>
      <el-table-column prop="baza80" label="归档号" align="center" width></el-table-column>
    </el-table>
<!--    <div class="page_block">-->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page="currentPage"-->
<!--        :page-sizes="[10, 15, 20, 30]"-->
<!--        :page-size="pageSize"-->
<!--        layout="total, sizes, prev, pager, next, jumper"-->
<!--        :total="total"-->
<!--      ></el-pagination>-->
<!--    </div>-->
  </div>
</template>

<script>
import { tumourIndex } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {

    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        tumourIndex({
          startTime: this.dateList.dateBegin,
          endTime: this.dateList.dateEnd
        }).then(res => {
          if (res.code === 0) {
            this.startDate = this.dateList.dateBegin;
            this.endDate = this.dateList.dateEnd;
            this.tableData = res.data.content;
            showOkMsg(res.msg);
          }
        });
      } else {
        showErrorMsg("请选择开始或结束日期");
      }
    },
    printContext () {
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
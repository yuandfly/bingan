<template>
  <!-- 死亡病人索引 -->
  <div>
    <div id="print">
      <div v-if="!tableData">
        <el-table :data="item.pageList" stripe border style="width: 100%">
          <el-table-column prop="baza27" label="出院日期" align="center" width></el-table-column>
          <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
          <el-table-column prop="baza01" label="病案号" align="center" width></el-table-column>
          <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
          <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
          <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
          <el-table-column prop="baza41c" label="转归" align="center" width></el-table-column>
          <el-table-column prop="baza29" label="住院天数" align="center" width></el-table-column>
          <el-table-column prop="baza80" label="归档号" align="center" width></el-table-column>
        </el-table>
      </div>
      <div v-for="item in tableData" style="padding: 20px;" v-else>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2>【死亡病人索引】死因病名：{{}}</h2>
            <h2>
              <span>病名：{{item.itemName}}</span>
              <span>例数：{{item.pageList[0].bmLs}}</span>
            </h2>
            <h2>
              <span>ICD-10: {{item.pageList[0].baza65}}</span>
              <span>ICD-9: {{item.pageList[0].baza39}}</span>
            </h2>

          </div>
          <div>
            <el-table :data="item.childList" stripe border style="width: 100%">
              <el-table-column prop="baza27" label="死亡日期" align="center" width></el-table-column>
              <el-table-column prop="baza23c" label="科别" align="center" width></el-table-column>
              <el-table-column prop="baza01" label="病案号" align="center" width></el-table-column>
              <el-table-column prop="baza02" label="姓名" align="center" width></el-table-column>
              <el-table-column prop="baza03c" label="性别" align="center" width></el-table-column>
              <el-table-column prop="baza06c" label="年龄" align="center" width></el-table-column>
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
import { deathIndex } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      startDate: "",
      endDate: "",
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
      this.OrganizationList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.OrganizationList();
    },
    printContext () {
      this.$print(document.querySelector('#print'));
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        deathIndex({
          dm:  this.dateList.illCode ? this.dateList.illCode  : "0",
          endTime: this.dateList.dateEnd,
          fy: Number(this.dateList.pagingCode),
          jbName: this.dateList.illCode,
          kb: "0000",
          limit: this.pageSize,
          page: this.pageNum,
          startTime: this.dateList.dateBegin
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
    }
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
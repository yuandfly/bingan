<template>
  <!-- 姓名索引 -->
  <div  id="print" >
      <div v-loading="loading">
        <div  v-for="item in tableData" style="padding: 20px;" >
          <el-card class="box-card" >

            <div>
              <table class="index_table">
                <tr>
                  <td>病案号</td>
                  <td>{{item.baza01}}</td>
                  <td>姓名</td>
                  <td>{{item.baza02}}</td>
                  <td>性别</td>
                  <td>{{item.baza03c}}</td>
                </tr>
                <tr>
                  <td>通讯地址</td>
                  <td colspan="3">{{item.baza17c}}</td>
                  <td>年龄</td>
                  <td>{{item.baza06c}}</td>
                </tr>
                <tr>
                  <td>邮政编码</td>
                  <td>{{item.baza14}}</td>
                  <td>电话</td>
                  <td>{{item.baza19}}</td>
                  <td>入院病情</td>
                  <td>{{item.baza20c}}</td>
                </tr>
                <tr>
                  <td>入院诊断</td>
                  <td colspan="3">{{item.baza37c}}</td>
                  <td>入院日期</td>
                  <td>{{item.baza24}}</td>
                </tr>
                <tr>
                  <td>出院诊断</td>
                  <td colspan="3">{{item.baza38c}}</td>
                  <td>出院日期</td>
                  <td>{{item.baza27}}</td>
                </tr>
                <tr>
                  <td>ICD-10</td>
                  <td>{{item.baza65}}</td>
                  <td>转归</td>
                  <td>{{item.baza41c}}</td>
                  <td>ICD-9</td>
                  <td>{{item.baza39}}</td>
                </tr>
                <tr>
                  <td>出院科别</td>
                  <td>{{item.baza23c}}</td>
                  <td>损伤编码</td>
                  <td>{{item.baza79}}</td>
                  <td>M编码</td>
                  <td>{{item.baza77}}</td>
                </tr>
                <tr>
                  <td>总费用</td>
                  <td>{{item.baza83}}</td>
                  <td>住院天数</td>
                  <td>{{item.baza29}}</td>
                  <td>第几天确诊</td>
                  <td>{{item.baza31}}</td>
                </tr>
                <tr>
                  <td>主任医师</td>
                  <td>{{item.baza32}}</td>
                  <td>主治医师</td>
                  <td>{{item.baza33}}</td>
                  <td>住院医师</td>
                  <td>{{item.baza34}}</td>
                </tr>
                <tr>
                  <td>门诊医师</td>
                  <td>{{item.baza35}}</td>
                  <td>责任护士</td>
                  <td>{{item.baza69}}</td>
                  <td>编码员</td>
                  <td>{{item.baza59}}</td>
                </tr>
              </table>
            </div>
          </el-card>
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
  </div>
</template>

<script>
import { surnameIndex } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageNum: 1,
      pageSize: 1,
      total: 0,
      loading: false
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    printContext () {
      this.$print(document.querySelector('#print'));
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
      //  this.$emit('func',this.pageNum,this.pageSize)
      //   console.log(`当前页: ${val}`);
    },
    getTableList() {
      if (this.dateList.dateBegin && this.dateList.dateEnd) {
        this.loading = true;
        console.log(this.loading);
        surnameIndex({
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
            this.tableData = res.data.content;
            this.total = res.data.total;

            console.log(this.tableData);
          }
          this.loading = false;
        });

      } else {
        showErrorMsg("请选择开始或结束日期");
        this.loading = false;
      }
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
.index_table,
tr,
td {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ebeef5;
}
.index_table td {
  width: 16.66%;
  padding: 0 10px;
  height: 49px;
  font-size: 14px;
  vertical-align: middle;
  color: #3c3c3c;
}

.page_block {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}
</style>
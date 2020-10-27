<!--医技工作日志登记-->
<template>
  <div class="journal">
    <h1>医技工作日志登记</h1>
    <div class="table_block" v-for="item in fromData.domains">
      <h3 class="title">科别名称：{{item.kbmc}}</h3>
      <el-table :data="item.list" stripe border>
        <el-table-column prop="xmmc" label="科室项目" width align="center"></el-table-column>
        <el-table-column prop="tjjc003" label="项目代码" width align="center"></el-table-column>
        <el-table-column label="数量" align="center">
          <el-table-column prop="tjjc007" label="门诊" width align="center">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model.number="scope.row.tjjc007"
                @keyup.native="scope.row.tjjc007=verifyNum(scope.row.tjjc007)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="tjjc008" label="住院" width align="center">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model.number="scope.row.tjjc008"
                @keyup.native="scope.row.tjjc008=verifyNum(scope.row.tjjc008)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="合计" width align="center">
            <template slot-scope="scope">{{sum(scope.row.tjjc007,scope.row.tjjc008)}}</template>
          </el-table-column>
          <el-table-column prop="dwmc" label="单位" width align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="总收入（元）" align="center">
          <el-table-column prop="tjjc013" label="门诊" width align="center">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model="scope.row.tjjc013"
                @keyup.native="scope.row.tjjc013=verifyNum(scope.row.tjjc013)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="tjjc014" label="住院" width align="center">
            <template slot-scope="scope">
              <el-input
                size="mini"
                v-model="scope.row.tjjc014"
                @keyup.native="scope.row.tjjc014=verifyNum(scope.row.tjjc014)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="tjjc012" label="合计" width align="center">
            <template slot-scope="scope">{{sum(scope.row.tjjc013,scope.row.tjjc014)}}</template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="tjjc009" label="阳性数" width align="center">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.tjjc009"
              @keyup.native="scope.row.tjjc009=verifyNum(scope.row.tjjc009)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="tjjc011" label="工作甲级数" width align="center">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.tjjc011"
              @keyup.native="scope.row.tjjc011=verifyNum(scope.row.tjjc011)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="tjjc005" label="工时数" width align="center">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.tjjc005"
              @keyup.native="scope.row.tjjc005=verifyNum(scope.row.tjjc005)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTjjcList } from "@/api";
import { showOkMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      fromData: {
        domains: [],
      },
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    sum(n, m) {
      if (n && m) {
        return Number(n) + Number(m);
      }
    },
    getTableList() {
      getTjjcList({
        tjjcrq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.fromData.domains = res.data;
          if (res.data) {
            this.fromData.domains.forEach((ele) => {
              ele.list.forEach((element) => {
                element.tjjcrq = this.dateList.date;
              });
            });
          }
          // showOkMsg(res.msg);
        }
      });
    },
    getTableData() {
      return this.fromData.domains;
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  text-align: center;
  padding: 23px 0;
}
.table_block {
  margin-bottom: 14px;
}
.title {
  margin-left: 4px;
  font-size: 16px;
  padding-bottom: 10px;
}
</style>
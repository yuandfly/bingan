<template>
  <div class="journal">
    <h1>急诊工作日志登记</h1>
    <!-- <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false"> -->
    <el-table :data="fromData.domains" stripe border  show-summary>
      <el-table-column prop="dmmc" label="科别名称" align="center"></el-table-column>
      <el-table-column label="急诊人次" align="center">
        <el-table-column prop="tjm3001" label="计" align="center"></el-table-column>
        <el-table-column prop="tjm3015" label="医保" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3015'"
              :rules="fromaDataRules.tjm3015"
            >-->
            <el-input
              :ref="'tjm3015'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3015"
              @keyup.native="scope.row.tjm3015=verifyNum(scope.row.tjm3015)"
              @keydown.native.13="focus('tjm3002',scope.$index)"
              @keydown.native.37="moveLeft('tjm3015',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3002',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="急诊人数中" align="center">
        <el-table-column prop="tjm3002" label="回家" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3002'"
              :rules="fromaDataRules.tjm3002"
            >-->
            <el-input
              :ref="'tjm3002'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3002"
              @keyup.native="scope.row.tjm3002=verifyNum(scope.row.tjm3002)"
              @keydown.native.13="focus('tjm3003',scope.$index)"
              @keydown.native.37="moveLeft('tjm3015',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3003',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm3003" label="入观" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3003'"
              :rules="fromaDataRules.tjm3003"
            >-->
            <el-input
              :ref="'tjm3003'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3003"
              @keyup.native="scope.row.tjm3003=verifyNum(scope.row.tjm3003)"
              @keydown.native.13="focus('tjm3004',scope.$index)"
              @keydown.native.37="moveLeft('tjm3002',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3004',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm3004" label="入院" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3004'"
              :rules="fromaDataRules.tjm3004"
            >-->
            <el-input
              :ref="'tjm3004'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3004"
              @keyup.native="scope.row.tjm3004=verifyNum(scope.row.tjm3004)"
              @keydown.native.13="focus('tjm3005',scope.$index)"
              @keydown.native.37="moveLeft('tjm3003',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3005',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm3005" label="死亡" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3005'"
              :rules="fromaDataRules.tjm3005"
            >-->
            <el-input
              :ref="'tjm3005'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3005"
              @keyup.native="scope.row.tjm3005=verifyNum(scope.row.tjm3005)"
              @keydown.native.13="focus('tjm3007',scope.$index)"
              @keydown.native.37="moveLeft('tjm3004',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3007',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="tjm3007" label="危重抢救人数" align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm3007'"
            :rules="fromaDataRules.tjm3007"
          >-->
          <el-input
            :ref="'tjm3007'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm3007"
            @keyup.native="scope.row.tjm3007=verifyNum(scope.row.tjm3007)"
            @keydown.native.13="focus('tjm3008',scope.$index)"
            @keydown.native.37="moveLeft('tjm3005',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm3008',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjm3008" label="抢救成功人数" align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm3008'"
            :rules="fromaDataRules.tjm3008"
          >-->
          <el-input
            :ref="'tjm3008'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm3008"
            @keyup.native="scope.row.tjm3008=verifyNum(scope.row.tjm3008)"
            @keydown.native.13="focus('tjm3009',scope.$index)"
            @keydown.native.37="moveLeft('tjm3007',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm3009',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column label="原因分类" align="center">
        <el-table-column prop="tjm3009" label="中毒" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3009'"
              :rules="fromaDataRules.tjm3009"
            >-->
            <el-input
              :ref="'tjm3009'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3009"
              @keyup.native="scope.row.tjm3009=verifyNum(scope.row.tjm3009)"
              @keydown.native.13="focus('tjm3010',scope.$index)"
              @keydown.native.37="moveLeft('tjm3008',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3010',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm3010" label="外伤" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3010'"
              :rules="fromaDataRules.tjm3010"
            >-->
            <el-input
              :ref="'tjm3010'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3010"
              @keyup.native="scope.row.tjm3010=verifyNum(scope.row.tjm3010)"
              @keydown.native.13="focus('tjm3011',scope.$index)"
              @keydown.native.37="moveLeft('tjm3009',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3011',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm3011" label="内科" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3011'"
              :rules="fromaDataRules.tjm3011"
            >-->
            <el-input
              :ref="'tjm3011'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3011"
              @keyup.native="scope.row.tjm3011=verifyNum(scope.row.tjm3011)"
              @keydown.native.13="focus('tjm3012',scope.$index)"
              @keydown.native.37="moveLeft('tjm3010',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3012',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm3012" label="其他" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm3012'"
              :rules="fromaDataRules.tjm3012"
            >-->
            <el-input
              :ref="'tjm3012'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm3012"
              @keyup.native="scope.row.tjm3012=verifyNum(scope.row.tjm3012)"
              @keydown.native.13="focus('tjm3013',scope.$index)"
              @keydown.native.37="moveLeft('tjm3011',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm3013',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="tjm3013" label="急诊出车" align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm3013'"
            :rules="fromaDataRules.tjm3013"
          >-->
          <el-input
            :ref="'tjm3013'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm3013"
            @keyup.native="scope.row.tjm3013=verifyNum(scope.row.tjm3013)"
            @keydown.native.13="focus('tjm3014',scope.$index)"
            @keydown.native.37="moveLeft('tjm3012',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm3014',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjm3014" label="急诊手术" align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm3014'"
            :rules="fromaDataRules.tjm3014"
          >-->
          <el-input
            :ref="'tjm3014'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm3014"
            @keyup.native="scope.row.tjm3014=verifyNum(scope.row.tjm3014)"
            @keydown.native.13="focus('tjm3015',scope.$index)"
            @keydown.native.37="moveLeft('tjm3013',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm3014',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-form> -->
  </div>
</template>
<script>
import { getTjm3List } from "@/api";
import { showOkMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      fromData: {
        domains: [],
      },
      flag: true,
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
    getTableList() {
      getTjm3List({
        tjm3rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {

          this.fromData.domains = res.data;
          showOkMsg(res.msg);
        }
      });
    },
    getTableData() {
      // let obj = {};
      // obj.domains = this.fromData.domains;
      // this.$refs["from"].validate(val => {
      //   obj.flag = val;
      // });
      return this.fromData.domains;
    },
    focus(str, n) {
      let name = "";
      if (str === "tjm3015") {
        if (n < this.fromData.domains.length - 1) n++;
        else n = 0;
      }
      name = str + n;
      this.$refs[name].focus();
    },
    moveRight(str, n) {
      let name = "";
      name = str + n;
      this.$refs[name].focus();
    },
    moveLeft(str, n) {
      let name = "";
      name = str + n;
      this.$refs[name].focus();
    },
    moveUp(str, n) {
      let name = "";
      if (n > 0) {
        name = str + String(n - 1);
      } else {
        name = str + n;
      }
      this.$refs[name].focus();
    },
    moveDown(str, n) {
      let name = "";
      if (n < this.fromData.domains.length - 1) {
        name = str + String(n + 1);
      } else {
        name = str + n;
      }
      this.$refs[name].focus();
    },
  },
};
</script>
<style scope>
  h1 {
    font-size: 24px;
    text-align: center;
    padding: 23px 0;
  }
</style>
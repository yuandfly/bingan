<!--观察室工作日志登记-->
<template>
  <div class="journal">
    <h1>观察室工作日志登记</h1>
    <!-- <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false"> -->
    <el-table :data="fromData.domains" stripe border show-summary>
      <el-table-column prop="kbmc" label="科别名称" width align="center"></el-table-column>
      <el-table-column prop="tjm4001" label="观察床位数" width align="center"></el-table-column>
      <el-table-column prop="tjm4002" label="原有病人数" width align="center">
        <!-- <template slot-scope="scope"> -->
        <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm4002'"
            :rules="fromaDataRules.tjm4002"
        >-->
        <!-- <el-input
            size="mini"
            v-model.number="scope.row.tjm4002"
            @keyup.native="scope.row.tjm4002=verifyNum(scope.row.tjm4002)"
        ></el-input>-->
        <!-- </el-form-item> -->
        <!-- </template> -->
      </el-table-column>
      <el-table-column prop="tjm4003" label="入室病人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm4003'"
            :rules="fromaDataRules.tjm4003"
          >-->
          <el-input
            :ref="'tjm4003'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm4003"
            @keyup.native="scope.row.tjm4003=verifyNum(scope.row.tjm4003)"
            @keydown.native.13="focus('tjm4004',scope.$index)"
            @keydown.native.37="moveLeft('tjm4003',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm4004',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjm4004" label="出室病人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm4004'"
            :rules="fromaDataRules.tjm4004"
          >-->
          <el-input
            :ref="'tjm4004'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm4004"
            @keyup.native="scope.row.tjm4004=verifyNum(scope.row.tjm4004)"
            @keydown.native.13="focus('tjm4005',scope.$index)"
            @keydown.native.37="moveLeft('tjm4003',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm4005',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column label="观察结果" align="center">
        <el-table-column prop="tjm4005" label="回家" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm4005'"
              :rules="fromaDataRules.tjm4005"
            >-->
            <el-input
              :ref="'tjm4005'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm4005"
              @keyup.native="scope.row.tjm4005=verifyNum(scope.row.tjm4005)"
              @keydown.native.13="focus('tjm4006',scope.$index)"
              @keydown.native.37="moveLeft('tjm4004',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm4006',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm4006" label="入院" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm4006'"
              :rules="fromaDataRules.tjm4006"
            >-->
            <el-input
              :ref="'tjm4006'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm4006"
              @keyup.native="scope.row.tjm4006=verifyNum(scope.row.tjm4006)"
              @keydown.native.13="focus('tjm4007',scope.$index)"
              @keydown.native.37="moveLeft('tjm4005',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm4007',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm4007" label="死亡" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm4007'"
              :rules="fromaDataRules.tjm4007"
            >-->
            <el-input
              :ref="'tjm4007'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm4007"
              @keyup.native="scope.row.tjm4007=verifyNum(scope.row.tjm4007)"
              @keydown.native.13="focus('tjm4009',scope.$index)"
              @keydown.native.37="moveLeft('tjm4006',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm4009',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="tjm4008" label="留室病人数" width align="center">
        <template
          slot-scope="scope"
        >{{Number(scope.row.tjm4002 ? scope.row.tjm4002:0)+Number(scope.row.tjm4003 ? scope.row.tjm4003:0)-Number(scope.row.tjm4004 ? scope.row.tjm4004:0)}}</template>
      </el-table-column>
      <el-table-column prop="tjm4009" label="抢救人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm4009'"
            :rules="fromaDataRules.tjm4009"
          >-->
          <el-input
            :ref="'tjm4009'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm4009"
            @keyup.native="scope.row.tjm4009=verifyNum(scope.row.tjm4009)"
            @keydown.native.13="focus('tjm4010',scope.$index)"
            @keydown.native.37="moveLeft('tjm4007',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm4010',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjm4010" label="出室病人占床天数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
            style="margin-bottom:0"
            :prop="'domains.'+scope.$index+'.tjm4010'"
            :rules="fromaDataRules.tjm4010"
          >-->
          <el-input
            :ref="'tjm4010'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjm4010"
            @keyup.native="scope.row.tjm4010=verifyNum(scope.row.tjm4010)"
            @keydown.native.13="focus('tjm4003',scope.$index)"
            @keydown.native.37="moveLeft('tjm4009',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjm4010',scope.$index)"
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
import { getListByTjm4rq } from "@/api";
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
    getTableData() {
      // let obj = {};
      // obj.domains = this.fromData.domains;
      // this.$refs["from"].validate(val => {
      //   obj.flag = val;
      // });
      return this.fromData.domains;
    },
    getTableList() {
      getListByTjm4rq({ tjm4rq: this.dateList.date }).then((res) => {
        if (res.code === 0) {
          this.fromData.domains = res.data;
          console.log(this.fromData.domains);
          // showOkMsg(res.msg);
        }
      });
    },
    focus(str, n) {
      let name = "";
      if (str === "tjm4003") {
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

<style scoped>
</style>
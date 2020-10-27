<!--门急观工作日志登记-->
<template>
  <div class="journal">
    <h1>门急观工作日志登记</h1>
    <el-table :data="fromData.domains" stripe border  show-summary>
      <el-table-column prop="kbjc" label="科别名称" width align="center"></el-table-column>
      <el-table-column prop="f1" label="门诊人次" width align="center">
        <template slot-scope="scope">
          <el-input
            :ref="'f1'+scope.$index"
            size="mini"
            v-model.number="scope.row.f1"
            @keyup.native="scope.row.f1=verifyNum(scope.row.f1)"
            @keydown.native.13="focus('f2',scope.$index)"
            @keydown.native.37="moveLeft('f1',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('f2',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label align="center">
        <el-table-column prop="f2" label="计" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'f2'+scope.$index"
              size="mini"
              v-model.number="scope.row.f2"
              @keyup.native="scope.row.f2=verifyNum(scope.row.f2)"
              @keydown.native.13="focus('f3',scope.$index)"
              @keydown.native.37="moveLeft('f1',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('f3',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="急诊人次" width align="center">
        <el-table-column label="其中" width align="center">
          <el-table-column prop="f3" label="抢救人次" width align="center">
            <template slot-scope="scope">
              <el-input
                :ref="'f3'+scope.$index"
                size="mini"
                v-model.number="scope.row.f3"
                @keyup.native="scope.row.f3=verifyNum(scope.row.f3)"
                @keydown.native.13="focus('f4',scope.$index)"
                @keydown.native.37="moveLeft('f2',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('f4',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="f4" label="抢救成功人次" width align="center">
            <template slot-scope="scope">
              <el-input
                :ref="'f4'+scope.$index"
                size="mini"
                v-model.number="scope.row.f4"
                @keyup.native="scope.row.f4=verifyNum(scope.row.f4)"
                @keydown.native.13="focus('f5',scope.$index)"
                @keydown.native.37="moveLeft('f3',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('f5',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="观察室" width align="center">
        <el-table-column prop="f5" label="编制床位" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'f5'+scope.$index"
              size="mini"
              v-model.number="scope.row.f5"
              @keyup.native="scope.row.f5=verifyNum(scope.row.f5)"
              @keydown.native.13="focus('f6',scope.$index)"
              @keydown.native.37="moveLeft('f4',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('f6',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="f6" label="原有人数" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'f6'+scope.$index"
              size="mini"
              v-model.number="scope.row.f6"
              @keyup.native="scope.row.f6=verifyNum(scope.row.f6)"
              @keydown.native.13="focus('f7',scope.$index)"
              @keydown.native.37="moveLeft('f5',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('f7',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="f7" label="入室人数" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'f7'+scope.$index"
              size="mini"
              v-model.number="scope.row.f7"
              @keyup.native="scope.row.f7=verifyNum(scope.row.f7)"
              @keydown.native.13="focus('f8',scope.$index)"
              @keydown.native.37="moveLeft('f6',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('f8',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="出室人数" align="center">
          <el-table-column prop="f8" label="计" width align="center">
            <template slot-scope="scope">
              <el-input
                :ref="'f8'+scope.$index"
                size="mini"
                v-model.number="scope.row.f8"
                @keyup.native="scope.row.f8=verifyNum(scope.row.f8)"
                @keydown.native.13="focus('f9',scope.$index)"
                @keydown.native.37="moveLeft('f7',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('f9',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="f9" label="其中：死亡" width align="center">
            <template slot-scope="scope">
              <el-input
                :ref="'f9'+scope.$index"
                size="mini"
                v-model.number="scope.row.f9"
                @keyup.native="scope.row.f9=verifyNum(scope.row.f9)"
                @keydown.native.13="focus('f10',scope.$index)"
                @keydown.native.37="moveLeft('f8',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('f10',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="f10" label="现有人数" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'f10'+scope.$index"
              size="mini"
              v-model.number="scope.row.f10"
              @keyup.native="scope.row.f10=verifyNum(scope.row.f10)"
              @keydown.native.13="focus('f1',scope.$index)"
              @keydown.native.37="moveLeft('f9',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('f10',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { selectTjm234 } from "@/api";
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
    getTableList() {
      selectTjm234({
        rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.fromData.domains = res.data;

         // console.log("+", this.fromData.domains);
          showOkMsg(res.msg);

        }
      });
    },
    getTableData() {
      return this.fromData.domains;
    },
    focus(str, n) {
      let name = "";
      if (str === "f1") {
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
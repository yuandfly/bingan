<!--家庭病床工作日志登记-->
<template>
  <div class="journal">
    <h1>家庭病床工作日志登记</h1>
    <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false">
      <el-table :data="fromData.domains">
        <el-table-column prop="dmmc" label="科别名称" width align="center"></el-table-column>
        <el-table-column prop="tjm5002" label="原有人数" width align="center">
          <template slot-scope="scope">{{scope.row.tjm5002}}</template>
        </el-table-column>
        <el-table-column prop="tjm5003" label="本日新增人数" width align="center">
          <template slot-scope="scope">
            <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm5003'"
              :rules="fromaDataRules.tjm5003"
            >
              <el-input
                :ref="'tjm5003'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm5003"
                @keyup.native="scope.row.tjm5003=verifyNum(scope.row.tjm5003)"
                @keydown.native.13="focus('tjm5004',scope.$index)"
                @keydown.native.37="moveLeft('tjm5003',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm5004',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="撤床病人数" align="center">
          <el-table-column prop="tjm5004" label="小计" width align="center">
            <!-- <template
              slot-scope="scope"
            >{{Number(scope.row.tjm5005)+Number(scope.row.tjm5006)+Number(scope.row.tjm5007)+Number(scope.row.tjm5008)}}</template>-->
            <template slot-scope="scope">
              <el-input
                :ref="'tjm5004'+scope.$index"
                size="mini"
                v-model.number="sum"
                @keyup.native="scope.row.tjm5004=verifyNum(scope.row.tjm5004)"
                @keydown.native.13="focus('tjm5005',scope.$index)"
                @keydown.native.37="moveLeft('tjm5003',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm5005',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="tjm5005" label="治愈" width align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm5005'"
                :rules="fromaDataRules.tjm5005"
              >
                <el-input
                  :ref="'tjm5005'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm5005"
                  @keyup.native="scope.row.tjm5005=verifyNum(scope.row.tjm5005)"
                  @keydown.native.13="focus('tjm5006',scope.$index)"
                  @keydown.native.37="moveLeft('tjm5003',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm5006',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="tjm5006" label="好转" width align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm5006'"
                :rules="fromaDataRules.tjm5006"
              >
                <el-input
                  :ref="'tjm5006'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm5006"
                  @keyup.native="scope.row.tjm5006=verifyNum(scope.row.tjm5006)"
                  @keydown.native.13="focus('tjm5007',scope.$index)"
                  @keydown.native.37="moveLeft('tjm5005',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm5007',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="tjm5007" label="未愈" width align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm5007'"
                :rules="fromaDataRules.tjm5007"
              >
                <el-input
                  :ref="'tjm5007'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm5007"
                  @keyup.native="scope.row.tjm5007=verifyNum(scope.row.tjm5007)"
                  @keydown.native.13="focus('tjm5008',scope.$index)"
                  @keydown.native.37="moveLeft('tjm5006',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm5008',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="tjm5008" label="死亡" width align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm5008'"
                :rules="fromaDataRules.tjm5008"
              >
                <el-input
                  :ref="'tjm5008'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm5008"
                  @keyup.native="scope.row.tjm5008=verifyNum(scope.row.tjm5008)"
                  @keydown.native.13="focus('tjm5010',scope.$index)"
                  @keydown.native.37="moveLeft('tjm5007',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm5010',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="tjm5009" label="留床人数" width align="center">
          <template slot-scope="scope">
            {{Number(scope.row.tjm5002 ? scope.row.tjm5002 :0)+Number(scope.row.tjm5003? scope.row.tjm5003 :0)-Number(scope.row.tjm5005 ? scope.row.tjm5005:0)-Number(scope.row.tjm5006 ? scope.row.tjm5006:0)-Number(scope.row.tjm5007 ? scope.row.tjm5007:0)-Number(scope.row.tjm5008 ? scope.row.tjm5008:0)}}
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm5009'"
              :rules="fromaDataRules.tjm5009"
            >
              <el-input
                v-model.number="scope.row.tjm5009"
                @keyup.native="scope.row.tjm5009=verifyNum(scope.row.tjm5009)"
              ></el-input>
            </el-form-item>-->
          </template>
        </el-table-column>
        <el-table-column prop="tjm5010" label="撤床病人占用床日数" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'tjm5010'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm5010"
              @keyup.native="scope.row.tjm5010=verifyNum(scope.row.tjm5010)"
              @keydown.native.13="focus('tjm5011',scope.$index)"
              @keydown.native.37="moveLeft('tjm5008',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm5011',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="tjm5011" label="赴家庭床诊疗人次数" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'tjm5011'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm5011"
              @keyup.native="scope.row.tjm5011=verifyNum(scope.row.tjm5011)"
              @keydown.native.13="focus('tjm5001',scope.$index)"
              @keydown.native.37="moveLeft('tjm5010',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm5001',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="tjm5001" label="撤床病人诊疗人次数" width align="center">
          <template slot-scope="scope">
            <el-input
              :ref="'tjm5001'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm5001"
              @keyup.native="scope.row.tjm5001=verifyNum(scope.row.tjm5001)"
              @keydown.native.13="focus('tjm5003',scope.$index)"
              @keydown.native.37="moveLeft('tjm5011',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm5001',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { getTjm5List } from "@/api";
import { showOkMsg } from "@/utils/index.js";

export default {
  data() {
    const valdityNum = (rule, value, callback) => {
      let i = Number(rule.field.split(".")[1]);
      if (
        Number(this.fromData.domains[i].tjm5002) +
          Number(this.fromData.domains[i].tjm5003) ===
        Number(this.fromData.domains[i].tjm5005) +
          Number(this.fromData.domains[i].tjm5006) +
          Number(this.fromData.domains[i].tjm5007) +
          Number(this.fromData.domains[i].tjm5008) +
          Number(this.fromData.domains[i].tjm5009)
      ) {
        callback();
        this.$refs.from.clearValidate();
      } else {
        callback(
          new Error("原有人数+本日新增人数 应等于 撤床病人数小计+留床人数")
        );
      }
    };
    return {
      fromData: {
        domains: [],
      },
      sum: 0,
      fromaDataRules: {
        tjm5002: [{ trigger: ["change"], validator: valdityNum }],
        tjm5003: [{ trigger: ["change"], validator: valdityNum }],
        tjm5005: [{ trigger: ["change"], validator: valdityNum }],
        tjm5006: [{ trigger: ["change"], validator: valdityNum }],
        tjm5007: [{ trigger: ["change"], validator: valdityNum }],
        tjm5008: [{ trigger: ["change"], validator: valdityNum }],
        // tjm5009: [{ trigger: ["change"], validator: valdityNum }]
      },
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  watch: {
    // "fromData.domains": {
    //   deep: true,
    //   handler(val) {
    //     this.sum =
    //       Number(val[0].tjm5005) +
    //       Number(val[0].tjm5006) +
    //       Number(val[0].tjm5007) +
    //       Number(val[0].tjm5008);
    //   },
    // },
  },
  methods: {
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    getTableList() {
      getTjm5List({
        tjm5rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          if (res.data) {
            this.fromData.domains = res.data;
            this.sum = res.data[0].tjm5004 ? res.data[0].tjm5004 : 0;
            this.fromData.domains.forEach((ele) => {
              ele.tjm5rq = this.dateList.date;
              ele.tjm5002 = ele.tjm5002 ? ele.tjm5002 : 0;
              ele.tjm5003 = ele.tjm5003 ? ele.tjm5003 : 0;
              ele.tjm5005 = ele.tjm5005 ? ele.tjm5005 : 0;
              ele.tjm5006 = ele.tjm5006 ? ele.tjm5006 : 0;
              ele.tjm5007 = ele.tjm5007 ? ele.tjm5007 : 0;
              ele.tjm5008 = ele.tjm5008 ? ele.tjm5008 : 0;
              ele.tjm5009 = ele.tjm5009 ? ele.tjm5009 : 0;
            });
            // showOkMsg(res.msg);
          }
        }
      });
    },
    getTableData() {
      let obj = {};
      this.fromData.domains[0].tjm5004 = this.sum;
      obj.domains = this.fromData.domains;
      this.$refs.from.validate((val) => {
        obj.flag = val;
      });
      return obj;
    },
    focus(str, n) {
      let name = "";
      if (str === "tjm5003") {
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
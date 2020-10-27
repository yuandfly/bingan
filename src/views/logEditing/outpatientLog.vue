<!--门诊日志-->
<template>
  <div class="journal">
    <h1>门诊工作日志登记</h1>
    <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false">
      <el-table :data="fromData.domains" stripe border  show-summary>
        <el-table-column prop="kbmc" label="科别名称" align="center" width="110"></el-table-column>
        <el-table-column label="门诊人次" align="center">
          <el-table-column prop="tjm2009" label="计" align="center">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2009'"
                :rules="fromaDataRules.tjm2009"
              >
                <el-input
                  :ref="'tjm2009'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm2009"
                  @keyup.native="scope.row.tjm2009=verifyNum(scope.row.tjm2009)"
                  @keydown.native.37="moveLeft('tjm2009',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm2010',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                  @keydown.native.13="focus('tjm2010',scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="其中" align="center">
            <el-table-column prop="tjm2010" label="专科" align="center">
              <template slot-scope="scope">
                <el-input
                  :ref="'tjm2010'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm2010"
                  @keyup.native="scope.row.tjm2010=verifyNum(scope.row.tjm2010)"
                  @keydown.native.37="moveLeft('tjm2009',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm2011',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                  @keydown.native.13="focus('tjm2011',scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="tjm2011" label="专家" align="center">
              <template slot-scope="scope">
                <!-- <el-form-item
                  style="margin-bottom:0"
                  :prop="'domains.'+scope.$index+'.tjm2011'"
                  :rules="fromaDataRules.tjm2011"
                >-->
                <el-input
                  :ref="'tjm2011'+scope.$index"
                  size="mini"
                  v-model.number="scope.row.tjm2011"
                  @keyup.native="scope.row.tjm2011=verifyNum(scope.row.tjm2011)"
                  @keydown.native.13="focus('tjm2017',scope.$index)"
                  @keydown.native.37="moveLeft('tjm2010',scope.$index)"
                  @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                  @keydown.native.39="moveRight('tjm2017',scope.$index)"
                  @keydown.native.40="moveDown(scope.column.property,scope.$index)"
                ></el-input>
                <!-- </el-form-item> -->
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="tjm2017" label="其中医保" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2017'"
                :rules="fromaDataRules.tjm2017"
              >-->
              <el-input
                :ref="'tjm2017'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm2017"
                @keyup.native="scope.row.tjm2017=verifyNum(scope.row.tjm2017)"
                @keydown.native.13="focus('tjm2012',scope.$index)"
                @keydown.native.37="moveLeft('tjm2011',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2012',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="tjm2012" label="急诊" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm2012'"
              :rules="fromaDataRules.tjm2012"
            >-->
            <el-input
              :ref="'tjm2012'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm2012"
              @keyup.native="scope.row.tjm2012=verifyNum(scope.row.tjm2012)"
              @keydown.native.13="focus('tjm2013',scope.$index)"
              @keydown.native.37="moveLeft('tjm2017',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm2013',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm2013" label="会诊" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm2013'"
              :rules="fromaDataRules.tjm2013"
            >-->
            <el-input
              :ref="'tjm2013'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm2013"
              @keyup.native="scope.row.tjm2013=verifyNum(scope.row.tjm2013)"
              @keydown.native.13="focus('tjm2014',scope.$index)"
              @keydown.native.37="moveLeft('tjm2012',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm2014',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>

        <el-table-column prop="tjm2014" label="出诊" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm2014'"
              :rules="fromaDataRules.tjm2014"
            >-->
            <el-input
              :ref="'tjm2014'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm2014"
              @keyup.native="scope.row.tjm2014=verifyNum(scope.row.tjm2014)"
              @keydown.native.13="focus('tjm2015',scope.$index)"
              @keydown.native.37="moveLeft('tjm2013',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm2015',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm2015" label="单项健康检查" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm2015'"
              :rules="fromaDataRules.tjm2015"
            >-->
            <el-input
              :ref="'tjm2015'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm2015"
              @keyup.native="scope.row.tjm2015=verifyNum(scope.row.tjm2015)"
              @keydown.native.13="focus('tjm2016',scope.$index)"
              @keydown.native.37="moveLeft('tjm2014',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm2016',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm2016" label="手术数" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm2016'"
              :rules="fromaDataRules.tjm2016"
            >-->
            <el-input
              :ref="'tjm2016'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm2016"
              @keyup.native="scope.row.tjm2016=verifyNum(scope.row.tjm2016)"
              @keydown.native.13="focus('tjm2018',scope.$index)"
              @keydown.native.37="moveLeft('tjm2015',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm2018',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjm2018" label="预约数" align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjm2018'"
              :rules="fromaDataRules.tjm2018"
            >-->
            <el-input
              :ref="'tjm2018'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjm2018"
              @keyup.native="scope.row.tjm2018=verifyNum(scope.row.tjm2018)"
              @keydown.native.13="focus('tjm2005',scope.$index)"
              @keydown.native.37="moveLeft('tjm2016',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjm2005',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column label="正副主任医师" align="center">
          <el-table-column prop="tjm2005" label="人数" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2005'"
                :rules="fromaDataRules.tjm2005"
              >-->
              <el-input
                :ref="'tjm2005'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm2005"
                @keyup.native="scope.row.tjm2005=verifyNum(scope.row.tjm2005)"
                @keydown.native.13="focus('tjm2001',scope.$index)"
                @keydown.native.37="moveLeft('tjm2018',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2001',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm2001" label="工时" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2001'"
                :rules="fromaDataRules.tjm2001"
              >-->
              <el-input
                :ref="'tjm2001'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm2001"
                @keyup.native="scope.row.tjm2001=verifyNum(scope.row.tjm2001)"
                @keydown.native.13="focus('tjm2006',scope.$index)"
                @keydown.native.37="moveLeft('tjm2005',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2006',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="主治医师" align="center">
          <el-table-column prop="tjm2006" label="人数" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2006'"
                :rules="fromaDataRules.tjm2006"
              >-->
              <el-input
                :ref="'tjm2006'+scope.$index"
                size="mini"
                v-model="scope.row.tjm2006"
                @keyup.native="scope.row.tjm2006=verifyNum(scope.row.tjm2006)"
                @keydown.native.13="focus('tjm2002',scope.$index)"
                @keydown.native.37="moveLeft('tjm2001',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2002',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm2002" label="工时" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2002'"
                :rules="fromaDataRules.tjm2002"
              >-->
              <el-input
                :ref="'tjm2002'+scope.$index"
                size="mini"
                v-model="scope.row.tjm2002"
                @keyup.native="scope.row.tjm2002=verifyNum(scope.row.tjm2002)"
                @keydown.native.13="focus('tjm2007',scope.$index)"
                @keydown.native.37="moveLeft('tjm2006',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2007',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="医师医士" align="center">
          <el-table-column prop="tjm2007" label="人数" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2007'"
                :rules="fromaDataRules.tjm2007"
              >-->
              <el-input
                :ref="'tjm2007'+scope.$index"
                size="mini"
                v-model="scope.row.tjm2007"
                @keyup.native="scope.row.tjm2007=verifyNum(scope.row.tjm2007)"
                @keydown.native.13="focus('tjm2003',scope.$index)"
                @keydown.native.37="moveLeft('tjm2002',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2003',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm2003" label="工时" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2003'"
                :rules="fromaDataRules.tjm2003"
              >-->
              <el-input
                :ref="'tjm2003'+scope.$index"
                size="mini"
                v-model="scope.row.tjm2003"
                @keyup.native="scope.row.tjm2003=verifyNum(scope.row.tjm2003)"
                @keydown.native.13="focus('tjm2008',scope.$index)"
                @keydown.native.37="moveLeft('tjm2007',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2008',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="进修实习人员" align="center">
          <el-table-column prop="tjm2008" label="人数" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2008'"
                :rules="fromaDataRules.tjm2008"
              >-->
              <el-input
                :ref="'tjm2008'+scope.$index"
                size="mini"
                v-model="scope.row.tjm2008"
                @keyup.native="scope.row.tjm2008=verifyNum(scope.row.tjm2008)"
                @keydown.native.13="focus('tjm2004',scope.$index)"
                @keydown.native.37="moveLeft('tjm2003',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2004',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm2004" label="工时" align="center">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm2004'"
                :rules="fromaDataRules.tjm2004"
              >-->
              <el-input
                :ref="'tjm2004'+scope.$index"
                size="mini"
                v-model="scope.row.tjm2004"
                @keyup.native="scope.row.tjm2004=verifyNum(scope.row.tjm2004)"
                @keydown.native.13="focus('tjm2009',scope.$index)"
                @keydown.native.37="moveLeft('tjm2008',scope.$index)"
                @keydown.native.38="moveUp(scope.column.property,scope.$index)"
                @keydown.native.39="moveRight('tjm2004',scope.$index)"
                @keydown.native.40="moveDown(scope.column.property,scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="查看" width="84" align="center">
          <template slot-scope="scope" v-if="scope.$index!=39">
            <!-- <el-button size="mini" @click="workload(scope.row)" type="primary">医师工作量</el-button> -->
            <el-link type="primary" @click="workload(scope.row)">医师工作量</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <!-- <el-button-group>
      <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
      <el-button type="primary">
        下一页
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>-->
    <workloadBox :dateList="dateList" ref="dialog"></workloadBox>
  </div>
</template>

<script>
import InputItem from "../homepage/components/input-item";
import { getTjm2List } from "@/api";
import { showOkMsg } from "@/utils/index.js";
import workloadBox from "@/views/logEditing/workloadBox.vue";

export default {
  data() {
    const valdityNum = (rule, value, callback) => {
      let i = Number(rule.field.split(".")[1]);
      if (
        Number(this.fromData.domains[i].tjm2009) >=
          Number(this.fromData.domains[i].tjm2010) ||
        Number(this.fromData.domains[i].tjm2009) >=
          Number(this.fromData.domains[i].tjm2011) ||
        Number(this.fromData.domains[i].tjm2009) >=
          Number(this.fromData.domains[i].tjm2017)
      ) {
        callback();
      } else {
        callback(new Error("门诊人次“计”不能小于“专科”、“专家”或“医保”等单项"));
      }
    };
    return {
      fromData: {
        domains: [],
      },
      flag: true,
      fromaDataRules: {
        tjm2009: [{ trigger: ["change"], validator: valdityNum }],
      },
      holidayFlag: 0,
      domains: [],
    };
  },
  created() {
    this.getTableList();
  },
  components: {
    workloadBox,
    InputItem,
  },
  props: ["dateList"],
  methods: {
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    // sum(zk, zj, yb) {
    //   if (
    //     /(^[0-9]\d*$)/.test(zk) &&
    //     /(^[0-9]\d*$)/.test(zj) &&
    //     /(^[0-9]\d*$)/.test(yb)
    //   )
    //     return zk + zj + yb;
    // },
    getTableData() {
      let obj = {};
      obj.domains = this.fromData.domains;
      this.$refs["from"].validate((val) => {
        obj.flag = val;
      });
      return obj;
    },
    getTableList() {
      getTjm2List({
        tjm2rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.fromData.domains = res.data;

          if (res.data) {
            this.holidayFlag = res.data[0].tjm2jr ? 1 : 0;
          } else this.holidayFlag = 0;
          this.$emit("fun", this.holidayFlag, this.fromData.domains);
          // showOkMsg(res.msg);
        }
      });
    },
    workload(row) {
      this.$refs.dialog.showBox(row);
    },
    focus(str, n) {
      let name = "";
      if (str === "tjm2009") {
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
h1 {
  font-size: 24px;
  text-align: center;
  padding: 23px 0;
}
</style>
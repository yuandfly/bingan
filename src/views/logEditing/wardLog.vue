
<!--住院工作日志登记-->
<template>
  <div class="journal">
    <h1>住院工作日志登记</h1>
    <!-- <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false"> -->
    <el-table :data="fromData.domains" stripe border  show-summary>
      <el-table-column prop="kbmc" label="科别名称" width="120" align="center"></el-table-column>
      <el-table-column prop="tjz1001" label="实际开放病床" width align="center">
        <!-- <template slot-scope="scope">  -->
        <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1001'"
              :rules="fromaDataRules.tjz1001"
        >-->
        <!-- <el-input
            v-model.number="scope.row.tjz1001"
            @keyup.native="scope.row.tjz1001=verifyNum(scope.row.tjz1001)"
        ></el-input>-->
        <!--   </el-form-item>
        </template>-->
      </el-table-column>
      <el-table-column prop="tjz1002" label="原有人数" width align="center">
        <!-- <template slot-scope="scope"> -->
        <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1002'"
              :rules="fromaDataRules.tjz1002"
        >-->
        <!-- <el-input
            v-model.number="scope.row.tjz1002"
            @keyup.native="scope.row.tjz1002=verifyNum(scope.row.tjz1002)"
        ></el-input>-->
        <!-- </el-form-item> -->
        <!-- </template> -->
      </el-table-column>

      <el-table-column prop="tjz1003" label="入院人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1003'"
              :rules="fromaDataRules.tjz1003"
          >-->
          <el-input
            :ref="'tjz1003'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1003"
            @change="setLYRS(scope.row)"
            @keyup.native="scope.row.tjz1003=verifyNum(scope.row.tjz1003)"
            @keydown.native.13="focus('tjz1004',scope.$index)"
            @keydown.native.37="moveLeft('tjz1003',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1004',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1004" label="他科转入" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1004'"
              :rules="fromaDataRules.tjz1004"
          >-->
          <el-input
            :ref="'tjz1004'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1004"
            @change="setLYRS(scope.row)"
            @keyup.native="scope.row.tjz1004=verifyNum(scope.row.tjz1004)"
            @keydown.native.13="focus('tjz1005',scope.$index)"
            @keydown.native.37="moveLeft('tjz1003',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1005',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1005" label="出院人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1005'"
              :rules="fromaDataRules.tjz1005"
          >-->
          <el-input
            :ref="'tjz1005'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1005"
            @change="setLYRS(scope.row)"
            @keyup.native="scope.row.tjz1005=verifyNum(scope.row.tjz1005)"
            @keydown.native.13="focus('tjz1015',scope.$index)"
            @keydown.native.37="moveLeft('tjz1004',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1015',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1015" label="转往他科" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1015'"
              :rules="fromaDataRules.tjz1015"
          >-->
          <el-input
            :ref="'tjz1015'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1015"
            @change="setLYRS(scope.row)"
            @keyup.native="scope.row.tjz1015=verifyNum(scope.row.tjz1015)"
            @keydown.native.13="focus('tjz1007',scope.$index)"
            @keydown.native.37="moveLeft('tjz1005',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1007',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1016" label="留院人数" width align="center">
        <template slot-scope="scope">

          {{Number(scope.row.tjz1002 ? scope.row.tjz1002:0)+Number(scope.row.tjz1003 ? scope.row.tjz1003:0)+Number(scope.row.tjz1004 ? scope.row.tjz1004:0)-Number(scope.row.tjz1005 ? scope.row.tjz1005:0)-Number(scope.row.tjz1015 ? scope.row.tjz1015:0)}}
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1016'"
              :rules="fromaDataRules.tjz1016"
          >-->
          <!-- <el-input
            v-model.number="scope.row.tjz1016"
            @keyup.native="scope.row.tjz1016=verifyNum(scope.row.tjz1016)"
          ></el-input>-->
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column label="出院病人数" align="center">
        <el-table-column prop="tjz1007" label="治愈" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjz1007'"
                :rules="fromaDataRules.tjz1007"
            >-->
            <el-input
              :ref="'tjz1007'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjz1007"
              @keyup.native="scope.row.tjz1007=verifyNum(scope.row.tjz1007)"
              @keydown.native.13="focus('tjz1008',scope.$index)"
              @keydown.native.37="moveLeft('tjz1015',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjz1008',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjz1008" label="好转" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjz1008'"
                :rules="fromaDataRules.tjz1008"
            >-->
            <el-input
              :ref="'tjz1008'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjz1008"
              @keyup.native="scope.row.tjz1008=verifyNum(scope.row.tjz1008)"
              @keydown.native.13="focus('tjz1009',scope.$index)"
              @keydown.native.37="moveLeft('tjz1007',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjz1009',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjz1009" label="未愈" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjz1009'"
                :rules="fromaDataRules.tjz1009"
            >-->
            <el-input
              :ref="'tjz1009'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjz1009"
              @keyup.native="scope.row.tjz1009=verifyNum(scope.row.tjz1009)"
              @keydown.native.13="focus('tjz1010',scope.$index)"
              @keydown.native.37="moveLeft('tjz1008',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjz1010',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
        <el-table-column prop="tjz1010" label="死亡" width align="center">
          <template slot-scope="scope">
            <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjz1010'"
                :rules="fromaDataRules.tjz1010"
            >-->
            <el-input
              :ref="'tjz1010'+scope.$index"
              size="mini"
              v-model.number="scope.row.tjz1010"
              @keyup.native="scope.row.tjz1010=verifyNum(scope.row.tjz1010)"
              @keydown.native.13="focus('tjz1020',scope.$index)"
              @keydown.native.37="moveLeft('tjz1009',scope.$index)"
              @keydown.native.38="moveUp(scope.column.property,scope.$index)"
              @keydown.native.39="moveRight('tjz1020',scope.$index)"
              @keydown.native.40="moveDown(scope.column.property,scope.$index)"
            ></el-input>
            <!-- </el-form-item> -->
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="tjz1020" label="24小时内死亡" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1020'"
              :rules="fromaDataRules.tjz1020"
          >-->
          <el-input
            :ref="'tjz1020'+scope.$index"
            size="mini"
            v-model="scope.row.tjz1020"
            @keyup.native="scope.row.tjz1020=verifyNum(scope.row.tjz1020)"
            @keydown.native.13="focus('tjz1014',scope.$index)"
            @keydown.native.37="moveLeft('tjz1010',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1014',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1014" label="其他" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1014'"
              :rules="fromaDataRules.tjz1014"
          >-->
          <el-input
            :ref="'tjz1014'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1014"
            @keyup.native="scope.row.tjz1014=verifyNum(scope.row.tjz1014)"
            @keydown.native.13="focus('tjz1017',scope.$index)"
            @keydown.native.37="moveLeft('tjz1020',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1017',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1017" label="出院者占用总床日数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1017'"
              :rules="fromaDataRules.tjz1017"
          >-->
          <el-input
            :ref="'tjz1017'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1017"
            @keyup.native="scope.row.tjz1017=verifyNum(scope.row.tjz1017)"
            @keydown.native.13="focus('tjz1021',scope.$index)"
            @keydown.native.37="moveLeft('tjz1014',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1021',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1021" label="本日手术人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1021'"
              :rules="fromaDataRules.tjz1021"
          >-->
          <el-input
            :ref="'tjz1021'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1021"
            @keyup.native="scope.row.tjz1021=verifyNum(scope.row.tjz1021)"
            @keydown.native.13="focus('tjz1023',scope.$index)"
            @keydown.native.37="moveLeft('tjz1017',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1023',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1023" label="本日一级护理" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1023'"
              :rules="fromaDataRules.tjz1023"
          >-->
          <el-input
            :ref="'tjz1023'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1023"
            @keyup.native="scope.row.tjz1023=verifyNum(scope.row.tjz1023)"
            @keydown.native.13="focus('tjz1019',scope.$index)"
            @keydown.native.37="moveLeft('tjz1021',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1019',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1019" label="陪伴人数" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1019'"
              :rules="fromaDataRules.tjz1019"
          >-->
          <el-input
            :ref="'tjz1019'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1019"
            @keyup.native="scope.row.tjz1019=verifyNum(scope.row.tjz1019)"
            @keydown.native.13="focus('tjz1018',scope.$index)"
            @keydown.native.37="moveLeft('tjz1023',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1018',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1018" label="危重病人" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1018'"
              :rules="fromaDataRules.tjz1018"
          >-->
          <el-input
            :ref="'tjz1018'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1018"
            @keyup.native="scope.row.tjz1018=verifyNum(scope.row.tjz1018)"
            @keydown.native.13="focus('tjz1012',scope.$index)"
            @keydown.native.37="moveLeft('tjz1019',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1012',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1012" label="正常分娩" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1012'"
              :rules="fromaDataRules.tjz1012"
          >-->
          <el-input
            :ref="'tjz1012'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1012"
            @keyup.native="scope.row.tjz1012=verifyNum(scope.row.tjz1012)"
            @keydown.native.13="focus('tjz1013',scope.$index)"
            @keydown.native.37="moveLeft('tjz1018',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1013',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
      <el-table-column prop="tjz1013" label="计划生育" width align="center">
        <template slot-scope="scope">
          <!-- <el-form-item
              style="margin-bottom:0"
              :prop="'domains.'+scope.$index+'.tjz1013'"
              :rules="fromaDataRules.tjz1013"
          >-->
          <el-input
            :ref="'tjz1013'+scope.$index"
            size="mini"
            v-model.number="scope.row.tjz1013"
            @keyup.native="scope.row.tjz1013=verifyNum(scope.row.tjz1013)"
            @keydown.native.13="focus('tjz1003',scope.$index)"
            @keydown.native.37="moveLeft('tjz1012',scope.$index)"
            @keydown.native.38="moveUp(scope.column.property,scope.$index)"
            @keydown.native.39="moveRight('tjz1013',scope.$index)"
            @keydown.native.40="moveDown(scope.column.property,scope.$index)"
          ></el-input>
          <!-- </el-form-item> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-form> -->

    <briefingBox ref="child" :dateList="this.dateList"></briefingBox>
  </div>
</template>

<script>
import { getTjz1List } from "@/api";
import { showOkMsg } from "@/utils/index.js";
import briefingBox from "@/views/logEditing/briefingBox.vue";

export default {
  data() {
    return {
      fromData: {
        domains: [],
      },
      dialogVisible: false,
      // fromaDataRules: {
      //   tjz1001: [{ trigger: ["change"] }],
      //   tjz1002: [{ trigger: ["change"] }],
      //   tjz1003: [{ trigger: ["change"] }],
      //   tjz1004: [{ trigger: ["change"] }],
      //   tjz1005: [{ trigger: ["change"] }],
      //   tjz1015: [{ trigger: ["change"] }],
      //   tjz1016: [{ trigger: ["change"] }],
      //   tjz1007: [{ trigger: ["change"] }],
      //   tjz1008: [{ trigger: ["change"] }],
      //   tjz1009: [{ trigger: ["change"] }],
      //   tjz1010: [{ trigger: ["change"] }],
      //   tjz1020: [{ trigger: ["change"] }],
      //   tjz1014: [{ trigger: ["change"] }],
      //   tjz1017: [{ trigger: ["change"] }],
      //   tjz1021: [{ trigger: ["change"] }],
      //   tjz1023: [{ trigger: ["change"] }],
      //   tjz1019: [{ trigger: ["change"] }],
      //   tjz1018: [{ trigger: ["change"] }],
      //   tjz1012: [{ trigger: ["change"] }],
      //   tjz1013: [{ trigger: ["change"] }]
      // }
    };
  },
  created() {
    this.getTableList();
  },
  components: {
    briefingBox,
  },
  props: ["dateList"],
  methods: {
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    setLYRS(row) {
      row.tjz1016 = Number(row.tjz1002 ? row.tjz1002:0)+Number(row.tjz1003 ? row.tjz1003:0)+Number(row.tjz1004 ? row.tjz1004:0)-Number(row.tjz1005 ? row.tjz1005:0)-Number(row.tjz1015 ? row.tjz1015:0)
      console.log(row);
    },
    getTableList() {
      getTjz1List({
        bz: this.dateList.record,
        tjz1rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.fromData.domains = res.data;
          console.log(this.fromData.domains);
          this.fromData.domains.forEach((row) => {
            row.tjz1016 = Number(row.tjz1002 ? row.tjz1002:0)+Number(row.tjz1003 ? row.tjz1003:0)+Number(row.tjz1004 ? row.tjz1004:0)-Number(row.tjz1005 ? row.tjz1005:0)-Number(row.tjz1015 ? row.tjz1015:0)
          })
          // showOkMsg(res.msg);
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
    setTableData(obj) {
      this.fromData.domains = obj;
    },
    changeVisible() {
      this.dialogVisible = true;
      this.$refs.child.showBox();
    },
    focus(str, n) {
      let name = "";
      if (str === "tjz1003") {
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

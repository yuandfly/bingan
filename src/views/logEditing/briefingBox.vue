<template>
  <div class="physician">
    <el-dialog title="出院人员情况编辑" width="55%" :visible.sync="dialogFormVisible">
      <h1>出院人员情况编辑</h1>
      <div class="lan">
        <div>
          <span>日期：{{dateList.date.split("-")[0]}} 年 {{dateList.date.split("-")[1]}} 月 {{dateList.date.split("-")[2]}} 日</span>
          <span style="margin-left: 14px">出院人数：{{total}}</span>
        </div>
        <div class="kb_dictionaries">
          <el-radio-group v-model="entering" @change="timeFrame">
            <el-radio label="0">显示当日数据</el-radio>
            <el-radio label="1">显示当月数据</el-radio>
          </el-radio-group>
        </div>
      </div>
      <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false">
        <el-table :data="fromData.domains" max-height="384" stripe border style="width: 100%">
          <el-table-column prop="baza23c" label="出院科别" width="154">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.baza23c'"
                :rules="fromaDataRules.baza23c"
              >
                <el-input
                  :ref="'baza23c'+scope.$index"
                  size="mini"
                  :value="scope.row.baza23c"
                  @keyup.native.32="handleOpenDictInput({},'departmentDict',scope)"
                  ref="scope.row.ysmc"
                  @keydown.native.115="clearDictInputValue"
                  @keydown.native.13="focus('baza01',scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="baza01" label="病案号" width="170">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.baza01'"
                :rules="fromaDataRules.baza01"
              >
                <el-input
                  :ref="'baza01'+scope.$index"
                  size="mini"
                  v-model="scope.row.baza01"
                  @keyup.native="scope.row.baza01=verifyNum(scope.row.baza01)"
                  @keydown.native.13="focus('baza02',scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="baza02" label="病人姓名" width="110">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.baza02'"
                :rules="fromaDataRules.baza02"
              >
                <el-input
                  v-model="scope.row.baza02"
                  size="mini"
                  :ref="'baza02'+scope.$index"
                  @keydown.native.13="focus('baza41',scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="baza24" label="入院日期" width="100">
            <template slot-scope="scope">{{verifyDate(scope.row.baza24)}}</template>
          </el-table-column>
          <el-table-column prop="baza27" label="出院日期" width="100">
            <template slot-scope="scope">{{verifyDate(scope.row.baza27)}}</template>
          </el-table-column>
          <el-table-column prop="baza41" label="转归" width="104">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.baza41"
                placeholder="请选择"
                size="mini"
                :ref="'baza41'+scope.$index"
                @keydown.native.13="focus('num',scope.$index)"
              >
                <el-option
                  v-for="item in gzOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="num" label="住院次数">
            <template slot-scope="scope">
              <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.num'"
                :rules="fromaDataRules.num"
              >
                <el-input
                  :ref="'num'+scope.$index"
                  size="mini"
                  v-model="scope.row.num"
                  @keyup.native="scope.row.num=verifyNum(scope.row.num)"
                  @keydown.native.13="focus('bazafa',scope.$index)"
                ></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="bazafa" label="入院情况" width="140">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.bazafa"
                placeholder="请选择"
                size="mini"
                :ref="'bazafa'+scope.$index"
                @keydown.native.13="focus('baza23c',scope.$index)"
              >
                <el-option
                  v-for="item in ryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="baza21c" label="入院科别" width="140"></el-table-column>
        </el-table>
      </el-form>
      <div class="page">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="dialogFormVisible = false">保 存</el-button>
      </div>
    </el-dialog>

    <DictInput
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />
  </div>
</template>

<script>
import { outPatientInfo } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";
import DictInput from "../../components/dialog/dict-input";

export default {
  data() {
    return {
      fromData: {
        domains: [],
      },
      dialogFormVisible: false,
      entering: "0",
      divisionObj: {},
      gzOptions: [
        { value: "1", label: "治愈" },
        { value: "2", label: "好转" },
        { value: "3", label: "未愈" },
        { value: "4", label: "死亡" },
        { value: "5", label: "其它" },
      ],
      ryOptions: [
        { value: "1", label: "有" },
        { value: "2", label: "临床未确定" },
        { value: "3", label: "情况不明" },
        { value: "4", label: "无" },
      ],
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      currentPage4: 1,
      pageNum: 1,
      pageSize: 15,
      total: 0,
      fromaDataRules: {},
    };
  },
  components: {
    DictInput,
  },
  props: ["dateList"],
  methods: {
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    verifyDate(str) {
      return String(str).split("T")[0];
    },
    showBox() {
      this.dialogFormVisible = true;
      this.leaveCondition();
    },
    leaveCondition() {
      outPatientInfo({
        limit: this.pageSize,
        page: this.pageNum,
        bz: Number(this.entering),
        tjz1rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.fromData.domains = res.data.content;
          this.total = res.data.total;
          showOkMsg(res.msg);
        }
      });
    },
    timeFrame(val) {
      this.entering = val;
      this.leaveCondition();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.leaveCondition();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.leaveCondition();
      console.log(`当前页: ${val}`);
    },
    // 打开代码录入
    handleOpenDictInput(item, type, obj) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
      this.divisionObj = obj;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      this.fromData.domains[this.divisionObj.$index].baza23c = row.dmmc;
      this.fromData.domains[this.divisionObj.$index].baza23 = row.dm;
    },
    // f4 清除科别的选择
    clearDictInputValue() {
      this.fromData.domains[this.divisionObj.$index].baza23c = undefined;
      this.fromData.domains[this.divisionObj.$index].baza23 = undefined;
    },
    focus(str, n) {
      let name = "";
      if (str === "baza23c") {
        if (n < this.fromData.domains.length - 1) n++;
        else n = 0;
      }
      name = str + n;
      this.$refs[name].focus();
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
}
.physician .lan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.physician .lan span {
  margin-right: 14px;
}
.kb_dictionaries {
  display: flex;
  align-items: center;
}
.page {
  display: flex;
  justify-content: center;
  margin-top: 14px;
}
</style>
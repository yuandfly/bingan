<template>
  <div class="physician">
    <el-dialog title="门诊医师工作量录入" :visible.sync="dialogFormVisible">
      <h1>门 诊 医 师 工 作 量 录 入</h1>
      <div class="lan">
        <div>
          <span>日期：{{dateList.date.split("-")[0]}} 年 {{dateList.date.split("-")[1]}} 月 {{dateList.date.split("-")[2]}} 日</span>
          <span>星期{{new Date(dateList.date).getDay()}}</span>
        </div>
        <div class="kb_dictionaries">
          <span>科别:</span>
          <el-input
            :value="kbName"
            placeholder="请输入内容"
            size="small"
            @keyup.native.32="handleOpenDictInput({},'departmentDict')"
            ref="kbName"
            @keydown.native.115="clearDictInputValue"
          ></el-input>
        </div>
      </div>
      <el-form :model="fromData" ref="from" :inline-message="true" :show-message="false">
        <el-table :data="fromData.domains" stripe border style="width: 100%">
          <el-table-column prop="ysmc" label="医师姓名" width="110">
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.ysmc'"
                :rules="fromaDataRules.ysmc"
              >-->
              <el-input
                :ref="'ysmc'+scope.$index"
                size="mini"
                :value="scope.row.ysmc"
                @keyup.native.32="handleOpenDictInput({},'doctorDict',scope)"
                ref="scope.row.ysmc"
                @keydown.native.115="clearDictInputValue"
                @keydown.native.13="focus('tjm1yszc',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1yszc" label="职称" align="center" width="104">
            <template slot-scope="scope">
              <el-form-item style="margin-bottom:0">
                <el-select
                  v-model="scope.row.tjm1yszc"
                  placeholder="请选择"
                  size="mini"
                  :ref="'tjm1yszc'+scope.$index"
                  @keydown.native.13="focus('tjm1001',scope.$index)"
                >
                  <el-option
                    v-for="item in levelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="tjm1001" label="工时" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1001'"
                :rules="fromaDataRules.tjm1001"
              >-->
              <el-input
                :ref="'tjm1001'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1001"
                @keyup.native="scope.row.tjm1001=verifyNum(scope.row.tjm1001)"
                @keydown.native.13="focus('tjm1002',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1002" label="门诊人次" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1002'"
                :rules="fromaDataRules.tjm1002"
              >-->
              <el-input
                :ref="'tjm1002'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1002"
                @keyup.native="scope.row.tjm1002=verifyNum(scope.row.tjm1002)"
                @keydown.native.13="focus('tjm1008',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1008" label="专科" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1008'"
                :rules="fromaDataRules.tjm1008"
              >-->
              <el-input
                :ref="'tjm1008'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1008"
                @keyup.native="scope.row.tjm1008=verifyNum(scope.row.tjm1008)"
                @keydown.native.13="focus('tjm1009',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1009" label="专家" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1009'"
                :rules="fromaDataRules.tjm1009"
              >-->
              <el-input
                :ref="'tjm1009'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1009"
                @keyup.native="scope.row.tjm1009=verifyNum(scope.row.tjm1009)"
                @keydown.native.13="focus('tjm1003',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1003" label="急诊" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1003'"
                :rules="fromaDataRules.tjm1003"
              >-->
              <el-input
                :ref="'tjm1003'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1003"
                @keyup.native="scope.row.tjm1003=verifyNum(scope.row.tjm1003)"
                @keydown.native.13="focus('tjm1007',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1007" label="出诊" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1007'"
                :rules="fromaDataRules.tjm1007"
              >-->
              <el-input
                :ref="'tjm1007'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1007"
                @keyup.native="scope.row.tjm1007=verifyNum(scope.row.tjm1007)"
                @keydown.native.13="focus('tjm1004',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1004" label="健康检查" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1004'"
                :rules="fromaDataRules.tjm1004"
              >-->
              <el-input
                :ref="'tjm1004'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1004"
                @keyup.native="scope.row.tjm1004=verifyNum(scope.row.tjm1004)"
                @keydown.native.13="focus('tjm1006',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1006" label="会诊" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1006'"
                :rules="fromaDataRules.tjm1006"
              >-->
              <el-input
                :ref="'tjm1006'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1006"
                @keyup.native="scope.row.tjm1006=verifyNum(scope.row.tjm1006)"
                @keydown.native.13="focus('tjm1005',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
          <el-table-column prop="tjm1005" label="手术数" align="center" width>
            <template slot-scope="scope">
              <!-- <el-form-item
                style="margin-bottom:0"
                :prop="'domains.'+scope.$index+'.tjm1005'"
                :rules="fromaDataRules.tjm1005"
              >-->
              <el-input
                :ref="'tjm1005'+scope.$index"
                size="mini"
                v-model.number="scope.row.tjm1005"
                @keyup.native="scope.row.tjm1005=verifyNum(scope.row.tjm1005)"
                @keydown.native.13="focus('ysmc',scope.$index)"
              ></el-input>
              <!-- </el-form-item> -->
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-button type="info" size="medium" @click="addRow">增 加</el-button>
        </div>
        <div>
          <el-button size="medium" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="medium" type="primary" @click="workloadSave">保 存</el-button>
        </div>
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
import DictInput from "../../components/dialog/dict-input";
import { getTjm1List, updateTjm1Batch } from "@/api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    // const valdityNum = (rule, value, callback) => {
    //   if (/(^[0-9]\d*$)/.test(value) || !value) {
    //     callback();
    //   } else {
    //     callback(new Error("请输入非负整数！"));
    //   }
    // };
    return {
      dialogFormVisible: false,
      kbName: "",
      kbCode: "",
      physicianObj: {},
      zdType: "",
      fromData: {
        domains: [],
      },
      levelOptions: [
        {
          value: null,
          label: "请选择",
        },
        {
          value: "1",
          label: "主任",
        },
        {
          value: "2",
          label: "主治",
        },
        {
          value: "3",
          label: "医师",
        },
        {
          value: "4",
          label: "实习",
        },
      ],
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      // fromaDataRules: {
      //   tjm1ysdm: [
      //     {
      //       required: true,
      //       message: "请填写医师姓名",
      //       trigger: ["change"]
      //     }
      //   ],
      //   tjm1001: [{ trigger: ["change"] }],
      //   tjm1002: [{ trigger: ["change"] }],
      //   tjm1008: [{ trigger: ["change"] }],
      //   tjm1009: [{ trigger: ["change"] }],
      //   tjm1003: [{ trigger: ["change"] }],
      //   tjm1007: [{ trigger: ["change"] }],
      //   tjm1004: [{ trigger: ["change"] }],
      //   tjm1006: [{ trigger: ["change"] }],
      //   tjm1005: [{ trigger: ["change"] }]
      // }
    };
  },
  components: {
    DictInput,
  },
  props: ["dateList"],
  methods: {
    showBox(row) {
      this.dialogFormVisible = true;
      getTjm1List({
        tjm1kb: row.tjm2kb,
        tjm1rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.kbName = row.kbmc;
          this.kbCode = row.tjm2kb;
          this.fromData.domains = res.data;
        }
      });
    },
    // verifyNum(ev, obj) {
    //   if (
    //     ev.keyCode != 8 &&
    //     (ev.keyCode < 48 || ev.keyCode > 57) &&
    //     (ev.keyCode < 96 || ev.keyCode > 105)
    //   ) {
    //     this.fromData.domains[obj.$index][
    //       obj.column.property
    //     ] = this.fromData.domains[obj.$index][obj.column.property].slice(0, -1);
    //   }
    // },
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    workloadSave() {
      // this.$refs["from"].validate(val => {
      //   if (val) {
      this.dialogFormVisible = false;
      updateTjm1Batch(this.fromData.domains).then((res) => {
        if (res.code === 0) {
          showOkMsg(res.msg);
        }
      });
      // } else showErrorMsg("输入数据有误，请正确输入数据!");
      // });
    },
    addRow() {
      let addObj = {};
      addObj.ysmc = "";
      addObj.tjm1yszc = "";
      addObj.tjm1ysdm = "";
      addObj.tjm1kb = this.kbCode;
      addObj.tjm1rq = this.dateList.date;
      this.fromData.domains.push(addObj);
    },
    // 打开代码录入
    handleOpenDictInput(item, type, obj) {
      const { name, dictType, dictField, range } = item;
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
      this.zdType = type;
      this.physicianObj = obj;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      if (this.zdType === "departmentDict") {
        this.kbName = row.dmmc;
        this.kbCode = row.dm;
      } else {
        let flag = true;
        this.fromData.domains.some((ele) => {
          if (ele.tjm1ysdm === row.dm) {
            flag = false;
            return;
          }
        });
        if (flag) {
          this.fromData.domains[this.physicianObj.$index].ysmc = row.dmmc;
          this.fromData.domains[this.physicianObj.$index].tjm1ysdm = row.dm;
        } else showErrorMsg("该医师已存在");
      }
    },
    // f4 清除科别的选择
    clearDictInputValue() {
      this.kbName = undefined;
      this.kbCode = undefined;
      this.fromData.domains[this.physicianObj.$index].ysmc = undefined;
      this.fromData.domains[this.physicianObj.$index].tjm1ysdm = undefined;
    },
    focus(str, n) {
      let name = "";
      if (str === "ysmc") {
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
.kb_dictionaries span {
  width: 54px;
}
.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>
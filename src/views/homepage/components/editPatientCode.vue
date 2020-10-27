<template>
  <div class="editPatientCode">
    <el-dialog title="修改病案号" :visible.sync="dialogTableVisible">
      <!-- <div class="con_block">
        <el-table
          :data="tableData"
          stripe
          border
          style="width: 100%"
          max-height="340"
          highlight-current-row
          @row-click="setPatientCode"
        >
          <el-table-column prop="baza02" label="姓名" align="center"></el-table-column>
          <el-table-column prop="baza00" label="病人唯一号" align="center" width="210"></el-table-column>
          <el-table-column prop="baza01" label="病案号" align="center" width="180"></el-table-column>
          <el-table-column prop="baza27" label="出院日期" align="center">
            <template slot-scope="scope">{{scope.row.baza27 ? scope.row.baza27.split("T")[0] :''}}</template>
          </el-table-column>
          <el-table-column prop="baza23Name" label="出院科别" align="center"></el-table-column>
        </el-table>
      </div>-->
      <el-row :gutter="4">
        <el-col :span="11">
          <div class="block">
            原病案号：{{firsthand}}
            <!-- <span>
              <el-input :value="firsthand" placeholder size="small"></el-input>
            </span>-->
          </div>
        </el-col>
        <el-col :span="13">
          <div class="block">
            <el-col :span="6">新病案号：</el-col>
            <el-col :span="5">
              <el-input v-model="newCodeyear" placeholder size="small" maxlength="4"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model="newCodeShort" placeholder size="small" maxlength="11"></el-input>
            </el-col>
            <el-col :span="5">
              <el-input v-model="newCodeTime" placeholder size="small" maxlength="5"></el-input>
            </el-col>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="editSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPatient, modifyBaza } from "../../../api";
import { showOkMsg, showErrorMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      dialogTableVisible: false,
      // tableData: [],
      firsthand: "",
      newCodeyear: "",
      newCodeShort: "",
      newCodeTime: "",
    };
  },
  props: ["list"],
  methods: {
    openBox(row) {
      this.dialogTableVisible = true;
      // this.tableData = [];
      // this.firsthand = '';
      // this.newCodeyear = "";
      // this.newCodeShort = "";
      // this.newCodeTime = "";
      // getPatient(row.baza00).then((res) => {
      //   if (res.code === 0) {
      //     this.tableData = res.data;
      //   }
      // });
      this.firsthand = row.baza00;
      this.newCodeyear = row.baza00.slice(0, 4);
      this.newCodeShort = row.baza00.slice(4, 15);
      this.newCodeTime = row.baza00.slice(15, 20);
    },
    // setPatientCode(row) {
    //   this.firsthand = row.baza00;
    //   this.newCodeyear = row.baza00.slice(0, 4);
    //   this.newCodeShort = row.baza00.slice(4, 15);
    //   this.newCodeTime = row.baza00.slice(15, 20);
    // },
    verify() {
      let flag = true;
      if (
        this.newCodeyear.length != 4 ||
        this.newCodeShort.length != 11 ||
        this.newCodeTime.length != 5
      ) {
        flag = false;
        showErrorMsg("请输入正确的病案号");
      }
      return flag;
    },
    editSave() {
      if (this.verify()) {
        modifyBaza({
          baza00: this.firsthand,
          newBaza00: this.newCodeyear + this.newCodeShort + this.newCodeTime,
        }).then((res) => {
          if (res.code === 0) {
            showOkMsg(res.msg);
            this.$emit("fun", this.list.pager, this.newCodeyear + this.newCodeShort + this.newCodeTime);
            this.dialogTableVisible = false;
          } else {
            showErrorMsg(res.msg);
          }
        });
        // this.dialogTableVisible = false;
      }
    },
  },
};
</script>

<style scoped>
h3 {
  padding-bottom: 10px;
}
.con_block {
  margin-bottom: 14px;
}
.block {
  height: 32px;
  display: flex;
  align-items: center;
}
</style>

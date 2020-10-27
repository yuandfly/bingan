<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :model="form" :inline="true">
        <el-form-item label="日期:">
          <el-date-picker
            v-model="form.date"
            type="date"
            size="small"
            placeholder="开始日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerData"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>星期{{ getWeek(new Date(this.form.date).getDay()) }}</el-form-item>
        <el-form-item v-if="$route.params.logName==='outpatientLog'">
          <el-checkbox v-model="form.holidays">是否节假日</el-checkbox>
        </el-form-item>
        <el-form-item v-if="$route.params.logName==='wardLog'">
          <el-radio-group v-model="form.record" @change="entering">
            <el-radio label="1">按住院科室录入</el-radio>
            <el-radio label="0">按病区录入</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="inquire">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="save">保存</el-button>
        </el-form-item>
        <el-form-item v-if="$route.params.logName==='wardLog'">
          <el-button class="btn" type="primary" size="small" @click="briefing">当日出院简况</el-button>
          <el-button class="btn" type="primary" size="small" @click="refresh">刷新当日信息</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="before">前一日</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="next">后一日</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="menu_bar">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/admin/homepage/rzbj/outpatientLog">门诊工作日志登记</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/wardLog">病室日志</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/emergencyLog">急诊日志</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/observeRoom">观察室日志</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/skillLog">医技日志</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/familyBedLog">家床日志</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/healthExamination">健康检查</el-menu-item>
        <el-menu-item index="/admin/homepage/rzbj/mjg">门急观日志</el-menu-item>
      </el-menu>
    </div>
    <keep-alive>

      <component :is="$route.params.logName" :dateList="this.form" ref="child" @fun="holiday"></component>
    </keep-alive>
    <!-- <workloadBox :dateList="this.form" ref="dialog"></workloadBox> -->
  </div>
</template>

<script>
import outpatientLog from "@/views/logEditing/outpatientLog.vue";
import wardLog from "@/views/logEditing/wardLog.vue";
import emergencyLog from "@/views/logEditing/emergencyLog.vue";
import observeRoom from "@/views/logEditing/observeRoom.vue";
import skillLog from "@/views/logEditing/skillLog.vue";
import familyBedLog from "@/views/logEditing/familyBedLog.vue";
import healthExamination from "@/views/logEditing/healthExamination.vue";
import mjg from "@/views/logEditing/mjg.vue";
// import workloadBox from "@/views/logEditing/workloadBox.vue";
import {
  yesterday,
  formatDate,
  showOkMsg,
  showErrorMsg,
} from "@/utils/index.js";
import {
  updateTjm2Batch,
  getTjm1List,
  updateTjz1Batch,
  saveData,
  tjm5Save,
  updateByTjm6rq,
  updateTjjcBatch,
  updateTjm4Batch,
  saveTjm234,
  flushData,
} from "@/api";

export default {
  components: {
    outpatientLog,
    wardLog,
    emergencyLog,
    observeRoom,
    skillLog,
    familyBedLog,
    healthExamination,
    mjg,
    // workloadBox
  },
  data() {
    return {
      form: {
        date: "",
        holidays: false,
        record: "1",
        tableHeight: 50,
      },
      flag: false,
      activeIndex: "/admin/homepage/rzbj/outpatientLog",
      pickerData: {
        disabledDate: (time) => {
          if (this.form.dateEnd) {
            return (
              time.getTime() > new Date(this.form.dateEnd).getTime() ||
              time.getTime() >= Date.now()
            );
          } else return time.getTime() >= Date.now();
        },
      },
    };
  },
  created() {
    this.beginningDate();
    this.getWeek(new Date(this.form.date).getDay());
    this.getHeight();
  },
  watch: {
    form: {
      immediate: true,
      deep: true,
      handler(newName, oldName) {
        this.flag = true;
      },
    },
    "$route.params.logName"(val) {
      this.beginningDate();
    },
  },
  methods: {
    beginningDate() {
      this.form.date = yesterday();
    },
    getWeek(val) {
      switch (val) {
        case 0: {
          return "日";
          break;
        }
        case 1: {
          return "一";
          break;
        }
        case 2: {
          return "二";
          break;
        }
        case 3: {
          return "三";
          break;
        }
        case 4: {
          return "四";
          break;
        }
        case 5: {
          return "五";
          break;
        }
        case 6: {
          return "六";
          break;
        }
      }
    },
    holiday(flag) {
      if (flag) this.form.holidays = true;
      else this.form.holidays = false;
    },
    inquire() {
      if (this.flag) {
        this.$refs.child.getTableList();
        this.flag = false;
      } else showErrorMsg("请勿重复点击");
    },
    save() {
      let objData = this.$refs.child.getTableData();
      if (this.$route.params.logName === "outpatientLog") {
        if (objData.flag) {
          objData.domains.forEach((element) => {
            element.tjm2jr = this.form.holidays ? "1" : "0";
          });
          updateTjm2Batch(objData.domains).then((res) => {
            if (res.code === 0) {
              this.$refs.child.getTableList();
            }
          });
        } else showErrorMsg("门诊人次“计”不能小于“专科”、“专家”或“医保”等单项");
      }
      if (this.$route.params.logName === "wardLog") {
        // if (objData.flag) {
        updateTjz1Batch(objData).then((res) => {
          if (res.code === 0) {
            this.$refs.child.getTableList();
          }
        });
        // } else showErrorMsg("输入数据有误，请正确输入数据!");
      }
      if (this.$route.params.logName === "emergencyLog") {
        // if (objData.flag) {
        saveData(objData).then((res) => {
          if (res.code === 0) {
            this.$refs.child.getTableList();
          }
        });
        // } else showErrorMsg("输入数据有误，请正确输入数据!");
      }
      if (this.$route.params.logName === "observeRoom") {
        updateTjm4Batch(objData).then((res) => {
          if (res.code === 0) {
            this.$refs.child.getTableList();
          }
        });
      }
      if (this.$route.params.logName === "skillLog") {
        updateTjjcBatch(objData).then((res) => {
          if (res.code === 0) {
            this.$refs.child.getTableList();
          }
        });
      }
      if (this.$route.params.logName === "familyBedLog") {
        if (objData.flag) {
          tjm5Save(objData.domains).then((res) => {
            if (res.code === 0) {
              this.$refs.child.getTableList();
            }
          });
        } else
          showErrorMsg("原有人数+本日新增人数 应等于 撤床病人数小计+留床人数");
      }
      if (this.$route.params.logName === "healthExamination") {
        updateByTjm6rq({
          tjm6001: objData.ordinary,
          tjm6002: objData.cadre,
          tjm6rq: this.form.date,
        }).then((res) => {
          if (res.code === 0) {
            this.$refs.child.getTableList();
          }
        });
      }
      if (this.$route.params.logName === "mjg") {
        objData.forEach((ele) => {
          ele.rq = this.form.date;
        });
        saveTjm234(objData).then((res) => {
          if (res.code === 0) {
            this.$refs.child.getTableList();
          }
        });
      }
    },
    entering() {
      this.$refs.child.getTableList();
    },
    briefing() {
      this.$refs.child.changeVisible();
    },
    before() {
      this.save();
      this.form.date = formatDate(
        new Date(new Date(this.form.date).getTime() - 24 * 60 * 60 * 1000),
        "YYYY-MM-DD"
      );
      this.$refs.child.getTableList();
    },
    next() {
      if (
        new Date(this.form.date).getTime() <
        Date.now() - 24 * 60 * 60 * 1000
      ) {
        this.save();
        this.form.date = formatDate(
          new Date(new Date(this.form.date).getTime() + 24 * 60 * 60 * 1000),
          "YYYY-MM-DD"
        );
        this.$refs.child.getTableList();
      } else showErrorMsg("日期不能超过今天");
    },
    refresh() {
      flushData({
        bz: this.form.record,
        tjz1rq: this.form.date,
      }).then((res) => {
        if (res.code === 0) {
          this.$refs.child.setTableData(res.data);
          showOkMsg(res.msg);
        }
      });
    },
    getHeight() {
      this.form.tableHeight = document.body.clientHeight - 262;
    },
    // workload() {
    //   this.$refs.dialog.showBox();
    // }
  },
};
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
.homepage {
  width: 100%;
  .topside {
    height: 60px;
    border-radius: 6px;
    background-color: #eee;
    padding-top: 10px;
    /deep/.el-input--mini .el-input__inner {
      width: 190px !important;
    }
    .el-form {
      margin-left: 50px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 200px;
    }
  }
}
.day {
  display: flex;
  padding: 14px 0;
}
.lan {
  display: flex;
  align-items: center;
  margin-right: 20px;
}
.lan span {
  width: 100px;
  font-size: 16px;
  text-align: right;
}
.treatmentSelect {
  width: 220px;
}
.date {
  margin-top: 20px;
}
.btn_lan {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.numInput {
  width: 90px;
}
.menu_bar {
  padding: 0 20px;
}
</style>

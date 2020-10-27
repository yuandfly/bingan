<template>
  <!-- 上边区域 -->
  <div class="topside">
    <el-form :model="form" :inline="true">
      <el-form-item label="执行年度">
        <el-date-picker
          ref="years"
          value-format="yyyy"
          v-model="form.years"
          type="year"
          size="mini"
          @keydown.native.13="handleFocusNext('years', 'kebieName')"
        />
      </el-form-item>
      <el-form-item label="科别">
        <el-input
          @keyup.native.32="openDict($event)"
          @keyup.native.f4="a"
          ref="kebieName"
          size="mini"
          :value="form.kebieName"
          @keydown.native.13="handleFocusNext('kebieName', 'outTime')"
        />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="form.state" ref="state">
          <el-radio label="0">未审核</el-radio>
          <el-radio label="1">已审核</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出院起止日期 ">
        <el-date-picker
          ref="outTime"
          type="daterange"
          v-model="form.outTime"
          value-format="yyyy-MM-dd"
          size="mini"
          style="width: 250px"
          @change="handleRangeChange"
          @keydown.native.13="handleFocusNext('outTime', 'baza01')"
        />
        <!--                <span style="padding-right: 5px">从</span>-->
        <!--                <el-date-picker-->
        <!--                    ref="startTime"-->
        <!--                    v-model="form.startTime"-->
        <!--                    value-format="yyyy-MM-dd"-->
        <!--                    type="date"-->
        <!--                    size="mini"-->
        <!--                    @keydown.native.13="handleFocusNext('startTime', 'endTime')"-->
        <!--                />-->
        <!--                <span style="padding-right: 5px">到</span>-->
        <!--                <el-date-picker-->
        <!--                    ref="endTime"-->
        <!--                    v-model="form.endTime"-->
        <!--                    value-format="yyyy-MM-dd"-->
        <!--                    type="date"-->
        <!--                    size="mini"-->
        <!--                    @keydown.native.13="handleFocusNext('endTime', 'baza01')"-->
        <!--                />-->
      </el-form-item>
      <el-form-item label="定位病案号">
        <el-input v-model="form.baza01" ref="baza01" size="mini"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
        <el-button size="mini" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <dict-input
      :visible.sync="visible"
      dictType="departmentDict"
      @submit="this.handleDictInputSubmit"
    />
  </div>
</template>

<script>
import { formatDate } from "../../../utils/index";
import DictInput from "../../../components/dialog/dict-input.vue";
import { Alert } from "element-ui";

export default {
  components: { DictInput },
  data() {
    return {
      form: {
        outTime: [
          formatDate(new Date(), "YYYY-MM-01"),
          formatDate(new Date(), "YYYY-MM-DD")
        ]
      },
      visible: false,
      materialName: ""
    };
  },
  watch: {
    "form.years"() {
      this.retardSearch();
    },
    "form.outTime"() {
      this.retardSearch();
    },
    "form.baza01"() {
      this.retardSearch();
    }
  },
  methods: {
    retardSearch() {
      let funs;
      let that = this;
      clearTimeout(funs);
      funs = setTimeout(function() {
        that.handleSearch();
      }, 1500);
    },

    openDict(e) {
      this.visible = true;
      e.target.blur();
      this.retardSearch();
    },

    handleDictInputSubmit(item) {
      this.form.kebieName = item.dmmc;
      this.form.dm1 = item.dm;
      this.handleFocusNext("kebieName", "startTime");
    },

    handleRangeChange(val) {
      if (val) this.handleFocusNext("outTime", "baza01");
    },

    handleFocusNext(preName, nextName) {
      // date blur
      if (this.$refs[preName].handleClose) this.$refs[preName].handleClose();
      // other blur
      else this.$refs[preName].blur();
      // next focus
      this.$refs[nextName] && this.$refs[nextName].focus();
      if (nextName === "outTime") this.$refs.outTime.showPicker();
    },

    handleReset() {
      this.form = {};
      this.handleSearch();
    },

    handleSearch() {
      const filters = {};
      // 去除空值
      Object.keys(this.form).forEach(key => {
        if (this.form[key]) filters[key] = this.form[key];
      });
      // 格式化时间
      if (filters.outTime) {
        filters.startTime = filters.outTime[0];
        filters.endTime = filters.outTime[1];
        delete filters.outTime;
      }
      // 处理科别
      if (!filters.kebieName || !filters.kebieName.trim()) {
        delete filters.dm1;
        this.form.dm1 = undefined;
      }
      // 触发onSearch
      this.$emit("onSearch", filters);
    },
    a() {
      alert(this.form.kebieName);
    }
  }
};
</script>

<style lang="less" scoped>
.topside {
  overflow: hidden;
  border-radius: 6px;
  background-color: #eee;

  /deep/ .el-input--mini .el-input__inner {
    width: 140px !important;
  }

  .el-form {
    margin-left: 50px;

    .el-form-item {
      margin-bottom: 12px;
    }
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 150px;
  }
}
</style>

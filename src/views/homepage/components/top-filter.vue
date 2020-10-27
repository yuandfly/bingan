<template>
  <!-- 上边区域 -->
  <div class="topside">

       <el-form :model="form" >
          <el-row :gutter="4">
            <el-col :span="3" style="min-width: 175px;">
              <el-form-item  label="执行年度" label-width="80px">
                <el-date-picker
                        ref="years"
                        value-format="yyyy"
                        v-model="form.years"
                        type="year"
                        size="mini"
                        @keydown.native.13="handleFocusNext('years', 'kebieName')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="科别" label-width="50px">
                <el-input
                        @keyup.native.32="openDict($event)"
                        ref="kebieName"
                        size="mini"
                        :value="form.kebieName"
                        @keydown.native.13="handleFocusNext('kebieName', 'startTime')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item >
                <el-radio-group  v-model="form.state" ref="state">
                  <el-radio label="0" style="margin-right: 10px;">未审核</el-radio>
                  <el-radio label="1">已审核</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item  label-width="120px" label="出院起止日期 从">
                <el-date-picker
                        ref="startTime"
                        v-model="form.outTime[0]"
                        value-format="yyyy-MM-dd"
                        type="date"
                        size="mini"
                        @keydown.native.13="handleFocusNext('startTime', 'endTime')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label-width="40px" label="到">
                <el-date-picker
                        ref="endTime"
                        v-model="form.outTime[1]"
                        value-format="yyyy-MM-dd"
                        type="date"
                        size="mini"
                        @keydown.native.13="handleFocusNext('endTime', 'baza01')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item  label="定位病案号" label-width="100px">
                <el-input v-model="form.baza01" ref="baza01" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3" >
                <el-form-item >
                  <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                  <el-button size="mini" @click="handleReset">重置</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item v-if="fraction">
                评分合计：<span style="color: brown;">{{fraction}}</span>
              </el-form-item>
            </el-col>


              <!--      <el-form-item v-if="fraction">-->
              <!--        评分合计：<span style="color: brown;">{{fraction}}</span>-->
              <!--      </el-form-item>-->

          </el-row>
       </el-form>

    <dict-input
            :visible.sync="visible"
            dictType="departmentDict"
            :extra-params="{bz: '0'}"
            @submit="this.handleDictInputSubmit"
    />
  </div>
</template>

<script>
  import { formatDate, today } from "../../../utils/index";
  import DictInput from "../../../components/dialog/dict-input.vue";
  import { Alert } from "element-ui";

  export default {
    components: { DictInput },
    data() {
      return {
        form: this.filterForm,
        visible: false,
        materialName: "",
      };
    },

    props: {
      filterForm: {},
      fraction: {}
    },
    watch: {
      // "form.years"() {
      //   this.retardSearch();
      // },
      // "form.outTime"() {
      //   this.retardSearch();
      // },
      "form.startTime"() {
        this.retardSearch();
      },
      "form.endTime"() {
        this.retardSearch();
      },
      "form.baza01"() {
        this.retardSearch();
      },
    },
    methods: {
      beginningDate() {
        this.form.years = today().split("-")[0];
      },
      retardSearch() {
        let funs;
        let that = this;
        clearTimeout(funs);
        funs = setTimeout(function () {
          that.handleSearch();
        }, 1500);
      },

      openDict(e) {
        this.visible = true;
        e.target.blur();
        this.retardSearch();
      },

      handleDictInputSubmit(item) {
        console.log(item);
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
        // this.form = {};
        this.form.year = undefined;
        this.form.state = '0';
        this.form.outTime[0] = undefined;
        this.form.outTime[1] = undefined;
        this.form.kebieName = undefined;
        this.form.baza01 = undefined;
        this.handleSearch();
      },

      handleSearch() {
        const filters = {};
        console.log(this.form);
        // 去除空值
        Object.keys(this.form).forEach((key) => {
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

      }
    }


  };
</script>

<style lang="less" scoped>
  .topside {
    overflow: hidden;
    border-radius: 6px;
    background-color: #eee;

    /*/deep/ .el-input--mini .el-input__inner {*/
    /*  width: 140px !important;*/
    /*}*/

    .el-form {
      margin-left: 50px;
      padding-top: 10px;
      .el-form-item {
        margin-bottom: 12px;
      }
    }

    .el-date-editor.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--year, .el-date-editor.el-input.el-input--mini.el-input--prefix.el-input--suffix.el-date-editor--date {
      width: 100%;
    }

    .topside {
      /deep/ label.el-radio {
        margin-right: 15px !important;
      }

      /deep/ .el-radio-group{
        min-width: 160px !important;
      }

    }
    /*.el-date-editor.el-input,*/
    /*.el-date-editor.el-input__inner {*/
    /*  width: 150px;*/
    /*}*/
  }
</style>

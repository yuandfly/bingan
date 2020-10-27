<template>
  <div class="homepage clearfix">
    <div class="topside">
      <el-form :inline="true">
        <el-form-item label="执行年度:">
          <el-date-picker
            v-model="year"
            size="small"
            type="year"
            placeholder="选择年"
            format="yyyy年"
            value-format="yyyy"
            :picker-options="pickerEnd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" size="small" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="system_contentBox">
      <el-row class="system_block">
        <el-col :span="16" class="system_one">
          <el-col :span="24">
            <h3>医院信息</h3>
          </el-col>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row>
                <el-col :span="5">
                  <span class="title">医院名称:</span>
                </el-col>
                <el-col :span="19">
                  <el-input
                          v-model="unit.fyymc"
                          placeholder size="mini"
                          ref="fyymc"
                          @keydown.native.13="handleFocusNext('ffrdb')"
                          @keydown.native.37="handleFocusNext('fxzqh')"
                          @keydown.native.38="handleFocusNext('fyydz')"
                          @keydown.native.39="handleFocusNext('ffrdb')"
                          @keydown.native.40="handleFocusNext('fyydz')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="5">
                  <span class="title">法人代表:</span>
                </el-col>
                <el-col :span="19">
                  <el-input
                          v-model="unit.ffrdb"
                          placeholder size="mini"
                          ref="ffrdb"
                          @keydown.native.13="handleFocusNext('fyydz')"
                          @keydown.native.37="handleFocusNext('fyymc')"
                          @keydown.native.38="handleFocusNext('ftjfzr')"
                          @keydown.native.39="handleFocusNext('fxzqh')"
                          @keydown.native.40="handleFocusNext('fzgyz')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row>
                <el-col :span="5">
                  <span class="title">地址:</span>
                </el-col>
                <el-col :span="19">
                  <el-input
                          v-model="unit.fyydz"
                          placeholder size="mini"
                          ref="fyydz"
                          @keydown.native.13="handleFocusNext('fyydz')"
                          @keydown.native.37="handleFocusNext('fjjlx')"
                          @keydown.native.38="handleFocusNext('fyymc')"
                          @keydown.native.39="handleFocusNext('fzgyz')"
                          @keydown.native.40="handleFocusNext('fyydj')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="5">
                  <span class="title">主管院长:</span>
                </el-col>
                <el-col :span="19">
                  <el-input v-model="unit.fzgyz" placeholder size="mini" ref="fzgyz"
                            @keydown.native.13="handleFocusNext('fjjlx')"
                            @keydown.native.37="handleFocusNext('fyydz')"
                            @keydown.native.38="handleFocusNext('ffrdb')"
                            @keydown.native.39="handleFocusNext('fjjlx')"
                            @keydown.native.40="handleFocusNext('fdhhm')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-row>
                <el-col :span="13">
                  <span class="title">医院等级:</span>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="unit.fyydj" placeholder size="mini" ref="fyydj"
                            @keydown.native.13="handleFocusNext('fjjlx')"
                            @keydown.native.37="handleFocusNext('fwsjglb')"
                            @keydown.native.38="handleFocusNext('fyydz')"
                            @keydown.native.39="handleFocusNext('fyylx')"
                            @keydown.native.40="handleFocusNext('fyzbm')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7">
              <el-row>
                <el-col :span="9">
                  <span class="title">医院类型:</span>
                </el-col>
                <el-col :span="15">
                  <el-select v-model="unit.fyylx" ref="fyylx" size="mini"
                             placeholder="请选择"
                             @keydown.native.13="handleFocusNext('fjjlx')"
                             @keydown.native.37="handleFocusNext('fyydj')"
                             @keydown.native.38="handleFocusNext('fyydz')"
                             @keydown.native.39="handleFocusNext('fdhhm')"
                             @keydown.native.40="handleFocusNext('fdzxx')"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="5">
                  <span class="title">电话号码:</span>
                </el-col>
                <el-col :span="19">
                  <el-input v-model="unit.fdhhm" ref="fdhhm" placeholder size="mini"
                            @keydown.native.13="handleFocusNext('fwsjglb')"
                            @keydown.native.37="handleFocusNext('fyylx')"
                            @keydown.native.38="handleFocusNext('fzgyz')"
                            @keydown.native.39="handleFocusNext('fwsjglb')"
                            @keydown.native.40="handleFocusNext('fyywz')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-row>
                <el-col :span="13">
                  <span class="title">邮政编码:</span>
                </el-col>
                <el-col :span="11">
                  <el-input v-model="unit.fyzbm" ref="fyzbm"
                            placeholder size="mini"
                            @keydown.native.13="handleFocusNext('fdzxx')"
                            @keydown.native.37="handleFocusNext('fwsjgflgl')"
                            @keydown.native.38="handleFocusNext('fyydj')"
                            @keydown.native.39="handleFocusNext('fdzxx')"
                            @keydown.native.40="handleFocusNext('fyydm')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7">
              <el-row>
                <el-col :span="9">
                  <span class="title">电子信箱:</span>
                </el-col>
                <el-col :span="15">
                  <el-input v-model="unit.fdzxx" ref="fdzxx"
                            placeholder size="mini"
                            @keydown.native.13="handleFocusNext('fyywz')"
                            @keydown.native.37="handleFocusNext('fyzbm')"
                            @keydown.native.38="handleFocusNext('fyylx')"
                            @keydown.native.39="handleFocusNext('fyywz')"
                            @keydown.native.40="handleFocusNext('fyydm')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="5">
                  <span class="title">网址:</span>
                </el-col>
                <el-col :span="19">
                  <el-input v-model="unit.fyywz" ref="fyywz" placeholder size="mini"
                            @keydown.native.13="handleFocusNext('fwsjgflgl')"
                            @keydown.native.37="handleFocusNext('fdzxx')"
                            @keydown.native.38="handleFocusNext('fdhhm')"
                            @keydown.native.39="handleFocusNext('fwsjgflgl')"
                            @keydown.native.40="handleFocusNext('ftjfzr')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row>
                <el-col :span="7">
                  <span class="title">组织机构代码:</span>
                </el-col>
                <el-col :span="17">
                  <el-input v-model="unit.fyydm" ref="fyydm" placeholder size="mini"
                            @keydown.native.13="handleFocusNext('ftjfzr')"
                            @keydown.native.37="handleFocusNext('fzbr')"
                            @keydown.native.38="handleFocusNext('fyzbm')"
                            @keydown.native.39="handleFocusNext('ftjfzr')"
                            @keydown.native.40="handleFocusNext('fyymc')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7">
              <el-row>
                <el-col :span="12">
                  <span class="title">统计负责人:</span>
                </el-col>
                <el-col :span="12">
                  <el-input v-model="unit.ftjfzr" ref="ftjfzr" placeholder size="mini"
                            @keydown.native.13="handleFocusNext('fzbr')"
                            @keydown.native.37="handleFocusNext('fyydm')"
                            @keydown.native.38="handleFocusNext('fyywz')"
                            @keydown.native.39="handleFocusNext('fzbr')"
                            @keydown.native.40="handleFocusNext('ffrdb')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="5">
              <el-row>
                <el-col :span="11">
                  <span class="title">制表人:</span>
                </el-col>
                <el-col :span="13">
                  <el-input v-model="unit.fzbr" ref="fzbr"
                            placeholder size="mini"
                            @keydown.native.13="handleFocusNext('fwsjgflgl')"
                            @keydown.native.37="handleFocusNext('ftjfzr')"
                            @keydown.native.38="handleFocusNext('fyywz')"
                            @keydown.native.39="handleFocusNext('fyydm')"
                            @keydown.native.40="handleFocusNext('ffrdb')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" class="system_one">
          <el-col :span="24">
            <h3>机构属性代码</h3>
          </el-col>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-row>
                <el-col :span="9">
                  <span class="title">行政区划:</span>
                </el-col>
                <el-col :span="5">
                  <el-input
                    :value="unit.fxzqh"
                    placeholder
                    size="mini"
                    ref="fxzqh"
                    @keyup.native.32="handleOpenDictInput('districtDict')"
                    @keydown.native.115="clearDictInputValue('districtDict')"
                    @keydown.native.13="handleFocusNext('fyydz')"
                    @keydown.native.37="handleFocusNext('ffrdb')"
                    @keydown.native.38="handleFocusNext('fwsjgflgl')"
                    @keydown.native.39="handleFocusNext('fyymc')"
                    @keydown.native.40="handleFocusNext('fjjlx')"
                  ></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input :value="unit.fxzqhName" ref="fxzqhName" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row>
                <el-col :span="9">
                  <span class="title">经济类型:</span>
                </el-col>
                <el-col :span="4">
                  <el-input
                    :value="unit.fjjlx"
                    ref="fjjlx"
                    placeholder
                    size="mini"
                    @keyup.native.32="handleOpenDictInput('economicsDict')"
                    @keydown.native.115="clearDictInputValue('economicsDict')"
                    @keydown.native.13="handleFocusNext('fyydj')"
                    @keydown.native.37="handleFocusNext('fzgyz')"
                    @keydown.native.38="handleFocusNext('fxzqh')"
                    @keydown.native.39="handleFocusNext('fyydz')"
                    @keydown.native.40="handleFocusNext('fwsjglb')"
                  ></el-input>
                </el-col>
                <el-col :span="11">
                  <el-input :value="unit.fjjlxName" ref="fjjlxName" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-row>
                <el-col :span="9">
                  <span class="title">卫生机构类别:</span>
                </el-col>
                <el-col :span="5">
                  <el-input
                    :value="unit.fwsjglb"
                    placeholder
                    ref="fwsjglb"
                    size="mini"
                    @keyup.native.32="handleOpenDictInput('sanitationDict')"
                    @keydown.native.115="clearDictInputValue('sanitationDict')"
                    @keydown.native.13="handleFocusNext('fyzbm')"
                    @keydown.native.37="handleFocusNext('fdhhm')"
                    @keydown.native.38="handleFocusNext('fjjlx')"
                    @keydown.native.39="handleFocusNext('fyydj')"
                    @keydown.native.40="handleFocusNext('fwsjgflgl')"
                  ></el-input>
                </el-col>
                <el-col :span="10">
                  <el-input :value="unit.fwsjglbName" ref="fwsjglbName" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row>
                <el-col :span="9">
                  <span class="title">卫生机构分类管理:</span>
                </el-col>
                <el-col :span="15">
                  <el-select v-model="unit.fwsjgflgl" ref="fwsjgflgl" placeholder="请选择"
                             size="mini"
                             @keydown.native.13="handleFocusNext('fyydm')"
                             @keydown.native.37="handleFocusNext('fyywz')"
                             @keydown.native.38="handleFocusNext('fwsjglb')"
                             @keydown.native.39="handleFocusNext('fyzbm')"
                             @keydown.native.40="handleFocusNext('fxzqh')"
                  >
                    <el-option
                      v-for="item in healthOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- <el-row class="system_block">
        <el-col :span="24" class="system_one">
          <el-col :span="24">
            <h3>病案预制信息</h3>
          </el-col>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-row>
                <el-col :span="6">
                  <span class="title">职业:</span>
                </el-col>
                <el-col :span="6">
                  <el-input
                    :value="unit.fbaza08"
                    placeholder
                    size="mini"
                    @keyup.native.32="handleOpenDictInput({},'occupationDict')"
                    @keydown.native.115="clearDictInputValue('occupationDict')"
                  ></el-input>
                </el-col>
                <el-col :span="12">
                  <el-input :value="unit.fbaza08Name" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="7">
                  <span class="title">民族:</span>
                </el-col>
                <el-col :span="17">
                  <el-input
                    v-model="unit.fbaza10"
                    placeholder
                    size="mini"
                    @keyup.native.32="handleOpenDictInput({},'nationDict')"
                    @keydown.native.115="clearDictInputValue('nationDict')"
                  ></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="6">
                  <span class="title">地址:</span>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="unit.fyydz" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3">
              <el-row>
                <el-col :span="10">
                  <span class="title">性别:</span>
                </el-col>
                <el-col :span="14">
                  <el-input v-model="unit.fbaza03" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="7">
                  <span class="title">婚姻:</span>
                </el-col>
                <el-col :span="17">
                  <el-input v-model="unit.fbaza07" placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>-->
      <el-row class="system_block">
        <el-col :span="24" class="system_one">
          <el-col :span="24">
            <h3>类型</h3>
          </el-col>
          <!-- <el-row :gutter="20">
            <el-col :span="6">
              <el-checkbox v-model="unit.fbazac4">外来患者标志</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="unit.fbaza56">入院途径</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="unit.fbaza66">护理天数</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="unit.fzrkb">自动转入上一份病案科别</el-checkbox>
            </el-col>
          </el-row>-->
          <el-row :gutter="20">
            <el-col :span="8">
              <el-checkbox v-model="unit.fcyRz">出院人数以病案为准</el-checkbox>
            </el-col>
            <el-col :span="8">
              <el-checkbox v-model="unit.fbaza83">自动计算住院总费用</el-checkbox>
            </el-col>
            <el-col :span="8">
              <el-checkbox v-model="unit.frz">按科室录入日志</el-checkbox>
            </el-col>
            <!-- <el-col :span="6">
              <el-checkbox v-model="unit.fbaza05">自动生成身份证前14位</el-checkbox>
            </el-col>-->
          </el-row>
          <!-- <el-row :gutter="20">
            <el-col :span="6">
              <el-checkbox v-model="checked1">报表输出到EXCEL</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="checked1">抄作员自定义功能</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="checked1">按科室录入日志</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="unit.fzrys">自动转入上一份病案医师</el-checkbox>
            </el-col>
          </el-row>-->
          <!-- <el-row :gutter="20">
            <el-col :span="6">
              <el-checkbox v-model="unit.fbaza58">输液次数</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="unit.fbaf107">医院感染部位</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="checked1">街村地址存盘</el-checkbox>
            </el-col>
            <el-col :span="6">
              <el-checkbox v-model="checked1">出院病人数与出院人数口径一致</el-checkbox>
            </el-col>
          </el-row>-->
        </el-col>
      </el-row>
      <!-- <el-row class="system_block">
        <el-col :span="24" class="system_one">
          <el-col :span="24">
            <h3>报表纸张设置（单位：毫米）</h3>
          </el-col>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-checkbox v-model="checked1">大表默认值</el-checkbox>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="5">
                  <span class="title">大报表:</span>
                </el-col>
                <el-col :span="19">
                  <el-input placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="5">
                  <span class="title">宽:</span>
                </el-col>
                <el-col :span="19">
                  <el-input placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="5">
                  <span class="title">长:</span>
                </el-col>
                <el-col :span="19">
                  <el-input placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="5">
                  <span class="title">方向:</span>
                </el-col>
                <el-col :span="19">
                  <el-select v-model="bOrientationType" size="mini" placeholder="请选择">
                    <el-option
                      v-for="item in orientation"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4">
              <el-row>
                <el-col :span="10">
                  <span class="title">左边距:</span>
                </el-col>
                <el-col :span="14">
                  <el-input-number
                    v-model="num"
                    :min="5"
                    :max="9999"
                    size="mini"
                    label="左边距"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <el-col :span="5">
                  <span class="title">小报表:</span>
                </el-col>
                <el-col :span="19">
                  <el-input placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="5">
                  <span class="title">宽:</span>
                </el-col>
                <el-col :span="19">
                  <el-input placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="5">
                  <span class="title">长:</span>
                </el-col>
                <el-col :span="19">
                  <el-input placeholder size="mini"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4">
              <el-row>
                <el-col :span="5">
                  <span class="title">方向:</span>
                </el-col>
                <el-col :span="19">
                  <el-select v-model="sOrientationType" size="mini" placeholder="请选择">
                    <el-option
                      v-for="item in orientation"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>-->
    </div>

    <DictInput
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />
  </div>
</template>

<script>
import { getUnit, update } from "@/api";
import { today, showOkMsg, showErrorMsg } from "@/utils/index.js";
import DictInput from "../../components/dialog/dict-input";

export default {
  data() {
    return {
      year: "",
      unit: {},
      options: [
        {
          value: "1",
          label: "中医",
        },
        {
          value: "2",
          label: "西医",
        },
        {
          value: "3",
          label: "中西医结合",
        },
      ],
      healthOptions: [
        {
          value: "1",
          label: "非营利性医疗机构",
        },
        {
          value: "2",
          label: "营利性医疗机构",
        },
      ],
      // 代码录入弹框
      dictInputDialog: {
        visible: false,
        dictType: undefined, // 字典类型，全部类型见 dict-input 组件 typeAPI
        extraParams: undefined, // 额外参数，如科室,见 filtersFields
        currentOpener: {}, // 字典选择后需要填值的字段名 {name, dictField}, 见 handleDictInputSubmit
      },
      // orientation: [
      //   {
      //     value: 1,
      //     label: "纵向",
      //   },
      //   {
      //     value: 2,
      //     label: "横向",
      //   },
      // ],
      // hospitalType: "",
      // bOrientationType: "",
      // sOrientationType: "",
      // num: 5,
      pickerEnd: {
        disabledDate: (time) => {
          return time.getTime() >= Date.now();
        },
      },
    };
  },
  created() {
    this.beginningDate();
    this.getList();
  },
  components: {
    DictInput,
  },
  methods: {
    beginningDate() {
      this.year = today().split("-")[0];
    },
    // 打开代码录入
    handleOpenDictInput(type) {
      const { name, dictType, dictField, range } = {};
      this.dictInputDialog = {
        visible: true,
        dictType: type,
        currentOpener: { name, dictField },
      };
      this.zdType = type;
      // this.physicianObj = obj;
    },
    // 代码录入提交
    handleDictInputSubmit(row) {
      if (this.zdType === "districtDict") {
        this.unit.fxzqh = row.dm;
        this.unit.fxzqhName = row.dmmc;
      }
      if (this.zdType === "economicsDict") {
        this.unit.fjjlx = row.dm;
        this.unit.fjjlxName = row.dmmc;
      }
      if (this.zdType === "sanitationDict") {
        this.unit.fwsjglb = row.dm;
        this.unit.fwsjglbName = row.dmmc;
      }
    },
    // f4 清除科别的选择
    clearDictInputValue(type) {
      if (type === "districtDict") {
        this.unit.fxzqh = "";
        this.unit.fxzqhName = "";
      }
      if (type === "economicsDict") {
        this.unit.fjjlx = "";
        this.unit.fjjlxName = "";
      }
      if (type === "sanitationDict") {
        this.unit.fwsjglb = "";
        this.unit.fwsjglbName = "";
      }
    },
    getList() {
      getUnit().then((res) => {
        if (res.code === 0) {
          this.unit = res.data;
          console.log("1", res.data);
          if (res.data) {
            if (res.data.fcyRz === "1") this.unit.fcyRz = true;
            else this.unit.fcyRz = false;
            if (res.data.fbaza83 === "1") this.unit.fbaza83 = true;
            else this.unit.fbaza83 = false;
            if (res.data.frz === "1") this.unit.frz = true;
            else this.unit.frz = false;
          }

        }
      });
    },
    save() {
      this.unit.fcyRz = this.unit.fcyRz ? "1" : "0";
      this.unit.fbaza83 = this.unit.fbaza83 ? "1" : "0";
      this.unit.frz = this.unit.frz ? "1" : "0";
      update(this.unit).then((res) => {
        if (res.code === 0) {
          this.getList();
        }
      });
    },
    handleFocusNext(name) {
      console.log(name);
      this.$refs[name].focus();
    },
  },
};
</script>

<style lang="less" scoped>



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
.system_contentBox {
  color: #606266;
  padding: 0 4px;
  /deep/ .el-input__inner:focus {
    background: #409EFF;
    color: #ffffff;
    border-top-color: #409EFF;
  }
}
.system_block {
  display: flex;
}
.system_one {
  border: 1px solid #eee;
  margin: 4px;
  box-sizing: border-box;
  border-radius: 5px;
}
.system_contentBox h3 {
  padding: 20px 0;
  font-weight: bolder;
}
.title {
  line-height: 32px;
  font-size: 13px;
  text-align: right;
  width: 100%;
  display: block;
  padding-right: 5px;
}
</style>
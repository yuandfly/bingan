<template>
  <div class="homepage clearfix">
    <div class="main">
      <el-container
        class="container medical_record"
        :direction="isExpand ? 'vertical' : 'horizontal'"
      >
        <el-main :style="{padding: isExpand ? '0' : '0 0 0 10px'}">
          <el-card shadow="never" class="card" body-style="padding: 10px" v-loading="rightLoading">
            <el-row :gutter="16">
              <input-item
                v-for="item in firstInputs"
                :config="item"
                :showJudge="judge"
                :value="inputValues[item.name]"
                :key="item.name"
                :dynamicAfter="dynamicAfterObj[item.dynamicAfter]"
                :dynamicDisabled="dynamicDisabledObj[item.name]"
                :error="errorInfo.errorObj[item.name]"
                :errorFocus="errorInfo.currentFocus === item.name"
                @change="handleInputItemChange"
                @openDictDialog="showDictInputDialog"
                @delDictValue="handleDelDictValue"
              />
            </el-row>

            <el-row :gutter="16">
              <el-col
                v-if="judge.hospitalType !== 'Chinese'"
                :lg="judge.hospitalType === 'Both' ? 24 : 24"
                :md="24"
              >
                <table class="table" id="WesternDiagnoseTable">
                  <thead>
                    <tr>
                      <th class="cz">操作</th>
                      <th colspan="2">出院西医诊断</th>
                      <th class="icd10">ICD10</th>
                      <th class="rybq">入院病情</th>
                      <th class="gz">转归</th>
                    </tr>
                  </thead>
                  <draggable element="tbody" v-model="WesternDiagnoseTable">
                    <tr v-for="(item, index) in WesternDiagnoseTable">
                      <td class="cz">
                        <el-popconfirm
                          placement="top"
                          v-if="item.type === 'other'"
                          confirmButtonType="text"
                          title="确定删除这条记录吗?"
                          @onConfirm="handleDelTableRow('WesternDiagnoseTable', index)"
                        >
                          <el-button
                            type="text"
                            size="small"
                            style="color: #F56C6C"
                            slot="reference"
                          >删除</el-button>
                        </el-popconfirm>
                      </td>
                      <td class="zyzd">{{item.type === 'main' ? '主要诊断' : '其他诊断'}}</td>
                      <td>
                        <el-input
                          type="text"
                          size="mini"
                          class="table-input"
                          :value="item.diseaseName"
                          :title="item.diseaseName"
                          :id="'WesternDiagnoseTable' + index + 'diseaseName'"
                          @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'diseaseName')"
                          @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'westernDiagnoseDict',
                                            opener: 'WesternDiagnoseTable',
                                            fields: [
                                                {dictField: 'dmmc', targetField: 'diseaseName'},
                                                {dictField: 'dm', targetField: 'diseaseCode'},
                                                {dictField: 'icd10', targetField: 'ICD10'},
                                            ],
                                            index: index
                                        })"
                        />
                      </td>
                      <td class="icd10" style="cursor: not-allowed">{{item.ICD10}}</td>
                      <td class="rybq">
                        <el-select
                          size="mini"
                          v-model="item.entryState"
                          :id="'WesternDiagnoseTable' + index + 'entryState'"
                          :popper-class="'WesternDiagnoseTable' + index + 'entryState' + 'poper'"
                          @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'entryState')"
                        >
                          <el-option
                            v-for="item in optionData.entryState"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                          />
                        </el-select>
                      </td>
                      <td class="gz">
                        <el-select
                          size="mini"
                          v-model="item.turnReturn"
                          :id="'WesternDiagnoseTable' + index + 'turnReturn'"
                          :popper-class="'WesternDiagnoseTable' + index + 'turnReturn' + 'poper'"
                          @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'turnReturn')"
                        >
                          <el-option
                            v-for="item in optionData.turnReturn"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6">
                        <el-button
                          type="text"
                          size="small"
                          @click="handleAddDiagnose('WesternDiagnoseTable')"
                        >增加其他诊断</el-button>
                      </td>
                    </tr>
                  </draggable>
                </table>
              </el-col>
              <el-col
                v-if="judge.hospitalType !== 'Western'"
                :lg="judge.hospitalType === 'Both' ? 24 : 24"
                :md="24"
              >
                <table class="table" id="ChineseDiagnoseTable">
                  <thead>
                    <tr>
                      <th class="cz">操作</th>
                      <th colspan="2">出院中医诊断</th>
                      <th class="icd10">疾病编码</th>
                      <th class="rybq">入院病情</th>
                      <th class="gz">转归</th>
                    </tr>
                  </thead>
                  <draggable element="tbody" v-model="ChineseDiagnoseTable">
                    <tr v-for="(item, index) in ChineseDiagnoseTable">
                      <td class="cz">
                        <el-popconfirm
                          placement="top"
                          v-if="item.type === 'other'"
                          confirmButtonType="text"
                          title="确定删除这条记录吗?"
                          @onConfirm="handleDelTableRow('ChineseDiagnoseTable', index)"
                        >
                          <el-button
                            type="text"
                            size="small"
                            style="color: #F56C6C"
                            slot="reference"
                          >删除</el-button>
                        </el-popconfirm>
                      </td>
                      <td class="zyzd">{{item.type === 'main' ? '主病' : '主证'}}</td>

                      <td>
                        <el-input
                          type="text"
                          size="mini"
                          class="table-input"
                          :value="item.diseaseName"
                          :id="'ChineseDiagnoseTable' + index + 'diseaseName'"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'diseaseName')"
                          @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'chineseDiagnoseDict',
                                            opener: 'ChineseDiagnoseTable',
                                            dictExtraParams: {code: item.type === 'main' ? 1 : 2},
                                            fields: [
                                                {dictField: 'dmmc', targetField: 'diseaseName'},
                                                {dictField: 'dm', targetField: 'diseaseCode'}
                                            ],
                                            index: index
                                        })"
                        />
                      </td>
                      <td class="icd10" style="cursor: not-allowed">{{item.diseaseCode}}</td>
                      <td class="rybq">
                        <el-select
                          size="mini"
                          v-model="item.entryState"
                          :id="'ChineseDiagnoseTable' + index + 'entryState'"
                          :popper-class="'ChineseDiagnoseTable' + index + 'entryState' + 'poper'"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'entryState')"
                        >
                          <el-option
                            v-for="item in optionData.entryState"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                          />
                        </el-select>
                      </td>
                      <td class="gz">
                        <el-select
                          size="mini"
                          v-model="item.turnReturn"
                          :id="'ChineseDiagnoseTable' + index + 'turnReturn'"
                          :popper-class="'ChineseDiagnoseTable' + index + 'turnReturn' + 'poper'"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'turnReturn')"
                        >
                          <el-option
                            v-for="item in optionData.turnReturn"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="6">
                        <el-button
                          type="text"
                          size="small"
                          @click="handleAddDiagnose('ChineseDiagnoseTable')"
                        >增加其他中医证候</el-button>
                      </td>
                    </tr>
                  </draggable>
                </table>
              </el-col>
            </el-row>

            <el-row :gutter="16">
              <input-item
                v-for="item in secondInputs"
                :config="item"
                :showJudge="judge"
                :value="inputValues[item.name]"
                :key="item.name"
                :dynamicAfter="dynamicAfterObj[item.dynamicAfter]"
                :dynamicDisabled="dynamicDisabledObj[item.name]"
                :error="errorInfo.errorObj[item.name]"
                :errorFocus="errorInfo.currentFocus === item.name"
                @change="handleInputItemChange"
                @openDictDialog="showDictInputDialog"
                @openSpecialDialog="openSpecialDialog"
                @delDictValue="handleDelDictValue"
              />
            </el-row>

            <table class="table" id="operationTable">
              <thead>
                <tr>
                  <th rowspan="2">操作</th>
                  <th rowspan="2">手术操作编码</th>
                  <th rowspan="2">手术操作日期</th>
                  <th rowspan="2">手术级别</th>
                  <th rowspan="2">手术操作名称</th>
                  <th colspan="3">手术操作医师</th>
                  <th rowspan="2">切口</th>
                  <th rowspan="2">愈合等级</th>
                  <th rowspan="2">麻醉方式</th>
                  <th rowspan="2">麻醉医师</th>
                </tr>
                <tr>
                  <th>术者</th>
                  <th>Ⅰ助</th>
                  <th>Ⅱ助</th>
                </tr>
              </thead>
              <draggable element="tbody" v-model="operationTable">
                <tr v-for="(item, index) in operationTable">
                  <td>
                    <el-popconfirm
                      placement="top"
                      confirmButtonType="text"
                      title="确定删除这条记录吗？"
                      @onConfirm="handleDelTableRow('operationTable', index)"
                    >
                      <el-button type="text" size="small" style="color: #F56C6C" slot="reference">删除</el-button>
                    </el-popconfirm>
                  </td>
                  <!-- 手术操作编码 -->
                  <td style="cursor: not-allowed;">{{item.baf405}}</td>
                  <!-- 手术操作日期 -->
                  <td style="width: 120px">
                    <el-input
                      type="text"
                      size="mini"
                      :class="{'table-input': true, 'table-error-input': errorInfo.tableErrorObj.operationTable['baf405-' + index]}"
                      v-model="item.baf411"
                      :id="'operationTable' + index + 'baf411'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf411')"
                    />
                  </td>
                  <!-- 手术级别 -->
                  <td>
                    <el-select
                      size="mini"
                      v-model="item.baf404"
                      :class="{'table-error-input': errorInfo.tableErrorObj.operationTable['baf404-' + index]}"
                      :id="'operationTable' + index + 'baf404'"
                      :popper-class="'operationTable' + index + 'baf404' + 'poper'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf404')"
                    >
                      <el-option
                        v-for="item in optionData.operationLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </td>
                  <!-- 手术操作名称 -->
                  <td>
                    <el-input
                      type="text"
                      size="mini"
                      :class="{'table-input': true, 'table-error-input': errorInfo.tableErrorObj.operationTable['baf408name-' + index]}"
                      :value="item.baf408name"
                      :id="'operationTable' + index + 'baf408name'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf408name')"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'operationDict',
                                            opener: 'operationTable',
                                            fields: [
                                                {dictField: 'dm', targetField: 'baf408'},
                                                {dictField: 'dmmc', targetField: 'baf408name'},
                                                {dictField: 'iccm', targetField: 'baf405'},
                                            ],
                                            index: index
                                        })"
                    />
                  </td>
                  <!-- 术者 -->
                  <td>
                    <el-input
                      type="text"
                      size="mini"
                      class="table-input"
                      :value="item.baf409"
                      :id="'operationTable' + index + 'baf409'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf409')"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [{dictField: 'dmmc', targetField: 'baf409'}],
                                            index: index
                                        })"
                    />
                  </td>
                  <!-- Ⅰ助 -->
                  <td>
                    <el-input
                      type="text"
                      size="mini"
                      class="table-input"
                      :value="item.baf414"
                      :id="'operationTable' + index + 'baf414'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf414')"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [{dictField: 'dmmc', targetField: 'baf414'}],
                                            index: index
                                        })"
                    />
                  </td>
                  <!-- Ⅱ助 -->
                  <td>
                    <el-input
                      type="text"
                      size="mini"
                      class="table-input"
                      :value="item.baf415"
                      :id="'operationTable' + index + 'baf415'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf415')"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [{dictField: 'dmmc', targetField: 'baf415'}],
                                            index: index
                                        })"
                    />
                  </td>
                  <!-- 切口 -->
                  <td>
                    <el-select
                      size="mini"
                      v-model="item.baf412"
                      :id="'operationTable' + index + 'baf412'"
                      :popper-class="'operationTable' + index + 'baf412' + 'poper'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf412')"
                    >
                      <el-option
                        v-for="item in optionData.incision"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </td>
                  <!-- 愈合等级 -->
                  <td>
                    <el-select
                      size="mini"
                      v-model="item.baf413"
                      :id="'operationTable' + index + 'baf413'"
                      :popper-class="'operationTable' + index + 'baf413' + 'poper'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf413')"
                    >
                      <el-option
                        v-for="item in optionData.healingLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </td>
                  <!-- 麻醉方式 -->
                  <td>
                    <el-input
                      type="text"
                      size="mini"
                      class="table-input"
                      :value="item.baf410name"
                      :id="'operationTable' + index + 'baf410name'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf410name')"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'anesthesiaDict',
                                            opener: 'operationTable',
                                            fields: [
                                                {dictField: 'dmmc', targetField: 'baf410name'},
                                                {dictField: 'dm', targetField: 'baf410'}
                                            ],
                                            index: index
                                        })"
                    />
                  </td>
                  <!-- 麻醉医师 -->
                  <td>
                    <el-input
                      type="text"
                      size="mini"
                      class="table-input"
                      :value="item.baf416"
                      :id="'operationTable' + index + 'baf416'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf416')"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [{dictField: 'dmmc', targetField: 'baf416'}],
                                            index: index
                                        })"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="12">
                    <el-button type="text" size="small" @click="handleAddOperation()">追加手术记录</el-button>
                  </td>
                </tr>
              </draggable>
            </table>

            <el-row :gutter="16">
              <input-item
                v-for="item in thirdInputs"
                :config="item"
                :showJudge="judge"
                :value="inputValues[item.name]"
                :key="item.name"
                :dynamicAfter="dynamicAfterObj[item.dynamicAfter]"
                :dynamicDisabled="dynamicDisabledObj[item.name]"
                :error="errorInfo.errorObj[item.name]"
                :errorFocus="errorInfo.currentFocus === item.name"
                @change="handleInputItemChange"
                @openDictDialog="showDictInputDialog"
                @delDictValue="handleDelDictValue"
              />
            </el-row>
          </el-card>
        </el-main>
      </el-container>
    </div>

    <div :style="{marginBottom: fixedBottonHeight}">
      <div class="fixed-footer" :style="{height: fixedBottonHeight}">
        <div class="err-drawer" :style="{height: errorInfo.height + 'px'}">
          <div class="err-drawer-header">
            <span>审核错误信息</span>
            <i
              :class="errorInfo.visible ? 'el-icon-d-arrow-right err-drawer-headericon' : 'el-icon-d-arrow-left err-drawer-headericon'"
              @click="triggerErrorVisible"
            />
          </div>
          <div class="err-drawer-body">
            <el-table
              :data="errorInfo.errorData"
              max-height="170px"
              size="mini"
              border
              stripe
              highlight-current-row
              @row-click="jumpToErrInput"
            >
              <el-table-column prop="column" label="错误字段"></el-table-column>
              <el-table-column prop="errMsg" label="错误提示"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="footer-btn-box">
          <el-button type="primary" size="small" @click="handleSubmit">提交修改</el-button>
          <el-button type="primary" size="small" @click="handleReset(true)">新增病案</el-button>
        </div>
      </div>
    </div>

    <dict-input
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.dictExtraParams"
      @submit="this.handleDictInputSubmit"
    />

    <allergic-drugs-input
      :visible.sync="allergicDrugsDialog.visible"
      :baza00="allergicDrugsDialog.baza00"
      :allergicDrugsData.sync="allergicDrugsDialog.allergicDrugsData"
      @submit="handleAllergicDrugsSubmit"
    />

    <pathologic-diagnosis-input
      :visible.sync="pathologicDiagnosisDialog.visible"
      :baza00="pathologicDiagnosisDialog.baza00"
      :diagnosisData.sync="pathologicDiagnosisDialog.diagnosisData"
      @submit="handlePathologicSubmit"
    />

    <supplementBox ref="child" @fun="againDictionaries"></supplementBox>
  </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
@import "./index.less";
</style>

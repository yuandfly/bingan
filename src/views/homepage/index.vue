<template>
  <div class="homepage clearfix">

    <top-filter v-if="showTopFilter" @onSearch="handleSearch" :filter-form.sync="filters" :fraction="scoreInfo.fraction"></top-filter>


      <el-container
        class="container medical_record"
        :direction="isExpand ? 'vertical' : 'horizontal'"
      >
        <el-aside :width="isExpand ? '100%' : '184px'" >
          <el-card shadow="never" class="card" body-style="padding: 10px" :style="{ overflowY: 'auto', height: AsideHeight + 'px' }">
            <div slot="header" class="card-header">
              <span style="font-size: 13px;">病案列表</span>
              <el-button type="text" size="mini" round @click="handleAudit" style="padding: 7px 4px;" v-if="list.selectedKeys.length!=0">批量审核</el-button>
              <span v-else style="font-size: 12px;">:共{{list.pager.total}}份</span>
              <el-button type="text" style="float: right;font-size: 12px;margin-left:0;padding-top:15px;"  @click="handleExpand">
                {{isExpand ? '收起' : '展开'}}
                <i
                  :class="isExpand ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"
                ></i>
              </el-button>
            </div>
            <el-table
                    ref="leftTable"
                    highlight-current-row
                    :data="list.tableData"
                    v-loading="list.loading"
                    style="font-size: 13px;"
                    @row-click="handleLeftRowClick"
                    @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="25"></el-table-column>
              <el-table-column prop="baza01" width="75" align="left">
                <template slot="header" slot-scope="scope">
                  <div>病案号</div>
                </template>
              </el-table-column>
              <el-table-column prop="baza02" align="left" width="55" label="姓名"></el-table-column>
              <template v-if="isExpand">
                <el-table-column prop="kb" align="center" width="150" label="出院科别"></el-table-column>
                <el-table-column prop="BAZA27" align="center" width="170px" label="出院日期"></el-table-column>
                <el-table-column prop="baza65" align="center" width="140" label="ICD10"></el-table-column>
                <el-table-column prop="baza41" align="center" width="140" label="转归">
                  <template slot-scope="scope">
                    <span v-if="scope.row.baza41 === '1'">治愈</span>
                    <span v-if="scope.row.baza41 === '2'">好转</span>
                    <span v-if="scope.row.baza41 === '3'">未愈</span>
                    <span v-if="scope.row.baza41 === '4'">死亡</span>
                    <span v-if="scope.row.baza41 === '5'">其他</span>
                    <span v-if="scope.row.baza41 === '9'">其他</span>
                  </template>
                </el-table-column>
                <el-table-column prop="baza29" align="center" width="140" label="住院天数"></el-table-column>
                <el-table-column prop="dmmc" min-width="300px" label="诊断名称" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="ellipsis">{{scope.row.dmmc}}</div>
                  </template>
                </el-table-column>

                <el-table-column prop="dmmc" width="100px" label>

                  <template slot-scope="scope">
                    <el-link type="primary" @click.stop="editCode(scope.row)">修改病案号</el-link>
                  </template>
                </el-table-column>
              </template>

              <!-- <el-table-column prop="ssmc" min-width="200px" label="手术名称"></el-table-column>
              <el-table-column prop="ssbm" align="center" width label="手术编码"></el-table-column>-->

            </el-table>

          </el-card>
          <div class="left-paging">
            <el-pagination
                    style="float: right"
                    small
                    layout="prev, pager, next"
                    :pager-count="5"
                    :total="list.pager.total"
                    :current-page.sync="list.pager.page"
                    :page-size="list.pager.rows"
                    @current-change="handlePageChange"
            ></el-pagination>
            <!--                    <paging-toolbar :pager="list.pager" :small="true" :pager-count="5" @change="getList(list.filters, list.pager)"/>-->
          </div>
        </el-aside>

        <el-main :style="{padding: isExpand ? '0' : '0 0 0 10px', overflowY: 'auto', height: MainHeight + 'px'}">
          <el-card shadow="never" class="card" body-style="padding: 10px" v-loading="rightLoading">
            <el-row :gutter="16">
              <input-item
                v-for="item in firstInputs"
                :config="item"
                :showJudge="judge"
                :value="inputValues[item.name]"
                :key="item.name"
                :dynamicAfter="dynamicAfterObj[item.dynamicAfter]"
                :dynamicBefore="dynamicBeforeObj[item.dynamicBefore]"
                :dynamicDisabled="dynamicDisabledObj[item.name]"
                :error="errorInfo.errorObj[item.name]"
                :errorFocus="errorInfo.currentFocus === item.name"
                @change="handleInputItemChange"
                @clear="clearDictInputValue"
                @openSpecialDialog="openSpecialDialog"
                @dynamicAfterChange="handleInputItemdynamicAfter"
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
                    <tr>
                        <td class="cz">操作</td>
                        <td colspan="2">出院西医诊断</td>
                        <td class="icd10">ICD10</td>
                        <th class="fjm" style="width: 0.3%">附码</th>
                        <td class="rybq" style="width: 0.7%">入院病情</td>
                        <td class="gz" style="width: 0.3%">转归</td>
                        <td   class="zdlb" >诊断类别</td>
                        <td class="grbw" >感染部位</td>
                        <td class="ssyg" >手术有关</td>
                    </tr>

                    <draggable element="tbody" v-model="WesternDiagnoseTable" @change="handleDragChange('WesternDiagnoseTable')">

                    <tr
                            v-for="(item, index) in WesternDiagnoseTable"
                            v-clickoutside="clearTableActiveRow"
                            @click.stop="setTableActiveRow(index, 'WesternDiagnoseTable')"
                    >
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
                      <td class="zyzd" style="width: 0.5%">{{item.type === 'main' ? '主要诊断' : '其他诊断'}}</td>
                      <td>
                        <el-input
                                type="textarea"
                                class="table-input diseaseName"
                                :value="item.diseaseName"
                                @change.native="inputInfo( 'WesternDiagnoseTable' + index + 'diseaseName')"
                                style="line-height: 25px;"
                                :id="'WesternDiagnoseTable' + index + 'diseaseName'"
                                @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'diseaseName')"
                                @keydown.native.39="tableFocusNext('WesternDiagnoseTable', index, 'diseaseName')"
                                @keydown.native.37="tableFocusUp('WesternDiagnoseTable', index, 'diseaseName', item.baf106 )"
                                @keyup.native.38="tableFocusUp2('WesternDiagnoseTable', index, 'diseaseName', -1)"
                                @keyup.native.40="tableFocusUp2('WesternDiagnoseTable', index, 'diseaseName', 1)"
                                @keydown.native.115="clearDictInputValue(WesternDiagnoseTable, 'diseaseName,diseaseCode', index)"
                                @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'westernDiagnoseDict',
                                            opener: 'WesternDiagnoseTable',
                                            dictExtraParams: {code:  1 },
                                            fields: [
                                                {dictField: 'dmmc', targetField: 'diseaseName'},
                                                {dictField: 'dm', targetField: 'diseaseCode'},
                                                {dictField: 'icd10', targetField: 'ICD10'},
                                                {dictField: 'fjm', targetField: 'fjm'},
                                            ],
                                            index: index
                                        })"
                        >
                        </el-input>
                      </td>
                      <td class="icd10" style="cursor: not-allowed">{{item.ICD10}}</td>
                      <td class="fjm" style="cursor: not-allowed">{{item.fjm}}</td>
                      <td class="rybq">
                        <el-select
                          size="mini"
                          v-model="item.entryState"
                          :id="'WesternDiagnoseTable' + index + 'entryState'"
                          :ref="'WesternDiagnoseTable' + index + 'entryState'"
                          :popper-class="'WesternDiagnoseTable' + index + 'entryState' + 'poper'"
                          @focus="triggerSelectVisible(false, 'WesternDiagnoseTable' + index + 'entryState')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'WesternDiagnoseTable' + index + 'entryState')"
                          @keydown.native="handleSelectEnterNum($event, optionData.entryState, 'WesternDiagnoseTable' + index + 'entryState', item, 'entryState')"
                          @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'entryState')"
                          @keydown.native.39="tableFocusNext('WesternDiagnoseTable', index, 'entryState')"
                          @keydown.native.37="tableFocusUp('WesternDiagnoseTable', index, 'entryState')"
                          @keyup.native.38="tableFocusUp2('WesternDiagnoseTable', index, 'entryState', -1)"
                          @keyup.native.40="tableFocusUp2('WesternDiagnoseTable', index, 'entryState', 1)"
                        >
                          <el-option
                                  v-for="item in optionData.entryState"
                                  :label="item.label"
                                  :value="item.value"
                                  :key="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                      <td class="gz">
                        <el-select

                          size="mini"
                          col="1"
                          row="1"
                          v-model="item.turnReturn"
                          :id="'WesternDiagnoseTable' + index + 'turnReturn'"
                          :ref="'WesternDiagnoseTable' + index + 'turnReturn'"
                          :popper-class="'WesternDiagnoseTable' + index + 'turnReturn' + 'poper'"
                          @change="setDieState(item)"
                          @focus="triggerSelectVisible(false, 'WesternDiagnoseTable' + index + 'turnReturn')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'WesternDiagnoseTable' + index + 'turnReturn')"
                          @keydown.native="handleSelectEnterNum($event, optionData.turnReturn, 'WesternDiagnoseTable' + index + 'turnReturn', item, 'turnReturn')"
                          @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'turnReturn')"
                          @keydown.native.39="tableFocusNext('WesternDiagnoseTable', index, 'turnReturn')"
                          @keydown.native.37="tableFocusUp('WesternDiagnoseTable', index, 'turnReturn')"
                          @keyup.native.38="tableFocusUp2('WesternDiagnoseTable', index, 'turnReturn', -1)"
                          @keyup.native.40="tableFocusUp2('WesternDiagnoseTable', index, 'turnReturn', 1)"
                        >
                          <el-option
                                  v-for="item in optionData.turnReturn"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                      <td class="zdlb" >
                        <el-select
                                v-if="item.type !== 'main'"
                          size="mini"
                          v-model="item.baf106"
                          :id="'WesternDiagnoseTable' + index + 'baf106'"
                          :ref="'WesternDiagnoseTable' + index + 'baf106'"
                          @change="zdlbChange(item)"
                          @focus="triggerSelectVisible(false, 'WesternDiagnoseTable' + index + 'baf106')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'WesternDiagnoseTable' + index + 'baf106')"
                          @keydown.native="handleSelectEnterNum($event, optionData.zdType, 'WesternDiagnoseTable' + index + 'baf106', item, 'baf106')"
                          :popper-class="'WesternDiagnoseTable' + index + 'baf106' + 'poper'"
                          @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'baf106', item.baf106)"
                          @keydown.native.39="tableFocusNext('WesternDiagnoseTable', index, 'baf106', item.baf106)"
                          @keydown.native.37="tableFocusUp('WesternDiagnoseTable', index, 'baf106', item.baf106)"
                                @keyup.native.38="tableFocusUp2('WesternDiagnoseTable', index, 'baf106', -1)"
                                @keyup.native.40="tableFocusUp2('WesternDiagnoseTable', index, 'baf106', 1)"
                        >
                          <el-option
                                  v-for="item in optionData.zdType"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                      <td class="grbw" >
                        <el-select
                                v-if="item.type !== 'main'"
                                size="mini"
                                v-model="item.baf107"
                                :disabled="item.baf106 !== '1'"
                                :ref="'WesternDiagnoseTable' + index + 'baf107'"
                                :id="'WesternDiagnoseTable' + index + 'baf107'"
                                :popper-class="'WesternDiagnoseTable' + index + 'baf107' + 'poper'"
                                @keydown.native="handleSelectEnterNum($event, optionData.grType, 'WesternDiagnoseTable' + index + 'baf107', item, 'baf107')"
                                @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'baf107', item.baf106)"
                                @keydown.native.39="tableFocusNext('WesternDiagnoseTable', index, 'baf107', item.baf106)"
                                @keydown.native.37="tableFocusUp('WesternDiagnoseTable', index, 'baf107', item.baf106)"
                                @keyup.native.38="tableFocusUp2('WesternDiagnoseTable', index, 'baf107', -1)"
                                @keyup.native.40="tableFocusUp2('WesternDiagnoseTable', index, 'baf107', 1)"
                        >
                          <el-option
                                  v-for="item in optionData.grType"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                      <td class="ssyg" >
                        <el-select
                                v-if="item.type !== 'main'"
                                size="mini"
                                v-model="item.baf109"
                                :disabled="item.baf106 === '0'"
                                :ref="'WesternDiagnoseTable' + index + 'baf109'"
                                :id="'WesternDiagnoseTable' + index + 'baf109'"
                                :popper-class="'WesternDiagnoseTable' + index + 'baf109' + 'poper'"
                                @keydown.native="handleSelectEnterNum($event, optionData.ssType, 'WesternDiagnoseTable' + index + 'baf109', item, 'baf109')"
                                @keydown.native.13="tableFocusNext('WesternDiagnoseTable', index, 'baf109', item.baf106)"
                                @keydown.native.39="tableFocusNext('WesternDiagnoseTable', index, 'baf109', item.baf106)"
                                @keydown.native.37="tableFocusUp('WesternDiagnoseTable', index, 'baf109', item.baf106)"
                                @keyup.native.38="tableFocusUp2('WesternDiagnoseTable', index, 'baf109', -1)"
                                @keyup.native.40="tableFocusUp2('WesternDiagnoseTable', index, 'baf109', 1)"
                        >
                          <el-option
                                  v-for="item in optionData.ssType"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="10">
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
                  <draggable
                    element="tbody"
                    v-model="ChineseDiagnoseTable"
                    @change="handleChineseTableDrag"
                  >
                    <tr
                      v-for="(item, index) in ChineseDiagnoseTable"
                      v-clickoutside="clearTableActiveRow"
                      @click.stop="setTableActiveRow(index, 'ChineseDiagnoseTable')"
                    >
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
                                type="textarea"
                                class="table-input diseaseName"
                                :value="item.diseaseName"
                                @input.native="inputInfo( 'ChineseDiagnoseTable' + index + 'diseaseName')"
                          style="line-height: 25px;"
                          :id="'ChineseDiagnoseTable' + index + 'diseaseName'"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'diseaseName')"
                          @keydown.native.39="tableFocusNext('ChineseDiagnoseTable', index, 'diseaseName')"
                          @keydown.native.37="tableFocusUp('ChineseDiagnoseTable', index, 'diseaseName')"
                          @keyup.native.38="tableFocusUp2('ChineseDiagnoseTable', index, 'diseaseName', -1)"
                          @keyup.native.40="tableFocusUp2('ChineseDiagnoseTable', index, 'diseaseName', 1)"
                          @keydown.native.115="clearDictInputValue(ChineseDiagnoseTable, 'diseaseName,diseaseCode', index)"
                          @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'chineseDiagnoseDict',
                                            opener: 'ChineseDiagnoseTable',
                                            dictExtraParams: {code: item.type === 'main' ? 'B' : 'Z', bz: 1},
                                            fields: [
                                                {dictField: 'dmmc', targetField: 'diseaseName'},
                                                {dictField: 'dm', targetField: 'diseaseCode'}
                                            ],
                                            index: index
                                        })"
                        ></el-input>
                      </td>
                      <td class="icd10" style="cursor: not-allowed">{{item.diseaseCode}}</td>
                      <td class="rybq" v-if="item.type === 'main'">
                        <el-select
                          size="mini"

                          v-model="item.entryState"

                          :id="'ChineseDiagnoseTable' + index + 'entryState'"
                          :ref="'ChineseDiagnoseTable' + index + 'entryState'"
                          :popper-class="'ChineseDiagnoseTable' + index + 'entryState' + 'poper'"
                          @focus="triggerSelectVisible(false, 'ChineseDiagnoseTable' + index + 'entryState')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'ChineseDiagnoseTable' + index + 'entryState')"
                          @keydown.native="handleSelectEnterNum($event, optionData.entryState,'ChineseDiagnoseTable' + index + 'entryState', item, 'entryState')"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'entryState')"
                          @keydown.native.39="tableFocusNext('ChineseDiagnoseTable', index, 'entryState')"
                          @keydown.native.37="tableFocusUp('ChineseDiagnoseTable', index, 'entryState')"
                          @keyup.native.38="tableFocusUp2('ChineseDiagnoseTable', index, 'entryState', -1)"
                          @keyup.native.40="tableFocusUp2('ChineseDiagnoseTable', index, 'entryState', 1)"
                        >
                          <el-option
                            v-for="item in optionData.entryState"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                      <td class="rybq" v-else>
                        <el-select
                          size="mini"

                          v-model="item.entryState"

                          :id="'ChineseDiagnoseTable' + index + 'entryState'"
                          :ref="'ChineseDiagnoseTable' + index + 'entryState'"
                          :popper-class="'ChineseDiagnoseTable' + index + 'entryState' + 'poper'"
                          @focus="triggerSelectVisible(false, 'ChineseDiagnoseTable' + index + 'entryState')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'ChineseDiagnoseTable' + index + 'entryState')"
                          @keydown.native="handleSelectEnterNum($event, optionData.entryState,'ChineseDiagnoseTable' + index + 'entryState', item, 'entryState')"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'entryState')"
                          @keydown.native.39="tableFocusNext('ChineseDiagnoseTable', index, 'entryState')"
                          @keydown.native.37="tableFocusUp('ChineseDiagnoseTable', index, 'entryState')"
                          @keyup.native.38="tableFocusUp2('ChineseDiagnoseTable', index, 'entryState', -1)"
                          @keyup.native.40="tableFocusUp2('ChineseDiagnoseTable', index, 'entryState', 1)"
                        >
                          <el-option
                            v-for="item in optionData.entryState"
                            :label="item.label"
                            :value="item.value"
                            :key="item.value"
                          >{{item.value + '. ' + item.label}}</el-option>
                        </el-select>
                      </td>
                      <td class="gz" v-if="item.type === 'main'">
                        <el-select
                          size="mini"
                          v-model="item.turnReturn"
                          :id="'ChineseDiagnoseTable' + index + 'turnReturn'"
                          :ref="'ChineseDiagnoseTable' + index + 'turnReturn'"
                          :popper-class="'ChineseDiagnoseTable' + index + 'turnReturn' + 'poper'"
                          @focus="triggerSelectVisible(false, 'ChineseDiagnoseTable' + index + 'turnReturn')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'ChineseDiagnoseTable' + index + 'turnReturn')"
                          @keydown.native="handleSelectEnterNum($event, optionData.turnReturn, 'ChineseDiagnoseTable' + index + 'turnReturn', item, 'turnReturn')"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'turnReturn')"
                          @keydown.native.39="tableFocusNext('ChineseDiagnoseTable', index, 'turnReturn')"
                          @keydown.native.37="tableFocusUp('ChineseDiagnoseTable', index, 'turnReturn')"
                          @keyup.native.38="tableFocusUp2('ChineseDiagnoseTable', index, 'turnReturn', -1)"
                          @keyup.native.40="tableFocusUp2('ChineseDiagnoseTable', index, 'turnReturn', 1)"
                        >
                          <el-option
                            v-for="item in optionData.turnReturn"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          />
                        </el-select>
                      </td>
                      <td class="gz" v-else>
                        <el-select
                          size="mini"
                          v-model="item.turnReturn"
                          :id="'ChineseDiagnoseTable' + index + 'turnReturn'"
                          :ref="'ChineseDiagnoseTable' + index + 'turnReturn'"
                          :popper-class="'ChineseDiagnoseTable' + index + 'turnReturn' + 'poper'"
                          @focus="triggerSelectVisible(false, 'ChineseDiagnoseTable' + index + 'turnReturn')"
                          @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'ChineseDiagnoseTable' + index + 'turnReturn')"
                          @keydown.native="handleSelectEnterNum($event, optionData.turnReturn, 'ChineseDiagnoseTable' + index + 'turnReturn', item, 'turnReturn')"
                          @keydown.native.13="tableFocusNext('ChineseDiagnoseTable', index, 'turnReturn')"
                          @keydown.native.39="tableFocusNext('ChineseDiagnoseTable', index, 'turnReturn')"
                          @keydown.native.37="tableFocusUp('ChineseDiagnoseTable', index, 'turnReturn')"
                          @keyup.native.38="tableFocusUp2('ChineseDiagnoseTable', index, 'turnReturn', -1)"
                          @keyup.native.40="tableFocusUp2('ChineseDiagnoseTable', index, 'turnReturn', 1)"
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
                @clear="clearDictInputValue"

                @openDictDialog="showDictInputDialog"
                @openSpecialDialog="openSpecialDialog"
                @delDictValue="handleDelDictValue"
              />
            </el-row>
<!--            <el-button type="text" size="mini" style="float: right" @click="openHIS('operation')">HIS原始信息</el-button>-->
            <table class="table" id="operationTable">
              <thead>
                <tr>
                  <th rowspan="2">操作</th>
                  <th rowspan="2" style="width:3%">手术操作编码</th>
                  <th rowspan="2"  >手术操作日期</th>
                  <th rowspan="2">手术级别</th>
                  <th rowspan="2"  style="width:4.2%">手术操作名称</th>

                  <th colspan="3">手术操作医师</th>
                  <th rowspan="2">切口</th>
                  <th rowspan="2" style="width:2%">愈合等级</th>
                  <th rowspan="2" style="width:2%">麻醉方式</th>
                  <th rowspan="2" style="width:2%">麻醉等级</th>
                  <th rowspan="2" style="width:2%">麻醉医师</th>
                  <th rowspan="2" style="width:2%">手术类型</th>
                  <th rowspan="2" style="width:2%">手术持续时间</th>
                  <th rowspan="2" style="width:2.2%">手术/操作类别</th>
                </tr>
                <tr>

                  <th style="width: 1.3%">术者</th>
                  <th style="width: 1.3%">Ⅰ助</th>
                  <th style="width: 1.3%">Ⅱ助</th>

                </tr>
              </thead>
              <draggable element="tbody" v-model="operationTable">
                <tr
                  v-for="(item, index) in operationTable"
                  v-clickoutside="clearTableActiveRow"
                  @click.stop="setTableActiveRow(index, 'operationTable')"
                >
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
                  <td>
                    <el-input
                            type="textarea"
                            class="table-input diseaseName"
                            :value="item.baf405"
                            @input.native="inputInfo( 'operationTable' + index + 'baf405')"
                            :id="'operationTable' + index + 'baf405'"
                            @keydown.native.115="clearDictInputValue(operationTable, 'baf405,baf404,baf408,baf408name', index)"
                            @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'operationDict',
                                            opener: 'operationTable',
                                            dictExtraParams: {code:  1 },
                                            fields: [
                                                {dictField: 'dm', targetField: 'baf408'},
                                                {dictField: 'dmmc', targetField: 'baf408name'},
                                                {dictField: 'iccm', targetField: 'baf405'},
                                                {dictField: 'sjjb', targetField: 'baf404'}
                                            ],
                                            index: index
                                        })"
                            @keydown.native.13="tableFocusNext('operationTable', index, 'baf405')"
                            @keydown.native.39="tableFocusNext('operationTable', index, 'baf405')"
                            @keydown.native.37="tableFocusUp('operationTable', index, 'baf405')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf405', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf405', 1)"

                    >
                    </el-input>
                    </td>
                  <!-- 手术操作日期 -->
                  <td >
                    <el-input

                      type="text"
                      size="mini"
                      style="width: 110px;"
                      class="table-input diseaseName"
                      :class="{'table-input': true, 'table-error-input': errorInfo.tableErrorObj.operationTable['baf405-' + index]}"
                      v-model="item.baf411"
                      :id="'operationTable' + index + 'baf411'"
                      @keydown.native.115="clearField(item, 'baf411')"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf411')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf411')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf411')"
                      @keyup.native.38="tableFocusUp2('operationTable', index, 'baf411', -1)"
                      @keyup.native.40="tableFocusUp2('operationTable', index, 'baf411', 1)"
                    />
                  </td>
                  <!-- 手术级别 -->
                  <td>
                    <el-select
                      size="mini"
                      v-model="item.baf404"
                      :class="{'table-error-input': errorInfo.tableErrorObj.operationTable['baf404-' + index]}"
                      :id="'operationTable' + index + 'baf404'"
                      :ref="'operationTable' + index + 'baf404'"
                      :popper-class="'operationTable' + index + 'baf404' + 'poper'"

                      @focus="triggerSelectVisible(false, 'operationTable' + index + 'baf404')"
                      @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'operationTable' + index + 'baf404')"
                      @keydown.native="handleSelectEnterNum($event, optionData.operationLevel, 'operationTable' + index + 'baf404', item, 'baf404')"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf404')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf404')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf404')"
                      @keyup.native.38="tableFocusUp2('operationTable', index, 'baf404', -1)"
                      @keyup.native.40="tableFocusUp2('operationTable', index, 'baf404', 1)"
                    >
                      <el-option
                        v-for="item in optionData.operationLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >{{!item.value ? item.label : item.value + '. ' +item.label}}</el-option>
                    </el-select>
                  </td>
                  <!-- 手术操作名称 -->
                  <td>
<!--                    <el-input-->
<!--                            type="text"-->
<!--                            size="mini"-->
<!--                            :class="{'table-input': true, 'table-error-input': errorInfo.tableErrorObj.operationTable['baf408name-' + index]}"-->
<!--                            :value="item.baf408name"-->
<!--                            :id="'operationTable' + index + 'baf408name'"-->
<!--                            @keydown.native.13="tableFocusNext('operationTable', index, 'baf408name')"-->
<!--                           disabled-->
<!--                    />-->
                    <div>
                      {{item.baf408name}}
                    </div>
                  </td>
                  <!-- 术者 -->
                  <td>
                    <el-input
                            type="textarea"
                            class="table-input diseaseName"
                            :value="item.baf409name"
                            @input.native="inputInfo( 'operationTable' + index + 'baf409')"
                      :id="'operationTable' + index + 'baf409'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf409')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf409')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf409')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf409', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf409', 1)"
                      @keydown.native.115="clearDictInputValue(operationTable, 'baf409,baf409name', index)"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [
                                                    {dictField: 'dm', targetField: 'baf409'},
                                                     {dictField: 'dmmc', targetField: 'baf409name'}
                                                    ],
                                            index: index
                                        })"
                    ></el-input>
                  </td>
                  <!-- Ⅰ助 -->
                  <td>
                    <el-input
                            type="textarea"
                            class="table-input diseaseName"
                            :value="item.baf414name"
                            @input.native="inputInfo( 'operationTable' + index + 'baf414')"
                      :id="'operationTable' + index + 'baf414'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf414')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf414')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf414')"

                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf414', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf414', 1)"
                            @keydown.native.115="clearDictInputValue(operationTable, 'baf414,baf414name', index)"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [
                                                    {dictField: 'dm', targetField: 'baf414'},
                                                    {dictField: 'dmmc', targetField: 'baf414name'}
                                                    ],
                                            index: index
                                        })"
                    ></el-input>
                  </td>
                  <!-- Ⅱ助 -->
                  <td>
                    <el-input
                            type="textarea"
                            class="table-input diseaseName"
                            :value="item.baf415name"
                            @input.native="inputInfo( 'operationTable' + index + 'baf415')"
                      :id="'operationTable' + index + 'baf415'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf415')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf415')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf415')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf415', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf415', 1)"
                            @keydown.native.115="clearDictInputValue(operationTable, 'baf415,baf415name', index)"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [
                                                    {dictField: 'dm', targetField: 'baf415'},
                                                    {dictField: 'dmmc', targetField: 'baf415name'}
                                                    ],
                                            index: index
                                        })"
                    ></el-input>
                  </td>
                  <!-- 切口 -->
                  <td>
                    <el-select
                      size="mini"
                      v-model="item.baf412"
                      :id="'operationTable' + index + 'baf412'"
                      :ref="'operationTable' + index + 'baf412'"
                      :popper-class="'operationTable' + index + 'baf412' + 'poper'"
                      @focus="triggerSelectVisible(false, 'operationTable' + index + 'baf412')"
                      @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'operationTable' + index + 'baf412')"
                      @keydown.native="handleSelectEnterNum($event, optionData.incision, 'operationTable' + index + 'baf412', item, 'baf412')"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf412')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf412')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf412')"
                      @keyup.native.38="tableFocusUp2('operationTable', index, 'baf412', -1)"
                      @keyup.native.40="tableFocusUp2('operationTable', index, 'baf412', 1)"
                    >
                      <el-option
                        v-for="item in optionData.incision"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >{{!item.value ? item.label : item.value + '. ' +item.label}}</el-option>
                    </el-select>
                  </td>
                  <!-- 愈合等级 -->
                  <td>
                    <el-select
                      size="mini"
                      v-model="item.baf413"
                      :id="'operationTable' + index + 'baf413'"
                      :ref="'operationTable' + index + 'baf413'"
                      :popper-class="'operationTable' + index + 'baf413' + 'poper'"
                      @focus="triggerSelectVisible(false, 'operationTable' + index + 'baf413')"
                      @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'operationTable' + index + 'baf413')"
                      @keydown.native="handleSelectEnterNum($event, optionData.healingLevel, 'operationTable' + index + 'baf413', item, 'baf413')"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf413')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf413')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf413')"
                      @keyup.native.38="tableFocusUp2('operationTable', index, 'baf413', -1)"
                      @keyup.native.40="tableFocusUp2('operationTable', index, 'baf413', 1)"
                    >
                      <el-option
                        v-for="item in optionData.healingLevel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >{{!item.value ? item.label : item.value + '. ' +item.label}}</el-option>
                    </el-select>
                  </td>
                  <!-- 麻醉方式 -->
                  <td>
                    <el-input
                            type="textarea"
                            class="table-input diseaseName"
                            :value="item.baf410name"
                            @input.native="inputInfo( 'operationTable' + index + 'baf410name')"
                      :id="'operationTable' + index + 'baf410name'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf410name')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf410name')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf410name')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf410name', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf410name', 1)"
                      @keydown.native.115="clearDictInputValue(operationTable, 'baf410name,baf410', index)"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'anesthesiaDict',
                                            opener: 'operationTable',
                                            fields: [
                                                {dictField: 'dmmc', targetField: 'baf410name'},
                                                {dictField: 'dm', targetField: 'baf410'}
                                            ],
                                            index: index
                                        })"
                    ></el-input>
                  </td>
<!--                  麻醉等级-->
                  <td>
                    <el-select
                            size="mini"
                            v-model="item.baf423"
                            :id="'operationTable' + index + 'baf423'"
                            :ref="'operationTable' + index + 'baf423'"
                            :popper-class="'operationTable' + index + 'baf423' + 'poper'"
                            @focus="triggerSelectVisible(false, 'operationTable' + index + 'baf423')"
                            @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'operationTable' + index + 'baf423')"
                            @keydown.native="handleSelectEnterNum($event,  optionData.opetationLevel, 'operationTable' + index + 'baf423', item, 'baf423')"
                            @keydown.native.13="tableFocusNext('operationTable', index, 'baf423')"
                            @keydown.native.39="tableFocusNext('operationTable', index, 'baf423')"
                            @keydown.native.37="tableFocusUp('operationTable', index, 'baf423')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf423', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf423', 1)"
                    >
                      <el-option
                              v-for="item in optionData.opetationLevel"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                      >{{!item.value ? item.label : item.value + '. ' +item.label}}</el-option>
                    </el-select>
                  </td>
                  <!-- 麻醉医师 -->
                  <td>
                    <el-input
                            type="textarea"
                            class="table-input diseaseName"
                            :value="item.baf416name"
                            @input.native="inputInfo( 'operationTable' + index + 'baf416')"
                      :id="'operationTable' + index + 'baf416'"
                      @keydown.native.13="tableFocusNext('operationTable', index, 'baf416')"
                      @keydown.native.39="tableFocusNext('operationTable', index, 'baf416')"
                      @keydown.native.37="tableFocusUp('operationTable', index, 'baf416')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf416', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf416', 1)"
                            @keydown.native.115="clearDictInputValue(operationTable, 'baf416,baf416name', index)"
                      @keyup.native.32="showDictInputDialog($event, {
                                            dictType: 'doctorDict',
                                            opener: 'operationTable',
                                            fields: [
                                                    {dictField: 'dmmc', targetField: 'baf416name'},
                                                    {dictField: 'dm', targetField: 'baf416'},
                                                    ],
                                            index: index
                                        })"
                    ></el-input>
                  </td>
                  <!-- 手术类型 -->
                  <td>
                    <el-select
                            size="mini"
                            v-model="item.baf421"
                            :id="'operationTable' + index + 'baf421'"
                            :ref="'operationTable' + index + 'baf421'"
                            :popper-class="'operationTable' + index + 'baf421' + 'poper'"
                            @focus="triggerSelectVisible(false, 'operationTable' + index + 'baf421')"
                            @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'operationTable' + index + 'baf421')"
                            @keydown.native="handleSelectEnterNum($event, optionData.opetationType, 'operationTable' + index + 'baf421', item, 'baf421')"
                            @keydown.native.13="tableFocusNext('operationTable', index, 'baf421')"
                            @keydown.native.39="tableFocusNext('operationTable', index, 'baf421')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf421', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf421', 1)"
                            @keydown.native.37="tableFocusUp('operationTable', index, 'baf421')"
                    >
                      <el-option
                              v-for="item in optionData.opetationType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                      >{{!item.value ? item.label : item.value + '. ' +item.label}}</el-option>
                    </el-select>
                  </td>
                  <!-- 手术持续时间 -->
                  <td>
                    <el-input
                            type="text"
                            size="mini"
                            :class="{'table-input': true, 'table-error-input': errorInfo.tableErrorObj.operationTable['baf422-' + index]}"
                            v-model="item.baf422"
                            :id="'operationTable' + index + 'baf422'"
                            @keydown.native.13="tableFocusNext('operationTable', index, 'baf422')"
                            @keydown.native.39="tableFocusNext('operationTable', index, 'baf422')"

                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf422', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf422', 1)"
                            @keydown.native.37="tableFocusUp('operationTable', index, 'baf422')"
                    />
                  </td>
                  <!-- 手术/操作类别 -->
                  <td>
                    <el-select
                            size="mini"
                            v-model="item.baf424"
                            :id="'operationTable' + index + 'baf424'"
                            :ref="'operationTable' + index + 'baf424'"
                            :popper-class="'operationTable' + index + 'baf424' + 'poper'"
                            @focus="triggerSelectVisible(false, 'operationTable' + index + 'baf424')"
                            @keydown.native.space.stop.prevent="triggerSelectVisible(true, 'operationTable' + index + 'baf424')"
                            @keydown.native="handleSelectEnterNum($event, optionData.operationProperty, 'operationTable' + index + 'baf424', item, 'baf424')"
                            @keydown.native.13="tableFocusNext('operationTable', index, 'baf424')"
                            @keydown.native.39="tableFocusNext('operationTable', index, 'baf424')"
                            @keyup.native.38="tableFocusUp2('operationTable', index, 'baf424', -1)"
                            @keyup.native.40="tableFocusUp2('operationTable', index, 'baf424', 1)"
                            @keydown.native.37="tableFocusUp('operationTable', index, 'baf424')"
                    >
                      <el-option
                              v-for="item in optionData.operationProperty"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                      >{{!item.value ? item.label : item.value + '. ' +item.label}}</el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>

                  <td colspan="16">
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
                @clear="clearDictInputValue"
                @openSpecialDialog="openSpecialDialog"
                @openDictDialog="showDictInputDialog"
                @delDictValue="handleDelDictValue"
              />
            </el-row>

              <br/>
            <el-row :gutter="16">
              <input-item
                      v-for="item in fourthlyInputs"
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
                      @clear="clearDictInputValue"
              />
            </el-row>

          </el-card>
        </el-main>
      </el-container>


    <div :style="{marginBottom: fixedBottonHeight}">
      <div class="fixed-footer" :style="{height: fixedBottonHeight}">
        <div class="err-drawer" :style="{height: errorInfo.height + 'px'}">
          <div class="err-drawer-header">
            <span style="display: inline-block;width: 47%;">审核错误信息</span>
            <span style="display: inline-block;width: 49%;margin-left: 1%;">病案质控评分</span>
            <i
              :class="errorInfo.visible ? 'el-icon-d-arrow-right err-drawer-headericon' : 'el-icon-d-arrow-left err-drawer-headericon'"
              @click="triggerErrorVisible"
            />
          </div>
          <div class="err-drawer-body">

            <div style="float: left;width: 47%;">
              <el-table
                      :data="errorInfo.errorData"
                      max-height="170px"
                      size="mini"
                      border
                      stripe
                      highlight-current-row
                      @row-click="jumpToErrInput"
              >
                <el-table-column prop="errMsg" label="错误提示"></el-table-column>
              </el-table>
            </div>
            <div style="margin-left: 1%;float: left; width: 49%;">
              <el-table
                      :data="scoreInfo.scoreData"
                      max-height="170px"
                      size="mini"
                      border
                      stripe
                      highlight-current-row
                      @row-click="jumpToErrInput"
              >
                <el-table-column prop="jlmc" label="扣分项"></el-table-column>
                <el-table-column prop="fs" label="扣分值">
                  <template slot-scope="scope">
                    -{{scope.row.fs}}
                  </template>
                </el-table-column>
              </el-table>
            </div>


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
      :westernData="WesternDiagnoseTable"
      :diagnosisData.sync="pathologicDiagnosisDialog.diagnosisData"
      @submit="handlePathologicSubmit"
    />

    <editPatientCode ref="child" :list="this.list" @fun="editPatient"></editPatientCode>

    <change-department-input
            :visible.sync="changeDepartmentDialog.visible"
            :baza00="changeDepartmentDialog.baza00"
            :enterDate="changeDepartmentDialog.enterDate"
            :departmentData.sync="changeDepartmentDialog.departmentData"
            @submit=""
    />

<!--    <drag-dialog :title="HIS.title" width="600px" v-model="HIS.visible">-->
<!--      <el-table :data="HIS.data" v-if="HIS.type === 'diagnose'" border size="mini">-->
<!--        <el-table-column prop="diagnoseType" label="诊断类型"></el-table-column>-->
<!--        <el-table-column prop="diagnoseName" label="诊断名称"></el-table-column>-->
<!--        <el-table-column prop="icd10" label="ICD_10"></el-table-column>-->
<!--        <el-table-column prop="entryState" label="入院病情"></el-table-column>-->
<!--        <el-table-column prop="turnReturn" label="转归"></el-table-column>-->
<!--      </el-table>-->
<!--      <el-table :data="HIS.data" v-if="HIS.type === 'operation'" border size="mini">-->
<!--        <el-table-column prop="icd10" label="ICD_10"></el-table-column>-->
<!--        <el-table-column prop="operationName" label="手术名称"></el-table-column>-->
<!--      </el-table>-->
<!--    </drag-dialog>-->
    <tutelage-dialog
            :baza00="intensiveCareDialog.baza00"
            :enterDate="intensiveCareDialog.enterDate"
            :TutelageData.sync="intensiveCareDialog.TutelageData"
            :visible.sync="intensiveCareDialog.visible"
            :totalTime.sync="intensiveCareDialog.totalTime"
            :rysj="intensiveCareDialog.rysj"
            :cysj="intensiveCareDialog.cysj"
            @submit="handleTutelageSubmit"
    ></tutelage-dialog>
    <newbaby-dialog
            :baza00="NewBaby.baza00"
            :newBabyData.sync="NewBaby.newBabyData"
            :visible.sync="NewBaby.visible"
            @submit="handleNewBabySubmit"
    ></newbaby-dialog>
    <die-info-dialog
            :baza00="dieInfo.baza00"
            :swsjhz="dieInfo.swsjhz"
            :dieInfoData.sync="dieInfo.dieInfoData"
            :visible.sync="dieInfo.visible"
            @submit="handleDieInfoSubmit"
    ></die-info-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
@import "./index.less";
</style>

<template>
  <div class="page-random-search">
    <el-card class="card" header="随机查询：建立条件" shadow="never" body-style="padding: 0">
      <el-row :gutter="0">
        <el-col class="left" :lg="12" :md="12" :sm="12" :xs="24" ref="leftBox">
          <div class="left-new-condition">
            <p class="left-desc">如果您需建立新条件组，请在下方编辑框内填写条件组的名字，回车键确认后进入右边表格组织该条件组。</p>
            <el-input
              class="left-input"
              size="small"
              v-model="addGroupName"
              ref="groupAdd"
              @keyup.native.13="handleCreateGroup"
            ></el-input>
          </div>
        </el-col>
        <!-- <el-divider></el-divider> -->
        <el-col class="left" :lg="12" :md="12" :sm="12" :xs="24" ref="leftBox">
          <div class="left-had-condition">
            <p class="left-desc">您可在下方下拉选择已建立的条件组，回车键确认后，重新组织该条件组，或者直进行查询工作。</p>
            <el-select
              class="left-select"
              style="width: 100%"
              size="small"
              v-model="editGroupId"
              ref="groupSelect"
              @change="handleEditGroup"
            >
              <el-option v-for="item in savedGroups" :value="item" :label="item" :key="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col class="right">
          <div class="right-content">
            <el-table
              :data="conditionItems"
              class="table"
              border
              empty-text="暂无条件项"
              size="small"
              @cell-click="setCurrentItem"
              @cell-dblclick="handleAddBrackets"
            >
              <el-table-column prop="index" width="40">
                <template slot-scope="scope">
                  <i
                    v-if="scope.row.index === currentIndex"
                    class="el-icon-caret-right"
                    style="color: red"
                  ></i>
                </template>
              </el-table-column>
              <el-table-column prop="fh1" label="(" align="center" width="90">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    :id="'fh1-' + scope.row.index"
                    :value="scope.row.fh1"
                    @keydown.native.13="focusNext('fh1-' + scope.row.index)"
                    @keydown.native.delete="handleDelBrackets('fh1', scope.row.index)"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="条件项" align="center">
                <template slot-scope="scope">
                  <el-input
                    :id="'conditionField-' + scope.row.index"
                    size="mini"
                    :value="scope.row.conditionFieldName"
                    @keydown.native.13="focusNext('conditionField-' + scope.row.index)"
                    @keyup.native.32="handleOpenDictDialog($event, 'field', scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="relation" label="关系" align="center" width="120">
                <template slot-scope="scope">
                  <el-select
                    :ref="'select-conditionRelation-' + scope.row.index"
                    size="mini"
                    v-model="scope.row.conditionRelation"
                    :id="'conditionRelation-' + scope.row.index"
                    :popper-class="'selectwrap-conditionRelation-' + scope.$index"
                    @keydown.native.13="focusNext('conditionRelation-' + scope.row.index, $event)"
                  >
                    <el-option
                      v-for="item in conditionRelationOptions"
                      :value="item.value"
                      :label="item.label"
                      :key="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="条件值" align="center">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-model="scope.row.conditionValueName"
                    :id="'conditionValueName-' + scope.row.index"
                    @keydown.native.13="focusNext('conditionValueName-' + scope.row.index)"
                    @keyup.native.32="handleOpenDictDialog($event, 'value', scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="fh2" label=")" align="center" width="90">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    :id="'fh2-' + scope.row.index"
                    :value="scope.row.fh2"
                    @keydown.native.13="focusNext('fh2-' + scope.row.index)"
                    @keydown.native.delete="handleDelBrackets('fh2', scope.row.index)"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="itemRelation" label="关联" align="center" width="100">
                <template slot-scope="scope">
                  <el-select
                    :ref="'select-itemRelation-' + scope.row.index"
                    v-if="scope.$index !== conditionItems.length - 1"
                    size="mini"
                    placeholder
                    v-model="scope.row.itemRelation"
                    :id="'itemRelation-' + scope.row.index"
                    :popper-class="'selectwrap-itemRelation-' + scope.$index"
                    @keydown.native.13="focusNext('itemRelation-' + scope.row.index)"
                  >
                    <el-option value="AND" label="并且"></el-option>
                    <el-option value="OR" label="或者"></el-option>
                  </el-select>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="right-footer">
            <el-button size="small" type="primary" @click="handleAddItem()">增加</el-button>
            <el-button size="small" type="primary" @click="handleRemoveItem()">删除</el-button>
            <el-button size="small" type="primary" @click="handleInsertItem()">插入</el-button>
            <el-button size="small" type="primary" @click="handleSave">保存</el-button>
            <el-button
              size="small"
              type="primary"
              @click="getResultData({page: 1, rows: 10})"
              :loading="resultLoading"
            >查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <dict-input
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />
    <!-- <el-card class="card" shadow="never" body-style="padding: 10px 20px">
      <span style="margin-right: 20px">查询病案结果 病案份数：{{pager.total}}</span>
      <out-put-dialog v-if="conditionList" :conditionList="conditionList" />
    </el-card>

    <el-table :data="resultData" border size="small" v-loading="resultLoading">
      <el-table-column prop="baza01" label="病案号" align="center">
        <template slot-scope="scope">
          <span class="link" @click="toHomePage(scope.row.baza00)">{{scope.row.baza01}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="baza02" label="姓名" align="center"></el-table-column>
      <el-table-column prop="baza27" label="出院日期" align="center"></el-table-column>
      <el-table-column prop="dmmc" label="出院科别" align="center"></el-table-column>
      <el-table-column prop="baza80" label="归档号" align="center"></el-table-column>
    </el-table>

    <paging-toolbar style="margin-top: 20px;" :pager="pager" @change="getResultData" />-->

    <!-- <medicalDialog
      ref="child"
      :resulList="resultData"
      :pager="pager"
      :conditionList="conditionList"
      :condition="conditionItems"
      @fun="getResultData"
    ></medicalDialog>-->

    <el-dialog title :visible.sync="dialogTableVisible" append-to-body>
      <el-card class="card" shadow="never" body-style="padding: 10px 20px">
        <span style="margin-right: 20px">查询病案结果 病案份数：{{pager.total}}</span>
        <OutPutDialog v-if="conditionList" :conditionList="conditionList"></OutPutDialog>
      </el-card>

      <el-table :data="resultData" border size="small" v-loading="resultLoading">
        <el-table-column prop="baza01" label="病案号" align="center">
          <template slot-scope="scope">
            <span class="link" @click="toHomePage(scope.row.baza00)">{{scope.row.baza01}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="baza02" label="姓名" align="center"></el-table-column>
        <el-table-column prop="BAZA27" label="出院日期" align="center"></el-table-column>
        <el-table-column prop="kb" label="出院科别" align="center"></el-table-column>
        <el-table-column prop="baza80" label="归档号" align="center"></el-table-column>
      </el-table>
      <div class="page_foot">
        <PagingToolbar :pager="pager" @change="getResultData"></PagingToolbar>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
@import "./index.less";
</style>

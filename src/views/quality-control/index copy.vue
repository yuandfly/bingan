<template>
  <div class="page-random-search">
    <el-card shadow="never" body-style="padding: 0">
      <el-col :lg="8" :md="8" :sm="8" :xs="24" ref="leftBox">
        <div class="left-new-condition">
          <p class="left-desc">
            检查项目
          </p>
          <el-select
            class="left-select"
            style="width: 100%"
            size="small"
            v-model="checkItmeId"
            @change="queryQaulityItem"
          >
            <el-option
              v-for="item in checkItmeList"
              :value="item.value"
              :label="item.label"
              :key="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :lg="8" :md="8" :sm="8" :xs="24" ref="leftBox">
        <div class="left-new-condition">
          <p class="left-desc">
            项目类别
          </p>
          <el-select
            class="left-select"
            style="width: 100%"
            size="small"
            v-model="lb"
            @change="queryQaulityItem"
          >
            <el-option :value="1" label="A类"></el-option>
            <el-option :value="2" label="B类"></el-option>
            <el-option :value="3" label="C类"></el-option>
            <el-option :value="4" label="D类"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :lg="8" :md="8" :sm="8" :xs="24" ref="leftBox">
        <div class="left-new-condition">
          <p class="left-desc">
            分数
          </p>
          <el-input
            class="left-input"
            type="number"
            size="small"
            placeholder="请输入"
            v-model="addGroupName"
            ref="groupAdd"
            @keyup.native.13="handleCreateGroup"
          ></el-input>
        </div>
      </el-col>
    </el-card>
    <div class="add-rule">
      <el-button type="primary" plain size="small">添加评分项</el-button>
    </div>
    <el-card class="card" shadow="never" body-style="padding: 0">
      <el-row :gutter="0" v-for="(qualityItem, i) in qualityList" :key="i">
        <el-col>
          <div class="right-content">
            <el-table
              :data="qualityItem.zkzbDOList"
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
                    @keydown.native.delete="
                      handleDelBrackets('fh1', scope.row.index)
                    "
                  />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="评分项" align="center">
                <template slot-scope="scope">
                  <el-input
                    :id="'conditionField-' + scope.row.index"
                    size="mini"
                    :value="scope.row.conditionFieldName"
                    @keydown.native.13="
                      focusNext('conditionField-' + scope.row.index)
                    "
                    @keyup.native.32="
                      handleOpenDictDialog($event, 'field', scope.$index)
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="relation"
                label="关系"
                align="center"
                width="120"
              >
                <template slot-scope="scope">
                  <el-select
                    :ref="'select-conditionRelation-' + scope.row.index"
                    size="mini"
                    v-model="scope.row.conditionRelation"
                    :id="'conditionRelation-' + scope.row.index"
                    :popper-class="
                      'selectwrap-conditionRelation-' + scope.$index
                    "
                    @keydown.native.13="
                      focusNext('conditionRelation-' + scope.row.index, $event)
                    "
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
                    @keydown.native.13="
                      focusNext('conditionValueName-' + scope.row.index)
                    "
                    @keyup.native.32="
                      handleOpenDictDialog($event, 'value', scope.$index)
                    "
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
                    @keydown.native.delete="
                      handleDelBrackets('fh2', scope.row.index)
                    "
                  />
                </template>
              </el-table-column>
              <el-table-column
                prop="itemRelation"
                label="关联/分值"
                align="center"
                width="160"
              >
                <template slot-scope="scope">
                  <el-select
                    :ref="'select-itemRelation-' + scope.row.index"
                    v-if="scope.$index !== conditionItems.length - 1"
                    size="mini"
                    placeholder
                    v-model="scope.row.itemRelation"
                    :id="'itemRelation-' + scope.row.index"
                    :popper-class="'selectwrap-itemRelation-' + scope.$index"
                    @keydown.native.13="
                      focusNext('itemRelation-' + scope.row.index)
                    "
                  >
                    <el-option value="AND" label="并且"></el-option>
                    <el-option value="OR" label="或者"></el-option>
                  </el-select>
                  <el-input
                    type="number"
                    placeholder="请输入分值"
                    size="mini"
                    v-else
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="right-footer">
            <el-button
              size="small"
              type="primary"
              plain
              @click="handleAddItem()"
              >增加</el-button
            >
            <el-button
              size="small"
              type="primary"
              plain
              @click="handleRemoveItem()"
              >删除</el-button
            >
            <el-button
              size="small"
              type="primary"
              plain
              @click="handleInsertItem()"
              >插入</el-button
            >
          </div>
        </el-col>
      </el-row>
    </el-card>
    <div class="submit-box">
      <el-button
        size="small"
        type="primary"
        @click="submitHandler"
        icon="el-icon-check"
        >保存</el-button
      >
    </div>
    <dict-input
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />

    <el-dialog title :visible.sync="dialogTableVisible" append-to-body>
      <el-card class="card" shadow="never" body-style="padding: 10px 20px">
        <span style="margin-right: 20px"
          >查询病案结果 病案份数：{{ pager.total }}</span
        >
        <OutPutDialog
          v-if="conditionList"
          :conditionList="conditionList"
        ></OutPutDialog>
      </el-card>

      <el-table
        :data="resultData"
        border
        size="small"
        v-loading="resultLoading"
      >
        <el-table-column prop="baza01" label="病案号" align="center">
          <template slot-scope="scope">
            <span class="link" @click="toHomePage(scope.row.baza00)">{{
              scope.row.baza01
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="baza02"
          label="姓名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="BAZA27"
          label="出院日期"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="kb"
          label="出院科别"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="baza80"
          label="归档号"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="page_foot">
        <PagingToolbar :pager="pager" @change="getResultData"></PagingToolbar>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
@import './index.less';
</style>

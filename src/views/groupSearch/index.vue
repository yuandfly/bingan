<template>
  <div class="page-container">
    <el-row :gutter="8">
      <el-col v-for="(value, type) in filterFields" :span="value.span" :key="type">
        <filter-box
          :infoType="type"
          :header="value.header"
          :fields="value.fields"
          :heightRows="value.heightRows"
          :disabledObj="filterDisabledObj"
          :valueObj="filterValues"
          @checkChange="handleCheck"
          @openDictInput="handleOpenDictInput"
          @changeType="changeFlag"
        />
      </el-col>
    </el-row>

    <div class="footer">
      <div class="search-btn">
        <el-button
          size="small"
          :loading="loading"
          type="primary"
          @click="getData({page: 1, rows: 10})"
        >查 询</el-button>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="resultVisible"
      width="95%"
      top="40px"
      class="search-dialog"
      :close-on-click-modal="false"
    >
      <div style="font-size: 20px;padding-bottom: 20px;margin-right: 10px;">
        查询结果：符合条件的病案份数 {{pager.total}}
        <el-button type="primary" size="mini" @click="download({page: 1, rows: 10})">
          导出
        </el-button>
      </div>
      <div style="overflow: hidden">
        <el-row :gutter="16">
          <el-col :lg="6" :md="8" :sm="12" :xs="24" v-for="item in mainInfoFields" :key="item.key">
            <div class="info-item">
              <div class="info-item-label">{{item.label}}：</div>
              <el-input size="mini" class="info-item-value" :value="currentInfo[item.key]"></el-input>
            </div>
          </el-col>
        </el-row>

        <el-table
          :data="tableData"
          :max-height="resultTableMaxHeight"
          v-loading="loading"
          class="group-table"
          border
          size="small"
          row-key="baza01"
          highlight-current-row
          :current-row-key="currentInfo.baza01"
          @row-click="setCurrentInfo"
        >
          <el-table-column prop="baza01" label="病案号" width="100">
            <template slot-scope="scope">
              <span class="link" @click="toHomePage(scope.row.baza00)">{{scope.row.baza01}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="baza02" width="90" label="姓名"></el-table-column>
          <el-table-column prop="baza03" width="50" label="性别"></el-table-column>
          <el-table-column prop="baza05" width="120" label="身份证"></el-table-column>
          <el-table-column prop="baza04" width="95" label="出生日期"></el-table-column>
          <el-table-column prop="baza24" width="95" label="入院日期"></el-table-column>
          <el-table-column prop="BAZA27" width="95" label="出院日期"></el-table-column>
          <el-table-column prop="dmmc" label="出院诊断"></el-table-column>
          <el-table-column prop="baza65" width="80" label="ICD10"></el-table-column>
          <el-table-column prop="kb" width="120" label="出院科别"></el-table-column>
          <el-table-column prop="baza19" width="110" label="联系人电话"></el-table-column>
          <el-table-column prop="baza59" width="90" label="录入员"></el-table-column>
          <el-table-column prop="baza60" width="95" label="录入日期"></el-table-column>
          <!--            <el-table-column prop="j" label="签收日期"></el-table-column>-->
        </el-table>

        <paging-toolbar style="margin-top: 20px;" :pager="pager" @change="getData" />
      </div>
    </el-dialog>

    <dict-input
      :append-to-body="true"
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      :extraParams="dictInputDialog.extraParams"
      @submit="this.handleDictInputSubmit"
    />

    <!--

        <el-card header="病案主要信息" shadow="never" class="card" :body-style="{padding: '10px 20px 0'}">
                <el-row :gutter="16">
                    <el-col :lg="6" :md="8" :sm="12" :xs="24" v-for="item in mainInfoFields">
                        <div class="info-item">
                            <div class="info-item-label">{{item.label}}：</div>
                            <el-input size="mini" class="info-item-value" :value="currentInfo[item.key]"></el-input>
                        </div>
                    </el-col>
                </el-row>
            </el-card>

            <el-card shadow="never"  class="card" body-style="padding: 10px">
                <div class="total-text">符合条件的病案份数：{{tableData.length}}</div>
                <el-row class="btn-box">
                    <el-button @click="triggerFilterVisible" style="margin-left: -210px" type="primary" size="small" icon="el-icon-search">选择查询条件</el-button>

        </el-row>
        </el-card>

        <el-table
            :data="tableData"
            v-loading="loading"
            class="group-table"
            border
            size="small"
            row-key="baza01"
            highlight-current-row
            :current-row-key="currentInfo.baza01"
            @row-click="setCurrentInfo"
        >
            <el-table-column prop="baza01" label="病案号" width="110">
                <template slot-scope="scope">
                    <span class="link" @click="toHomePage(scope.row.baza00)">{{scope.row.baza01}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="baza02" label="姓名"></el-table-column>
            <el-table-column prop="baza03" label="性别"></el-table-column>
            <el-table-column prop="baza04" label="出生日期"></el-table-column>
            <el-table-column prop="baza24" label="入院日期"></el-table-column>
            <el-table-column prop="baza27" label="出院日期"></el-table-column>
            <el-table-column prop="zdName" label="出院诊断"></el-table-column>
            <el-table-column prop="icd10" label="ICD10"></el-table-column>
            <el-table-column prop="deptName" label="出院科别"></el-table-column>
            <el-table-column prop="baza19" label="联系人电话"></el-table-column>
            <el-table-column prop="baza59" label="录入员"></el-table-column>
            <el-table-column prop="baza60" label="录入日期"></el-table-column>
        </el-table>

        <el-dialog
            title="病案系统组合查询"
            :visible.sync="filterVisible"
            width="1000px"
            class="search-dialog"
            :close-on-click-modal="false"
        >
            <el-row :gutter="8">
                <el-col v-for="(value, type) in filterFields" :span="value.span">
                    <filter-box
                        :infoType="type"
                        :header="value.header"
                        :fields="value.fields"
                        :heightRows="value.heightRows"
                        :disabledObj="filterDisabledObj"
                        :valueObj="filterValues"
                        @checkChange="handleCheck"
                        @openDictInput="handleOpenDictInput"
                    />
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button :loading="loading" @click="triggerFilterVisible">取 消</el-button>
                <el-button :loading="loading" type="primary" @click="getData({page: 1, rows: 10})">确 定</el-button>
            </span>
        </el-dialog>

    -->
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
.page-container {
  padding: 10px;
}
.search-dialog {
  /deep/ .el-dialog__body {
    padding: 10px 20px 20px;
  }
}
.card {
  margin-bottom: 8px;
  /deep/ .el-card__header {
    padding: 10px 20px;
  }
}
.info-item {
  line-height: 32px;
  overflow: hidden;
  clear: both;
  .info-item-label {
    width: 100px;
    float: left;
    text-align: right;
    font-size: 14px;
  }
  .info-item-value {
    overflow: hidden;
    width: calc(100% - 100px);
  }
}
.total-text {
  width: 210px;
  float: left;
  line-height: 32px;
}
.btn-box {
  margin-left: 210px;
  text-align: center;
}
.group-table {
  /deep/ tr.current-row > td {
    background: rgb(121, 187, 255);
  }
}
.footer {
  margin-bottom: 50px;
}
.search-btn {
  text-align: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  background: #ffffff;
  z-index: 999;
  padding: 9px;
  /*border-top: 1px solid #d9d9d9;*/
  box-shadow: 0 -4px 10px 0 #d9d9d9;
}
.link {
  color: #409eff;
  cursor: pointer;
}
/deep/ .el-input__inner:focus {
  background: #409EFF;
  color: #ffffff;
  border-top-color: #409EFF;
}
</style>

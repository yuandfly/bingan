<template>
  <div>
    <el-container class="container">
      <el-aside width="400px">
        <el-card
          shadow="never"
          class="layout-card"
          body-style="padding: 15px 10px 10px; height: 100%;"
        >
          <el-divider class="divider" content-position="left">签收登记</el-divider>
          <el-form
            ref="registerForm"
            :model="registerForm"
            label-width="80px"
            class="form register-form"
          >
            <el-form-item label="病案号">
              <el-input v-model="registerForm.baza01" size="mini" @input="handleBazaInput" />
            </el-form-item>
            <el-form-item label="签收人">
              <el-input :value="registerForm.hsry" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="签收日期">
              <el-date-picker
                size="mini"
                style="width: 100%"
                v-model="registerForm.hsrq"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetime"
                placeholder="选择日期"
                :clearable="false"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="saveLoading"
                type="primary"
                size="mini"
                icon="el-icon-folder-checked"
                @click="handleSave"
              >保存</el-button>
              <!--                            <el-button type="danger" size="mini">退出</el-button>-->
            </el-form-item>
          </el-form>
          <el-divider class="divider" content-position="left">签收查询</el-divider>
          <el-form ref="searchForm" :model="searchForm" label-width="80px" class="form search-form">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.baza02" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="病案号">
              <el-input v-model="searchForm.baza01" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="入院科室">
              <el-input
                :value="searchForm.baza21name"
                size="mini"
                @keyup.native.32="handleOpenDict('baza21', $event)"
              ></el-input>
            </el-form-item>
            <el-form-item label="出院科室">
              <el-input
                :value="searchForm.baza23name"
                size="mini"
                @keyup.native.32="handleOpenDict('baza23', $event)"
              ></el-input>
            </el-form-item>
            <el-form-item label="出院日期">
              <el-date-picker
                popper-class="search-date-baza27"
                style="width: 100%"
                size="mini"
                v-model="searchForm.baza27"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd"
                @focus="triggerDatePickVisible('search-date-baza27', false)"
                @keydown.native.space="triggerDatePickVisible('search-date-baza27', true)"
              />
            </el-form-item>
            <el-form-item label="签收日期">
              <el-date-picker
                popper-class="search-date-hsrq"
                style="width: 100%"
                size="mini"
                v-model="searchForm.hsrq"
                type="daterange"
                range-separator="-"
                value-format="yyyy-MM-dd"
                @focus="triggerDatePickVisible('search-date-hsrq', false)"
                @keydown.native.space="triggerDatePickVisible('search-date-hsrq', true)"
              />
            </el-form-item>
            <el-form-item label="签收状态">
              <el-select style="width: 100%" v-model="searchForm.state" size="mini">
                <el-option value="''" label="全部" />
                <el-option value="0" label="未签收" />
                <el-option value="1" label="已签收" />
              </el-select>
            </el-form-item>
            <el-form-item label="签收人">
              <el-input v-model="searchForm.hsry" size="mini"></el-input>
            </el-form-item>
            <div
              style="line-height: 40px; font-size: 15px; color: #606266; padding-left: 20px"
            >符合条件的病案份数：{{pager.total}}</div>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                size="mini"
                icon="el-icon-search"
                @click="handleSearch('')"
              >查询</el-button>
              <!--                            <el-button type="info" size="mini" icon="el-icon-printer">打印</el-button>-->
              <!--                            <el-button type="danger" size="mini" icon="el-icon-close">取消</el-button>-->
            </el-form-item>
          </el-form>
        </el-card>
      </el-aside>
      <el-main class="main">
        <el-table
          :data="tableData"
          v-loading="loading"
          border
          size="small"
          height="calc(100vh - 160px)"
          highlight-current-row
        >
          <el-table-column prop="baza01" align="center" label="病案号"></el-table-column>
          <el-table-column prop="baza02" align="center" label="姓名"></el-table-column>
          <el-table-column prop="baza03" align="center" label="性别"></el-table-column>
          <el-table-column prop="baza04" align="center" label="出生日期"></el-table-column>
          <el-table-column prop="baza27" align="center" label="出院日期"></el-table-column>
          <el-table-column prop="baza21" align="center" label="入院科别"></el-table-column>
          <el-table-column prop="baza23" align="center" label="出院科别"></el-table-column>
          <el-table-column prop="hsry" align="center" label="签收人"></el-table-column>
          <el-table-column prop="hsrq" align="center" label="签收时间"></el-table-column>
        </el-table>
        <el-card
          shadow="never"
          style="border-top: 0; border-radius: inherit"
          body-style="padding: 10px; overflow: hidden"
        >
          <paging-toolbar :pager="pager" :page-sizes="[100, 200, 300, 500]" @change="getData" />
        </el-card>
      </el-main>
    </el-container>
    <dict-input
      :append-to-body="false"
      :visible.sync="dictInputDialog.visible"
      :dictType="dictInputDialog.dictType"
      @submit="this.handleDictInputSubmit"
    />
  </div>
</template>

<script src="./index.js"></script>

<style scoped lang="less">
.container {
  padding: 10px;
}
.main {
  padding: 0 0 0 10px;
}
.layout-card {
  height: 100%;
}
.divider {
  margin: 10px 0;
}
.form {
  .el-form-item {
    margin-bottom: 0;
  }
}
.register-form {
  padding: 10px 50px;
}
.search-form {
  padding: 10px 30px 10px 10px;
}
/deep/ .el-input__inner:focus {
  background: #409EFF;
  color: #ffffff;
  border-top-color: #409EFF;
}
</style>

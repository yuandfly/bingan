<template>
  <span>
    <el-button size="mini" type="primary" @click="triggerVisible">输出</el-button>

    <el-dialog
      title="随机查询:输出查询结果"
      :visible.sync="visible"
      width="1000px"
      :close-on-click-modal="false"
      append-to-body
    >
      <div class="body-content">
        <el-col class="left" :span="8">
          <div class="left-new-condition">
            <p class="left-desc">如果您需建立新输出项，请在下方编辑框内填写输出项组的名字，回车键确认后进入右边表格组织该输出项。</p>
            <el-input
              class="left-input"
              size="small"
              v-model="newGroupName"
              ref="outputGroupAdd"
              @keyup.native.13="handleCreateGroup"
            ></el-input>
          </div>
          <el-divider></el-divider>
          <div class="left-had-condition">
            <p class="left-desc">您可在列表框内选择已建立的输出项，回车键确认后，重新组织该输出项组，或者直进行输出工作。</p>
            <el-select
              class="left-select"
              size="small"
              v-model="editingGroupName"
              ref="outputGroupSelect"
              @change="handleEditGroup"
            >
              <el-option v-for="item in savedGroups" :value="item" :label="item" :key="item"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col class="right" :span="16">
          <div ref="outputRight" class="right-content" :style="{height: rightContentHeight}">
            <el-table
              :data="outputItems"
              class="table"
              border
              empty-text="暂无输出项"
              size="small"
              :max-height="rightContentHeight"
              @cell-click="handleCellClick"
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
              <el-table-column prop="outputFieldName" label="输出项" align="center">
                <template slot-scope="scope">
                  <el-input
                    :id="'outputFieldName-' + scope.row.index"
                    size="mini"
                    :value="scope.row.outputFieldName"
                    @keyup.native.32="handleOpenDictDialog($event, scope.$index)"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="classify" label="分类" align="center" width="50">
                <template slot-scope="scope">
                  <i v-if="scope.row.classify" class="table-icon el-icon-check"></i>
                </template>
              </el-table-column>
              <el-table-column prop="sort" label="排序" align="center" width="50">
                <template slot-scope="scope">
                  <!-- 倒序 -->
                  <i v-if="scope.row.sort === '2'" class="table-icon el-icon-top"></i>
                  <!-- 顺序 -->
                  <i v-if="scope.row.sort === '1'" class="table-icon el-icon-bottom"></i>
                </template>
              </el-table-column>
              <el-table-column prop="sum" label="求和" align="center" width="50">
                <template slot-scope="scope">
                  <i v-if="scope.row.sum" class="table-icon el-icon-check"></i>
                </template>
              </el-table-column>
              <el-table-column prop="code" label="代码" align="center" width="50">
                <template slot-scope="scope">
                  <i v-if="scope.row.code" class="table-icon el-icon-check"></i>
                </template>
              </el-table-column>
              <el-table-column prop="output" label="输出" align="center" width="50">
                <template slot-scope="scope">
                  <i v-if="scope.row.output" class="table-icon el-icon-check"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="right-footer">
            <el-button size="small" type="primary" @click="handleAddItem">增加</el-button>
            <el-button size="small" type="primary" @click="handleRemoveItem">删除</el-button>
            <el-button size="small" type="primary" @click="handleInsertItem">插入</el-button>
            <el-button size="small" type="primary" @click="handleSave">保存</el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleOutput"
              :loading="resultDialog.loading"
            >输出</el-button>
            <el-button size="small" type="primary" @click="handleQuit">退出</el-button>
          </div>
        </el-col>
      </div>
    </el-dialog>

    <dict-input
      :visible.sync="dictInputDialog.visible"
      dictType="conditionDict"
      @submit="this.handleDictInputSubmit"
      :appendToBody="true"
    />

    <el-dialog
      :visible.sync="outputOrderDialog.visible"
      :close-on-click-modal="false"
      title="选择输出序号"
      width="400px"
      append-to-body
    >
      <div style="overflow: hidden">
        <div class="order-box" v-if="outputOrderDialog.show.baf1">
          <div class="order-title">请选择要输出的次诊断序号</div>
          <el-radio-group v-model="outputOrderDialog.baf1">
            <el-radio label="0">所有记录</el-radio>
            <el-radio label="1">首记录</el-radio>
            <el-radio label="2">尾记录</el-radio>
          </el-radio-group>
        </div>
        <el-divider v-if="outputOrderDialog.show.baf1 && outputOrderDialog.show.baf4" />
        <div class="order-box" v-if="outputOrderDialog.show.baf4">
          <div class="order-title">请选择要输出的手术序号</div>
          <el-radio-group v-model="outputOrderDialog.baf4">
            <el-radio label="0">所有记录</el-radio>
            <el-radio label="1">首记录</el-radio>
            <el-radio label="2">尾记录</el-radio>
          </el-radio-group>
        </div>
        <div style="text-align: center">
          <el-button type="primary" size="mini" @click="handleChooseOrder">确定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="resultDialog.visible"
      :close-on-click-modal="false"
      title="输出结果"
      width="1300px"
      append-to-body
    >
      <div slot="title">
        <span style="margin-right: 20px">输出结果</span>
        <el-button type="primary" size="small" @click="handleDownload">下载</el-button>
      </div>
      <div class="output-content">
        <el-table :data="resultDialog.data" v-loading="resultDialog.loading" size="small" border>
          <el-table-column
            v-for="item in resultDialog.tableHeader"
            align="center"
            :prop="item.prop"
            :label="item.label"
            :key="item.prop"
          />
        </el-table>
        <paging-toolbar
          style="margin-top: 20px;"
          :pager="resultDialog.pager"
          @change="outputSubmit"
        />
      </div>
    </el-dialog>
  </span>
</template>

<script>
import {
  GroupNameSelect,
  OutputSelect,
  OutputDel,
  OutputSave,
  OutputSearch,
  OutputExport
} from "../../../api/randomSearch";
import DictInput from "../../../components/dialog/dict-input.vue";
import PagingToolbar from "../../../components/toolbar/paging.vue";
export default {
  name: "output-dialog",
  components: { DictInput, PagingToolbar },
  props: {
    conditionList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      rightContentHeight: "250px",
      newGroupName: undefined,
      editingGroupName: undefined,
      savedGroups: [],
      currentIndex: 0,
      outputItems: [],
      // 代码录入
      dictInputDialog: {
        visible: false,
        currentOpener: { rowIndex: undefined, fields: [] }
      },
      // 序号选择
      outputOrderDialog: {
        visible: false,
        show: { baf1: false, baf4: false }, // 是否需要显示对应的序号选择
        baf1: undefined, // 选择输出的次诊断序号
        baf4: undefined // 选择输出的手术序号
      },
      // 输出结果
      resultDialog: {
        visible: false,
        loading: false,
        tableHeader: [],
        data: [],
        pager: { page: 1, rows: 10, total: 0 }
      }
    };
  },
  mounted() {
    this.getSavedGroup();
  },
  deactivated() {
    console.log("hehe");
    this.visible = false;
    this.dictInputDialog.visible = false;
    this.outputOrderDialog.visible = false;
    this.resultDialog.visible = false;
  },
  methods: {
    triggerVisible() {
      this.visible = !this.visible;
    },

    /* ----------------------------------- 左侧相关--------------------------------------------- */

    // 获取已保存的输出项组
    getSavedGroup() {
      GroupNameSelect("sj_scxx")
        .then(res => {
          if (res && res.data) this.savedGroups = res.data;
          else
            this.$message.error(
              res && res.msg ? res.msg : "获取已有输出组失败"
            );
        })
        .catch(err => {
          this.$message.error("获取已有输出组失败");
        });
    },

    // 左上角input的enter事件：新建输出项组
    handleCreateGroup() {
      if (this.newGroupName) {
        this.editingGroupName = undefined; // 先清除已选择的以免混乱
        this.outputItems = [{ index: 0, output: true }]; // 初始化设置一个
        this.currentIndex = 0; // 当前索引 0
      }
      this.$refs.outputGroupAdd.blur(); // input失焦
    },

    // 左下角选择已有的组enter事件：获取对应的输出项
    handleEditGroup() {
      if (this.editingGroupName) {
        this.newGroupName = undefined; // 先清除输入的新建组名以免混乱
        // TODO 获取输出项
        OutputSelect(this.editingGroupName)
          .then(res => {
            console.log(res);
            if (res && res.data) {
              this.outputItems = res.data.map((item, index) => ({
                index,
                outputField: item.cxx, // 项字段名
                outputFieldName: item.name, // 项字段名对应中文
                km: item.km, // 字段所在表名
                type: item.type, // 字段类型
                bzDmmc: item.bzDmmc,
                bzKm: item.bzKm,
                classify: item.fz === "1",
                sort: item.ord, // 排序
                sum: item.qhx === "1", // 求和
                code: item.ydm === "1", // 代码
                output: item.xsx === "1", // 输出
                scxh: item.scxh // 序号
              }));
            } else
              this.$message.error(res && res.msg ? res.msg : "获取输出项失败");
          })
          .catch(er => {
            this.$message.error("获取输出项失败");
          });
        this.currentIndex = 0;
        this.$refs.outputGroupSelect.blur();
      }
    },

    /* ----------------------------------- 右侧表格相关--------------------------------------------- */

    // 单元格点击事件：设置索引或切换值
    handleCellClick(row, col, cell) {
      const outputItems = this.outputItems.slice();
      const val = outputItems[row.index][col.property];
      switch (col.property) {
        case "index": // 索引 切换当前行
          this.currentIndex = row.index;
          break;
        case "outputFieldName": // 输出项字段 不作处理
          break;
        case "sort": // 排序 切换值
          const orders = ["1", "2", "0"]; // 顺序、倒序、不排序
          const index = orders.indexOf(val);
          this.outputItems[row.index][col.property] = orders[index + 1]
            ? orders[index + 1]
            : orders[0];
          break;
        case "classify": // 分类 只能有一个
          outputItems.forEach(item => (item.classify = false));
          outputItems[row.index][col.property] = !val;
          break;
        default:
          // 其他 切换 true or false 值
          outputItems[row.index][col.property] = !val;
          break;
      }
      this.outputItems = outputItems;
    },

    validateOutputItems(callback) {
      if (!this.outputItems.length) {
        this.$message.error("请设置输出项");
      } else {
        let error = false;
        for (let i = 0; i < this.outputItems.length; i++) {
          // 无输出项字段 错误
          if (!this.outputItems[i].outputField) {
            error = true;
            this.$message.error(`第${i + 1}个条件未设置输出项`);
            break;
          }
        }
        !error && callback();
      }
    },

    dealOutputItems() {
      return this.outputItems.map((item, index) => ({
        hmm: this.newGroupName || this.editingGroupName, // 组名称
        cxx: item.outputField, // 项字段名
        name: item.outputFieldName, // 输出项字段名对应中文
        km: item.km, // 字段所在表名
        type: item.type, // 字段类型
        bzDmmc: item.bzDmmc,
        bzKm: item.bzKm,
        fz: item.classify ? "1" : "0", // 分类
        ord: item.sort, // 排序
        qhx: item.sum ? "1" : "0", // 求和
        ydm: item.code ? "1" : "0", // 代码
        xsx: item.output ? "1" : "0", // 输出
        scxh: index + 1 // 序号
      }));
    },

    /* ----------------------------------- 右侧按钮相关--------------------------------------------- */

    focusInput(idName) {
      const input_inner = this.$refs.outputRight.querySelector(`#${idName}`);
      input_inner && input_inner.focus();
    },

    // 增加一项
    handleAddItem() {
      this.outputItems = this.outputItems.concat([
        {
          index: this.outputItems.length,
          output: true
        }
      ]);
      this.$nextTick(() => {
        this.currentIndex = this.outputItems.length - 1;
        this.focusInput("outputFieldName-" + (this.outputItems.length - 1));
      });
    },

    // 插入一项
    handleInsertItem() {
      if (this.outputItems.length) {
        let outputItems = this.outputItems.slice();
        // 当前行前面插入一行
        outputItems.splice(this.currentIndex, 0, {});
        // 重置index
        outputItems = outputItems.map((item, index) => ({
          ...item,
          index: index
        }));
        this.outputItems = outputItems;
        this.$nextTick(() => {
          this.focusInput("outputFieldName-" + this.currentIndex);
        });
      } else {
        this.handleAddItem();
      }
    },

    // 删除一项
    handleRemoveItem() {
      // 从outputItems中删除这一项
      const removeItem = () => {
        let outputItems = this.outputItems.slice();
        // 删除一行
        outputItems.splice(this.currentIndex, 1);
        // 重置index
        outputItems = outputItems.map((item, index) => ({
          ...item,
          index: index
        }));
        // 删除最后一行，当前行索引减一
        if (this.currentIndex >= outputItems.length) {
          this.currentIndex = outputItems.length - 1;
        }
        this.outputItems = outputItems;
      };
      removeItem();
      /*
                // 如果当前行的排序字段xh>=0，则需要调接口删除，否则代表前端新增的可直接删除
                if (this.outputItems[this.currentIndex].scxh >= 0) {
                    OutputDel({
                        hmm: this.editingGroupName,
                        scxh: this.outputItems[this.currentIndex].scxh
                    }).then(res => {
                        if (res && res.code === 0) removeItem();
                        else this.$message.error('删除失败')
                    }).catch(err => {
                        this.$message.error('删除失败')
                    })
                } else removeItem()
                */
    },

    // 保存
    handleSave() {
      // 如果是新增，需要判断是否重名
      if (
        this.newGroupName &&
        this.savedGroups.indexOf(this.newGroupName) >= 0
      ) {
        return this.$message.error("输出组名称重复");
      }
      this.validateOutputItems(() => {
        const list = this.dealOutputItems();
        OutputSave(list)
          .then(res => {
            if (res && res.code === 0) {
              this.$message.success("保存成功");
              this.newGroupName && this.getSavedGroup();
            } else this.$message.error(res && res.msg ? res.msg : "保存失败");
          })
          .catch(err => {
            this.$message.error("保存出错");
          });
      });
    },

    // 输出
    handleOutput() {
      this.validateOutputItems(() => {
        const resultList = this.dealOutputItems();
        // 是否有分类
        const hasClassify = resultList.some(item => item.fz === "1");
        // 判断条件里是否有次诊断和手术相关，有则需要选择输出序号
        const hasBaf1 = resultList.some(item => item.km === "BAF1"); // 次诊断
        const hasBaf4 = resultList.some(item => item.km === "BAF4"); // 手术
        // 先将两个序号值都清除
        this.outputOrderDialog.baf1 = undefined;
        this.outputOrderDialog.baf4 = undefined;
        // 没选分类，并且有次诊断或手术的条件，需要显示序号选择
        if (!hasClassify && (hasBaf1 || hasBaf4)) {
          this.outputOrderDialog.visible = true;
          this.outputOrderDialog.show = { baf1: hasBaf1, baf4: hasBaf4 };
        } else {
          this.outputSubmit({ page: 1, rows: 10 }, {});
        }
      });
    },

    // 选择输出序号的确定: 判断已经选择了之后隐藏序号选择，提交输出
    handleChooseOrder() {
      const { show, baf1, baf4 } = this.outputOrderDialog;
      // 显示的就必须选
      if ((show.baf1 ? baf1 : true) && (show.baf4 ? baf4 : true)) {
        this.outputOrderDialog.visible = false;
        this.outputSubmit({ page: 1, rows: 10 }, { baf1, baf4 });
      }
    },

    // 提交输出
    outputSubmit(pager, order) {
      const pagination = pager || this.resultDialog.pager;
      const orderValue = order || this.outputOrderDialog;
      const resultList = this.dealOutputItems();
      this.resultDialog.loading = true;
      OutputSearch({
        conditionList: this.conditionList,
        resultList: resultList,
        baf1Choose: orderValue.baf1, // 次诊断序号
        baf4Choose: orderValue.baf4, // 手术序号
        page: pagination.page,
        size: pagination.rows
      })
        .then(res => {
          if (res && res.data) {
            // this.resultDialog.tableHeader = resultList.filter(item => item.xsx === '1').map(item => ({
            //     prop: item.cxx,
            //     label: item.name
            // }));
            this.resultDialog.tableHeader = res.data.extraResult.headerCode.map(
              (code, index) => ({
                prop: code,
                label: res.data.extraResult.headerName[index]
              })
            );
            this.resultDialog.data = (res.data.content || []).filter(
              item => !!item
            );
            this.resultDialog.pager = { ...pagination, total: res.data.total };
            this.resultDialog.visible = true;
          } else {
            this.$message.error(res && res.msg ? res.msg : "输出结果查询失败");
          }
        })
        .catch(err => {
          this.$message.error("输出结果查询错误");
        })
        .finally(() => {
          this.resultDialog.loading = false;
        });
    },

    // 导出下载
    handleDownload() {
      OutputExport({
        conditionList: this.conditionList,
        resultList: this.dealOutputItems(),
        baf1Choose: this.outputOrderDialog.baf1, // 次诊断序号
        baf4Choose: this.outputOrderDialog.baf4, // 手术序号
        page: 0,
        size: 0
      })
        .then(res => {
          if (res && res.code === 0) {
            const a = document.createElement("a");
            // a.id = "output-download";
            a.href = res.data;
            a.target = "_blank";
            document.body.append(a);
            a.click();
          }
        })
        .catch(err => {});
    },

    // 退出
    handleQuit() {
      this.visible = false;
    },

    /* ----------------------------------- 代码录入相关--------------------------------------------- */

    handleOpenDictDialog(e, rowIndex) {
      this.dictInputDialog = {
        visible: true,
        currentOpener: {
          rowIndex,
          fields: [
            { dictField: "dm", targetField: "outputField" },
            { dictField: "dmmc", targetField: "outputFieldName" },
            { dictField: "fieldKu", targetField: "km" },
            { dictField: "fieldType", targetField: "type" },
            { dictField: "fieldDmmc", targetField: "bzDmmc" },
            { dictField: "fieldDmkm", targetField: "bzKm" }
          ]
        }
      };
    },

    handleDictInputSubmit(dictRow) {
      const { rowIndex, fields } = this.dictInputDialog.currentOpener;
      const outputItems = this.outputItems.slice();
      fields.forEach(item => {
        outputItems[rowIndex][item.targetField] =
          dictRow[item.dictField] || undefined;
      });
      this.outputItems = outputItems;
    }
  }
};
</script>

<style scoped>
@import "../index.less";
.body-content {
  overflow: hidden;
  border: 1px solid #ebeef5;
  margin-top: -20px;
}
.table-icon {
  font-size: 16px;
}
.output-content {
  overflow: hidden;
  margin-top: -20px;
  min-height: 400px;
}
.order-box {
  margin-bottom: 20px;
}
.order-title {
  padding-bottom: 10px;
  margin-bottom: 10px;
}
</style>

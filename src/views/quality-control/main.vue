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
            v-model="totalScore"
          ></el-input>
        </div>
      </el-col>
    </el-card>
    <div class="add-rule">
      <el-button type="primary" plain size="small" @click="addItem"
        >添加评分项</el-button
      >
    </div>
    <div v-for="(item, i) in qualityList" :key="i">
      <ItemControl :qualityItem="item.zkzbDOList" :score="item.fs" ref="item">
        <template v-slot:del>
          <div class="icon-del" @click="delItem(i)">x</div>
        </template>
      </ItemControl>
    </div>
    <div class="submit-box" v-if="saveShow">
      <el-button
        size="small"
        type="primary"
        @click="submitHandler"
        icon="el-icon-check"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import ItemControl from './index.vue';
import {
  getItemList,
  getQualityList,
  updateQuality,
  addQuality,
} from '@/api/qualityControl';
export default {
  name: 'qualityControl',
  components: { ItemControl },
  data() {
    return {
      checkItmeList: [], //检查项列表
      checkItmeId: '',
      lb: 1, //类别,
      totalScore: null,
      qualityList: [], //已有评分规则
      isUpdate: false,
    };
  },
  computed: {
    saveShow() {
      return this.qualityList.length > 0 ? true : false;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    /* 获取检查项目 */
    getList() {
      getItemList().then(
        (res) => {
          this.checkItmeList = res.data;
        },
        (error) => {
          this.$message.error(`获取检查项目异常${error}`);
        }
      );
    },
    /* 查询已有评分项 */
    queryQaulityItem() {
      const params = {
        zktjId: this.checkItmeId,
        lb: this.lb,
      };
      getQualityList(params).then(
        (res) => {
          this.qualityList = res.data;
          this.isUpdate = this.qualityList.length > 0 ? false : true;
        },
        (error) => {
          this.$message.error(`获取评分项异常${error}`);
        }
      );
    },

    /* 增加项 */
    addItem() {
      this.qualityList.push({});
    },
    /* 删除项 */
    delItem(index) {
      this.$confirm('将删除该评分项, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.qualityList.splice(index, 1);
        })
        .catch(() => {});
    },
    /* 保存 */
    submitHandler() {
      console.log('this.$refs.item', this.$refs.item);
      const res = this.$refs.item.map((item, i) => {
        return item.dealConditionItems();
      });
      console.log('res', res);
      if (this.isUpdate) {
        updateQuality().then();
      } else {
        addQuality().then();
      }
    },
  },
};
</script>

<style scoped lang="less">
.page-random-search {
  padding: 20px;
}
.card {
  margin-bottom: 8px;
  font-size: 16px;
  /deep/ .el-card__header {
    padding: 10px 20px;
  }
}
.left {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  /deep/ .el-divider--horizontal {
    margin: 15px 0;
  }
}
.left-new-condition {
  padding: 8px 20px;
}
.left-had-condition {
  padding: 15px 20px;
}
.left-desc {
  text-indent: 2em;
  line-height: 20px;
  font-size: 15px;
}
.left-input,
.left-select {
  margin: 10px 0 0;
  width: 100%;
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
}
.right-content {
  flex-grow: 5;
}
.right-footer {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-rule {
  text-align: center;
  margin: 8px 0;
}
.submit-box {
  margin-top: 8px;
  text-align: right;
}
.card {
  .el-row:not(:first-of-type) {
    border-top: 1px solid #ebeef5;
    margin-top: 10px;
  }
}
.icon-del {
  text-align: center;
  cursor: pointer;
}
</style>

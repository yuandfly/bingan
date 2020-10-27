<template>
  <div>
    <h1>健康检查日志登记</h1>
    <div class="box_lan">
      <div class="block">
        <el-input
          v-model.number="fromData.ordinary"
          @keyup.native="fromData.ordinary=verifyNum(fromData.ordinary)"
        >
          <template slot="prepend">健康检查人数：</template>
        </el-input>
      </div>
    </div>
    <div class="box_lan">
      <div class="block">
        <el-input
          v-model.number="fromData.cadre"
          @keyup.native="fromData.cadre=verifyNum(fromData.cadre)"
        >
          <template slot="prepend">其中高干体检：</template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { getByTjm6rq } from "@/api";
import { showOkMsg } from "@/utils/index.js";

export default {
  data() {
    return {
      fromData: {
        ordinary: 0,
        cadre: 0,
      },
    };
  },
  created() {
    this.getTableList();
  },
  props: ["dateList"],
  methods: {
    verifyNum(val) {
      return String(val).replace(/[^\d]/g, "");
    },
    getTableList() {
      getByTjm6rq({
        tjm6rq: this.dateList.date,
      }).then((res) => {
        if (res.code === 0) {
          this.fromData.ordinary = res.data.tjm6001;
          this.fromData.cadre = res.data.tjm6002;
          // showOkMsg(res.msg);
        } else {
          this.fromData.ordinary = 0;
          this.fromData.cadre = 0;
          // showOkMsg(res.msg);
        }
      });
    },
    getTableData() {
      return this.fromData;
    },
  },
};
</script>

<style scoped>
.box_lan {
  display: flex;
  justify-content: center;
  padding: 30px 0 50px 0;
}
.block {
  width: 600px;
}
</style>
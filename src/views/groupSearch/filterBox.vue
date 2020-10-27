<template>
  <el-card
    :header="header"
    class="card"
    shadow="never"
    :body-style="{padding: '10px 20px 0', height: cardBodyHeight}"
  >
    <el-row :gutter="16">
      <el-col class="filter-item" v-for="(item, index) in fields" :span="item.span" :key="index">
        <div class="filter-item-label">
          <el-checkbox @change="handleCheckChange($event, item)">{{item.label}}</el-checkbox>
        </div>
        <div class="filter-item-content">
          <el-row :gutter="0" v-if="item.range">
            <el-col :span="11">
              <el-row v-if="item.unit" :gutter="8">
                <el-col :span="12">
                  <el-input
                    :disabled="disabledObj[item.name]"
                    size="mini"
                    v-model="valueObj[item.range[0]]"
                  ></el-input>
                </el-col>
                <el-col :span="12">
                  <el-select
                    :ref="'select-' + item.name"
                    :disabled="disabledObj[item.name]"
                    size="mini"
                    style="width: 100%"
                    v-model="valueObj[item.unit[0]]"
                  >
                    <el-option
                      v-for="opt in item.unitOptions"
                      :value="opt.value"
                      :label="opt.label"
                      :key="opt.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-input
                :disabled="disabledObj[item.name]"
                v-else-if=" item.type === 'input' "
                size="mini"
                v-model="valueObj[item.range[0]]"
              ></el-input>
              <el-date-picker
                :popper-class="'date-min-' + item.name"
                :disabled="disabledObj[item.name]"
                v-else-if=" item.type === 'date'"
                size="mini"
                value-format="yyyy-MM-dd"
                type="date"
                style="width: 100%"
                @focus="triggerDatePickVisible('date-min-' + item.name, false)"
                @keydown.native.space="triggerDatePickVisible('date-min-' + item.name, true)"
                v-model="valueObj[item.range[0]]"
              ></el-date-picker>
            </el-col>
            <el-col :span="2" style="text-align: center">{{item.seperate}}</el-col>
            <el-col :span="11">
              <el-row v-if="item.unit" :gutter="8">
                <el-col :span="12">
                  <el-input
                    :disabled="disabledObj[item.name]"
                    size="mini"
                    v-model="valueObj[item.range[1]]"
                  ></el-input>
                </el-col>
                <el-col :span="12">
                  <el-select
                    :ref="'select-' + item.name"
                    :disabled="disabledObj[item.name]"
                    size="mini"
                    style="width: 100%"
                    v-model="valueObj[item.unit[1]]"
                  >
                    <el-option
                      v-for="opt in item.unitOptions"
                      :value="opt.value"
                      :label="opt.label"
                      :key="opt.value"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-input
                :disabled="disabledObj[item.name]"
                v-else-if=" item.type === 'input' "
                size="mini"
                v-model="valueObj[item.range[1]]"
              ></el-input>
              <el-date-picker
                :popper-class="'date-max-' + item.name"
                :disabled="disabledObj[item.name]"
                v-else-if=" item.type === 'date'"
                size="mini"
                value-format="yyyy-MM-dd"
                type="date"
                style="width: 100%"
                @focus="triggerDatePickVisible('date-max-' + item.name, false)"
                @keydown.native.space="triggerDatePickVisible('date-max-' + item.name, true)"
                v-model="valueObj[item.range[1]]"
              ></el-date-picker>
            </el-col>
          </el-row>
          <div v-else>
            <div v-if=" item.type === 'input' ">
              <el-input
                :disabled="disabledObj[item.name]"
                v-if="item.dictType && (item.name==='baza38Name' || item.name==='baf103Name' || item.name==='baf408Name')"
                size="mini"
                v-model="valueObj[item.name]"
                @keyup.native="changeType(item.name, $event)"
                @keyup.native.32="judgeDictInput(item)"
              />
              <el-input
                :disabled="disabledObj[item.name]"
                v-else-if="item.dictType"
                size="mini"
                :value="valueObj[item.name]"
                @keyup.native.32="judgeDictInput(item)"
              />
              <el-input
                v-else
                :disabled="disabledObj[item.name]"
                size="mini"
                v-model="valueObj[item.name]"
                @keyup.native.32="judgeDictInput(item)"
              />
            </div>
            <el-select
              :ref="'select-' + item.name"
              :disabled="disabledObj[item.name]"
              v-if=" item.type === 'select' "
              v-model="valueObj[item.name]"
              size="mini"
              style="width: 100%"
            >
              <el-option
                v-for="opt in item.options"
                :value="opt.value"
                :label="opt.label"
                :key="opt.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <!--    <div class="filter-box" :style="{height: cardBodyHeight}">-->
  <!--        <div class="filter-box-title">{{header}}</div>-->

  <!--    </div>-->
</template>

<script>
// 一个筛选card
export default {
  name: "filterBox",
  props: [
    "infoType",
    "header",
    "fields",
    "heightRows",
    "disabledObj",
    "valueObj",
  ],
  data() {
    return {};
  },
  computed: {
    cardBodyHeight() {
      return this.heightRows ? this.heightRows * 40 + 7 + "px" : "";
    },
  },
  mounted() {
    console.log("1", this.fields);
  },
  methods: {
    handleCheckChange(val, item) {
      this.$emit("checkChange", {
        infoType: this.infoType,
        name: item.name,
        checked: val,
      });
    },

    changeType(name, ev) {
      if (
        (ev.keyCode >= 48 && ev.keyCode <= 57) ||
        (ev.keyCode >= 65 && ev.keyCode >= 90) ||
        ev.keyCode === 8 ||
        ev.keyCode === 189 ||
        ev.keyCode === 190 ||
        ev.keyCode === 110
      ) {
        this.$emit("changeType", name);
      }
    },

    judgeDictInput(item) {
      if (item.dictType) {
        this.$emit("openDictInput", { ...item });
      }
    },

    triggerDatePickVisible(refName, visible) {
      if (visible) {
        document.getElementsByClassName(refName)[0].style.display = "block";
      } else {
        setTimeout(() => {
          const a = document.getElementsByClassName(refName)[0];
          console.log(a, "a");
          a && (a.style.display = "none");
        }, 50);
      }
      // this.$refs[refName][0].pickerVisible = visible
    },
  },
};
</script>

<style scoped lang="less">
.filter-box {
  margin: 20px 0;
  overflow: hidden;
  padding: 10px 20px 0;
  position: relative;
  border: 1px solid #ccc;
}
.filter-box-title {
  position: absolute;
  left: 20px;
  transform: translateY(-50%);
  padding-right: 20px;
  line-height: 30px;
  background: #ffffff;
}
.card {
  margin-bottom: 8px;
}
.filter-item {
  margin-bottom: 5px;
  line-height: 32px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.filter-item-label {
  padding-right: 10px;
}
.filter-item-content {
  flex: 1;
}
</style>

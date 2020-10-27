<template>
  <el-col
    v-if="config.showCondition ? showJudge[config.showCondition] : true"
    :lg="config.span"
    :md="12"
    :offset="config.offset"
    class="input-item"
  >
    <div class="input-label" v-if="config.label">{{config.label}}</div>
    <div class="input-content" :id="config.name">
      <template v-if="config.type === 'text'">
        <el-input
          v-if="config.dictType"
          :style="style"
          :class="{'input-text': true, 'error-input': error}"
          :name="config.name"
          :disabled="config.disabled || dynamicDisabled"
          :value="itemValue"
          @keyup.native.32="judgeDictInput($event)"
          @keydown.native.13="handleEnter"
          @keydown.native.delete="handleDel"
        />

        <el-input
          v-else
          :style="style"
          :class="{'input-text': true, 'error-input': error}"
          :name="config.name"
          :disabled="config.disabled || dynamicDisabled"
          v-model="itemValue"
          @keyup.native.32="judgeDictInput($event)"
          @keydown.native.13="handleEnter"
        />
      </template>

      <el-input-number
        v-if="config.type === 'number'"
        :style="style"
        :class="{'input-number': true, 'error-input': error}"
        :name="config.name"
        :controls="false"
        :max="config.max"
        :min="config.min"
        :disabled="config.disabled"
        v-model="itemValue"
        @keydown.native.13="handleEnter"
      />

      <el-select
        v-if="config.type === 'select'"
        ref="select"
        :style="style"
        :name="config.name"
        :automatic-dropdown="false"
        :class="{'input-select': true, 'error-input': error}"
        v-model="itemValue"
        placeholder
        @focus="triggerSelectVisible(false)"
        @keydown.native.space.stop.prevent="triggerSelectVisible(true)"
        @keydown.native="handleSelectEnterNum($event)"
        :popper-class=" 'select-' + config.name "
        @keydown.native.13="handleEnter"
      >
        <el-option
          v-for="item in (optionsCopy)"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-date-picker
        v-if="config.type === 'date'"
        ref="date"
        :class="{'input-date': true, 'error-input': error}"
        value-format="yyyy-MM-dd"
        :popper-class=" 'date-' + config.name "
        :style="style"
        :name="config.name"
        v-model="itemValue"
        type="date"
        :clearable="false"
        @focus="triggerDatePickVisible(false)"
        @change="handleDateChange"
        @keydown.native.space="triggerDatePickVisible(true)"
        @keydown.native.13="handleEnter"
      />

      <el-time-picker
        v-if="config.type === 'time'"
        ref="time"
        :class="{'input-time': true, 'error-input': error}"
        :style="style"
        :name="config.name"
        v-model="timeValue"
        @focus="triggerDatePickVisible(false)"
        @change="handleDateChange"
        @keydown.native.space="triggerDatePickVisible(true)"
        @keydown.native.13="handleEnter"
      ></el-time-picker>
    </div>
    <div
      class="input-after"
      v-if="dynamicAfter || config.staticAfter"
    >{{dynamicAfter || config.staticAfter}}</div>
  </el-col>
</template>

<script>
import utils from "../utils";
export default {
  name: "input-item",
  props: [
    "config",
    "value",
    "dynamicAfter",
    "dynamicDisabled",
    "showJudge",
    "error",
    "errorFocus"
  ],
  data() {
    return {};
  },
  computed: {
    itemValue: {
      get() {
        return this.value || this.value == 0 ? this.value : undefined;
      },
      set(val) {
        this.handleChange(val);
      }
    },
    timeValue: {
      get() {
        return this.value || this.value == 0 ? this.value : undefined;
      },
      set(val) {
        this.handleChange(val);
      }
    },
    optionsCopy() {
      return this.config.staticOptions || [];
    },
    style() {
      const width =
        this.config.width !== undefined ? `width: ${this.config.width}px` : "";
      return `${width}`;
    },
    // 当前输入框可用的按键keyCode集合。0 - 9 的数字按键对应keyCode为 48 -57
    selectCanUseKeyCodes() {
      if (this.config.type === "select") {
        // 将options的value转为数字
        const values = this.config.staticOptions.map(item =>
          Number(item.value)
        );
        // 得到数字对应的keyCode
        return values.map(item => 48 + item);
      }
    }
  },
  watch: {
    errorFocus(next) {
      if (next) this.errorFocusAnimate();
    }
  },
  mounted() {
    this.timelyOptions = this.optionsCopy;
  },
  methods: {
    handleDateChange(val) {
      console.log(val, "date change");
      if (val) this.handleEnter();
    },

    // :picker-options="{cellClassName: this.cellClassName}"
    cellClassName(date) {
      return "date-cell";
    },

    // 向上触发change
    handleChange(val) {
      this.$emit("change", this.config.name, val, this.config.computed);
    },

    // 判断是否需要打开代码录入
    judgeDictInput(e) {
      if (this.config.dictType) {
        const params = {
          dictType: this.config.dictType,
          opener: "inputValues",
          dictExtraParams: this.config.dictExtraParams,
          fields: [{ dictField: "dmmc", targetField: this.config.name }]
        };
        this.config.relationFields.forEach(item => {
          const [dictField, targetField] = item.split("/");
          params.fields.push({ dictField, targetField });
        });
        this.$emit("openDictDialog", e, params);
        e.target.blur();
      } else if (this.config.specialInput) {
        this.$emit("openSpecialDialog", this.config);
      }
    },

    // 触发enter键：下一个聚焦
    handleEnter(e) {
      // select和date，先将其隐藏
      if (this.config.type === "select") {
        this.$refs.select.blur();
      } else if (this.config.type === "date") {
        this.$refs.date.handleClose();
      }
      // tip: 特殊处理"是否有出院31天内再住院计划"，若值为没有，跳过下一个"再住院目的"
      // tip: 特殊处理 "离院方式"，若值不为 2、3，则跳过下一个"拟接受医疗机构名称"
      // tip: 特殊处理 "药物过敏"，若值不为2，则跳过下一个"过敏药物"
      const jumpNext =
        this.config.valuesToJumpNext &&
        (!this.itemValue ||
          this.config.valuesToJumpNext.some(val => val == this.itemValue));
      // const jumpNext = (
      //     this.config.name === 'bazaDO.bazad5' && this.itemValue !== '1'
      // ) || (
      //     this.config.name === 'bazaDO.bazaf8' && this.itemValue !== '2' && this.itemValue !== '3'
      // ) || (
      //     this.config.name === 'bazaDO.baza52' && this.itemValue !== '2'
      // );
      utils.focusNext(this.config.name, false, jumpNext);
    },

    handleDel(e) {
      console.log(e.keyCode, "删除");
      if (this.config.dictCanDel) {
        const fields = [this.config.name];
        this.config.relationFields.forEach(item => {
          fields.push(item.split("/")[1]);
        });
        this.$emit("delDictValue", fields);
      }
    },

    // 若有值，聚焦不显示下拉，空格显示
    triggerSelectVisible(visible) {
      setTimeout(() => {
        if (this.value) this.$refs.select.visible = visible;
      }, 20);
    },

    // 聚焦不显示日期面板，按空格键后显示
    triggerDatePickVisible(visible) {
      if (visible) {
        document.getElementsByClassName(
          `date-${this.config.name}`
        )[0].style.display = "block";
      } else {
        setTimeout(() => {
          const a = document.getElementsByClassName(
            `date-${this.config.name}`
          )[0];
          a && (a.style.display = "none");
        }, 50);
        // document.querySelector(`.date-${this.config.name}`).style.display = 'block'
      }
    },

    /*            // 下拉的筛选 用于输入数字直接设置对应的值
            selectFilter(val) {
                if (val) {
                    const numStr = val.replace(/[^0-9]/ig,"")[0];
                    if (numStr) {
                        const index = this.optionsCopy.findIndex(item => item.value == numStr);
                        if (index >= 0) this.itemValue = numStr;
                        this.$refs.select.hoverIndex = index;
                    }
                }
            },*/

    // 下拉框数字按键事件。按对应数字，填入对应的值
    handleSelectEnterNum(e) {
      // 按了"点" 如1.2
      if (e.keyCode === 190) {
        this.isDecimal = true; // 记为是小数
        return;
      }
      let val = undefined;
      // 输入小数
      if (
        this.isDecimal &&
        this.optionsCopy.some(item => item.value.indexOf(".") >= 0)
      ) {
        val = "1." + String(e.keyCode - 48);
      } else if (this.selectCanUseKeyCodes.indexOf(e.keyCode) >= 0) {
        // 输入整数
        val = String(e.keyCode - 48);
      }
      // 找到当前值在options里的index，手动给select设置当前hover索引，否则按enter键后值会设置为hoverIndex处的option.value
      const index = this.optionsCopy.findIndex(item => item.value == val);
      if (index >= 0) {
        this.$refs.select.hoverIndex = index;
        this.handleChange(val);
        this.isDecimal = false;
      }
    },

    // 错误项聚焦时的动画闪烁
    errorFocusAnimate() {
      const doAnimate = function(el, times) {
        const colors = ["#F56C6C", "#ffffff"];
        el.style = `background: ${colors[times % 2]}`;
        const restTimes = times - 1;
        if (restTimes > 0) {
          setTimeout(() => {
            doAnimate(el, restTimes);
          }, 200);
        } else {
          el.style = "";
        }
      };
      const input_inner = document.querySelector(
        `input[name="${this.config.name}"]`
      );
      input_inner && doAnimate(input_inner, 7);
    }
  }
};
</script>

<style lang="less" scoped>
.input-item {
  overflow: hidden;
  display: flex;
  color: #3c3c3c;
  margin-bottom: 15px;
}
.input-label {
  padding-right: 5px;
  line-height: 20px;
}
.input-after {
  margin-left: 5px;
  line-height: 20px;
}
.input-content {
  flex: 1;
}
.input-text {
}
.input-number {
  line-height: 18px;
}
.input-text,
.input-number,
.input-select,
.input-date,
.input-time {
  width: 100%;
  /deep/ .el-input__inner {
    border: 0;
    border-bottom: 1px solid #ccc;
    height: 20px;
    line-height: 20px;
    padding-bottom: 2px;
    border-radius: 0;
    font-size: 16px;
    text-align: left;
    padding-right: 15px;
  }
  /deep/ .el-input__inner:focus {
    background: #409eff; // #0683b1
    color: #ffffff;
    border-top-color: #409eff;
  }
  /deep/ .el-input__icon {
    line-height: 20px;
    display: none;
  }
}
.error-input {
  /deep/ .el-input__inner {
    background: #f56c6c;
    color: #ffffff;
  }
  /deep/ .el-input__inner:focus {
    background: #f56c6c; //
    border-top-color: #f56c6c;
  }
}
</style>

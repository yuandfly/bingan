<template>
    <el-col
            v-if="config.showCondition ? showJudge[config.showCondition] : true"
            :lg="config.span"
            :md="12"
            :offset="config.offset"
            class="input-item"
    >
        <div class="input-before" v-if="dynamicBefore">

            <el-select
                    v-model="dynamicBefore.value"
                    :class="{'input-select': true, 'error-input': error}"
                    style="width: 220px;right: 2px;"
                    placeholder="请选择证件类型"
                    @change="handleDynamicBeforeChange($event)"
            >
                <el-option
                        v-for="item in (dynamicBefore.options)"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"

                />
            </el-select>

        </div>
        <div class="input-label" v-if="config.label">{{config.label}}</div>
        <div class="input-content" :id="config.name">

            <template v-if="config.type === 'text'">
                <el-input
                        v-if="config.dictType || config.specialInput"
                        :style="style"
                        :class="{'input-text': true, 'error-input': error}"
                        :name="config.name"
                        :disabled="config.disabled || dynamicDisabled"
                        :value="itemValue"
                        @keyup.native.32="judgeDictInput($event)"
                        @keydown.native.13="handleEnter($event)"
                        @keydown.native.39="handleEnter($event)"
                        @keydown.native.37="handleEnter($event, -1)"
                        @keydown.native.115="clearDictInputValue"
                />

                <el-input
                        v-else
                        :style="style"
                        :class="{'input-text': true, 'error-input': error}"
                        :name="config.name"
                        :disabled="config.disabled || dynamicDisabled"
                        v-model="itemValue"
                        @keyup.native.32="judgeDictInput($event)"
                        @keydown.native.13="handleEnter($event)"
                        @keydown.native.39="handleEnter($event)"
                        @keydown.native.37="handleEnter($event, -1)"
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
                    @keydown.native.13="handleEnter($event)"
                    @keydown.native.39="handleEnter($event)"
                    @keydown.native.37="handleEnter($event, -1)"
            />

            <el-select
                    v-if="config.type === 'select'"
                    ref="select"
                    :style="style"
                    :name="config.name"
                    :disabled="config.disabled"
                    :automatic-dropdown="false"
                    :class="{'input-select': true, 'error-input': error}"
                    v-model="itemValue"
                    placeholder
                    @focus="triggerSelectVisible(false)"
                    @keydown.native.space.stop.prevent="triggerSelectVisible(true)"
                    @keydown.native="handleSelectEnterNum($event)"
                    :popper-class=" 'select-' + config.name "
                    @keydown.native.13="handleEnter($event)"
                    @keydown.native.39="handleEnter($event)"
                    @keydown.native.37="handleEnter($event, -1)"
                    @keydown.native.115="clearDictInputValue"
            >
                <el-option
                        v-for="item in (optionsCopy)"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                >{{item.value + '. ' +item.label}}</el-option>
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
                    @keyup.native="processSpel"
                    @focus="triggerDatePickVisible(false)"

                    @keydown.native.space="triggerDatePickVisible(true)"
                    @keydown.native.prevent.13="handleEnter($event)"
                    @keydown.native.prevent.39="handleEnter($event)"
                    @keydown.native.prevent.37="handleEnter($event, -1)"
            />

        </div>

        <div class="input-after" v-if=" config.staticAfter">
            <span>{{config.staticAfter}}</span>
        </div>
        <div  class="input-after" v-if="dynamicAfter">
                    <span>
                <el-select
                        v-model="dynamicAfter.value"
                        :class="{'input-select': true, 'error-input': error}"
                        style="width: 80px;"
                        :disabled="config.dynamicAfterDisable"
                        @change="handleDynamicAfterChange($event)"
                >
                     <el-option
                             v-for="item in (dynamicAfter.options)"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"

                     />
                </el-select>
            </span>
        </div>
        <div  class="input-after"  v-if=" config.btnAfter">
            <el-button class="btn-after" size="mini" type="text" :disabled="config.isBtnAfter" @click="handleAfterClick">{{config.btnAfter}}</el-button>
        </div>
    </el-col>
</template>

<script>
    import utils from "../utils";
    import {cleanSpelChar} from "../../../utils/index";
    export default {
        name: 'input-item',
        props: ['config', 'value', 'dynamicAfter', 'dynamicBefore',  'dynamicDisabled', 'showJudge', 'error', 'errorFocus'],
        data() {
            return {
                isDecimal: false
            }
        },
        computed: {
            itemValue: {
                get() {
                    // console.log(this.value, this.config.label);
                    return this.value || this.value == 0 ? this.value : undefined
                },
                set(val) {
                    this.handleChange(val)
                }
            },
            optionsCopy() {
                return this.config.staticOptions || []
            },
            checkboxCopy() {
                return this.config.staticOptions || []
            },
            style() {
                const width = this.config.width !== undefined ? `width: ${this.config.width}px` : '';
                return `${width}`
            },
            // 当前输入框可用的按键keyCode集合。0 - 9 的数字按键对应keyCode为 48 -57 或者 96 - 105
            selectCanUseKeyCodes() {
                if (this.config.type === 'select') {
                    // 将options的value转为数字
                    console.log()
                    const values = this.config.staticOptions.map(item => Number(item.value));
                    // 得到数字对应的keyCode
                    let v1 =  values.map(item => (48 + item));
                    let v2 =  values.map(item => (96 + item));
                    return [v1, v2];
                }
            }
        },
        watch: {
            errorFocus(next) {
                if (next) this.errorFocusAnimate()
            }
        },
        mounted() {
            this.timelyOptions = this.optionsCopy;
            if (this.config.isBtnAfter !== undefined) {

            }
        },
        methods: {
            processSpel (ev) {
                let re = /^[0-9\-]*$/g;
                if (re.test(ev.key)) {
                    console.log(ev, document.getElementsByName('bazaDO.bazab6'),this.itemValue);
                }
            },
// 按f4清除由字典录入的数据
            clearDictInputValue() {
                    const targetKeys = [this.config.name]; // 把显示的名称字段带上
                    console.log(targetKeys);
                    // 取出关联字段名
                    if (this.config.relationFields) {
                        this.config.relationFields.forEach(item => {
                            targetKeys.push(item.split("/")[1]);
                        });
                    }

                    this.$emit('clear', targetKeys, 'inputValues')

            },
            // after按钮的点击同样是触发特殊dialog打开
            handleAfterClick() {
                console.log(this.config);
                this.$emit('openSpecialDialog', this.config)
            },
            handleDateChange(val) {
                console.log(val, "date change");
                if (val) this.handleEnter();
            },

            // 触发enter键：下一个聚焦
            handleEnter(e, step = 1) {
                console.log(e);
                console.log(this.config);
                // select和date，先将其隐藏
                if (this.config.type === "select") {
                    this.$refs.select.blur();
                } else if (this.config.type === "date") {
                    this.$refs.date.handleClose();
                }
                // tip: 特殊处理"是否有出院31天内再住院计划"，若值为没有，跳过下一个"再住院目的"
                // tip: 特殊处理 "离院方式"，若值不为 2、3，则跳过下一个"拟接受医疗机构名称"
                // tip: 特殊处理 "药物过敏"，若值不为2，则跳过下一个"过敏药物"

                //  特殊处理  如果是辩证施护， 跳转到西医table
                if (this.config.name === 'bazaDO.bazag3' && step === 1) {
                    let i = document.getElementById('WesternDiagnoseTable').querySelector(`#WesternDiagnoseTable0diseaseName`).focus();
                } else if (this.config.name === 'bazaDO.bazab6' && step === 1 && document.querySelector(`#operationTable0baf405`) ) {
                    document.querySelector(`#operationTable0baf405`).focus();
                }  else if (this.config.name === 'bazaDO.bazab6' && step === -1  ) {
                    console.log(this.config.name);
                    utils.focusNext(this.config.name, false, false, step);
                } else if (this.config.name === 'bazaDO.dmmc' && step === -1 && document.querySelector(`#ChineseDiagnoseTable0diseaseName`) ) {
                    document.querySelector(`#ChineseDiagnoseTable0diseaseName`).focus();
                } else if (this.config.name === 'baf8DO.baf813' && step === -1 && document.querySelector(`#operationTable0baf405`) ) {
                    document.querySelector(`#operationTable0baf405`).focus();
                } else if ( step !== -1){
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
                    utils.focusNext(this.config.name, false, jumpNext, step);
                } else {

                    // const jumpNext = (
                    //     this.config.name === 'bazaDO.bazad5' && this.itemValue !== '1'
                    // ) || (
                    //     this.config.name === 'bazaDO.bazaf8' && this.itemValue !== '2' && this.itemValue !== '3'
                    // ) || (
                    //     this.config.name === 'bazaDO.baza52' && this.itemValue !== '2'
                    // );
                    utils.focusNext(this.config.name, false, false, -1);
                }



            },
            // :picker-options="{cellClassName: this.cellClassName}"
            cellClassName(date) {
                return "date-cell";
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

            // 向上触发change
            handleChange(val) {
                console.log(val);

                this.$emit('change', this.config.name, val, this.config.computed);

            },

            handleDynamicAfterChange (val) {
                console.log(val);
                this.$emit('dynamicAfterChange', this.dynamicAfter.name, val);
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
                if (this.isDecimal && this.optionsCopy.some(item => item.value.indexOf('.') >= 0)) {
                    val = '1.' + String(e.keyCode - 48);
                } else if (this.selectCanUseKeyCodes[0].indexOf(e.keyCode) >= 0 ) { // 输入整数
                    console.log(e.keyCode);
                    val = String(e.keyCode - 48);
                } else if (this.selectCanUseKeyCodes[1].indexOf(e.keyCode) >= 0 ) { // 输入整数
                    console.log(e.keyCode);
                    val = String(e.keyCode - 96);
                }
                // 找到当前值在options里的index，手动给select设置当前hover索引，否则按enter键后值会设置为hoverIndex处的option.value
                const index = this.optionsCopy.findIndex(item => item.value == val);
                if (index >= 0) {
                    console.log(this.$refs.select);
                    this.$refs.select.hoverIndex = index;
                    this.handleChange(val);
                    this.isDecimal = false;
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
        color: black;
        margin-bottom: 15px;
    }
    .input-label {
        padding-right: 5px;
        line-height: 20px;
    }
    .input-before {
        margin-left: 5px;
    }
    .input-after {
        margin-left: 5px;
    }
    .btn-after {
        padding: 0;
    }
    .input-content {
        flex: 1
    }
    .input-text {

    }
    .input-number {
        line-height: 18px;
    }
    .input-text, .input-number, .input-select, .input-date {
        width: 100%;
        /deep/ .el-input__inner {
            border: 0;
            border-bottom: 1px solid #aaa;
            height: 20px;
            line-height: 20px;
            padding-bottom: 2px;
            border-radius: 0;
            font-size: 16px;
            text-align: left;
            padding-right: 15px;

            color: #3c3c3c;
        }
        /deep/ .el-input__inner:focus {
            background: #409EFF; // #0683b1
            color: #ffffff;
            border-top-color: #409EFF;
        }
        /deep/ .el-input__icon {
            line-height: 20px;
            display: none;
        }
    }
    .error-input {
        /deep/ .el-input__inner {
            background: #F56C6C;
            color: #ffffff;
        }
        /deep/ .el-input__inner:focus {
            background: #F56C6C; //
            border-top-color: #F56C6C;
        }
    }
</style>

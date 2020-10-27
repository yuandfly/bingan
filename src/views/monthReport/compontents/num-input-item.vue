<template>
    <div class="num-input-item" :style="itemStyle">
        <p class="num-label" :style="labelStyle">{{item.label}}</p>
        <div class="num-content" :style="{marginLeft: labelStyle.width}">
            <el-input
                    :id="item.name"
                    style="width: 100%"
                    v-model="itemValue"
                    :controls="false"
                    size="mini"
                    @keydown.native.13="handleFocusNext($event, 1)"
                    @keydown.native.37="handleFocusNext($event, 2)"
                    @keydown.native.38="handleFocusNext($event, 3)"
                    @keydown.native.39="handleFocusNext($event, 4)"
                    @keydown.native.40="handleFocusNext($event, 5)"
            />
        </div>
    </div>
</template>

<script>
    export default {
        name: "num-input-item",
        props: {
            value: {},
            item: {
                type: Object
            },
            // label宽度
            labelWidth: {
              type: Number,
              default: undefined
            },
            //
            itemMarginBottom: {
                type: Number,
                default: undefined
            },
            max: {
                type: Number,
                default: undefined
            }
        },
        computed: {
            itemValue: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('update:value', val)
                }
            },
            labelStyle() {
                return {
                    textIndent: this.item.indent ? this.item.indent + 'em' : '',
                    width: this.labelWidth ? this.labelWidth + 'px' : '200px'
                }
            },
            itemStyle() {
                return this.itemMarginBottom ? {marginBottom: this.itemMarginBottom + 'px'} : ''
            }
        },
        methods: {
            handleFocusNext(e, type) {
                e.target.blur();
                if (type === 1) {
                    this.$emit('focusNext');
                } else if (type === 2) {
                    this.$emit('focusLeft');
                } else if (type === 3) {
                    this.$emit('focusUp');
                } else if (type === 4) {
                    this.$emit('focusRight');
                } else if (type === 5) {
                    this.$emit('focusDown');
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .num-input-item {
        margin-bottom: 6px;
        clear: both;
    }
    .num-label {
        margin: 0;
        width: 200px;
        float: left;
        color: #606266;
        line-height: 28px;
    }
    .num-content {
        margin-left: 200px;
    }
</style>

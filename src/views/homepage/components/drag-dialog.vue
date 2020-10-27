<template>
    <div v-dragable class="drag-dialog dialog-init-place" v-show="value" :style="{width: width}">
        <div class="drag-dialog-header">
            <span class="header-title">{{title}}</span>
            <i class="el-icon-close header-close" @click="handleClose"></i>
        </div>
        <div class="drag-dialog-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "drag-dialog",
        props: {
            title: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: ''
            },
            value: {}
        },
        directives: {
            dragable: {
                bind:function (el, binding, vnode) {
                    // header元素拖拽
                    const headerEl = el.querySelector('.drag-dialog-header');
                    // 监听header鼠标按下事件
                    headerEl.onmousedown = e => {
                        // 获取dialog的半宽高
                        const halfWidth = parseInt(el.offsetWidth / 2);
                        const halfHeight = parseInt(el.offsetHeight / 2);
                        // 鼠标按下后，立即计算当前元素与可视区的距离
                        const disX = e.clientX - el.offsetLeft;
                        const disY = e.clientY - el.offsetTop;
                        // 监听移动
                        document.onmousemove = function (e) {
                            let left = e.clientX - disX;
                            let top = e.clientY - disY;
                            // 边界情况：允许拖入左侧dialog宽的一半
                            if(left < 0) left = 0 + 'px';
                            if(top < halfHeight -20) top = 0 + 'px';
                            // 边界请求：允许拖入右侧或下侧dialog宽高的一半
                            if (left > document.body.clientWidth - halfWidth) {
                                left = document.body.clientWidth - halfWidth + 'px'
                            }
                            if (top > document.body.clientHeight - halfHeight -15) {
                                top = document.body.clientHeight - halfHeight - 15 + 'px'
                            }
                            el.style.left = (left) + 'px';
                            el.style.top = (top) + 'px';
                        };
                        document.onmouseup = function(){
                            document.onmousemove = document.onmouseup = null;
                        }
                    }
                }
            }
        },
        methods: {
            handleClose() {
                this.$emit('input', false)
            }
        }
    }
</script>

<style scoped lang="less">
    .drag-dialog {
        position: fixed;
        background: #ffffff;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0,0,0,.3);
        min-width: 500px;
        z-index: 9999;
    }
    .dialog-init-place {
        top: 40%;
        left: 50%;
        transform: translate(-50%, -40%);
    }
    .drag-dialog-header {
        line-height: 20px;
        padding: 10px;
        border-bottom: 1px solid #EBEEF5;
        overflow: hidden;
        clear: both;
        cursor: move;
    }
    .header-title {
        font-size: 16px;
        color: #303133;
    }
    .header-close {
        float: right;
        font-size: 16px;
        color: #3c3c3c;
        cursor: pointer;
        &:hover {
            color: #409EFF
        }
    }
    .drag-dialog-content {
        padding: 10px;
        color: #606266;
    }
</style>

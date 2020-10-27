<template>
    <div style="padding: 10px">
        <el-tabs type="border-card" v-model="activeTabName">
            <el-tab-pane name="register" label="借阅登记">
                <div class="tab-pane-content">
                    <borrow />
                </div>
            </el-tab-pane>
            <el-tab-pane name="giveback" label="归还处理">
                <div class="tab-pane-content">
                    <give-back />
                </div>
            </el-tab-pane>
            <el-tab-pane name="statistics" label="查询统计">
                <div class="tab-pane-content">
                    <statistics />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Borrow from './borrow.vue';
    import GiveBack from './giveback.vue';
    import Statistics from './statistics.vue';
    export default {
        name: "borrowManager", // 病案借阅管理
        components: {Borrow, GiveBack, Statistics},
        data() {
            return {
                activeTabName: 'register'
            }
        }
    }
</script>

<style scoped lang="less">
    .tab-pane-content {
        min-height: calc(100vh - 230px);
    }
</style>

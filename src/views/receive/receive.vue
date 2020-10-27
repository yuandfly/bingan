<template>
    <div style="padding: 20px;">
        <el-form :inline="true">
            <el-form-item label="开始日期:" >
                <el-date-picker
                        v-model="dateBegin"
                        type="date"
                        size="small"
                        placeholder="开始日期"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期:">
                <el-date-picker
                        v-model="dateEnd"
                        type="date"
                        size="small"
                        placeholder="结束日期"
                        format="yyyy年MM月dd日"
                        value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="handleClick">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {receive} from "@/api";
    export default {
        name: 'receive.vue',
        data () {
            return {
                dateBegin: '',
                dateEnd: ''
            }
        },
        methods: {
            handleClick(){
                if (this.dateBegin && this.dateEnd) {
                    if (this.dateBegin > this.dateEnd) {
                        this.$message.error('开始时间不能大于结束时间');
                    } else {
                        receive({startTime: this.dateBegin, endTime: this.dateEnd}).then( res => {
                            if (res.code === 0) {
                                this.$message.success(res.msg);
                            } else {
                                this.$message.error(res.msg);
                            }
                        })
                    }

                } else {
                    this.$message.error('请选择时间');
                }

            }
        }
    }
</script>

<style scoped>

</style>
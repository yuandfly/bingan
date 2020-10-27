<template>
    <el-dialog title="日志详情" :visible.sync="hzyVisible" :before-close="handleClose" :destroy-on-close="true">
        <el-table :data="gridData">
            <el-table-column property="zdmc" label="字段名称" width="150"></el-table-column>
            <el-table-column property="bgq" label="修改前" width="200"></el-table-column>
            <el-table-column property="bgh" label="修改后"></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogBtn">关闭</el-button>
      </span>
    </el-dialog>


</template>

<script>
    import {seletcCzrzxqList} from "../../api/system/czrz.js";
    export default {
        props: {
            hzyVisible: {
                type: Boolean,
                default: false
            },
            uuid:{ type: String, default: ""},
        },
        data() {
            return {
                boolShow: this.hzyVisible,
                gridData: [],
                formInline: {},
            };
        },



        methods: {
            query(){
                /**视图刷新后再执行方法*/
                   this.$nextTick(()=>{
                    this.formInline.czrzId=this.uuid
                    seletcCzrzxqList(this.formInline).then(res=>{
                        this.gridData=res.data.data;
                    })
                })
            },

            cancelDialogBtn() {
                this.$emit('childShow')
            },
            handleClose() {
                this.$emit('childShow')

            }
        }

    };
</script>

<style scoped>

</style>
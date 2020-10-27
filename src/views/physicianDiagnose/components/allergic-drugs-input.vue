
<template>
    <el-dialog
        title="过敏药物录入"
        class="drugs-dialog"
        :visible="visible"
        :append-to-body="false"
        width="800px"
        top="50px"
        :close-on-click-modal="false"
        @close="handleClose"
    >
        <div class="drugs-header">
            <el-form :inline="true" :model="form">
                <el-form-item label="病案号">
                    <el-input size="mini" :value="baza00"></el-input>
                </el-form-item>
                <el-form-item label="过敏药物">
                    <el-input @keyup.native.32="openDictInput('allergicDrugsDict')" size="mini" :value="form.allergicDrugs"></el-input>
                </el-form-item>
                <el-form-item label="过敏源">
                    <el-input size="mini" @keyup.native.32="openDictInput('AllergenDict')" :value="form.Allergen"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="allergicDrugsData" border>
            <el-table-column prop="baf503" label="序号"></el-table-column>
            <el-table-column prop="baf502" label="标志">
                <template slot-scope="scope">{{scope.row.baf502 == 0 ? '过敏药物' : '过敏源'}}</template>
            </el-table-column>
            <el-table-column prop="baf504Name" label="名称"></el-table-column>
            <el-table-column prop="c" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleDel(scope.row.$index)" type="text" style="color: #F56C6C" size="mini" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <DictInput
            :visible.sync="dict.visible"
            :append-to-body="true"
            :dictType="dict.dictType"
            @submit="this.handleDictInputSubmit"
        />
        <span slot="footer">
            <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import DictInput from '../../../components/dialog/dict-input';
    export default {
        name: "allergic-drugs-input", // 过敏药物录入
        components: {DictInput},
        props: {
            visible: {
                type: Boolean,
                default: false,
                required: true
            },
            baza00: {
              type: String,
              default: '',
              required: true
            },
            allergicDrugsData: {
                type: Array,
                required: false
            }
        },
        data() {
            return {
                dict: {
                    dictType: undefined,
                    visible: false
                },
                form: {
                    allergicDrugs: undefined,
                    Allergen: undefined
                },
                tableData: []
            }
        },
        methods: {

            openDictInput(dictType) {
                this.dict = {
                    visible: true,
                    dictType
                }
            },

            handleDictInputSubmit(item) {
                const allergicDrugsData = this.allergicDrugsData.slice();
                allergicDrugsData.push({
                    baza00: this.baza00,
                    baf502: this.dict.dictType === 'allergicDrugsDict' ? '0' : '1', // 标志 (0:过敏药物，1:过敏源)
                    baf503: this.allergicDrugsData.length + 1,
                    baf504: item.dm,
                    baf504Name: item.dmmc
                });
                this.$emit('update:allergicDrugsData', allergicDrugsData)
            },

            handleDel(index) {
                const allergicDrugsData = this.allergicDrugsData.slice();
                allergicDrugsData.splice(index, 1);
                allergicDrugsData.forEach((item, index) => {
                    item.baf503 = index + 1
                });
                this.$emit('update:allergicDrugsData', allergicDrugsData)
            },

            handleSubmit() {
                const allergicDrugs = this.allergicDrugsData.filter(item => item.baf502 === '0').map(item => item.baf504Name).join('，');
                this.$emit('submit', allergicDrugs)
            },

            handleClose() {
                this.$emit('update:visible', false)
            },
        }
    }
</script>

<style scoped lang="less">
    .drugs-dialog {

    }
</style>

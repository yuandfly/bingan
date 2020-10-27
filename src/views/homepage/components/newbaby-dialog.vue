<template>
    <el-dialog
            title="新生儿信息"
            class="newbaby-dialog"
            :visible="visible"
            :append-to-body="false"
            width="1100px"
            top="50px"
            :close-on-click-modal="false"
            :show-close="false"
    >
        <div class="drugs-header">
            <el-form :inline="true" ref="form" :model="form">
                <el-row class="row-bottom">
                    <el-col :span="6">
                        <el-form-item :label="formFieldsName[0]">
                            <el-input
                                    :ref="formFields[0]"
                                    style="width: 180px"
                                    size="mini"
                                    :value="this.form.baza00"
                                    @keydown.native.enter="handleFocus(1)"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item  label="分娩：时间">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    :ref="formFields[2]"
                                    style="width: 140px"
                                    value-format="yyyy-MM-dd"
                                    v-model="form.bafa08"
                                    size="mini"
                            ></el-date-picker> -
                            <el-time-picker
                                    placeholder="选择时间"
                                    :ref="formFields[3]"
                                    style="width: 140px"
                                    v-model="form.bafa09"
                                    format="HH:mm"
                                    value-format="HH:mm"
                                    size="mini"
                            ></el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item  label="分娩方式">
                            <el-select v-model="form['bafa11']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) in fsArr" :value="value.value"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col>


                </el-row>
                <el-row class="row-bottom">
                    <el-col :span="5">
                        <el-form-item  label="新生儿：性别">
                            <el-select v-model="form['bafa05']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) in xbArr" :value="value.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="line-height: 40px;">
                        <el-form-item  label=" Apgar评分I">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 60px"
                                    size="mini"
                                    v-model="form['bafa06']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="line-height: 40px;">
                        <el-form-item  label=" Apgar评分II">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 60px"
                                    size="mini"
                                    v-model="form['bafa34']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="line-height: 40px;">
                        <el-form-item  label=" Apgar评分III">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 60px"
                                    size="mini"
                                    v-model="form['bafa35']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="line-height: 40px;">
                        <el-form-item  label="体重（g)">
                            <el-input
                                    :ref="formFields[5]"
                                    style="width: 70px"
                                    size="mini"
                                    v-model="form['bafa16']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" style="line-height: 40px;">
                        <el-form-item  label="身长（cm）">
                            <el-input
                                    :ref="formFields[5]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa15']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" style="line-height: 40px;">
                        <el-form-item  label="头围（cm）">
                            <el-input
                                    :ref="formFields[5]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa27']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" style="line-height: 40px;">
                        <el-form-item  label="胸围（cm）">
                            <el-input
                                    :ref="formFields[5]"
                                    style="width: 110px"
                                    size="mini"
                                    v-model="form['bafa28']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="line-height: 40px;">
                        <el-form-item  label="血型">
                            <el-select v-model="form['bafa31']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) in xxArr" :value="value.value"></el-option>

                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" style="line-height: 40px;">
                        <el-form-item  label="转归">
                            <el-select v-model="form['bafa32']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) in zgArr" :value="value.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row class="row-bottom">
                    <el-col :span="4">

                        <el-form-item label="胎次">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa02']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">

                        <el-form-item label="产次">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa03']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">

                        <el-form-item label="生产胎方位">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa22']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">

                        <el-form-item label="产出情况">
                            <el-select v-model="form['bafa07']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) of ccqkArr" :value="value.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="产妇会阴破裂度">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa13']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">

                        <el-form-item label="产后出血量（ml）">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa23']"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">

                        <el-form-item label="伤口愈合情况">
                            <el-select v-model="form['bafa30']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) in skyhqkArr" :value="value.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">

                        <el-form-item label="出院情况">
                            <el-select v-model="form['bafa10']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option :label="value.label" v-for="(value) in cyqkArr" :value="value.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">

                        <el-form-item label="接产者">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa12']"
                            />
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row class="row-bottom">
                    <el-col :span="6" style="line-height: 40px;">
                        <el-form-item label="I程">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.ic_s"
                            />
                        </el-form-item>
                        <el-form-item label="时">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.ic_f"
                            />
                        </el-form-item>
                        <span>分</span>
                    </el-col>
                    <el-col :span="6" style="line-height: 40px;">
                        <el-form-item label="II程">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.iic_s"
                            />
                        </el-form-item>
                        <el-form-item label="时">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.iic_f"
                            />
                        </el-form-item>
                        <span>分</span>
                    </el-col>
                    <el-col :span="6" style="line-height: 40px;">
                        <el-form-item label="III程">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.iiic_s"
                            />
                        </el-form-item>
                        <el-form-item label="时">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.iiic_f"
                            />
                        </el-form-item>
                        <span>分</span>
                    </el-col>
                    <el-col :span="6" style="line-height: 40px;">
                        <el-form-item label="IV程">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"

                                    v-model="form.ivc_s"
                            />
                        </el-form-item>
                        <el-form-item label="时">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form.ivc_f"
                            />
                        </el-form-item>
                        <span>分</span>
                    </el-col>
                </el-row>
                <el-row class="row-bottom">
                    <el-col :span="8" style="line-height: 40px;">
                        <el-form-item label="总产程时间">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    disabled
                                    v-model="form.zccsj_s"
                            />
                        </el-form-item>
                        <el-form-item label="时">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    disabled
                                    v-model="form.zccsj_f"
                            />
                        </el-form-item>
                        <span>分</span>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="胎别顺序标志">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa14']"
                            />
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">

                        <el-form-item label="孕周">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa29']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">

                        <el-form-item label="分娩数">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    v-model="form['bafa04']"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="row-bottom newbaby-diagnose">
                    <el-col :span="3">
                        <el-form-item label="新生儿疾病诊断："   style="width: 100%;">

                        </el-form-item>

                    </el-col>
                    <el-col :span="20">
                        <el-form-item label="1" >
                            <el-input
                                    :ref="formFields[7]"
                                    size="mini"
                                    :value="form['bafa24Name']"
                                    @keyup.native.32="openDictInput(  'westernDiagnoseDict', [formFields[36], 'bafa24Name'])"

                            />
                        </el-form-item>
                        <el-form-item label="2" >
                            <el-input
                                    :ref="formFields[7]"
                                    size="mini"
                                    :value="form['bafa25Name']"
                                    @keyup.native.32="openDictInput('westernDiagnoseDict', [formFields[37], 'bafa25Name'])"
                            />
                        </el-form-item>
                        <el-form-item label="3" >
                            <el-input
                                    :ref="formFields[7]"
                                    size="mini"
                                    :value="form['bafa26Name']"
                                    @keyup.native.32="openDictInput('westernDiagnoseDict', [formFields[38], 'bafa26Name'])"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <div style="margin: 10px">
            <el-button type="primary" size="mini" @click="handleAdd()"> {{isdel ? '取消选择': '追加'}}</el-button>
        </div>
        <el-table
                :data="newBabyData"
                highlight-current-row
                ref="singleTable"
                :row-class-name="tableRowClassName"
                @row-click="rowClick"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    width="50">
                <template slot-scope="scope">
                    <el-button style="color: red;" @click.stop="handleDel(scope.$index)" size="mini"  type="text">删除</el-button>
                </template>
            </el-table-column>

            <el-table-column
                    prop="jhslx"
                    label="分娩时间"
                    width="140">
                <template slot-scope="scope">
                    {{ scope.row.bafa08 + ' ' + scope.row.bafa09}}
                </template>
            </el-table-column>
                <el-table-column
                        prop="bafa11"
                        label="分娩方式"
                >
                    <template slot-scope="scope">
                        {{ scope.row['bafa11'] === '9' ? '其它' : fsArr[scope.row['bafa11']]['label'] }}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="bafa05"
                        label="性别"
                >
                    <template slot-scope="scope">
                        {{ scope.row['bafa05'] === '1' ? '男' : '女' }}
                    </template>
                </el-table-column>

            <el-table-column
                    prop="bafa06"
                    label="Apgar评分I"
                    width="120">
                <template slot-scope="scope">
                    {{scope.row['bafa06']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa34"
                    label="Apgar评分II"
                    width="120">
                <template slot-scope="scope">
                    {{scope.row['bafa34']}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="bafa35"
                    label="Apgar评分III"
                    width="120">
                <template slot-scope="scope">
                    {{scope.row['bafa35']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa16"
                    label="体重（g）"
                    width="100">
                <template slot-scope="scope">
                    {{scope.row['bafa16']}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="bafa15"
                    label="身长（cm）"
                    width="100">
                <template slot-scope="scope">
                    {{scope.row['bafa15']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa27"
                    label="头围（cm）"
                    width="100">
                <template slot-scope="scope">
                    {{scope.row['bafa27']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa28"
                    label="胸围（cm）"
                    width="100">
                <template slot-scope="scope">
                    {{scope.row['bafa28']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa31"
                    label="血型"
                    width="80">
                <template slot-scope="scope">
                    {{ xxArr[scope.row['bafa31']]['label'] }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa32"
                    label="转归"
                    width="80">
                <template slot-scope="scope">
                    {{scope.row['bafa32'] === '1' ? '治愈' : scope.row['bafa32'] === '2' ? '好转' : scope.row['bafa32'] === '3' ? '未愈' : '畸形' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa02"
                    label="胎次"
                    width="80">

                <template slot-scope="scope">
                    {{scope.row['bafa02']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa03"
                    label="产次"
                    width="80">

                <template slot-scope="scope">
                    {{scope.row['bafa03']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa22"
                    label="生产胎方位"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa22']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa07"
                    label="产出情况"
                    >
                <template slot-scope="scope">
                    {{scope.row['bafa07'] === '1' ? '活产' : scope.row['bafa07'] === '2' ? '死产' : scope.row['bafa07'] === '3' ? '死胎' : '畸形' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa13"
                    label="产妇会阴破裂度"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa13']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa23"
                    label="产后出血量（ml）"
                    width="140">

                <template slot-scope="scope">
                    {{scope.row['bafa23']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa30"
                    label="伤口愈合情况"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa30'] === '1' ? '甲' : scope.row['bafa30'] === '2' ? '乙' : scope.row['bafa30'] === '3' ? '丙' : '其它' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa10"
                    label="出院情况"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa10'] === '1' ? '正常' : scope.row['bafa10'] === '2' ? '有病' : scope.row['bafa10'] === '3' ? '交叉感染' : '死亡' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa12"
                    label="接产者"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa12']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa17"
                    label="总产程时间"
                    width="120">
                <template slot-scope="scope">
                    {{scope.row['bafa17']}}
                </template>
            </el-table-column>

            <el-table-column
                    prop="bafa14"
                    label="胎别顺序标志"
                    width="120">
                <template slot-scope="scope">
                    {{scope.row['bafa14']}}
                </template>
            </el-table-column>


            <el-table-column
                    prop="bafa29"
                    label="孕周"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa29']}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="bafa04"
                    label="分娩数"
                    width="120">

                <template slot-scope="scope">
                    {{scope.row['bafa04']}}
                </template>
            </el-table-column>
            <el-table-column

                    label="新生儿疾病诊断"
                    >
                <el-table-column
                        prop="bafa24Name"
                        label="1"
                        width="150"
                         >
                </el-table-column>
                <el-table-column
                        prop="bafa25Name"
                        label="2"
                        width="150"
                         >
                </el-table-column>
                <el-table-column
                        prop="bafa26Name"
                        label="3"
                        width="150"
                         >
                </el-table-column>
            </el-table-column>

        </el-table>

        <span slot="footer">
      <el-button size="small" type="primary" @click="handleSubmit">确 定</el-button>
        </span>

        <DictInput
                :visible.sync="dict.visible"
                :append-to-body="true"
                :dictType="dict.dictType"
                :extraParams="dict.extraParams"
                @submit="this.handleDictInputSubmit"
        />

    </el-dialog>
</template>

<script>
    import DictInput from "../../../components/dialog/dict-input";
    export default {
        name: 'newbaby-dialog',
        components: {
            DictInput
        },
        data () {
            return {

                fsArr: [
                    {label:'顺产', value: '0'},
                    {label:'侧切', value: '1'},
                    {label:'低位产', value: '2'},
                    {label:'产钳', value: '3'},
                    {label:'吸引器', value: '4'},
                    {label:'臀位', value: '5'},
                    {label:'臀牵引', value: '6'},
                    {label:'剖腹', value: '7'},
                    {label:'其它', value: '9'},
                ],
                xbArr: [
                    {label:'男', value: '1'},
                    {label:'女', value: '2'}
                ],
                xxArr: [
                    {label:'未知', value: '0'},
                    {label:'A', value: '1'},
                    {label:'B', value: '2'},
                    {label:'O', value: '3'},
                    {label:'AB', value: '4'},
                    {label:'不详', value: '5'},
                    {label:'未查', value: '6'}
                ],
                zgArr: [
                    {label:'治愈', value: '1'},
                    {label:'好转', value: '2'},
                    {label:'未愈', value: '3'},
                    {label:'死亡', value: '4'},
                ],
                ccqkArr: [
                    {label:'活产', value: '1'},
                    {label:'死产', value: '2'},
                    {label:'死胎', value: '3'},
                    {label:'畸形', value: '4'},
                ],
                skyhqkArr: [
                    {label:'甲', value: '1'},
                    {label:'乙', value: '2'},
                    {label:'丙', value: '3'},
                    {label:'其它', value: '9'},
                ],
                cyqkArr: [
                    {label:'正常', value: '1'},
                    {label:'有病', value: '2'},
                    {label:'交叉感染', value: '3'},
                    {label:'死亡', value: '4'},
                ],
                dict: {
                    dictType: undefined,
                    visible: false,
                    currentOpener: [],
                },
                selectIndex: undefined,
               formFields: [
                   "baza00",
                   "bafa08",
                   "bafa09",
                   "bafa11", // 分娩方式
                   "bafa05", // 性别
                   "bafa06", // 评分1
                   "bafa34", // 评分2
                   "bafa35", // 评分3
                   "bafa16", // 体重
                   "bafa15", // 身长
                   "bafa27", // 头围
                   "bafa28", // 胸围
                   "bafa31", // 血型
                   "bafa32", // 转归
                   "bafa02", // 胎次
                   "bafa03", // 产次
                   "bafa22", // 生产胎方位
                   "bafa07", // 产出情况
                   "bafa13", // 产妇会阴破裂度
                   "bafa23", // 产后出血量
                   "bafa30", // 伤口愈合情况
                   "bafa10", // 出院情况
                   "bafa12", // 接产者
                   "ic_s",
                   "ic_f",
                   "iic_s",
                   "iic_f",
                   "iiic_s",
                   "iiic_f",
                   "ivc_s",
                   "ivc_f",
                   "zccsj_s",
                   "zccsj_f",
                   "bafa14", // 胎别顺序标志
                   "bafa29", // 孕周
                   "bafa04", // 分娩数,
                   "bafa24",
                   "bafa25",
                   "bafa26"
               ],
                   formFieldsName: [
                   "病案号",
                   "分娩日期",
                   "分娩时间",
                   "分娩方式",
                   "新生儿性别",
                   "Apgar评分I",
                   "Apgar评分II",
                   "Apgar评分III",
                   "体重（g）",
                   "身长（cm）",
                   "头围（cm）",
                   "胸围（cm）",
                   "血型",
                   "转归",
                   "胎次",
                   "产次",
                   "生产胎方位",
                   "产出情况",
                   "产妇会阴破裂度",
                   "产后出血量（ml）",
                   "伤口愈合情况",
                   "出院情况",
                   "接产者",
                   "I程时",
                   "I程分",
                   "II程时",
                   "II程分",
                   "III程时",
                   "III程分",
                   "IV程时",
                   "IV程分",
                   "总产程小时",
                   "总产程分钟",
                   "胎别顺序标志",
                   "孕周",
                   "分娩数",
                       "诊断1",
                       "诊断2",
                       "诊断3"
               ],
                   form: {
                        "baza00": "",
                       "bafa08": "",
                       "bafa09": "",
                       "bafa11": "",
                       "bafa05": "",
                       "bafa06": "",
                       "bafa34": "",
                       "bafa35": "",
                       "bafa16": "",
                       "bafa15": "",
                       "bafa27": "",
                       "bafa28": "",
                       "bafa31": "",
                       "bafa32": "",
                       "bafa02": "",
                       "bafa03": "",
                       "bafa22": "",
                       "bafa07": "",
                       "bafa13": "",
                       "bafa23": "",
                       "bafa30": "",
                       "bafa10": "",
                       "bafa12": "",
                       "ic_s": '',
                       "ic_f": '',
                       "iic_s":  '',
                       "iic_f":  '',
                       "iiic_s":  '',
                       "iiic_f":  '',
                       "ivc_s":  '',
                       "ivc_f":  '',
                       "zccsj_s":  '',
                       "zccsj_f": '',
                       "bafa29": "",
                       "bafa14": "",
                       "bafa04": "",
                       "bafa24": "",
                       "bafa25": "",
                       "bafa26": "",
                       "bafa17": "", // 总产程时间
                       "bafa18": "", // 总产程时间i
                       "bafa19": "", // 总产程时间ii
                       "bafa20": "", // 总产程时间iii
                       "bafa21": "", // 总产程时间iv
                       "bafa24Name": "",
                       "bafa25Name": "",
                       "bafa26Name": ""

               }
           }
        },
        computed: {
            isdel () {
                return this.selectIndex || this.selectIndex === 0
            }
        },
        watch: {
            baza00(val) {
                console.log(val);

                this.form.baza00 = val;
                // 初始化表单下标

                // setTimeout(() => {
                //     this.selectIndex = undefined
                //     console.log(this.$refs.singleTable);
                //     this.$refs.singleTable.setCurrentRow();
                // }, 0);
            },
            visible (val) {
                console.log(val);
                this.initCCSJ();
                setTimeout(() => {
                    this.cancelRowClick();
                }, 100);
                console.log(this.newBabyData);
            }
        },
        props: {
            visible: {
                type: Boolean,
                default: false,
                required: true
            },
            baza00: {
                type: String,
                default: "",
                required: true
            },
            newBabyData: {
                type: Array,
                required: false
            },
        },
        methods: {


            openDictInput(dictType, currentOpener) {
                this.dict = {
                    visible: true,
                    dictType,
                    extraParams: {},
                    currentOpener
                };
            },
            handleClose() {
                this.$emit("update:visible", false);
            },
            handleSubmit() {
                console.log(this.newBabyData);
                // 计算总监护时间
                this.getTotalTime();
                // 添加分娩时间

                // 验证数据
                if ( this.selectIndex > -1 && this.validateField()  ) {

                    return true;
                }


                this.$emit("submit", this.newBabyData);
            },

            handleAdd(row) {
                let error = false;
                // 验证完整
                if (this.selectIndex > -1) {

                    if (this.validateField()) {
                        return true;
                    } else {
                        this.cancelRowClick();
                        return true;
                    }
                }
                console.log(this.$refs.singleTable);
                for (let i = 0; i < this.formFields.length; i++) {
                    const val = this.form[this.formFields[i]];
                    console.log(val, this.formFields[i]);

                    // 跳过总产程时间
                    if (this.formFields[i] === 'zccsj_s' || this.formFields[i] === 'zccsj_f' ) {
                        continue;
                    }

                    // 验证产程时间格式

                    if (!val || !val.toString().trim()) {
                        error = true;
                        this.$message.error(`请输入${this.formFieldsName[i]}`);
                        break;
                    }
                }

                // 验证时间先后
                this.getTotalTime();

                if (!error) {
                    console.log("good");
                    console.log(this.newBabyData);
                    const newBabyData = this.newBabyData.slice();
                    newBabyData.push({
                        baf208: String(newBabyData.length + 1), // 序号
                        ...this.form,
                    });
                    // this.calcStayDays(newBabyData);
                    this.$emit("update:newBabyData", newBabyData);
                    this.handleReset();
                }
            },

            handleDel(index) {
                console.log(this.newBabyData);
                this.$confirm(`确定删除吗？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const newBabyData = this.newBabyData.slice();
                    newBabyData.splice(index, 1);
                    newBabyData.forEach((item, index) => {
                        item.baf208 = String(index + 1);
                    });
                    this.selectIndex = undefined;
                    this.$refs.singleTable.setCurrentRow();
                    this.handleReset();
                    this.$emit("update:newBabyData", newBabyData);
                }).catch((e) => {
                   // console.log(e);
                });

            },
            // 初始化产程时间
            initCCSJ () {
                if (this.newBabyData.length > 0) {
                    this.newBabyData.forEach((value, index, arr) => {

                        this.$set(this.newBabyData[index], 'ic_s',  value['bafa18'].split(':')[0] );
                        this.$set(this.newBabyData[index], 'ic_f',  value['bafa18'].split(':')[1] );
                        this.$set(this.newBabyData[index], 'iic_s',  value['bafa19'].split(':')[0] );
                        this.$set(this.newBabyData[index], 'iic_f',  value['bafa19'].split(':')[1] );
                        this.$set(this.newBabyData[index], 'iiic_s',  value['bafa20'].split(':')[0] );
                        this.$set(this.newBabyData[index], 'iiic_f',  value['bafa20'].split(':')[1] );
                        this.$set(this.newBabyData[index], 'ivc_s',  value['bafa21'].split(':')[0] );
                        this.$set(this.newBabyData[index], 'ivc_f',  value['bafa21'].split(':')[1] );
                        this.$set(this.newBabyData[index], 'zccsj_s',  value['bafa17'].split(':')[0] );
                        this.$set(this.newBabyData[index], 'zccsj_f',  value['bafa17'].split(':')[1] );

                    });
                    console.log( this.newBabyData);
                }
            },
            getTotalTime () {
                let minutes = 0;
                let hours = 0;
                console.log(this.form);
                if (!this.form['ic_s'] || !this.form.iic_s || !this.form.iiic_s || !this.form.ivc_s || !this.form.ic_f || !this.form.iic_f || !this.form.iiic_f || !this.form.ivc_f) {
                    return false;
                }

                    hours = Number(this.form.ic_s) + Number(this.form.iic_s) + Number(this.form.iiic_s) + Number(this.form.ivc_s) ;
                    minutes = Number(this.form.ic_f) + Number(this.form.iic_f) + Number(this.form.iiic_f) + Number(this.form.ivc_f) ;
                      hours +=  Math.floor(minutes / 60); // 将分钟转化为小时并累加到小时内
                minutes = minutes % 60; // 分钟转化小时后还剩余的分钟
                console.log(hours, minutes);
                this.form.zccsj_s = hours;
                this.form.zccsj_f = minutes;
                this.form['bafa17'] = hours + ':' + minutes ;
                this.form['bafa18'] = this.form.ic_s + ':' + this.form.ic_f ;
                this.form['bafa19'] = this.form.iic_s + ':' + this.form.iic_f ;
                this.form['bafa20'] = this.form.iiic_s + ':' + this.form.iiic_f ;
                this.form['bafa21'] = this.form.ivc_s + ':' + this.form.ivc_f ;

                console.log(this.form);

            },

            handleReset() {
                this.form = {
                    "baza00": this.baza00,
                };
            },

            validateField () {
                let error = false;
                console.log(this.form);
                for (let i = 0; i < this.formFields.length; i++) {
                    const val = this.form[this.formFields[i]];

                    // 跳过总产程时间
                    if (this.formFields[i] === 'zccsj_s' || this.formFields[i] === 'zccsj_f' ) {
                        continue;
                    }

                    // apgar评分
                    if (this.formFields[i] === 'bafa06' || this.formFields[i] === 'bafa34' || this.formFields[i] === 'bafa35') {
                        if (this.form[this.formFields[i]] < 0 || this.form[this.formFields[i]] > 10) {
                            error = true;
                            this.$message.error(`Apgar评分不能小于0且不能大于10`);
                            break;
                        }
                    }

                    // 产程分钟不能大于60
                    if (this.formFields[i] === 'ic_f' || this.formFields[i] === 'iic_f' || this.formFields[i] === 'iiic_f'|| this.formFields[i] === 'ivc_f') {
                        if (this.form[this.formFields[i]] < 0 || this.form[this.formFields[i]] > 60) {
                            error = true;
                            this.$message.error(`产程分钟数不能小于0且不能大于60`);
                            break;
                        }
                    }
                    // 产程小时不能小于0
                    if (this.formFields[i] === 'ic_s' || this.formFields[i] === 'iic_s' || this.formFields[i] === 'iiic_s'|| this.formFields[i] === 'ivc_s') {
                        if (this.form[this.formFields[i]] < 0 ) {
                            error = true;
                            this.$message.error(`产程小时数不能小于0`);
                            break;
                        }
                    }

                    // 验证产程时间格式

                    if (!val || !val.toString().trim()) {
                        error = true;
                        this.$message.error(`请输入${this.formFieldsName[i]}`);
                        break;
                    }
                }

                return error;

            },
            // 点击行
            rowClick(ev, row) {
                console.log(this.selectIndex, ev);
                if (this.selectIndex > -1 && this.selectIndex === ev.index) {
                     this.cancelRowClick();
                } else {
                    this.form = this.newBabyData[ev.index];
                    this.selectIndex = ev.index;
                }
                console.log(this.selectIndex, ev);
            },
            // 取消选择行
            cancelRowClick(row) {
                this.$refs.singleTable.setCurrentRow(row);
                this.selectIndex = undefined;
                this.handleReset();
            },
            // 选择表格行
            handleCurrentChange(ev) {
                if (ev) {
                    this.form = this.newBabyData[ev.index];
                    this.selectIndex = ev.index;
                    console.log(this.newBabyData);
                    console.log(this.selectIndex, this.form);
                }
            },
            // 添加表格下标
            tableRowClassName ({row, rowIndex}) {
                row.index = rowIndex;
                console.log(rowIndex);
            },

            handleDictInputSubmit(item) {
                if (this.dict.currentOpener) {
                    this.$set(this.form, this.dict.currentOpener[0], item.dm );
                    this.$set(this.form, this.dict.currentOpener[1], item.dmmc );
                    const index = this.formFields.indexOf(this.dict.currentOpener[0]);
                    (index && index < 3) && this.handleFocus(index + 1);
                }
                console.log(this.dict, this.form, this.newBabyData[this.selectIndex]);

            },
        }
    }
</script>

<style  scoped>
    /deep/ .el-input__inner:focus {
        background: #409EFF;
         color: #ffffff;
        border-top-color: #409EFF;
    }
        .row-bottom {
            border-bottom: 1px solid #eee;
            padding-top: 10px;
        }


        .newbaby-dialog >>> .el-table th>.cell {
          text-align: center;
      }
        .newbaby-dialog >>> .el-col {
        height:45px;
    }
    .newbaby-diagnose {
        /*height: 140px;*/
    }

</style>
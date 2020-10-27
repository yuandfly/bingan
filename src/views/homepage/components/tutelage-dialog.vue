
<template>
    <el-dialog
            title="重症监护信息"
            class="pathologic-dialog"
            :visible="visible"
            :append-to-body="false"
            width="1100px"
            top="50px"
            :close-on-click-modal="false"
            :show-close="false"
    >
        <div class="drugs-header">
            <el-form :inline="true" ref="form" :model="form">
                <el-row >
                    <el-col :span="6">
                        <el-form-item label="病案号">
                            <el-input
                                    :ref="formFields[0]"
                                    style="width: 180px"
                                    size="mini"
                                    :value="this.form.baza00"
                                    @keydown.native.enter="handleFocus(1)"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="进入监护室顺序号">
                            <el-input
                                    :ref="formFields[1]"
                                    style="width: 60px"
                                    size="mini"
                                    v-model="form['baf702']"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="13" style="line-height: 40px;">
                        <el-form-item label="本次监护时间">
                            <el-input
                                    :ref="formFields[7]"
                                    style="width: 80px"
                                    size="mini"
                                    disabled
                                    v-model="form.jhsj_t"
                            />
                        </el-form-item>
                        <el-form-item label="天">
                            <el-input
                                    :ref="formFields[8]"
                                    style="width: 80px"
                                    size="mini"
                                    disabled
                                    v-model="form.jhsj_s"
                            />
                        </el-form-item>
                        <el-form-item label="小时">
                            <el-input
                                    :ref="formFields[9]"
                                    style="width: 80px"
                                    size="mini"
                                    disabled
                                    v-model="form.jhsj_f"
                            />
                        </el-form-item>
                        <span>分钟</span>
                    </el-col>

              </el-row>
                <el-row>
                    <el-col :span="6">

                        <el-form-item label="监护室类型">
                            <el-select v-model="form['baf703']" @change="setICUname" style="width: 152px" size="mini" :ref="formFields[10]">
                                <el-option label="CCU - 心脏监护室" value="01"></el-option>
                                <el-option label="RICU - 呼吸监护室" value="02"></el-option>
                                <el-option label="SICU - 外科监护室" value="03"></el-option>
                                <el-option label="NICU - 新生儿监护室" value="04"></el-option>
                                <el-option label="PICU - 儿科监护室" value="05"></el-option>
                                <el-option label="EICU - 急诊重症监护室" value="06"></el-option>
                                <el-option label="其他" value="99"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="进入时间">
                            <el-date-picker
                                    v-model="form.jrsj_date"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    align="right"
                                    size="mini"
                                    style="width: 180px"
                                    format="yyyy-MM-dd HH:mm"
                                    value-format="yyyy-MM-dd HH:mm"
                                    @keydown.native.enter="handleFocus(3)"
                                    >
                            </el-date-picker>

                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="退出时间">
                            <el-date-picker
                                    v-model="form.tcsj_date"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    align="right"
                                    size="mini"
                                    style="width: 180px"
                                    format="yyyy-MM-dd HH:mm"
                                    value-format="yyyy-MM-dd HH:mm"
                                    @keydown.native.enter="handleFocus(3)"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="发生人工气道脱出">
                            <el-select v-model="form['baf706']" style="width: 100px" size="mini" :ref="formFields[10]">
                                <el-option label="是" value="1"></el-option>
                                <el-option label="否" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>

                    <el-col :span="5">

                        <el-form-item label="有无使用器械">
                            <el-select v-model="form['baf712']" style="width: 100px" size="mini" :ref="formFields[11]">
                                <el-option label="无" value="1"></el-option>
                                <el-option label="有" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">

                        <el-form-item label="非预期的重返重症科">
                            <el-select v-model="form['baf719']" style="width: 100px" size="mini" :ref="formFields[12]">
                                <el-option label="无" value="1"></el-option>
                                <el-option label="有" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">

                        <el-form-item label="重返间隔时间">
                            <el-select v-model="form['baf720']" style="width: 100px" size="mini" :ref="formFields[13]">
                                <el-option label="非重返" value="0"></el-option>
                                <el-option label="24小时内" value="1"></el-option>
                                <el-option label="24-48小时" value="2"></el-option>
                                <el-option label="48小时" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="有无再入住计划">
                            <el-select v-model="form['baf710']" style="width: 100px" size="mini" :ref="formFields[12]">
                                <el-option label="无" value="1"></el-option>
                                <el-option label="有" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>

                    <el-col :span="12">
                        <el-form-item label="有再入住ICU计划的原因">
                            <el-input
                                    :ref="formFields[13]"
                                    size="mini"
                                    :disabled="isICU"
                                    v-model="form['baf711']"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <div style="margin-bottom: 10px">
            <el-button type="primary" size="mini" @click="handleAdd()">{{isdel ? '取消选择': '追加'}}</el-button>
        </div>
        <el-table
                :data="TutelageData"
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
                    prop="baf703name"
                    label="监护室类型及名称"
                    width="250">
            </el-table-column>
                <el-table-column label="格式（____年__月__日__时__分）">
                    <el-table-column
                            prop="jrsj_date"
                            label="进入时间"
                             >
                        <template slot-scope="scope">
                            {{scope.row.jrsj_date  }}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="tcsj_date"
                            label="退出时间"
                             >
                        <template slot-scope="scope">
                            {{scope.row.tcsj_date  }}
                        </template>
                    </el-table-column>
                </el-table-column>

            <el-table-column
                    prop="baf706"
                    label="人工气道脱出"
                    width="120">
                <template slot-scope="scope">
                    {{ scope.row['baf706'] === '1' ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="baf710"
                    label="有再入住计划"
                    width="120">
                <template slot-scope="scope">
                    {{ scope.row['baf710'] === '1' ? '无' : '有' }}
                </template>
            </el-table-column>
            <el-table-column
                    prop="baf719"
                    label="非预期重返"
                    width="120">
                    <template slot-scope="scope">
                    {{ scope.row['baf719'] === '1' ? '无' : '有' }}
                    </template>
            </el-table-column>
            <el-table-column
                    prop="baf712"
                    label="使用器械"
                    width="120">
                <template slot-scope="scope">
                {{ scope.row['baf712'] === '1' ? '无' : '有' }}
                </template>
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
    import { GetUpdateKeyDiagnosis } from "../../../api/dictionary";
    import { formatDate } from '../../../utils/index';
    export default {
        name: "tutelage-dialog", // 重症监护信息
        components: { DictInput },
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
            enterDate: { // 入院日期
                type: String,
                default: "",
                required: true
            },
            TutelageData: {
                type: Array,
                required: false
            },
            totalTime: {
                type: String,
                required: false
            },
            rysj: {
                type: String
            },
            cysj: {
                type: String
            }
        },
        data() {
            return {
                dict: {
                    dictType: undefined,
                    visible: false,
                    currentOpener: [],
                },
                tTime: this.totalTime,
                selectIndex: undefined,
                formFields: [
                    "baza00",
                    "baf702",
                    "baf703",
                    "jrsj_date",
                    "tcsj_date",
                    "baf706",
                    "baf712",
                    "baf719",
                    "baf720",
                    "baf710",
                    "baf711",
                ],
                formFieldsName: [
                    "病案号",
                    "进入监护室顺序号",
                    "监护室类型",
                    "进入日期",
                    "退出日期",
                    "发生人工气道脱出",
                    "有无使用器械",
                    "非预期的重返重症科",
                    "重返间隔时间",
                    "有无再入住计划",
                    "再入住ICU计划原因",
                ],
                form: {
                    "baza00": "",
                    "baf702": "", // 进入监护室顺序号
                    "jhsj_t": "",
                    "jhsj_s": "",
                    "jhsj_f": "",
                    "baf703": "", // 监护室类型代码
                    "baf703name": "", // 监护室类型名称
                    "jrsj_date": "",
                    "tcsj_date": "",
                    "baf706": "",  // 发生人工气道脱出
                    "baf712": "", // 有无使用器械
                    "baf719": "", // 非预期的重返重症科
                    "baf720": "", // 重返间隔时间
                    "baf710": "", // 有无再入住计划
                    "baf711": "",
                    "baf704": "" ,//进入时间
                    "baf705": "", //退出时间
                     "bazag6": "", // 监护总时间
                },
                tableData: [],
                options: [],
                inDate: this.rysj,
                outDate: this.cysj,
                pickerOptions: {
                    disabledDate(time) {
                        console.log(time, this.inDate, this.outDate);
                        return time.getTime() < this.inDate || time.getTime() > this.outDate;
                    },
                },
                // pickerOptions2: {
                //     disabledDate(time) {
                //         return time.getTime() < this.cysj;
                //     },
                // }
            };
        },
        computed: {
            isdel () {
                return this.selectIndex || this.selectIndex === 0
            },
            isICU () {
                if (this.form['baf710'] !== '2') {
                    this.$set(this.form, 'baf711', '');
                    return true;
                } else {
                    return false;
                }
            },
        },
        watch: {
            baza00(val) {
                console.log(this.TutelageData);
                this.form.baza00 = val;
            },
            rysj(val){
                this.inDate = val;
            },
            cysj(val) {
                this.outDate = val;
            },
            visible(val) {
              setTimeout(() => {
                  this.cancelRowClick();
              }, 100);
                if (this.TutelageData.length > 0) {
                    this.TutelageData.forEach((value, index, arr) => {
                        this.$set(this.TutelageData[index], 'jrsj_date', value['baf704'] );
                        this.$set(this.TutelageData[index], 'tcsj_date', value['baf705'] );
                        switch (this.TutelageData[index]['baf703']) {
                            case '01': this.TutelageData[index]['baf703name'] = 'CCU - 心脏监护室';break;
                            case '02': this.TutelageData[index]['baf703name'] =  'RICU - 呼吸监护室';break;
                            case '03': this.TutelageData[index]['baf703name'] =  'SICU - 外科监护室';break;
                            case '04': this.TutelageData[index]['baf703name'] =  'NICU - 新生儿监护室';break;
                            case '05': this.TutelageData[index]['baf703name'] =  'PICU - 儿科监护室';break;
                            case '06': this.TutelageData[index]['baf703name'] =  'RICU - EICU - 急诊重症监护室';break;
                            case '99': this.TutelageData[index]['baf703name'] =  '其他';break;
                        }
                    })
                }
            },
            "form.jrsj_date" : {
                handler: function (value)  {
                    this.calcEveryDays();
                }
            },

            "form.tcsj_date" : {
                handler: function (value) {
                    this.calcEveryDays();
                }
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

            handleDictInputSubmit(item) {
                console.log(item, this.dict);
                if (this.dict.currentOpener) {
                    this.form[this.dict.currentOpener[0]] = item.dm;
                    this.form[this.dict.currentOpener[1]] = item.dmmc;
                    const index = this.formFields.indexOf(this.dict.currentOpener[0]);
                    (index && index < 3) && this.handleFocus(index + 1);
                }
                console.log(this.form);
            },

            handleFocus(nextIndex) {
                this.$refs[this.formFields[nextIndex]].focus();
                this.$refs[this.formFields[nextIndex]].$el.click();
            },
            setICUname(ev) {
                console.log(ev);
                switch (ev) {
                    case '01': this.form['baf703name'] = 'CCU - 心脏监护室';break;
                    case '02': this.form['baf703name'] =  'RICU - 呼吸监护室';break;
                    case '03': this.form['baf703name'] =  'SICU - 外科监护室';break;
                    case '04': this.form['baf703name'] =  'NICU - 新生儿监护室';break;
                    case '05': this.form['baf703name'] =  'PICU - 儿科监护室';break;
                    case '06': this.form['baf703name'] =  'RICU - EICU - 急诊重症监护室';break;
                    case '99': this.form['baf703name'] =  '其他';break;
                }
            },

            handleAdd(row) {
                let error = false;
                // 验证完整
                console.log(this.selectIndex);
                if (this.selectIndex > -1) {

                    if (this.validateField(this.form)) {
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

                    // 有无再入住计划 是 无 就不用填写 有再入住ICU计划的原因
                    if (this.formFields[i] === 'baf711' && this.form['baf710'] === '1') {
                        break;
                    }
                    if (!val || !val.trim()) {
                        error = true;
                        this.$message.error(`请输入${this.formFieldsName[i]}`);
                        break;
                    }

                    if (this.formFields[i] === 'jrsj_date' ) {
                        console.log(val, this.inDate);
                        if ( val < this.inDate) {
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能小于入院日期【${this.inDate}】`);
                            break;
                        }
                        if ( val > this.outDate) {
                            console.log(val, this.outDate);
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能大于出院日期【${this.outDate}】`);
                            break;
                        }
                    }

                    if (this.formFields[i] === 'tcsj_date' ) {
                        if ( val < this.inDate) {
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能小于入院日期【${this.inDate}】`);
                            break;
                        }
                        if ( val > this.outDate) {
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能大于出院日期【${this.outDate}】`);
                            break;
                        }
                    }

                }

                // 验证时间先后

                let validate = this.calcEveryDays();

                if (!error && validate) {
                    console.log("good");
                    const TutelageData = this.TutelageData.slice();
                    TutelageData.push({
                        baf208: String(TutelageData.length + 1), // 序号
                        ...this.form,
                    });
                   // this.calcStayDays(TutelageData);
                    this.$emit("update:TutelageData", TutelageData);
                    this.handleReset();
                }
            },

            handleDel(index) {
                const TutelageData = this.TutelageData.slice();
                TutelageData.splice(index, 1);
                TutelageData.forEach((item, index) => {
                    item.baf208 = String(index + 1);
                });
                this.selectIndex = undefined;
                this.handleReset();
                this.$emit("update:TutelageData", TutelageData);
            },

            // 点击行
            rowClick(ev, row) {
                console.log(this.selectIndex, ev);
                if (this.selectIndex > -1 && this.selectIndex === ev.index) {
                    this.cancelRowClick();
                } else {
                    this.form = this.TutelageData[ev.index];
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
                    this.form = this.TutelageData[ev.index];
                    this.selectIndex = ev.index;
                    console.log(this.selectIndex);
                }
            },
            // 添加表格下标
            tableRowClassName ({row, rowIndex}) {
                row.index = rowIndex;
                console.log(rowIndex);
            },

            handleReset() {
                this.form = { baza00: this.baza00,  "jrsj_date": "", "tcsj_date": ""};
            },

            // 计算每次监护时间
            calcStayDays(TutelageData) {

                for(let index = 0; index < TutelageData.length; index++) {
                    const item = TutelageData[index];
                    const startDate = index === 0 ? this.enterDate : TutelageData[index - 1].changeDate;
                    const endDate = item.changeDate;
                    let days = Date.parse(endDate) - Date.parse(startDate);
                    days = Math.floor(days / (24 * 3600 * 1000));
                    item.stayDays = days
                }
                return !error
            },
            // 计算每次监护时间
            calcEveryDays() {
                let error = false;

                if (!this.form.jrsj_date  || !this.form.tcsj_date ) {
                    return error;
                }


                let startDate = this.form.jrsj_date ;
                let endDate = this.form.tcsj_date ;

                this.form['baf704'] = startDate;
                this.form['baf705'] = endDate;
                let start_date = new Date(startDate).getTime();
                let end_date = new Date(endDate).getTime();

                if (start_date > end_date) {

                    this.$message.error('进入时间不能大于退出时间');
                    this.form.tcsj_date = this.form.jrsj_date;
                    return error;
                }



                let dates = end_date - start_date;
                let days = Math.floor(dates/(24*3600*1000)); // 天数
                let leave1 = dates%(24*3600*1000) ;   //计算天数后剩余的毫秒数
                let hours = Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                let leave2= leave1 % (3600*1000);
                let minutes = Math.floor(leave2/(60*1000));

                this.form.jhsj_t = days.toString();
                this.form.jhsj_s = hours.toString();
                this.form.jhsj_f = minutes.toString();
                console.log(days, hours, minutes, this.form);
                return !error
            },
            getTotalTime () {
                let minutes = 0;
                let hours = 0;
                let days = 0;
                    this.TutelageData.forEach((value, index, arr) => {


                        let dates =  new Date(value['baf705']).getTime() - new Date(value['baf704']).getTime();
                        console.log(dates);
                        let d = Math.floor(dates/(24*3600*1000)); // 天数
                        let leave1 = dates%(24*3600*1000) ;   //计算天数后剩余的毫秒数
                        let h = Math.floor(leave1/(3600*1000));
                        //计算相差分钟数
                        let leave2= leave1 % (3600*1000);
                        let m = Math.floor(leave2/(60*1000));

                        minutes += Number(m);
                        hours += Number(h);
                        days += Number(d);
                    })
                console.log(minutes, hours, days);
                hours += Math.floor(minutes / 60); // 将分钟转化为小时并累加到小时内
                minutes = minutes % 60; // 分钟转化小时后还剩余的分钟
                days += Math.floor(hours / 24); // 将小时转化为天并累加到天内
                hours = hours % 24; // 小时转化为天之后还剩余的小时
                console.log(minutes, hours, days);
                this.tTime = `${days}:${hours}:${minutes}` ;
                this.$emit('update:totalTime', this.tTime);

            },
            tutelageTimeClash() {
                for (let value of this.TutelageData) {
                    let oldStartDate = new Date(value.jrsj_date ).getTime();
                    let oldEndDate = new Date(value.tcsj_date ).getTime();


                    for (let v of this.TutelageData) {
                        let startDate = new Date(v.jrsj_date ).getTime();
                        let endDate = new Date(v.tcsj_date ).getTime();

                        if ((startDate > oldStartDate && startDate < oldEndDate) || (endDate > oldStartDate && endDate < oldEndDate)) {
                            this.$message.error('监护时间有冲突，请修改后重新提交');
                            return false;
                        }
                    }



                }
                return true;
            },

            handleSubmit() {

                for (let value of this.TutelageData) {
                    if (this.validateField(value)) {
                        return true;
                    }
                }

                //判断监护时间是否有冲突
                if ( !this.tutelageTimeClash()) {
                    return false;
                }

                // 计算总监护时间
                this.getTotalTime();
                this.$emit("submit", this.TutelageData);
            },

            validateField (form) {
                let error = false;
                for (let i = 0; i < this.formFields.length; i++) {
                    const val = form[this.formFields[i]];
                    console.log(val, this.formFields[i]);

                    // 有无再入住计划 是 无 就不用填写 有再入住ICU计划的原因
                    if (this.formFields[i] === 'baf711' && form['baf710'] === '1') {
                        break;
                    }

                    if (!val || !val.toString().trim()) {
                        error = true;
                        this.$message.error(`请输入${this.formFieldsName[i]}`);
                        break;
                    }

                    if (this.formFields[i] === 'jrsj_date' ) {
                        console.log(val, this.inDate);
                        if ( val < this.inDate) {
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能小于入院日期【${this.inDate}】`);
                            break;
                        }
                        if ( val > this.outDate) {
                            console.log(val, this.outDate);
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能大于出院日期【${this.outDate}】`);
                            break;
                        }
                    }

                    if (this.formFields[i] === 'tcsj_date' ) {
                        if ( val < this.inDate) {
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能小于入院日期【${this.inDate}】`);
                            break;
                        }
                        if ( val > this.outDate) {
                            error = true;
                            this.$message.error(`${this.formFieldsName[i]}不能大于出院日期【${this.outDate}】`);
                            break;
                        }
                    }

                }




                    return error;

            },
            handleClose() {
                this.$emit("update:visible", false);
            }
        }
    };
</script>

<style scoped >
    .pathologic-dialog {
    }
    >>> .el-table th>.cell {
        text-align: center;
    }
</style>


<template>
    <div class="contentBox translate3d-zero">
        <div class="grey_box_top" style="clear:both">
            <div class="grey_box_bottom">
                <div class="searchBar">
                    从
                    <div class="select ie9-select">
                        <el-date-picker v-model="value1" :editable="false" :clearable="false" type="date" :picker-options="pickerOptions" class="myDate datePicker"></el-date-picker> 
                    </div>
                    到
                    <div class="select ie9-select">
                        <el-date-picker v-model="value2" :editable="false" :clearable="false" type="date" :picker-options="pickerOptions1" class="myDate datePicker"></el-date-picker>
                    </div>
                    状态:
                    <div class="select ie9-select">
                        <el-select v-model="value3" :placeholder="placeholder">
                            <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </div>
                    <div class="chaxun-stl" @click.stop="search"></div>
                </div>
                <div ref="scrollContent" class="listContent h-330">
                    <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr class="content-top-style">
                                <th>申请时间</th>
                                <th>分红比例</th>
                                <th>申请理由说明</th>
                                <th>审核状态</th>
                                <th>原因说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tabList" >
                                <td><div v-text="item.addTime"></div></td>
                                <td><div></div>{{item.currentRate}}% -> {{item.newRate}}%</td>
                                <td><div v-text="item.remark"></div></td>
                                <td>
                                    <span v-if="item.status ==0" >待审核</span>
                                    <span v-if="item.status ==1" >审核通过</span>
                                    <span v-if="item.status ==2" >审核不通过</span>
                                </td>
                                <td><div v-text="item.auditDesc"></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { datePick,errorMsg,formatDate }from '../../tools/command'
    import jquery from 'jquery'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    export default {
        data () {
            return {
                show: true,
                value1: '',
                value2: '',
                value3: '',
                placeholder: '待审核',
                options: [{
                    value: '0',
                    label: '待审核'
                }, {
                    value: '1',
                    label: '审核通过'
                }, {
                    value: '2',
                    label: '审核不通过'
                }],
                tabList: [],
                form: {
                    bDate : '',
                    eDate : '',
                    status : 0,
                    userId : '',
                },
            }
        },
        computed : {
            pickerOptions(){
                var that = this
                return {
                  disabledDate(time) {
                    if(time && that.value2) {
                        return formatDate(time) > formatDate(that.value2)
                    }
                  }
                }
            },
            pickerOptions1(){
                var that = this
                return {
                  disabledDate(time) {
                    if(time && that.value1){
                        return formatDate(time) <  formatDate(that.value1)
                    } 
                  }
                }
            }
        },
        mounted :function(){
            jquery(this.$refs.scrollContent).mCustomScrollbar()
            var now = new Date()
            this.value1 = new Date(now.getTime() - 86400000 * 6)
            this.value2 = now
            this.value3 = '0'
            this.search()
        },
        methods : {
            search() {
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                this.form.userId = this.$store.state.useraction.teamDividendAgent
                this.form.status = this.value3;
                api.ajax('team/dividendAgent/listApplication',this.form).then(data =>{
                    this.show = false;
                    this.tabList = data.data;
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
        }
    }
</script>
<style scoped>
    .contentBox {
        width: 700px;
        font-size: 12px;
        height: 370px;
    }
    .datePicker {
        width: 120px;
    }
    .searchBar {
        width: 690px;
        height: 30px;
        padding: 0 0 8px 10px;
        line-height: 31px;
        position: relative;
    }
    .scroll {
        overflow-y: scroll;
        overflow-x: hidden; 
        height: 351px;
    }
    #thetable {
        width: 700px;
    }  

    #thetable thead tr {
        background-image: url('../../images/imgJianBian02.png');
    }

    .btnGreen3 {
        width: 75px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }

    .chaxun-stl {
        background-image: url('../../images/btnChangXun01.png');
        background-repeat: no-repeat;
        display: inline-block;
        width: 70px;
        height: 35px;
        vertical-align: middle;
    }
    .chaxun-stl:hover {
        background-image: url('../../images/btnChangXun02.png');
        background-repeat: no-repeat;
    }

    .listContent div span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: normal;
        white-space: nowrap;
        text-align: center;
    }
    .listContent-div-first {
        width: 700px;
        background-image: url('../../images/imgJianBian02.png');
    }
    .listContent-div-first span {
        border-right: solid 1px #e1e1eb;
    }
   .content-bot-style {
        border-bottom: solid 1px #e1e1eb;
    }

    .content-top-style {
        border-top: solid 1px #e1e1eb;
    }

    .h-330 {
        height: 330px;
    }

</style>
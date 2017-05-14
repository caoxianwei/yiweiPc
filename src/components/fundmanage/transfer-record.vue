<template>
    <div class="recordContent dialogContent translate3d-zero">
        <div class="searchBar">
        时间:从
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value1" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions" class="myDate wid125 datePicker"></el-date-picker>
        </div>
        到
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value2" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions1" class="myDate wid125 datePicker"></el-date-picker>
        </div>
        <div class="chaxun-stl" @click.stop="searchRecord('first')"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>订单号</th>
                        <th>类型</th>
                        <th>转换金额</th>
                        <th>转账时间</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.list">
                        <td><span v-text="item.id"></span></td>
                        <td>
                            <span v-text="item.typeDesc"></span>
                        </td>
                        <td>
                            <span v-text="item.changeMoney"></span>
                        </td>
                        <td>
                            <span v-text="item.addTime"></span>
                        </td>
                        <td>
                            <span v-text="item.remark"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page clearfix">
            <div class="page_mid">
                <span class="pageTotal">每页15条，共{{data.totalRow}}条</span>
                <a href="javascript:void(0)" class="first" @click.stop="searchRecord('first')">首页</a>
                <a href="javascript:void(0)" class="pre" @click.stop="searchRecord('pre')">上一页</a>
                <input type="text" name="" disabled="disabled" :value="curPage">
                <a href="javascript:void(0)" class="last" @click.stop="searchRecord('nxt')">下一页</a>
                <a href="javascript:void(0)" class="nxt" @click.stop="searchRecord('last')">尾页</a>
                <div class="skipPage">跳转到第
                <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                    <el-option v-for="item in data.totalPage" :key="item.name" :value="item">{{item}}</el-option>
                </el-select>
                页</div>
            </div>
        </div>
    </div>   
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import lotteryConstants from '../record/lottery-constants'
    import { datePick,exchange,succMsg,errorMsg,formatDate }from '../../tools/command'
    export default {
        name: "transfer-record",
        data(){
            return {
                value1 : '',
                value2 : '',
                optType: '',
                userName: '',
                game  : '',
                form : {
                    bDate : '',
                    eDate : '',
                    pageNumber: 1,
                    pageSize: 15,
                },
                show: true,
                currentPage : 1,
                data : {},
            }
        },
        mounted () {
            var now = new Date()
            this.value1 = new Date(now.getTime() - 86400000 * 6)
            this.value2 = now
            this.searchRecord('first')
        },
        beforeDestroy () {

        },
        computed :{
            curPage(){
                this.currentPage = this.data.pageNumber
                return this.data.pageNumber + "/" + this.data.totalPage
            },
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
        watch : {
            "currentPage" : function(val){
                if(val == this.data.pageNumber){
                    return
                } else {
                    this.searchRecord(val)
                }
            }
        },
        methods :{
            ...mapActions({
                setFirstView : 'setFirstView',
                setTeamReportPerson : 'setTeamReportPerson',
            }),
            async searchRecord(param){
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                if(param == 'first'){
                    param = 1
                } else if(param == 'pre'){
                    if(this.data.pageNumber > 1){
                        param = this.data.pageNumber - 1
                    } else {
                        param = 1
                    }
                } else if(param == 'nxt'){
                   if(this.data.pageNumber < this.data.totalPage){
                        param = this.data.pageNumber + 1
                   } else {
                        param = this.data.pageNumber
                   }
                } else if(param == 'last'){
                    param = this.data.totalPage
                }

                this.form.pageNumber = param
                this.form.pageSize = 15

                var data = await api.ajax('user/money/pageTransferList', this.form)
                if(data && data.code == '0'){
                    this.data = data.data
                } else {
                    errorMsg(data.msg)
                }
            }
        }
    }
    
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        border-bottom-right-radius: 10px;
    }
    .searchBar {
        height: 45px;
        line-height: 45px;
        padding-left: 17px;
        font-size: 14px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
    }
    .listContent {
        height: 576px;
    }
    #thetable thead tr {
        background-image: url('../../images/imgJianBian02.png');
    }
    #thetable tr td {
        width: 99px;
    }
    .page {
        font-size: 12px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
        padding: 8px 10px 0 10px;
    }
    .pageTotal {
        float: left;
        line-height: 22px;
    }
     .page_mid {
        width: 100%;
        margin-top: 10;
        text-align: center;
    }
    .page .page_mid a {
        width: 22px;
        height: 22px;
        line-height: 22px;
        margin: 0 4px;
        display: inline-block;
        vertical-align: top;
        font-size: 0;
        background: url(../../images/page.png) 0 0 no-repeat;
    }
    .page .page_mid a.first {
        background-position: 0 0;
    }
    .page .page_mid a.first:hover {
        background-position: 0 -22px;
    }
    .page .page_mid a.pre {
        background-position: -22px 0;
    }
    .page .page_mid a.pre:hover {
        background-position: -22px -22px;
    }
    .page .page_mid a.last {
        background-position: -44px 0;
    }
    .page .page_mid a.last:hover {
        background-position: -44px -22px;
    }
    .page .page_mid a.nxt {
        background-position: -66px 0;
    }
    .page .page_mid a.nxt:hover {
        background-position: -66px -22px;
    }
    .page .page_mid input {
        width: 70px;
        height: 20px;
        line-height: 20px;
        margin: 0 4px;
        text-align: center;
        border: solid 1px #ccc;
        background: #fff;
    }
    .skipPage {
        float: right;
        margin-right: 149px;
    }
    .colorRed {
        color: #ff4200;
    }
    .chaxun-stl {
        background-image: url('../../images/btnChangXun01.png');
        background-repeat: no-repeat;
        display: inline-block;
        width: 70px;
        height: 33px;
        vertical-align: middle;
    }
    .chaxun-stl:hover {
        background-image: url('../../images/btnChangXun02.png');
        background-repeat: no-repeat;
    }
    .follow-content {
        width: 110px;
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        text-align: center;
    }
    .follow-id {
       height: 24px;
       border-radius: 4px;
       padding-left: 10px;
       border: 1px solid #bfcbd9;
    }

    .wid105 {
        width: 105px;
    }

    .opts {
        display: inline-block;
        width: 45px;
        height: 22px;
        line-height: 22px;
        text-decoration: none !important;
        background-color: #cccfd7;
        border-radius: 5px;
        color: #ff4200;
    }
    .wid60 {
        width: 60px;
    }
</style>
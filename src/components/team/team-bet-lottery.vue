<template>
    <div class="recordContent">
        <div class="searchBar">
        从
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value1" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions" class="myDate wid125 datePicker"></el-date-picker> 
        </div>
        到
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value2" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions1" class="myDate wid125 datePicker"></el-date-picker>
        </div>
        彩票名称: 
        <div class="select ie9-select wid135">
            <el-select v-model="optType" class="wid135 translate3d-zero">
                <el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        期号: <input type="text" class="wid96 follow-id" v-model="numTitle" maxlength="20"></input>
        用户名: <input type="text" class="wid96 follow-id" v-model="userName" maxlength="20"></input>
        <div class="chaxun-stl" @click.stop="searchFollowRecord('first')"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>用户名</th>
                        <th>订单号</th>
                        <th>彩票名称</th>
                        <th>玩法</th>
                        <th>下单时间</th>
                        <th>期号</th>
                        <th>投注内容</th>
                        <th>总额</th>
                        <th>倍数</th>
                        <th>模式</th>
                        <th>状态</th>
                        <th>开奖号码</th>
                        <th>盈亏</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in followData.list">
                        <td><span v-text="item.username"></span></td>
                            <td><span v-text="item.id"></span></td>
                            <td><span v-text="item.className"></span></td>
                            <td><span v-text="item.typeName"></span></td>
                            <td><span v-text="item.addTime"></span></td>
                            <td><span v-text="item.numTitle"></span></td>
                            <td>
                                <div style="width:80px" v-show="item.typeName =='前二大小单双'" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                                <div style="width:80px" v-show="item.typeName =='后二大小单双'" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                                <div style="width:80px" v-show="item.typeName =='特码大小单双'" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                                <div style="width:80px" v-show="item.typeName !='前二大小单双' && item.typeName !='特码大小单双'  && item.typeName !='后二大小单双'" v-text="item.orderValue" :title="item.orderValue"></div>
                            </td>
                            <td><div style="width:50px" v-text="item.amount" :title="item.amount"></div></td>
                            <td><span v-text="item.multiple"></span></td>
                            <td>
                                <span v-show="item.singleMoney >= 1">元</span>
                                <span v-show="item.singleMoney == 0.2">角</span>
                                <span v-show="item.singleMoney == 0.02">分</span>
                            </td>
                            <td>
                                <span v-show="item.bingoFlag == 0" class="isBingoRed">未开奖</span>
                                <span v-show="item.bingoFlag == 1" class="isBingoRed">已中奖</span>
                                <span v-show="item.bingoFlag == 2" class="isBingoGreen">未中奖</span>
                                <span v-show="item.bingoFlag == 3" class="isBingoRed">中奖停追</span>
                                <span v-show="item.bingoFlag == 4" class="isBingoGrey">已撤单</span>
                            </td>
                            <td><div style="width:80px" v-text="item.openNum" :title="item.openNum"></div></td>
                            <td>
                                <div style="width:50px" v-show="item.resultMoney ==0" :title="0" class="numRed wid40">0</div>  
                                <div style="width:50px" v-show="item.resultMoney > 0" v-text="item.resultMoney" :title="item.resultMoney" class="numRed wid40"></div>
                                <div style="width:50px" v-show="item.resultMoney < 0" v-text="item.resultMoney" :title="item.resultMoney" class="numGreen wid40"></div>
                            </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page clearfix">
            <div class="page_mid">
                <span class="pageTotal">每页15条，共{{followData.totalRow}}条</span>
                <a href="javascript:void(0)" class="first" @click.stop="searchFollowRecord('first')">首页</a>
                <a href="javascript:void(0)" class="pre" @click.stop="searchFollowRecord('pre')">上一页</a>
                <input type="text" name="" disabled="disabled" :value="curPage">
                <a href="javascript:void(0)" class="last" @click.stop="searchFollowRecord('nxt')">下一页</a>
                <a href="javascript:void(0)" class="nxt" @click.stop="searchFollowRecord('last')">尾页</a>
                <div class="skipPage">跳转到第
                <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                    <el-option v-for="item in followData.totalPage" :key="item.name" :value="item">{{item}}</el-option>
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
        name: "teamLotteryChange",
        components : {

        },
        data(){
            return {
                value1 : '',
                value2 : '',
                optType: '-1',
                numTitle: '',
                userName: '',
                form : {
                    bDate : '',
                    eDate : '',
                    operaType: '',
                    pageNumber: 1,
                    pageSize: 10,
                },
                options: [],
                show: true,
                followData: {},
                currentPage : 1,
                checked: true,
            }
        },
        mounted () {
            this.options.push(...lotteryConstants.lotterylist)
            const teamReportPerson = this.$store.state.useraction.teamReportPerson
            if(teamReportPerson){
                const arr = teamReportPerson.split('_')
                this.userName = arr[0]
                if(arr[1] == 'p'){
                    this.checked = false
                }
            }
            var now = new Date()
            this.value1 = new Date(now.getTime() - 86400000 * 6)
            this.value2 = now
            this.searchFollowRecord('first')
        },
        beforeDestroy () {

        },
        computed :{
            curPage(){
                this.currentPage = this.followData.pageNumber
                return this.followData.pageNumber + "/" + this.followData.totalPage
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
                if(val == this.followData.pageNumber){
                    return
                } else {
                    this.searchFollowRecord(val)
                }
            }
        },
        methods :{
            ...mapActions({
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView'
            }),
            async searchFollowRecord(param){
                var date = datePick(this.value1,this.value2);
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                if(param == 'first'){
                    param = 1
                } else if(param == 'pre'){
                    if(this.followData.pageNumber > 1){
                        param = this.followData.pageNumber - 1
                    } else {
                        param = 1
                    }
                } else if(param == 'nxt'){
                   if(this.followData.pageNumber < this.followData.totalPage){
                        param = this.followData.pageNumber + 1
                   } else {
                        param = this.followData.pageNumber
                   }
                } else if(param == 'last'){
                    param = this.followData.totalPage
                }

                this.form.operaType = this.optType
                this.form.numTitle = this.numTitle
                this.form.username = this.userName
                this.form.pageNumber = param
                this.form.pageSize = 15
                var followData = await api.ajax('team/pageTeamLotteryBet', this.form)
                if(followData && followData.code == '0'){
                    this.followData = followData.data
                } else {
                    errorMsg(followData.msg)
                }
            },
            filter (val) {
                return exchange(val)
            },
        }
    }
    
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        height: 684px;
        border-bottom-right-radius: 10px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    .searchBar {
        height: 45px;
        line-height: 45px;
        padding-left: 10px;
        font-size: 14px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
    }
    .listContent {
        height: 530px;
    }
    #thetable thead tr {
        background-image: url('../../images/imgJianBian02.png');
    }
    #thetable tr td {
        width: 99px;
    }
    #thetable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        height: 35px;
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
    .wid60 {
        width: 60px;
    }
</style>
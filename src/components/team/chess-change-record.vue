<template>
    <div class="recordContent">
        <div class="searchBar">
        时间:从
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value1" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions" class="myDate wid125 datePicker"></el-date-picker> 
        </div>
        到
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value2" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions1" class="myDate wid125 datePicker"></el-date-picker>
        </div>
        游戏:
        <div class="select ie9-select wid110">
            <el-select v-model="game" class="wid110">
                <el-option v-for="item in games" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
        </div>
        操作类型: 
        <div class="select ie9-select wid110">
            <el-select v-model="optType" class="wid110 translate3d-zero">
                <el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        玩家账号: <input class="wid96 follow-id" v-model="userName" maxlength="20"></input>
        <div class="chaxun-stl" @click.stop="searchFollowRecord('first')"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>玩家ID</th>
                        <th>帐号</th>
                        <th>游戏名称</th>
                        <th>变账前余额</th>
                        <th>账户余额</th>
                        <th>变化</th>
                        <th>类型</th>
                        <th>结束时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in followData.list">
                        <td><span v-text="item.userId"></span></td>
                        <td><span v-text="item.username"></span></td>
                        <td><span v-text="item.gameName"></span></td>
                        <td><div style="width:98px" v-text="item.coinB" :title="item.coinB"></div></td>
                        <td><div style="width:98px" v-text="item.coinA" :title="item.coinA"></div></td>
                        <td><div style="width:98px" v-text="item.changeCoin" :title="item.changeCoin"></div></td>
                        <td><span v-text="item.typeDesc"></span></td>
                        <td><span v-text="item.addTime"></span></td>
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
        name: "teamChessChange",
        data(){
            return {
                value1 : '',
                value2 : '',
                optType: '-1',
                userName: '',
                game  : '-1',
                form : {
                    bDate : '',
                    eDate : '',
                    pageNumber: 1,
                    pageSize: 15,
                },
                options: [],
                show: true,
                followData: {},
                currentPage : 1,
                checked: true,
                games : [{
                    value: '-1',
                    label: '全部'
                }],
            }
        },
        mounted () {
            this.userName = this.$store.state.useraction.teamReportPerson
            this.options.push(...lotteryConstants.chessTypeList)
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
            this.getCanPLayGames()
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
                this.form.username = this.userName
                this.form.pageNumber = param
                this.form.pageSize = 15
                this.form.gameId = this.game
                var followData = await api.ajax('team/pageTeamCoinChange', this.form)
                if(followData && followData.code == '0'){
                    this.followData = followData.data
                } else {
                    errorMsg(followData.msg)
                }
            },
            async getCanPLayGames(){
                var data = await api.ajax('listCodeData', {code : "game"})
                if(data && data.code == '0'){
                    this.games.push(...data.data)
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
        height: 684px;
        border-bottom-right-radius: 10px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
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
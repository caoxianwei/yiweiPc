<template>
    <div class="recordContent dialogContent">
        <div class="searchBar">
        时间:从
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value1" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions" class="myDate wid120 datePicker"></el-date-picker> 
        </div>
        到
        <div class="select ie9-select wid120">
            <el-date-picker v-model="value2" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions1" class="myDate wid120 datePicker"></el-date-picker>
        </div>
        排序内容:
        <div class="select ie9-select wid110">
            <el-select v-model="orderBy" class="wid110" :placeholder="placeholder1">
                <el-option v-for="item in options1" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
        </div>
        排序升降: 
        <div class="select ie9-select wid88">
            <el-select v-model="order" class="wid88 translate3d-zero" :placeholder="placeholder2">
                <el-option v-for="item in options2" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        用户名: <input class="wid96 follow-id" v-model="userName" maxlength="20"></input>
        <div class="chaxun-stl" @click.stop="searchFollowRecord('first')"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                       <th>用户名</th>
                        <th>充值</th>
                        <th>取款</th>
                        <th>彩票投注</th>
                        <th>彩票返点</th>
                        <th>棋牌返点</th>
                        <th>佣金</th>
                        <th>彩票盈亏</th>
                        <th>棋牌盈亏</th>
                        <th>真人盈亏</th>
                        <th>总盈亏</th>
                        <th>变帐明细</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in followData.list">
                        <td><span v-text="item.username"></span></td>
                        <td>
                            <div v-text="item.cz" :title="item.cz" class="wid84"></div>
                        </td>
                        <td>
                            <div v-text="item.qk" :title="item.qk" class="wid84"></div>
                        </td>
                        <td>
                            <div v-text="item.realTz" :title="item.realTz" class="wid84"></div>
                        </td>
                        <td>
                            <div :title="item.pointMoney | calcSum(item.pointMoneyAgent)" class="wid84">{{item.pointMoney | calcSum(item.pointMoneyAgent)}}</div>
                        </td>
                        <td>
                            <div v-text="item.gamePointMoney" :title="item.gamePointMoney" class="wid84"></div>
                        </td>
                        <td>
                            <div v-text="item.yj" :title="item.yj" class="wid84"></div>
                        </td>
                        <td>
                            <div v-text="item.cpyk" :title="item.cpyk" class="wid84" :class="item.cpyk | calcSumColor"></div>
                        </td>
                        <td>
                            <div v-text="item.qpyk" :title="item.qpyk" class="wid84" :class="item.qpyk | calcSumColor"></div>
                        </td>
                        <td>
                            <div v-text="item.zryk" :title="item.zryk" class="wid84" :class="item.zryk | calcSumColor"></div>
                        </td>
                        <td>
                            <div :title="item.cpyk | calcSum(item.qpyk, item.zryk)" class="wid84" :class="item.cpyk | calcSumColor(item.qpyk, item.zryk)">
                                {{item.cpyk | calcSum(item.qpyk, item.zryk)}}
                            </div>
                        </td>
                        <td><a class="opts" @click.stop="personTeamAccount(item.username,'p')">个人</a> <a class="opts" @click.stop="personTeamAccount(item.username,'t')">团队</a></td>
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
                optType: '',
                userName: '',
                game  : '',
                form : {
                    bDate : '',
                    eDate : '',
                    pageNumber: 1,
                    pageSize: 15,
                },
                placeholder1 : '投注',
                options1: [{
                    value: 'cz',
                    label: '充值'
                }, {
                    value: 'qk',
                    label: '取款'
                }, {
                    value: 'realTz',
                    label: '投注'
                }, {
                    value: 'cpyk',
                    label: '彩票盈亏'
                }, {
                    value: 'qpyk',
                    label: '棋牌盈亏'
                }],
                placeholder2: '降序',
                options2: [{
                  value: 'desc',
                    label: '降序'
                }, {
                  value: 'asc',
                    label: '升序'
                }],
                show: true,
                currentPage : 1,
                followData : {},
                orderBy : 'cz',
                order : 'desc'
            }
        },
        mounted () {
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
                setFirstView : 'setFirstView',
                setTeamReportPerson : 'setTeamReportPerson',
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

                this.form.username = this.userName
                this.form.pageNumber = param
                this.form.pageSize = 15
                this.form.orderBy = this.orderBy
                this.form.order = this.order

                var followData = await api.ajax('team/pageTeamReport', this.form)
                if(followData && followData.code == '0'){
                    this.followData = followData.data
                } else {
                    errorMsg(followData.msg)
                }
            },
            personTeamAccount(userName, type){
                this.setTeamReportPerson(userName+'_'+type)
                this.setFirstView("team-change")
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
    #thetable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .wid84 {
        width: 84px;
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
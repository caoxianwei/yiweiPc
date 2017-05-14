<template>
    <div class="recordContent">
        <div class="searchBar">
        总代帐号: <input class="wid120 follow-id" v-model="userName" maxlength="20"></input>
        <div class="chaxun-stl" @click.stop="searchRecord('first')"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>总代ID</th>
                        <th>总代帐号</th>
                        <th>分红级别</th>
                        <th>分红比例</th>
                        <th>生效时间</th>
                        <th>上月平均日量</th>
                        <th>分红余额</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.list">
                        <td><span v-text="item.userId"></span></td>
                            <td><span v-text="item.username"></span></td>
                            <td><span v-text="item.agentLevel"></span>级</td>
                            <td><span v-text="item.rate"></span>%</td>
                            <td><span v-text="item.effectiveDate"></span></td>
                            <td><span v-text="item.pjRealTz"></span></td>
                            <td><div v-text="item.balance" :title="item.balance" class="wid100"></div></td>
                            <td>
                                <span v-if="!item.isDisabled">正常</span>
                                <span v-if="item.isDisabled">禁用</span>
                            </td>
                            <td>
                                <a v-if="item.userId != loginUser" class="opts" @click.stop="operate(item.userId,item.agentLevel,item.rate)">操作</a>
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
        <div>
            <el-dialog custom-class="dialog-team-dividend-data ie9-top20" :title="title" v-model="dialogTableVisible" :close-on-click-modal="false" :close-on-press-escape="false" @open="openHandle" @close="closeHandle" :modal="false">
                <team-dividend-members-actions v-if="dialogTableVisible"></team-dividend-members-actions>
            </el-dialog>
        </div>
    </div>   
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import { succMsg,errorMsg }from '../../tools/command'
    import teamDividendMembersActions from './team-dividend-members-actions'
    export default {
        name: "team-dividend-members",
        data(){
            return {
                userName : '',
                form : {
                    pageNumber: 1,
                    pageSize: 15,
                },
                show : true,
                data : {},
                dialogTableVisible : false,
                pdata : {},
                title : '用户操作',
            }
        },
        components : {
            teamDividendMembersActions
        },
        mounted () {
            this.searchRecord('first')
        },
        beforeDestroy () {

        },
        computed :{
            curPage(){
                this.currentPage = this.data.pageNumber
                return this.data.pageNumber + "/" + this.data.totalPage
            },
            loginUser(){
                return this.$store.state.useraction.userInfo.id
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
                setTeamDividendAgent : 'setTeamDividendAgent',
            }),
            async searchRecord(param){
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

                this.form.username = this.userName
                this.form.pageNumber = param
                this.form.pageSize = 15

                var data = await api.ajax('team/dividend/pageMemberList', this.form)
                if(data && data.code == '0'){
                    this.data = data.data
                } else {
                    errorMsg(data.msg)
                }
            },
            personTeamAccount(userName, type){
                this.setTeamReportPerson(userName+'_'+type)
                this.setFirstView("team-change")
            },
            operate(userId, agentLevel, rate){
                this.setTeamDividendAgent(userId)
                this.dialogTableVisible = true
            },
            openHandle(){
                console.log("openHandle")
            },
            closeHandle(){
                console.log("closeHandle")
            }
        }
    }
    
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        border-bottom-right-radius: 10px;
        height: 684px;
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
        height: 540px;
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
    .wid100 {
        width: 100px;
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

    .wid105 {
        width: 105px;
    }

    .opts {
        display: inline-block;
        width: 50px;
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
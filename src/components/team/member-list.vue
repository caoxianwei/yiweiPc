<template>
    <div class="dialogContent">
    <div class="recordContent">
        <div class="searchBar">
        用户名: <input class="wid80 follow-id" v-model="txtUsername" maxlength="20"></input>
        用户ID: <input class="wid80 follow-id" v-model="txtUserId" maxlength="20"></input>
        <el-checkbox v-model="checked">在线会员</el-checkbox>
        余额: 
        <div class="select ie9-select">
            <el-select v-model="balance" class="wid105 translate3d-zero">
                <el-option v-for="item in balances" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        列表排序: 
        <div class="select ie9-select">
            <el-select v-model="sort" class="wid117 translate3d-zero">
                <el-option v-for="item in sortlist" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        <div class="chaxun-stl" @click.stop="searchMember('first')"></div>
        </div>
        <div class="thetableTit">
            <div>
                <a @click.stop="refresh">
                    <strong>{{username}}({{userid}})</strong>
                </a> > 
                <strong>{{showName}}</strong>
            </div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>用户名(ID)</th>
                        <th>类型</th>
                        <th>返点</th>
                        <th>余额</th>
                        <th>团队余额</th>
                        <th>下级人数</th>
                        <th>用户QQ</th>
                        <th>状态</th>
                        <th>在线</th>
                        <th>注册时间</th>
                        <th>最后登入</th>
                        <th>团队数据</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data.list">
                        <td>
                            <a @click.stop="checkoutsub(item.username,item.id)">{{item.username}}({{item.id}})</a>
                        </td>
                        <td>
                            <span v-if="item.dividendAgent == null">代理</span>
                            <span v-if="item.dividendAgent != null">分红代理</span>
                        </td>
                        <td><span v-text="item.point"></span></td>
                        <td>
                            <div class="numFixed" v-text="item.balance" :title="item.balance"></div>
                        </td>
                        <td>
                            <div class="numFixed" v-text="item.teamBalance" :title="item.teamBalance"></div>
                        </td>
                        <td><span v-text="item.teamCount-1"></span></td>
                        <td><span v-text="item.qq"></span></td>
                        <td>
                            <span v-if="item.isDisabled == '0'" >正常</span>
                            <span v-else >禁用</span>
                        </td>
                        <td>   
                            <img v-if="item.isOnline == true" src="../../images/onLine.png">
                            <img v-if="item.isOnline == false" src="../../images/offLine.png">
                        </td>
                        <td><span v-text="item.addTime"></span></td>
                        <td><span v-text="item.lastLoginTimeStr"></span></td>
                        <td><a class="opts" @click.stop="check(item.id)">查看</a></td>
                        <td><a class="opts" @click.stop="openDialog(item.id,item.isDirectAgent,item.agentLevel)">编辑</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page clearfix">
            <div class="page_mid">
                <span class="pageTotal">每页15条，共{{data.totalRow}}条</span>
                <a href="javascript:void(0)" class="first" @click.stop="searchMember('first')">首页</a>
                <a href="javascript:void(0)" class="pre" @click.stop="searchMember('pre')">上一页</a>
                <input type="text" name="" disabled="disabled" :value="curPage">
                <a href="javascript:void(0)" class="last" @click.stop="searchMember('nxt')">下一页</a>
                <a href="javascript:void(0)" class="nxt" @click.stop="searchMember('last')">尾页</a>
                <div class="skipPage"><span>跳转到第</span>
                <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                    <el-option v-for="item in data.totalPage" :value="item" :label="item.label" :key="item.name">{{item}}</el-option>
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
    </div>  
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import { succMsg,errorMsg }from '../../tools/command'
    import lotteryConstants from '../record/lottery-constants'
    import teamDividendMembersActions from './team-dividend-members-actions'
    export default {
        name: "team-dividend-members",
        data(){
            return {
                txtUsername : '',
                txtUserId: '',
                form : {
                    pageNumber: 1,
                    pageSize: 15,
                },
                showName : '',
                data : {},
                tips: '点击查看下级用户列表',
                dialogTableVisible : false,
                pdata : {},
                title : '用户操作',
                balance : '-1',
                sort : 'addTime',
                balances : [],
                sortlist : [],
                checked : false,
            }
        },
        components : {
            teamDividendMembersActions
        },
        mounted () {
            this.searchMember('first')
            this.balances.push(...lotteryConstants.balanceList)
            this.sortlist.push(...lotteryConstants.sortList)
        },
        beforeDestroy () {

        },
        computed :{
            curPage(){
                this.currentPage = this.data.pageNumber
                return this.data.pageNumber + "/" + this.data.totalPage
            },
            userid(){
                return this.$store.state.useraction.userInfo.id
            },
            username () {
                return this.$store.state.useraction.userInfo.username
            }
        },
        watch : {
            "currentPage" : function(val){
                if(val == this.data.pageNumber){
                    return
                } else {
                    this.searchMember(val)
                }
            }
        },
        methods :{
            ...mapActions({
                setFirstView : 'setFirstView',
                setFlowrecordView : 'setFlowrecordView',
                setTeamDividendAgent : 'setTeamDividendAgent',
                setMemberListId : 'setMemberListId',
            }),
            async searchMember(param){
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
                this.form.hasmoney = this.balance;
                this.form.orderby = this.sort;
                this.form.username = this.txtUsername;
                this.form.userId = this.txtUserId;
                this.form.pageNumber = param
                this.form.pageSize = 15
                this.form.isOnline = this.checked ? true : false
                var data = await api.ajax('team/member/pageUserList', this.form)
                if(data && data.code == '0'){
                    this.data = data.data
                } else {
                    errorMsg(data.msg)
                }
            },
            refresh() {
                this.form.agentId = ''
                this.showName = ''
                this.searchMember('first')
            },
            checkoutsub (username,userId) {
                this.showName = username + '(' + userId + ')'
                this.form.agentId = userId + ''
                this.searchMember('first')
            },
            check (userId) {
                this.setMemberListId(userId+'')
                this.setFirstView('team-data')
                this.setFlowrecordView('team-data-msg')
            },
            openDialog(userId, agentLevel, rate){
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
        height: 730px;
        border-top-right-radius: 10px;
    }
    .searchBar {
        height: 45px;
        line-height: 45px;
        padding-left: 17px;
        font-size: 14px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
        border-top-right-radius: 10px;
    }
    .wid80 {
        width: 80px;
    }
    .wid105 {
        width: 105px;
    }
    .wid117 {
        width: 117px;
    }
    .thetableTit {
        height: 28px;
        line-height: 28px;
        padding: 0 10px;
        border-bottom: solid 2px #ccc;
        background: url('../../images/thBg.png') 0 0 repeat-x;
    }
    .thetableTit a {
        color: #ff4200;
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
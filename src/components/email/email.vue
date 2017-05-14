<template>
    <div class="dialog">
        <div class="listContent">
            <div class="listData">
                <div class="grey_box_foothd">
                    <table id="theTable" width="100%" border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th style="border-top-left-radius:10px;">
                                    <input name="" type="checkbox" @click.stop="checkAll" value="" id="all_mail" class="" style="margin-top:6px">
                                </th>
                                <th><img src="../../images/xin1.gif" class="m-t-3"></th>
                                <th>发件人</th>
                                <th>主题</th>
                                <th>时间</th>
                            </tr>
                        </thead>
                        <tbody class="tbody">
                            <tr v-for="item in msgListData.list">
                                <td style="width: 40px;">
                                    <input name="" type="checkbox" value="" class="each_mail" style="margin-top:6px">
                                </td>
                                <td style="width: 60px;" @click.stop="openEmail(item.id,item.isRead)">
                                    <img class="m-t-3" v-if="item.isRead ==1" src="../../images/xin3.gif">
                                    <img class="m-t-3" v-else src="../../images/xin2.gif">
                                </td>
                                <td @click.stop="openEmail(item.id,item.isRead)">{{item.senderName}}</td>
                                <td @click.stop="openEmail(item.id,item.isRead)">
                                    <div class="wid130">
                                        <a class="emaila" v-text="item.title" :title="item.title"></a>
                                    </div>
                                </td>
                                <td class="pd5" @click.stop="openEmail(item.id,item.isRead)">{{item.addTime}} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="listData_page" >
                    <el-button size="small" class="colorRed" @click.stop="allEmails">全部</el-button>
                    <el-button size="small" class="colorRed" @click.stop="readEmails">已读</el-button>
                    <el-button size="small" class="colorRed" @click.stop="unreadEmails">未读</el-button>
                    <el-button size="small" class="colorRed" @click.stop="deleteEmail">删除</el-button>
                    <el-button size="small" class="colorRed" @click.stop="setEmailRead">全部标记已读</el-button>
                </div>
            <div class="page clearfix">
                <div class="page_mid">
                    <span class="pageTotal">每页15条，共{{msgListData.totalRow}}条</span>
                    <a href="javascript:void(0)" class="first" @click.stop="getEmailListData('first')">首页</a>
                    <a href="javascript:void(0)" class="pre" @click.stop="getEmailListData('pre')">上一页</a>
                    <input type="text" name="" disabled="disabled" :value="curPage">
                    <a href="javascript:void(0)" class="last" @click.stop="getEmailListData('nxt')">下一页</a>
                    <a href="javascript:void(0)" class="nxt" @click.stop="getEmailListData('last')">getEmailListData(1)</a>
                    <span class="skipPage">跳转到第 <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                        <el-option v-for="item in msgListData.totalPage" :key="item.name" :value="item">{{item}}</el-option>
                    </el-select>页</span>
                </div>
            </div>
        </div>
        <div >
            <email-content></email-content>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions } from 'vuex'
    import $ from 'jquery'
    import { winHeight, errorMsg, succMsg,removeClass,toggleClass, addClass, hasClass} from "../../tools/command"
    import emailContent from './email-content'
    export default {
        name: "email",
        components : {
            emailContent,
        },
        mounted () {
            this.getEmailListData('first')
            
        },
        beforeDestroy () {

        },
        data(){
            return {
                form: {},
                msgListData: {},
                currentPage: 1,
            }
        },
        computed :{
            curPage(){
                return this.msgListData.pageNumber + "/" + this.msgListData.totalPage
            },
        },
        watch : {
            currentPage : function(val){
                if(val == this.msgListData.pageNumber){
                    return
                } else {
                    this.getEmailListData(val)
                }
            }
        },
        methods :{
            ...mapActions({
                setEmailId : 'setEmailId',
            }),
            async getEmailListData (param) {
                if(param == 'first'){
                    param = 1
                } else if(param == 'pre'){
                    if(this.msgListData.pageNumber > 1){
                        param = this.msgListData.pageNumber - 1
                    } else {
                        param = 1
                    }
                } else if(param == 'nxt'){
                   if(this.msgListData.pageNumber < this.msgListData.totalPage){
                        param = this.msgListData.pageNumber + 1
                   } else {
                        param = this.msgListData.pageNumber
                   }
                } else if(param == 'last'){
                    param = this.msgListData.totalPage
                }
                this.form.pageNumber = param
                this.form.pageSize = 15
                var msgListData = await api.ajax('msg/pageList', this.form)
                if(msgListData && msgListData.code == '0'){
                    this.msgListData = msgListData.data;
                    this.openEmail(this.msgListData.list[0].id)
                } else {
                    errorMsg(msgListData.msg)
                }
            },
            //勾选所有
            checkAll () {
                var checkall = $('#all_mail');
                if (checkall[0].checked == true) {
                    $('.each_mail').each(function(index){
                        $('.each_mail')[index].checked = true
                    })
                } else {
                    $('.each_mail').each(function(index){
                        $('.each_mail')[index].checked = false
                    })
                }
            },
            openEmail(id,isRead){
                this.setEmailId(id);
                var that  = this;
                this.$nextTick(function(){
                  that.$root.$emit("email-init")
                })
            },
            async deleteEmail(){
                var that = this
                var emailId = ''
                $('.each_mail').each(function(index){
                    if($('.each_mail')[index].checked == true){
                        emailId += that.msgListData.list[index].id + ',';
                    }
                })
                this.form.ids = emailId;
                var deleteEmail = await api.ajax('msg/delete', this.form)
                if(deleteEmail && deleteEmail.code == '0'){
                    $('.each_mail').each(function(index){
                        $('.each_mail')[index].checked = false
                    })
                    this.getEmailListData('first');
                } else {
                    errorMsg(deleteEmail.msg)
                }
            },
            //全部标记为已读
            async setEmailRead(){
                for (var i=0; i<this.msgListData.length; i++) {
                    this.msgListData[i].isRead = '1';
                }
                var that = this
                var emailId = ''
                $('.each_mail').each(function(index){
                    if($('.each_mail')[index].checked == true){
                        emailId += that.msgListData.list[index].id + ',';
                    }
                })
                this.form.ids = emailId;
                var setEmailRead = await api.ajax('msg/read', this.form)
                if(setEmailRead && setEmailRead.code == '0'){
                    $('.each_mail').each(function(index){
                        $('.each_mail')[index].checked = false
                    })
                    $('#all_mail')[0].checked = false
                    this.getEmailListData('first');
                } else {
                    errorMsg(setEmailRead.msg)
                }
            },
            //查看全部
            allEmails(){
                this.form.isRead = ''
                this.currentPage = 1
                this.getEmailListData('first')
            },
            //查看已读
            readEmails(){
                this.form.isRead = 1
                this.currentPage = 1
                this.getEmailListData('first')
            },
            //查看未读
            unreadEmails(){
                this.form.isRead = 0
                this.currentPage = 1
                this.getEmailListData('first')
            },
        }
    }
    
</script>
<style scoped>
    .dialog {
        width: 1160px;
        height: 731px;
        border-radius: 10px !important;
        border: solid 1px #9393a2;
        border-left: none;
    }
    .listContent {
        width: 500px;
        height: 730px;
        float: left;
        position: relative;
        background-color: #eee;
        font-size: 14px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        border-top-left-radius: 10px !important;
        border-bottom-left-radius: 10px !important;
    }
    .listData {
        height: 630px;
    }
    .listData_page {
      height: 22px;
      line-height: 27px;
      padding: 7px 5px 12px 10px;
    }
    .listData_page a {
      color: #ce0000;
      text-decoration: none;
      cursor: pointer;
    }
    .listData_page a:hover {
      text-decoration: underline;
    }
    #theTable thead th {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      border-bottom: solid 1px #e1e1e1;
      background-color: #f7f7f7;
    }
    #theTable td div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .wid130 {
      width: 130px;
    }
    #theTable tbody td {
      height: 36px;
      line-height: 36px;
      font-size: 13px;
      text-align: center;
      white-space: nowrap;
    }
    .pd5 {
      padding: 0 5px;
    }
    .emails {
      text-decoration: underline;
      cursor: pointer;
    }
    .emails:hover {
      color: #ec0000;
    }
    #theTable tr:nth-child(2n) {
        background: #f7f7f7;
    }
    #theTable tr:hover {
        background: #e5e5e5;
    }
    .page {
        font-size: 12px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
        padding: 8px 10px 0 10px;
    }
    .pageTotal {
        width: 110px;
        float: left;
        line-height: 22px;
    }
     .page_mid {
        width: 100%;
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
        position: relative;
        bottom: 2px;
    }
    .skipPage {
        position: relative;
        bottom: 2px;
    }
    .colorRed {
        background: #ec0000;
        color: #fff;
        border-radius: 5px;
        padding: 5px ;
        border: none;
    }
    .colorRed:hover {
        background: #fc0000;
    }
    .wid60 {
        width: 60px;
    }
</style>
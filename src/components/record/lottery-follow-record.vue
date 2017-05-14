<template>
    <div class="recordContent">
        <div class="searchBar">
        时间:从
        <div class="select ie9-select">
            <el-date-picker v-model="value1" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions" class="myDate datePicker wid125"></el-date-picker>
        </div>
         到
        <div class="select ie9-select">
            <el-date-picker v-model="value2" type="date" :editable="false" :clearable="false" :picker-options="pickerOptions1" class="myDate datePicker wid125"></el-date-picker>
        </div>
        彩票名称: 
            <el-select v-model="value3" class="wid135 translate3d-zero select ie9-select">
                <el-option v-for="item in options" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        追号期号: <input class="wid96 follow-id" v-model="value4" maxlength="20"></input>
        <div class="chaxun-stl" @click.stop="searchFollowRecord('first')"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>追号编号</th>
                        <th>彩票名称</th>
                        <th>玩法</th>
                        <th>开始时间</th>
                        <th>追号期号</th>
                        <th>投注内容</th>
                        <th>追号总额</th>
                        <th>完成金额</th>
                        <th>中奖金额</th>
                        <th>追号期数</th>
                        <th>完成期数</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="c-p" v-for="item in followData.list" @click.stop="openFllowRecord(item.id)">
                        <td><div v-text="item.id"></div></td>
                        <td><div v-text="item.className"></div></td>
                        <td><div v-text="item.typeName"></div></td>
                        <td><div v-text="item.addTime"></div></td>
                        <td><div v-text="item.numTitle"></div></td>
                        <td>
                            <div style="width:80px" v-if="item.typeName =='前二大小单双'" class="orderValue" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                            <div style="width:80px" v-if="item.typeName =='后二大小单双'" class="orderValue" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                            <div style="width:80px" v-if="item.typeName =='特码大小单双'" class="orderValue" v-text="filter(item.orderValue)" :title="filter(item.orderValue)"></div>
                            <div style="width:80px" v-if="item.typeName !='前二大小单双' && item.typeName !='特码大小单双' && item.typeName !='后二大小单双'" class="orderValue" v-text="item.orderValue" :title="item.orderValue"></div>
                        </td>
                        <td><div style="width:55px" v-text="item.amount" :title="item.amount"></div></td>
                        <td><div style="width:55px" v-text="item.kjMoney" :title="item.kjMoney"></div></td>
                        <td><div style="width:55px" v-text="item.bingoMoney" :title="item.bingoMoney"></div></td>
                        <td><div v-text="item.actCount"></div></td>
                        <td><div v-text="item.kjCount"></div></td>
                        <td>
                            <div v-if="item.state == 0">进行中</div>
                            <div v-if="item.state == 1">完成</div>
                            <div v-if="item.state == 2">撤销</div>
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
        <el-dialog custom-class="dialog-cus-cls-2 ie9-top20" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="false">
            <component :is="lotteryDialogView"></component>
        </el-dialog>
    </div>   
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import lotteryConstants from './lottery-constants'
    import { datePick,exchange,succMsg,errorMsg ,formatDate}from '../../tools/command'
    import orderDetail from "./order-detail.vue"
    import followDetail from "./follow-detail.vue"
    export default {
        components : {
            followDetail,
            orderDetail
        },
        data(){
            return {
                value1 : '',
                value2 : '',
                value3: '-1',
                value4: '',
                form : {
                    bDate : '',
                    eDate : '',
                    classId : '-1',
                    status : '-1',
                    pageNumber: 1,
                    pageSize: 10,
                },
                options: [],
                show: true,
                followData: {},
                dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                title: '',
                currentPage : 1
            }
        },
        mounted () {
            for (var i = 0; i < lotteryConstants.lotterylist.length; i++) {
                this.options.push(lotteryConstants.lotterylist[i])
            }
            var now = new Date()
            this.value1 = new Date(now.getTime() - 86400000 * 6)
            this.value2 = now
            this.searchFollowRecord('first')
            this.$root.$on("closeLotteryDialog-init",this.closeHandle)
            this.$root.$on("openRecordShow",this.openDialog)
            if(this.openRecordType){
                this.openDialog()
            }
        },
        beforeDestroy () {
            this.$root.$off("closeLotteryDialog-init",this.closeHandle)
            this.$root.$off("openRecordShow",this.openDialog)
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
            },
            lotteryDialogView () {
                var lotteryDialog = this.$store.state.useraction.lotteryDialogView;
                if (lotteryDialog == 'follow-detail') {
                    return "followDetail"
                } else if (lotteryDialog == 'order-detail') {
                    return "orderDetail"
                }
            },
            openRecordType(){
                return this.$store.state.useraction.openRecordType
            },
        },
        watch : {
            "currentPage" : function(val){
                if(val == this.followData.pageNumber){
                    return
                } else {
                    this.searchFollowRecord(val)
                }
            },
            openRecordType : function(val){
                if(val){
                    this.openDialog()
                }
            },
        },
        methods :{
            ...mapActions({
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView',
                setLotteryOrderId : 'setLotteryOrderId',
                setLotteryDialogView : 'setLotteryDialogView',
                setOpenRecordType : 'setOpenRecordType',
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

                this.form.classId = this.value3;
                this.form.followId = this.value4;
                this.form.pageNumber = param
                this.form.pageSize = 15
                var followData = await api.ajax('record/pageLotteryFollow', this.form)
                if(followData && followData.code == '0'){
                    this.followData = followData.data
                } else {
                    errorMsg(followData.msg)
                }
            },
            openFllowRecord(id){
                this.setLotteryOrderId(id);
                this.openDialog()
            },
            openDialog(){
                this.dialogTableVisible = true;
                this.title = "追号详情";
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("follow-detail-init")
                }) 
                this.setLotteryDialogView('follow-detail')
            },
            openHandle(){
                console.log('openHandle')
            },
            closeHandle(){
                this.setOpenRecordType(false)
                this.dialogTableVisible = false
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
        height: 643px;
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
    .wid96 {
        width: 96px;
    }
    .wid135 {
        width: 135px;
    }
    .wid125 {
        width: 125px;
    }
    .btnGreen {
        width: 58px;
        color: #fff;
        background-color: #40af25;
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
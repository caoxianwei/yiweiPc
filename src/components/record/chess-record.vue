<template>
    <div class="recordContent">
        <div class="searchBar">
        游戏: <div class="select wid140 ie9-select">
            <el-select v-model="game" >
                <el-option v-for="item in games" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        <span>时间:</span>
        <div class="selectTime" @click.stop="today">今天</div>
        <div class="selectTime" @click.stop="threeDay">三天</div>
        <div class="selectTime" @click.stop="sevenDay">七天</div>
        <div class="searchBtn" @click.stop="search"></div>
        </div> 
        <div class="listContent" ref="IPAddressList">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>游戏名称</th>
                        <th>房间名称</th>
                        <th>输赢</th>
                        <th>税收</th>
                        <th>游戏时长</th>
                        <th>结束时间</th>
                        <th>游戏详情</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData.list" >
                        <td><span v-text="item.gameName"></span></td>
                        <td><span v-text="item.roomName"></span></td>
                        <td><div v-text="item.coinChange"></div></td>
                        <td><span v-text="item.tax"></span></td>
                        <td><span v-text="item.duration"></span></td>
                        <td><span v-text="item.addTime"></span></td>
                        <td style="width:300px;padding-right:15px"><span v-text="item.remark"></span></td>
                    </tr>
                </tbody>
            </table> 
            
        </div>
        <div class="page clearfix">
            *说明：购彩投注记录本平台最多保留<span class="colorRed">7</span>天详情数据
        </div>
        <div class="page clearfix">
            <div class="page_mid">
                <span class="pageTotal">每页15条，共{{listData.totalRow}}条</span>
                <a href="javascript:void(0)" class="first" @click.stop="getChessData('first')">首页</a>
                <a href="javascript:void(0)" class="pre" @click.stop="getChessData('pre')">上一页</a>
                <input type="text" name="" disabled="disabled" :value="curPage">
                <a href="javascript:void(0)" class="last" @click.stop="getChessData('nxt')">下一页</a>
                <a href="javascript:void(0)" class="nxt" @click.stop="getChessData('last')">getChessData(1)</a>
                <span class="skipPage">跳转到第 <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                    <el-option v-for="item in listData.totalPage" :key="item.name" :value="item">{{item}}</el-option>
                </el-select>页</span>
            </div>
        </div> 
    </div>   
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import jquery from 'jquery'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    import lotteryConstants from './lottery-constants'
    import { datePick,exchange,succMsg,errorMsg,removeClass,toggleClass, addClass, hasClass  }from '../../tools/command'
    export default {
        components : {

        },
        data(){
            return {
                game  : '-1',
                dayRange: '7',
                form : {},
                show: true,
                listData: {},
                form: {},
                games : [{
                    value: '-1',
                    label: '全部'
                }],
                currentPage: 1,
            }
        },
        mounted () {
            jquery(this.$refs.IPAddressList).mCustomScrollbar()
            this.getChessData('first')
            this.dayRange = '7'
            this.getCanPLayGames()
            jquery('.selectTime').eq(2).addClass('backcolor')
        },
        beforeDestroy () {

        },
        watch: {
            dayRange(val){
                console.log(val)
                if (val =='1') {
                    jquery('.selectTime').eq(0).addClass('backcolor')
                    jquery('.selectTime').eq(1).removeClass('backcolor')
                    jquery('.selectTime').eq(2).removeClass('backcolor')
                } else if (val =='3') {
                    jquery('.selectTime').eq(1).addClass('backcolor')
                    jquery('.selectTime').eq(0).removeClass('backcolor')
                    jquery('.selectTime').eq(2).removeClass('backcolor')
                } else if (val =='7') {
                    jquery('.selectTime').eq(2).addClass('backcolor')
                    jquery('.selectTime').eq(0).removeClass('backcolor')
                    jquery('.selectTime').eq(1).removeClass('backcolor')
                }
            },
            currentPage : function(val){
                if(val == this.listData.pageNumber){
                    return
                } else {
                    this.getLotteryData(val)
                }
            }
        },
        computed :{
            curPage(){
                return this.listData.pageNumber + "/" + this.listData.totalPage
            }
        },
        methods :{
            ...mapActions({
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView'
            }),
            search() {
                this.getChessData('first')
            },
            async getChessData(param){
                if(param == 'first'){
                    param = 1
                } else if(param == 'pre'){
                    if(this.listData.pageNumber > 1){
                        param = this.listData.pageNumber - 1
                    } else {
                        param = 1
                    }
                } else if(param == 'nxt'){
                   if(this.listData.pageNumber < this.listData.totalPage){
                        param = this.listData.pageNumber + 1
                   } else {
                        param = this.listData.pageNumber
                   }
                } else if(param == 'last'){
                    param = this.listData.totalPage
                }
                this.form.pageSize = 15
                this.form.pageNumber = param
                this.form.classId = this.value1
                this.form.dayRange = this.dayRange
                var listData = await api.ajax('record/pageGameRecord', this.form)
                if(listData && listData.code == '0'){
                    this.listData = listData.data
                } else {
                    errorMsg(listData.msg)
                }
            },
            async getCanPLayGames(){
                var data = await api.ajax('listCodeData', {code : "game"})
                if(data && data.code == '0'){
                    this.games.push(...data.data)
                } else {
                    errorMsg(data.msg)
                }
            },
            today() {
                this.dayRange = 1
                jquery('.selectTime').eq(0).addClass('backcolor')
                jquery('.selectTime').eq(1).removeClass('backcolor')
                jquery('.selectTime').eq(2).removeClass('backcolor')
            },
            threeDay() {
                this.dayRange = 3
                jquery('.selectTime').eq(1).addClass('backcolor')
                jquery('.selectTime').eq(0).removeClass('backcolor')
                jquery('.selectTime').eq(2).removeClass('backcolor')
            },
            sevenDay() {
                this.dayRange = 7
                jquery('.selectTime').eq(2).addClass('backcolor')
                jquery('.selectTime').eq(0).removeClass('backcolor')
                jquery('.selectTime').eq(1).removeClass('backcolor')
            },
            
        }
    }
    
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        height: 684px;
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
    
    .wid140 {
        width: 140px;
    }
    .selectTime {
        width: 38px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        border: solid 1px #bdbdcb;
        border-radius: 5px;
        text-align: center; 
        background-color: #fff;
        color: #4b4f5b;
    }
    .selectTime:hover {
        cursor: pointer;
        background-color: #cccfd7;
    }
    .backcolor {
        background-color: #cccfd7;
    }
    .searchBtn {
        width: 70px;
        height: 29px;
        line-height: 29px;
        display: inline-block;
        background-image: url('../../images/btnChangXun01.png');
        position: relative;
        top: 9px;
    }
    .searchBtn:hover {
        cursor: pointer;
        background-image: url('../../images/btnChangXun02.png');
    }
    .listContent {
        height: 496px;
    }
    #thetable thead tr {
        background-image: url('../../images/imgJianBian02.png');
    }
    #thetable tr th {
        width: 99px;
    }
    #thetable tr td {
        width: 99px;
        white-space: normal;
    }
    .page {
        font-size: 12px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        color: #4b4f5b;
        padding: 8px 10px 0 10px;
    }
    .pageTotal {
        float: left;
    }
     .page_mid {
        float: none;
        width: 100%;
        padding: 10px 0;
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
    .wid60 {
        width: 60px;
    }
</style>
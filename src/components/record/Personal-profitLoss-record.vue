<template>
    <div class="recordContent dialogContent">
        <div class="searchBar">
        查询月份时间:
        <div class="select ie9-select">
            <el-date-picker
               v-model="yearMonth"
               type="month" :editable="false" :clearable="false" 
               placeholder="选择月" class="wid120">
             </el-date-picker>
        </div>
        <div class="chaxun-stl" @click.stop="searchRecord"></div>
        </div> 
        <div ref="profitloassContent" class="listContent h-540">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>日期</th>
                        <th>充值总额</th>
                        <th>取款总额</th>
                        <th>彩票投注额</th>
                        <th>彩票返点额</th>
                        <th>棋牌返点</th>
                        <th>总佣金</th>
                        <th>彩票盈亏</th>
                        <th>棋牌盈亏</th>
                        <th>真人盈亏</th>
                        <th>个人综合盈亏</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in data" >
                        <td><div v-text="item.dtDay"></div></td>
                        <td><div v-text="item.cz"></div></td>
                        <td><div v-text="item.qk"></div></td>
                        <td><div v-text="item.realTz"></div></td>
                        <td><div>{{item.pointMoney | calcSum(item.pointMoneyAgent)}}</div></td>
                        <td><div v-text="item.gamePointMoney"></div></td>
                        <td><div v-text="item.yj"></div></td>
                        <td><div v-text="item.cpyk"></div></td>
                        <td><div v-text="item.qpyk"></div></td>
                        <td><div v-text="item.zryk"></div></td>
                        <td><div :class="item.cpyk | calcSumColor(item.qpyk, item.zryk)">{{item.cpyk | calcSum(item.qpyk, item.zryk)}}</div></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="profitloass-record-sum">
            <dl>
                <dt>本页合计:</dt>
                <dd>
                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>充值总额：<span v-text="cz" :title="cz"></span></td>
                                <td>取款额：<span v-text="qk" :title="qk"></span></td>
                                <td>彩票投注：<span v-text="realTz" :title="realTz"></span></td>
                                <td>彩票返点：<span v-text="fd" :title="fd"></span></td>
                                <td>棋牌返点：<span v-text="gamePointMoney" :title="gamePointMoney"></span></td>
                                <td>总佣金：<span v-text="yj" :title="yj"></span></td>
                            </tr> 
                            <tr>
                                <td>彩票盈亏：<span v-text="cpyk" :title="cpyk"></span></td>
                                <td>棋牌盈亏：<span v-text="qpyk" :title="qpyk"></span></td>
                                <td>真人盈亏：<span v-text="zryk" :title="zryk"></span></td>
                                <td>综合盈亏：<span v-text="zh" class="numRed" :title="zh"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </dd>
            </dl>
        </div>
    </div>   
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import { errorMsg, lpad }from '../../tools/command'
    import jquery from 'jquery'
    import mousewheel from 'jquery-mousewheel'
    import mCustomScrollbar from 'malihu-custom-scrollbar-plugin'
    import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
    import Decimal from 'decimal.js'
    export default {
        components : {

        },
        data(){
            return {
                activeName : "personalProfitloassRecord",
                yearMonth : '',
                data : [],
                show : true,
            }
        },
        mounted () {
            jquery(this.$refs.profitloassContent).mCustomScrollbar()
            this.yearMonth = new Date()
            this.searchRecord()
        },
        beforeDestroy () {

        },
        computed :{
            cz: function() {
                var czAll = new Decimal(0);
                for (var i = 0; i < this.data.length; i++) {
                    czAll = czAll.add(this.data[i].cz);
                } 
                return czAll.toNumber()
            },
            qk: function() {
                var qkAll = new Decimal(0);
                for (var i = 0; i < this.data.length; i++) {
                    qkAll = qkAll.add(this.data[i].qk);
                } 
                return qkAll.toNumber()
            },
            realTz: function() {
                var realTzAll = new Decimal(0);
                for (var i = 0; i < this.data.length; i++) {
                    realTzAll = realTzAll.add(this.data[i].realTz)
                } 
                return realTzAll.toNumber()
            },
            fd: function() {
                var fAll = new Decimal(0);
                for (var i = 0; i < this.data.length; i++) {
                    fAll = fAll.add(this.data[i].pointMoney)
                    fAll = fAll.add(this.data[i].pointMoneyAgent)
                } 
                return fAll.toNumber()
            },
            gamePointMoney: function() {
                var qpfAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    qpfAll = qpfAll.add(this.data[i].gamePointMoney)
                } 
                return qpfAll.toNumber()
            },
            yj: function() {
                var yjAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    yjAll = yjAll.add(this.data[i].yj)
                } 
                return yjAll.toNumber()
            },
            cpyk: function() {
                var cpykAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    cpykAll = cpykAll.add(this.data[i].cpyk)
                } 
                return cpykAll.toNumber()
            },
            qpyk: function() {
                var qpykAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    qpykAll = qpykAll.add(this.data[i].qpyk)
                } 
                return qpykAll.toNumber()
            },
            zryk: function() {
                var zrykAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    zrykAll = zrykAll.add(this.data[i].zryk)
                } 
                return zrykAll.toNumber()
            },
            zh: function() {
                var zhAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    zhAll = zhAll.add(this.data[i].cpyk)
                    zhAll = zhAll.add(this.data[i].qpyk)
                    zhAll = zhAll.add(this.data[i].zryk)
                } 
                return zhAll.toNumber()
            },
        },
        watch : {
        },
        methods :{
            ...mapActions({
                setUserMsgId : 'setUserMsgId',
                setDialogView : 'setDialogView'
            }),
            async searchRecord(){
                if(!this.yearMonth){
                    return
                }
                var para = {}
                para.month = this.yearMonth.getFullYear() + lpad(this.yearMonth.getMonth() + 1, 2, '0')
                var data = await api.ajax('report/listDailyProfit', para)
                if(data && data.code == '0'){
                    this.show = false
                    this.data = data.data
                } else {
                    errorMsg(data.msg)
                }
            },

        }
    }
    
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        height: 730px;
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
        height: 580px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #thetable thead tr {
        background-image: url('../../images/imgJianBian02.png');
    }
    #thetable tr td {
        width: 99px;
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
   
    .profitloass-record-sum {
        line-height: 20px;
        padding-top: 10px;
        margin: 0 10px;
    }
    .numRed {
        color: #f00;
    }
    .numGreen {
        color: #090;
    }
    .profitloassContent {
        height: 60px;
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
        width: 998px;
        background-image: url('../../images/imgJianBian02.png');
    }
    .listContent-div-first span {
        border-right: solid 1px #e1e1eb;
    }
    .content-bot-style {
        border-bottom: solid 1px #e1e1eb;
    }
    .h-540 {
        height: 540px;
    }
</style>
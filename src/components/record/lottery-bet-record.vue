<template>
    <div class="recordContent translate3d-zero">
        <div class="searchBar">
        彩票名称: <div class="select ie9-select">
                        <el-select v-model="value1" size="small">
                            <el-option v-for="item in options1" :key="item.name" :label="item.label" :value="item.value" ></el-option>
                        </el-select>
                    </div>
        状态: <div class="select ie9-select">
            <el-select v-model="value2" size="small">
                <el-option v-for="item in options2" :key="item.name" :label="item.label" :value="item.value" ></el-option>
            </el-select>
        </div>
        投注期号: <div class="select ie9-select"><el-input v-model="value3"></el-input></div>
        下单时间: <div class="selectTime" @click.stop="today">今天</div>
        <div class="selectTime" @click.stop="threeDay">三天</div>
        <div class="selectTime" @click.stop="sevenDay">七天</div>
        <div class="searchBtn" @click.stop="search"></div>
        </div> 
        <div class="listContent">
            <table id="thetable" border="0" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th>订单号</th>
                        <th>彩票名称</th>
                        <th>玩法</th>
                        <th>下单时间</th>
                        <th>投注期号</th>
                        <th>投注内容</th>
                        <th>总额</th>
                        <th>倍数</th>
                        <th>模式</th>
                        <th>状态</th>
                        <th>开奖号码</th>
                        <th>盈亏</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in listData.list" >
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
                        <td><div style="width:50px" v-text="item.amount" :title="item.amount"></div></td>
                        <td><div v-text="item.multiple"></div></td>
                        <td>
                            <span v-if="item.singleMoney >= 1">元</span>
                            <span v-if="item.singleMoney == 0.2">角</span>
                            <span v-if="item.singleMoney == 0.02">分</span>
                        </td>
                        <td>
                            <span v-if="item.bingoFlag == 0" class="isBingoRed">未开奖</span>
                            <span v-if="item.bingoFlag == 1" class="isBingoRed">已中奖</span>
                            <span v-if="item.bingoFlag == 2" class="isBingoGreen">未中奖</span>
                            <span v-if="item.bingoFlag == 3" class="isBingoRed">中奖停追</span>
                            <span v-if="item.bingoFlag == 4" class="isBingoGrey">已撤单</span>
                        </td>
                        <td><div style="width:80px" v-text="item.openNum" :title="item.openNum"></div></td>
                        <td>
                            <div style="width:50px" v-if="item.resultMoney == 0" v-text="0" :title="0" class="resultMoneyRed"></div>
                            <div style="width:50px" v-if="item.resultMoney > 0" v-text="item.resultMoney" :title="item.resultMoney"></div>
                            <div style="width:50px" v-if="item.resultMoney < 0" v-text="item.resultMoney" :title="item.resultMoney"></div>
                        </td>
                        <td>
                            <a class="opts" @click.stop="showRecordDet(item.id)">详情</a> <a class="opts" @click.stop="cancelOrder(item.id)" v-if="item.bingoFlag == 0">撤单</a>
                        </td>
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
                <a href="javascript:void(0)" class="first" @click.stop="getLotteryData('first')">首页</a>
                <a href="javascript:void(0)" class="pre" @click.stop="getLotteryData('pre')">上一页</a>
                <input type="text" name="" disabled="disabled" :value="curPage">
                <a href="javascript:void(0)" class="last" @click.stop="getLotteryData('nxt')">下一页</a>
                <a href="javascript:void(0)" class="nxt" @click.stop="getLotteryData('last')">getLotteryData(1)</a>
                <span class="skipPage">跳转到第 <el-select v-model="currentPage" class="outline-none translate3d-zero wid60">
                    <el-option v-for="item in listData.totalPage" :key="item.name" :value="item">{{item}}</el-option>
                </el-select>页</span>
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
    import jquery from 'jquery'
    import lotteryConstants from './lottery-constants'
    import { datePick,exchange,succMsg,errorMsg,removeClass,toggleClass, addClass, hasClass }from '../../tools/command'
    import orderDetail from "./order-detail.vue"
    export default {
        components : {
            orderDetail
        },
        data(){
            return {
                value1 : '-1',
                value2 : '-1',
                placeholderLottery: '选择彩票',
                placeholderStatus: '选择状态',
                value3: '',
                dayRange: '7',
                value4: '1',
                form : {},
                show: true,
                listData: {},
                form: {},
                options1: [],
                options2: [],
                options3: [],
                dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                title: '',
                currentPage: 1,
            }
        },
        mounted () {
            for (var i = 0; i < lotteryConstants.lotterylist.length; i++) {
                this.options1.push(lotteryConstants.lotterylist[i])
            }
            for (var i = 0; i < lotteryConstants.bingoFlagList.length; i++) {
                this.options2.push(lotteryConstants.bingoFlagList[i])
            }
            this.dayRange = '7'
            jquery('.selectTime').eq(2).addClass('backcolor')
            this.getLotteryData('first')
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
            },
            openRecordType : function(val){
                if(val){
                    this.openDialog()
                }
            }
        },
        computed :{
            curPage(){
                this.currentPage = this.listData.pageNumber
                return this.listData.pageNumber + "/" + this.listData.totalPage
            },
            lotteryDialogView () {
                var lotteryDialog = this.$store.state.useraction.lotteryDialogView;
                if (lotteryDialog == 'order-detail') {
                  return "orderDetail"
                }
            },
            openRecordType(){
                return this.$store.state.useraction.openRecordType
            },
        },
        methods :{
            ...mapActions({
                setLotteryOrderId : 'setLotteryOrderId',
                setLotteryDialogView : 'setLotteryDialogView',
                setOpenRecordType : 'setOpenRecordType',
            }),
            search() {
                this.getLotteryData('first')
            },
            async getLotteryData(param){
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
                this.form.bingoFlag = this.value2
                this.form.numTitle = this.value3
                var listData = await api.ajax('record/pageLotteryBet', this.form)
                if(listData && listData.code == '0'){
                    this.listData = listData.data
                } else {
                    errorMsg(listData.msg)
                }
            },
            async cancelOrder(id) {
                this.form.orderId = id;
                var cancelOrderData = await api.ajax('order/cancel', this.form)
                if(cancelOrderData && cancelOrderData.code == '0'){
                    succMsg(cancelOrderData.msg)
                } else {
                    errorMsg(cancelOrderData.msg)
                }
            },
            today() {
                this.dayRange = 1
            },
            threeDay() {
                this.dayRange = 3
            },
            sevenDay() {
                this.dayRange = 7  
            },
            filter (val) {
                return exchange(val)
            },
            showRecordDet(id){
                console.log(id)
                this.setLotteryOrderId(id);
                this.openDialog()
            },
            openDialog(){
                this.dialogTableVisible = true;
                this.title = "彩票订单";
                var that = this;
                this.$nextTick(function(){
                    that.$root.$emit("order-detail-init")
                })
                this.setLotteryDialogView('order-detail')
            },
            openHandle(){
                console.log('openHandle')
            },
            closeHandle(){
                this.setOpenRecordType(false)
                this.dialogTableVisible = false
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
    .wid140 {
        width: 140px;
    }
    .wid105 {
        width: 105px;
    }
    .wid60 {
        width: 60px;
        margin: 0 5px;
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
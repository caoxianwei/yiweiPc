<template>
    <div class="recordContent dialogContent">
        <div class="shuju_box bg2">
            <table border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr class="h-20 b-c-f7f7f7">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="b-c-f7f7f7">
                        <td rowspan="2" class="shuju_td1">综合 : </td>
                        <td>团队余额:</td>
                        <td class="txtGrey"><span v-text="data.dayMoney"></span>元</td>
                        <td>今日新注册:</td>
                        <td class="txtGrey">{{data.regNum}}人，充值{{data.regPayNum}}人</td>
                        <td>团队充值:</td>
                        <td class="txtGrey"><span v-text="data.payMoneyAll"></span>元</td>
                    </tr>
                    <tr class="b-c-f7f7f7">
                        <td>团队人数:</td>
                        <td class="txtGrey">{{data.userNum}}人</td>
                        <td>当前在线会员:</td>
                        <td class="txtGrey">{{data.onlineUserNum}}人</td>
                        <td>团队取款:</td>
                        <td class="txtGrey"><span v-text="data.takeMoneyAll"></span>元</td>
                    </tr>
                    <tr class="h-20 b-c-f7f7f7">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="h-20 b-c-eee">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="p-t-20 b-c-eee">
                        <td rowspan="2" class="shuju_td1">彩票 : </td>
                        <td>彩票投注总额:</td>
                        <td class="txtGrey"><span v-text="data.realTz"></span>元</td>
                        <td>团队彩票返点:</td>
                        <td class="txtGrey"><span v-text="data.pointMoneyMax"></span>元</td>
                        <td>团队佣金总额:</td>
                        <td class="txtGrey"><span v-text="data.yjMoneyMax"></span>元</td>
                    </tr>
                    <tr class="b-c-eee">
                        <td>彩票中奖总额:</td>
                        <td class="txtGrey"><span v-text="data.bingoMoney"></span>元</td>
                        <td>我的彩票返点:</td>
                        <td class="txtGrey"><span v-text="data.pointMoneyMaxAgent"></span>元</td>
                        <td>团队彩票盈亏:</td>
                        <td class="txtGrey"><span v-text="data.resultMoneyPt"></span>元</td>
                    </tr>
                    <tr class="h-20 b-c-eee">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="h-20 b-c-f7f7f7">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="b-c-f7f7f7">
                        <td rowspan="2" class="shuju_td1">棋牌 : </td>
                        <td>棋牌洗码量（赢）:</td>
                        <td class="txtGrey"><span v-text="data.dayQPWin"></span>元</td>
                        <td>我的棋牌返点:</td>
                        <td class="txtGrey"><span v-text="data.dayQPMyFd"></span>元</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="b-c-f7f7f7">
                        <td>团队棋牌返点:</td>
                        <td class="txtGrey"><span v-text="data.dayQPAllFd"></span>元</td>
                        <td>团队棋牌盈亏:</td>
                        <td class="txtGrey"><span v-text="data.dayQPAllProfit"></span>元</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="h-20 b-c-f7f7f7">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="h-20 b-c-eee">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="b-c-eee">
                        <td rowspan="2" class="shuju_td1">真人 : </td>
                        <td>投注总额:</td>
                        <td class="txtGrey">0元</td>
                        <td>团队余额:</td>
                        <td class="txtGrey">0元</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="b-c-eee">
                        <td>总注单数:</td>
                        <td class="txtGrey">0元</td>
                        <td>团队人数:</td>
                        <td class="txtGrey">0元</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="h-20 b-c-eee">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="h-20 b-c-fff">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                    <tr class="b-c-fff">
                        <td class="shuju_td1">总计 : </td>
                        <td>团队盈亏总计:</td>
                        <td class="numRed"><span>{{data.resultMoneyPt | calcSum(data.dayQPAllProfit)}}元</span></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr class="h-20 b-c-fff">
                        <td class="h-20" colspan="7"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import api from '../../api'
    import { datePick,errorMsg } from '../../tools/command'
    export default {
        name : 'teamDataMsg',
        data () {
            return {
                form: {
                    bDate: '',
                    eDate: '',
                    agentId: '',
                },
                data: {},
            }
        },
        mounted() {
            this.form.agentId = this.$store.state.useraction.memberListId;
            this.value1 = new Date();
            this.value2 = new Date();
            this.getData();
        },
        methods : {
            getData () {
                var date = datePick(this.value1,this.value2)
                this.form.bDate =  this.value1.getFullYear() + '-' + date.month1 + '-' + date.day1;
                this.form.eDate =  this.value2.getFullYear() + '-' + date.month2 + '-' + date.day2;
                api.ajax('team/findTeamReport',this.form).then(data =>{
                    if ( data && data.code=="0" ) {
                        this.data = data.data;
                    }
                }, error =>{
                    errorMsg("数据请求失败")
                })
            },
        }
    }
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        height: 684px;
        border-bottom-right-radius: 10px;
        border-top-right-radius: 0 !important;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    .shuju_box {
        padding: 0 0;
    }
    .shuju_box table {
        width: 100%;
        margin: 0 auto;
        table-layout: fixed;
    }
    .shuju_box table td {
        height: 30px;
    }
    .shuju_td1 {
        font-size: 20px;
    }
    .txtGrey {
        color: #888;
    }
    .h-20 {
        height: 10px !important;
    }
    td {
        text-align: right;
        padding-right: 20px;
    }
    .b-c-f7f7f7 {
        background-color: #f0f3f;
    }
    .b-c-eee {
        background-color: #eee;
    }
    .b-c-fff {
        background-color: #fff;
    }
</style>
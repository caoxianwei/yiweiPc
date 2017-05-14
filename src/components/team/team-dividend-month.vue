<template>
    <div class="recordContent">
        <div class="searchBar">
        查询年份时间:
        <div class="select ie9-select">
            <el-date-picker
               v-model="year"
               type="year" :editable="false" :clearable="false" 
               placeholder="选择年" class="wid120">
             </el-date-picker>
         </div>
        <div class="chaxun-stl" @click.stop="searchRecord"></div>
        </div> 
        <div ref="scrollContent" class="listContent">
                    <table id="thetable" border="0" width="100%" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th>月份</th>
                                <th>总代代理</th>
                                <th>团队月充值</th>
                                <th>团队月取款</th>
                                <th>团队盈亏总计</th>
                                <th>分红比例</th>
                                <th>团队分红总额</th>
                                <th>我的分红总额</th>
                                <th>发送状态</th>
                                <th>分红明细</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="10" v-if="show">暂无数据..</td>
                            </tr>
                            <tr v-for="item in data"> 
                                <td><span v-text="item.monthStr"></span></td>
                                <td><span v-text="item.username"></span></td>
                                <td>
                                    <div v-text="item.cz" :title="item.cz" class="wid100"></div>
                                </td>
                                <td>
                                    <div v-text="item.qk" :title="item.qk" class="wid100"></div>
                                </td>
                                <td>
                                    <div v-if="item.tzyk ==0" class="numRed wid100">0</div>
                                    <div v-if="item.tzyk >0" v-text="item.tzyk" :title="item.tzyk" class="numRed wid100"></div>
                                    <div v-if="item.tzyk <0" v-text="item.tzyk" :title="item.tzyk" class="numGreen wid100"></div>
                                </td>
                                <td>{{item.rate}}%</td>
                                <td>
                                    <div v-text="item.dividendNum" :title="item.dividendNum" class="wid100"></div>
                                </td>
                                <td>
                                    <div v-text="item.realDividend" :title="item.realDividend" class="wid100"></div>
                                </td>
                                <td>
                                    <span v-if="item.distributeFlag == '0'">未发放</span>
                                    <span v-if="item.distributeFlag == '1'">已发放</span>
                                    <span v-if="item.distributeFlag == '-1'">不满足条件</span>
                                </td>
                                <td><a class="month-detail" @click.stop="monthDavDetail(item.monthStr)">明细</a></td>
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
                                <td>分红结算次数：<span v-text="account"></span></td>
                                <td>团队分红金额总计：<span v-text="dividendNum"></span></td>
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
        name: "team-dividend-month",
        data(){
            return {
                year : '',
                data : [],
                show : true,
                account: '',
            }
        },
        mounted () {
            jquery(this.$refs.scrollContent).mCustomScrollbar()
            this.year = new Date()
            this.searchRecord()
        },
        beforeDestroy () {

        },
        computed :{
            dividendNum: function(){
                var dividendNumAll = new Decimal(0)
                for (var i = 0; i < this.data.length; i++) {
                    dividendNumAll = dividendNumAll.add(this.data[i].dividendNum)
                } 
                return dividendNumAll.toNumber()
            }
        },
        watch : {
        },
        methods :{
            ...mapActions({
                setFlowrecordView : 'setFlowrecordView',
                setTeamDividendMonth : 'setTeamDividendMonth',
            }),
            async searchRecord(){
                if(!this.year){
                    return
                }
                var para = {}
                para.year = this.year.getFullYear()
                var data = await api.ajax('team/dividend/listMonthlyReport', para)
                if(data && data.code == '0'){
                    this.show = false
                    this.data = data.data
                    this.account = this.data.length
                } else {
                    errorMsg(data.msg)
                }
            },
            monthDavDetail(val){
                this.setFlowrecordView("team-dividend-day")
                this.setTeamDividendMonth(val)
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
        font-size: 13px;
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
        overflow-x: hidden;
        overflow-y: auto;
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
    .wid100 {
        width: 100px;
    }
    .numRed {
        color: #f00;
    }
    .numGreen {
        color: #090;
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
    .profitloassContent {
        height: 60px;
    }

    .month-detail {
        display: inline-block;
        width: 50px;
        height: 22px;
        line-height: 22px;
        text-decoration: none !important;
        background-color: #cccfd7;
        border-radius: 5px;
        color: #ff4200;
    }
</style>
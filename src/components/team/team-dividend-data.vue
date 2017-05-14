<template>
    <div class="recordContent" >
        <div class="grey_box_top">
            <div class="grey_box_bottom">
                <table class="fenghong_shuju_table1" width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td class="td1" rowspan="3">
                                <img src="../../images/imgTouXiang.png">
                            </td>
                            <td>总代用户名</td>
                            <td align="left" class="txtGrey" colspan="3">{{username}}</td>
                        </tr>
                        <tr>
                            <td >分红比例</td>
                            <td align="left" class="txtGrey" colspan="3">{{fenHongSum.rate}}%</td>
                            <td class="td4">
                                <el-button type="text" class="btnGreen4" size="small" @click.stop="transferBalance">余额转换</el-button>
                            </td>
                            <td class="td5">
                                <el-button type="text" class="account" size="small" @click.stop="dividendDetail">分红资金明细</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>分红余额</td>
                            <td align="left" class="txtGrey" colspan="3"><span v-text="fenHongSum.balance"></span>元</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="fenghong_shuju_table2_box">
            <table class="fenghong_shuju_table2" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td>当前分红开始</td>
                        <td class="td2">{{fenHongSum.beginDay}}</td>
                        <td>当前分红截止</td>
                        <td class="td2">{{fenHongSum.endDay}}</td>
                    </tr>
                    <tr>
                        <td>当前团队投注总额</td>
                        <td class="td2"><span v-text="fenHongSum.tz"></span>元</td>
                        <td>当前团队总盈亏</td>
                        <td class="td2"><span v-text="fenHongSum.curNum"></span>元</td>
                    </tr>
                    <tr>
                        <td>本月团队可分红</td>
                        <td class="td2"><span v-text="fenHongSum.curDividendNum"></span>元</td>
                        <td>我可获得分红总额</td>
                        <td class="td2"><span v-text="fenHongSum.curMyDividendNum"></span>元</td>
                    </tr>
                    <tr>
                        <td>团队已结算分红总计</td>
                        <td class="td2"><span v-text="fenHongSum.dividendNum"></span>元</td>
                        <td>已结算次数</td>
                        <td class="td2">{{fenHongSum.dividendCount}}次</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <el-dialog custom-class="dialog-team-dividend-data" :title="title" v-model="dialogTableVisible" :close-on-click-modal="closeOnClickModal" :lock-scroll="false" :close-on-press-escape="closeOnPressEscape" @open="openHandle" @close="closeHandle" :modal="cancelModal">
                <team-dividend-data-dia v-if="dialogTableVisible" :aview="fenhongSumDialogView"></team-dividend-data-dia>
            </el-dialog>
        </div>
    </div>
</template>
<script lang="babel">
    import { mapActions } from 'vuex'
    import api from '../../api'
    import { errorMsg } from '../../tools/command'
    import teamDividendDataDia from './team-dividend-data-dia'
    export default {
        name: "team-dividend-data",
        components : {
            teamDividendDataDia
        },
        data () {
            return {
                username: '',
                fenHongSum: {},
                form: {},
                dialogTableVisible : false,
                closeOnClickModal : false,
                closeOnPressEscape : false,
                lockScroll : true,
                cancelModal : false,
                title : '当前分红数据',
                fenhongSumDialogView : '',
            }
        },
        mounted() {
            this.username = this.$store.state.user.username
            this.getData()
        },
        computed : {
        },
        methods: {
            getData () {
                api.ajax('team/dividend/findCurrentMonth',this.form).then(data =>{
                    this.fenHongSum = data.data
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
            transferBalance (event) {
                this.dialogTableVisible = true
                this.fenhongSumDialogView = "transferBalance"
            },
            dividendDetail (event) {
                this.dialogTableVisible = true
                this.fenhongSumDialogView = "dividendDetail"
            },
            openHandle () {
                console.log('openHandle')
            },
            closeHandle () {
                console.log('closeHandle')
                this.fenhongSumDialogView = ""
                this.getData()
            },
        },
    }
</script>
<style scoped>
    .recordContent {
        background-color: #f0f3f8;
        height: 684px;
        border-bottom-right-radius: 10px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-size: 14px;
    }
    .contentBox {
        font-size: 12px;
    }
    .grey_box_bottom {
        padding: 20px 0;
    }
    .fenghong_shuju_table1 {
        width: 650px;
        margin: 0 auto;
    }
    .fenghong_shuju_table1 .td1 {
        width: 135px;
    }
    .txtGrey {
        color: #888;
    }
    .fenghong_shuju_table1 .td4 {
        width: 135px;
        padding-left: 40px;
    }
    .fenghong_shuju_table1 .td5 {
        width: 160px;
    }
    .account {
        background: #03cbd7;
        width: 152px;
        color: #fff;
        border-radius: 20px;
        font-weight: bold;
        font-size: 14px;
    }
    .account:hover {
        background: #04dae3;
    }
    .btnGreen4 {
        background: #3dcb00;
        color: #fff;
        width: 120px;
        border-radius: 20px;
        font-weight: bold;
        font-size: 14px;
    }
    .btnGreen4:hover {
        background: #4dd800;
    }
    .fenghong_shuju_table2_box {
        padding: 25px 100px 0 0;
    }
    .fenghong_shuju_table2 {
        width: 650px;
        margin: 0 auto;
    }
    .fenghong_shuju_table2 td {
        height: 35px;
        padding-left: 100px;
    }
    .fenghong_shuju_table2 .td2 {
        padding-left: 0;
        text-align: right;
        color: #888;
    }
    .grey_box_top {
        background:url(../../images/grey_box_top.png) top left repeat-x #eee; 
    }

    .grey_box_bottom {
        background:url(../../images/grey_box_bottom.png) bottom left repeat-x; 
    }
</style>
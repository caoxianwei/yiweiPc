<template>
    <div class="Detailbox">
        <div class="m-b-10">
            <div class="caozuo_box_left"><img src="../../images/imgTouXiang.png"></div>
            <div class="caozuo_box_right">
                <div class="caozuo_box_right_top">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>账户名</td>
                                <td class="td2">{{userAction.username}}</td>
                                <td>用户ID号</td>
                                <td class="td4">{{userAction.id}}</td>
                            </tr>
                            <tr>
                                <td>用户类型</td>
                                <td class="td2">
                                    <span>代理</span>
                                </td>
                                <td>用户返点</td>
                                <td class="td4">{{userAction.point}}%</td>
                            </tr>
                            <tr>
                                <td>可用余额</td>
                                <td class="td2">
                                    <span v-text="userAction.balance"></span>
                                </td>
                                <td>团队余额</td>
                                <td class="td4">
                                    <span v-text="userAction.teamBalance"></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="caozuo_box_right_bottom unselectable">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td>
                                    <span class="btn-sel btn-selected" @click.stop="inRebatePromote">返点提升</span>
                                </td>
                                <td>
                                    <span class="btn-sel" @click.stop="rebateRecord">返点申请记录</span>
                                </td>
                                <td v-if="userAction.agentLevel == 0">
                                    <span class="btn-sel" @click.stop="agentPromote">代理提升</span>
                                    <span class="btn-sel" @click.stop="agentRecord">代理申请记录</span>
                                </td>
                                <td v-else>
                                    <span class="btn-sel" @click.stop="fenhongPromote">分红提升</span>
                                    <span class="btn-sel" @click.stop="fenhongRecord">分红申请记录</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div>
            <component :is="actionsView"></component>
        </div>
    </div>
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions } from 'vuex'
    import { errorMsg } from '../../tools/command'
    import fandianUp from './team-dividend-point-up'
    import fandianRecord from './team-dividend-point-record'
    import fenhongUp from './team-dividend-fenhong-up'
    import fenhongRecord from './team-dividend-fenhong-record'
    import agentUp from './team-dividend-agent-up'
    import agentRecord from './team-dividend-agent-record'
    import $ from 'jquery'
    export default {
        components : {
            fandianUp,
            fandianRecord,
            fenhongUp,
            fenhongRecord,
            agentUp,
            agentRecord
        },
        data () {
            return {
                userAction: {},
                form: {
                    userId : '',
                },
                actionsView : 'fandianUp',
            }
        },
        mounted() {
            this.getData()
        },
        beforeDestroy () {

        },
        computed: {
        },
        methods : {
            getData () {
                this.form.userId = this.$store.state.useraction.teamDividendAgent
                if(!this.form.userId) {
                    return
                }
                api.ajax('team/member/findMemberInfo',this.form).then(data =>{
                    this.userAction = data.data
                },error =>{
                    errorMsg("数据请求失败")
                })
            },
            inRebatePromote (event) {
                this.resetSel(event)
                this.actionsView = "fandianUp"
            },
            rebateRecord (event) {
                this.resetSel(event)
                this.actionsView = "fandianRecord"
            },
            fenhongPromote (event) {
                this.resetSel(event)
                this.actionsView = "fenhongUp"
            },
            fenhongRecord (event) {
                this.resetSel(event)
                this.actionsView = "fenhongRecord"
            },
            agentPromote(event){
                this.resetSel(event)
                this.actionsView = "agentUp"
            },
            agentRecord(event){
                this.resetSel(event)
                this.actionsView = "agentRecord"
            },
            resetSel(event){
                const el = event.target
                const cxt = $(".caozuo_box_right_bottom")
                $(".btn-selected", cxt).removeClass('btn-selected')
                $(el).addClass('btn-selected')
            }
        }
    }
</script>
<style scoped>
    .Detailbox {
        width: 700px;
        font-size: 12px;
        background: transparent;
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-weight: normal;
        margin-left: auto;
        margin-right: auto;
        color: #000;
        height: 500px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s ease 0;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
    }
    .caozuo_box_left {
        display: inline-block;
        margin: 10px 20px 0 40px;
    }
    .caozuo_box_right {
        display: inline-block;
        width: 430px;
        margin-left: 20px;
    }
    .caozuo_box_right_top table td {
        height: 28px;
    }
    .caozuo_box_right_top table td.td2 {
        padding-right: 80px;
        text-align: right;
        color: #888;
        font-size: 14px;
    }
    .caozuo_box_right_top table td.td4 {
        text-align: right;
        color: #888;
    }
    .caozuo_box_right_foot {
        padding-top: 5px;
    }
    .btnRed4 {
        border-radius: 5px;
        background: #ec0000;
        color: #fff;
    }
    .btnRed4:hover {
        background: #fc0000;
    }
    .wid82 {
        width: 82px;
    }
    .wid104 {
        width: 104px;
    }
    .wid111 {
        width: 111px;
    }
    .btn-sel {
        font-family: SimSun, 宋体, STSong, 华文宋体;
        font-size: 14px;
        display: inline-table;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        background-color: #e7e9ed;
        border-radius: 5px;
        cursor: pointer;
        color: #4b4f5b;
        font-weight: bold;
    }
    .btn-sel:hover {
        background-color: #cccfd7;
    }
    .btn-selected {
        background-color: #cccfd7;
        color: #ff4200;
    }
</style>
<template>
    <div class="contentBox">
        <div class="grey_box_top pdt5" style="clear:both">
            <div class="grey_box_bottom pdb10 pdt10">
                <ul class="form">
                    <li>
                        <span class="formTit">用户级别:</span>
                        <span>代理用户</span>
                    </li>
                    <li>
                        <span class="formTit">当前返点:</span>
                        <span>{{agentInfo.point}}%</span>
                    </li>
                    <li>
                        <span class="formTit">返点操作:</span>
                        <input type="text" v-model="range" class="input_txt" name="range">
                        <span class="range">范围 {{agentInfo.point}} 至 {{maxpoint}}</span>
                    </li>
                    <li class="textareali">
                        <span class="formTit">申请说明:</span>
                        <textarea id="txtAppDes" v-model="reason"></textarea>
                    </li>
                    <li>
                        <div class="btn">
                            <el-button type="text" size="small" class="btnRed4" @click.stop="submitapply">提交申请</el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <dl class="czsm">
            <dt>申请返点说明:</dt>
            <dd>1.本功能是防止平台内招高点限号设置，提交申请后联系客服审核，申请结果与状态在返点记录内查看。</dd>
            <dd>2.如查询是(1.平台原有成员(内招)、2.该用户资料信息未设置、有本平台多号)一律拒绝申请。</dd>
        </dl>
    </div>  
</template>
<script lang="babel">
    import api from '../../api'
    import { mapActions } from 'vuex'
    import { errorMsg,succMsg } from '../../tools/command'
    import Decimal from 'decimal.js'
    export default {
        data () {
            return {
                userpoint: '',
                radio1: '',
                range: '',
                userInfo: {},
                agentInfo : {},
                reason: '',
                form: {
                    userId: '',
                    point: '',
                    pointBdw: '',
                    appDesc: '',
                },
            }
        },
        mounted () {
            this.getLoginUserData()
            this.getAgentData()
        },
        computed: {
            maxpoint() {
                if(!this.userInfo.point){
                    return
                }
                var cl = new Decimal(this.userInfo.point)
                cl = cl.sub(0.1)
                return cl.toNumber()
            }
        },
        methods : {
            ...mapActions({
              setUserInfo : 'setUserInfo',
            }),
            async getLoginUserData () {
                var para = {}
                var data = await api.ajax('user/findInfo',para)
                if(data.code == '0'){
                    this.userInfo = data.data
                    this.setUserInfo(data.data)
                } else {
                    errorMsg("数据请求失败: "+data.msg)
                }
            },
            async getAgentData () {
                this.form.userId = this.$store.state.useraction.teamDividendAgent
                if(!this.form.userId) {
                    return
                }
                var data = await api.ajax('team/member/findMemberInfo',this.form)
                if(data.code == '0'){
                    this.agentInfo = data.data
                } else {
                    errorMsg("数据请求失败: "+data.msg)
                }
            },
            async pointUpApply () {
                this.form.point = this.range
                this.form.pointBdw = this.range
                this.form.userId = this.agentInfo.id
                this.form.appDesc = this.reason
                const data = await api.ajax('team/point/apply',this.form)
                if(data && data.code == '0') {
                    succMsg(data.msg)
                } else {
                    errorMsg(data.msg)
                }
            },
            submitapply () {
                if (!this.reason) {
                    errorMsg('申请理由不允许为空，请填写！') 
                    return
                } else {
                    if (!this.range) {
                        errorMsg('返点不允许为空，请填写！') 
                    } else if(!this.range.match(/^[0-9]+(.[0-9]+)?$/)){
                        errorMsg('返点格式不正确，请重新输入')
                    } else if(!this.range.match(/^[0-9]+(.[0-9]{1})?$/)){
                        errorMsg('小数点后面只能填写一个数字,请删除多余的数字!')
                    } else {
                        if (Number(this.range) <= Number(this.agentInfo.point) || Number(this.range) > this.maxpoint) {
                            errorMsg('抱歉，您填写的定位返点超出了范围值！')
                        } else {
                            this.pointUpApply();
                        }
                    }
                }
            },
            clear () {
                this.range = '';
                this.reason = '';
                this.notice = '';
            },
        }
    }
</script>
<style scoped>
    ul {
        list-style: none;
    }
    .contentBox {
        width: 700px;
        font-size: 12px;
        height: 380px;
        font-family: SimSun, 宋体, STSong, 华文宋体;
    }
    .pdt5 {
        padding-top: 5px;
    }  
    .pdt10 {
        padding-top: 10px;
    }
    .pdb10 {
        padding-bottom: 10px;
    }
    .form {
        margin-left: 153px;
    }
    .form li {
        height: 25px;
        line-height: 25px;
        padding-bottom: 5px;
    }
    .form li span.formTit {
        width: 60px;
        text-align: right;
        display: inline-block;
        margin-right: 10px;
    }
    .form li.textareali {
        height: 50px;
        padding-bottom: 30px;
    }
    .input_txt {
        width: 80px;
        height: 23px;
        line-height: 23px;
        border: solid 1px #ccc;
        background: #fff;
    }
    textarea {
        border: solid 1px #ccc;
        padding-right: 0;
        background: #fff;
        vertical-align: middle;
    }
    #txtAppDes {
        height: 50px;
        width: 380px;
        resize: none;
    }
    .czsm {
        padding: 10px 30px;
        line-height: 1.8em;
    }
    .czsm dt {
        padding-bottom: 5px;
        font-size: 14px;
    }
    .btnGreen3 {
        width: 75px;
        background: #3dcb00;
        color: #fff;
        border-radius: 5px;
    }
    .btnGreen3:hover {
        background: #55df00;
    }
    .btn {
        margin-left: 70px; 
        display: inline-block;
    }
    .btnRed4 {
        width: 80px;
        border-radius: 5px;
        background: #ec0000;
        color: #fff;
        font-weight: bold;
    }
    .btnRed4:hover {
        background: #fc0000;
    }
    .desc {
        margin-top: 15px;
    }
    .range {
        margin: 0 5px;
    }
    .notice {
        color: #ec0000;
        margin-left: 5px;
    }
    .grey_box_top {
        background:url(../../images/grey_box_top.png) top left repeat-x #eee; 
    }

    .grey_box_bottom {
        background:url(../../images/grey_box_bottom.png) bottom left repeat-x; 
    }
</style>
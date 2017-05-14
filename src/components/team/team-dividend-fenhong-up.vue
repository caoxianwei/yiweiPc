<template>
    <div class="contentBox">
        <div class="grey_box_top pdt5" style="clear:both">
            <div class="grey_box_bottom pdb10 pdt10">
                <ul class="form">
                    <li>
                        <span class="formTit">用户级别:</span>
                        <span>分红代理</span>
                    </li>
                    <li>
                        <span class="formTit">当前分红级别:</span>
                        <span>{{agentInfo.rate}}%</span>
                    </li>
                    <li>
                        <span class="formTit">分红比例:</span>
                        <input type="text" v-model="range" class="input_txt" name="range">%
                        <span class="range">(分红比例的范围在{{agentInfo.rate}}%到{{maxRate}}%之间)</span>
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
            <dt>申请分红说明:</dt>
            <dd>1.上下级代理分红计算方式跟返点同样原理，分红月报可在分红明细里面查看。</dd>
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
                    rate: '',
                    appDesc: '',
                },
            }
        },
        mounted () {
            this.getLoginUserData()
            this.getAgentData()
        },
        computed : {
            maxRate(){
                if(!this.userInfo.rate){
                    return
                }
                var cl = new Decimal(this.userInfo.rate)
                cl = cl.sub(1)
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
            async upApply () {
                this.form.userId = this.agentInfo.id
                this.form.appDesc = this.reason
                this.form.rate = this.range
                const data = await api.ajax('team/dividendAgent/promoteRate',this.form)
                if(data && data.code == '0'){
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
                        errorMsg('分红比例不允许为空，请填写！')
                    } else if(!this.range.match(/^[0-9]+(.[0-9]+)?$/)){
                        errorMsg('分红比例格式不正确，请重新输入')
                    } else if(!this.range.match(/^[0-9]+(.[0-9]{1})?$/)){
                        errorMsg('小数点后面只能填写一个数字,请删除多余的数字!')
                    } else {
                        if (Number(this.range) <= Number(this.agentInfo.rate) || Number(this.range) > this.maxRate) {
                            errorMsg('抱歉，您填写的分红比例超出了范围值！')
                        } else {
                            this.upApply()
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
        margin-left: 133px;
    }
    .form li {
        height: 25px;
        line-height: 25px;
        padding-bottom: 5px;
    }
    .form li span.formTit {
        width: 80px;
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
        margin-left: 97px; 
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
        letter-spacing: 1px;
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